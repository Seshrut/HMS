import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <div className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-brand">🏥 MedCare HMS</div>
        <span className="sidebar-role-tag">Patient Portal</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Main Menu</div>

        <Link to="/dashboard" className="sidebar-item active">
          <span className="sidebar-item-icon">📊</span>
          Dashboard
        </Link>

        <Link to="#" className="sidebar-item">
          <span className="sidebar-item-icon">📅</span>
          Appointments
        </Link>

        <Link to="#" className="sidebar-item">
          <span className="sidebar-item-icon">👨‍⚕️</span>
          My Doctors
        </Link>

        <Link to="#" className="sidebar-item">
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

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">P</div>
          <div>
            <div className="sidebar-user-name">Patient</div>
            <div className="sidebar-user-status">Active Session</div>
          </div>
        </div>
      </div>
    </div>
  )
}
