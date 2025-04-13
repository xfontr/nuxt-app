# Configs

### Resposibility

Provides common config files.

### Current configs

-   Eslint
-   Vitest

## Recommended workflow

### New config file type

1. Create a separate file for it, import the necessary packages, etc.
2. Create a .d.ts file, if necessary
3. Add tests, if applies
4. Export both from the package.json "exports" key
5. Update with changesets (see root script)

### New Eslint config

1. Export a new variable from eslint.config.js
2. Update eslint.d.ts type (add a new string corresponding to the exported variable)
3. Update with changesets (see root script)
