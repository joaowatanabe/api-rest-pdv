const express = require("express");
const { listarCategorias } = require("./controladores/categorias");
const {
  cadastrarUsuario,
  loginUsuarioLogado,
  detalharPerfilUsuarioLogado,
  editarPerfilUsuarioLogado,
} = require("./controladores/usuarios");
const verificaLogin = require("./intermediarios/verificacaoLogin");
const {
  cadastrarProduto,
  editarDadosProduto,
  listarProdutos,
  detalharProduto,
  excluirProdutoPorId,
} = require("./controladores/produtos");
const {
  cadastrarCliente,
  editarDadosCliente,
  listarClientes,
  detalharCliente,
} = require("./controladores/clientes");
const { cadastrarPedido, listarPedidos } = require("./controladores/pedidos");
const upload = require("./config/multer");

const rotas = express();

rotas.get("/categoria", listarCategorias);
rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", loginUsuarioLogado);

rotas.use(verificaLogin);
rotas.get("/usuario", detalharPerfilUsuarioLogado);
rotas.put("/usuario", editarPerfilUsuarioLogado);

rotas.post("/produto", upload.single("produto_imagem"), cadastrarProduto);
rotas.put("/produto/:id", upload.single("produto_imagem"), editarDadosProduto);
rotas.get("/produto", listarProdutos);
rotas.get("/produto/:id", detalharProduto);
rotas.delete("/produto/:id", excluirProdutoPorId);

rotas.post("/cliente", cadastrarCliente);
rotas.put("/cliente/:id", editarDadosCliente);
rotas.get("/cliente", listarClientes);
rotas.get("/cliente/:id", detalharCliente);

rotas.post("/pedido", cadastrarPedido);

rotas.get("/pedido", listarPedidos);

module.exports = rotas;


// - Caso seja enviado o parâmetro do tipo query **cliente_id**, filtrar os pedidos de acordo com o cliente, caso o id do cliente informado exista.
// - Caso não seja informado o parâmetro do tipo query **cliente_id** todos os pedidos cadastrados deverão ser retornados.