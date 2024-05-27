FROM nginx:bookworm
COPY docs /etc/nginx/website
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
