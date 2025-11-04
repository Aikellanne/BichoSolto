import React from "react";
import "../styles/contatos.css";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Emergencias() {
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
            <li><Link to="/agenda">Agenda</Link></li>
            <li className="active"><Link to="/contatos">Contatos</Link></li>
            <li><Link to="/configuracoes">Configurações</Link></li>
            <li className="logout"><FaSignOutAlt /> Sair</li>
          </ul>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="main-content">
      <header className="header">
      <h1>Contatos de Emergência</h1>
      <p>Clínicas, veterinários e outros serviços importantes.</p>
      </header>

      <div className="contact-list">
        <div className="contact-card">
          <h3>Clínica Vet 24h</h3>
          <p>Endereço: Rua dos Gatos, 123</p>
          <p>Telefone: (99) 99999-7777</p>
        </div>

        <div className="contact-card">
          <h3>Pet Shop Feliz</h3>
          <p>📞 (11) 98888-1234</p>
          <p>Rua das Flores, 89</p>
        </div>
      </div>
     </main>
    </div>
  );
}
