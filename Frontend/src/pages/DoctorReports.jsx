import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

// Hardcoded reports — kept for presentation
const REPORTS = [
  {
    id: 1, patientName: "Ananya Singh", age: 20, gender: "Female", date: "01 April 2026",
    complaint:  ["Sore throat for 3 days", "Mild ear pain (right side)"],
    diagnosis:  ["Acute Pharyngitis", "Mild Otitis Media (Right Ear)"],
    treatment:  ["Tab Paracetamol: for pain/fever", "Antibiotic (Amoxicillin): 5 days", "Warm salt water gargles: 2×daily"],
    advice:     ["Drink warm fluids", "Avoid cold food/drinks", "Take proper rest"],
    followUp:   "Review after 5 days or earlier if symptoms worsen",
  },
  {
    id: 2, patientName: "Rahul Sharma", age: 34, gender: "Male", date: "07 April 2026",
    complaint:  ["Chest pain on exertion", "Shortness of breath"],
    diagnosis:  ["Mild Angina", "Hypertension Stage 1"],
    treatment:  ["Tab Aspirin 75mg: once daily", "Tab Amlodipine 5mg: once daily", "Lifestyle modifications"],
    advice:     ["Avoid heavy exercise", "Low salt diet", "Monitor BP daily"],
    followUp:   "Review after 2 weeks with ECG report",
  },
];

function Section({ title, items }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <p style={{ fontWeight: "700", color: "#1e3a8a", fontSize: "14px", marginBottom: "6px" }}>{title}</p>
      <ul style={{ margin: 0, paddingLeft: "20px" }}>
        {items.map((item, i) => (
          <li key={i} style={{ fontSize: "14px", color: "#374151", marginBottom: "3px" }}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function DoctorReports() {
  const [selected, setSelected] = useState(null);

  return (
    <DashboardLayout>
      <div className="dashboard-topbar">
        <div>
          <p className="dashboard-greeting">Medical records you have created</p>
          <h1 className="dashboard-title">Patient Reports</h1>
        </div>
      </div>

      {selected === null ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {REPORTS.map((r) => (
            <div key={r.id} className="dashboard-section-card"
              style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
              onClick={() => setSelected(r)}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#dde3f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
                  {r.gender === "Female" ? "F" : "M"}
                </div>
                <div>
                  <p style={{ fontWeight: "700", fontSize: "15px", margin: 0, color: "#111827" }}>{r.patientName}</p>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>{r.age} yrs / {r.gender}</p>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "13px", color: "#374151", margin: 0 }}>📅 {r.date}</p>
                <p style={{ fontSize: "12px", color: "#1e3a8a", fontWeight: "600", margin: "2px 0 0" }}>{r.diagnosis[0]}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="dashboard-section-card">
          <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "14px", borderBottom: "1px solid #e5e7eb", marginBottom: "16px" }}>
            <div>
              <p style={{ fontWeight: "700", fontSize: "17px", margin: 0 }}>{selected.patientName}</p>
              <p style={{ fontSize: "13px", color: "#6b7280", margin: "3px 0 0" }}>{selected.age} / {selected.gender}</p>
            </div>
            <p style={{ fontSize: "13px", color: "#374151", margin: 0 }}>📅 {selected.date}</p>
          </div>
          <Section title="Main Complaint"       items={selected.complaint}  />
          <Section title="Diagnosis"            items={selected.diagnosis}  />
          <Section title="Treatment Prescribed" items={selected.treatment}  />
          <Section title="Advice"               items={selected.advice}     />
          <div style={{ marginTop: "16px" }}>
            <p style={{ fontWeight: "700", color: "#1e3a8a", fontSize: "14px", marginBottom: "6px" }}>Follow-up</p>
            <p style={{ fontSize: "14px", color: "#374151", margin: 0 }}>{selected.followUp}</p>
          </div>
          <button onClick={() => setSelected(null)} style={{ marginTop: "24px", padding: "9px 22px", background: "#1e3a8a", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}>
            ← Back to Reports
          </button>
        </div>
      )}
    </DashboardLayout>
  );
}
