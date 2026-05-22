import { BrowserRouter, Routes, Route } from "react-router-dom";
import Competition from "./pages/Competition";
import Homepage from "./pages/Homepage";
import LoginForm from "./pages/LoginForm";
import Seminar from "./pages/Seminar";
import Workshop from "./pages/Workshop";
import Talkshow from "./pages/Talkshow";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import RegisterForm from "./pages/RegisterForm";
import DashboardIndex from "./pages/dashboard/DasboardIndex";

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import CategoryIndex from "./pages/dashboard/category/CategoryIndex";
import CategoryCreate from "./pages/dashboard/category/CategoryCreate";

import PembicaraIndex from "./pages/dashboard/pembicara/PembicaraIndex";
import EventIndex from "./pages/dashboard/event/EventIndex";
import PembicaraCreate from "./pages/dashboard/pembicara/PembicaraCreate";
import EventCreate from "./pages/dashboard/event/EventCreate";
import CategoryEdit from "./pages/dashboard/category/CategoryEdit";
import PembicaraEdit from "./pages/dashboard/pembicara/PembicaraEdit";
import EventEdit from "./pages/dashboard/event/EventEdit";
import BiodataIndex from "./pages/dashboard/Biodata/Biodata.Index";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* untuk website */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/competition" element={<Competition />} />
          <Route path="/seminar" element={<Seminar />} />
          <Route path="/talkshow" element={<Talkshow />} />
          <Route path="/workshop" element={<Workshop />} />
        </Route>

        {/* untuk login dan register */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>

        {/* halaman yg hanya biisa diakses jika sudah login */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardIndex />} /> 
            <Route path="/dashboard/category" element={<CategoryIndex />} />
            <Route path="/dashboard/pembicara" element={<PembicaraIndex />} />
            <Route path="/dashboard/event" element={<EventIndex />} />
            <Route path="/dashboard/category/create" element={<CategoryCreate />} />
            <Route path="/dashboard/pembicara/create" element={<PembicaraCreate />} />
            <Route path="/dashboard/event/create" element={<EventCreate />} />
            <Route path="/dashboard/category/edit" element={<CategoryEdit />} />
            <Route path="/dashboard/pembicara/edit" element={<PembicaraEdit />} />
            <Route path="/dashboard/event/edit" element={<EventEdit />} />
            <Route path="/dashboard/biodata" element={<BiodataIndex />} />
           
          </Route>
        </Route>

       
      </Routes>
    </BrowserRouter>
  );
}

export default App;