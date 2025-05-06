import { Command } from 'commander';
import { CreateCommand } from '../commands/create.command';
import { GenerateCommand } from '../commands/generate-command';
import { version } from '../../package.json';

export function createProgram() {
  const program = new Command();

  program
    .name('sr-cli')
    .description('CLI para generación de proyectos y componentes')
    .version(version);

  program
    .command('create')
    .description('Crear un nuevo proyecto')
    .action(async () => {
      const command = new CreateCommand();
      await command.execute();
    });

  program
    .command('generate')
    .description('Generar un nuevo componente')
    .argument('<type>', 'Tipo de componente (controller, service)')
    .argument('<name>', 'Nombre del componente')
    .action((type, name) => {
      const command = new GenerateCommand();
      command.execute([type, name]);
    });

  return program;
}