const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Pasta pública de uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ------------------------------ UPLOAD ------------------------------ */

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, "pet_" + Date.now() + ext);
  }
});
const upload = multer({ storage });

/* -------------------------- MYSQL CONNECTION ------------------------ */

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "M0ng0U@323al",
  database: "bichosolto_db",
});

db.connect(err => {
  if (err) throw err;
  console.log("Conectado ao MySQL!");
});

/* ----------------------------- FUNÇÕES ------------------------------ */

function toNull(value) {
  return value === "" || value === undefined ? null : value;
}

/* ------------------------------- PETS -------------------------------- */

// Criar pet
app.post("/pets", upload.single("imagem"), (req, res) => {
  const imagem = req.file ? req.file.filename : null;

  const { nome, especie, raca, dataNasc, idade, peso } = req.body;

  const sql = `
    INSERT INTO pets (imagem, nome, especie, raca, dataNasc, idade, peso)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      imagem,
      toNull(nome),
      toNull(especie),
      toNull(raca),
      toNull(dataNasc),
      toNull(idade),
      toNull(peso)
    ],
    (err, result) => {
      if (err) {
        console.error("Erro ao cadastrar pet:", err);
        return res.status(500).json({ error: "Erro ao cadastrar pet" });
      }

      res.json({ message: "Pet cadastrado com sucesso!", id: result.insertId });
    }
  );
});

// Listar pets
app.get("/pets", (req, res) => {
  const sql = "SELECT * FROM pets ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Buscar pet por ID
app.get("/pets/:id", (req, res) => {
  db.query("SELECT * FROM pets WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
});

// Deletar pet
app.delete("/pets/:id", (req, res) => {
  db.query("DELETE FROM pets WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Pet deletado com sucesso!" });
  });
});

/* ------------------------------- VACINAS ------------------------------ */

app.post("/vacinas", (req, res) => {
  const { pet_id, nome, ultimaDose, proximaDose, veterinario, concluida } = req.body;

  const sql = `
    INSERT INTO vacinas (pet_id, nome, ultimaDose, proximaDose, veterinario, concluida)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      pet_id,
      toNull(nome),
      toNull(ultimaDose),
      toNull(proximaDose),
      toNull(veterinario),
      concluida ? 1 : 0
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Vacina adicionada!", id: result.insertId });
    }
  );
});

app.get("/vacinas/:pet_id", (req, res) => {
  db.query("SELECT * FROM vacinas WHERE pet_id = ?", [req.params.pet_id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

/* ---------------------------- MEDICAMENTOS ---------------------------- */

app.post("/medicamentos", (req, res) => {
  const { pet_id, nome, dataInicio, dataFim, frequencia, concluido } = req.body;

  const sql = `
    INSERT INTO medicamentos (pet_id, nome, dataInicio, dataFim, frequencia, concluido)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      pet_id,
      toNull(nome),
      toNull(dataInicio),
      toNull(dataFim),
      toNull(frequencia),
      concluido ? 1 : 0
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Medicamento registrado!", id: result.insertId });
    }
  );
});

app.get("/medicamentos/:pet_id", (req, res) => {
  db.query("SELECT * FROM medicamentos WHERE pet_id = ?", [req.params.pet_id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

/* ----------------------------- SERVIDOR ------------------------------ */

app.listen(3001, () => {
  console.log("Backend rodando na porta 3001");
});
