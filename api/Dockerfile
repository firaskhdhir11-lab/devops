FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY server.js ./server.js

ENV NODE_ENV=production
ENV PORT=3003

EXPOSE 3003

RUN chown -R node:node /app
USER node

CMD ["npm", "start"]
