const knex = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(404)
      .json({ message: "Todos os campos são obrigatórios!" });
  }

  try {
    const consultaEmail = await knex("usuarios").where("email", email).first();

    if (consultaEmail) {
      return res.status(400).json({ message: "Email já existente" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await knex("usuarios").insert({ nome, email, senha: senhaCriptografada });

    const usuarioSemSenha = await knex("usuarios")
      .where({ email })
      .select("id", "nome", "email")
      .first();

    return res.status(201).json(usuarioSemSenha);
  } catch (error) {
    return res.status(500).json({ message: "Erro inesperado do servidor" });
  }
};

const loginUsuarioLogado = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: "Email e senha são obrigatórios" });
  }

  try {
    const usuario = await knex("usuarios").where({ email }).first();

    if (!usuario) {
      return res.status(400).json({ mensagem: "Usuário ou senha inválidos" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(400).json({ mensagem: "Usuário ou senha inválidos" });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.SENHAJWT, {
      expiresIn: "8h",
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const detalharPerfilUsuarioLogado = async (req, res) => {
  try {
    const { senha: _, ...usuarioLogado } = req.usuario;

    return res.status(200).json(usuarioLogado);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro interno no servidor",
    });
  }
};

const editarPerfilUsuarioLogado = async (req, res) => {
  const { id } = req.usuario;
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: "Campos obrigatorios" });
  }

  try {
    const emailExistente = await knex("usuarios").where("email", email).first();

    if (emailExistente && emailExistente.id !== Number(id)) {
      return res.status(400).json({ mensagem: "Email já cadastrado" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await knex("usuarios")
      .where("id", id)
      .update({ nome, email, senha: senhaCriptografada });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

module.exports = {
  cadastrarUsuario,
  loginUsuarioLogado,
  detalharPerfilUsuarioLogado,
  editarPerfilUsuarioLogado,
};
