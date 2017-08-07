# Exemplo API Fábrica de Software Fatec Itapetininga
### Dependências:
- NodeJS
- MongoDB
- Node Modules:
- - ExpressJS
- - Mongoose
- - Morgan
- - BodyParser

### Collection
- Users:
- - name: string
- - password: uncrypted, string
- - email: string
- - username: index, string

### Project Structure
- **root:**
- - .gitignore
- - index.js: *Script principal da aplicação*
- - package.json
- - swagger.json: *Configuração do Swagger e documentação da API*

- **Conifg:** *Pasta de Configurações*
- - dbConfig.js: *Script de configuração que armazena as informações de conexão com o banco de dados*

- **Models:** *Pasta de Modelos onde serão armazenados todos os schemas*
- - Users.js: *Modelo da coleção de usuários*

- **Routes:** *Pasta de Rotas onde serão armazenados todos os arquivos de rotas da aplicação*
- - userRoutes.js: *Rotas /users da aplicação*

## Rotas
### /api
- **/test**
- > GET

- **/users**
- > GET
- > POST

- **/users/{username}**
- > GET
- > POST
- > PUT
- > DELETE

## Installation
Instale as dependências descritas no *package.json* utilizando um dos comandos abaixo:
> yarn install

> npm install

Inicie o serviço utilizando um dos comandos abaixo
> yarn start

> npm start

> node index.js

> nodemon index.js *depende do plugin nodemon*

## Use
Após o serviço iniciado a API estará disponível para acesso na **porta 5000** de seu servidor. 
> *O Swagger está configurado para funcionar no servidor local de seu computador, caso deseje testar a API rodando em um serviço de cloud, altere o endereço do host no arquivo de configuração do Swagger*
