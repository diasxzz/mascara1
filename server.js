const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para obter chamados
app.get("/chamados", (req, res) => {
  fs.readFile("chamados.json", "utf8", (err, data) => {
    if (err) return res.status(500).send("Erro ao ler chamados.");
    res.json(JSON.parse(data || "[]"));
  });
});

// Rota para adicionar um chamado
app.post("/chamados", (req, res) => {
  const novoChamado = req.body;
  fs.readFile("chamados.json", "utf8", (err, data) => {
    const chamados = JSON.parse(data || "[]");
    chamados.push(novoChamado);
    fs.writeFile("chamados.json", JSON.stringify(chamados), (err) => {
      if (err) return res.status(500).send("Erro ao salvar chamado.");
      res.sendStatus(201);
    });
  });
});

// Rota para retornar "Olá, mundo!"
app.get("/ola", (req, res) => {
  res.send("Olá, mundo!");
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
