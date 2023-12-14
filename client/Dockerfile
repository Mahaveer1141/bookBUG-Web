FROM node:16-alpine

RUN mkdir app
RUN apk update && apk upgrade && apk add bash

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

CMD ["yarn", "dev"]

EXPOSE 3000
