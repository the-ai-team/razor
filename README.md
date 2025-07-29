# Razor

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

### Test Coverage (Only Redux Store)

| Statements                                                                                         | Branches                                                                                       | Functions                                                                                        | Lines                                                                                    |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/statements-100%25-brightgreen.svg?style=flat&logo=jest) | ![Branches](https://img.shields.io/badge/branches-100%25-brightgreen.svg?style=flat&logo=jest) | ![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat&logo=jest) | ![Lines](https://img.shields.io/badge/lines-100%25-brightgreen.svg?style=flat&logo=jest) |

![alt text](razor.png)

## Introduction

Razor is a free and open-source type-racing platform that brings a new twist to improving typing skills while competing with friends. Players can create and share game links instantly without needing an account, making it easy to invite friends to play.

As a newly launched open-source project, Razor invites players and developers to contribute, ensuring it continuously evolves to meet user needs.

**Live Demo:** https://razor-web.netlify.app/

## Applications

This monorepo contains two main applications:

- **Client** - React frontend application with real-time typing game interface
- **Server** - Express backend API with Socket.io for real-time multiplayer functionality

## Quick Start

### Prerequisites

Install NX globally:

```bash
npm add --global nx@latest
```

> [!NOTE]  
> For more installation details, see [NX Documentation](https://nx.dev/getting-started/installation)

### Running the Applications

Start both applications for development:

```bash
# Start the backend server (runs on default port)
nx serve server

# Start the frontend client (runs on http://localhost:4200)
nx serve client
```

Or use npm scripts:

```bash
# Start server
npm run start:server

# Start client
npm start
```

## Project Structure

```
razor/
├── apps/
│   ├── client/          # Frontend application
│   └── server/          # Backend API
├── libs/
│   ├── store/           # Redux store and state management
│   ├── models/          # Shared data models and types
│   ├── constants/       # Application constants
│   ├── util/            # Shared utility functions
│   └── mocks/           # Mocks functions for testing
├── tools/               # Build tools and scripts
└── docs/                # Project documentation
```

## Technologies Used

### Monorepo & Development Tools

- **NX** - Monorepo management system
- **Git** - Version management
- **GitHub, GitHub Actions** - Repository hosting and CI/CD
- **Husky** - Git hooks management
- **Commitizen** - Conventional commits
- **lint-staged** - Linting staged files only

### Frontend Technologies

- **React.js** - UI library
- **Vite** - Build tool and bundler (migrated from Webpack)
- **Tailwind CSS** - Utility-first CSS framework
- **Storybook** - Component development and documentation
- **react-i18next** - Internationalization
- **React Router** - Navigation management
- **classnames** - CSS class management library

### Backend Technologies

- **Express** - Node.js framework
- **Node.js** - Runtime environment

### State Management & Communication

- **Rematch.js** - Redux wrapper
- **Redux (with Redux Toolkit)** - State management
- **Socket.IO** - WebSocket library for real-time communication

### Programming Languages & Type Safety

- **TypeScript** - Static typing for JavaScript
- **JavaScript** - Programming language
- **Zod** - Schema validation

### Testing & Quality Assurance

- **Jest** - Testing framework
- **Istanbul** - Test coverage reporting
- **istanbul-merge** - Coverage report merging
- **istanbul-badges-readme** - Coverage badges generation
- **Prettier** - Code formatting
- **ESLint** - Code quality and linting

### Utility Libraries

- **Lodash** - JavaScript utility library

### Cloud Services & Deployment

- **Google Cloud Platform** - Server deployment
- **Cloud Run** - Serverless container platform
- **Google Cloud Logging** - Logging service
- **Netlify** - Frontend deployment and hosting
- **Chromatic** - Visual testing and Storybook hosting
- **CodeCov** - Code coverage reporting service

### Design & Assets

- **Figma** - UI/UX design tool
- **Material Theme Builder** - Color palette generation (Figma plugin)
- **Canvas API** - Graphics rendering
- **CSS** - Styling and animations

### Asset Sources

- **Kenney's Roguelike Modern City** - City block sprites for race track
- **Kenney's Pixel Vehicle Pack** - Racing car sprites
- **Pixelarticons** - Icon library
- **DiceBear's Open Peeps** - Avatar styles

### Documentation & Diagramming

- **Markdown** - Documentation format
- **Mermaid** - Diagramming and charting tool

### Development Methodologies

- **Atomic Design** - UI component organization methodology
- **PubSub Architecture** - Publish-Subscribe communication pattern

## Contributing

### Commits

After staging files, run `git commit` to add commit messages.  
**Don't use the `-m` flag** as we use [Commitizen](https://github.com/commitizen/cz-cli) for meaningful commits.

> You will receive step-by-step prompts to add your commit message details.

Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) guide for commit standards.

## Additional Commands

```bash
# Run tests
npm test

# Build both applications
npm run build

# Lint all projects
npm run lint

# Format code
npm run pretty

# Run Storybook
npm run storybook
```

## Further Help

Visit the [Nx Documentation](https://nx.dev) to learn more.
