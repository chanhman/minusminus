# Use Node.js as the base image
FROM node:23-alpine AS base

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire app code
COPY . .

# Stage for building the React Remix app
FROM base AS build
RUN npm run build

# Final runtime image
FROM node:23-alpine AS final
WORKDIR /app

# Copy built Vite app and dependencies from the build stage
COPY --from=build /app /app

# Expose necessary ports for Vite (5173)
EXPOSE 5173

# Add a startup script for Vite
COPY ./startup.sh /app/startup.sh
RUN chmod +x /app/startup.sh

# Set the default command to run the startup script
CMD ["sh", "./startup.sh"]
