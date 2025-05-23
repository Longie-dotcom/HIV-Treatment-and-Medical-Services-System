import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { useEffect } from 'react';

import useUser from './hook/useUser';

import HomePage from './page/HomePage/HomePage';
import LoginPage from './page/LoginPage/LoginPage';
import RegisterPage from './page/RegisterPage/RegisterPage';

import PatientNavBar from './component/PatientComponent/PatientNavBar/PatientNavBar';
import UserPage from './page/PatientPage/UserPage/UserPage';
import DoctorInfoPage from './page/PatientPage/DoctorInfoPage/DoctorInfoPage';
import AppointmentPage from './page/PatientPage/AppointmentPage/AppointmentPage';
import BlogPage from './page/PatientPage/BlogPage/BlogPage';

function AppContent() {
  const { user, setReloadCookies } = useUser();
  const location = useLocation();
  const isLogin = location.pathname === '/login' || location.pathname === '/register';
  const navigate = useNavigate();

  return (
    <>
      {!isLogin && (<PatientNavBar user={user} />)}
      <Routes>
        <Route path="/home" element={<HomePage user={user} />} />
        <Route path="/login" element={<LoginPage setReloadCookies={setReloadCookies} />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/userPage" element={<UserPage user={user} />} />
        <Route path="/blogPage" element={<BlogPage user={user} />} />
        <Route path="/doctorInfoPage" element={<DoctorInfoPage user={user} />} />
        <Route path="/appointmentPage" element={<AppointmentPage user={user} />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
