FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]

# # 1. Stage: dependencies
# FROM node:23.11-alpine AS deps
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm ci

# # 2. Stage: builder
# FROM node:23.11-alpine AS builder
# WORKDIR /app
# COPY . .
# COPY --from=deps /app/node_modules ./node_modules

# # ✅ รับจาก docker-compose build.args
# ARG NEXT_PUBLIC_API
# ENV NEXT_PUBLIC_API=$NEXT_PUBLIC_API

# # ให้ next.js เห็นตอน build
# RUN NEXT_PUBLIC_API=$NEXT_PUBLIC_API npm run build

# # 3. Stage: runner
# FROM node:23.11-alpine AS runner
# WORKDIR /app
# ENV NODE_ENV=production
# ENV PORT=3000
# ENV NEXT_PUBLIC_API=$NEXT_PUBLIC_API

# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# EXPOSE 3000
# CMD ["npm", "start"]
