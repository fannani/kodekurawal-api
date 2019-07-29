FROM node:12
ARG PORT
ARG DB_HOST
ARG MODE
ARG PORT=$PORT
ARG DB_HOST=$DB_HOST
ARG MODE=$MODE
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD [ "npm","start" ]
