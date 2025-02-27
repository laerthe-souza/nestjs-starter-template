# ---------- Development Stage ---------- #
FROM node:22-slim AS development

RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

WORKDIR /home/node/app

RUN echo '#!/bin/sh' > /home/node/start-dev.sh && \
    echo 'echo "\n🚀 Your container is ready..."' >> /home/node/start-dev.sh && \
    echo 'echo "\n🔥 Execute \"docker compose exec -it app bash\" in another terminal to access the container"' >> /home/node/start-dev.sh && \
    echo 'tail -f /dev/null' >> /home/node/start-dev.sh

RUN chmod +x /home/node/start-dev.sh

USER node:node

CMD [ "sh", "/home/node/start-dev.sh" ]

# ---------- Build Stage ---------- #
FROM node:22-alpine AS build

WORKDIR /home/node/app

COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --frozen-lockfile --ignore-scripts

COPY --chown=node:node . ./
RUN yarn build

RUN yarn install --production --frozen-lockfile --ignore-scripts

RUN chown -R node:node /home/node/app/dist && \
    chmod -R 755 /home/node/app/dist

# ---------- Production Stage ---------- #
FROM node:22-alpine AS production

WORKDIR /home/node/app

ENV NODE_ENV=production

COPY --from=build /home/node/app/package.json /home/node/app/yarn.lock ./
COPY --from=build /home/node/app/node_modules ./node_modules
COPY --from=build /home/node/app/dist ./dist

USER node:node

CMD [ "yarn", "start:prod" ]