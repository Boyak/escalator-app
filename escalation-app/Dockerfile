# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React application for production
RUN npm run build

# Expose the port that the React application will run on (usually 3000)
EXPOSE 3000

# Start the React application
CMD ["npm", "start"]