FROM node:22.11.0-alpine3.20 AS deps

WORKDIR /app

COPY package*.json ./

RUN HUSKY=0 npm ci

FROM node:22.11.0-alpine3.20 AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package*.json ./
COPY tsconfig.json ./
COPY tailwind.config.mjs ./
COPY astro.config.mjs ./
COPY src ./
COPY public ./

RUN npm run build 

RUN npm prune --production

FROM node:22.11.0-alpine3.20 AS runner

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=deps /app/package*.json ./
COPY --from=build /app/dist ./dist

CMD ["node", "./dist/server/entry.mjs"]