Sistema - Buslab v3

Buslab v3

# Docker Configurações

## Servidor Produção ou UHML
Para rodar este projeto no servidor de produção ou UHML, utilizar o Dockerfile contido na pasta .container.

**importante:** 
- Pasta '.container': O arquivo Dockerfile uma variável ambiente chamada **$SITE**, este variável deve conter o domínio da aplicação. Ex: api.buslab.com.br;
- Pasta '.container': O arquivo Dockerfile uma variável ambiente chamada **$FOLDER**, este variável deve conter o caminho da pasta raiz até a pasta que contém o dockerfile da produção;

O mesmo dito para produção se adequa para o Dockerfile de desenvolvimento.

## Servidor Localhost
Para rodar este projeto no servidor local (locahost), deve-se copiar o arquivo Dockerfile e .dockerignore contidos na pasta .container para a pasta raiz do projeto. Neste caso as variaveis ambientes estarão contidas nos arquivos .env.

Não será necessário alterar nada no Dockerfile para rodar localmente.

**importante:** O sistema está configurado para acessar o banco de dados da UHML, portanto caso vá usá-lo, deve-se ligar a VPN.

<br>

# Configurações Antigas (Digital Ocean)

## Instalação para desenvolvimento

#### Instalação de pacotes
Logo após clonar o repositório, rodar instalação de pacotes com o npm
```
npm install
```

#### Rodar servidor
Pode-se utilizar o próprio node para levantar o servidor
```
node index.js
```

Ou pode-se utilizar o nodemon, caso você NÃO TENHA INSTALADO ainda, para alterar o código e não precisar reiniciar o servidor toda vez
```
sudo npm install -g nodemon
```
Para inciar o servidor
```
nodemon index.js
```

## Instalação para produção

#### Instalação de pacotes
Logo após clonar o repositório, rodar instalação de pacotes com o npm
```
npm install --production
```

#### Para iniciar o servidor
Caso ainda NÃO TENHA INSTALADO, utilizar o pacote forever do npm
```
sudo npm install -g forever
```
Para iniciar o servidor em background
```
forever start -w index.js
```
#### Para derrubar o servidor
Listar processos do forever
```
forever list
```
Parar processo da pilha
```
forever stop <indice-da-pilha>
```
