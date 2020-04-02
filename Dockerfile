FROM node:10.15.3

ENV HOME=/home/app
ENV APP_HOME=$HOME/.anontown

WORKDIR $APP_HOME

COPY package.json package-lock.json $APP_HOME/
RUN npm ci --no-progress
COPY lerna.json $APP_HOME/
COPY schema.json $APP_HOME/
COPY packages $APP_HOME/packages
RUN npx lerna bootstrap --ci --no-progress \
  && npx lerna run build --scope @anontown/client --include-filtered-dependencies \
  && npx lerna run build --scope @anontown/bff --include-filtered-dependencies

CMD cd packages/bff && npm start
