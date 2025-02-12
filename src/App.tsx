import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import RoomManagement from './pages/RoomManagement';
import Reservation from './pages/Reservation';
import GuestManagement from './pages/Guest';
import Housekeeping from './pages/Housekeeping';
import Reporting from './pages/Accusation';
import Payment from './pages/Payment';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Employee from './pages/Employee';
import Service from './pages/Service';
import ServiceUsage from './pages/ServiceUsage';

const App: React.FC = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
          
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/room-management" element={<RoomManagement />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/guest-management" element={<GuestManagement />} />
            <Route path="/housekeeping" element={<Housekeeping />} />
            <Route path="/accusation" element={<Reporting />} />
            <Route path="/employee" element={<Employee/>} />
            <Route path="/service" element={<Service/>} />
            <Route path="/serviceUsage" element={<ServiceUsage />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;