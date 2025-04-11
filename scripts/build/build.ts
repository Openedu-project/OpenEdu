import { Alias } from "@rollup/plugin-alias";
import { rmSync } from "fs";
import { join } from "path/posix";
import * as rollup from "rollup";
import { getConfig } from "./config";
import { generateTypes } from "./tsc";
import { existsSync, mkdirSync, cpSync } from "fs";

interface BuildOptions {
  dir: string;
  name: string;
  watch?: boolean;
  clean?: boolean;
  dts?: boolean;
  aliases?: Alias[];
}

// Hàm sao chép thư mục images vào dist
function copyImagesFolder(dir: string) {
  const srcImagesDir = join(dir, "src/images");
  const distEsmImagesDir = join(dir, "dist/esm/images");
  const distCjsImagesDir = join(dir, "dist/cjs/images");
  
  if (existsSync(srcImagesDir)) {
    // Đảm bảo các thư mục đích tồn tại
    if (!existsSync(join(dir, "dist/esm"))) {
      mkdirSync(join(dir, "dist/esm"), { recursive: true });
    }
    if (!existsSync(join(dir, "dist/cjs"))) {
      mkdirSync(join(dir, "dist/cjs"), { recursive: true });
    }
    
    // Sao chép thư mục images
    cpSync(srcImagesDir, distEsmImagesDir, { recursive: true });
    cpSync(srcImagesDir, distCjsImagesDir, { recursive: true });
    
    console.log(`Đã sao chép thư mục images vào dist/esm và dist/cjs`);
  }
}

// Hàm sao chép global.css vào dist
function copyGlobalCss(dir: string) {
  const srcGlobalCssDir = join(dir, "src/global.css");
  const distEsmGlobalCssDir = join(dir, "dist/esm/global.css");
  const distCjsGlobalCssDir = join(dir, "dist/cjs/global.css");
  
  if (existsSync(srcGlobalCssDir)) {
    // Đảm bảo các thư mục đích tồn tại
    if (!existsSync(join(dir, "dist/esm"))) {
      mkdirSync(join(dir, "dist/esm"), { recursive: true });
    }
    if (!existsSync(join(dir, "dist/cjs"))) {
      mkdirSync(join(dir, "dist/cjs"), { recursive: true });
    }
    
    // Sao chép thư mục images
    cpSync(srcGlobalCssDir, distEsmGlobalCssDir, { recursive: true });
    cpSync(srcGlobalCssDir, distCjsGlobalCssDir, { recursive: true });
    
    console.log(`Đã sao chép global.css vào dist/esm và dist/cjs`);
  }
}

export async function buildProject(options: BuildOptions) {
  const { dir, name, watch, clean, dts, aliases = [] } = options;
  console.log(`[${name}] Building...`);

  if (clean) {
    //
    const distDir = join(dir, "dist");
    rmSync(distDir, { recursive: true, force: true });
  }

  const config = await getConfig({ dir, aliases });

  if (watch) {
    //
    config.watch = {
      include: config.input as string[],
      chokidar: { ignoreInitial: true },
    };

    const watcher = rollup.watch(config);
    console.log(`[${name}][JS] Watching source files...`);

    watcher.on("change", () => {
      console.log(`[${name}][JS] File changed, rebuilding...`);
    });

    //
  } else {
    //
    const build = await rollup.rollup(config);

    const outputs: rollup.OutputOptions[] = Array.isArray(config.output)
      ? config.output
      : [config.output!];

    await Promise.all(outputs.map((output) => build.write(output)));

    console.log(`[${name}][JS] Generated CJS and ESM files ✅`);
    
    // Sao chép thư mục images nếu đây là package assets
    if (name === "@oe/assets") {
      copyImagesFolder(dir);
    }

    if (name === "@oe/core") {
      copyGlobalCss(dir);
    }

    if (dts) {
      await generateTypes(dir);
      console.log(`[${name}][DTS] Generated type definitions ✅`);
    }
  }
}
