FROM node:14

USER node
WORKDIR /home/node/

COPY package.json yarn.lock ./
RUN yarn install
COPY . .
CMD npm start
