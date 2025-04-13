#!/bin/sh

export NITRO_HOST="0.0.0.0"
export NITRO_PORT="8080"

node --max-http-header-size 32768 packages/app/.output/server/index.mjs