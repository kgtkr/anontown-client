FROM --platform=$BUILDPLATFORM node:20.11.0-slim as build

WORKDIR /workdir

COPY packages ./packages
COPY package.json package-lock.json lerna.json tsconfig.base.json ./
RUN npm ci
# viteのバグ回避のため2回ビルド
RUN npx lerna run build && npx lerna run build

FROM node:20.11.0-alpine

WORKDIR /workdir

ENV STATIC_ROOT_DIR=./static/

COPY --from=build /workdir/packages/bff/dist/app.js ./
COPY --from=build /workdir/packages/client/dist ./static

CMD ["node", "app.js"]

