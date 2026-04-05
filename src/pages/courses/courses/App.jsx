import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';

import Home from './pages/home/Home';
import Courses from './pages/courses/Courses';
import Assignments from './pages/assignments/Assignments';
import Certificates from './pages/certificates/Certificates';

function App() {
  const [studentProfile, setStudentProfile] = useState({
    topic: "Python Programming",
    level: "Complete Beginner",
    goal:  "Get a job / switch careers",
    hoursPerWeek: 5,
  });

  const handleSearch = (query) => {
    // When user searches, update the topic but keep other profile settings
    setStudentProfile(prev => ({ ...prev, topic: query }));
  };

  return (
    <Router>
      <MainLayout onSearch={handleSearch}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<Courses studentProfile={studentProfile} />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/profile" element={<div className="content-wrapper"><h2>Profile Page (Coming Soon)</h2></div>} />
          <Route path="/settings" element={<div className="content-wrapper"><h2>Settings (Coming Soon)</h2></div>} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;