import React, { useState } from 'react';
import { Search, ChevronDown, Menu } from 'lucide-react';

const Topbar = ({ toggleSidebar, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      onSearch(query.trim());
    }
  };

  const handleSearch = () => {
    if (query.trim() !== '') {
      onSearch(query.trim());
    }
  };

  return (
    <header className="topbar">
      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>

      <div className="search-container">
        <Search
          size={20}
          className="search-icon"
          style={{ cursor: 'pointer' }}
          onClick={handleSearch}
        />
        <input
          type="text"
          placeholder="Search courses, topics, assignments..."
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
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