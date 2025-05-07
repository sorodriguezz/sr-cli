import inquirer from "inquirer";
import { copyTemplate } from "../utils/copy-template";
import path from "path";

interface Answers {
  name: string;
  projectType: "backend" | "frontend";
  framework: string;
  arch: string;
  feature: string;
  db?: string;
}

export class CreateCommand {
  async execute() {
    const questions: any = [
      {
        type: "input",
        name: "name",
        message: "Nombre del proyecto:"
      },
      {
        name: "projectType",
        type: "list",
        message: "¿Qué tipo de proyecto?",
        choices: ["backend", "frontend"]
      },
      {
        name: "framework",
        type: "list",
        message: "¿Qué framework quieres usar?",
        choices: (answers: Answers) => {
          return answers.projectType === "backend"
            ? ["express", "springboot", "flask"]
            : ["vite", "next", "react"];
        }
      },
      {
        name: "arch",
        type: "list",
        message: "¿Qué arquitectura?",
        choices: ["clean", "mvc", "hexagonal"]
      },
      {
        name: "feature",
        type: "list",
        message: "¿Qué características necesitas?",
        choices: ["basic", "auth"]
      },
      {
        name: "db",
        type: "list",
        message: "¿Qué base de datos?",
        choices: ["mongo", "mysql", "postgres"],
        when: (answers: Answers) => answers.projectType === "backend"
      }
    ];

    const answers = await inquirer.prompt(questions);
    const { name, projectType, framework, arch, feature, db } = answers;

    const moduleDir = path.dirname(path.dirname(__dirname));
    let templatePath = path.join(
      moduleDir,
      "templates",
      projectType,
      framework,
      feature
    );

    if (projectType === "backend") {
      templatePath = path.join(templatePath, db!);
    }

    const destination = path.join(process.cwd(), name);

    await copyTemplate(templatePath, destination, {
      replacements: {
        [`"name": "cli"`]: `"name": "${name}"`,
      }
    });

    console.log(`✅ Proyecto ${name} creado:`);
    console.log(`  - Tipo: ${projectType}`);
    console.log(`  - Framework: ${framework}`);
    console.log(`  - Arquitectura: ${arch}`);
    console.log(`  - Características: ${feature}`);
    if (projectType === "backend") {
      console.log(`  - Base de datos: ${db}`);
    }
  }
}
