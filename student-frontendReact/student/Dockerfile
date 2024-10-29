# Use a base image with Node.js installed
FROM node:16-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Application
RUN npm run build

# Use a lightweight Node.js base image for runtime
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app/build ./build

# Install a simple static file server
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Command to start the server
CMD ["serve", "-s", "build"]

