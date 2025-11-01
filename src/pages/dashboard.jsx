import React from "react";
import "../styles/dashboard.css";
import { FaPaw, FaSyringe, FaCalendarAlt, FaSignOutAlt, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <img src={logo} alt="Logo Bicho Solto" className="logo" />
        <nav>
          <ul>
            <li className="active"><Link to="/">Dashboard</Link></li>
            <li><Link to="/pets">Pets</Link></li>
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
          <h1>Bem-vindo(a) de volta, Jennifer</h1>
          <p>Veja o que é mais importante para os cuidados dos seus pets hoje.</p>
        </header>

        <section className="cards-section">
          <div className="card">
            <FaPaw className="icon" />
            <h3>Meus Pets</h3>
            <p>3 cadastrados</p>
          </div>

          <div className="card">
            <FaSyringe className="icon" />
            <h3>Vacinas Pendentes</h3>
            <p>2 próximas</p>
          </div>

          <div className="card">
            <FaCalendarAlt className="icon" />
            <h3>Lembretes</h3>
            <p>Banho e consulta hoje</p>
          </div>

          <div className="card">
            <FaPhoneAlt className="icon" />
            <h3>Contatos de Emergência</h3>
            <p>4 cadastrados</p>
          </div>
        </section>

        <section className="overview">
          <h2>Resumo Diário</h2>
          <div className="overview-content">
            <div className="overview-item">
              <h3>Próximos Lembretes</h3>
              <ul>
                <li>Vacina do Thor — 02/11</li>
                <li>Banho da Luna — 03/11</li>
                <li>Consulta da Mel — 06/11</li>
              </ul>
            </div>

            <div className="overview-item">
              <h3>Últimas Atualizações</h3>
              <ul>
                <li>Thor foi vacinado em 28/10</li>
                <li>Luna tomou vermífugo em 25/10</li>
                <li>Mel adicionada ao sistema</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
