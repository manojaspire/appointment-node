import { Routes, Route } from "react-router-dom";

// // Auth
import Login from "../components/login/Login";
// import Register from "../pages/auth/Register";

// // Layouts
// import AdminLayout from "../layouts/AdminLayout";
// import PatientLayout from "../layouts/PatientLayout";
import DashboardPage from "../Dashboard";

// // Public

// // Admin
// import Dashboard from "../pages/admin/Dashboard";
// import Doctors from "../pages/admin/Doctors";
// import Patients from "../pages/admin/Patients";
// import Appointments from "../pages/admin/Appointments";
import RegisterDoctor from "../components/doctor/RegisterDoctor";
import DoctorTable from "../components/doctor/DoctorTable";



// // Patient
// import PatientDashboard from "../pages/patient/Dashboard";
// import PatientDoctors from "../pages/patient/Doctors";
// import BookAppointment from "../pages/patient/BookAppointment";
// import MyAppointments from "../pages/patient/MyAppointments";

// // Others
// import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
   <Route path="/" element={<DashboardPage />} />
   <Route path="/doctor" element={<DoctorTable />} />
   <Route path="/doctor-register" element={<RegisterDoctor />} />
   <Route path="/login" element={<Login />} /> 
      {/* <Route path="/register" element={<Register />} />  */}

      {/* Admin */}
      {/* <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="patients" element={<Patients />} />
        <Route path="appointments" element={<Appointments />} />
      </Route> */}

      {/* Patient */}
      {/* <Route path="/patient" element={<PatientLayout />}>
        <Route index element={<PatientDashboard />} />
        <Route path="doctors" element={<PatientDoctors />} />
        <Route path="book/:doctorId" element={<BookAppointment />} />
        <Route path="my-appointments" element={<MyAppointments />} />
      </Route> */}

      {/* 404 */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;