# Use the official Node.js image as the base image
FROM krmp-d2hub-idock.9rum.cc/goorm/node:20

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Expose the port the app runs on
EXPOSE 5173

# Start the application
CMD ["yarn", "preview", "--port", "5173"]