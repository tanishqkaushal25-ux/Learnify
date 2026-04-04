import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';

// Lazy loading pages can be done, but for now we'll do standard imports
import Home from './pages/home/Home';
import Courses from './pages/courses/Courses';
import Assignments from './pages/assignments/Assignments';
import Certificates from './pages/certificates/Certificates';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/certificates" element={<Certificates />} />
          {/* Fallback routes */}
          <Route path="/profile" element={<div className="content-wrapper"><h2>Profile Page (Coming Soon)</h2></div>} />
          <Route path="/settings" element={<div className="content-wrapper"><h2>Settings (Coming Soon)</h2></div>} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
