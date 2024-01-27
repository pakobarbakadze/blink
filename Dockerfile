FROM node:20.9.0 AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20.9.0 AS production

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

COPY --from=development /app ./dist

CMD ["node", "dist/apps/users/main"]