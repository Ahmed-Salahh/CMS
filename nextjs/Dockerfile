# Use the official Node.js image from the Docker Hub
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of the application code
COPY . .

# Copy the .env.local file to the container
COPY .env.local .env.local
 
# Build the Next.js app
RUN npm run build
 
# Expose the port the app runs on
EXPOSE 3000
 
# Command to run the app
CMD ["npm", "start"]