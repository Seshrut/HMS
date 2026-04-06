import { useState } from "react"
import { useNavigate } from "react-router-dom"
import SidebarSimple from "../components/SidebarSimple"


export default function Appointment() {
  const navigate = useNavigate()

  const [doctor, setDoctor] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    alert("Appointment booked (dummy for now)")
  }

  return (
    <div className="dashboard-layout">
      <SidebarSimple />

      <main className="dashboard-main">
        <div className="dashboard-section-card">

         <div className="appointment-container">

  {/* LEFT SIDE */}
  <div className="appointment-form">
    <h2>Book Appointment</h2>
    <p>Schedule with your preferred doctor</p>

    {/* your form stays here */}
  </div>

  {/* RIGHT SIDE */}
  <div className="appointment-visual">
    <h3>Why choose MedCare?</h3>

    <ul>
      <li>✔ Verified doctors</li>
      <li>✔ Instant booking</li>
      <li>✔ Digital prescriptions</li>
    </ul>
  </div>

</div>


          <form onSubmit={handleSubmit}>

            {/* Doctor */}
            <div className="form-group">
              <label>Select Doctor</label>
              <select 
                value={doctor} 
                onChange={(e) => setDoctor(e.target.value)}
                className="input-field"
              >
                <option value="">Select Doctor</option>
                <option value="Dr. Ramesh">Dr. Ramesh</option>
                <option value="Dr. Priya">Dr. Priya</option>
              </select>
            </div>

            {/* Date */}
            <div className="form-group">
              <label>Select Date</label>
              <input 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input-field"
              />
            </div>

            {/* Time */}
            <div className="form-group">
              <label>Select Time</label>
              <input 
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="input-field"
              />
            </div>

            <button className="btn">Book Appointment</button>

          </form>

          <button 
            onClick={() => navigate("/patient-dashboard")} 
            className="btn"
            style={{ marginTop: "15px" }}
          >
            Back
          </button>

        </div>
      </main>
    </div>
  )
}