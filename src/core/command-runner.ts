import { CreateCommand } from "../commands/create.command";
import { GenerateCommand } from "../commands/generate-command";

export interface CommandRunner {
  execute(args: string[]): void | Promise<void>;
}

const commands: Record<string, new () => CommandRunner> = {
  create: CreateCommand,
  generate: GenerateCommand,
};

export function run(argv: string[]) {
  const [cmd, ...rest] = argv;
  const CmdClass = commands[cmd];

  if (!CmdClass) {
    console.error(`\u274C Comando no válido: ${cmd}`);
    console.log("Comandos disponibles: create, generate");
    process.exit(1);
  }

  const instance = new CmdClass();
  instance.execute(rest);
}
