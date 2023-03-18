const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "Horses API",
  },
  // host: "localhost:8080",
  // schemes: ["http"],
  host: "cse-341-adolin.onrender.com",
  schemes: ["https"],
  tags: [
    {
      name: "Stables",
      description: "endpoints for stables",
    },
  ],
  definitions: {
    Stables: [
      {
        _id: "640cac644be6e1bbfa31a31c",
        name: "Haley's Horse Heaven",
        location: "Chantilly, VA",
        owner: "Haley Comet",
        numberOfHorses: 38,
      },
    ],
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
