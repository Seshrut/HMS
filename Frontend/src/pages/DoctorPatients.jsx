import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import DashboardLayout from "../components/DashboardLayout";

export default function DoctorPatients() {
  const [patients, setPatients] = useState([]);
  const [search,   setSearch]   = useState("");
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;

    fetch("http://localhost:3000/api/appointments/doctor-patients", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((rows) => {
        if (Array.isArray(rows)) setPatients(rows);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="dashboard-topbar">
        <div>
          <p className="dashboard-greeting">People under your care</p>
          <h1 className="dashboard-title">My Patients</h1>
        </div>
        <div style={{ fontSize: "13px", color: "#6b7280", background: "white", padding: "8px 16px", borderRadius: "8px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          {patients.length} patient{patients.length !== 1 ? "s" : ""}
        </div>
      </div>

      <input
        type="text"
        placeholder="Search patient by name…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%", maxWidth: "340px", padding: "10px 16px",
          borderRadius: "8px", border: "1px solid #d1d5db",
          fontSize: "14px", outline: "none", background: "#fff",
          marginBottom: "20px", display: "block",
        }}
      />

      {loading ? (
        <p style={{ color: "#9ca3af", padding: "32px 0" }}>Loading patients…</p>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 0", color: "#9ca3af" }}>
          {search ? "No patients match your search." : "No patients have booked with you yet."}
        </div>
      ) : (
        <div className="dashboard-section-card" style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#1e3a8a", color: "#fff" }}>
                {["#", "Patient", "Last Appointment", "Status"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "13px", fontWeight: "600" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr
                  key={p.id}
                  style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb", transition: "background 0.12s" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#eff6ff"}
                  onMouseLeave={(e) => e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#f9fafb"}
                >
                  <td style={{ padding: "13px 16px", fontSize: "13px", color: "#9ca3af", width: "40px" }}>{i + 1}</td>
                  <td style={{ padding: "13px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{
                        width: "36px", height: "36px", borderRadius: "50%",
                        background: "#dbeafe", display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: "12px", fontWeight: "700",
                        color: "#1d4ed8", flexShrink: 0,
                      }}>
                        {p.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span style={{ fontWeight: "600", fontSize: "14px", color: "#111827" }}>{p.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "13px 16px", fontSize: "13px", color: "#6b7280" }}>
                    {new Date(p.last_visit).toLocaleDateString("en-IN", {
                      day: "2-digit", month: "short", year: "numeric",
                    })}
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{
                      padding: "4px 12px", borderRadius: "20px",
                      fontSize: "12px", fontWeight: "600",
                      background:
                        p.last_status === "completed" ? "#dcfce7" :
                        p.last_status === "approved"  ? "#dbeafe" :
                        p.last_status === "cancelled" ? "#fee2e2" : "#fef9c3",
                      color:
                        p.last_status === "completed" ? "#166534" :
                        p.last_status === "approved"  ? "#1e40af" :
                        p.last_status === "cancelled" ? "#b91c1c" : "#854d0e",
                    }}>
                      {p.last_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}
