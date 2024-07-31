const knex = require("../conexao");

const listarCategorias = async (req, res) => {
  try {
    const listagemDeCategorias = await knex('categorias')
    return res.status(200).json(listagemDeCategorias)
  } catch (error) {
    return res.status(500).json({ mensage: 'Erro interno do servidor'})
  }

};

module.exports = {
  listarCategorias,
};
