FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_OPTIONS="--max-old-space-size=2048"

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]