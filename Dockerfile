# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package management files
COPY package*.json ./

# Pass legacy peer deps flag and set environment to production
RUN npm ci --legacy-peer-deps

# Copy rest of application code
COPY . .

# Pass node memory limit in case GSAP/large builds crash Alpine V8 worker
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build the static production bundle
RUN npm run build

# Stage 2: Serve stage
FROM nginx:alpine AS runner

# Delete default nginx static files to avoid stale caching
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from Stage 1 (handles standard Create React App 'build' directory)
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom Nginx configuration for Client-Side Routing (React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]