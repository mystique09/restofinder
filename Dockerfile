
FROM node:22-alpine AS base

FROM base AS builder

RUN apk add --no-cache gcompat
WORKDIR /app

COPY package*json tsconfig.json src ./

RUN npm install && \
    npm run build && \
    npm prune --production

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono

COPY --from=builder --chown=hono:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=hono:nodejs /app/dist /app/dist
COPY --from=builder --chown=hono:nodejs /app/package.json /app/package.json

ARG HOST
ARG PORT
ARG FOUR_SQUARE_API_KEY
ARG GEMINI_KEY

ENV HOST=${HOST} \
    PORT=${PORT}\
    FOUR_SQUARE_API_KEY=${FOUR_SQUARE_API_KEY}\
    GEMINI_KEY=${GEMINI_KEY}

USER hono
EXPOSE ${PORT}

CMD ["node", "/app/dist/index.js"]