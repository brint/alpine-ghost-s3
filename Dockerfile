FROM alpine:3.3

ENV GHOST_VERSION 0.7.9
ENV GHOST_USER ghost

RUN apk update && \
  apk upgrade && \
  apk add --no-cache curl unzip && \
  apk add --update --repository http://dl-cdn.alpinelinux.org/alpine/edge/main nodejs-lts && \
  adduser -D -s /bin/bash $GHOST_USER && \
  curl -sL -o ghost.zip "https://ghost.org/archives/ghost-${GHOST_VERSION}.zip" && \
  unzip ghost.zip && \
  npm install --production && \
  npm install --save ghost-s3-compat && \
  rm ghost.zip && \
  npm cache clean && \
  chown -R $GHOST_USER:$GHOST_USER /content && \
  apk del curl unzip && \
  rm -rf /tmp/*

COPY config.js /config.js
COPY index.js /content/storage/ghost-s3/index.js

USER $GHOST_USER
EXPOSE 2368
CMD ["npm", "start", "--production"]
