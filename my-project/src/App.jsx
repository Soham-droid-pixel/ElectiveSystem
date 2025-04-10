import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { AllotmentProvider } from './context/AllotmentContext';

function App() {
  return (
    <AuthProvider>
      <AllotmentProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </AllotmentProvider>
    </AuthProvider>
  );
}

export default App;
