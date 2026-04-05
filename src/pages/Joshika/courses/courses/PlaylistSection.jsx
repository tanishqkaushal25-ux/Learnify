import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import ProgressBar from './ProgressBar';
import CourseCard from './CourseCard';

const PlaylistSection = ({ title, videoCount, progress, courses, completed, onToggleComplete }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <section className="playlist-section">
      <div className="playlist-header">
        <div className="playlist-info">
          <h3>{title}</h3>
          <span className="playlist-meta">{videoCount} videos</span>
        </div>

        <div className="playlist-actions">
          <ProgressBar percentage={progress} />
          <div className="view-all-link" onClick={() => setExpanded(e => !e)}>
            {expanded ? 'Collapse' : 'Expand'}
            {expanded
              ? <ChevronDown size={16} />
              : <ChevronRight size={16} />
            }
          </div>
        </div>
      </div>

      {expanded && (
        <div className="course-grid">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              isCompleted={!!completed?.[course.id]}
              onToggleComplete={() => onToggleComplete?.(course.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default PlaylistSection;