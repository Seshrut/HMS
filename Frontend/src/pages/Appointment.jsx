import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Appointment() {
  const navigate = useNavigate();
  const [doctors, setDoctors]   = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date,     setDate]     = useState("");
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState(false);
  const [loading,  setLoading]  = useState(false);

  // Load doctor list on mount
  useEffect(() => {
    fetch("http://localhost:3000/api/auth/doctors")
      .then((r) => r.json())
      .then((rows) => { if (Array.isArray(rows)) setDoctors(rows); })
      .catch(() => {});
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!doctorId || !date) {
      setError("Please select a doctor and a date.");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      navigate("/loginselector");
      return;
    }

    setLoading(true);
    try {
      const res  = await fetch("http://localhost:3000/api/appointments", {
        method:  "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body:    JSON.stringify({ doctorId: parseInt(doctorId), appointmentDate: date }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || data.error || "Booking failed.");
        return;
      }

      setSuccess(true);
      setTimeout(() => navigate("/patient-dashboard"), 2000);
    } catch {
      setError("Cannot connect to server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard-layout">
      {/* Simple patient sidebar */}
      <div className="sidebar">
        <h2 style={{ color: "white", marginBottom: "8px" }}>🏥 MedCare</h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>Patient Portal</p>
        <div style={{ marginTop: "32px" }}>
          <div
            onClick={() => navigate("/patient-dashboard")}
            style={{ color: "rgba(255,255,255,0.8)", cursor: "pointer", padding: "10px 0", fontSize: "14px" }}
          >
            ← Back to Dashboard
          </div>
        </div>
      </div>

      <main className="dashboard-main">
        <div className="dashboard-topbar">
          <div>
            <p className="dashboard-greeting">Schedule with your preferred doctor</p>
            <h1 className="dashboard-title">📅 Book Appointment</h1>
          </div>
        </div>

        <div className="dashboard-section-card" style={{ maxWidth: "520px" }}>
          {success ? (
            <div style={{ textAlign: "center", padding: "24px" }}>
              <p style={{ fontSize: "24px", marginBottom: "8px" }}>✅</p>
              <p style={{ fontWeight: "600", color: "#166534", fontSize: "16px" }}>Appointment booked!</p>
              <p style={{ color: "#6b7280", fontSize: "14px" }}>Redirecting to dashboard…</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div style={{ background: "#fee2e2", color: "#dc2626", padding: "10px 14px", borderRadius: "8px", fontSize: "14px", marginBottom: "16px" }}>
                  {error}
                </div>
              )}

              <div className="form-group" style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontWeight: "600", fontSize: "13px", marginBottom: "6px" }}>
                  Select Doctor
                </label>
                <select
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="">-- Select a Doctor --</option>
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.username}{d.specialization ? ` — ${d.specialization}` : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontWeight: "600", fontSize: "13px", marginBottom: "6px" }}>
                  Select Date
                </label>
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <button type="submit" className="btn" disabled={loading}>
                {loading ? "Booking…" : "Book Appointment"}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}