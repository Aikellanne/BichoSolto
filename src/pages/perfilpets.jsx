import React, { useState } from "react";
import "../styles/perfilpets.css";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaSave, FaTimes, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/logo.png";
import cad1 from "../assets/pug.jpg";

export default function PerfilPet() {
  const { id } = useParams();
  const [abaAtiva, setAbaAtiva] = useState("informacoes");
  const [editando, setEditando] = useState(false);
  const [vacinas, setVacinas] = useState([
    {
    nome: "Antirrábica",
    ultimaDose: "2024-01-01",
    proximaDose: "2025-01-01",
    veterinario: "Dr. Paulo - Clínica PetCare",
    },
    {
    nome: "V8/V10",
    ultimaDose: "2024-10-25",
    proximaDose: "2025-10-25",
    veterinario: "Clínica Vida Animal",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
const [novaVacina, setNovaVacina] = useState({
  nome: "",
  ultimaDose: "",
  proximaDose: "",
  veterinario: "",
});
const [editandoVacina, setEditandoVacina] = useState(null);
const handleSalvarVacina = () => {
  if (editandoVacina !== null) {
    const atualizadas = [...vacinas];
    atualizadas[editandoVacina] = novaVacina;
    setVacinas(atualizadas);
    setEditandoVacina(null);
  } else {
    setVacinas([...vacinas, novaVacina]);
  }
  setNovaVacina({ nome: "", ultimaDose: "", proximaDose: "", veterinario: "" });
  setShowModal(false);
};

const handleEditarVacina = (index) => {
  setNovaVacina(vacinas[index]);
  setEditandoVacina(index);
  setShowModal(true);
};

  // Dados iniciais do pet (pode vir de API futuramente)
  const initialPet = {
    nome: "Rex 🦖",
    especie: "Cachorro",
    raca: "Pug",
    dataNasc: "14/05/2020",
    idade: "5 anos",
    peso: "5kg",
    imagem: cad1,
  };

  // Estados
  const [petData, setPetData] = useState(initialPet);
  const [editPet, setEditPet] = useState({ ...initialPet });

  // Funções de edição
  const handleEdit = () => setEditando(true);

  const handleCancel = () => {
    setEditando(false);
    setEditPet({ ...petData }); // restaura dados originais
  };

  const handleSave = () => {
    setPetData({ ...editPet }); // salva alterações
    setEditando(false);
    alert("Informações atualizadas com sucesso! ✅");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditPet((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="page-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <img src={logo} alt="Logo Bicho Solto" className="logo" />
        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li className="active"><Link to="/pets">Pets</Link></li>
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
        <header className="perfil-header">
          <Link to="/pets" className="voltar">
            <FaArrowLeft /> Voltar para Lista
          </Link>

          <div className="pet-info-header">
            <div>
              <h1 className="pet-text">{petData.nome}</h1>
            </div>
            {editando ? (
              <div className="foto-upload">
                <label htmlFor="fotoPet" className="foto-label">
                  <img
                    src={editPet.imagem || petData.imagem}
                    alt={petData.nome}
                    className="pet-foto"
                  />
                  <span className="trocar-texto">Trocar foto</span>
                </label>
                <input
                  type="file"
                  id="fotoPet"
                  accept="image/*"
                  onChange={(e) => {
                    const arquivo = e.target.files[0];
                    if (arquivo) {
                      const imagemURL = URL.createObjectURL(arquivo);
                      setEditPet({ ...editPet, imagem: imagemURL });
                    }
                  }}
                  style={{ display: "none" }}
                />
              </div>
            ) : (
              <img src={petData.imagem} alt={petData.nome} className="pet-foto" />
            )}
          </div>
        </header>

        {/* Abas */}
        <nav className="abas">
          <button
            className={abaAtiva === "informacoes" ? "ativa" : ""}
            onClick={() => setAbaAtiva("informacoes")}
          >
            Informações
          </button>
          <button
            className={abaAtiva === "vacinas" ? "ativa" : ""}
            onClick={() => setAbaAtiva("vacinas")}
          >
            Vacinas
          </button>
          <button
            className={abaAtiva === "medicamentos" ? "ativa" : ""}
            onClick={() => setAbaAtiva("medicamentos")}
          >
            Medicamentos
          </button>
        </nav>

        {/* conteudo das abas */}
        <section className="perfil-content">
          {abaAtiva === "informacoes" && (
            <div className="info-card">
              <div className="info-header">
                <h2>Detalhes Básicos</h2>
                {!editando ? (
                  <FaEdit className="edit-icon" onClick={handleEdit} title="Editar" />
                ) : (
                  <div className="edit-actions">
                    <FaSave className="save-icon" onClick={handleSave} title="Salvar" />
                    <FaTimes className="cancel-icon" onClick={handleCancel} title="Cancelar" />
                  </div>
                )}
              </div>

              {!editando ? (
                <ul>
                  <li><strong>Espécie:</strong> {petData.especie}</li>
                  <li><strong>Raça:</strong> {petData.raca}</li>
                  <li><strong>Data Nasc.:</strong> {petData.dataNasc}</li>
                  <li><strong>Idade:</strong> {petData.idade}</li>
                  <li><strong>Peso:</strong> {petData.peso}</li>
                </ul>
              ) : (
                <form className="edit-form">
                  <label>
                    Espécie:
                    <input type="text" name="especie" value={editPet.especie} onChange={handleChange} />
                  </label>
                  <label>
                    Raça:
                    <input name="raca" value={editPet.raca} onChange={handleChange} />
                  </label>
                  <label>
                    Data Nasc.:
                    <input type="text" name="dataNasc" value={editPet.dataNasc} onChange={handleChange} />
                  </label>
                  <label>
                    Idade:
                    <input type="text" name="idade" value={editPet.idade} onChange={handleChange} />
                  </label>
                  <label>
                    Peso:
                    <input type="text" name="peso" value={editPet.peso} onChange={handleChange} />
                  </label>
                </form>
              )}
            </div>
          )}

          {abaAtiva === "vacinas" && (
            <div className="info-card vacinas">
              <div className="info-header">
                <button className="add-vacina" onClick={() => setShowModal(true)}>+ Adicionar</button>
              </div>

              <ul className="lista-vacinas">
                {vacinas.map((v, i) => {
                  const diasRestantes = Math.ceil(
                    (new Date(v.proximaDose) - new Date()) / (1000 * 60 * 60 * 24)
                );
                const atrasado = diasRestantes < 0;
                return (
                  <li key={i} className={`vacina-item ${atrasado ? "atrasada" : ""}`}>
                    <div className="vacina-info">
                      <h3>💉 {v.nome}</h3>
                        <p>Última dose: {v.ultimaDose}</p>
                        <p>
                          Próxima dose: {v.proximaDose}{""}
                          {atrasado ? <span className="atrasado"> (ATRASADO)</span> : ""}
                        </p>
                        <p>Veterinário: {v.veterinario}</p>
                        {!atrasado && (
                          <p className="dias-restantes">
                            Faltam <strong>{diasRestantes}</strong> dias para a próxima dose.
                          </p>
                        )}
                      </div>
                      <FaEdit
                        className="edit-vacina"
                        title="Editar"
                        onClick={() => handleEditarVacina(i)}
                      />
                    </li>
                  );
                })}
              </ul>

              {/* Modal de Adição/Edição */}
              {showModal && (
                <div className="modal">
                  <div className="modal-content">
                    <h3>{editandoVacina !== null ? "Editar Vacina" : "Adicionar Vacina"}</h3>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSalvarVacina();
                      }}
                    >
                      <label>Nome:</label>
                      <input
                        type="text"
                        value={novaVacina.nome}
                        onChange={(e) =>
                          setNovaVacina({ ...novaVacina, nome: e.target.value })
                        }
                        required
                      />
                      <label>Última dose:</label>
                      <input
                        type="date"
                        value={novaVacina.ultimaDose}
                        onChange={(e) =>
                          setNovaVacina({ ...novaVacina, ultimaDose: e.target.value })
                        }
                        required
                      />
                      <label>Próxima dose:</label>
                      <input
                        type="date"
                        value={novaVacina.proximaDose}
                        onChange={(e) =>
                          setNovaVacina({ ...novaVacina, proximaDose: e.target.value })
                        }
                        required
                      />
                      <label>Veterinário/Clínica:</label>
                      <input
                        type="text"
                        value={novaVacina.veterinario}
                        onChange={(e) =>
                          setNovaVacina({ ...novaVacina, veterinario: e.target.value })
                        }
                        placeholder="Ex: Dr. Paulo - Clínica PetCare"
                      />
                      <div className="modal-actions">
                        <button type="submit">Salvar</button>
                        <button type="button" onClick={() => setShowModal(false)}>
                          Cancelar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {abaAtiva === "medicamentos" && (
            <div className="info-card">
              <h2>Medicamentos</h2>
              <ul>
                <li>Vermífugo — 25/10/2024</li>
                <li>Suplemento — diário</li>
              </ul>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
