FROM node:18 AS builder

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Build application
RUN npm run build

FROM nginx:alpine

# Copy builded app to Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]