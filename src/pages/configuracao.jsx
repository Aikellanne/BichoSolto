import React from "react";
import "../styles/configuracao.css";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Configuracoes() {
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
            <li><Link to="/contatos">Contatos</Link></li>
            <li className="active"><Link to="/configuracoes">Configurações</Link></li>
            <li className="logout"><FaSignOutAlt /> Sair</li>
          </ul>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="main-content">
      <header className="header">
      <h1>Configurações da Conta</h1>
      </header>
      <form className="config-form">
        <h3>Informações Básicas</h3>
        <div className="form-group">
          <label>Nome do Usuário:</label>
          <input type="text" placeholder="Seu nome" />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" placeholder="email@exemplo.com" />
        </div>

        <div className="form-group">
          <label>Senha:</label>
          <input type="password" placeholder="Nova senha" />
        </div>

        <button className="btn-save">Salvar Alterações</button>
      </form>
      </main>
    </div>
  );
}
