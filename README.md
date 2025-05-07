# kit-cli

Una herramienta de línea de comandos (CLI) para generar proyectos y componentes de forma rápida y sencilla.

## Características

- Generación de proyectos Backend y Frontend
- Múltiples lenguajes soportados (TypeScript, JavaScript, Java, Python)
- Diversos frameworks disponibles (Express, NestJS, Spring Boot, Flask, React)
- Opciones de bundling (Vite, Webpack)
- Plantillas con autenticación incluida
- Soporte para múltiples bases de datos (MongoDB, MySQL, PostgreSQL)
- Generación de componentes (controllers, services)
- Docker Compose incluido en templates seleccionados
- Soporte completo para TypeScript

## Instalación

### Global
```bash
npm install -g kit-cli
```

### Local en un proyecto
```bash
npm install kit-cli
```

## Uso

### Crear un nuevo proyecto

```bash
kit-cli create
```

Este comando iniciará un asistente interactivo que te preguntará:
1. Nombre del proyecto
2. Tipo de proyecto (backend/frontend)
3. Lenguaje de programación
4. Framework
5. Bundler (cuando aplique)
6. Características (auth/basic)
7. Base de datos

### Templates Disponibles

#### Backend
- **Java**
  - Spring Boot
    - Auth/Basic templates
    - MongoDB/MySQL/PostgreSQL
- **NodeJS**
  - Express (JavaScript/TypeScript)
    - Vite/Webpack bundling
    - Auth/Basic templates
    - MongoDB/MySQL/PostgreSQL
  - NestJS
    - Vite/Webpack bundling
- **Python**
  - Flask
    - Auth/Basic templates
    - MongoDB/MySQL/PostgreSQL

#### Frontend
- **React**
  - Auth/Basic templates
  - Integración con bases de datos

### Generar componentes

```bash
kit-cli generate <tipo> <nombre>
```

Tipos disponibles:
- `controller`: Genera un nuevo controlador
- `service`: Genera un nuevo servicio

Ejemplo:
```bash
kit-cli generate controller users
```

### Comandos disponibles

```bash
kit-cli --help          # Muestra la ayuda general
kit-cli generate --help # Muestra la ayuda específica del comando generate
kit-cli --version      # Muestra la versión actual
```

## Estructura de directorios ejemplo (TypeScript + Express + Auth + MongoDB)

```
└── tu-proyecto/
    ├── src/
    │   ├── app.ts
    │   ├── config/
    │   │   ├── bcrypt.adapter.ts
    │   │   ├── envs.ts
    │   │   ├── jwt.adapter.ts
    │   │   └── validators.ts
    │   ├── data/
    │   │   └── mongodb/
    │   ├── domain/
    │   │   ├── entities/
    │   │   ├── datasources/
    │   │   ├── repositories/
    │   │   └── use-cases/
    │   ├── infrastructure/
    │   │   ├── datasources/
    │   │   ├── repositories/
    │   │   └── mappers/
    │   └── presentation/
    │       ├── routes.ts
    │       ├── server.ts
    │       └── middlewares/
    ├── docker-compose.yml
    ├── package.json
    └── tsconfig.json
```

## Requisitos

- Node.js v16 o superior
- npm v7 o superior
- Docker y Docker Compose (para templates con bases de datos)

## Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.