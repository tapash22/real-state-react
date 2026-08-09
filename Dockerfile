FROM node:20-alpha AS builder

WORKDIR /app

COPY package*.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]