#!/bin/bash

echo "Renovando Certificado!"

#rodar servidor
/var/www/certbot-server/node server.js &

# rodar 
# node server.js &

#rodar
#certbot certonly --manual e gravar saida em arquivo log
expect -c "
spawn /var/www/certbot-server/certbot certonly --manual
expect \"Please enter in your domain name(s) (comma and/or space separated)  (Enter 'c' to cancel): \"
send \"realtime.buslab.com.br\r\"
interact " > /var/www/socket-io/renova/log

#spawn /var/www/certbot-server/certbot certonly --manual -d realtime.buslab.com.br > renova/log

#chamar um script php para criar a pasta com a chave criada pelo certbot
php /var/www/socket-io/script.php

#reinicia o arquivo index.js
forever stop -w index.js
forever start -w index.js

echo "Certificado Renovado!"