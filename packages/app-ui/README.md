# App UI

## Usage

- Regular nextjs scripts can be used to run application as a web app. Run `npx http-server ./out` after build to serve static export.

## Structure

Created by `npx create-next-app@latest` command. Typescript, EsLint, Tailwind CSS, src/ directory, App Router added by this command.

RTK Query will be used to interact with api, and its codegen package will be used to write api calls automatically from swagger.

### Naming Conventions

- kebab-case: used for css class names, file and folder names.
- PascalCase: used for React component names.
- camelCase: used for variable and function names.

### Folder Structure

- public: static files to be served directly.
- src: source files for both client and server side. More info: [`NextJS folder structure`][NextJS Folder].
  - app: app related files, layouts, pages etc.
  - pages: NextJS pages. `./src/app` is not used for now.
  - assets: Images, fonts, etc.
  - components: components to use in client side. Module css files, React components, etc.
  - data: static data files to be used in general. ts, JSON, CSV etc.
  - lib: Non-component functions to use. Utility functions, models, redux store, etc.

## ToDos

Additional todos will be specified inside project with \<ToDo> tag.

- [x] Add Redux toolkit
- [x] Add RTK Query
- [x] Add RTK Query codegen

**Clean Up:**

- [ ] Remove unused files.
- [ ] Remove tmp folders.
  - [ ] Remove tmp folder from `./src/lib/redux/features/` and cleanup related redux store code.
  - [ ] Remove tmp folder from `./src/app/`.
  - [ ] Remove coinGeckoApi codegen scripts from `./scripts/src/api-codegen/apicodegen.ts` and related swaggers.

**Through Development:**

- [ ] Edit README files.

<!-- Links Used through document -->

[NextJS Folder]: https://nextjs.org/docs/getting-started/project-structure
