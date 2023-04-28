// Archivo principal de configuracion del servidor

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routers/userRoutes");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

/**
 * conexion con la base de datos utilizando las variables del archivo .env
 */
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("DB Connection successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

/**
 * constante que hace referencia al puerto a usar en el archivo .env o por defecto el 6001
 */
const PORT = process.env.PORT || 6001;

const server = app.listen(PORT, () => {
  console.log(`Server is started in the port: ${process.env.PORT}`);
});
