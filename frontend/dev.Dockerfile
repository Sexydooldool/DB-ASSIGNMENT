FROM node:lts-alpine

WORKDIR /app

COPY package.json /app
COPY . /app

RUN npm install -g npm && npm install

EXPOSE 3000

CMD ["npm", "start"]