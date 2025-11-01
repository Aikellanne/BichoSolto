import React from "react";
import "../styles/agenda.css";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Agenda() {
  return (
    <div className="page-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <img src={logo} alt="Logo Bicho Solto" className="logo" />
        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/pets">Pets</Link></li>
            <li><Link to="/cadastro">Cadastro</Link></li>
            <li className="active"><Link to="/agenda">Agenda</Link></li>
            <li><Link to="/contatos">Contatos</Link></li>
            <li><Link to="/configuracoes">Configurações</Link></li>
            <li className="logout"><FaSignOutAlt /> Sair</li>
          </ul>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="main-content">
      <h1>Agenda e Lembretes</h1>
      <p>Veja e organize os próximos compromissos dos seus pets.</p>

      <ul className="agenda-list">
        <li>💉 Vacina da Luna — 02/11/2025</li>
        <li>🛁 Banho do Thor — 04/11/2025</li>
        <li>🐕 Consulta da Mel — 06/11/2025</li>
      </ul>
     </main>
    </div>
  );
}
