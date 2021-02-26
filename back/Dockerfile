FROM node:14

RUN mkdir /src

RUN yarn add nodemon

WORKDIR /src
ADD /package.json /src/package.json
RUN yarn install

EXPOSE 3000
COPY . .
CMD yarn start-js