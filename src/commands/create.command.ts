import inquirer from "inquirer";
import { copyTemplate } from "../utils/copy-template";
import path from "path";

export class CreateCommand {
  async execute() {
    const questions: any = [
      { name: "name", message: "Nombre del proyecto:" },
      {
        name: "type",
        type: "list",
        message: "¿Qué tipo de proyecto?",
        choices: ["vite", "express"],
      },
      {
        name: "arch",
        type: "list",
        message: "¿Qué arquitectura?",
        choices: ["clean", "mvc"],
      },
    ];

    const answers = await inquirer.prompt(questions);
    console.log(answers);
    const { name, type, arch } = answers;

    const moduleDir = path.dirname(path.dirname(__dirname));
    const templatePath = path.join(moduleDir, "templates", type, arch);
    const destination = path.join(process.cwd(), name);

    await copyTemplate(templatePath, destination);
    console.log(`✅ Proyecto ${name} creado con ${type} + ${arch}`);
  }
}
