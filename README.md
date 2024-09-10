
# Challenge V4 company - Open Food API

>  This is a challenge by [Coodesh](https://coodesh.com/)


## Apresentação

Desenvolvimento de uma aplicação Node.js com TypeScript e Docker, integrando MongoDB, Elasticsearch e Sentry para importação e gerenciamento de dados de produtos alimentícios, com suporte a CRON jobs diários e documentação Swagger para a API.

### Ferramentas utilzadas.
* Node.js
* TypeScript
* Express
* MongoDB
* Elasticsearch
* Sentry
* Docker
* Swagger
* CRON
* Jest

### Criação de um sistema monolíto com as seguintes caracteristicas.
* API REST para atender as consultas da empresa.
* Sistema de importação automáticas de produtos.
* Integrado ao Sentry para monitoramento de erros
* Sistema dockerizado.
* Automatizaçao com cron.

### Como foi projetado
* Primeiramente foi criado em uma arquitetura mais simplificada e depois refatorada para o uso do DDD.
* Decidi criar os servidores de banco de dados e elasticsearch em containers para acessar localmente
* Foi decidido utilizar o Sentry pela facilidade de uso e ferramentas disponíveis.



## Instalação

1. **Clone o Repositório:**
    ```bash
    git clone https://github.com/ocdigital/open_food_api.git
    ```

2. **Acesse o Diretório do Projeto:**
    ```bash
    cd open_food_api
    ```

3. **Crie os containers e execute em segundo plano**
    ```bash
    docker-compose up --build -d

    ```

7. **Para executar os Testes unitários:**
    ```bash
    npm test
    ```

7. **Gerar o token jwt para usar na documentação:**
    ```bash
    ts-node tokenGenerator.ts
    ```

## Documentação da API

Explore a documentação da API em http://localhost:3000/api-docs

Caso queria utilizar Postman ou Insomina, há um arquivo de configuração na raiz do projeto: Insomnia_2024-09-09.json


Qualquer dúvida estou a disposição, obrigado 😀
