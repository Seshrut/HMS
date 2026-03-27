import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import "../styles/login.css"
import BackButton from "../components/BackButton"

export default function Register() {
    const { userType } = useParams()
    const navigate = useNavigate()

    const role = userType || "patient"

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            alert("Passwords do not match")
            return
        }

        console.log({ username, password, role })

        navigate(`/login/${role}`)
    }

    return (
        <div className="login-container">
            <BackButton to="/loginselector"/>
            <h2>Register {role}</h2>

            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    placeholder="Username"
                    className="input-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.slice())}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.slice())}
                    required
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="input-field"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value.slice())}
                    required
                />

                <button type="submit" className="btn">Register</button>
            </form>

            <p>
                Already registered? <Link to={`/login/${role}`}>Go to Login</Link>
            </p>
        </div>
    )
}