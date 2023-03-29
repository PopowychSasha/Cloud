FROM node:14-alpine
WORKDIR /app

COPY . .
WORKDIR /app/client
RUN npm install
RUN npm run build

WORKDIR /app/server
RUN cp -r /app/client/build /app/server
RUN rm -r /app/client/build

RUN npm install
WORKDIR /app
RUN npm install
CMD [ "npm", "run", "server_prod" ]