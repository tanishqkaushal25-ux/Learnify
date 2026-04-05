import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import AssignmentCard from './AssignmentCard';
import TestPanel from './TestPanel';
import './assignments.css';
import { generateQuizFromVideos } from "../../utils/notebookLLM";

const Assignments = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedTest, setSelectedTest] = useState(null);
  const [assignmentsList, setAssignmentsList] = useState([]);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);

  // Generate assignment using Gemini from course videos
  useEffect(() => {
    const storedCourse = JSON.parse(
      localStorage.getItem("currentAssignment")
    );

    if (storedCourse?.videos) {
      generateQuizFromVideos(storedCourse.videos)
        .then((questions) => {
          setGeneratedQuestions(questions);

          setAssignmentsList([
            {
              title: `${storedCourse.topic} Assessment`,
              course: storedCourse.topic,
              dueDate: "Apr 10, 2026",
              questions: questions.length,
              status: "Pending",
              sourceVideos: storedCourse.videos,
              generatedQuestions: questions
            }
          ]);
        })
        .catch((error) => {
          console.error("Quiz generation failed:", error);
        });
    }
  }, []);

  const filters = ['All', 'Pending', 'Completed', 'Overdue'];

  const filteredAssignments =
    activeFilter === 'All'
      ? assignmentsList
      : assignmentsList.filter(
        (a) => a.status === activeFilter
      );

  // Open selected test
  if (selectedTest) {
    return (
      <TestPanel
        testId={selectedTest.title}
        sourceVideos={selectedTest.sourceVideos}
        questions={selectedTest.generatedQuestions}
        onComplete={() => {
          setAssignmentsList((prev) =>
            prev.map((assignment) =>
              assignment.title === selectedTest.title
                ? {
                  ...assignment,
                  status: 'Completed'
                }
                : assignment
            )
          );

          setSelectedTest(null);
        }}
      />
    );
  }

  return (
    <div className="assignments-container">
      <div className="assignments-header-row">
        <div
          className="page-header"
          style={{ marginBottom: 0 }}
        >
          <h1 className="page-title">
            Assignments & Mock Tests
          </h1>
          <p className="page-subtitle">
            Track your assignments and test your knowledge.
          </p>
        </div>

        <div className="filters-group">
          <Filter
            size={18}
            className="filter-icon"
          />

          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter
                ? 'active'
                : ''
                }`}
              onClick={() =>
                setActiveFilter(filter)
              }
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="assignments-grid">
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map(
            (assignment, index) => (
              <div
                key={index}
                onClick={() =>
                  setSelectedTest(assignment)
                }
                style={{ cursor: 'pointer' }}
              >
                <AssignmentCard
                  {...assignment}
                />
              </div>
            )
          )
        ) : (
          <p>No assignments available</p>
        )}
      </div>
    </div>
  );
};

export default Assignments;