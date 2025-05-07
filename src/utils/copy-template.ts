import fs from "fs";
import path from "path";
import { replaceContent } from "./replace-content";

interface CopyOptions {
  replacements?: Record<string, string>;
}

export async function copyTemplate(
  src: string,
  dest: string,
  options: CopyOptions = {}
) {
  if (!fs.existsSync(src)) {
    throw new Error(`❌ Ruta de template no encontrada: ${src}`);
  }

  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  for (const file of fs.readdirSync(src)) {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);

    if (fs.statSync(srcFile).isDirectory()) {
      await copyTemplate(srcFile, destFile, options);
    } else {
      fs.copyFileSync(srcFile, destFile);

      if (file === "package.json" && options.replacements) {
        replaceContent(destFile, options.replacements);
      }
    }
  }
}
