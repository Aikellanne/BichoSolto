import React, { useState } from "react";
import "../styles/perfilpets.css";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaSave, FaTimes, FaSignOutAlt, FaTrash } from "react-icons/fa";
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

  // ====== ESTADOS MEDICAMENTOS ======
const [medicamentos, setMedicamentos] = useState([
  {
    nome: "Vermífugo - Drontal Plus",
    dataInicio: "2025-01-10",
    dataFim: "2025-01-17",
    frequencia: "1 comprimido a cada 8h",
    concluido: false,
  },
]);
const [showModalMedicamento, setShowModalMedicamento] = useState(false);
const [novoMedicamento, setNovoMedicamento] = useState({
  nome: "",
  dataInicio: "",
  dataFim: "",
  frequencia: "",
});
const [editandoMedicamento, setEditandoMedicamento] = useState(null);

const handleSalvarMedicamento = () => {
  if (editandoMedicamento !== null) {
    const atualizados = [...medicamentos];
    atualizados[editandoMedicamento] = novoMedicamento;
    setMedicamentos(atualizados);
    setEditandoMedicamento(null);
  } else {
    setMedicamentos([...medicamentos, novoMedicamento]);
  }
  setNovoMedicamento({ nome: "", dataInicio: "", dataFim: "", frequencia: "", });
  setShowModalMedicamento(false);
};

const handleEditarMedicamento = (index) => {
  setNovoMedicamento(medicamentos[index]);
  setEditandoMedicamento(index);
  setShowModalMedicamento(true);
};

const handleExcluirMedicamento = (index) => {
  setMedicamentos(medicamentos.filter((_, i) => i !== index));
};

  // Função para formatar datas para dd/mm/aaaa
  const formatarData = (data) => {
    if (!data) return "-";
    const d = new Date(data);
    const dia = String(d.getDate()).padStart(2, "0");
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
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
      <button className="add-vacina" onClick={() => setShowModal(true)}>
        + Adicionar
      </button>
    </div>

    <ul className="lista-vacinas">
      {vacinas.map((v, i) => {
        const formatarData = (data) => {
          const d = new Date(data);
          const dia = String(d.getDate()).padStart(2, "0");
          const mes = String(d.getMonth() + 1).padStart(2, "0");
          const ano = d.getFullYear();
          return `${dia}/${mes}/${ano}`;
        };

        return (
          <li
            key={i}
            className={`vacina-item ${v.concluida ? "concluida" : ""}`}
            style={{
              borderLeft: "8px solid #facc15",
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "12px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <div className="vacina-info" style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="checkbox"
                  checked={v.concluida || false}
                  onChange={() => {
                    const atualizadas = [...vacinas];
                    atualizadas[i].concluida = !atualizadas[i].concluida;
                    setVacinas(atualizadas);
                  }}
                  style={{ width: "18px", height: "18px", accentColor: "#facc15" }}
                />
                <h3
                  style={{
                    margin: 0,
                    fontSize: "1.1rem",
                    textDecoration: v.concluida ? "line-through" : "none",
                    color: v.concluida ? "#9ca3af" : "#212c56",
                  }}
                >
                  💉 {v.nome}
                </h3>
              </div>

              <p style={{margin: "4px 0",             textDecoration: v.concluida ? "line-through" : "none", color: v.concluida ? "#9ca3af" : "#212c56",}}>
                Última dose: {formatarData(v.ultimaDose)}
              </p>
              <p style={{ margin: "4px 0", textDecoration: v.concluida ? "line-through" : "none", color: v.concluida ? "#9ca3af" : "#212c56", }}>
                Próxima dose: {formatarData(v.proximaDose)}
              </p>
              {v.veterinario && (
                <p style={{ margin: "4px 0", textDecoration: v.concluida ? "line-through" : "none", color: v.concluida ? "#9ca3af" : "#212c56", }}>
                  Veterinário/Clínica: {v.veterinario}
                </p>
              )}
            </div>

            <div className="vacina-acoes" style={{ display: "flex", gap: "10px" }}>
              <FaEdit
                className="edit-vacina"
                title="Editar"
                style={{ cursor: "pointer", color: "#fbbf24" }}
                onClick={() => handleEditarVacina(i)}
              />
              <FaTrash
                className="delete-vacina"
                title="Excluir"
                style={{ cursor: "pointer", color: "#ef4444" }}
                onClick={() => {
                  if (window.confirm("Tem certeza que deseja excluir esta vacina?")) {
                    setVacinas(vacinas.filter((_, index) => index !== i));
                  }
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>

    {/* Modal */}
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
              onChange={(e) => setNovaVacina({ ...novaVacina, nome: e.target.value })}
              required
            />
            <label>Última dose:</label>
            <input
              type="date"
              value={novaVacina.ultimaDose}
              onChange={(e) => setNovaVacina({ ...novaVacina, ultimaDose: e.target.value })}
              required
            />
            <label>Próxima dose:</label>
            <input
              type="date"
              value={novaVacina.proximaDose}
              onChange={(e) => setNovaVacina({ ...novaVacina, proximaDose: e.target.value })}
              required
            />
            <label>Veterinário/Clínica:</label>
            <input
              type="text"
              value={novaVacina.veterinario}
              onChange={(e) => setNovaVacina({ ...novaVacina, veterinario: e.target.value })}
              placeholder="Ex: Dr. Paulo - Clínica PetCare"
            />
            <div className="modal-actions">
              <button className="btn-salvar" type="submit">
                Salvar
              </button>
              <button className="btn-cancelar" type="button" onClick={() => setShowModal(false)}>
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
  <div className="info-card medicamentos">
    <div className="info-header">
      <button className="add-medicamento" onClick={() => setShowModalMedicamento(true)}>
        + Adicionar
      </button>
    </div>

    <ul className="lista-medicamentos">
      {medicamentos.map((m, i) => (
        <li
          key={i}
          className="medicamento-item"
          style={{
            borderLeft: "8px solid #ffca28",
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "12px",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <div className="medicamento-info" style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="checkbox"
                checked={m.concluido || false}
                onChange={() => {
                  const atualizados = [...medicamentos];
                  atualizados[i].concluido = !atualizados[i].concluido;
                  setMedicamentos(atualizados);
                }}
                style={{ width: "18px", height: "18px", accentColor: "#fbbf24" }}
              />
              <h3
                style={{
                  margin: 0,
                  fontSize: "1.1rem",
                  textDecoration: m.concluido ? "line-through" : "none",
                  color: m.concluido ? "#9ca3af" : "#212c56",
                }}
              >
                💊 {m.nome}
              </h3>
            </div>

            <p style={{ margin: "4px 0", textDecoration: m.concluido ? "line-through" : "none", color: m.concluido ? "#9ca3af" : "#212c56", }}>
              Início: {formatarData(m.dataInicio)}
            </p>
            <p style={{ margin: "4px 0", textDecoration: m.concluido ? "line-through" : "none", color: m.concluido ? "#9ca3af" : "#212c56", }}>
              Término: {formatarData(m.dataInicio)}
            </p>
            <p style={{ margin: "4px 0", textDecoration: m.concluido ? "line-through" : "none", color: m.concluido ? "#9ca3af" : "#212c56", }}>
              Frequência: {m.frequencia || "-"}
            </p>
          </div>

          <div className="medicamento-acoes" style={{ display: "flex", gap: "10px" }}>
            <FaEdit
              className="edit-medicamento"
              title="Editar"
              style={{ cursor: "pointer", color: "#fbbf24" }}
              onClick={() => handleEditarMedicamento(i)}
            />
            <FaTrash
              className="delete-medicamento"
              title="Excluir"
              style={{ cursor: "pointer", color: "#ef4444" }}
              onClick={() => {
                if (window.confirm("Tem certeza que deseja excluir este medicamento?")) {
                  handleExcluirMedicamento(i);
                }
              }}
            />
          </div>
        </li>
      ))}
    </ul>

    {/* Modal */}
    {showModalMedicamento && (
      <div className="modal">
        <div className="modal-content">
          <h3>{editandoMedicamento !== null ? "Editar Medicamento" : "Adicionar Medicamento"}</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSalvarMedicamento();
            }}
          >
            <label>Nome:</label>
            <input
              type="text"
              value={novoMedicamento.nome}
              onChange={(e) => setNovoMedicamento({ ...novoMedicamento, nome: e.target.value })}
              required
            />
            <label>Data de Início:</label>
            <input
              type="date"
              value={novoMedicamento.dataInicio}
              onChange={(e) => setNovoMedicamento({ ...novoMedicamento, dataInicio: e.target.value })}
            />
            <label>Data de Término:</label>
            <input
              type="date"
              value={novoMedicamento.dataFim}
              onChange={(e) => setNovoMedicamento({ ...novoMedicamento, dataFim: e.target.value })}
            />
            <label>Frequência:</label>
            <input
              type="text"
              value={novoMedicamento.frequencia}
              onChange={(e) => setNovoMedicamento({ ...novoMedicamento, frequencia: e.target.value })}
              placeholder="Ex: 2x ao dia"
            />
            <div className="modal-actions">
              <button className="btn-salvar" type="submit">
                Salvar
              </button>
              <button
                className="btn-cancelar"
                type="button"
                onClick={() => setShowModalMedicamento(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
)}


          
        </section>
      </main>
    </div>
  );
}
