# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the application files into the working directory
COPY . /app

# Expose ports 80 and 443
EXPOSE 3500

# Install the application dependencies
RUN npm install

# Define the entry point for the container
CMD ["npm", "start"]