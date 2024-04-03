# syntax=docker/dockerfile:1

FROM node:20-alpine

ARG COMMIT_SHA
ARG NEXT_PUBLIC_API_HOST

ENV COMMIT_SHA=$COMMIT_SHA

ENV NODE_ENV=production

WORKDIR /fe-app

COPY .next/standalone .


CMD ["node", "server.js"]