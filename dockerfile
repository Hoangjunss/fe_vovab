# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# 1. Khai báo "biến tạm" (Build Argument)
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID

# 2. Gán biến tạm cho biến môi trường thực tế
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID

# Copy package files và cài dependencies
COPY package*.json ./
RUN npm ci --only=production=false

# Copy toàn bộ source
COPY . .

# Build Next.js
RUN npm run build

# Production stage (giữ nguyên)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]