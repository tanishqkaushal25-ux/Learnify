import React, { useState, useEffect } from 'react';

const TestPanel = ({
  testId,
  questions = [],
  onComplete
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Anti-cheat states
  const [switchCount, setSwitchCount] = useState(0);
  const [warning, setWarning] = useState('');

  // ─── Anti Tab Switch Logic ─────────────────────────
  useEffect(() => {
    if (submitted) return;

    const handleTabSwitch = () => {
      setSwitchCount((prev) => {
        const newCount = prev + 1;

        if (newCount === 1) {
          setWarning(
            '⚠ Warning 1/3: Do not switch tabs during the test.'
          );
        }

        if (newCount === 2) {
          setWarning(
            '⚠ Warning 2/3: Next switch will auto-submit the test.'
          );
        }

        if (newCount >= 3) {
          setWarning(
            '❌ Test auto-submitted due to tab switching.'
          );

          setTimeout(() => {
            handleSubmit();
          }, 1000);
        }

        return newCount;
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleTabSwitch();
      }
    };

    const handleBlur = () => {
      handleTabSwitch();
    };

    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange
    );

    window.addEventListener(
      'blur',
      handleBlur
    );

    return () => {
      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange
      );

      window.removeEventListener(
        'blur',
        handleBlur
      );
    };
  }, [submitted]);

  const handleSelect = (qIndex, option) => {
    if (submitted) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [qIndex]: option
    }));
  };

  const calculateScore = () => {
    let score = 0;

    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        score++;
      }
    });

    return score;
  };

  const handleSubmit = () => {
    if (submitted) return;

    setSubmitted(true);

    const score = calculateScore();
    const percentage =
      questions.length > 0
        ? Math.round((score / questions.length) * 100)
        : 0;

    // PASS
    if (percentage >= 70) {
      // Save certificate to localStorage
      const certificate = {
        title: testId,
        date: new Date().toLocaleDateString(),
        studentName: "Tanishq Kaushal"
      };

      localStorage.setItem(
        "certificateData",
        JSON.stringify(certificate)
      );

      localStorage.removeItem("retryAfter");
      localStorage.removeItem("failedAssignment");

      return;
    }

    // FAIL → lock retry for 24 hrs
    const retryTime =
      new Date().getTime() + 24 * 60 * 60 * 1000;

    localStorage.setItem(
      "retryAfter",
      retryTime
    );

    localStorage.setItem(
      "failedAssignment",
      JSON.stringify({
        testId,
        score,
        percentage
      })
    );
  };

  const score = calculateScore();
  const percentage =
    questions.length > 0
      ? Math.round((score / questions.length) * 100)
      : 0;

  return (
    <div className="test-panel card">
      <h2>{testId}</h2>

      {/* Warning Banner */}
      {warning && (
        <div
          style={{
            marginTop: '12px',
            marginBottom: '20px',
            padding: '12px',
            borderRadius: '8px',
            backgroundColor: '#fef3c7',
            color: '#92400e',
            fontWeight: '600'
          }}
        >
          {warning}
        </div>
      )}

      {questions.map((q, qIndex) => (
        <div
          key={qIndex}
          style={{
            marginBottom: '24px',
            padding: '16px',
            border: '1px solid #ddd',
            borderRadius: '10px'
          }}
        >
          <h4>
            Q{qIndex + 1}. {q.question}
          </h4>

          {q.options.map((option, oIndex) => {
            const isSelected =
              selectedAnswers[qIndex] === option;

            const isCorrect =
              submitted &&
              option === q.answer;

            const isWrong =
              submitted &&
              isSelected &&
              option !== q.answer;

            return (
              <button
                key={oIndex}
                onClick={() =>
                  handleSelect(qIndex, option)
                }
                style={{
                  display: 'block',
                  width: '100%',
                  marginTop: '10px',
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: submitted
                    ? 'default'
                    : 'pointer',
                  backgroundColor: isCorrect
                    ? '#22c55e'
                    : isWrong
                      ? '#ef4444'
                      : isSelected
                        ? '#7c3aed'
                        : '#f3f4f6',
                  color:
                    isSelected || isCorrect || isWrong
                      ? 'white'
                      : 'black'
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: '#7c3aed',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Submit Test
        </button>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <h3>
            Final Score: {score} / {questions.length}
          </h3>

          <h3>
            Percentage: {percentage}%
          </h3>

          {percentage >= 70 ? (
            <button
              onClick={() => {
                window.location.href = '/certificates';
              }}
              style={{
                marginTop: '20px',
                backgroundColor: '#22c55e',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Download Certificate
            </button>
          ) : (
            <button
              onClick={() =>
                (window.location.href = '/courses')
              }
              style={{
                marginTop: '20px',
                backgroundColor: '#ef4444',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Retry After 1 Day
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TestPanel;