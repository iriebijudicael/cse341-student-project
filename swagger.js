import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Contacts API',
    description: 'CSE341 Contacts Project API Documentation'
  },
  host: 'localhost:5500', 
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
// Point this to your main root routing file
const endpointsFiles = ['./controllers/index.js']; 

/* NOTE: If your routes folder is inside a 'src' folder like before, 
   change the line above to: ['./src/routes/index.js'] */

// Generate the swagger JSON file
swaggerAutogen(outputFile, endpointsFiles, doc);