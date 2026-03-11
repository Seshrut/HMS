import Sidebar from "../components/Sidebar"

export default function PatientDashboard() {
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
            <p className="dashboard-greeting">Good morning 👋</p>
            <h1 className="dashboard-title">Patient Dashboard</h1>
          </div>
          <span className="dashboard-date">📅 {today}</span>
        </div>

        {/* Stat Cards */}
        <div className="stats-grid">
          <div className="stat-card blue">
            <div className="stat-card-icon">📋</div>
            <div className="stat-card-value">120</div>
            <div className="stat-card-label">Total Appointments</div>
          </div>

          <div className="stat-card yellow">
            <div className="stat-card-icon">⏳</div>
            <div className="stat-card-value">32</div>
            <div className="stat-card-label">Pending</div>
          </div>

          <div className="stat-card green">
            <div className="stat-card-icon">✅</div>
            <div className="stat-card-value">88</div>
            <div className="stat-card-label">Completed</div>
          </div>

          <div className="stat-card purple">
            <div className="stat-card-icon">👨‍⚕️</div>
            <div className="stat-card-value">15</div>
            <div className="stat-card-label">Doctors Available</div>
          </div>
        </div>

        {/* Lower Section */}
        <div className="dashboard-lower">
          {/* Recent Appointments */}
          <div className="dashboard-section-card">
            <h3 className="section-card-title">Recent Appointments</h3>

            <div className="appointment-item">
              <div className="appt-avatar">🩺</div>
              <div className="appt-info">
                <div className="appt-name">Dr. Ramesh Kumar</div>
                <div className="appt-time">Today, 10:30 AM — Cardiology</div>
              </div>
              <span className="appt-badge pending">Pending</span>
            </div>

            <div className="appointment-item">
              <div className="appt-avatar">🩻</div>
              <div className="appt-info">
                <div className="appt-name">Dr. Priya Sharma</div>
                <div className="appt-time">Yesterday, 2:00 PM — Radiology</div>
              </div>
              <span className="appt-badge completed">Completed</span>
            </div>

            <div className="appointment-item">
              <div className="appt-avatar">💊</div>
              <div className="appt-info">
                <div className="appt-name">Dr. Anil Mehta</div>
                <div className="appt-time">Mar 8, 11:00 AM — General</div>
              </div>
              <span className="appt-badge completed">Completed</span>
            </div>
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