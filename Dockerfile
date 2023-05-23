FROM node:lts

WORKDIR /usr/app

COPY answers-pdf-service/. .

RUN yarn install
RUN yarn run build

EXPOSE $PORT
CMD ["yarn", "start"]