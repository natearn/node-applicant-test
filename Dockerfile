FROM node:alpine

RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY . .

RUN chown -R node:node .
USER node

CMD sh
