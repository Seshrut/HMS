import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import BackButton from "../components/BackButton";

export default function Register() {
  const { userType } = useParams();
  const role     = userType || "patient";
  const navigate = useNavigate();

  const [username,        setUsername]        = useState("");
  const [password,        setPassword]        = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error,           setError]           = useState("");
  const [loading,         setLoading]         = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res  = await fetch(`http://localhost:3000/api/auth/${role}/register`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed.");
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
    <div className="login-container">
      <BackButton to="/loginselector" />
      <h2>Register as {role}</h2>

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
        <input
          type="password" placeholder="Confirm Password" className="input-field"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} required
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Registering…" : "Register"}
        </button>
      </form>

      <p>Already registered? <Link to={`/login/${role}`}>Go to Login</Link></p>
    </div>
  );
}