import React from "react";
import "../styles/agenda.css";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Agenda() {
  const compromissos = [
    { emoji: "💉", titulo: "Vacina da Luna", data: "02/11/2025" },
    { emoji: "🛁", titulo: "Banho do Thor", data: "04/11/2025" },
    { emoji: "🐕", titulo: "Consulta da Mel", data: "06/11/2025" },
  ];

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
        <header className="header">
          <h1>Agenda e Lembretes</h1>
          <p>Veja e organize os próximos compromissos dos seus pets.</p>
        </header>

        <ul className="agenda-list">
          {compromissos.map((item, index) => (
            <li key={index} className="agenda-item">
              <div className="agenda-icon">{item.emoji}</div>
              <div className="agenda-info">
                <h3>{item.titulo}</h3>
                <span>{item.data}</span>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
