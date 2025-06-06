import Navbar from "./components/Navbar";
import Appointment from "./pages/Appointments";
import Department from "./pages/Departments";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Patient from "./pages/Patient";
import Doctor from "./pages/Docters";
import Schedule from "./pages/Schedule";
import AddDoctor from "./pages/AddDoctor";
import AddDepartments from "./pages/AddDepartments";
import AddAppointment from "./pages/AddAppointment";
import Notfound from "./pages/404";



function App() {
  return (
     <BrowserRouter>
     <Navbar />
     <Routes>
     <Route path="/" element={<HomePage />} />
     <Route path="/appointment" element={<Appointment />}/>
     <Route path="/add/appointment" element={<AddAppointment />}/>
     <Route path="/department" element={<Department />}/>
     <Route path="/add/departments" element={<AddDepartments/>} />
     <Route path="/patients" element={<Patient />}/>
     <Route path="/doctors" element={<Doctor />}/>
     <Route path="/schedule" element={<Schedule />}/>
     <Route path="/add/doctor" element={<AddDoctor />}/>
     <Route path="*" element={<Notfound />}/>
 
     </Routes>
     </BrowserRouter>
  );
}

export default App;
