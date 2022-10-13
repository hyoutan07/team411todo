FROM node:16-alpine

RUN apk add --no-cache libc6-compat nano busybox
ENV NEXT_TELEMETRY_DISABLED 1
COPY . .

WORKDIR $PWS/front/todoapp/
RUN yarn install
RUN yarn build

EXPOSE 3000
