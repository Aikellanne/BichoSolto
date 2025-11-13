import React from "react";
import "../styles/dashboard.css";
import { FaPaw, FaSyringe, FaCalendarAlt, FaSignOutAlt, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Dashboard() {

  const lembretes = [
    { titulo: "Vacina do Rex", data: "10/11/2025" },
    { titulo: "Banho da Luna", data: "12/11/2025" },
    { titulo: "Consulta da Mel", data: "15/11/2025" },
  ];

  const atualizacoes = [
    "Novo pet “Luna” adicionado",
    "Vacina “Raiva” marcada como concluída",
    "Novo lembrete criado",
  ];

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

        {/* Cards de estatísticas */}
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
            <h3>Lembretes Ativos</h3>
            <p>5 no total</p>
          </div>

          <div className="card">
            <FaPhoneAlt className="icon" />
            <h3>Contatos de Emergência</h3>
            <p>2 cadastrados</p>
          </div>
        </section>

         {/* Resumo */}
        <section className="overview">
          <h2>Resumo do Período</h2>
          <div className="overview-content">
            {/* Próximos Lembretes */}
            <div className="overview-item">
              <div className="overview-header">
                <h3>Próximos Lembretes</h3>
                <Link to="/agenda" className="ver-todos">Ver todos</Link>
              </div>
              <ul>
                {lembretes.map((item, index) => (
                  <li key={index}>
                    {item.titulo} — <span>{item.data}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Últimas Atualizações */}
            <div className="overview-item">
              <h3>Últimas Atualizações</h3>
              <ul>
                {atualizacoes.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
