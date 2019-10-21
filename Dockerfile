FROM node:lts-alpine

WORKDIR /app
RUN apk update && \
    apk add --no-cache curl && \
    curl -o- -L https://yarnpkg.com/install.sh | sh

ENV PATH $HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH
CMD ["tail", "-f", "/dev/null"]