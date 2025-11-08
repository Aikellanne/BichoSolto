import React from "react";
import "../styles/pets.css";
import { FaPaw, FaSignOutAlt} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import cad1 from "../assets/pug.jpg";
import cad2 from "../assets/siames.png";
import cad3 from "../assets/calopsita.jpg";

export default function Pets() {

   const pets = [
    { id: 1, nome: "Rex 🦖", especie: "Pug", idade: "5 anos", imagem: cad1 },
    { id: 2, nome: "Luna", especie: "Siamês", idade: "6 meses", imagem: cad2 },
    { id: 3, nome: "Mel 🍯", especie: "Calopsita", idade: "1 ano", imagem: cad3 },
  ];

  return (
    <div className="page-container">
      {/* Sidebar */}
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

      {/* Conteúdo principal */}
      <main className="main-content">
      <header className="header">
      <h1>Meus Pets</h1>
      <p>Clique em um pet para ver seu perfil completo, vacinas e medicamentos.</p>
      </header>

      <div className="pets-list">
          {pets.map((pet) => (
            <Link to={`/pets/${pet.id}`} key={pet.id} className="pet-card">
              <img src={pet.imagem} alt={pet.nome} />
              <h3>{pet.nome}</h3>
              <p>{pet.especie}</p>
              <p>{pet.idade}</p>
            </Link>
          ))}
      </div>
      </main>
    </div>
  );
}
