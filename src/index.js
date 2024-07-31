const express = require("express");
const rotas = require("./rotas");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://desafio-final-backend-t15-production-c23b.up.railway.app",
    ],
  })
);

app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(require("../swagger.json"))
);

app.use(rotas);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
