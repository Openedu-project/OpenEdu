import alias, { Alias } from "@rollup/plugin-alias"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace"
import glob from "fast-glob"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { Plugin, RollupOptions } from "rollup"
import esbuild from "rollup-plugin-esbuild"
import { preserveDirectives } from "rollup-plugin-preserve-directives"
import json from "@rollup/plugin-json"
import css from "rollup-plugin-import-css";

interface Options {
  dir: string
  aliases: Alias[]
}

export async function getConfig(options: Options): Promise<RollupOptions> {
  const { dir, aliases } = options

  const packageJsonPath = resolve(dir, "package.json")
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))

  const isCli = packageJson.bin !== undefined

  const plugins: Plugin[] = [
    nodeResolve({ extensions: [".ts", ".tsx", ".js", ".jsx"] }),
    alias({ entries: aliases }),
    commonjs(),
    json(),
    css(),
    esbuild({
      sourceMap: true,
      tsconfig: resolve(dir, "tsconfig.json"),
      platform: isCli ? "node" : "browser",
    }),
    replace({ preventAssignment: true }),
    preserveDirectives(),
    {
      name: "@rollup-plugin/remove-empty-chunks",
      generateBundle(_, bundle) {
        for (const [name, chunk] of Object.entries(bundle)) {
          if (chunk.type === "chunk" && chunk.code.length === 0) {
            delete bundle[name]
          }
        }
      },
    },
  ]

  const deps = [
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.peerDependencies ?? {}),
  ]

  const external = deps.length ? new RegExp(`^(${deps.join("|")})`) : undefined
  const entries = await glob("src/**/*.{ts,tsx}")
  

  const outputs: RollupOptions["output"] = [
    {
      format: "es",
      exports: "named",
      entryFileNames: "[name].js",
      dir: resolve(dir, "dist/esm"),
      preserveModules: true,
    },
  ]

  if (!isCli) {
    outputs.push({
      format: "cjs",
      exports: "named",
      entryFileNames: "[name].cjs",
      dir: resolve(dir, "dist/cjs"),
      preserveModules: true,
    })
  }
  return {
    input: entries,
    onLog(level, log, handler) {
      if (log.code === "EMPTY_BUNDLE") return
      return handler(level, log)
    },
    onwarn(warning, warn) {
      if (warning.code === "SOURCEMAP_ERROR") return
      if (warning.code === "MODULE_LEVEL_DIRECTIVE") return
      warn(warning)
    },
    output: outputs,
    external,
    plugins,
  }
}