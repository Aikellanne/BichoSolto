import React, { useState } from "react";
import "../styles/agenda.css";
import { FaSignOutAlt, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Agenda() {
  const [compromissos, setCompromissos] = useState([
    { emoji: "💉", titulo: "Vacina da Luna", data: "02/11/2025", concluido: false },
  ]);

  const [novo, setNovo] = useState({ emoji: "", titulo: "", data: "" });

  const adicionarCompromisso = () => {
    if (novo.titulo.trim() && novo.data) {
      setCompromissos([...compromissos, { ...novo, concluido: false }]);
      setNovo({ emoji: "", titulo: "", data: "" });
    }
  };

  const alternarConclusao = (index) => {
    const atualizados = [...compromissos];
    atualizados[index].concluido = !atualizados[index].concluido;
    setCompromissos(atualizados);
  };

  const deletarCompromisso = (index) => {
    const atualizados = compromissos.filter((_, i) => i !== index);
    setCompromissos(atualizados);
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
          <p>Veja, adicione e marque compromissos concluídos dos seus pets.</p>
        </header>

        {/* Formulário para adicionar */}
        <div className="add-agenda">
          <input
            type="text"
            placeholder="Emoji (ex: 🐾)"
            value={novo.emoji}
            onChange={(e) => setNovo({ ...novo, emoji: e.target.value })}
          />
          <input
            type="text"
            placeholder="Título do compromisso"
            value={novo.titulo}
            onChange={(e) => setNovo({ ...novo, titulo: e.target.value })}
          />
          <input
            type="date"
            value={novo.data}
            onChange={(e) => setNovo({ ...novo, data: e.target.value })}
          />
          <button onClick={adicionarCompromisso}>Adicionar</button>
        </div>

        {/* Lista de compromissos */}
        <div className="agenda-container">
          {compromissos.length > 0 ? (
            compromissos.map((item, index) => (
              <div
                key={index}
                className={`agenda-card ${item.concluido ? "concluido" : ""}`}
              >
                <div className="agenda-info">
                  <input
                    type="checkbox"
                    checked={item.concluido}
                    onChange={() => alternarConclusao(index)}
                  />
                  <span className="agenda-emoji">{item.emoji}</span>
                  <div>
                    <h3>{item.titulo}</h3>
                    <p>{item.data}</p>
                  </div>
                </div>
                <button
                  className="btn-delete"
                  onClick={() => deletarCompromisso(index)}
                >
                  <FaTrash />
                </button>
              </div>
            ))
          ) : (
            <p className="sem-compromissos">🎉 Nenhum compromisso pendente!</p>
          )}
        </div>
      </main>
    </div>
  );
}
