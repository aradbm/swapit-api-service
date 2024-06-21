FROM node:20-alpine

# Install Python
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]