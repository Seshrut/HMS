import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Sidebar() {
  const navigate = useNavigate();

  // Read username from JWT in cookie
  let username = "Doctor";
  try {
    const token = Cookies.get("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      username = payload.username;
    }
  } catch {}

  function handleLogout() {
    Cookies.remove("token");
    navigate("/");
  }

  return (
    <div className="sidebar">

      <div className="sidebar-header">
        <div className="sidebar-brand">MedCare HMS</div>
        <span className="sidebar-role-tag">Doctor Portal</span>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Main Menu</div>

        <Link to="/doctor-dashboard" className="sidebar-item">Dashboard</Link>
        <Link to="/doctor-appointments" className="sidebar-item">Appointments</Link>
        <Link to="/doctor-patients" className="sidebar-item">My Patients</Link>
        <Link to="/doctor-reports" className="sidebar-item">Reports</Link>

        <div className="sidebar-section-label">Account</div>

        <button
          onClick={handleLogout}
          className="sidebar-item"
          style={{ background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left", color: "white", padding: 0 }}
        >
          Logout
        </button>

      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {username.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="sidebar-user-name">Dr. {username}</div>
            <div className="sidebar-user-status">Active Session</div>
          </div>
        </div>
      </div>
    </div>
  );
}
