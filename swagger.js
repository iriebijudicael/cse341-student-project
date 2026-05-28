// import swaggerAutogen from 'swagger-autogen';

// const doc = {
//   info: {
//     title: 'Contacts API',
//     description: 'CSE341 Contacts Project API Documentation'
//   },
//   host: 'localhost:3001', 
//   schemes: ['http', 'https']
// };

// const outputFile = './swagger.json';
// // Point this to your main root routing file
// const endpointsFiles = ['./controllers/index.js']; 

// /* NOTE: If your routes folder is inside a 'src' folder like before, 
//    change the line above to: ['./src/routes/index.js'] */

// // Generate the swagger JSON file
// swaggerAutogen(outputFile, endpointsFiles, doc);




import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'College Course Workspace Manager API',
    description: 'CSE341 Final Project Documentation tracking Course and Instructor entities with OAuth Security Locks.',
    version: '1.0.0'
  },
  host: 'localhost:3001',
  basePath: '/',
  schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation JSON model successfully generated!");
});