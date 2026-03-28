import Sidebar from "../components/Sidebar"
import { useState } from "react"
import { useEffect } from "react";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import AppointmentItem from "../components/Appointment";

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [todayAppointments, setTodayAppointments] = useState("--");
  const [patients, setPatients] = useState("--");
  const [Prescriptions, setPrescriptions] = useState("--");
  const [PendingReports, setPendingReports] = useState("--");
  const [cookie, setCookie] = useState("");
  const [username, setUsername] = useState("")
  useEffect(() => {
    var storedCookie = Cookies.get("token")
    if (!storedCookie) { navigate("/loginselector") }
    setCookie(storedCookie);
    validateUser();
    getStats();
  })

  function validateUser() {
    fetch("http://localhost:3000/api/whoami", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.role != "doctor") navigate("/loginselector");
        setUsername(res.username);
      })
      .catch(navigate("/loginselector"));
  }
  function getStats() {
    fetch("http://localhost:3000/api/dashboard/doctor", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
      }
    })
      .then(res => res.json())
      .then((res) => {
        setTodayAppointments(res.todayAppointments);
        setPatients(res.patients);
        setPrescriptions(res.prescriptions);
        setPendingReports(res.pendingReports);
      })
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">

        {/* Top Bar */}
        <div className="dashboard-topbar">
          <div>
            <p className="dashboard-greeting">Welcome {username} 👨‍⚕️</p>
            <h1 className="dashboard-title">Doctor Dashboard</h1>
          </div>
          <span className="dashboard-date">📅 {today}</span>
        </div>

        {/* Doctor Stats */}
        <div className="stats-grid">

          <div className="stat-card blue">
            <div className="stat-card-icon">📅</div>
            <div className="stat-card-value">{todayAppointments}</div>
            <div className="stat-card-label">Today's Appointments</div>
          </div>

          <div className="stat-card green">
            <div className="stat-card-icon">👨‍⚕️</div>
            <div className="stat-card-value">{patients}</div>
            <div className="stat-card-label">Total Patients</div>
          </div>

          <div className="stat-card purple">
            <div className="stat-card-icon">💊</div>
            <div className="stat-card-value">{Prescriptions}</div>
            <div className="stat-card-label">Prescriptions</div>
          </div>

          <div className="stat-card yellow">
            <div className="stat-card-icon">📄</div>
            <div className="stat-card-value">{PendingReports}</div>
            <div className="stat-card-label">Reports Pending</div>
          </div>

        </div>

        {/* Doctor Appointment List */}
        <div className="dashboard-section-card">

          <h3 className="section-card-title">Today's Appointments</h3>
          <AppointmentItem name="Rahul Sharma" time="10:00 AM — General Checkup" status="pending" />
          <AppointmentItem name="Sneha Kapoor" time="11:30 AM — Consultation" status="completed" />
        </div>

      </main>
    </div>
  )
}