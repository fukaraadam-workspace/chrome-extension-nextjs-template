# App UI

## Usage

- Regular Next.js commands can be used to run application as a web app. Run `npx http-server ./out` after build to serve static export.
- Api types can be automatically generated from swagger with `npm run utility:api-codegen` command.
- Favicon can be generated with `npm run utility:icon-generator` command.

## Structure

Created by `npx create-next-app@latest` command. Typescript, EsLint, Tailwind CSS, src/ directory, App Router added by this command.

RTK Query is used to interact with api, and its codegen package will be used to write api calls automatically from swagger.

### Folder Structure

- public: static files to be served directly.
- src: source files for both client and server side. More info: [`Next.js folder structure`][Next.js Folder].
  - app: app related files, layouts, pages etc.
  - assets: Images, fonts, etc.
  - components: components to use in client side. Module css files, React components, etc.
  - data: static data files to be used in general. ts, JSON, CSV etc.
  - lib: Non-component functions to use. Utility functions, models, redux store, etc.
  - pages: Next.js pages. `./src/app` is not used for now.

## ToDos

**Clean Up:**

- [ ] Remove unused files.
- [ ] Remove tmp folders.
  - [ ] Remove tmp folder from `./src/lib/redux/features/` and cleanup related redux store code.
  - [ ] Remove tmp folder from `./src/app/`.
  - [ ] Remove coinGeckoApi codegen scripts from `./scripts/src/api-codegen/apicodegen.ts` and related swaggers.

<!-- Links Used through document -->

[Next.js Folder]: https://nextjs.org/docs/getting-started/project-structure
