import React, { useEffect, useState } from "react";
import "../styles/pets.css";
import { FaSignOutAlt, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";

// Função para capitalizar a primeira letra
const capitalize = (s) => {
  if (typeof s !== 'string') return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export default function Pets() {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/pets")
      .then(res => setPets(res.data))
      .catch(err => console.log("Erro ao carregar pets:", err));
  }, []);

  const deletarPet = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;

    try {
      await axios.delete(`http://localhost:3001/pets/${id}`);
      setPets(pets.filter(p => p.id !== id));
    } catch (err) {
      console.log("Erro ao deletar:", err);
    }
  };

  return (
    <div className="page-container">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <img src={logo} alt="Logo Bicho Solto" className="logo" />

        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li className="active"><Link to="/pets">Pets</Link></li>
            <li><Link to="/cadastro">Cadastro</Link></li>
            <li><Link to="/agenda">Agenda</Link></li>
            <li><Link to="/contatos">Contatos</Link></li>
            <li><Link to="/configuracoes">Configurações</Link></li>
            <li className="logout"><FaSignOutAlt /> Sair</li>
          </ul>
        </nav>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="main-content">
        <header className="header">
          <h1>Meus Pets</h1>
          <p>Clique em um pet para ver seu perfil completo, vacinas e medicamentos.</p>
        </header>

        <div className="pets-list">
          {pets.map((pet) => (
            <div 
              className="pet-card" 
              key={pet.id}
              onClick={() => navigate(`/pets/${pet.id}`)} // abre o perfil
            >

              {/* Botão Delete - não entra no clique do card */}
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation(); // evita abrir o perfil ao clicar no X
                  deletarPet(pet.id);
                }}
              >
                <FaTrash />
              </button>

              {/* Imagem do pet */}
              <img
                src={
                  pet.imagem
                    ? `http://localhost:3001/uploads/${pet.imagem}`
                    : "https://via.placeholder.com/150"
                }
                alt={pet.nome}
              />

              <h3>{pet.nome}</h3>
              <p><strong>Espécie: </strong>{capitalize(pet.especie)}</p>
              <p><strong>Idade: </strong>{pet.idade}</p>

            </div>
          ))}
        </div>
      </main>

    </div>
  );
}
