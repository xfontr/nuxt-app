# Docker

### Quick start

Run `$ make init`. Make sure you have docker CLI installed, alongside with Docker's daemon.

### Usage

After the init, just make sure you keep refreshing the files, image and container by running `$ make refresh`.

# Setup

```bash
$ make init
```

### Scripts

```bash
$ make init # Sets everything up
$ make build # Builds image
$ make run # Runs container
$ make refresh # Delets old files and sets everything back up
```

### Recommendations

-   The setup.sh file should be covered by pipelines in PROD, so it basically serves to emulate a pipeline in local development.
-   To ensure this package is properly maintained, please only use Makefile commands.
