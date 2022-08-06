# RESTful API Server

## Sobre

este é o repositório da API Rest do CAPJu e foi utilizado o seguinte para seu desenvolvimento:

- [Node.js](https://nodejs.org/en/) (Latest Version) Como ambiente de execução de JavaScript.
- [Express.js](https://expressjs.com/) Como framework de servidor e camada de controller.
- [MongoDB](https://www.mongodb.com/) Como camada de banco de dados
- [Mongoose](https://mongoosejs.com/) Como camada "ODM" / model

## Configurando acesso ao MongoDB

Caso exista um serviço MongoDB em nuvem, adicione a string de conexão a um arquivo .env dentro da pasta src/ com nome MONGODB_URI

Caso não seja configurada uma string de conexão personalizada, a aplicação se conectará à porta 27017 do serviço local

[Clique aqui](mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/) para instalar e executar o MongoDB localmente

## Como Executar

será necessário ter o Node instalado para realizar os passos a seguir:

0.  Clone o repositório

    git clone git@github.com:fga-eps-mds/2022-1-CAPJu-User.git

1.  Entre na pasta src dentro da pasta raíz

    cd 2022-1-CAPJu-User/src/

2.  Instale as dependências do NodeJs

    yarn

3.  Execute o servidor

    yarn start

4.  O servidor está acessivel em `http://localhost:3333`.

## instalando dependecias

pode ser utilizado o seguinte comando para inserir novas dependencias no sistema

```
yarn add "nome_da_dependencia"
```

uma alternativa ao comando acima é inserir a dependencia no arquivo [package.json](./src/package.json) executar novamente `yarn`

## testes

dentro da pasta src, execute `yarn test`
