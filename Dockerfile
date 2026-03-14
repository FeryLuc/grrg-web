FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
# Nuxt doit écouter sur 0.0.0.0 pourêtre accessible hors du container
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

CMD ["npm", "run", "dev"]