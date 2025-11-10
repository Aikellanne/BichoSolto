import React, { useState } from "react";
import "../styles/contatos.css";
import { FaSignOutAlt, FaTrash , FaEdit, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Contatos() {
  const [contatos, setContatos] = useState([
    { nome: "Clínica Vet 24h", endereco: "Rua dos Gatos, 123", telefone: "(99) 99999-7777", editando: false },
    { nome: "Pet Shop Feliz", endereco: "Rua das Flores, 89", telefone: "(11) 98888-1234", editando: false },
  ]);

  const [novo, setNovo] = useState({ nome: "", endereco: "", telefone: "" });

  // Adicionar contato
  const adicionarContato = () => {
    if (novo.nome.trim() && novo.telefone.trim()) {
      setContatos([...contatos, { ...novo, editando: false }]);
      setNovo({ nome: "", endereco: "", telefone: "" });
    }
  };

  // Excluir contato
  const deletarContato = (index) => {
    const atualizados = contatos.filter((_, i) => i !== index);
    setContatos(atualizados);
  };

  // Entrar no modo de edição
  const editarContato = (index) => {
    const atualizados = [...contatos];
    atualizados[index].editando = true;
    setContatos(atualizados);
  };

  // Salvar contato editado
  const salvarContato = (index, atualizado) => {
    const novos = [...contatos];
    novos[index] = { ...atualizado, editando: false };
    setContatos(novos);
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
          <p>Adicione, edite e mantenha sempre à mão os contatos importantes.</p>
        </header>

        {/* Formulário de novo contato */}
        <div className="add-contact">
          <input
            type="text"
            placeholder="Nome do local ou profissional"
            value={novo.nome}
            onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
          />
          <input
            type="text"
            placeholder="Endereço"
            value={novo.endereco}
            onChange={(e) => setNovo({ ...novo, endereco: e.target.value })}
          />
          <input
            type="text"
            placeholder="Telefone"
            value={novo.telefone}
            onChange={(e) => setNovo({ ...novo, telefone: e.target.value })}
          />
          <button onClick={adicionarContato}>Adicionar</button>
        </div>

        {/* Lista de contatos */}
        <div className="contact-list">
          {contatos.length > 0 ? (
            contatos.map((contato, index) => (
              <div key={index} className="contact-card">
                {contato.editando ? (
                  <>
                    <input
                      type="text"
                      value={contato.nome}
                      onChange={(e) => {
                        const novos = [...contatos];
                        novos[index].nome = e.target.value;
                        setContatos(novos);
                      }}
                    />
                    <input
                      type="text"
                      value={contato.endereco}
                      onChange={(e) => {
                        const novos = [...contatos];
                        novos[index].endereco = e.target.value;
                        setContatos(novos);
                      }}
                    />
                    <input
                      type="text"
                      value={contato.telefone}
                      onChange={(e) => {
                        const novos = [...contatos];
                        novos[index].telefone = e.target.value;
                        setContatos(novos);
                      }}
                    />
                    <button
                      className="btn-save"
                      onClick={() => salvarContato(index, contato)}
                    >
                      <FaCheck />
                    </button>
                  </>
                ) : (
                  <>
                    <h3>{contato.nome}</h3>
                    <p>{contato.endereco}</p>
                    <p>{contato.telefone}</p>
                    <div className="contact-actions">
                      <button
                        className="btn-edit"
                        onClick={() => editarContato(index)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn-excluir"
                        onClick={() => deletarContato(index)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="sem-contatos">📞 Nenhum contato adicionado ainda!</p>
          )}
        </div>
      </main>
    </div>
  );
}
