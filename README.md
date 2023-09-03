# Chrome Extension

## Usage

Firstly, Run `npm install`, this will install all dependencies for all workspaces.

- Run `npm run build:extension` to build for chrome extension. Output will be in `./out` directory. Load output directory as unpacked extension in chrome (enable developer mode in extensions).

## Structure

Git lfs is used for storing binary files. VS Code is used for development. Prettier is used for auto code formatting with Prettier VS Code extension.

### Naming Conventions

- kebab-case: used for css class names, file and folder names.
- PascalCase: used for React component names.
- camelCase: used for variable and function names.

### Folder Structure

- packages: Include all seperate packages.
  - app-ui: NextJS app for UI.
  - extenion-specific: chrome extension specific files e.g. worker scripts and manifest.json.
  - extension-test-app: NextJS app to test extension related features.
  - utility-scripts: Utility scripts to be used manually.
