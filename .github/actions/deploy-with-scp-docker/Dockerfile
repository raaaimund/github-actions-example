FROM alpine:3.11.6
RUN apk add --update openssh sshpass
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]