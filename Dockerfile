FROM node:20

WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .

RUN npx prisma generate

EXPOSE 5000

# Démarre ton code TypeScript directement
CMD ["npx", "tsx", "index.ts"]
