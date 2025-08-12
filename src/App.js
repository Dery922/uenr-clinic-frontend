import Navbar from "./components/Navbar";
import Appointment from "./pages/Appointment/Appointments";
import Department from "./pages/Departments";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import { Route, Routes, useLocation } from "react-router-dom";
import Patient from "./pages/PatientFolder/Patient";

import Schedule from "./pages/Schedule";

import AddDepartments from "./pages/AddDepartments";
import AddAppointment from "./pages/Appointment/AddAppointment";
import Notfound from "./pages/404";
import LoggedInRoutes from "./Routes/LoggedInRoutes";
import NotLoggedInRoutes from "./Routes/NotLoggedInRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddEmployee from "./pages/EmployeesFolder/AddEmployee";
import Employee from "./pages/EmployeesFolder/Employee";
import AddPatient from "./pages/PatientFolder/AddPatient";
import ForgottenPassword from "./pages/ForgottenPassword";
import Profile from "./pages/EmployeesFolder/Profile";
import MessageEmployee from "./pages/EmployeesFolder/MessageEmployee";
import ProtectedRoute from "./Routes/ProtectedRoute";
import AddPatientRecord from "./pages/Records/AddPatientRecord";
import OpdWard from "./pages/OPDWard/OpdWard";

import Pharmacy from "./pages/Pharmacy/Phamacy";

import useSocketAuth from "./chat/useSocketAuth";
import AddPatientDoctorRecord from "./pages/Doctor/AddPatientDoctorRecord";
import AllPatientRecord from "./pages/Records/AllPatientRecord";
import EditPatientRecord from "./pages/Records/EditPatientRecord";
import AllPatientRecordOPD from "./pages/OPDWard/AllPataiets";
import PatientLabTest from "./pages/Laboratory/AddTest";
import PatientHistory from "./pages/PatientFolder/PatientHistory";
import EditAppointment from "./pages/Appointment/EditAppointment";
import Prescription from "./pages/Pharmacy/Prescription";
import Account from "./pages/Finance/Account";
import Administrator from "./pages/Administrator";
import PatientLabHistory from "./pages/Laboratory/LabHistory";
import DoctorSchedule from "./pages/Doctor/DoctorSchedule";
import MedicalRecord from "./pages/Doctor/MedicalRecord";
import ListOfPatientDaily from "./pages/OPDWard/ListOfPatientDaily";
import Inventory from "./pages/Pharmacy/Inventory";
import ViewReports from "./pages/Administrator/ViewReport";
import Reports from "./pages/Administrator/GenerateReport";
import OPDSession from "./pages/Doctor/OPDSession";
import PatientVitalsView from "./pages/Doctor/ViewVitals";
import WardDashboard from "./pages/Ward/Dashboard";
import WardVitals from "./pages/Ward/AddVitals";

function App() {
  useSocketAuth();
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/forgot-password"];
  const chatsidebar = ["/message-employee"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route
            path="/"
            element={
              <ProtectedRoute
                allowedRoles={["Admin", "Doctor", "Nurse", "Record"]}
              >
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-patient-record"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Record"]}>
                <AddPatientRecord />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patient-history"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Record"]}>
                <PatientHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/inventory"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Record"]}>
                <Inventory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor-schedule"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Record"]}>
                <DoctorSchedule />
              </ProtectedRoute>
            }
          />

          <Route
            path="/all-patient-record"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Record"]}>
                <AllPatientRecord />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-patient-medical-record"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Doctor"]}>
                <MedicalRecord />
              </ProtectedRoute>
            }
          />
          <Route
            path="/opd-session-today"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Doctor"]}>
                <OPDSession />
              </ProtectedRoute>
            }
          />

          <Route
            path="/opd-session-today-view"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Doctor"]}>
                <PatientVitalsView />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patient-ward-dashboard"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Nurse"]}>
                <WardDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patient-add-ward-record"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Nurse"]}>
              <WardVitals />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-doctor-schedule"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DoctorSchedule />
              </ProtectedRoute>
            }
          />

          <Route
            path="/all-patient-lab-history"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Record"]}>
                <PatientLabHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-patient-record/:id"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Record"]}>
                <EditPatientRecord />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-patient-opdward"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Doctor", "Nurse"]}>
                <OpdWard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-patient-record-opd"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Nurse"]}>
                <AllPatientRecordOPD />
              </ProtectedRoute>
            }
          />

          {/* Doctor routes here */}
          <Route
            path="/add-patient-doctor-record"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Doctor"]}>
                <AddPatientDoctorRecord />
              </ProtectedRoute>
            }
          />

          <Route
            path="/appointment"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Nurse"]}>
                <Appointment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add/appointment"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Nurse"]}>
                <AddAppointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/appointment/:id"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Nurse"]}>
                <EditAppointment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patients"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Nurse"]}>
                <Patient />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-patient"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Nurse"]}>
                <AddPatient />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-patient-laptest"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Laboratorist"]}>
                <PatientLabTest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-patient-record-opd-today"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Laboratorist"]}>
                <ListOfPatientDaily />
              </ProtectedRoute>
            }
          />

          <Route path="/schedule" element={<Schedule />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/message-employee" element={<MessageEmployee />} />

          <Route
            path="/pharmacy"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Pharmacist"]}>
                <Pharmacy />
              </ProtectedRoute>
            }
          />

          <Route
            path="/pharmacy/prescription/:patientId"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Pharmacist"]}>
                <Prescription />
              </ProtectedRoute>
            }
          />

            <Route
            path="/opd-session-view/:patientId"
            element={
              <ProtectedRoute allowedRoles={["Admin","Doctor"]}>
                <PatientVitalsView/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/finance"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Account"]}>
                <Account />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-page"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Account"]}>
                <Administrator />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-view-report"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <ViewReports />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-view-report"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Reports />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Notfound />} />
        </Route>

        <Route element={<NotLoggedInRoutes />}>
          <Route path="/forgot-password" element={<ForgottenPassword />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
