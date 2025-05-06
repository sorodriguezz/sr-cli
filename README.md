# sr-cli

Una herramienta de línea de comandos (CLI) para generar proyectos y componentes de forma rápida y sencilla.

## Características

- Generación de proyectos con diferentes tecnologías (Vite, Express)
- Soporte para diferentes arquitecturas (Clean, MVC)
- Generación de componentes (controllers, services)
- Templates personalizables
- Soporte completo para TypeScript

## Instalación

### Global
```bash
npm install -g sr-cli
```

### Local en un proyecto
```bash
npm install sr-cli
```

## Uso

### Crear un nuevo proyecto

```bash
sr-cli create
```

Este comando iniciará un asistente interactivo que te preguntará:
1. Nombre del proyecto
2. Tipo de proyecto (vite, express)
3. Arquitectura (clean, mvc)

### Generar componentes

```bash
sr-cli generate <tipo> <nombre>
```

Tipos disponibles:
- `controller`: Genera un nuevo controlador
- `service`: Genera un nuevo servicio

Ejemplo:
```bash
sr-cli generate controller users
```

### Comandos disponibles

```bash
sr-cli --help          # Muestra la ayuda general
sr-cli generate --help # Muestra la ayuda específica del comando generate
sr-cli --version       # Muestra la versión actual
```

## Uso como librería

También puedes usar sr-cli como una librería en tu código:

```typescript
import { CreateCommand, GenerateCommand } from 'sr-cli';

// Crear un nuevo proyecto
const creator = new CreateCommand();
await creator.execute();

// Generar un componente
const generator = new GenerateCommand();
generator.execute(['controller', 'users']);
```

## Estructura de directorios generada

### Proyecto Vite (Clean Architecture)
```
└── tu-proyecto/
    ├── src/
    │   ├── components/
    │   │   └── HelloWorld.ts
    │   └── main.ts
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
```

## Requisitos

- Node.js v16 o superior
- npm v7 o superior

## Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.