"use client";

import { useEffect, useState } from "react";
import Navigation from "../components/navegation/navegation";
import MenuBar from "../components/menubar/menubar";
import UserCard from "../components/UserCard";

export default function UsuariosPage() {
  const [users, setUsers] = useState([]);

  //  Busca todos os usuários na API fake,  até consertar o back para a busca de usuários locais
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <>
      <Navigation />
      <div style={{ minHeight: "100vh", background: "#fff", marginLeft: 220 }}>
        <MenuBar />
        <main
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            minHeight: "80vh",
            padding: "20px",
          }}
        >
          <h2 style={{ color: "#0070f3", marginBottom: "20px" }}>Usuários</h2>

          {/* Renderiza todos os usuários que vieram da API */}
          {users.length > 0 ? (
            users.map((u) => <UserCard key={u.id} user={u} />)
          ) : (
            <p>Carregando usuários...</p>
          )}
        </main>
      </div>
    </>
  );
}
