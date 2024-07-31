create database pdv;

create table usuarios (
	id serial primary key, 
  nome text not null,
  email text not null unique, 
  senha text not null
);

create table categorias(
	id serial primary key,
  descricao text not null
);

insert into categorias (descricao) values ('Informática'),
('Celulares'),('Beleza e Perfumaria'),('Mercado'),
('Livros e Papelaria'),('Brinquedos'),('Moda'),('Bebê'),('Games')



CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    quantidade_estoque INT NOT NULL,
    valor INT NOT NULL,
    categoria_id INT NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    cpf TEXT NOT NULL UNIQUE,
    cep TEXT,
    rua TEXT,
    numero INT,
    bairro TEXT,
    cidade TEXT,
    estado TEXT 
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INT NOT NULL,
    observacao TEXT,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE pedido_produtos (
    id SERIAL PRIMARY KEY,
    pedido_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade_produto INT NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

 ALTER TABLE produtos ADD COLUMN produto_imagem VARCHAR(255)  

 ALTER TABLE pedidos ADD COLUMN valor_total int