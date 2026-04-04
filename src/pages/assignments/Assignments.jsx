import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import AssignmentCard from './AssignmentCard';
import './assignments.css';

const Assignments = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const assignmentsList = [
    {
      title: "ML Fundamentals Quiz",
      course: "Machine Learning Fundamentals",
      dueDate: "Apr 10, 2026",
      questions: 25,
      status: "Pending"
    },
    {
      title: "Linear Regression Practice",
      course: "Machine Learning Fundamentals",
      dueDate: "Mar 28, 2026",
      questions: 15,
      status: "Completed"
    },
    {
      title: "React Component Challenge",
      course: "Web Development with React",
      dueDate: "Apr 8, 2026",
      questions: 10,
      status: "Pending"
    },
    {
      title: "Python Data Structures Test",
      course: "Data Science with Python",
      dueDate: "Mar 20, 2026",
      questions: 30,
      status: "Completed"
    },
    {
      title: "Neural Networks Assessment",
      course: "Machine Learning Fundamentals",
      dueDate: "Mar 25, 2026",
      questions: 20,
      status: "Overdue"
    },
    {
      title: "API Integration Project",
      course: "Web Development with React",
      dueDate: "Apr 15, 2026",
      questions: 15,
      status: "Pending"
    }
  ];

  const filters = ['All', 'Pending', 'Completed', 'Overdue'];

  const filteredAssignments = activeFilter === 'All' 
    ? assignmentsList 
    : assignmentsList.filter(a => a.status === activeFilter);

  return (
    <div className="assignments-container">
      <div className="assignments-header-row">
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1 className="page-title">Assignments & Mock Tests</h1>
          <p className="page-subtitle">Track your assignments and test your knowledge.</p>
        </div>
        
        <div className="filters-group">
          <Filter size={18} className="filter-icon" />
          {filters.map(filter => (
            <button 
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="assignments-grid">
        {filteredAssignments.map((assignment, index) => (
          <AssignmentCard key={index} {...assignment} />
        ))}
      </div>
    </div>
  );
};

export default Assignments;
