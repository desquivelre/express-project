const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));

// -- MIDDLEWARE TO GET ROUTE AN METHOD --

// app.use((req, res, next) => {
//   console.log(`Route: ${req.url}, Method: ${req.method}`);
//   next();
// });

// -- END MIDDLEWARE TO GET ROUTE AN METHOD --

app.get("/", (req, res) => {
  res.send("<h1>Home page</h1>");
});

app.all("/index", (req, res) => {
  res.sendFile("./static/index.html", {
    root: __dirname,
  });
});

app.get("/info", (req, res) => {
  res.send("Server info");
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

// -- SEND PARAMS --

app.get("/sum/:a/:b", (req, res) => {
  const { a, b } = req.params;
  res.send(`Result: ${parseInt(a) + parseInt(b)}`);
});

// -- END SEND PARAMS --

// -- SEND GREETINGS --

app.get("/greet/:name", (req, res) => {
  const { name } = req.params;
  res.send(`Hello ${name}`);
});

// -- END SEND GREETINGS --

// -- SEND USER PHOTO --

app.get("/:name/photo", (req, res) => {
  const { name } = req.params;

  if (name === "diego") {
    return res.sendFile("./static/img/logo-nodejs.png", {
      root: __dirname,
    });
  }
  res.send(`The username ${name} doesn't have permission to access`);
});

// -- END SEND USER PHOTO --

// -- SEND QUERY PARAMS --

app.get("/search", (req, res) => {
  if (req.query.q === "javascript books") {
    res.send("Lista de libros de javascript");
  } else {
    res.send("Página normal");
  }
});

// -- END SEND QUERY PARAMS --

// -- FIRST MIDDLEWARE --

app.use((req, res, next) => {
  if ((req.query.login === "diego@email.com")) {
    next();
  } else {
    res.send('Not authenticated');
  }
});

app.get("/dashboard", (req, res) => {
  res.send("Dashboard page");
});

// -- END FIRST MIDDLEWARE --

// -- HTTP RESPOND CODES --

app.use((req, res) => {
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
