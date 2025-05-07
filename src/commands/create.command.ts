import inquirer from "inquirer";
import { copyTemplate } from "../utils/copy-template";
import path from "path";
import fs from "fs";

interface Answers {
  name: string;
  projectType: "backend" | "frontend";
  language?: "javascript" | "typescript" | "java" | "python";
  framework: string;
  bundler?: "vite" | "webpack";
  feature: string;
  db?: string;
}

export class CreateCommand {
  async execute() {
    const questions: any = [
      {
        type: "input",
        name: "name",
        message: "Nombre del proyecto:",
      },
      {
        name: "projectType",
        type: "list",
        message: "¿Qué tipo de proyecto?",
        choices: ["backend", "frontend"],
      },
      {
        name: "language",
        type: "list",
        message: "¿Qué lenguaje quieres usar?",
        choices: (answers: Answers) => {
          return answers.projectType === "backend"
            ? ["javascript", "typescript", "java", "python"]
            : ["javascript", "typescript"];
        },
      },
      {
        name: "framework",
        type: "list",
        message: "¿Qué framework quieres usar?",
        choices: (answers: Answers) => {
          if (answers.projectType === "frontend") return ["react"];

          switch (answers.language) {
            case "javascript":
            case "typescript":
              return [
                "express",
                "bun",
                ...(answers.language === "typescript" ? ["nestjs"] : []),
              ];
            case "java":
              return ["springboot"];
            case "python":
              return ["flask"];
            default:
              return [];
          }
        },
      },
      {
        name: "bundler",
        type: "list",
        message: "¿Qué bundler quieres usar?",
        choices: ["vite", "webpack"],
        when: (answers: Answers) =>
          (answers.language === "javascript" ||
            answers.language === "typescript") &&
          answers.framework !== "nestjs",
      },
      {
        name: "feature",
        type: "list",
        message: "¿Qué características necesitas?",
        choices: ["basic", "auth"],
      },
      {
        name: "db",
        type: "list",
        message: "¿Qué base de datos?",
        choices: ["mongo", "mysql", "postgres"],
        when: (answers: Answers) => answers.projectType === "backend",
      },
    ];

    const answers = await inquirer.prompt(questions);
    const { name, projectType, language, framework, bundler, feature, db } =
      answers;

    const projectRoot = path.resolve(__dirname, "..", "..");

    const templateSegments = ["templates", projectType];

    if (projectType === "backend") {
      if (language === "javascript" || language === "typescript") {
        templateSegments.push(
          "nodejs",
          language,
          framework,
          bundler || "",
          feature,
          db || ""
        );
      } else {
        templateSegments.push(language!, framework, feature, db || "");
      }
    } else {
      templateSegments.push(framework, feature, db || "");
    }

    const cleanSegments = templateSegments.filter(Boolean);
    const templatePath = path.resolve(projectRoot, ...cleanSegments);
    const destination = path.resolve(process.cwd(), name);

    console.log("Template path:", templatePath);
    console.log("Project root:", projectRoot);

    if (!fs.existsSync(templatePath)) {
      console.error(`❌ La ruta del template no existe: ${templatePath}`);
      console.error(
        "Por favor, verifica que la estructura de directorios sea correcta."
      );
      return;
    }

    await copyTemplate(templatePath, destination, {
      replacements: {
        [`"name": "cli"`]: `"name": "${name}"`,
      },
    });

    this.addGitKeepToEmptyDirs(destination);

    console.log(`✅ Proyecto ${name} creado:`);
    console.log(`  - Tipo: ${projectType}`);
    console.log(`  - Lenguaje: ${language}`);
    console.log(`  - Framework: ${framework}`);
    if (bundler) console.log(`  - Bundler: ${bundler}`);
    console.log(`  - Características: ${feature}`);
    if (db) console.log(`  - Base de datos: ${db}`);
  }

  private addGitKeepToEmptyDirs(dir: string) {
    const items = fs.readdirSync(dir);

    if (items.length === 0) {
      fs.writeFileSync(path.join(dir, ".gitkeep"), "");
      return;
    }

    for (const item of items) {
      const fullPath = path.join(dir, item);
      if (fs.statSync(fullPath).isDirectory()) {
        this.addGitKeepToEmptyDirs(fullPath);
      }
    }
  }
}
