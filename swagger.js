const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: "Movie Booking API",
    description: "API documentation"
  },
  host: "localhost:5000",
  schemes: ["http"],
  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Enter JWT token: Bearer <token>"
    }
  }
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./server.js"]; // your main server file

swaggerAutogen(outputFile, endpointsFiles, doc);