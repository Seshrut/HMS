import Sidebar from "../components/Sidebar"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

export default function DoctorPatients() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    var storedCookie = Cookies.get("token")
    if (!storedCookie) { navigate("/loginselector") }
    validateUser(storedCookie);
  })

  function validateUser(token) {
    fetch("http://localhost:3000/api/whoami", {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(res => { if (res.role != "doctor") navigate("/loginselector"); })
      .catch(() => navigate("/loginselector"));
  }

  const patients = [
    { id: 1, name: "Rahul Sharma",  age: 34, gender: "Male",   lastVisit: "07 Apr 2026", condition: "General Checkup" },
    { id: 2, name: "Sneha Kapoor",  age: 28, gender: "Female", lastVisit: "07 Apr 2026", condition: "Consultation" },
    { id: 3, name: "Mohan Rao",     age: 52, gender: "Male",   lastVisit: "06 Apr 2026", condition: "Cardiology" },
    { id: 4, name: "Ananya Singh",  age: 20, gender: "Female", lastVisit: "01 Apr 2026", condition: "ENT" },
    { id: 5, name: "Vikram Patel",  age: 45, gender: "Male",   lastVisit: "29 Mar 2026", condition: "Orthopedic" },
    { id: 6, name: "Deepa Nair",    age: 38, gender: "Female", lastVisit: "28 Mar 2026", condition: "Radiology" },
  ]

  const filtered = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">

        <div className="dashboard-topbar">
          <div>
            <p className="dashboard-greeting">People under your care</p>
            <h1 className="dashboard-title">👨‍⚕️ My Patients</h1>
          </div>
        </div>

        <input
          type="text"
          placeholder="🔍  Search patient by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", maxWidth: "380px", padding: "10px 16px", borderRadius: "10px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none", background: "#fff", marginBottom: "8px" }}
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
          {filtered.map(p => (
            <div key={p.id} className="dashboard-section-card" style={{ padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
                <div style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#dde3f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>
                  {p.gender === "Female" ? "👩" : "👨"}
                </div>
                <div>
                  <p style={{ fontWeight: "700", fontSize: "15px", margin: 0, color: "#111827" }}>{p.name}</p>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>{p.age} yrs / {p.gender}</p>
                </div>
              </div>
              <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#6b7280" }}>Last Visit</span>
                  <span style={{ fontWeight: "600", color: "#111827" }}>{p.lastVisit}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#6b7280" }}>Condition</span>
                  <span style={{ fontWeight: "600", color: "#1e3a8a" }}>{p.condition}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ color: "#9ca3af", textAlign: "center", marginTop: "40px" }}>No patients found.</p>
        )}

      </main>
    </div>
  )
}
