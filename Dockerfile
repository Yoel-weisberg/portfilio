# Use Node.js LTS as base image
FROM node:18-alpine AS base

# Install dependencies needed for Prisma
RUN apk add --no-cache libc6-compat openssl

# Set working directory
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Prisma setup - explicitly install and generate
RUN npm install prisma@latest @prisma/client@latest --save-dev
COPY prisma ./prisma
RUN npx prisma generate

# Copy application code
COPY . .

# Next.js build
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=base --chown=nextjs:nodejs /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/public ./public
COPY --from=base /app/prisma ./prisma

# Required for Prisma client
COPY --from=base /app/node_modules/.prisma ./node_modules/.prisma

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]