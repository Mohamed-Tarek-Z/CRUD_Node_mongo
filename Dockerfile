FROM node 

WORKDIR /api

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "app.js"]