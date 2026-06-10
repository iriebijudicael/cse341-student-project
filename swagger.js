const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'E-Commerce Core API Architecture',
    description: 'Week 05 Delivery: Managed Users and Products Collection Validation Endpoints'
  },
  host: process.env.SWAGGER_HOST || 'localhost:5500',
  schemes: [process.env.SWAGGER_SCHEME || 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generates the JSON structural blueprint file automatically
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation JSON model successfully generated!");
});