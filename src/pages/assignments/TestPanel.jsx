/**
 * Placeholder component for the actual test taking panel.
 * Represents the space where a test would be mounted.
 */
import React from 'react';

const TestPanel = ({ testId, onComplete }) => {
  return (
    <div className="test-panel card">
      <h3>Taking Test: {testId}</h3>
      <p>This is a placeholder for the actual testing interface.</p>
      <button className="btn btn-primary" onClick={onComplete}>Submit Test</button>
    </div>
  );
};

export default TestPanel;
