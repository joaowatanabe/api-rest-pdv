const knex = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const multer = require("multer");
const { uploadToSupabase } = require("../supabaseClient");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const file = req.file;

  if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
    return res
      .status(400)
      .json({ message: "todos os campos são obrigatórios" });
  }
  try {
    const categoria = await knex("categorias")
      .where({ id: categoria_id })
      .first();
    if (!categoria) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    let produto_imagem = null;
    if (file) {
      const fileNameSemEspaco = file.originalname.replace(/ /g, '_');

      produto_imagem = await uploadToSupabase(
        `produtos/${fileNameSemEspaco}`,
        file.buffer
      );
    }

    const novoProduto = {
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
      produto_imagem,
    };

    const [produtoCadastrado] = await knex("produtos")
      .insert(novoProduto)
      .returning("*");

    return res.status(201).json({ message: produtoCadastrado });
  } catch (error) {
    return res.status(400).json({ message: "Erro inesperado do servidor" });
  }
};

const listarProdutos = async (req, res) => {
  const { categoria_id } = req.query;

  try {
    if (categoria_id && isNaN(categoria_id)) {
      return res.status(400).json({ mensagem: "Categoria id inválida" });
    }

    if (categoria_id) {
      const categoriaExistente = await knex("categorias")
        .where("id", categoria_id)
        .first();
      if (!categoriaExistente) {
        return res.status(404).json({ mensagem: "Categoria não encontrada" });
      }
    }

    let produtos;

    if (categoria_id) {
      produtos = await knex("produtos").where("categoria_id", categoria_id);
    } else {
      produtos = await knex("produtos");
    }

    if (produtos.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum produto cadastrado" });
    }

    return res.status(200).json(produtos);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

const editarDadosProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { id } = req.params;
  const file = req.file;

  if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
    return res
      .status(400)
      .json({ message: "todos os campos são obrigatórios" });
  }

  try {
    const produto = await knex("produtos").where({ id });

    if (!produto[0]) {
      return res.status(404).json({ mensagem: "produto nâo encontrado" });
    }
    const categoria = await knex("categorias").where({ id: categoria_id });
    if (!categoria[0]) {
      return res.status(404).json({ mensagem: "categoria nâo encontrada" });
    }

    let produto_imagem = produto.produto_imagem;
    if (file) {
      const fileNameSemEspaco = file.originalname.replace(/ /g, '_');

      produto_imagem = await uploadToSupabase(
        `produtos/${fileNameSemEspaco}`,
        file.buffer
      );
    }

    await knex("produtos").where({ id }).update({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
      produto_imagem,
    });

    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno de servidor." });
  }
};

const detalharProduto = async (req, res) => {
  const produtoId = req.params.id;

  try {
    const produto = await knex("produtos").where({ id: produtoId }).first();

    if (!produto) {
      return res.status(404).json({
        message: "Produto não encontrado ou não pertence a este usuário",
      });
    }

    return res.status(200).json(produto);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const excluirProdutoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const encontrarProduto = await knex("produtos").where("id", id).first();
    if (!encontrarProduto) {
      return res
        .status(404)
        .json({ mensagem: "o id fornecido não existe no banco de dados" });
    }

    const produtoPedido = await knex("pedido_produtos").where("produto_id", id);
    if (produtoPedido) {
      return res.status(400).json({
        mensagem: "O produto a ser deletado ja foi incluiso em um pedido!",
      });
    }

    const deletarProduto = await knex("produtos").where("id", id).del();

    return res.status(204).send(deletarProduto);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

module.exports = {
  cadastrarProduto,
  editarDadosProduto,
  listarProdutos,
  detalharProduto,
  excluirProdutoPorId,
  upload,
};
