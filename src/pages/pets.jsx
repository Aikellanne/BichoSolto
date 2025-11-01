import React from "react";
import "../styles/pets.css";
import { FaPaw, FaSignOutAlt} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import cad1 from "../assets/pug.jpg";
import cad2 from "../assets/siames.png";
import cad3 from "../assets/calopsita.jpg";

export default function Pets() {
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
      <h1>Meus Pets</h1>
      <p>Clique em um pet para ver seu perfil completo, vacinas e medicamentos.</p>

      <div className="pets-list">
        <div className="pet-card">
          <img src={cad1} alt="REX" />
          <h3>Rex 🦖</h3>
          <p>Pug</p>
          <p>5 anos</p>
        </div>

        <div className="pet-card">
          <img src={cad2} alt="Luna" />
          <h3>Luna</h3>
          <p>Siamês</p>
          <p>6 meses</p>
        </div>

        <div className="pet-card">
          <img src={cad3} alt="Mel" />
          <h3>Mel 🍯</h3>
          <p>Calopsita</p>
          <p>1 ano</p>
        </div>
      </div>
      </main>
    </div>
  );
}
