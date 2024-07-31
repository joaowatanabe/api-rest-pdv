# Desafio Backend - API REST PDV - Cubos Academy
## API REST - Sistema para frente de caixa

Criação de uma API no padrao Rest para um sistema PDV (Frente de Caixa), banco de dados desenvolvido com PostgreSQL.

O funcionamento da API consistem em cadastro, listagem, login e manuntenção de usuarios (funcionários), o cadastro e manutenção dos produtos da loja e igualmente o cadastro, listage, atualização e manutenção de clientes inseridos no sistema da loja. Todo o desenolvimento e implementação do sistema foi feito de forma eficiente e segura implementando criptografia (bcrypt) de senhas e validação por tokens (bearer).

Utilizamos:
 - supabase
 - axios
 - bcrypt
 - cors
 - express
 - swagger

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/joaowatanabe/api-rest-pdv?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/joaowatanabe/api-rest-pdv">
  
  <a href="https://github.com/joaowatanabe/api-rest-pdv/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/joaowatanabe/api-rest-pdv">
  </a>
  
  <!-- <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen"> -->
  
 
</p>
<h4 align="center"> 
	🚧 API REST - PDV 🚧
</h4>

<p align="center">
	<!-- <img alt="Status Em Desenvolvimento" src="https://img.shields.io/badge/STATUS-EM%20DESENVOLVIMENTO-green"> -->
    <img alt="Status Concluído" src="https://img.shields.io/badge/STATUS-CONCLU%C3%8DDO-brightgreen">
</p>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> • 
 <a href="#-como-executar-o-projeto">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> • 
 <a href="#-autor">Autor</a> • 
 <a href="#user-content--licença">Licença</a>
</p>


## 💻 Sobre o projeto

📄 PDV - é uma API desenvolvida no padrao REST 


Projeto desenvolvido durante o curso de desenvolvimento de software fullstack, onde ao finalizar o módulo 3 foi passado esse desafio de criar uma API para uma frente de caixa, atendendo a todos requisitos do padrao REST, utilizando bibliotecas, nodejs junto com o JavaScript e o banco de dados em PostgreSQL, atendendo a medidas de segurança como tokenização e encriptação de senhas. 

---

## ⚙️ Funcionalidades

- [x] Banco de dados relacional:
    - [x] Usuários
    - [x] Clientes
    - [x] Produtos
    - [x] Categorias
    - [x] Pedidos
- [x] Listagem de categorias
- [x] Usuarios:
    - [x] Cadastro de usuário
    - [x] Efetuar o login do usuário
    - [x] Detalhar o perfil do usuário logado
    - [x] Editar perfil do usuário logado
- [x] Produtos:
    - [x] Cadastrar produto
    - [x] Editar dados do protudo
    - [x] Listar produtos
    - [x] Detalhar produto
    - [x] Excluir produto por id
- [x] Clientes:
    - [x] Cadastrar cliente
    - [x] Editar dados do cliente
    - [x] Listar clientes
    - [x] Detalhar cliente
- [x] Pedidos:
    - [x] Cadastrar pedido
    - [x] Listar pedidos
    - [x] Aplicar regras do negócio:
        - [x] Validação na exclusão de produto
        - [x] Aprimorar cadastro/atualização de produto
        - [x] Aprimorar exclusão de produto

## Dados
- Banco de dados relacional utilizamos PostgreSQL e optamos por colocar no storage do Supabase. 

## Requisitos obrigatórios

- [x] Deve seguir o padrão REST
- [x] Código deve estar organizado
- [x] Qualquer valor monetário deverá ser representado em centavos
- [x] Utilizar status code adequado
- [x] A API a ser criada deverá acessar o banco de dados a ser criado pdv para persistir e manipular os dados de categorias, clientes, pedidos, produtos e usuários utilizados pela aplicação.
- [x] O campo id das tabelas no banco de dados deve ser auto incremento, chave primária e não deve permitir edição uma vez criado.
- [x] Exigir token de autenticação no formato Bearer Token nos endpoints necessários.
- [x] senha deve ser criptografada utilizando algum algoritmo de criptografia confiável.
- [x] Enviar e-mail para o cliente notificando que o pedido foi efetuado com sucesso.   

---

## 🛣️ Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

- Ter o Node.js instalado
- Ter o PostgreSQL instalado e configurado
- Ter o npm instalado globalmente

[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), , [Insomnia](https://insomnia.rest/download).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)


#### 🎲 Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone git@github.com:joaowatanabe/api-rest-pdv.git

# Acesse a pasta do projeto no terminal/cmd
$ cd api-rest-pdv

# Vá para a pasta src
$ cd src

# Instale as dependências
$ npm install

# Configure o arquivo .env:
## Crie um arquivo \`.env\` na raiz do projeto e defina as variáveis de ambiente:

DATABASE_URL=postgres://seu_usuario:sua_senha@host_do_postgresql:5432/nome_do_seu_banco
ACCESS_TOKEN_SECRET=sua_chave_secreta
PORT=3000

## Configure o banco de dados:
Crie o banco de dados \`pdv\` no PostgreSQL e execute o arquivo db.sql que contem todos os códigos necessários.

### Observações:
- Substitua \`seu-usuario\`, \`sua_senha\`, \`host_do_postgresql\` e \`nome_do_seu_banco\` pelas suas credenciais de banco de dados.
- A variável \`ACCESS_TOKEN_SECRET\` deve ser uma string única e segura para gerar tokens de autenticação.

```

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:


#### [](https://github.com/joaowatanabe/apirest-bank-system#server-nodejs--typescript)**Server**  ([Node.js](https://nodejs.org/en)  +  [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript))

-   **[Express](https://expressjs.com/)**
-   **[Nodemon](https://expressjs.com/)**
-   **[Supabase](https://www.npmjs.com/package/@supabase/supabase-js)**
-   **[Axios](https://www.npmjs.com/package/axios)**
-   **[Bcrypt](https://www.npmjs.com/package/bcrypt)**
-   **[Cors](https://www.npmjs.com/package/cors)**
-   **[Dotenv](https://www.npmjs.com/package/dotenv)**
-   **[form-data](https://www.npmjs.com/package/form-data)**
-   **[Google API](https://www.npmjs.com/package/googleapis)**
-   **[joi](https://www.npmjs.com/package/joi)**
-   **[knex](https://www.npmjs.com/package/knex)**
-   **[multer]([https://www.npmjs.com/package/form-data](https://www.npmjs.com/package/multer))**
-   **[nodemailer](https://www.npmjs.com/package/nodemailer)**
-   **[swagger](https://swagger.io/)**
  
> Veja o arquivo  [package.json](https://github.com/joaowatanabe/api-rest-pdv/package.json)


#### [](https://github.com/cubos-academy/academy-template-readme-projects#utilit%C3%A1rios)**Utilitários**

-   Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**
-   Markdown:  **[StackEdit](https://stackedit.io/)**,  **[Markdown Emoji](https://gist.github.com/rxaviers/7360908)**
-   Commit Conventional:  **[Commitlint](https://github.com/conventional-changelog/commitlint)**
-   Teste de API utilizando o swagger

---

## 💪 Como contribuir para o projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`
> Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](./CONTRIBUTING.md)

---

## 📝 Licença

 Este projeto esta sobe a licença [MIT](./LICENSE).

