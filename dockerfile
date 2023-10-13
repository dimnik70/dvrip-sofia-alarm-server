FROM node:lts-alpine
WORKDIR /app
COPY ./package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
RUN chown -R node /app
USER node
CMD ["npm", "start"]