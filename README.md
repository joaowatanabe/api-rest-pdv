# Desafio Backend - API REST PDV - Cubos Academy

## API REST - Sistema de Frente de Caixa

Este projeto consiste no desenvolvimento de uma API REST para um sistema de PDV (Ponto de Venda), utilizando banco de dados PostgreSQL. A API permite o cadastro, listagem, login, e gerenciamento de usuários (funcionários), produtos da loja, clientes, e pedidos, com foco em segurança e eficiência.

### Funcionalidades Implementadas
- **Gerenciamento de Usuários:**
  - Cadastro e login
  - Edição e visualização de perfil
- **Gerenciamento de Produtos:**
  - Cadastro, edição, listagem e exclusão
- **Gerenciamento de Clientes:**
  - Cadastro, edição, listagem e visualização
- **Pedidos:**
  - Criação e listagem
  - Aplicação de regras de negócio, como validação na exclusão de produtos
- **Segurança:**
  - Criptografia de senhas com bcrypt
  - Autenticação com tokens (JWT)

### Tecnologias Utilizadas
- **Backend:**
  - [Node.js](https://nodejs.org/en) com [Express](https://expressjs.com/)
  - [PostgreSQL](https://www.postgresql.org/) para banco de dados
  - [Supabase](https://supabase.io/) como alternativa para o banco
  - [Axios](https://axios-http.com/), [Bcrypt](https://www.npmjs.com/package/bcrypt), [JWT](https://jwt.io/), [Swagger](https://swagger.io/)

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/joaowatanabe/api-rest-pdv?color=%2304D361">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/joaowatanabe/api-rest-pdv">
  <a href="https://github.com/joaowatanabe/api-rest-pdv/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/joaowatanabe/api-rest-pdv">
  </a>
</p>

<h4 align="center"> 
	🚧 API REST PDV 🚧
</h4>

<p align="center">
    <img alt="Status Concluído" src="https://img.shields.io/badge/STATUS-CONCLU%C3%8DDO-brightgreen">
</p>

---

## ⚙️ Funcionalidades

- **Banco de Dados Relacional (PostgreSQL):**
  - Usuários, Clientes, Produtos, Categorias e Pedidos
- **Usuários:**
  - Cadastro, login, perfil, edição
- **Produtos:**
  - Cadastro, edição, exclusão, listagem
- **Clientes:**
  - Cadastro, edição, visualização
- **Pedidos:**
  - Cadastro e listagem
  - Regras de negócio aplicadas (validação e aprimoramento)

---

## 🛣️ Como Executar o Projeto

### Pré-requisitos

- **Node.js** e **npm** instalados
- **PostgreSQL** configurado

### Passos para Rodar o Backend

1. Clone o repositório:
   ```bash
   git clone git@github.com:joaowatanabe/api-rest-pdv.git
   ```
   
2. Entre na pasta do projeto:
   ```bash
   cd api-rest-pdv
   ```
   
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure o arquivo .env:
   ```bash
   DATABASE_URL=postgres://seu_usuario:sua_senha@host_do_postgresql:5432/nome_do_seu_banco
   ACCESS_TOKEN_SECRET=sua_chave_secreta
   PORT=3000
   ```

5. Configure o banco de dados:
   - Crie o banco pdv no PostgreSQL e execute o script SQL fornecido (db.sql).

6. Inicie o servidor:
   ```bash
   npm run dev
   ```
---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- **Node.js** com **Express** para o backend
- **PostgreSQL** como banco de dados relacional
- **Supabase** para armazenamento
- **Axios** para requisições HTTP
- **Bcrypt** para criptografia de senhas
- **JWT (JSON Web Token)** para autenticação
- **Cors** para controle de acesso
- **Swagger** para documentação da API
- **Nodemailer** para envio de e-mails
- **Multer** para upload de arquivos
- **Knex** como query builder para banco de dados
- **Joi** para validação de dados

> Veja o arquivo [package.json](https://github.com/joaowatanabe/api-rest-pdv/package.json) para mais detalhes sobre as dependências do projeto.

---

## 💪 Como Contribuir

1. Faça um **fork** do projeto.
2. Crie uma nova branch com suas alterações: `git checkout -b minha-feature`
3. Salve as alterações e faça o commit: `git commit -m 'Adiciona nova feature'`
4. Envie para a sua branch: `git push origin minha-feature`

---

## 📝 Licença

Este projeto está sob a licença [MIT](./LICENSE).
