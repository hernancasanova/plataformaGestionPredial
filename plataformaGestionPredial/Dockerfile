FROM node:16

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

#RUN npm install

copy . .

#EXPOSE 4201 


# FROM node:16 as node
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build --prod
# #stage 2
# FROM nginx:alpine
# COPY --from=node /app/dist/vcp /usr/share/nginx/html
# EXPOSE 4200