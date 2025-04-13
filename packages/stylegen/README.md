# Stylegen

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
