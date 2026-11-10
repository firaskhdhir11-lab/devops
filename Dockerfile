FROM node:22-alpine
RUN apk update && apk upgrade --no-cache zlib
RUN npm install -g npm@11.21.2

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG NEXT_PUBLIC_API_URL=http://localhost:4005
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN npm run build

EXPOSE 3000

RUN chown -R node:node /app
USER node

CMD ["npm", "run", "start", "--", "--hostname", "0.0.0.0"]
