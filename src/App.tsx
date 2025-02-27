import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/loginPage/LoginPage.tsx';
import RegisterPage from './components/registerPage/RegisterPage.tsx';
import Dashboard from './pages/Dashboard';
import RoomManagement from './pages/RoomManagement';
import Reservation from './pages/Reservation';
import GuestManagement from './pages/Guest.tsx';
import Housekeeping from './pages/Housekeeping';
import Reporting from './pages/Accusation.tsx';
import Employee from './pages/Employee';
import Service from './pages/Service';
import ServiceUsage from './pages/ServiceUsage';
import Payment from './pages/Payment';
import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar.tsx';
import { Box, CssBaseline, Toolbar } from '@mui/material';

function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLogin(true);
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {login ? (
            <Route
              path="/*"
              element={
                <Box sx={{ display: 'flex' }}>
                  <CssBaseline />
                  <Sidebar />
                  <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar /> {/* This is needed to push content below the AppBar */}
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/room-management" element={<RoomManagement />} />
                      <Route path="/reservation" element={<Reservation />} />
                      <Route path="/guest-management" element={<GuestManagement />} />
                      <Route path="/housekeeping" element={<Housekeeping />} />
                      <Route path="/accusation" element={<Reporting />} />
                      <Route path="/employee" element={<Employee />} />
                      <Route path="/service" element={<Service />} />
                      {/* <Route path="/serviceUsage" element={<ServiceUsage />} /> */}
                      <Route path="/payment" element={<Payment />} />
                    </Routes>
                  </Box>
                </Box>
              }
            />
          ) : (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<LoginPage />} /> {/* Catch-all route */}
            </>
          )}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
