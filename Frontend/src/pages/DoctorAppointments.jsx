import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import DashboardLayout from "../components/DashboardLayout";

const th = { padding: "12px 16px", textAlign: "left", fontSize: "13px", fontWeight: "600" };
const td = { padding: "13px 16px", fontSize: "13px", borderBottom: "1px solid #f3f4f6" };
const actionBtn = (bg, color) => ({
  padding: "5px 14px", borderRadius: "6px", border: "none",
  background: bg, color, fontWeight: "600", fontSize: "12px", cursor: "pointer",
  marginRight: "6px",
});

export default function DoctorAppointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [filter,       setFilter]       = useState("All");

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) loadAppointments(token);
  }, []);

  function loadAppointments(token) {
    fetch("http://localhost:3000/api/appointments/doctor", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((rows) => { if (Array.isArray(rows)) setAppointments(rows); })
      .catch(() => {});
  }

  function updateStatus(id, newStatus) {
    const token = Cookies.get("token");
    fetch(`http://localhost:3000/api/appointments/${id}/status`, {
      method:  "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body:    JSON.stringify({ status: newStatus }),
    }).then(() => loadAppointments(token));
  }

  const filtered =
    filter === "All"
      ? appointments
      : appointments.filter((a) => a.status.toLowerCase() === filter.toLowerCase());

  return (
    <DashboardLayout>
      <div className="dashboard-topbar">
        <div>
          <p className="dashboard-greeting">Manage your schedule</p>
          <h1 className="dashboard-title">Appointments</h1>
        </div>
      </div>

      {/* Filter pills */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
        {["All", "pending", "approved", "completed", "cancelled"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "7px 18px", borderRadius: "20px", fontSize: "13px",
            border:     filter === f ? "none" : "1px solid #d1d5db",
            background: filter === f ? "#1e3a8a" : "#fff",
            color:      filter === f ? "#fff"    : "#374151",
            fontWeight: filter === f ? "600"     : "400",
            cursor: "pointer", textTransform: "capitalize",
          }}>
            {f}
          </button>
        ))}
      </div>

      <div className="dashboard-section-card" style={{ padding: 0, overflow: "hidden" }}>
        {filtered.length === 0 ? (
          <p style={{ padding: "30px", textAlign: "center", color: "#9ca3af" }}>
            No appointments found.
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#1e3a8a", color: "#fff" }}>
                <th style={th}>#</th>
                <th style={th}>Patient</th>
                <th style={th}>Date</th>
                <th style={th}>Status</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((appt, i) => (
                <tr key={appt.id} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                  <td style={td}>{i + 1}</td>
                  <td style={{ ...td, fontWeight: "600" }}>{appt.patient_name}</td>
                  <td style={td}>
                    {new Date(appt.appointment_date).toLocaleDateString("en-IN", {
                      day: "2-digit", month: "short", year: "numeric",
                    })}
                  </td>
                  <td style={td}>
                    <span style={{
                      padding: "4px 12px", borderRadius: "20px",
                      fontSize: "12px", fontWeight: "600",
                      background:
                        appt.status === "pending"   ? "#fef9c3" :
                        appt.status === "approved"  ? "#dbeafe" :
                        appt.status === "completed" ? "#dcfce7" : "#fee2e2",
                      color:
                        appt.status === "pending"   ? "#854d0e" :
                        appt.status === "approved"  ? "#1e40af" :
                        appt.status === "completed" ? "#166534" : "#b91c1c",
                    }}>
                      {appt.status}
                    </span>
                  </td>
                  <td style={td}>
                    {appt.status === "pending" && (
                      <button style={actionBtn("#dbeafe", "#1e40af")}
                        onClick={() => updateStatus(appt.id, "approved")}>
                        Approve
                      </button>
                    )}
                    {appt.status === "approved" && (
                      <button style={actionBtn("#dcfce7", "#166534")}
                        onClick={() => navigate(`/write-prescription/${appt.id}`)}>
                        Write Rx
                      </button>
                    )}
                    {appt.status === "completed" && (
                      <span style={{ color: "#9ca3af", fontSize: "13px" }}>Done</span>
                    )}
                    {appt.status === "cancelled" && (
                      <span style={{ color: "#9ca3af", fontSize: "13px" }}>Cancelled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}
