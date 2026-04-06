import { Routes, Route } from "react-router-dom"

import Appointment from "./components/Appointment"
import DoctorAppointments from "./pages/DoctorAppointments";
import DoctorPatients from "./pages/DoctorPatients";
import WritePrescription from "./pages/WritePrescription";
import DoctorReports from "./pages/DoctorReports";
import Landing from "./pages/Landing"
import LoginSelector from "./pages/LoginSelector"
import PatientDashboard from "./pages/PatientDashboard"
import DoctorDashboard from "./pages/DoctorDashboard"
import Login from "./pages/Login"
import "./App.css"
import Register from "./pages/Register"

function App() {

    return (

        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/loginselector" element={<LoginSelector />} />
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor-appointments" element={<DoctorAppointments />} />
            <Route path="/doctor-patients" element={<DoctorPatients />} />
            <Route path="/write-prescription" element={<WritePrescription />} />
            <Route path="/doctor-reports" element={<DoctorReports />} />
            <Route path="/login/:userType" element={<Login />} />
            <Route path="/register/:userType" element={<Register />} />
            <Route path="/book" element={<Appointment/>}/>
        </Routes>

    )

}

export default App
