export interface FrameworkConfig {
  name: string;
  bundlers?: string[];
  features: string[];
  databases?: string[];
}

export interface LanguageConfig {
  name: string;
  frameworks: FrameworkConfig[];
}

export interface ProjectTypeConfig {
  name: string;
  languages: LanguageConfig[];
}

export const cliOptions = {
  projectTypes: [
    {
      name: 'backend',
      languages: [
        {
          name: 'typescript',
          frameworks: [
            {
              name: 'express',
              bundlers: ['vite', 'webpack'],
              features: ['basic', 'auth'],
              databases: ['mongo', 'mysql', 'postgres']
            },
            {
              name: 'nestjs',
              bundlers: ['vite', 'webpack'],
              features: ['basic', 'auth'],
              databases: ['mongo', 'mysql', 'postgres']
            },
            {
              name: 'bun',
              bundlers: ['vite', 'webpack'],
              features: ['basic', 'auth'],
              databases: ['mongo', 'mysql', 'postgres']
            }
          ]
        },
        {
          name: 'javascript',
          frameworks: [
            {
              name: 'express',
              bundlers: ['vite', 'webpack'],
              features: ['basic', 'auth'],
              databases: ['mongo', 'mysql', 'postgres']
            },
            {
              name: 'bun',
              bundlers: ['vite', 'webpack'],
              features: ['basic', 'auth'],
              databases: ['mongo', 'mysql', 'postgres']
            }
          ]
        },
        {
          name: 'java',
          frameworks: [
            {
              name: 'springboot',
              features: ['basic', 'auth'],
              databases: ['mongo', 'mysql', 'postgres']
            }
          ]
        },
        {
          name: 'python',
          frameworks: [
            {
              name: 'flask',
              features: ['basic', 'auth'],
              databases: ['mongo', 'mysql', 'postgres']
            }
          ]
        }
      ]
    },
    {
      name: 'frontend',
      languages: [
        {
          name: 'typescript',
          frameworks: [
            {
              name: 'react',
              bundlers: ['vite', 'webpack'],
              features: ['basic', 'auth']
            },
            {
              name: 'vue',
              bundlers: ['vite', 'webpack'],
              features: ['basic', 'auth']
            },
            {
              name: 'angular',
              features: ['basic', 'auth']
            }
          ]
        },
        {
          name: 'javascript',
          frameworks: [
            {
              name: 'react',
              bundlers: ['vite', 'webpack'],
              features: ['basic', 'auth']
            },
            {
              name: 'vue',
              bundlers: ['vite', 'webpack'],
              features: ['basic', 'auth']
            }
          ]
        }
      ]
    }
  ] as ProjectTypeConfig[]
};