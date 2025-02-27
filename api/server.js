import dotenv from "dotenv";
dotenv.config({ path: "../.env" }); // Cargar las variables de entorno primero

import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import contentful from "contentful";
import path from "path";

import authRoutes from "./routes/auth.js";
import paymentRoutes from "./routes/payment.js";
import invoiceRoutes from "./routes/invoice.js";
import productsRoutes from "./routes/products.js";
const { createClient } = contentful;
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json()); // Parsear cuerpos JSON

// Configuración del cliente de Contentful
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});
console.log("CONTENTFUL_ACCESS_TOKEN:", process.env.CONTENTFUL_ACCESS_TOKEN);

client
  .getSpace()
  .then((space) => console.log("Connected to Contentful space:", space.name))
  .catch((error) => console.error("Error connecting to Contentful:", error));

app.locals.contentfulClient = client;

// Registro de rutas
app.get("/", (req, res) => {
  res.send("servidor backend funcionando ");
});
app.use("/auth", authRoutes);
app.use("/payment", paymentRoutes);
app.use("/invoice", invoiceRoutes);
app.use("/products", productsRoutes);

// Middleware de manejo de errores para errores de parseo JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("Invalid JSON payload:", err.body);
    console.error("Error details:", err);
    return res.status(400).send({ error: "Invalid JSON payload" });
  }
  next();
});

app.listen(port, () =>
  console.log(`Servidor backend corriendo en el puerto ${port}`)
);
