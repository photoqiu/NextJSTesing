FROM node:alpine AS deps
# libc6-compat might be needed. https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat
#设置工作目录
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 重新打包源代码
FROM node:alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

# 拷贝所有文件到work目录
FROM node:alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# 在没有使用默认配置情况下，拷贝 next.config.js 文件
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app/.next
USER nextjs

EXPOSE 3000
CMD ["yarn", "start"]