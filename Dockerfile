FROM node:14 as base

# Create app directory
WORKDIR /app

# Copy dependency packages
COPY yarn.lock ./
COPY package.json ./
COPY prisma ./prisma/

# Install global deps
RUN npm i -g @nestjs/cli

# Install app dependencies
RUN yarn

# Install ohmybash
RUN bash -c "$(curl -fsSL https://raw.githubusercontent.com/ohmybash/oh-my-bash/master/tools/install.sh)"

# Setup multi-stage build (selected by DOCKER_TARGET)

# Development Stage build
FROM base as development
ENV NODE_ENV=development
CMD ["yarn", "start:dev"]

# Production Stage build
FROM base as production
ENV NODE_ENV=production
RUN yarn build
CMD ["yarn", "start:prod"]
