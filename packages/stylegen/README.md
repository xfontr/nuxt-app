# Stylegen

## Recommended workflow (for devs)

1. Run `$ pnpm build:watch`
2. In a separate terminal, run `$ pnpm start`
3. Implement changes
4. Update version with `$ pnpm changesets:add` (at root package.json)

## Implementation

Minimal script example:

```bash
$ stylegen
```

Advanced usage example:

```bash
$ npx sass --no-source-map src/assets/scss/_global.scss _temp.css # Compiles specific css files
$ stylegen stylegen.json # Custom instructions path
$ rm _temp.css # Clean up
```

Instructions example:

```json
{
    "outDir": "src/configs",
    "compile": [
        {
            "name": "breakpoints",
            "path": "/src/assets/scss/variables/_breakpoints.scss"
        },
        {
            "name": "distances",
            "path": "/src/assets/scss/variables/_distances.scss"
        },
        {
            "name": "fonts",
            "path": "/src/assets/scss/variables/_fonts.scss"
        },
        {
            "name": "colors",
            "path": "_temp.css",
            "type": "THEME"
        }
    ]
}
```
