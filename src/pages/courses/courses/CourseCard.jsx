import React from 'react';
import { Clock, Eye, ThumbsUp, MessageCircle, CheckCircle } from 'lucide-react';

const CourseCard = ({
  title,
  thumbnail,
  duration,
  views,
  likes,
  comments,
  url,
  channel,
  isCompleted,
  onToggleComplete,
}) => {
  return (
    <div className={`card course-card ${isCompleted ? 'course-card--done' : ''}`}>
      {/* Thumbnail — clicking opens YouTube */}
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="course-thumbnail"
        title="Watch on YouTube"
      >
        <img src={thumbnail} alt={title} />
        <div className="course-duration">
          <Clock size={12} strokeWidth={2.5} />
          <span>{duration}</span>
        </div>
        {isCompleted && (
          <div className="course-done-badge">✓ Watched</div>
        )}
      </a>

      <div className="course-content">
        <h4 className="course-title">{title}</h4>
        {channel && <p className="course-channel">{channel}</p>}

        <div className="course-stats">
          <div className="stat-item">
            <Eye size={14} />
            <span>{views}</span>
          </div>
          <div className="stat-item">
            <ThumbsUp size={14} />
            <span>{likes}</span>
          </div>
          <div className="stat-item">
            <MessageCircle size={14} />
            <span>{comments}</span>
          </div>
        </div>

        <button
          className={`mark-done-btn ${isCompleted ? 'mark-done-btn--done' : ''}`}
          onClick={onToggleComplete}
        >
          <CheckCircle size={14} />
          {isCompleted ? 'Completed' : 'Mark as done'}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;