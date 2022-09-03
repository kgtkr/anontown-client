FROM node:16.17.0-slim as build

WORKDIR /home

COPY package.json package-lock.json ./
COPY packages/bff/package.json ./packages/bff/
COPY packages/client/package.json ./packages/client/
COPY packages/common/package.json ./packages/common/

RUN npm ci

COPY packages ./packages
COPY lerna.json tsconfig.base.json ./
RUN npx lerna run build

FROM node:16.17.0-alpine

WORKDIR /workdir

ENV STATIC_ROOT_DIR=./static/

COPY --from=build /workdir/packages/bff/dist/app.js ./
COPY --from=build /workdir/packages/client/dist ./static

CMD ["node", "app.js"]

