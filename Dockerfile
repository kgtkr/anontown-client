FROM --platform=$BUILDPLATFORM node:16.17.0-slim as build

WORKDIR /workdir

COPY packages ./packages
COPY package.json package-lock.json lerna.json tsconfig.base.json ./
RUN npm ci
RUN npx lerna run build

FROM node:16.17.0-alpine

WORKDIR /workdir

ENV STATIC_ROOT_DIR=./static/

COPY --from=build /workdir/packages/bff/dist/app.js ./
COPY --from=build /workdir/packages/client/dist ./static

CMD ["node", "app.js"]

