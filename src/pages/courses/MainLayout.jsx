import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './layout.css';

const MainLayout = ({ children, onSearch }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    // Pass search up to App
    onSearch(query);
    // Automatically navigate to courses page when searching
    navigate('/courses');
  };

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <main className="main-content">
        <Topbar
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onSearch={handleSearch}
        />
        <div className="content-wrapper">
          {children}
        </div>
      </main>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default MainLayout;