FROM nginx:1.21-alpine

WORKDIR /frontend

COPY frontend/package.json package.json
COPY frontend/package-lock.json package-lock.json

RUN apk --update add nodejs=16.14.2-r0 npm
RUN npm install

COPY frontend/ ./
RUN npm run build

COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
