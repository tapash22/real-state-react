FROM node:20-alpha AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20-alpine AS runner

# Copy built static assets from builder stage to Nginx web root
# Note: Change 'build' to 'dist' if you are using Vite instead of Create React App
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom Nginx config to handle React Router client-side routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
