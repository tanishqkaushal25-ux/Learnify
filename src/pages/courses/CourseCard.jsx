import React from 'react';
import { Clock, Eye, ThumbsUp, MessageCircle } from 'lucide-react';

const CourseCard = ({ title, thumbnail, duration, views, likes, comments }) => {
  return (
    <div className="card course-card">
      <div className="course-thumbnail">
        <img src={thumbnail} alt={title} />
        <div className="course-duration">
          <Clock size={12} strokeWidth={2.5} />
          <span>{duration}</span>
        </div>
      </div>
      <div className="course-content">
        <h4 className="course-title">{title}</h4>
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
      </div>
    </div>
  );
};

export default CourseCard;
