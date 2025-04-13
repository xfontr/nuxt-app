FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable

COPY app/ ./
COPY scripts/ ./

RUN pnpm i && \
    pnpm --filter @portfolio/app build && \
    chmod -R 755 run.sh

CMD ["sh", "run.sh"]
