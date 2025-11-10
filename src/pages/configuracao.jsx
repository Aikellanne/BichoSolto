import React, { useState } from "react";
import "../styles/configuracao.css";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Configuracoes() {
  const [nome, setNome] = useState("Jennifer");
  const [email, setEmail] = useState("jennifer@email.com");
  const [senha, setSenha] = useState("");

  const handleSalvar = (e) => {
    e.preventDefault();
    alert("Alterações salvas com sucesso!");
  };

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
          <p>Atualize suas informações de usuário abaixo.</p>
        </header>

        <form className="config-form" onSubmit={handleSalvar}>
          <h3>Informações do Usuário</h3>

          <div className="form-group">
            <label>Nome do Usuário:</label>
            <input 
              type="text" 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome" 
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@exemplo.com" 
            />
          </div>

          <div className="form-group">
            <label>Nova Senha:</label>
            <input 
              type="password" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite uma nova senha" 
            />
          </div>

          <button className="btn-save">Salvar Alterações</button>
        </form>
      </main>
    </div>
  );
}
