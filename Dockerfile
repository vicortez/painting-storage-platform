# syntax=docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=24.0.2
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Set up directory structure matching local dev
# Install server dependencies
COPY server/package-lock.json server/package.json ./server/
RUN npm ci --prefix ./server --include=dev

# Install client dependencies
COPY client/package-lock.json client/package.json ./client/
RUN npm ci --prefix ./client --include=dev

# Copy application code
COPY server/ ./server/
COPY client/ ./client/

# Build application (npm run build expects to run from server directory)
RUN npm run build2 --prefix ./server

# Remove development dependencies
RUN npm prune --prefix ./server --omit=dev

# Final stage for app image
FROM base

# Copy built server application (contains built client assets)
COPY --from=build /app/server /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3003
CMD [ "npm", "run", "start" ]
