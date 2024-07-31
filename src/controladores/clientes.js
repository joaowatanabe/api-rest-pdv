const knex = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;

  if (!nome || !email || !cpf) {
    return res
      .status(404)
      .json({ message: "Todos os campos são obrigatórios!" });
  }
  try {
    const consultaEmail = await knex("clientes").where("email", email).first();
    if (consultaEmail) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    const consultaCPF = await knex("clientes").where("cpf", cpf).first();
    if (consultaCPF) {
      return res.status(400).json({ message: "CPF já cadastrado" });
    }
    const novoCliente = {
      nome,
      email,
      cpf,
      cep: cep || null,
      rua: rua || null,
      numero: numero || null,
      bairro: bairro || null,
      cidade: cidade || null,
      estado: estado || null,
    };

    await knex("clientes").insert(novoCliente);

    const clienteCadastrado = await knex("clientes").where({ email }).first();

    return res.status(201).json(clienteCadastrado);
  } catch (error) {
    return res.status(500).json({ message: "Erro inesperado do servidor" });
  }
};

const editarDadosCliente = async (req, res) => {
  const { nome, email, cpf } = req.body;
  const { id } = req.params;

  if (!nome || !email || !cpf) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatorios." });
  }
  try {
    const validarCliente = await knex("clientes").where({ id });

    if (!validarCliente[0]) {
      return res.status(404).json({ mensagem: "cliente nâo encontrado" });
    }

    const checarEmail = await knex("clientes").where({ email: email });
    if (checarEmail[0]) {
      return res.status(400).json({ mensagem: " email ja cadastrado" });
    }

    const checarCPF = await knex("clientes").where({ cpf: cpf });
    if (checarCPF[0]) {
      return res.status(400).json({ mensagem: "cpf ja cadastrado" });
    }

    await knex("clientes").update({ nome, email, cpf }).where({ id });

    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno de servidor." });
  }
};

const listarClientes = async (req, res) => {
  try {
    const listagemClientes = await knex("clientes").select(
      "id",
      "nome",
      "email",
      "cpf"
    );
    return res.status(200).json(listagemClientes);
  } catch (error) {
    return res.status(500).json({ message: "Erro inesperado do servidor" });
  }
};

const detalharCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await knex("clientes").where("id", id).first();

    if (!cliente) {
      return res.status(404).json({ message: "cliente não encontrado" });
    }
    return res.json(cliente);
  } catch (error) {
    return res.status(500).json({ message: "Erro inesperado do servidor" });
  }
};

module.exports = {
  cadastrarCliente,
  editarDadosCliente,
  listarClientes,
  detalharCliente,
};
