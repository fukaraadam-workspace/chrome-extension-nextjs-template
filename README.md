# Chrome Extension

## Structure

Created by `npx create-next-app@latest` command. Typescript, EsLint, Tailwind CSS, src/ directory, App Router added by this command.

Git lfs is used for storing binary files. VS Code is used for development. Prettier is used for auto code formatting with Prettier VS Code extension.

RTK Query will be used to interact with api, and its codegen package will be used to write api calls automatically from swagger.

### Naming Conventions

- kebab-case: used for css class names, file and folder names.
- PascalCase: used for React component names.
- camelCase: used for variable and function names.

### Folder Structure

- public: static files to be served directly.
- scripts: Utility scripts to be used manually. Has its own package.json.
- src: source files for both client and server side.
  - app: app related files, layouts, pages etc [`NextJS folder structure`][NextJS Folder].
  - assets: Images, fonts, etc.
  - components: components to use in client side. Module css files, React components, etc.
  - data: static data files to be used in general. ts, JSON, CSV etc.
  - lib: Non-component functions to use. Utility functions, models, redux store, etc.

## ToDos

Additional todos will be specified inside project with \<ToDo> tag.

- [ ] Add Redux toolkit
- [ ] Add RTK Query
- [ ] Add RTK Query codegen

**Clean Up:**

- [ ] Remove unused files.

**Through Development:**

- [ ] Edit README files.
- [ ] Edit pages in `./src/app/sitemap.ts` to include all pages and maybe edit `./src/app/robots.ts`.

<!-- Links Used through document -->

[NextJS Folder]: https://nextjs.org/docs/getting-started/project-structure
