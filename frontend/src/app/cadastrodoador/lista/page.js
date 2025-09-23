"use client";
import React, { useEffect, useState } from "react";
import MenuBar from "../../components/menubar/menubar";
import Navigation from "../../components/navegation/navegation";
import styles from "./lista.module.css";
import { useRouter } from "next/navigation";
import modalStyles from "./lista.module.css";

export default function ListaDoadores() {
  const [doadores, setDoadores] = useState([]); // [{id, nomeCompleto, email, telefoneCelular, ...}]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState(null); // objeto do doador a editar
  const [editError, setEditError] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError("");
    try {
      const mock = JSON.parse(localStorage.getItem('mockDoadores') || '[]');
      setDoadores(mock);
    } catch (err) {
      setError("Erro ao carregar doadores do mock");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEdit = (id) => {
    router.push(`/cadastrodoador/editar/${id}`);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este doador?")) return;
    setLoading(true);
    setError("");
    try {
      const novos = doadores.filter((d) => d.id !== id);
      setDoadores(novos);
      localStorage.setItem('mockDoadores', JSON.stringify(novos));
      alert("Doador excluído com sucesso!");
    } catch (err) {
      setError("Erro ao excluir doador");
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (doador) => {
    setEditForm({ ...doador });
    setEditModalOpen(true);
    setEditError("");
  };
  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditForm(null);
    setEditError("");
  };
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError("");
    // Validação de CPF (opcional, mas se preenchido deve ter 11 dígitos)
    const cpfLimpo = editForm.cpf.replace(/\D/g, "");
    if (cpfLimpo.length > 0 && cpfLimpo.length !== 11) {
      setEditError("CPF deve conter 11 dígitos numéricos.");
      setEditLoading(false);
      return;
    }
    try {
      const novos = doadores.map((d) => d.id === editForm.id ? { ...editForm, cpf: cpfLimpo } : d);
      setDoadores(novos);
      localStorage.setItem('mockDoadores', JSON.stringify(novos));
      setEditModalOpen(false);
      setEditForm(null);
    } catch (err) {
      setEditError("Erro ao salvar edição");
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className={styles.containerGeral}>
      <MenuBar />
      <Navigation />
      <div className={styles.contentWrapper}>
        <div className={styles.listContainer}>
          <h1 className={styles.titulo}>Doadores Cadastrados</h1>
          <div className={styles.decoracao}></div>
          <div className={styles.actionsHeader}>
            <button
              className={styles.addButton}
              onClick={() => router.push("/cadastrodoador")}
            >
              + Adicionar Doador
            </button>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.beneficiariosTable}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>NIF</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className={styles.loadingMessage}>Carregando...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={5} className={styles.errorMessage}>{error}</td>
                  </tr>
                ) : doadores.length === 0 ? (
                  <tr>
                    <td colSpan={5} className={styles.noDataMessage}>Nenhum doador cadastrado ainda.</td>
                  </tr>
                ) : (
                  doadores.map((d) => (
                    <tr key={d.id}>
                      <td>{d.nomeCompleto}</td>
                      <td>{d.email}</td>
                      <td>{d.telefoneCelular}</td>
                      <td>–</td>
                      <td className={styles.actionButtons}>
                        <button
                          className={styles.editButton}
                          onClick={() => openEditModal(d)}
                          disabled={loading}
                        >
                          Editar
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDelete(d.id)}
                          disabled={loading}
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Modal de edição */}
      {editModalOpen && (
        <div className={modalStyles.modalOverlay}>
          <div className={modalStyles.modalContent}>
            <h2 className={modalStyles.titulo}>Editar Doador</h2>
            <form onSubmit={handleEditSubmit} className={modalStyles.formulario}>
              <div className={modalStyles.formGroup}>
                <label htmlFor="edit_nomeCompleto"><b>Nome completo*</b></label>
                <input id="edit_nomeCompleto" name="nomeCompleto" value={editForm.nomeCompleto} onChange={handleEditChange} required placeholder="Fulano da Silva" />
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="edit_email"><b>E-mail*</b></label>
                <input id="edit_email" name="email" type="email" value={editForm.email} onChange={handleEditChange} required placeholder="fulano@gmail.com" />
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="edit_telefoneCelular"><b>Telefone*</b></label>
                <input id="edit_telefoneCelular" name="telefoneCelular" value={editForm.telefoneCelular} onChange={handleEditChange} required placeholder="(45) 9 9988-7766" type="tel" />
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="edit_cpf"><b>CPF*</b></label>
                <input id="edit_cpf" name="cpf" type="text" pattern="[0-9]*" maxLength={11} value={editForm.cpf} onChange={e => { const onlyNums = e.target.value.replace(/\D/g, ""); setEditForm({ ...editForm, cpf: onlyNums }); }} placeholder="11122233355" required />
              </div>
              <hr className={modalStyles.separador} />
              <div className={modalStyles.formGroupFullWidth}>
                <label htmlFor="edit_endereco"><b>Endereço*</b></label>
                <input id="edit_endereco" name="endereco" value={editForm.endereco} onChange={handleEditChange} required placeholder="Rua da Água" />
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="edit_numero"><b>Número*</b></label>
                <input id="edit_numero" name="numero" type="number" value={editForm.numero} onChange={handleEditChange} required placeholder="2015" />
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="edit_complemento"><b>Complemento</b></label>
                <input id="edit_complemento" name="complemento" value={editForm.complemento} onChange={handleEditChange} placeholder="Ap 307" />
              </div>
              <div className={modalStyles.formGroupFullWidth}>
                <label htmlFor="edit_bairro"><b>Bairro*</b></label>
                <input id="edit_bairro" name="bairro" value={editForm.bairro} onChange={handleEditChange} required placeholder="Centro" />
              </div>
              <div className={modalStyles.formGroupFullWidth}>
                <label htmlFor="edit_pontoReferencia"><b>Ponto de referência</b></label>
                <input id="edit_pontoReferencia" name="pontoReferencia" value={editForm.pontoReferencia} onChange={handleEditChange} placeholder="Em frente ao parque" />
              </div>
              <div className={modalStyles.modalButtonGroup}>
                <button type="button" onClick={closeEditModal} style={{ background: '#aaa', color: '#fff' }}>Cancelar</button>
                <button type="submit" disabled={editLoading}>{editLoading ? "Salvando..." : "Salvar Alterações"}</button>
              </div>
              {editError && <div className={modalStyles.errorMessage}>{editError}</div>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 