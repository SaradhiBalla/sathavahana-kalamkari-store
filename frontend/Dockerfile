# syntax=docker/dockerfile:1.7

FROM node:22.14.0-alpine3.21 AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

FROM node:22.14.0-alpine3.21 AS build
WORKDIR /app
ARG NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22.14.0-alpine3.21 AS runtime
ENV NODE_ENV=production
WORKDIR /app
RUN addgroup --system --gid 10001 nodejs \
    && adduser --system --uid 10001 nextjs
COPY --from=build --chown=nextjs:nodejs /app/.next ./.next
COPY --from=build --chown=nextjs:nodejs /app/package.json /app/package-lock.json ./
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules
USER nextjs
EXPOSE 3000
CMD ["npm", "run", "start"]
