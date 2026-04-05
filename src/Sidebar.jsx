import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, ClipboardList, Award, User, Settings, GraduationCap, X } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { name: 'Home', path: '/home', icon: Home },
    { name: 'Courses', path: '/courses', icon: BookOpen },
    { name: 'Assignments', path: '/assignments', icon: ClipboardList },
    { name: 'Certificates', path: '/certificates', icon: Award },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon">
            <GraduationCap size={24} color="#f8fafc" />
          </div>
          <span className="logo-text">Learnify</span>
        </div>
        
        <button className="mobile-close-btn" onClick={() => setIsOpen(false)}>
          <X size={24} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            <item.icon size={20} className="nav-icon" />
            <span className="nav-text">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="pro-tip-card">
        <h4 className="pro-tip-title">Pro Tip</h4>
        <p className="pro-tip-text">Complete 3 courses this week to earn a bonus certificate!</p>
      </div>
    </aside>
  );
};

export default Sidebar;
