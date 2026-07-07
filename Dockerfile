FROM node:24-alpine AS base
WORKDIR /app

# ----- deps -----
FROM base AS deps
COPY package.json package-lock.json .
RUN npm ci

# ----- builder -----
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ----- runner -----
FROM node:24-alpine AS runner
WORKDIR /app

# ENV NODE_ENV=production
# ENV PORT=3000
# ENV V2_BASE_URL=https://api.cartinoapp.ir/v2
# ENV V1_BASE_URL=https://api.cartinoapp.ir/v1

# برای امنیت بهتر
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

# فایل‌های لازم runtime
COPY --from=builder /app/public ./public
COPY --from=deps /app/package.json /app/package.json
COPY --from=builder /app/.next/ ./app/.next

USER nextjs
EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]
