FROM node:22-alpine
RUN apk update && apk upgrade --no-cache zlib

WORKDIR /app


COPY package*.json ./
RUN npm install --omit=dev

COPY server.js ./server.js

ENV NODE_ENV=production
ENV PORT=3003

EXPOSE 3003

RUN chown -R node:node /app
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx
USER node

CMD ["node", "server.js"]
