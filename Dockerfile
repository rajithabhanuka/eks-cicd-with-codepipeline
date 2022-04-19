# syntax=docker/dockerfile:1

FROM public.ecr.aws/docker/library/node:14.17.0-stretch-slim
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
EXPOSE 3000
CMD [ "node", "server.js"]