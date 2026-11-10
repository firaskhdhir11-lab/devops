FROM node:22-alpine
RUN apk update && apk upgrade --no-cache zlib

WORKDIR /app

RUN npm install -g npm@11.21.2

COPY package*.json ./
RUN npm install --omit=dev

COPY server.js ./server.js

ENV NODE_ENV=production
ENV PORT=3003

EXPOSE 3003

RUN chown -R node:node /app
USER node

CMD ["npm", "start"]
