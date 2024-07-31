const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger.json";
const endpointFile = ["./src/rotas.js"];

swaggerAutogen(outputFile, endpointFile);
