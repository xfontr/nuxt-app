# UI

### Usage

Install it by adding to the corresponding workspace.

### Recommended workflow

1. Implement changes.
2. Altered any scss variables? Run `$ pnpm stylegen`
3. Optional: Build.
4. Update version with `$ pnpm changesets:add` (at root package.json)

### Single source of truth for scss variables

In order to keep it that way, please use @portfolio/stylegen to automatically update TS variables. Simplest way:

```bash
$ pnpm stylegen
```
