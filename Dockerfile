FROM node:12
WORKDIR /usr/src/app
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && \
    apt-get -y install gcc mono-mcs && \
    rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
COPY firebasekey.json ./build/
CMD [ "npm","start" ]
