import { useNavigate } from "react-router-dom"
import "../styles/BackButton.css"

export default function BackButton({ to }) {
    const navigate = useNavigate()

    return (
        <button
            className="back-btn"
            onClick={() => navigate(to)}
        >
            <span className="back-icon">←</span>
        </button>
    )
}