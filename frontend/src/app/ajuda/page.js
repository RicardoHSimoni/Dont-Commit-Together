"use client";
import { useState } from "react";
import Navigation from '../components/navegation/navegation';
import MenuBar from '../components/menubar/menubar';

const duvidas = [
  {
    pergunta: "Onde posso realizar cadastros?",
    resposta: "Você pode realizar cadastros acessando o menu principal e selecionando a opção de cadastro desejada."
  },
  {
    pergunta: "Errei um dado e o cadastrei no sistema, o que fazer?",
    resposta: "Procure a opção de edição ou exclusão do cadastro na tela correspondente. Caso não encontre, entre em contato com o suporte."
  }
];

export default function AjudaPage() {
  const [abertas, setAbertas] = useState(Array(duvidas.length).fill(false));

  const toggleDuvida = (idx) => {
    setAbertas((prev) =>
      prev.map((open, i) => (i === idx ? !open : open))
    );
  };

  return (
    <>
      <Navigation />
      <div style={{ minHeight: '100vh', background: '#fff', marginLeft: 220 }}>
        <MenuBar />
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
          <h1 style={{ marginBottom: 32, textAlign: 'center', width: '100%' }}>Qual a sua dúvida?</h1>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', maxWidth: 500 }}>
            <h2 style={{ marginBottom: 12, textAlign: 'left' }}>Dúvidas frequentes</h2>
            <ul style={{ textAlign: 'left', marginBottom: 32, width: '100%', padding: 0, listStyle: 'none' }}>
              {duvidas.map((duvida, idx) => (
                <li key={duvida.pergunta} style={{ marginBottom: 16, borderBottom: '1px solid #eee', paddingBottom: 8 }}>
                  <button
                    onClick={() => toggleDuvida(idx)}
                    style={{
                      background: 'none',
                      border: 'none',
                      width: '100%',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: 16,
                      cursor: 'pointer',
                      padding: 0,
                      outline: 'none'
                    }}
                  >
                    <span style={{ flex: 1, color: '#222' }}>{duvida.pergunta}</span>
                    <span style={{ marginLeft: 8, transition: 'transform 0.2s', transform: abertas[idx] ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      ▼
                    </span>
                  </button>
                  {abertas[idx] && (
                    <div style={{ marginTop: 8, color: '#444', fontSize: 15 }}>
                      {duvida.resposta}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </>
  );
}