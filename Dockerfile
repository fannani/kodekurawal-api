FROM node:12
ARG PORT
ARG DB_HOST
ARG MODE
ENV PORT = $PORT
ENV DB_HOST = $DB_HOST
ENV MODE = $MODE
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD [ "npm","start" ]
