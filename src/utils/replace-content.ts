import fs from 'fs';

export function replaceContent(filePath: string, replacements: Record<string, string>) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`❌ Archivo no encontrado: ${filePath}`);
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  Object.entries(replacements).forEach(([key, value]) => {
    content = content.replace(new RegExp(key, 'g'), value);
  });

  fs.writeFileSync(filePath, content);
}