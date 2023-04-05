const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "Horses API",
  },
  host: "localhost:8080",
  schemes: ["http"],
  // host: "cse-341-adolin.onrender.com",
  // schemes: ["https"],
  tags: [{
    name: "Stables",
    description: "endpoints for stables",
  }, {
    name: "home",
    description: "homepage & profile"
  }],
  definitions: {
    Stables: [{
      _id: "642d2fc54ba6769cf0c8162c",
      name: "Haley's Horse Heaven",
      location: "Chantilly, VA",
      numberOfHorses: 38,
      owner: "Haley Comet",
      __v: 0
    }],
    createStable: {
      name: "Haley's Horse Heaven",
      location: "Chantilly, VA",
      numberOfHorses: 38,
      owner: "Haley Comet",
    },
    mongoDbId: {
      _id: "<mongo_db_id>"
    },
    successDelete: {
      "acknowledged": true,
      "deletedCount": 1
    },
    error: {
      error: "Error message"
    }
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./app.js");
});

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });