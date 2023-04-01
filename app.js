const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("./db/mongooseDb");
const mongoClient = require("./db/mongoClientDb");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

dotenv.config();

const port = process.env.port || 8080;
const app = express();

app
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(bodyParser.json())
  .use(cors())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE, OPTIONS"
    );
    next();
  })
  .use(routes)
  .use(errorHandler);

  process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
  });

mongoose.initDb((err) => {
  if (err) {
    console.log(err);
  } else {

    console.log(`Connected to mongoose`);
  }
});

mongoClient.initDb((err) => {
  if (err) {
    console.log(err);
  } else {

    console.log(`Connected to mongoClient`);
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});