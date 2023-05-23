const express = require("express");
const app = express();

app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("<h1>Home page</h1>");
});

app.get("/index", (req, res) => {
  res.sendFile("./static/index.html", {
    root: __dirname,
  });
});

app.get("/myfile", (req, res) => {
  res.sendFile("./static/img/logo-nodejs.png", {
    root: __dirname,
  });
});

app.get("/isAlive", (req, res) => {
  res.sendStatus(204);
});

// -- PRODUCTS --

app.get("/products", (req, res) => {
  res.send("Lista de productos");
});

app.post("/products", (req, res) => {
  res.status(201).send("Creando productos");
});

app.put("/products", (req, res) => {
  res.send("Actualizando un producto");
});

app.patch("/products", (req, res) => {
  res.send("Actualizando una parte de un producto");
});

app.delete("/products", (req, res) => {
  res.send("Eliminando un producto");
});

// -- END PRODUCTS --

// -- USER --

app.get("/user", (req, res) => {
  res.json({
    name: "Diego",
    lastname: "Esquivel",
    age: 20,
    adress: {
      city: "Lima",
      district: "San Martin de Porres",
    },
  });
});

app.post("/user", (req, res) => {
  console.log(req.body);
  res.status(201).send("Nuevo usuario creado");
});

// -- END USER --

// -- HTTP RESPOND CODES --

app.use((req, res) => {
  // NOTE: MENSAJE DIRECTO INDICANDO STATUS
  // res.status(404).send('<h2>ERROR 404 - Not founded</h2>');
  res.status(404).sendFile("./static/http-respond-codes/404.html", {
    root: __dirname,
  });
});

// -- END HTTP RESPOND CODES --

app.listen(3000);
console.log(`Server on port ${3000}`);

// -- NOTE: CREAR SERVIDOR CON NODEJS PURO --

// const http = require('http');
// const fs = require('fs');

// const server = http.createServer((req,res)=>{
//     const read = fs.createReadStream('./static/index.html');
//     read.pipe(res);
// });

// server.listen(3000);
// console.log(`Server on port ${3000}`);

// -- END NOTE --
