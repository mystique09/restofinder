FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

EXPOSE ${PORT}

RUN pnpm run build

FROM node:18-alpine AS production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist

COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --prod

ARG HOST
ARG PORT
ARG FOUR_SQUARE_API_KEY
ARG GEMINI_KEY

ENV HOST=${HOST} \
    PORT=${PORT}\
    FOUR_SQUARE_API_KEY=${FOUR_SQUARE_API_KEY}\
    GEMINI_KEY=${GEMINI_KEY}

CMD ["node", "./dist/index.js"]