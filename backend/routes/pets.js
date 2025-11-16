const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");

// CONFIGURAÇÃO DO UPLOAD
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// LISTAR PETS
router.get("/", (req, res) => {
  db.query("SELECT * FROM Pets", (err, data) => {
    if (err) return res.json({ error: err });
    res.json(data);
  });
});

// CADASTRAR PET
router.post("/", upload.single("imagem"), (req, res) => {
  const { nome, especie, idade } = req.body;
  const imagem = req.file ? req.file.filename : null;

  const sql = "INSERT INTO Pets (imagem, nome, especie, idade) VALUES (?, ?, ?, ?)";

  db.query(sql, [imagem, nome, especie, idade], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ message: "Pet cadastrado", id: result.insertId });
  });
});

// EDITAR PET
router.put("/:id", upload.single("imagem"), (req, res) => {
  const { nome, especie, idade } = req.body;
  const novaImagem = req.file ? req.file.filename : req.body.imagemAntiga;

  const sql =
    "UPDATE Pets SET imagem=?, nome=?, especie=?, idade=? WHERE id=?";

  db.query(sql, [novaImagem, nome, especie, idade, req.params.id], (err) => {
    if (err) return res.json({ error: err });
    res.json({ message: "Pet atualizado" });
  });
});

// EXCLUIR PET
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM Pets WHERE id=?", [req.params.id], (err) => {
    if (err) return res.json({ error: err });
    res.json({ message: "Pet removido" });
  });
});

module.exports = router;
