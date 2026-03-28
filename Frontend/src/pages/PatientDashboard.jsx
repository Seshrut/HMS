import Sidebar from "../components/Sidebar"
import { useState } from "react"
import { useEffect } from "react";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import AppointmentItem from "../components/Appointment"

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [totalAppointments, setTotalAppointments] = useState("--");
  const [pending, setPending] = useState("--");
  const [completed, setCompleted] = useState("--");
  const [doctorsAvailable, setDoctorsAvailable] = useState("--");
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
    console.log(cookie)
    if (cookie == "") return;
    fetch("http://localhost:3000/api/whoami", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.role != "patient") navigate("/loginselector");
        setUsername(res.username);
      })
      .catch(() => navigate("/loginselector"));
  }
  function getStats() {
    fetch("http://localhost:3000/api/dashboard/patient", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
      }
    })
      .then(res => res.json())
      .then((res) => {
        setTotalAppointments(res.totalAppointments);
        setPending(res.pending);
        setCompleted(res.completed);
        setDoctorsAvailable(res.doctorsAvailable);
      })
  }
  // Get today's date for display
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
            <p className="dashboard-greeting">Welcome {username}</p>
            <h1 className="dashboard-title">Patient Dashboard</h1>
          </div>
          <span className="dashboard-date">📅 {today}</span>
        </div>

        {/* Stat Cards */}
        <div className="stats-grid">
          <div className="stat-card blue">
            <div className="stat-card-icon">📋</div>
            <div className="stat-card-value">{totalAppointments}</div>
            <div className="stat-card-label">Total Appointments</div>
          </div>

          <div className="stat-card yellow">
            <div className="stat-card-icon">⏳</div>
            <div className="stat-card-value">{pending}</div>
            <div className="stat-card-label">Pending</div>
          </div>

          <div className="stat-card green">
            <div className="stat-card-icon">✅</div>
            <div className="stat-card-value">{completed}</div>
            <div className="stat-card-label">Completed</div>
          </div>

          <div className="stat-card purple">
            <div className="stat-card-icon">👨‍⚕️</div>
            <div className="stat-card-value">{doctorsAvailable}</div>
            <div className="stat-card-label">Doctors Available</div>
          </div>
        </div>

        {/* Lower Section */}
        <div className="dashboard-lower">
          {/* Recent Appointments */}
          <div className="dashboard-section-card">
            <h3 className="section-card-title">Recent Appointments</h3>

            <AppointmentItem name="Dr. Ramesh Kumar" time="Today, 10:30 AM — Cardiology" status="pending" />
            <AppointmentItem name="Dr. Priya Sharma" time="Yesterday, 2:00 PM — Radiology" status="completed" />
            <AppointmentItem name="Dr. Anil Mehta" time="Mar 8, 11:00 AM — General" status="completed" />
          </div>

          {/* Quick Actions */}
          <div className="dashboard-section-card">
            <h3 className="section-card-title">Quick Actions</h3>

            <div className="quick-action-grid">
              <button className="quick-action-btn">
                <span className="qa-icon">📅</span>
                <span className="qa-label">Book Appointment</span>
              </button>

              <button className="quick-action-btn">
                <span className="qa-icon">👨‍⚕️</span>
                <span className="qa-label">Find a Doctor</span>
              </button>

              <button className="quick-action-btn">
                <span className="qa-icon">📄</span>
                <span className="qa-label">View Reports</span>
              </button>

              <button className="quick-action-btn">
                <span className="qa-icon">💊</span>
                <span className="qa-label">Prescriptions</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}