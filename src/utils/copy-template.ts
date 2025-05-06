import fs from "fs";
import path from "path";

export async function copyTemplate(src: string, dest: string) {
  if (!fs.existsSync(src)) {
    throw new Error(`❌ Ruta de template no encontrada: ${src}`);
  }

  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  for (const file of fs.readdirSync(src)) {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);

    if (fs.statSync(srcFile).isDirectory()) {
      await copyTemplate(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  }
}
