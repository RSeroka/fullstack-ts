# syntax=docker/dockerfile:1

FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production 
COPY dist dist
CMD ["node", "./dist/src/express/server.js"]