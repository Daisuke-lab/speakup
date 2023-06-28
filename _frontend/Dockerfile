FROM node:16
COPY . /root/workspace/
WORKDIR /root/workspace/
RUN npm install --force
RUN export NODE_OPTIONS=--openssl-legacy-provider
RUN npm start

#https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported