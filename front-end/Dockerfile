FROM node:latest

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install -g npm@11.4.2

COPY --chown=root:node . .

RUN chown -R root:node /home/node/app && \
    chmod -R g+rwX /home/node/app

USER node

ENV NODE_ENV="developer"

EXPOSE 5173

CMD [ "npm", "run", "dev", "0.0.0.0" ]