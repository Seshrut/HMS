import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "./Sidebar";

/**
 * Wraps every doctor page.
 * - Reads token from cookie
 * - Calls /api/auth/me to verify the user is a doctor
 * - Shows the Sidebar + page content on success
 * - Redirects to /loginselector on failure
 */
export default function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/loginselector");
      return;
    }

    fetch("http://localhost:3000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.role !== "doctor") {
          navigate("/loginselector");
        } else {
          setReady(true);
        }
      })
      .catch(() => navigate("/loginselector"));
  }, []);

  if (!ready) {
    return (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        height: "100vh", background: "#f4f7fb",
      }}>
        <p style={{ color: "#6b7280", fontSize: "15px" }}>Verifying session…</p>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}
