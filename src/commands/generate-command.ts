import fs from "fs";
import path from "path";

export class GenerateCommand {
  execute(args: string[]) {
    const [type, name] = args;

    if (!type || !name) {
      console.error("❌ Uso: sr-cli generate <tipo> <nombre>");
      return;
    }

    const fileName = `${name}.${type}.ts`;
    const pascalName = this.toPascalCase(name);

    const moduleDir = path.dirname(path.dirname(__dirname));
    const schematicPath = path.join(
      moduleDir,
      "schematics",
      type,
      `${type}.template.ts`
    );

    if (!fs.existsSync(schematicPath)) {
      console.error(`❌ No existe el schematic para tipo: ${type}`);
      console.log("Tipos disponibles:", fs.readdirSync(path.join(moduleDir, "schematics")).join(", "));
      return;
    }

    const content = fs
      .readFileSync(schematicPath, "utf-8")
      .replace(/{{name}}/g, name)
      .replace(/{{name\s*\|\s*pascal}}/g, pascalName);

    const targetDir = path.resolve(process.cwd(), "src", name);
    fs.mkdirSync(targetDir, { recursive: true });

    const targetFile = path.join(targetDir, fileName);
    fs.writeFileSync(targetFile, content);
    console.log(`✅ Archivo generado: ${targetFile}`);
  }

  private toPascalCase(str: string): string {
    return str.replace(/(^\w|[-_\s]\w)/g, (s) =>
      s.replace(/[-_\s]/g, "").toUpperCase()
    );
  }
}
