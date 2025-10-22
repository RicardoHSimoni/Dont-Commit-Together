"use client";
import Navigation from "../components/navegation/navegation";
import MenuBar from "../components/menubar/menubar";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    people: 0,
    donations: 0,
    receivers: 0,
    items: 0,
    volunteers: 0,
    givers: 0,
  });

  const [recentActions, setRecentActions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const base = "http://localhost:8080";

        const [
          peopleRes,
          giversRes,
          donationsRes,
          receiversRes,
          volunteersRes,
          itemsRes,
        ] = await Promise.all([
          fetch(`${base}/api/people`),
          fetch(`${base}/api/givers`),
          fetch(`${base}/api/donations`),
          fetch(`${base}/api/receivers`),
          fetch(`${base}/api/voluntaries`),
          fetch(`${base}/api/items`),
        ]);

        const [
          people,
          givers,
          donations,
          receivers,
          volunteers,
          items,
        ] = await Promise.all([
          peopleRes.json(),
          giversRes.json(),
          donationsRes.json(),
          receiversRes.json(),
          volunteersRes.json(),
          itemsRes.json(),
        ]);

        setStats({
          people: people.length,
          donations: donations.length,
          receivers: receivers.length,
          items: items.length,
          volunteers: volunteers.length,
          givers: givers.length,
        });

        setRecentActions([
          { user: givers[0]?.name || "Doador", action: "Nova doação registrada", date: "21/10/2025" },
          { user: receivers[0]?.name || "Receptor", action: "Recebeu um item", date: "20/10/2025" },
          { user: volunteers[0]?.name || "Voluntário", action: "Cadastrado no sistema", date: "19/10/2025" },
        ]);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const data = [
    { mes: "Jul", doacoes: 15 },
    { mes: "Ago", doacoes: 25 },
    { mes: "Set", doacoes: 40 },
    { mes: "Out", doacoes: stats.donations },
  ];

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
            padding: "40px",
          }}
        >
          <h2 style={{ color: "#0070f3", marginBottom: "30px" }}>Dashboard</h2>

          {/* 🔹 Cards com dados reais */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: "40px",
            }}
          >
            <Card title="Pessoas" value={stats.people} color="#0070f3" />
            <Card title="Doações" value={stats.donations} color="#10b981" />
            <Card title="Receptores" value={stats.receivers} color="#f59e0b" />
            <Card title="Voluntários" value={stats.volunteers} color="#ec4899" />
            <Card title="Doadores" value={stats.givers} color="#3b82f6" />
            <Card title="Itens em Estoque" value={stats.items} color="#6366f1" />
          </div>

          {/* 🔹 Gráfico de Doações */}
          <div
            style={{
              background: "#f9fafb",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              width: "100%",
              maxWidth: "800px",
              marginBottom: "40px",
            }}
          >
            <h3 style={{ marginBottom: "10px", color: "#374151" }}>
              Gráfico de Doações (últimos meses)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="doacoes" fill="#0070f3" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 🔹 Últimas Ações */}
          <div
            style={{
              background: "#f9fafb",
              borderRadius: "12px",
              padding: "20px",
              width: "100%",
              maxWidth: "800px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ marginBottom: "15px", color: "#374151" }}>
              Últimas Ações
            </h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "2px solid #e5e7eb" }}>
                  <th style={{ padding: "10px" }}>Usuário</th>
                  <th style={{ padding: "10px" }}>Ação</th>
                  <th style={{ padding: "10px" }}>Data</th>
                </tr>
              </thead>
              <tbody>
                {recentActions.map((a, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "10px" }}>{a.user}</td>
                    <td style={{ padding: "10px" }}>{a.action}</td>
                    <td style={{ padding: "10px" }}>{a.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}

function Card({ title, value, color }) {
  return (
    <div
      style={{
        background: color,
        color: "#fff",
        borderRadius: "12px",
        padding: "20px 30px",
        minWidth: "200px",
        textAlign: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
    >
      <h3>{title}</h3>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}
