# Use Node.js 18
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies (no nodemon)
RUN npm install --omit=dev

# Copy all your code
COPY . .

# Expose port 8080 (matches your server.js)
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]