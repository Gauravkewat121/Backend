const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

console.log(process.env.PORT);
const doc = {
  info: {
    title: "Movie Booking API",
    description: "API documentation"
  },
  host: `localhost:${process.env.PORT}`,
  schemes: ["http"],  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Enter: Bearer <token>",
    },
  },
 
  security: [
    {
      BearerAuth: [],
    },
  ],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./server.js"]; // your main server file

swaggerAutogen(outputFile, endpointsFiles, doc);