"use client";
import MenuBar from '../components/menubar/menubar';
import Navigation from '../components/navegation/navegation';
import { mockEstoque as mockEstoqueOrig } from '../../mocks/mockEstoque';
import styles from './estoque.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EstoquePage() {
  const [mockEstoque, setMockEstoque] = useState(mockEstoqueOrig);
  const [busca, setBusca] = useState("");
  const [tamanhoFiltro, setTamanhoFiltro] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [novoProduto, setNovoProduto] = useState({ nome: '', categoria: '', tamanho: '', quantidade: '' });
  const [editId, setEditId] = useState(null);
  const [editProduto, setEditProduto] = useState({ nome: '', categoria: '', tamanho: '', quantidade: '' });
  const router = useRouter();
  const hasNotification = false;

  function handleAddProduto(e) {
    e.preventDefault();
    const novo = {
      id: mockEstoque.length ? Math.max(...mockEstoque.map(i => i.id)) + 1 : 1,
      ...novoProduto,
      quantidade: Number(novoProduto.quantidade)
    };
    setMockEstoque([...mockEstoque, novo]);
    setNovoProduto({ nome: '', categoria: '', tamanho: '', quantidade: '' });
    setShowAddModal(false);
  }

  function handleDeleteProduto() {
    setMockEstoque(mockEstoque.filter(item => item.id !== itemToDelete.id));
    setShowDeleteModal(false);
    setItemToDelete(null);
  }

  function openDeleteModal(item) {
    setItemToDelete(item);
    setShowDeleteModal(true);
  }

  function startEditProduto(item) {
    setEditId(item.id);
    setEditProduto({
      nome: item.nome,
      categoria: item.categoria,
      tamanho: item.tamanho,
      quantidade: item.quantidade
    });
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditProduto(prev => ({ ...prev, [name]: name === 'quantidade' ? Number(value) : value }));
  }

  function saveEditProduto(id) {
    setMockEstoque(mockEstoque.map(item =>
      item.id === id ? { ...item, ...editProduto } : item
    ));
    setEditId(null);
    setEditProduto({ nome: '', categoria: '', tamanho: '', quantidade: '' });
  }

  function cancelEditProduto() {
    setEditId(null);
    setEditProduto({ nome: '', categoria: '', tamanho: '', quantidade: '' });
  }

  function handleEditProduto(item) {
    router.push(`/estoque/editar/${item.id}`);
  }

  return (
    <>
      <Navigation />
      <div className={styles.container}>
        <MenuBar hasNotification={hasNotification} />
        <main className={styles.main}>
          <h1 className={styles.titulo}>Controle de Estoque</h1>
          {/* Barra de busca e filtro*/}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <input
                className={styles.formInput}
                style={{ maxWidth: 300 }}
                type="text"
                placeholder="Buscar por nome..."
                value={busca}
                onChange={e => setBusca(e.target.value)}
              />
              <button className={`${styles.btn} ${styles.btnAdicionar}`} onClick={() => setShowAddModal(true)}>
                + Adicionar Produto
              </button>
            </div>
            {/* Botões de filtro*/}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontWeight: 500 }}>Filtrar por tamanho:</span>
              <button
                className={styles.btn}
                style={{ background: tamanhoFiltro === '' ? '#d1d5db' : '' }}
                onClick={() => setTamanhoFiltro("")}
                type="button"
              >
                Todos
              </button>
              {[...new Set(mockEstoque.map(item => item.tamanho))].filter(Boolean).map(tam => (
                <button
                  key={tam}
                  className={styles.btn}
                  style={{ background: tamanhoFiltro === tam ? '#d1d5db' : '' }}
                  onClick={() => setTamanhoFiltro(tam)}
                  type="button"
                >
                  {tam}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontWeight: 500 }}>Filtrar por categoria:</span>
              <button
                className={styles.btn}
                style={{ background: categoriaFiltro === '' ? '#d1d5db' : '' }}
                onClick={() => setCategoriaFiltro("")}
                type="button"
              >
                Todos
              </button>
              {[...new Set(mockEstoque.map(item => item.categoria))].filter(Boolean).map(categoria => (
                <button
                  key={categoria}
                  className={styles.btn}
                  style={{ background: categoriaFiltro === categoria ? '#d1d5db' : '' }}
                  onClick={() => setCategoriaFiltro(categoria)}
                  type="button"
                >
                  {categoria}
                </button>
              ))}
            </div>
          </div>
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Tamanho</th>
                <th>Quantidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {mockEstoque
                .filter(item => item.nome.toLowerCase().includes(busca.toLowerCase()))
                .filter(item => !tamanhoFiltro || item.tamanho === tamanhoFiltro)
                .filter(item => !categoriaFiltro || item.categoria === categoriaFiltro)
                .map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    {editId === item.id ? (
                      <>
                        <td><input className={styles.formInput} name="nome" value={editProduto.nome} onChange={handleEditChange} /></td>
                        <td><input className={styles.formInput} name="categoria" value={editProduto.categoria} onChange={handleEditChange} /></td>
                        <td><input className={styles.formInput} name="tamanho" value={editProduto.tamanho} onChange={handleEditChange} /></td>
                        <td><input className={styles.formInput} name="quantidade" type="number" min={1} value={editProduto.quantidade} onChange={handleEditChange} /></td>
                        <td>
                          <button className={`${styles.btn} ${styles.btnAdicionar}`} onClick={() => saveEditProduto(item.id)}>Salvar</button>
                          <button className={`${styles.btn} ${styles.btnExcluir}`} onClick={cancelEditProduto}>Cancelar</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{item.nome}</td>
                        <td>{item.categoria}</td>
                        <td>{item.tamanho}</td>
                        <td>{item.quantidade}</td>
                        <td>
                          <button className={`${styles.btn} ${styles.btnEditar}`} onClick={() => startEditProduto(item)}>
                            Editar
                          </button>
                          <button className={`${styles.btn} ${styles.btnExcluir}`} onClick={() => openDeleteModal(item)}>
                            Excluir
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
          {/* Modal Adicionar */}
          {showAddModal && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <h2 className={styles.titulo} style={{ fontSize: '1.3rem', marginBottom: 16 }}>Adicionar Produto</h2>
                <form className={styles.formulario} onSubmit={handleAddProduto}>
                  <label className={styles.formLabel}>Nome
                    <input className={styles.formInput} required value={novoProduto.nome} onChange={e => setNovoProduto({ ...novoProduto, nome: e.target.value })} />
                  </label>
                  <label className={styles.formLabel}>Categoria
                    <input className={styles.formInput} required value={novoProduto.categoria} onChange={e => setNovoProduto({ ...novoProduto, categoria: e.target.value })} />
                  </label>
                  <label className={styles.formLabel}>Tamanho
                    <input className={styles.formInput} required value={novoProduto.tamanho} onChange={e => setNovoProduto({ ...novoProduto, tamanho: e.target.value })} />
                  </label>
                  <label className={styles.formLabel}>Quantidade
                    <input className={styles.formInput} required type="number" min={1} value={novoProduto.quantidade} onChange={e => setNovoProduto({ ...novoProduto, quantidade: e.target.value })} />
                  </label>
                  <div className={styles.modalBotoes}>
                    <button type="button" className={`${styles.btn} ${styles.btnExcluir}`} onClick={() => setShowAddModal(false)}>Cancelar</button>
                    <button type="submit" className={`${styles.btn} ${styles.btnAdicionar}`}>Adicionar</button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {/* Modal Excluir */}
          {showDeleteModal && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <h2 className={styles.titulo} style={{ fontSize: '1.3rem', marginBottom: 16 }}>Confirmar Exclusão</h2>
                <p>Tem certeza que deseja excluir o produto <b>{itemToDelete?.nome}</b>?</p>
                <div className={styles.modalBotoes}>
                  <button className={`${styles.btn} ${styles.btnExcluir}`} onClick={() => setShowDeleteModal(false)}>Não</button>
                  <button className={`${styles.btn} ${styles.btnAdicionar}`} onClick={handleDeleteProduto}>Sim</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}