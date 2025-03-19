// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddStudent from './pages/AddStudent';
import AttendanceDashboard from './pages/AttendanceDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddStudent />} />
        <Route path="/attendance" element={<AttendanceDashboard />} />
      </Routes>
    </Router>
  );
};

export default App; 