// src/pages/PerfilPet.jsx
import React, { useEffect, useState } from "react";
import "../styles/perfilpets.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaSave, FaTimes, FaSignOutAlt, FaTrash } from "react-icons/fa";
import logo from "../assets/logo.png";
import axios from "axios";

const API = "http://localhost:3001"; // ajuste se necessário

export default function PerfilPet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [abaAtiva, setAbaAtiva] = useState("informacoes");
  const [editando, setEditando] = useState(false);

  const [petData, setPetData] = useState(null);
  const [editPet, setEditPet] = useState({});
  const [fotoArquivo, setFotoArquivo] = useState(null);

  const [vacinas, setVacinas] = useState([]);
  const [showModalVacina, setShowModalVacina] = useState(false);
  const [novaVacina, setNovaVacina] = useState({ nome: "", ultimaDose: "", proximaDose: "", veterinario: "" });
  const [editandoVacinaId, setEditandoVacinaId] = useState(null);

  const [medicamentos, setMedicamentos] = useState([]);
  const [showModalMed, setShowModalMed] = useState(false);
  const [novoMed, setNovoMed] = useState({ nome: "", dataInicio: "", dataFim: "", frequencia: "" });
  const [editandoMedId, setEditandoMedId] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetchPet();
    fetchVacinas();
    fetchMedicamentos();
    // eslint-disable-next-line
  }, [id]);

  // === Fetch pet
  const fetchPet = async () => {
    try {
      const res = await axios.get(`${API}/pets/${id}`);
      setPetData(res.data);
      setEditPet(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // === Vacinas
  const fetchVacinas = async () => {
    try {
      const res = await axios.get(`${API}/pets/${id}/vacinas`);
      setVacinas(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const salvarVacina = async () => {
    try {
      if (editandoVacinaId) {
        await axios.put(`${API}/pets/${id}/vacinas/${editandoVacinaId}`, { ...novaVacina });
      } else {
        await axios.post(`${API}/pets/${id}/vacinas`, { ...novaVacina });
      }
      setNovaVacina({ nome: "", ultimaDose: "", proximaDose: "", veterinario: "" });
      setEditandoVacinaId(null);
      setShowModalVacina(false);
      fetchVacinas();
    } catch (err) {
      console.error(err);
    }
  };

  const editarVacina = (vacina) => {
    setNovaVacina({
      nome: vacina.nome || "",
      ultimaDose: vacina.ultimaDose ? formatInputDate(vacina.ultimaDose) : "",
      proximaDose: vacina.proximaDose ? formatInputDate(vacina.proximaDose) : "",
      veterinario: vacina.veterinario || ""
    });
    setEditandoVacinaId(vacina.id);
    setShowModalVacina(true);
  };

  const deletarVacina = async (vacinaId) => {
    if (!window.confirm("Excluir esta vacina?")) return;
    try {
      await axios.delete(`${API}/pets/${id}/vacinas/${vacinaId}`);
      fetchVacinas();
    } catch (err) { console.error(err); }
  };

  // === Medicamentos
  const fetchMedicamentos = async () => {
    try {
      const res = await axios.get(`${API}/pets/${id}/medicamentos`);
      setMedicamentos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const salvarMedicamento = async () => {
    try {
      if (editandoMedId) {
        await axios.put(`${API}/pets/${id}/medicamentos/${editandoMedId}`, { ...novoMed });
      } else {
        await axios.post(`${API}/pets/${id}/medicamentos`, { ...novoMed });
      }
      setNovoMed({ nome: "", dataInicio: "", dataFim: "", frequencia: "" });
      setEditandoMedId(null);
      setShowModalMed(false);
      fetchMedicamentos();
    } catch (err) {
      console.error(err);
    }
  };

  const editarMedicamento = (med) => {
    setNovoMed({
      nome: med.nome || "",
      dataInicio: med.dataInicio ? formatInputDate(med.dataInicio) : "",
      dataFim: med.dataFim ? formatInputDate(med.dataFim) : "",
      frequencia: med.frequencia || ""
    });
    setEditandoMedId(med.id);
    setShowModalMed(true);
  };

  const deletarMedicamento = async (medId) => {
    if (!window.confirm("Excluir este medicamento?")) return;
    try {
      await axios.delete(`${API}/pets/${id}/medicamentos/${medId}`);
      fetchMedicamentos();
    } catch (err) { console.error(err); }
  };

  // === Atualizar pet (dados básicos)
  const salvarPet = async () => {
    try {
      await axios.put(`${API}/pets/${id}`, {
        nome: editPet.nome,
        especie: editPet.especie,
        raca: editPet.raca,
        dataNasc: editPet.dataNasc || null,
        idade: editPet.idade,
        peso: editPet.peso
      });
      // se trocou a foto, enviar também
      if (fotoArquivo) {
        const fd = new FormData();
        fd.append("foto", fotoArquivo);
        await axios.post(`${API}/pets/${id}/foto`, fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        setFotoArquivo(null);
      }
      setEditando(false);
      fetchPet();
      alert("Informações atualizadas com sucesso! ✅");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar pet");
    }
  };

  // === utilidades formatação de datas
  const formatarData = (data) => {
    if (!data) return "-";
    const d = new Date(data);
    const dia = String(d.getDate()).padStart(2, "0");
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  // converte YYYY-MM-DD (ou Date) para value de <input type="date">: yyyy-mm-dd
  const formatInputDate = (data) => {
    if (!data) return "";
    const d = new Date(data);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  // handle change fields
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditPet(prev => ({ ...prev, [name]: value }));
  };

  // === excluir pet (icone na lista já faz, mas aqui caso queira)
  const excluirPet = async () => {
    if (!window.confirm("Deseja excluir este pet?")) return;
    try {
      await axios.delete(`${API}/pets/${id}`);
      navigate("/pets");
    } catch (err) { console.error(err); }
  };

  if (!petData) return <div className="page-container"><main className="main-content"><p>Carregando...</p></main></div>;

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

      {/* Main */}
      <main className="main-content">
        <header className="perfil-header">
          <Link to="/pets" className="voltar"><FaArrowLeft /> Voltar para Lista</Link>

          <div className="pet-info-header">
            <div>
              <h1 className="pet-text">{petData.nome}</h1>
            </div>

            {editando ? (
              <div className="foto-upload">
                <label htmlFor="fotoPet" className="foto-label">
                  <img
                    src={editPet.imagem || petData.imagem || "/uploads/default.png"}
                    alt={petData.nome}
                    className="pet-foto"
                    style={{ width: 110, height: 110, objectFit: "cover" }}
                  />
                  <span className="trocar-texto">Trocar foto</span>
                </label>
                <input
                  type="file"
                  id="fotoPet"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setFotoArquivo(file);
                      setEditPet(prev => ({ ...prev, imagem: URL.createObjectURL(file) }));
                    }
                  }}
                  style={{ display: "none" }}
                />
              </div>
            ) : (
              <img src={petData.imagem || "/uploads/default.png"} alt={petData.nome} className="pet-foto" />
            )}
          </div>
        </header>

        {/* Abas */}
        <nav className="abas">
          <button className={abaAtiva === "informacoes" ? "ativa" : ""} onClick={() => setAbaAtiva("informacoes")}>Informações</button>
          <button className={abaAtiva === "vacinas" ? "ativa" : ""} onClick={() => setAbaAtiva("vacinas")}>Vacinas</button>
          <button className={abaAtiva === "medicamentos" ? "ativa" : ""} onClick={() => setAbaAtiva("medicamentos")}>Medicamentos</button>
        </nav>

        <section className="perfil-content">
          {abaAtiva === "informacoes" && (
            <div className="info-card">
              <div className="info-header">
                <h2>Detalhes Básicos</h2>
                {!editando ? (
                  <FaEdit className="edit-icon" onClick={() => setEditando(true)} title="Editar" />
                ) : (
                  <div className="edit-actions">
                    <FaSave className="save-icon" onClick={salvarPet} title="Salvar" />
                    <FaTimes className="cancel-icon" onClick={() => { setEditando(false); setEditPet(petData); }} title="Cancelar" />
                  </div>
                )}
              </div>

              {!editando ? (
                <ul>
                  <li><strong>Espécie:</strong> {petData.especie}</li>
                  <li><strong>Raça:</strong> {petData.raca}</li>
                  <li><strong>Data Nasc.:</strong> {petData.dataNasc ? formatarData(petData.dataNasc) : "-"}</li>
                  <li><strong>Idade:</strong> {petData.idade}</li>
                  <li><strong>Peso:</strong> {petData.peso}</li>
                </ul>
              ) : (
                <form className="edit-form" onSubmit={(e) => { e.preventDefault(); salvarPet(); }}>
                  <label>Espécie:
                    <input type="text" name="especie" value={editPet.especie || ""} onChange={handleEditChange} />
                  </label>
                  <label>Raça:
                    <input name="raca" value={editPet.raca || ""} onChange={handleEditChange} />
                  </label>
                  <label>Data Nasc.:
                    <input type="date" name="dataNasc" value={editPet.dataNasc ? formatInputDate(editPet.dataNasc) : ""} onChange={(e) => handleEditChange({ target: { name: "dataNasc", value: e.target.value } })} />
                  </label>
                  <label>Idade:
                    <input type="text" name="idade" value={editPet.idade || ""} onChange={handleEditChange} />
                  </label>
                  <label>Peso:
                    <input type="text" name="peso" value={editPet.peso || ""} onChange={handleEditChange} />
                  </label>
                </form>
              )}
            </div>
          )}

          {abaAtiva === "vacinas" && (
            <div className="info-card vacinas">
              <div className="info-header">
                <button className="add-vacina" onClick={() => { setShowModalVacina(true); setEditandoVacinaId(null); setNovaVacina({ nome: "", ultimaDose: "", proximaDose: "", veterinario: "" }); }}>
                  + Adicionar
                </button>
              </div>

              <ul className="lista-vacinas">
                {vacinas.map((v) => (
                  <li key={v.id} className={`vacina-item ${v.concluida ? "concluida" : ""}`} style={{ borderLeft: "8px solid #facc15", backgroundColor: "white", borderRadius: "12px", padding: "12px", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
                    <div className="vacina-info" style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <input type="checkbox" checked={!!v.concluida} onChange={async () => {
                          await axios.put(`${API}/pets/${id}/vacinas/${v.id}`, { ...v, concluida: !v.concluida });
                          fetchVacinas();
                        }} style={{ width: "18px", height: "18px", accentColor: "#facc15" }} />
                        <h3 style={{ margin: 0, fontSize: "1.1rem", textDecoration: v.concluida ? "line-through" : "none", color: v.concluida ? "#9ca3af" : "#212c56" }}>
                          💉 {v.nome}
                        </h3>
                      </div>

                      <p style={{ margin: "4px 0", textDecoration: v.concluida ? "line-through" : "none", color: v.concluida ? "#9ca3af" : "#212c56" }}>Última dose: {v.ultimaDose ? formatarData(v.ultimaDose) : "-"}</p>
                      <p style={{ margin: "4px 0", textDecoration: v.concluida ? "line-through" : "none", color: v.concluida ? "#9ca3af" : "#212c56" }}>Próxima dose: {v.proximaDose ? formatarData(v.proximaDose) : "-"}</p>
                      {v.veterinario && <p style={{ margin: "4px 0", textDecoration: v.concluida ? "line-through" : "none", color: v.concluida ? "#9ca3af" : "#212c56" }}>Veterinário/Clínica: {v.veterinario}</p>}
                    </div>

                    <div className="vacina-acoes" style={{ display: "flex", gap: "10px" }}>
                      <FaEdit className="edit-vacina" title="Editar" style={{ cursor: "pointer", color: "#fbbf24" }} onClick={() => editarVacina(v)} />
                      <FaTrash className="delete-vacina" title="Excluir" style={{ cursor: "pointer", color: "#ef4444" }} onClick={() => deletarVacina(v.id)} />
                    </div>
                  </li>
                ))}
              </ul>

              {showModalVacina && (
                <div className="modal">
                  <div className="modal-content">
                    <h3>{editandoVacinaId ? "Editar Vacina" : "Adicionar Vacina"}</h3>
                    <form onSubmit={(e) => { e.preventDefault(); salvarVacina(); }}>
                      <label>Nome:</label>
                      <input type="text" value={novaVacina.nome} onChange={(e) => setNovaVacina(prev => ({ ...prev, nome: e.target.value }))} required />
                      <label>Última dose:</label>
                      <input type="date" value={novaVacina.ultimaDose} onChange={(e) => setNovaVacina(prev => ({ ...prev, ultimaDose: e.target.value }))} />
                      <label>Próxima dose:</label>
                      <input type="date" value={novaVacina.proximaDose} onChange={(e) => setNovaVacina(prev => ({ ...prev, proximaDose: e.target.value }))} />
                      <label>Veterinário/Clínica:</label>
                      <input type="text" value={novaVacina.veterinario} onChange={(e) => setNovaVacina(prev => ({ ...prev, veterinario: e.target.value }))} placeholder="Ex: Dr. Paulo - Clínica PetCare" />
                      <div className="modal-actions">
                        <button className="btn-salvar" type="submit">Salvar</button>
                        <button className="btn-cancelar" type="button" onClick={() => setShowModalVacina(false)}>Cancelar</button>
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
                <button className="add-medicamento" onClick={() => { setShowModalMed(true); setEditandoMedId(null); setNovoMed({ nome: "", dataInicio: "", dataFim: "", frequencia: "" }); }}>
                  + Adicionar
                </button>
              </div>

              <ul className="lista-medicamentos">
                {medicamentos.map((m) => (
                  <li key={m.id} className="medicamento-item" style={{ borderLeft: "8px solid #ffca28", backgroundColor: "white", borderRadius: "12px", padding: "12px", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
                    <div className="medicamento-info" style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <input type="checkbox" checked={!!m.concluido} onChange={async () => {
                          await axios.put(`${API}/pets/${id}/medicamentos/${m.id}`, { ...m, concluido: !m.concluido });
                          fetchMedicamentos();
                        }} style={{ width: "18px", height: "18px", accentColor: "#fbbf24" }} />
                        <h3 style={{ margin: 0, fontSize: "1.1rem", textDecoration: m.concluido ? "line-through" : "none", color: m.concluido ? "#9ca3af" : "#212c56" }}>
                          💊 {m.nome}
                        </h3>
                      </div>

                      <p style={{ margin: "4px 0", textDecoration: m.concluido ? "line-through" : "none", color: m.concluido ? "#9ca3af" : "#212c56" }}>Início: {m.dataInicio ? formatarData(m.dataInicio) : "-"}</p>
                      <p style={{ margin: "4px 0", textDecoration: m.concluido ? "line-through" : "none", color: m.concluido ? "#9ca3af" : "#212c56" }}>Término: {m.dataFim ? formatarData(m.dataFim) : "-"}</p>
                      <p style={{ margin: "4px 0", textDecoration: m.concluido ? "line-through" : "none", color: m.concluido ? "#9ca3af" : "#212c56" }}>Frequência: {m.frequencia || "-"}</p>
                    </div>

                    <div className="medicamento-acoes" style={{ display: "flex", gap: "10px" }}>
                      <FaEdit className="edit-medicamento" title="Editar" style={{ cursor: "pointer", color: "#fbbf24" }} onClick={() => editarMedicamento(m)} />
                      <FaTrash className="delete-medicamento" title="Excluir" style={{ cursor: "pointer", color: "#ef4444" }} onClick={() => deletarMedicamento(m.id)} />
                    </div>
                  </li>
                ))}
              </ul>

              {showModalMed && (
                <div className="modal">
                  <div className="modal-content">
                    <h3>{editandoMedId ? "Editar Medicamento" : "Adicionar Medicamento"}</h3>
                    <form onSubmit={(e) => { e.preventDefault(); salvarMedicamento(); }}>
                      <label>Nome:</label>
                      <input type="text" value={novoMed.nome} onChange={(e) => setNovoMed(prev => ({ ...prev, nome: e.target.value }))} required />
                      <label>Data de Início:</label>
                      <input type="date" value={novoMed.dataInicio} onChange={(e) => setNovoMed(prev => ({ ...prev, dataInicio: e.target.value }))} />
                      <label>Data de Término:</label>
                      <input type="date" value={novoMed.dataFim} onChange={(e) => setNovoMed(prev => ({ ...prev, dataFim: e.target.value }))} />
                      <label>Frequência:</label>
                      <input type="text" value={novoMed.frequencia} onChange={(e) => setNovoMed(prev => ({ ...prev, frequencia: e.target.value }))} placeholder="Ex: 2x ao dia" />
                      <div className="modal-actions">
                        <button className="btn-salvar" type="submit">Salvar</button>
                        <button className="btn-cancelar" type="button" onClick={() => setShowModalMed(false)}>Cancelar</button>
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
