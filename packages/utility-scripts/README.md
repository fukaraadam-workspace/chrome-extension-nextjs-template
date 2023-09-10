# Utility Scripts

Utility scripts to be used manually.

Used `npm i --workspaces=false`. Has its own package-lock.json, because codegen depends on older versions of typescript, but ts-node uses typescript from its own node_modules.

## ToDo

- [x] Update icon in icon-generator.

**Clean Up:**

- [ ] Remove coinGeckoApi codegen scripts from `./scripts/src/api-codegen/apicodegen.ts` and related swaggers.
