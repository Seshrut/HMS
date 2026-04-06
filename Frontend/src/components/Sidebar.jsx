import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <div className="sidebar">

      <div className="sidebar-header">
        <div className="sidebar-brand">🏥 MedCare HMS</div>
        <span className="sidebar-role-tag">Doctor Portal</span>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Main Menu</div>

        <Link to="/doctor-dashboard" className="sidebar-item">
          <span className="sidebar-item-icon">📊</span>
          Dashboard
        </Link>

        <Link to="/doctor-appointments" className="sidebar-item">
          <span className="sidebar-item-icon">📅</span>
          Appointments
        </Link>

        <Link to="/doctor-patients" className="sidebar-item">
          <span className="sidebar-item-icon">👨‍⚕️</span>
          My Patients
        </Link>

        <Link to="/write-prescription" className="sidebar-item">
          <span className="sidebar-item-icon">💊</span>
          Prescriptions
        </Link>

        <div className="sidebar-section-label">Account</div>

        <Link to="#" className="sidebar-item">
          <span className="sidebar-item-icon">👤</span>
          My Profile
        </Link>

        <Link to="/" className="sidebar-item">
          <span className="sidebar-item-icon">🚪</span>
          Logout
        </Link>

      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">D</div>
          <div>
            <div className="sidebar-user-name">Doctor</div>
            <div className="sidebar-user-status">Active Session</div>
          </div>
        </div>
      </div>
    </div>
  )
}
