import Sidebar from "../components/Sidebar"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

export default function DoctorAppointments() {
  const navigate = useNavigate();
  const [cookie, setCookie] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    var storedCookie = Cookies.get("token")
    if (!storedCookie) { navigate("/loginselector") }
    setCookie(storedCookie);
    if (storedCookie) {
      validateUser(storedCookie);
      getAppointments(storedCookie);
    }
  }, [])

  function validateUser(token) {
    fetch("http://localhost:3000/api/whoami", {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(res => { if (res.role != "doctor") navigate("/loginselector"); })
      .catch(() => navigate("/loginselector"));
  }

  function getAppointments(token) {
    fetch("http://localhost:3000/api/appointments/doctor", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(res => { if (Array.isArray(res)) setAppointments(res); })
  }

  function updateStatus(id, newStatus) {
    fetch(`http://localhost:3000/api/appointments/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${cookie}` },
      body: JSON.stringify({ status: newStatus })
    }).then(() => getAppointments(cookie))
  }

  const filtered = filter === "All" ? appointments : appointments.filter(a => a.status === filter)

  const display = filtered.length > 0 ? filtered : [
    { id: 1, patient_name: "Rahul Sharma",  appointment_date: "2026-04-07", status: "Pending" },
    { id: 2, patient_name: "Sneha Kapoor",  appointment_date: "2026-04-07", status: "Approved" },
    { id: 3, patient_name: "Mohan Rao",     appointment_date: "2026-04-08", status: "Completed" },
  ]

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">

        <div className="dashboard-topbar">
          <div>
            <p className="dashboard-greeting">Manage your schedule</p>
            <h1 className="dashboard-title">📅 My Appointments</h1>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
          {["All", "Pending", "Approved", "Completed"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "7px 18px", borderRadius: "20px",
              border: filter === f ? "none" : "1px solid #d1d5db",
              background: filter === f ? "#1e3a8a" : "#fff",
              color: filter === f ? "#fff" : "#374151",
              fontWeight: filter === f ? "600" : "400",
              cursor: "pointer", fontSize: "13px"
            }}>{f}</button>
          ))}
        </div>

        <div className="dashboard-section-card" style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#1e3a8a", color: "#fff" }}>
                <th style={th}>#</th>
                <th style={th}>Patient Name</th>
                <th style={th}>Date</th>
                <th style={th}>Status</th>
                <th style={th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {display.map((appt, i) => (
                <tr key={appt.id} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                  <td style={td}>{i + 1}</td>
                  <td style={{ ...td, fontWeight: "600" }}>{appt.patient_name}</td>
                  <td style={td}>{new Date(appt.appointment_date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                  <td style={td}>
                    <span style={{
                      padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600",
                      background: appt.status === "Pending" ? "#fef9c3" : appt.status === "Approved" ? "#dbeafe" : "#dcfce7",
                      color: appt.status === "Pending" ? "#854d0e" : appt.status === "Approved" ? "#1e40af" : "#166534"
                    }}>{appt.status}</span>
                  </td>
                  <td style={td}>
                    {appt.status === "Pending" && <button style={actionBtn("#dcfce7", "#166534")} onClick={() => updateStatus(appt.id, "Approved")}>Approve</button>}
                    {appt.status === "Approved" && <button style={actionBtn("#dbeafe", "#1e40af")} onClick={() => updateStatus(appt.id, "Completed")}>Mark Done</button>}
                    {appt.status === "Completed" && <span style={{ color: "#9ca3af", fontSize: "13px" }}>—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  )
}

const th = { padding: "12px 16px", textAlign: "left", fontSize: "13px", fontWeight: "600" }
const td = { padding: "13px 16px", fontSize: "13px", borderBottom: "1px solid #f3f4f6" }
const actionBtn = (bg, color) => ({ padding: "5px 14px", borderRadius: "6px", border: "none", background: bg, color: color, fontWeight: "600", fontSize: "12px", cursor: "pointer" })
