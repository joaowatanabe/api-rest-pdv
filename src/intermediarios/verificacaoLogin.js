const jwt = require("jsonwebtoken");
const knex = require("../conexao");
require("dotenv").config();
const express = require("express");
const app = express();

const verificaLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: "Não autorizado" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.SENHAJWT);

    const usuario = await knex("usuarios")
      .where("id", id)
      .first()
      .returning("*");

    if (!usuario) {
      return res.status(401).json({ mensagem: "Não autorizado" });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({
      mensagem:
        "Para acessar este recurso um token de autenticação válido deve ser enviado.",
    });
  }
};

module.exports = verificaLogin;
