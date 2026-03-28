import { useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "../styles/login.css"
import Cookies from 'js-cookie'
import BackButton from "../components/BackButton"

export default function Login() {
    const { userType } = useParams();
    const role = userType || "patient";
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/api/${role}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username.trim(),
                password: password.trim()
            })
        })
            .then(res => res.json())
            .then((res) => {
                if (res.message) console.log(res.message);
                if (res.token) {
                    console.log(res.token);
                    Cookies.set("token", res.token);
                    navigate(`/${role}-dashboard`);
                }
            })
            .catch(e => console.error(e));
    }

    return (
        <div className="login-container">
            <BackButton to="/loginselector" />
            <h2>Welcome {role}</h2>

            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    placeholder="Username"
                    className="input-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="btn">Login</button>
            </form>

            <p>
                Not registered? <Link to={`/register/${role}`}>Go to Register</Link>
            </p>
        </div>
    )
}