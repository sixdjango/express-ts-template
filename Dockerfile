FROM node:18.15.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY .env ./
COPY ./build ./build

RUN npm ci --omit=dev
# If you are building your code for production
# RUN npm ci --omit=dev

EXPOSE 7456

CMD [ "npm", "run","prod" ]