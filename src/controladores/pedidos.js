const knex = require("../conexao");
const transporter = require("../config/transportador"); 
require("dotenv").config();

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  if (
    !cliente_id ||
    !Array.isArray(pedido_produtos) ||
    pedido_produtos.length === 0
  ) {
    return res
      .status(400)
      .json({ message: "Campos obrigatórios não preenchidos" });
  }

  for (const item of pedido_produtos) {
    if (!item.produto_id || !item.quantidade_produto) {
      return res
        .status(400)
        .json({ message: "produto id e quantidade são obrigatórios" });
    }
  }

  try {
    const cliente = await knex("clientes").where({ id: cliente_id }).first();
    if (!cliente) {
      return res.status(400).json({ message: "Cliente não encontrado" });
    }

    const produtosIds = pedido_produtos.map((item) => item.produto_id);
    const produtos = await knex("produtos").whereIn("id", produtosIds);

    if (produtos.length !== produtosIds.length) {
      return res
        .status(400)
        .json({ message: "Um ou mais produtos não encontrados" });
    }

    for (const item of pedido_produtos) {
      const produto = produtos.find((p) => p.id === item.produto_id);
      if (produto.quantidade_estoque < item.quantidade_produto) {
        return res
          .status(400)
          .json({
            message: `Quantidade insuficiente no estoque para o produto ID ${item.produto_id}`,
          });
      }
    }

    const novoPedido = { cliente_id, observacao };
    const [pedidoCadastrado] = await knex("pedidos")
      .insert(novoPedido)
      .returning("*");

    const pedidoProdutos = pedido_produtos.map((item) => ({
      pedido_id: pedidoCadastrado.id,
      produto_id: item.produto_id,
      quantidade_produto: item.quantidade_produto,
    }));

    await knex("pedido_produtos").insert(pedidoProdutos);

    for (const item of pedido_produtos) {
      await knex("produtos")
        .where({ id: item.produto_id })
        .decrement("quantidade_estoque", item.quantidade_produto);
    }

    const mailOptions = {
      from: process.env.EMAIL,
      to: cliente.email,
      subject: "Pedido realizado com sucesso",
      text: `Olá, ${cliente.nome}. Seu pedido foi realizado com sucesso!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Erro ao enviar email:", error);
        return res
          .status(500)
          .json({ message: "Erro ao enviar o email de confirmação" });
      }
      return res.status(201).json({ message: "Pedido cadastrado com sucesso" });
    });
  } catch (error) {
    console.error("Erro interno do servidor:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};
const listarPedidos = async (req, res) => {
  const { cliente_id } = req.query;

  try {
    let pedidos;
    let produtos;

    if (cliente_id) {
      const cliente = await knex("clientes").where({ id: cliente_id }).first();
      if (!cliente) {
        return res.status(404).send("Parâmetro cliente_id é obrigatório");
      }

      pedidos = await knex("pedidos").select("*").where({ cliente_id });
      const pedidosId = pedidos.map((pedido) => pedido.id);
      produtos = await knex("pedido_produtos").whereIn("pedido_id", pedidosId);
    } else {
      pedidos = await knex("pedidos").select("*");

      produtos = await knex("pedido_produtos");
    }
    const produtosFormatados = pedidos.map((pedido) => {
      const pedido_produtos = produtos.filter(
        (produto) => produto.pedido_id === pedido.id
      );
      return {
        pedido,
        pedido_produtos,
      };
    });

    return res.status(200).json(produtosFormatados);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro inesperado do servidor" });
  }
};

module.exports = { cadastrarPedido, listarPedidos };