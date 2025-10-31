FROM node:20

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install --production=false

COPY . .

RUN npx prisma generate

RUN yarn build || true 

EXPOSE 5000

CMD ["yarn", "dev"]


