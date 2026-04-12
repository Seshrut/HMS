import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import DashboardLayout from "../components/DashboardLayout";

const labelStyle = { display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" };
const inputStyle = { width: "100%", padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", outline: "none", fontFamily: "inherit", background: "#fff", boxSizing: "border-box" };
const inlineInput = { width: "100%", padding: "7px 10px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px", outline: "none", fontFamily: "inherit" };
const th = { padding: "11px 14px", textAlign: "left", fontSize: "13px", fontWeight: "600" };
const tdPad = { padding: "8px 10px", borderBottom: "1px solid #f3f4f6" };
const tdCenter = { padding: "8px 10px", textAlign: "center", borderBottom: "1px solid #f3f4f6", fontSize: "13px" };

export default function WritePrescription() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState("");

  const [form, setForm] = useState({
    patientName: "",
    age:         "",
    gender:      "",
    date:        new Date().toISOString().split("T")[0],
    complaint:   "",
    diagnosis:   "",
    medicines:   [{ name: "", instructions: "", duration: "" }],
    advice:      "",
    followUp:    "",
  });

  // Pre-fill date; appointmentId comes from URL param
  useEffect(() => {
    if (!appointmentId) {
      alert("No appointment selected. Please go to Appointments and click Write Rx.");
      navigate("/doctor-appointments");
    }
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleMedChange(index, field, value) {
    const updated = [...form.medicines];
    updated[index][field] = value;
    setForm({ ...form, medicines: updated });
  }

  function addMedicine() {
    setForm({ ...form, medicines: [...form.medicines, { name: "", instructions: "", duration: "" }] });
  }

  function removeMedicine(index) {
    setForm({ ...form, medicines: form.medicines.filter((_, i) => i !== index) });
  }

  async function handleSubmit() {
    setError("");
    if (!form.diagnosis.trim()) {
      setError("Diagnosis is required.");
      return;
    }

    const token = Cookies.get("token");
    try {
      const res = await fetch("http://localhost:3000/api/prescriptions", {
        method:  "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          appointmentId: parseInt(appointmentId),
          patientName:   form.patientName,
          complaint:     form.complaint,
          diagnosis:     form.diagnosis,
          medicines:     form.medicines,
          advice:        form.advice,
          followUp:      form.followUp,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to save prescription.");
        return;
      }

      setSubmitted(true);
      setTimeout(() => {
        navigate("/doctor-appointments");
      }, 2000);
    } catch {
      setError("Cannot connect to server. Is the backend running?");
    }
  }

  return (
    <DashboardLayout>
      <div className="dashboard-topbar">
        <div>
          <p className="dashboard-greeting">Appointment #{appointmentId}</p>
          <h1 className="dashboard-title">Write Prescription</h1>
        </div>
      </div>

      {submitted && (
        <div style={{ background: "#dcfce7", color: "#166534", padding: "14px 20px", borderRadius: "10px", fontWeight: "600", marginBottom: "12px" }}>
          ✅ Prescription saved! Redirecting to appointments…
        </div>
      )}
      {error && (
        <div style={{ background: "#fee2e2", color: "#dc2626", padding: "14px 20px", borderRadius: "10px", marginBottom: "12px" }}>
          {error}
        </div>
      )}

      {/* Patient Details */}
      <div className="dashboard-section-card" style={{ marginBottom: "16px" }}>
        <h3 className="section-card-title" style={{ color: "#1e3a8a" }}>1. Patient Details</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div><label style={labelStyle}>Patient Name</label><input style={inputStyle} name="patientName" placeholder="Enter patient name" value={form.patientName} onChange={handleChange} /></div>
          <div><label style={labelStyle}>Date</label><input style={inputStyle} type="date" name="date" value={form.date} onChange={handleChange} /></div>
          <div><label style={labelStyle}>Age</label><input style={inputStyle} name="age" placeholder="Age" value={form.age} onChange={handleChange} /></div>
          <div>
            <label style={labelStyle}>Gender</label>
            <select style={inputStyle} name="gender" value={form.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option>Male</option><option>Female</option><option>Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Complaint & Diagnosis */}
      <div className="dashboard-section-card" style={{ marginBottom: "16px" }}>
        <h3 className="section-card-title" style={{ color: "#1e3a8a" }}>2. Complaint &amp; Diagnosis</h3>
        <label style={labelStyle}>Main Complaint</label>
        <textarea style={{ ...inputStyle, height: "80px", resize: "vertical" }} name="complaint" placeholder="Describe the patient's complaint…" value={form.complaint} onChange={handleChange} />
        <label style={{ ...labelStyle, marginTop: "12px" }}>Diagnosis *</label>
        <textarea style={{ ...inputStyle, height: "80px", resize: "vertical" }} name="diagnosis" placeholder="Enter diagnosis…" value={form.diagnosis} onChange={handleChange} />
      </div>

      {/* Medicines */}
      <div className="dashboard-section-card" style={{ marginBottom: "16px" }}>
        <h3 className="section-card-title" style={{ color: "#1e3a8a" }}>3. Medicines Prescribed</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "12px" }}>
          <thead>
            <tr style={{ background: "#1e3a8a", color: "#fff" }}>
              <th style={th}>Sr.</th>
              <th style={th}>Medicine Name</th>
              <th style={th}>Instructions</th>
              <th style={th}>Duration</th>
              <th style={th} />
            </tr>
          </thead>
          <tbody>
            {form.medicines.map((med, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={tdCenter}>{i + 1}</td>
                <td style={tdPad}><input style={inlineInput} placeholder="e.g. Tab Paracetamol 500mg" value={med.name} onChange={(e) => handleMedChange(i, "name", e.target.value)} /></td>
                <td style={tdPad}><input style={inlineInput} placeholder="e.g. 1 tablet twice daily" value={med.instructions} onChange={(e) => handleMedChange(i, "instructions", e.target.value)} /></td>
                <td style={tdPad}><input style={{ ...inlineInput, width: "100px" }} placeholder="e.g. 5 days" value={med.duration} onChange={(e) => handleMedChange(i, "duration", e.target.value)} /></td>
                <td style={tdCenter}>
                  {form.medicines.length > 1 && (
                    <button onClick={() => removeMedicine(i)} style={{ background: "#fee2e2", color: "#b91c1c", border: "none", borderRadius: "6px", padding: "4px 10px", cursor: "pointer", fontSize: "13px" }}>✕</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addMedicine} style={{ padding: "8px 18px", background: "#eff6ff", color: "#1e40af", border: "1px solid #bfdbfe", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}>
          + Add Medicine
        </button>
      </div>

      {/* Advice & Follow-up */}
      <div className="dashboard-section-card" style={{ marginBottom: "16px" }}>
        <h3 className="section-card-title" style={{ color: "#1e3a8a" }}>4. Advice &amp; Follow-up</h3>
        <label style={labelStyle}>Advice</label>
        <textarea style={{ ...inputStyle, height: "70px", resize: "vertical" }} name="advice" placeholder="e.g. Drink warm fluids, avoid cold food…" value={form.advice} onChange={handleChange} />
        <label style={{ ...labelStyle, marginTop: "12px" }}>Follow-up</label>
        <input style={inputStyle} name="followUp" placeholder="e.g. Review after 5 days" value={form.followUp} onChange={handleChange} />
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <button onClick={handleSubmit} disabled={submitted} style={{ padding: "12px 32px", background: "#1e3a8a", color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>
          ✅ Save Prescription
        </button>
        <button onClick={() => navigate("/doctor-appointments")} style={{ padding: "12px 24px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: "10px", fontSize: "15px", cursor: "pointer" }}>
          Cancel
        </button>
      </div>
    </DashboardLayout>
  );
}
