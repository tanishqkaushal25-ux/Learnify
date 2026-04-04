import React from 'react';
import { ChevronRight } from 'lucide-react';
import ProgressBar from './ProgressBar';
import CourseCard from './CourseCard';

const PlaylistSection = ({ title, videoCount, progress, courses }) => {
  return (
    <section className="playlist-section">
      <div className="playlist-header">
        <div className="playlist-info">
          <h3>{title}</h3>
          <span className="playlist-meta">{videoCount} videos</span>
        </div>
        
        <div className="playlist-actions">
          <ProgressBar percentage={progress} />
          <div className="view-all-link">
            View All <ChevronRight size={16} />
          </div>
        </div>
      </div>
      
      <div className="course-grid">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </section>
  );
};

export default PlaylistSection;
