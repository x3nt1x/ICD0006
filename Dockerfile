FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

COPY ./workforce-manager-vue/dist /usr/share/nginx/html/vue-app
COPY ./workforce-manager-react/build /usr/share/nginx/html/react-app