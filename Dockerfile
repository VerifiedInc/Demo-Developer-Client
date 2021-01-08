# Stage 0, "build-stage" to build/compile the frontend
FROM node:14.15.0-alpine as build-stage

RUN apk update && \
    apk upgrade && \
    apk add git

WORKDIR /app

COPY package.json /app/
COPY yarn.lock /app/

RUN yarn install

COPY ./ /app/

ARG API_URL
ENV REACT_APP_API_URL=${API_URL}

RUN yarn build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=build-stage /app/build/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
