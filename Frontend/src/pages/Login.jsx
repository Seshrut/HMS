import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import BackButton from "../components/BackButton";
import doctorImg  from "../assets/doctor-login.jpg";
import patientImg from "../assets/patient-login.jpg";

export default function Login() {
  const { userType } = useParams();
  const role     = userType || "patient";
  const image    = role === "doctor" ? doctorImg : patientImg;
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res  = await fetch(`http://localhost:3000/api/auth/${role}/login`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ username: username.trim(), password: password.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed. Please try again.");
        return;
      }

      Cookies.set("token", data.token, { expires: 7 });
      navigate(`/${role}-dashboard`);
    } catch {
      setError("Cannot connect to server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* LEFT */}
        <div className="login-left">
          <BackButton to="/loginselector" />
          <h2>Login</h2>
          <p>Welcome back, {role}</p>

          {error && (
            <div style={{
              background: "#fee2e2", color: "#dc2626",
              padding: "10px 14px", borderRadius: "8px",
              fontSize: "14px", marginBottom: "12px",
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text" placeholder="Username" className="input-field"
              value={username} onChange={(e) => setUsername(e.target.value)} required
            />
            <input
              type="password" placeholder="Password" className="input-field"
              value={password} onChange={(e) => setPassword(e.target.value)} required
            />
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Logging in…" : "Login"}
            </button>
          </form>

          <p>Not registered? <Link to={`/register/${role}`}>Go to Register</Link></p>
        </div>

        {/* RIGHT — image panel */}
        <div className="login-right" style={{ backgroundImage: `url(${image})` }} />
      </div>
    </div>
  );
}