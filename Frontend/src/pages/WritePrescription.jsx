import Sidebar from "../components/Sidebar"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

export default function WritePrescription() {
  const navigate = useNavigate();
  const [cookie, setCookie] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    patientName: "",
    age: "",
    gender: "",
    date: new Date().toISOString().split("T")[0],
    complaint: "",
    diagnosis: "",
    medicines: [{ name: "", instructions: "", duration: "" }],
    advice: "",
    followUp: "",
  })

  useEffect(() => {
    var storedCookie = Cookies.get("token")
    if (!storedCookie) { navigate("/loginselector") }
    setCookie(storedCookie);
    validateUser();
  })

  function validateUser() {
    if (cookie == "") return;
    fetch("http://localhost:3000/api/whoami", {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${cookie}` }
    })
      .then(res => res.json())
      .then(res => { if (res.role != "doctor") navigate("/loginselector"); })
      .catch(() => navigate("/loginselector"));
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleMedChange(index, field, value) {
    const updated = [...form.medicines]
    updated[index][field] = value
    setForm({ ...form, medicines: updated })
  }

  function addMedicine() {
    setForm({ ...form, medicines: [...form.medicines, { name: "", instructions: "", duration: "" }] })
  }

  function removeMedicine(index) {
    const updated = form.medicines.filter((_, i) => i !== index)
    setForm({ ...form, medicines: updated })
  }

  function handleSubmit() {
    // POST to /api/prescriptions when backend is ready
    console.log("Prescription submitted:", form)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm({
        patientName: "", age: "", gender: "", date: new Date().toISOString().split("T")[0],
        complaint: "", diagnosis: "",
        medicines: [{ name: "", instructions: "", duration: "" }],
        advice: "", followUp: "",
      })
    }, 2500)
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">

        <div className="dashboard-topbar">
          <div>
            <p className="dashboard-greeting">Fill in the details below</p>
            <h1 className="dashboard-title">📝 Write Prescription</h1>
          </div>
        </div>

        {submitted && (
          <div style={{ background: "#dcfce7", color: "#166534", padding: "14px 20px", borderRadius: "10px", fontWeight: "600", marginBottom: "8px" }}>
            ✅ Prescription saved successfully!
          </div>
        )}

        {/* Section 1 - Patient Details */}
        <div className="dashboard-section-card" style={{ marginBottom: "16px" }}>
          <h3 className="section-card-title" style={{ color: "#1e3a8a" }}>1. Patient Details</h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Patient Name *</label>
              <input style={inputStyle} name="patientName" placeholder="Enter patient name" value={form.patientName} onChange={handleChange} />
            </div>
            <div>
              <label style={labelStyle}>Date</label>
              <input style={inputStyle} type="date" name="date" value={form.date} onChange={handleChange} />
            </div>
            <div>
              <label style={labelStyle}>Age *</label>
              <input style={inputStyle} name="age" placeholder="Age" value={form.age} onChange={handleChange} />
            </div>
            <div>
              <label style={labelStyle}>Gender *</label>
              <select style={inputStyle} name="gender" value={form.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2 - Complaint & Diagnosis */}
        <div className="dashboard-section-card" style={{ marginBottom: "16px" }}>
          <h3 className="section-card-title" style={{ color: "#1e3a8a" }}>2. Complaint &amp; Diagnosis</h3>

          <label style={labelStyle}>Main Complaint *</label>
          <textarea style={{ ...inputStyle, height: "80px", resize: "vertical" }} name="complaint" placeholder="Describe the patient's main complaint..." value={form.complaint} onChange={handleChange} />

          <label style={{ ...labelStyle, marginTop: "12px" }}>Diagnosis *</label>
          <textarea style={{ ...inputStyle, height: "80px", resize: "vertical" }} name="diagnosis" placeholder="Enter diagnosis..." value={form.diagnosis} onChange={handleChange} />
        </div>

        {/* Section 3 - Medicines */}
        <div className="dashboard-section-card" style={{ marginBottom: "16px" }}>
          <h3 className="section-card-title" style={{ color: "#1e3a8a" }}>3. Medicines Prescribed</h3>

          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "12px" }}>
            <thead>
              <tr style={{ background: "#1e3a8a", color: "#fff" }}>
                <th style={th}>Sr.</th>
                <th style={th}>Medicine Name</th>
                <th style={th}>Instructions</th>
                <th style={th}>Duration</th>
                <th style={th}></th>
              </tr>
            </thead>
            <tbody>
              {form.medicines.map((med, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                  <td style={tdCenter}>{i + 1}</td>
                  <td style={tdPad}>
                    <input style={inlineInput} placeholder="e.g. Tab Paracetamol 500mg" value={med.name} onChange={e => handleMedChange(i, "name", e.target.value)} />
                  </td>
                  <td style={tdPad}>
                    <input style={inlineInput} placeholder="e.g. 1 tablet twice daily" value={med.instructions} onChange={e => handleMedChange(i, "instructions", e.target.value)} />
                  </td>
                  <td style={tdPad}>
                    <input style={{ ...inlineInput, width: "100px" }} placeholder="e.g. 5 days" value={med.duration} onChange={e => handleMedChange(i, "duration", e.target.value)} />
                  </td>
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

        {/* Section 4 - Advice & Follow Up */}
        <div className="dashboard-section-card" style={{ marginBottom: "16px" }}>
          <h3 className="section-card-title" style={{ color: "#1e3a8a" }}>4. Advice &amp; Follow-up</h3>

          <label style={labelStyle}>Advice</label>
          <textarea style={{ ...inputStyle, height: "70px", resize: "vertical" }} name="advice" placeholder="e.g. Drink warm fluids, avoid cold food..." value={form.advice} onChange={handleChange} />

          <label style={{ ...labelStyle, marginTop: "12px" }}>Follow-up</label>
          <input style={inputStyle} name="followUp" placeholder="e.g. Review after 5 days" value={form.followUp} onChange={handleChange} />
        </div>

        <button
          onClick={handleSubmit}
          style={{ padding: "12px 32px", background: "#1e3a8a", color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}
        >
          ✅ Save Prescription
        </button>

      </main>
    </div>
  )
}

const labelStyle = { display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }
const inputStyle = { width: "100%", padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", outline: "none", fontFamily: "inherit", background: "#fff", boxSizing: "border-box" }
const inlineInput = { width: "100%", padding: "7px 10px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px", outline: "none", fontFamily: "inherit" }
const th = { padding: "11px 14px", textAlign: "left", fontSize: "13px", fontWeight: "600" }
const tdPad = { padding: "8px 10px", borderBottom: "1px solid #f3f4f6" }
const tdCenter = { padding: "8px 10px", textAlign: "center", borderBottom: "1px solid #f3f4f6", fontSize: "13px" }
