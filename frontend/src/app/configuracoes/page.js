"use client";
import React, { useState, useEffect } from 'react';
import Navigation from '../components/navegation/navegation';
import MenuBar from '../components/menubar/menubar';

export default function ConfiguracoesPage() {
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [mensagem, setMensagem] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simula carregamento dos dados (substitua por fetch real)
  useEffect(() => {
    // exemplo: buscar /api/user
    const fetchData = async () => {
      // simulação
      await new Promise((r) => setTimeout(r, 200));
      setNome('João Silva');
      setCargo('Voluntárioc');
      setLoading(false);
    };
    fetchData();
  }, []);

  function handleSave(e) {
    e.preventDefault();
    if (senha && senha !== confirmSenha) {
      setMensagem({ tipo: 'erro', texto: 'As senhas não conferem.' });
      return;
    }
    // TODO: chamar API para salvar alterações
    setMensagem({ tipo: 'sucesso', texto: 'Alterações salvas (simulação).' });
    setSenha('');
    setConfirmSenha('');
    setEditing(false);
  }

  function handleDelete() {
    const ok = confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.');
    if (!ok) return;
    // TODO: chamar API para excluir conta
    setMensagem({ tipo: 'aviso', texto: 'Conta excluída (simulação).' });
  }

  const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: 6,
    border: '1px solid #ccc',
    marginTop: 6,
    boxSizing: 'border-box'
  };

  const cardStyle = {
    width: '100%',
    maxWidth: 720,
    background: '#fff',
    borderRadius: 10,
    padding: 20,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    marginBottom: 20
  };

  const kb = { marginTop: 12 };

  return (
    <>
      <Navigation />
      <div style={{ minHeight: '100vh', background: '#fff', marginLeft: 220 }}>
        <MenuBar />
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: '80vh', paddingTop: 24 }}>
          <h1 style={{ marginBottom: 12 }}>Configurações</h1>

          <section style={cardStyle} aria-label="Configurações da conta">
            {loading ? (
              <div>Carregando...</div>
            ) : (
              <>
                {!editing ? (
                  <div style={{ width: '100%' }}>
                    <div>
                      <label style={{ fontWeight: 700 }}>Nome</label>
                      <div style={{ marginTop: 6 }}>{nome || '—'}</div>
                    </div>

                    <div style={kb}>
                      <label style={{ fontWeight: 700 }}>Cargo</label>
                      <div style={{ marginTop: 6, whiteSpace: 'pre-wrap' }}>{cargo || '—'}</div>
                    </div>

                    <div style={kb}>
                      <label style={{ fontWeight: 700 }}>Senha</label>
                      <div style={{ marginTop: 6 }}>••••••••</div>
                    </div>

                    <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                      <button
                        type="button"
                        onClick={() => setEditing(true)}
                        style={{
                          padding: '10px 16px',
                          background: '#1976d2',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 8,
                          cursor: 'pointer'
                        }}
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={handleDelete}
                        style={{
                          padding: '10px 16px',
                          background: '#d32f2f',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 8,
                          cursor: 'pointer',
                          marginLeft: 'auto'
                        }}
                      >
                        Excluir conta
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSave} style={{ width: '100%' }}>
                    <label htmlFor="nome">Nome</label>
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Seu nome"
                      style={inputStyle}
                      aria-label="Nome"
                    />

                    <label htmlFor="cargo" style={{ marginTop: 12 }}>Cargo</label>
                    <textarea
                      id="cargo"
                      name="cargo"
                      value={cargo}
                      onChange={(e) => setCargo(e.target.value)}
                      placeholder="Cargo / posição"
                      style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
                      aria-label="Cargo"
                    />

                    <label htmlFor="senha" style={{ marginTop: 12 }}>Nova senha</label>
                    <input
                      id="senha"
                      name="senha"
                      type="password"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      placeholder="Deixe em branco para manter a senha atual"
                      style={inputStyle}
                      aria-label="Nova senha"
                    />

                    <label htmlFor="confirmSenha" style={{ marginTop: 12 }}>Confirmar nova senha</label>
                    <input
                      id="confirmSenha"
                      name="confirmSenha"
                      type="password"
                      value={confirmSenha}
                      onChange={(e) => setConfirmSenha(e.target.value)}
                      placeholder="Repita a nova senha"
                      style={inputStyle}
                      aria-label="Confirmar senha"
                    />

                    {mensagem && (
                      <div
                        role="status"
                        style={{
                          marginTop: 12,
                          color: mensagem.tipo === 'erro' ? '#b00020' : mensagem.tipo === 'sucesso' ? '#0b6b0b' : '#555'
                        }}
                      >
                        {mensagem.texto}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                      <button
                        type="submit"
                        style={{
                          padding: '10px 16px',
                          background: '#1976d2',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 8,
                          cursor: 'pointer'
                        }}
                      >
                        Salvar alterações
                      </button>

                      <button
                        type="button"
                        onClick={() => { setEditing(false); setMensagem(null); setSenha(''); setConfirmSenha(''); }}
                        style={{
                          padding: '10px 16px',
                          background: '#777',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 8,
                          cursor: 'pointer',
                          marginLeft: 'auto'
                        }}
                      >
                        Cancelar
                      </button>

                      <button
                        type="button"
                        onClick={handleDelete}
                        style={{
                          padding: '10px 16px',
                          background: '#d32f2f',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 8,
                          cursor: 'pointer'
                        }}
                      >
                        Excluir conta
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </section>

          {/* conteúdo adicional */}
        </main>
      </div>
    </>
  );
}