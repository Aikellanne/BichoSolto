const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Conexão com o MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",         // seu usuário do MySQL
  password: "M0ng0U@323al",     
  database: "bichosolto_db"
});

// 🧩 Testar conexão
db.connect(err => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("✅ Conectado ao MySQL!");
});

// 🚀 Teste simples
app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

// 🐾 Rota para listar lembretes
app.get("/lembretes", (req, res) => {
  db.query("SELECT * FROM lembretes", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao buscar lembretes");
    } else {
      res.json(results);
    }
  });
});

// Porta
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
