import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"
import hospital from "../assets/hospital.jpg"

export default function Landing(){

const navigate = useNavigate()    

return(

<div>

<Navbar/>

<div className="hero">

<div>

<h1>Your Health, Our Priority</h1>
<h2>Welcome to MedCare Hospital</h2>

<p>
Manage appointments, doctors, and patient records efficiently with our modern healthcare platform.
</p>

<a href="/login">
<button className="btn">Get Started</button>
</a>

</div>

<img src={hospital} />

</div>

</div>

)

}