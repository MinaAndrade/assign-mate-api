<h1 align="center" > NestJS Auth REST API Template </h1>

<p align="center">
<img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
</p>

## Descrição

**`NestJS Auth REST API Template`** com autenticação JWT.

Este **`NestJS Auth REST API Template`** foi projetado para dar um impulso inicial ao seu processo de desenvolvimento com um sistema de autenticação de usuário robusto e rotas protegidas. Construído usando Nest.js, Prisma e Postgres, este modelo fornece recursos essenciais, como registro de usuário, login, autenticação JWT e uma API CRUD para gerenciar usuários. A API também é totalmente documentada usando Swagger para fácil integração e compreensão.

## Principais recursos

- Registro de usuário: permite que os usuários criem novas contas com segurança.

- Login e autenticação: autentique usuários usando tokens JWT para acesso seguro a rotas protegidas.

- Rotas protegidas: implemente controle de acesso baseado em função para garantir que apenas usuários autorizados possam acessar endpoints específicos.

- Operações CRUD do usuário: simplifique o gerenciamento de usuários com operações CRUD para criar, ler, atualizar e excluir dados do usuário.

- Documentação do Swagger: documentação abrangente com a interface do usuário do Swagger para fácil exploração e integração de API.

## Tecnologias usadas

- Nest.js: uma estrutura progressiva do Node.js para criar aplicativos do lado do servidor eficientes, confiáveis ​​e escaláveis.

- Prisma: kit de ferramentas de banco de dados moderno para Node.js e TypeScript, fornecendo acesso e migrações de banco de dados com segurança de tipo.

- Postgres: poderoso sistema de banco de dados relacional de código aberto para armazenar e gerenciar dados com segurança.

- JWT: tokens da Web JSON para autenticação e autorização seguras.

## Primeiros passos

### 1. Clone o repositório
### 2. Instale dependências
```bash
npm install
```
### 3. Atualize o arquivo .env
Veja o arquivo `.env.template` para mais informações

### 4. Inicie o contêiner do BD
O Docker Desktop deve estar aberto
```bash
docker compose up -d
```
### 5. Crie tabelas do BD
```bash
npx prisma migrate dev --name "Initial Schema"
```
### 6. Preencha as tabelas do BD
Dois usuários serão criados. O primeiro como administrador `p1@correo.com` e o segundo como usuário `p2@correo.com`, mesma senha para ambos `123456`.
```bash
npm run seed
```

### 7. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

## Documentação

### Swagger

A documentação da API é gerada usando o Swagger, um conjunto poderoso, mas fácil de usar, de ferramentas de desenvolvedor de API para equipes e indivíduos, permitindo o desenvolvimento em todo o ciclo de vida da API, desde o design e a documentação até o teste e a implantação.
Você pode acessar uma versão demo da documentação do Swagger para este APY no seguinte link: [**`NestJS Auth REST API Template Swagger Documentation`**](https://juliancallejas.github.io/NestJS-Auth-REST-API-Template-SwaggerDoc/)

Você também pode acessar a documentação do Swagger com a REST API em execução localmente visitando <a href="http://localhost:3000/api" >http://localhost:3000/api</a>.

### Postman

Além da documentação do Swagger, também fornecemos uma documentação abrangente do Postman para a **`NestJS Auth REST API`**.

A coleção de documentação do Postman está disponível em [**`NestJS Auth REST API Template Postman Documentation`**](https://www.postman.com/jc-develop/workspace/nest-auth-rest-apis/documentation/22997111-3a008800-dea9-4b27-b1bc-2a3ac5be1e33)

Observe que você precisará ter o Postman instalado em sua máquina para importar e usar a coleção.

Nossa documentação do Postman inclui uma coleção de cerca de **160 testes** que abrangem todos os pontos de extremidade da API. Esses testes servem como um recurso valioso para entender os padrões esperados de solicitação e resposta e para validar a funcionalidade da API. Este é o relatório para a última execução de teste com 3 iterações: [**`NestJS Auth REST API Template PostgreSQL Prisma Tests`**](https://juliancallejas.github.io/NestJS-Auth-REST-API-Template-Postgres-Prisma-Test/)

Você pode acessar a coleção de testes em [**`NestJS Auth REST API Template Postman Test Collection`**](https://www.postman.com/jc-develop/workspace/nest-auth-rest-apis/documentation/22997111-7ae8198b-97f8-4e01-9830-77dd1e10088b)

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para bifurcar este repositório, fazer melhorias e enviar solicitações de pull para aprimorar a funcionalidade ou adicionar novos recursos.

## Licença
Este projeto é licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

