FROM node:14 as base

# Create app directory
WORKDIR /app

# Install global deps
RUN npm i -g @nestjs/cli \
&& bash -c "$(curl -fsSL https://raw.githubusercontent.com/ohmybash/oh-my-bash/master/tools/install.sh)"

# Copy dependency packages
COPY yarn.lock ./
COPY package.json ./
COPY prisma ./prisma/

# Install dependencies
RUN yarn

# Setup multi-stage build (selected by DOCKER_TARGET)

# Development Stage build
FROM base as development
ENV NODE_ENV=development
CMD ["yarn", "start:dev"]

# Production Stage build
FROM base as production
COPY . .
ENV NODE_ENV=production
RUN yarn build
CMD ["yarn", "start:prod"]
