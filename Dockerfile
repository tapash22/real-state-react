FROM node:20-alpha AS builder

WORKDIR /app

<<<<<<< HEAD
COPY package*.json ./
=======
COPY package*.json package-lock.json ./
>>>>>>> 5847002 (update)

RUN npm ci

COPY . .

RUN npm run build

<<<<<<< HEAD
FROM node:20-alpine AS runner

# Copy built static assets from builder stage to Nginx web root
# Note: Change 'build' to 'dist' if you are using Vite instead of Create React App
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom Nginx config to handle React Router client-side routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

=======
FROM node:20-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

>>>>>>> 5847002 (update)
EXPOSE 80

<<<<<<< HEAD
CMD ["nginx", "-g", "daemon off;"]
=======
CMD ["nginx", "-g", "daemon off;"]
>>>>>>> 9192faa (update dev)
