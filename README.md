# Chrome Extension

## Usage

Run all these commands from root directory.

- Firstly, Run `npm install`, this will install all dependencies for all workspaces.
- Run `npm run build-extension` to build for chrome extension. Output will be in `./out` directory. Load output directory as unpacked extension in chrome (enable developer mode in extensions).
- To test extension, run `npm run test`.
  - Open [http://localhost:3001](http://localhost:3001) with your browser to see the result. 3000 is reserved for app-ui development.

### Utility Commands

- `npm run dev` - Start app-ui in development mode.
- `npm run build-extension:ui` - Build again for app-ui changes without rebuilding others.
- `npm run build-extension:specific` - Build again for extension-specific changes without rebuilding others.
- `npm run utility:api-codegen` - Update app-ui api types from swagger.
- `npm run utility:icon-generator` - Update app-ui and extension-specific icons.

## Structure

Git lfs is used for storing binary files. VS Code is used for development. Prettier is used for auto code formatting with Prettier VS Code extension.

### Naming Conventions

- kebab-case: used for css class names, file and folder names.
- PascalCase: used for React component names.
- camelCase: used for variable and function names.

### Folder Structure

- packages: Include all seperate packages.
  - app-ui: Next.js app for UI.
  - extenion-specific: chrome extension specific files e.g. worker scripts and manifest.json.
  - extension-test-app: Next.js app to test extension related features.
  - utility-scripts: Utility scripts to be used manually.

## ToDos

Additional todos will be specified inside project with \<ToDo> tag.
\<Warning> tags should be handled carefully. Implies a bug or security issue.
