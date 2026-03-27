import { useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "../styles/login.css"
import BackButton from "../components/BackButton"

export default function Login() {
    const { userType } = useParams()
    const role = userType || "patient"
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({ username, password });
        console.log(role)
        navigate(`/${role}-dashboard`)
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