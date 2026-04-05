import React from 'react';

const ProgressBar = ({ percentage }) => {
  return (
    <div className="progress-container">
      <div className="progress-track">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="progress-text">{percentage}%</span>
    </div>
  );
};

export default ProgressBar;
