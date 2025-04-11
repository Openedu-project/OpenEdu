import { resolve } from "node:path"
import { buildProject } from "./build"
import { readFileSync } from "node:fs"

async function main() {
  const cwd = process.cwd()
  const flags = process.argv.slice(2)
  const watch = flags.includes("--watch")
  const clean = flags.includes("--clean")
  const dts = flags.includes("--dts")

  
  const packageJsonPath = resolve(cwd, "package.json")
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))


  await buildProject({
    dir: cwd,
    name: packageJson.name,
    watch,
    clean,
    dts,
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})