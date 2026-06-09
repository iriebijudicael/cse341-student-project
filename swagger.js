const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'E-Commerce Core API Architecture',
    description: 'Week 05 Delivery: Managed Users and Products Collection Validation Endpoints'
  },
  host: 'cse341-code-student.onrender.com', // REMEMBER: Swap this with your real live Render domain URL link
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

// Generates the JSON structural blueprint file automatically
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation JSON model successfully generated!");
});