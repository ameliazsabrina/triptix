# Use a stable Node.js version
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy tsconfig and source code
COPY tsconfig.json ./
COPY . .

# Create dist directory
RUN mkdir -p dist

# Build TypeScript code
RUN npx tsc

# Expose the port
EXPOSE 5000

# Start the application
CMD ["node", "dist/index.js"]
