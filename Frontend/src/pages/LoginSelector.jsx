import { useNavigate } from "react-router-dom"
import patientImg from "../assets/patient.png"
import doctorImg from "../assets/doctor.png"
import BackButton from "../components/BackButton"

export default function LoginSelector() {

    const navigate = useNavigate()

    return (

        <div className="login-selector-container">
            <BackButton to="/" />
            <h1>Select Role</h1>

            <div className="role-box">

                <div className="role-card" onClick={() => navigate("/login/patient")}>

                    <img src={patientImg} />

                    <h3>Patient</h3>

                </div>


                <div className="role-card" onClick={() => navigate("/login/doctor")}>

                    <img src={doctorImg} />

                    <h3>Doctor</h3>

                </div>

            </div>

        </div>

    )

}