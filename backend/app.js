const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const swaggerOptions = require('./swagger.json');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const port = process.env.PORT || 5000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

app.use(cors());
app.use(express.json());

const uri = process.env.DB_CONNECTION;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.on("error", (error) => console.log(error));
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const currencyRouter = require("./routes/currency");

app.use("/currency", currencyRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
