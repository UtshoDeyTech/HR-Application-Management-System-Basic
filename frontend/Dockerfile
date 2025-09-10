FROM node:18-alpine AS build

ARG BACKEND_API_URL=http://localhost:8080/api
ENV BACKEND_API_URL=$BACKEND_API_URL

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Replace API URL in environment file
RUN echo "export const environment = { production: true, apiUrl: '${BACKEND_API_URL}' };" > src/environments/environment.prod.ts

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist/hr-frontend /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]