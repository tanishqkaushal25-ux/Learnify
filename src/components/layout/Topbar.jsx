import React from 'react';
import { Search, ChevronDown, Menu } from 'lucide-react';

const Topbar = ({ toggleSidebar }) => {
  return (
    <header className="topbar">
      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>

      <div className="search-container">
        <Search size={20} className="search-icon" />
        <input 
          type="text" 
          placeholder="Search courses, topics, assignments..." 
          className="search-input"
        />
      </div>

      <div className="user-profile">
        <div className="avatar">A</div>
        <span className="user-name">Alex</span>
        <ChevronDown size={16} className="chevron-icon" />
      </div>
    </header>
  );
};

export default Topbar;
