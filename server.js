const express = require("express");
const morgan = require("morgan");

const app = express();

const products = [
  {
    id: 1,
    name: "laptop",
    price: "3600",
  }
];

app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));

// -- PRODUCTS --

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
    res.send("Detalle product");
  });

app.post("/products", (req, res) => {
  res.status(201).send("Creando productos");
});

app.put("/products/:id", (req, res) => {
  res.send("Actualizando un producto");
});

app.patch("/products:id", (req, res) => {
  res.send("Actualizando una parte de un producto");
});

app.delete("/products/:id", (req, res) => {
  res.send("Eliminando un producto");
});

// -- END PRODUCTS --

app.listen(3000);
console.log(`Server on port ${3000}`);