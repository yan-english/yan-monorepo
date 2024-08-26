# Install dependencies only when needed
FROM docker.io/node:lts-alpine as develop
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY package.json .
RUN npm install --omit=dev

# Production image, copy all the files and run nest
FROM docker.io/node:lts-alpine as production
RUN apk add --no-cache dumb-init
ENV NODE_ENV production
ENV PORT 3000
WORKDIR /usr/src/app
COPY --from=develop /usr/src/app/node_modules ./node_modules
COPY --from=develop /usr/src/app/package.json ./package.json
COPY dist/packages/yan-api .
RUN chown -R node:node .
USER node
EXPOSE 3000
CMD ["dumb-init", "node", "main.js"]
