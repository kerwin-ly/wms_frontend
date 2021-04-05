FROM nginx:stable
RUN mkdir -p web/logs

ADD dist/ /web/dist/
ADD docker/build/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80