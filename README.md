# Nuxt app (WIP)

## Instructions

### Quick start

Install dependencies and run the app package:

```bash
$ pnpm i
$ pnpm --filter @portfolio/app dev
```

### Updating packages

Please use the changesets scripts in order to keep track of versioning. Since none of these packages are published in any registry, as of now the version updating is done locally with:

```bash
$ pnpm changeset:add
$ pnpm changeset:version
```

## Wait, but... what is this

This is just some sick, crazy boiler plate. At least, for now.

### Packages

-   Configs package: Global configs shared accross the app
-   Ui package: Shared ui components
-   App package: SSR vue+nuxt app
-   Stylegen package: Utils package that turns .scss variables into .ts files

### Also, includes

-   Docker
-   Husky hooks
-   A bunch of cool pipelines: sonar, dependency review, unit testing
-   Changesets

### Pending

-   CI/CD pipeline
-   Backend setup
