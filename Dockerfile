FROM node:22-slim AS development

RUN apt-get update && apt-get install -y dos2unix && rm -rf /var/lib/apt/lists/*

WORKDIR /home/node/app

COPY --chown=node:node start-dev.sh ./

RUN chmod +x start-dev.sh && dos2unix start-dev.sh

USER node

CMD [ "sh", "/home/node/app/start-dev.sh" ]

FROM node:22-alpine AS production

WORKDIR /home/node/app

COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production --ignore-scripts

COPY --chown=node:node . ./

RUN yarn build

RUN mkdir -p /home/node/app/dist/tmp && chown -R node:node /home/node/app/dist && chmod -R 755 /home/node/app/dist

USER node

CMD [ "yarn", "start:prod" ]
