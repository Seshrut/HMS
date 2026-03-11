import { useNavigate } from "react-router-dom"
import patientImg from "../assets/patient.png"
import doctorImg from "../assets/doctor.png"

export default function Login(){

const navigate = useNavigate()

return(

<div className="login-container">

<h1>Select Role</h1>

<div className="role-box">

<div className="role-card" onClick={() => navigate("/dashboard")}>

<img src={patientImg} />

<h3>Patient</h3>

</div>


<div className="role-card">

<img src={doctorImg} />

<h3>Doctor</h3>

</div>

</div>

</div>

)

}