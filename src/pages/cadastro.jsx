import React, { useState } from "react";
import "../styles/cadastro.css";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";

export default function Cadastro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    especie: "cachorro",
    raca: "",
    dataNasc: "",
    idade: "",
    peso: "",
  });

  const [imagem, setImagem] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImagem(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // adiciona todos campos do form
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // adiciona imagem
      if (imagem) {
        data.append("imagem", imagem);
      }

      // envia para o backend
      const res = await axios.post("http://localhost:3001/pets", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // backend retorna:  res.json({ message:"...", id: result.insertId })
      const newId = res.data.id;

      // redireciona para o perfil
      navigate(`/pets/${newId}`);

    } catch (err) {
      console.log(err);
      alert("Erro ao cadastrar pet.");
    }
  };

  return (
    <div className="page-container">

      <aside className="sidebar">
        <img src={logo} alt="Logo Bicho Solto" className="logo" />

        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/pets">Pets</Link></li>
            <li className="active"><Link to="/cadastro">Cadastro</Link></li>
            <li><Link to="/agenda">Agenda</Link></li>
            <li><Link to="/contatos">Contatos</Link></li>
            <li><Link to="/configuracoes">Configurações</Link></li>
            <li className="logout"><FaSignOutAlt /> Sair</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">

        <header className="header">
          <h1>Cadastrar Novo Pet</h1>
          <p>Preencha os detalhes do seu novo amigo.</p>
        </header>

        <form className="addpet-form" onSubmit={handleSubmit}>

          <div className="form-row">
            <div className="form-group">
              <label>Nome do Pet:</label>
              <input
                name="nome"
                type="text"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Espécie:</label>
              <select
                name="especie"
                value={formData.especie}
                onChange={handleChange}
              >
                <option value="cachorro">Cachorro</option>
                <option value="gato">Gato</option>
                <option value="outro">Outro</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Raça:</label>
              <input
                name="raca"
                type="text"
                value={formData.raca}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Data de Nascimento:</label>
              <input
                name="dataNasc"
                type="date"
                value={formData.dataNasc}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Idade:</label>
              <input
                name="idade"
                type="text"
                value={formData.idade}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Peso:</label>
              <input
                name="peso"
                type="number"
                value={formData.peso}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Imagem de Perfil:</label>
            <input
              name="imagem"
              type="file"
              accept="image/*"
              onChange={handleImage}
            />
          </div>

          <button type="submit" className="btn-submit">Cadastrar</button>
        </form>

      </main>
    </div>
  );
}
