import React from 'react';
import { Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const AssignmentCard = ({ title, course, dueDate, questions, status }) => {
  
  // Dynamic rendering based on status
  const getStatusBadge = () => {
    switch (status) {
      case 'Pending':
        return (
          <div className="status-badge pending">
            <Clock size={14} /> <span>Pending</span>
          </div>
        );
      case 'Completed':
        return (
          <div className="status-badge completed">
            <CheckCircle size={14} /> <span>Completed</span>
          </div>
        );
      case 'Overdue':
        return (
          <div className="status-badge overdue">
            <AlertTriangle size={14} /> <span>Overdue</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getActionButton = () => {
    if (status === 'Completed') {
      return <button className="btn btn-secondary" style={{ padding: "6px 24px" }}>Review</button>;
    }
    return <button className="btn btn-primary" style={{ padding: "6px 24px" }}>Attempt Now</button>;
  };

  return (
    <div className="card assignment-card">
      <div className="assignment-card-header">
        <div className="assignment-info">
          <h4>{title}</h4>
          <div className="assignment-course">{course}</div>
          <div className="assignment-due">Due: {dueDate}</div>
        </div>
        {getStatusBadge()}
      </div>
      
      <div className="assignment-card-footer">
        <div className="question-count">{questions} questions</div>
        {getActionButton()}
      </div>
    </div>
  );
};

export default AssignmentCard;
