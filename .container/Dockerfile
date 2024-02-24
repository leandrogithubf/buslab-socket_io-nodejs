# Imagem Base Ubuntu 18.04
FROM ubuntu:18.04 as base_socketio_image

# Variaveis Ambiente
ENV FOLDER=./.container
ENV PORT = 80

# Instalando pacotes bases do Ubuntu
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive
RUN apt-get install -y software-properties-common curl

# Configurar Timezone para America/Sao_Paulo
ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Adicionando repositório PHP
RUN apt-get update && add-apt-repository ppa:ondrej/php

# Instalando Extensões do PHP
RUN apt-get update && \
    apt-get install -y --no-install-recommends \        
        php7.4 \
        php7.4-apcu \
        php7.4-bcmath \
        php7.4-calendar \
        php7.4-cli \
        php7.4-common \
        php7.4-curl \
        php7.4-dev \
        php7.4-gd \
        php7.4-intl \
        php7.4-json \
        php7.4-mbstring \
        php7.4-mysql \
        php7.4-mysqli \
        php7.4-opcache \
        php7.4-pgsql \
        php7.4-readline \
        php7.4-sqlite3 \
        php7.4-xml \
        php7.4-xmlwriter \
        php7.4-xmlreader \
        php7.4-zip \
        php7.4-redis \
        php7.4-soap \
        php7.4-pdo \
        php7.4-sockets \
        php7.4-ftp \
        php7.4-fpm \
        libapache2-mod-php7.4 \
        libpq-dev  

# Instalando Node
RUN curl -fsSL https://deb.nodesource.com/setup_13.x | bash - \
    && apt-get -y install --no-install-recommends \
    zlib1g-dev libzip-dev zip libpng-dev libicu-dev \
    wget gpg gpg-agent unzip libxml2-dev nodejs \
    && npm install --global yarn

# Instalando editor Nano
RUN apt-get update && \
    apt-get install -y nano

# Instalando GIT
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git

# Limpando dados
RUN apt clean
RUN rm -rf /var/lib/apt/lists/*

###################################################################

FROM base_socketio_image as depedencies_socketio_image

WORKDIR /var/www/socket-io

COPY package.json .
COPY package-lock.json .

RUN npm install --omit=dev

RUN npm install forever -g 

###################################################################

FROM depedencies_socketio_image as project_socketio_image

WORKDIR /var/www/socket-io

COPY . .

EXPOSE 80

CMD ["forever", "/var/www/socket-io/index.js", "80"]

#CMD ["forever", "start" ,"-w", "/var/www/socket-io/index.js"]
