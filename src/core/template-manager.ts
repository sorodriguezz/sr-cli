import inquirer from "inquirer";
import path from "path";

import {
  cliOptions,
  ProjectTypeConfig,
  LanguageConfig,
  FrameworkConfig,
} from "../config/cli-options";

export interface ProjectOptions {
  name: string;
  projectType: string;
  language: string;
  framework: string;
  bundler?: string;
  feature: string;
  db?: string;
}

type ProjectAnswers = {
  name: string;
  projectType: string;
  language: string;
  framework: string;
  bundler?: string;
  feature: string;
  db?: string;
};

export class TemplateManager {
  private getProjectType(name: string): ProjectTypeConfig | undefined {
    return cliOptions.projectTypes.find((type) => type.name === name);
  }

  private getLanguage(
    projectType: ProjectTypeConfig,
    name: string
  ): LanguageConfig | undefined {
    return projectType.languages.find((lang) => lang.name === name);
  }

  private getFramework(
    language: LanguageConfig,
    name: string
  ): FrameworkConfig | undefined {
    return language.frameworks.find((framework) => framework.name === name);
  }

  private validateProjectOptions(answers: unknown): answers is ProjectOptions {
    const opts = answers as Partial<ProjectOptions>;
    return (
      typeof opts.name === "string" &&
      typeof opts.projectType === "string" &&
      typeof opts.language === "string" &&
      typeof opts.framework === "string" &&
      typeof opts.feature === "string" &&
      (opts.bundler === undefined || typeof opts.bundler === "string") &&
      (opts.db === undefined || typeof opts.db === "string")
    );
  }

  async promptOptions(): Promise<ProjectOptions> {
    const questions: any = [
      {
        type: "input",
        name: "name",
        message: "Nombre del proyecto:",
      },
      {
        type: "list",
        name: "projectType",
        message: "¿Qué tipo de proyecto?",
        choices: cliOptions.projectTypes.map((type) => type.name),
      },
      {
        type: "list",
        name: "language",
        message: "¿Qué lenguaje quieres usar?",
        choices: (answers: ProjectAnswers) => {
          const projectType = this.getProjectType(answers.projectType);
          return projectType?.languages.map((lang) => lang.name) || [];
        },
      },
      {
        type: "list",
        name: "framework",
        message: "¿Qué framework quieres usar?",
        choices: (answers: ProjectAnswers) => {
          const projectType = this.getProjectType(answers.projectType);
          const language =
            projectType && this.getLanguage(projectType, answers.language);
          return language?.frameworks.map((framework) => framework.name) || [];
        },
      },
      {
        type: "list",
        name: "bundler",
        message: "¿Qué bundler quieres usar?",
        choices: (answers: ProjectAnswers) => {
          const projectType = this.getProjectType(answers.projectType);
          const language =
            projectType && this.getLanguage(projectType, answers.language);
          const framework =
            language && this.getFramework(language, answers.framework);
          return framework?.bundlers || [];
        },
        when: (answers: ProjectAnswers) => {
          const projectType = this.getProjectType(answers.projectType);
          const language =
            projectType && this.getLanguage(projectType, answers.language);
          const framework =
            language && this.getFramework(language, answers.framework);
          return Boolean(framework?.bundlers?.length);
        },
      },
      {
        type: "list",
        name: "feature",
        message: "¿Qué características necesitas?",
        choices: (answers: ProjectAnswers) => {
          const projectType = this.getProjectType(answers.projectType);
          const language =
            projectType && this.getLanguage(projectType, answers.language);
          const framework =
            language && this.getFramework(language, answers.framework);
          return framework?.features || [];
        },
      },
      {
        type: "list",
        name: "db",
        message: "¿Qué base de datos?",
        choices: (answers: ProjectAnswers) => {
          const projectType = this.getProjectType(answers.projectType);
          const language =
            projectType && this.getLanguage(projectType, answers.language);
          const framework =
            language && this.getFramework(language, answers.framework);
          return framework?.databases || [];
        },
        when: (answers: ProjectAnswers) => {
          const projectType = this.getProjectType(answers.projectType);
          const language =
            projectType && this.getLanguage(projectType, answers.language);
          const framework =
            language && this.getFramework(language, answers.framework);
          return Boolean(framework?.databases?.length);
        },
      },
    ];

    const answers = await inquirer.prompt<ProjectAnswers>(questions);

    if (!this.validateProjectOptions(answers)) {
      throw new Error("Invalid project options received from prompt");
    }

    return answers;
  }

  getTemplatePath(projectRoot: string, options: ProjectOptions): string {
    const segments = ["templates", options.projectType];

    if (options.projectType === "backend") {
      if (
        options.language === "javascript" ||
        options.language === "typescript"
      ) {
        segments.push(
          "nodejs",
          options.language,
          options.framework,
          options.bundler || "",
          options.feature,
          options.db || ""
        );
      } else {
        segments.push(
          options.language,
          options.framework,
          options.feature,
          options.db || ""
        );
      }
    } else {
      segments.push(options.framework, options.feature, options.db || "");
    }

    const cleanSegments = segments.filter(Boolean);
    return path.resolve(projectRoot, ...cleanSegments);
  }
}
