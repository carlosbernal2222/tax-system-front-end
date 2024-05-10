# Fetching the latest node image on alpine linux
FROM node:16-alpine

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY package*.json .

RUN npm install

# Copying all the files in our project
COPY . .

# Expose port 5173 to the outside world
EXPOSE 5173

# Starting our application
CMD ["npm", "run", "dev"]


