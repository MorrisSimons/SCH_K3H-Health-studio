From node:18-alpine
RUN mkdir /backend
COPY package.json /backend
WORKDIR /backend
RUN npm install
COPY . /backend
EXPOSE 5000
CMD ["npm","run server"]