FROM node:18.14.2-alpine3.17 as deps
WORKDIR /app

COPY package.json ./
RUN yarn install --frozen-lockfile --peer


FROM node:18.14.2-alpine3.17 as builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .
RUN yarn build:prod

FROM node:18.14.2-alpine3.17 as runner
WORKDIR /app

COPY package.json ./
RUN yarn install --prod
COPY --from=builder /app/dist ./dist
EXPOSE 3001
CMD [ "node","dist/index" ]
