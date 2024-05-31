FROM nginx:bookworm
COPY docs /etc/nginx/website
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8082
CMD ["nginx", "-g", "daemon off;"]
