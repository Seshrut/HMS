import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import DashboardLayout from "../components/DashboardLayout";

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [username,   setUsername]   = useState("Doctor");
  const [stats,      setStats]      = useState({ todayAppointments: "--", patients: "--", prescriptions: "--", pendingReports: "--" });
  const [todayAppts, setTodayAppts] = useState([]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;

    // Decode username from JWT — no extra request
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUsername(payload.username);
    } catch {}

    const headers = { Authorization: `Bearer ${token}` };

    // Real stats
    fetch("http://localhost:3000/api/dashboard/doctor", { headers })
      .then((r) => r.json())
      .then((d) => { if (d && !d.error) setStats(d); })
      .catch(() => {});

    // Today's appointments
    fetch("http://localhost:3000/api/appointments/doctor", { headers })
      .then((r) => r.json())
      .then((rows) => {
        if (!Array.isArray(rows)) return;
        const today = new Date().toISOString().split("T")[0];
        setTodayAppts(rows.filter((a) => a.appointment_date?.startsWith(today)));
      })
      .catch(() => {});
  }, []);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const statCards = [
    { label: "Today's Appointments", val: stats.todayAppointments, color: "blue"   },
    { label: "Total Patients",        val: stats.patients,          color: "green"  },
    { label: "Prescriptions Written", val: stats.prescriptions,     color: "purple" },
    { label: "Pending Appointments",  val: stats.pendingReports,    color: "yellow" },
  ];

  return (
    <DashboardLayout>
      {/* Top bar */}
      <div className="dashboard-topbar">
        <div>
          <p className="dashboard-greeting">Welcome back, Dr. {username}</p>
          <h1 className="dashboard-title">Dashboard</h1>
        </div>
        <div className="dashboard-date">{today}</div>
      </div>

      {/* Stat cards */}
      <div className="stats-grid">
        {statCards.map((s) => (
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div className="stat-card-value">{s.val}</div>
            <div className="stat-card-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Lower section */}
      <div className="dashboard-lower">
        {/* Today's appointments list */}
        <div className="dashboard-section-card">
          <h3 className="section-card-title">Today's Appointments</h3>

          {todayAppts.length === 0 ? (
            <p style={{ color: "#9ca3af", textAlign: "center", padding: "24px 0" }}>
              No appointments scheduled for today.
            </p>
          ) : (
            todayAppts.map((appt) => (
              <div key={appt.id} className="appointment-item">
                <div className="appt-avatar" style={{ width: 36, height: 36, borderRadius: "50%", background: "#e0e7ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#3730a3", flexShrink: 0 }}>
                  {(appt.patient_name || "?").slice(0, 2).toUpperCase()}
                </div>
                <div className="appt-info">
                  <div className="appt-name">{appt.patient_name}</div>
                  <div className="appt-time">
                    {new Date(appt.appointment_date).toLocaleDateString("en-IN", {
                      day: "2-digit", month: "short", year: "numeric",
                    })}
                  </div>
                </div>
                <span
                  className="appt-badge"
                  style={{
                    background:
                      appt.status === "pending"   ? "#fef3c7" :
                      appt.status === "approved"  ? "#dbeafe" :
                      appt.status === "completed" ? "#d1fae5" : "#fee2e2",
                    color:
                      appt.status === "pending"   ? "#92400e" :
                      appt.status === "approved"  ? "#1e40af" :
                      appt.status === "completed" ? "#065f46" : "#b91c1c",
                  }}
                >
                  {appt.status}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Quick actions */}
        <div className="dashboard-section-card">
          <h3 className="section-card-title">Quick Actions</h3>
          <div className="quick-action-grid">
            {[
              { label: "View Appointments", path: "/doctor-appointments" },
              { label: "My Patients",       path: "/doctor-patients"     },
              { label: "Patient Reports",   path: "/doctor-reports"      },
            ].map((btn) => (
              <button
                key={btn.path}
                className="quick-action-btn"
                onClick={() => navigate(btn.path)}
              >
                <div className="qa-label">{btn.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}