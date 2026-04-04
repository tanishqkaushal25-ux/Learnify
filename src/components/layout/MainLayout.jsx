import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './layout.css';

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <main className="main-content">
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="content-wrapper">
          {children}
        </div>
      </main>
      
      {/* Mobile overlay */}
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
