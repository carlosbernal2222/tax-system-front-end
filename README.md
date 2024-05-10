# Tax System Front-End

## Project Overview
This front-end application provides a user-friendly interface for managing tax filings. It integrates with the back-end tax system to fetch and submit tax-related data. The application supports various forms and user interactions to streamline the tax filing process.

## Features
- Interactive forms for tax filings such as Form 1099 and W2.
- Real-time tax calculations.
- User authentication and profile management.
- Responsive design for desktop and mobile devices.

## Technology Stack
- React: A JavaScript library for building user interfaces.
- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
- Vite: A build tool that aims to provide a faster and leaner development experience for modern web projects.
- SWC: A super-fast compiler written in Rust; used in this project for faster builds and HMR support.

## Getting Started

### Prerequisites
- Node.js 14.x or newer
- Yarn or npm

### Installation
1. Clone the repository:
git clone https://github.com/carlosbernal2222/tax-system-front-end.git

2. Navigate to the project directory:
   cd tax-system-front-end

4. Install dependencies:
   npm install

## Authors
- Rob Hardial - Contributor Developer (Github Profile: [Robert Hardial](https://github.com/robhardial))
- Carlos Bernal - Contributor Developer (GitHub Profile: [Carlos Bernal](https://github.com/carlosbernal2222))

## Acknowledgements
- Special thanks to all contributors and users of this system for their continuous support and feedback.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
# tax-system-backend
