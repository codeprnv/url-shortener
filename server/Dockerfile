# Use an official Node.js runtime as a parent image
FROM node:22.17-alpine

# Set the working directory inside the container to /src
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker layer caching.
# This step only re-runs if these files change, speeding up subsequent builds 
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code into the container at /src

COPY . .

# Make port 5001 available to the world outside this container
EXPOSE 5001

# Define the command to run the application.
# 'npm run dev' will use nodemon for live-reloading during development.
CMD ["npm", "run", "dev"]