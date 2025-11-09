import React from "react";
import "../styles/cadastro.css";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Cadastro() {
  return (
    <div className="page-container">
      {/* Sidebar */}
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

      {/* Conteúdo principal */}
      <main className="main-content">
        <header className="header">
          <h1>Cadastrar Novo Pet</h1>
          <p>Preencha os detalhes do seu novo amigo para começar a cuidar dele.</p>
        </header>

        <form className="addpet-form">
          <div className="form-row">
            <div className="form-group">
              <label>Nome do Pet:</label>
              <input type="text" placeholder="Ex.: Rex, Luna..." />
            </div>

            <div className="form-group">
              <label>Espécie:</label>
              <select>
                <option value="cachorro">Cachorro</option>
                <option value="gato">Gato</option>
                <option value="outro">Outro</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Raça:</label>
              <input type="text" placeholder="Ex.: Labrador, Shitzu" />
            </div>

            <div className="form-group">
              <label>Data de Nascimento:</label>
              <input type="date" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Idade:</label>
              <input type="number" placeholder="Em anos" />
            </div>

            <div className="form-group">
              <label>Peso:</label>
              <input type="text" placeholder="Ex.: 10 kg" />
            </div>
          </div>

          <div className="form-group">
            <label>Imagem de Perfil:</label>
            <input type="file" />
          </div>

          <button type="submit" className="btn-submit">Cadastrar</button>
        </form>
      </main>
    </div>
  );
}
