import { Routes, Route } from "react-router-dom";

import Landing            from "./pages/Landing";
import LoginSelector      from "./pages/LoginSelector";
import Login              from "./pages/Login";
import Register           from "./pages/Register";
import PatientDashboard   from "./pages/PatientDashboard";
import Appointment        from "./pages/Appointment";
import DoctorDashboard    from "./pages/DoctorDashboard";
import DoctorAppointments from "./pages/DoctorAppointments";
import DoctorPatients     from "./pages/DoctorPatients";
import DoctorReports      from "./pages/DoctorReports";
import WritePrescription  from "./pages/WritePrescription";

import "./App.css";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/"                 element={<Landing />}          />
      <Route path="/loginselector"    element={<LoginSelector />}    />
      <Route path="/login/:userType"  element={<Login />}            />
      <Route path="/register/:userType" element={<Register />}       />

      {/* Patient */}
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
      <Route path="/appointment"       element={<Appointment />}      />

      {/* Doctor */}
      <Route path="/doctor-dashboard"    element={<DoctorDashboard />}    />
      <Route path="/doctor-appointments" element={<DoctorAppointments />} />
      <Route path="/doctor-patients"     element={<DoctorPatients />}     />
      <Route path="/doctor-reports"      element={<DoctorReports />}      />

      {/* appointmentId param — doctor selects which appointment to prescribe for */}
      <Route path="/write-prescription/:appointmentId" element={<WritePrescription />} />
    </Routes>
  );
}

export default App;
