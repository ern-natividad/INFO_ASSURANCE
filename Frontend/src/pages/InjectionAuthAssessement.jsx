import React, { useState } from 'react';
import '../App.css';

export default function InjectionAuthAssessement() {
  const [answers, setAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);

  const correctAnswers = {
    q1: 'SQL Injection',
    q2: 'Parameterized queries',
    q3: 'Rate limiting',
    q4: 'Strong passwords',
    q5: 'Session fixation'
  };

  const handleAnswerChange = (question, value) => {
    setAnswers(prev => ({
      ...prev,
      [question]: value
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    Object.keys(correctAnswers).forEach(key => {
      if (answers[key] === correctAnswers[key]) {
        correct++;
      }
    });
    setScore(correct);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="lesson-container">
      <div className="lesson-content fade-in-content">
        
        {/* Header Section */}
        <div className="auth-header">
          <h1 className="assessment-title">SQL Injection & Authentication Assessment</h1>
          <p className="assessment-subtitle">
            Validate your knowledge of OWASP Top 10 vulnerabilities and defense strategies.
          </p>
        </div>

        <div className="quiz-grid">
          {/* Section 1: SQL Injection - 3 Questions */}
          <section className="assessment-card">
            <div className="card-header">
              <span className="icon-badge">🚨</span>
              <h4>SQL Injection Fundamentals</h4>
            </div>

            <div className="question-group">
              <h5>Question 1: What is the core cause of SQL Injection?</h5>
              <div className="options-grid">
                {['Mixing untrusted data with code', 'Using a slow database', 'Forgetting a password', 'Server hardware failure'].map((opt) => (
                  <label key={opt} className={`option-label ${answers.q1 === opt ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="q1" 
                      value={opt} 
                      checked={answers.q1 === opt}
                      onChange={() => handleAnswerChange('q1', opt)} 
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div className="question-group">
              <h5>Question 2: What is the best way to prevent SQL Injection?</h5>
              <div className="options-grid">
                {[
                  { val: 'Parameterized queries', label: 'Parameterized queries' },
                  { val: 'Input validation', label: 'Client-side validation' },
                  { val: 'Blacklisting', label: 'Blacklisting special characters' },
                  { val: 'Encryption', label: 'Database encryption' }
                ].map((opt) => (
                  <label key={opt.val} className={`option-label ${answers.q2 === opt.val ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="q2" 
                      value={opt.val} 
                      checked={answers.q2 === opt.val}
                      onChange={() => handleAnswerChange('q2', opt.val)} 
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="question-group">
              <h5>Question 3: In Lesson 3, what is the purpose of using '--'?</h5>
              <div className="options-grid">
                {['To comment out the rest of the query', 'To bypass the firewall', 'To encrypt the user input', 'To delete the database'].map((opt) => (
                  <label key={opt} className={`option-label ${answers.q3 === opt ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="q3" 
                      value={opt} 
                      checked={answers.q3 === opt}
                      onChange={() => handleAnswerChange('q3', opt)} 
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2: Broken Authentication - 3 Questions */}
          <section className="assessment-card">
            <div className="card-header">
              <span className="icon-badge">🔓</span>
              <h4>Broken Authentication</h4>
            </div>

            <div className="question-group">
              <h5>Question 4: Which mechanism stops automated login attempts?</h5>
              <div className="options-grid">
                {['Rate limiting', 'Database indexing', 'CSS styling', 'JavaScript alerts'].map((opt) => (
                  <label key={opt} className={`option-label ${answers.q4 === opt ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="q4" 
                      value={opt} 
                      checked={answers.q4 === opt}
                      onChange={() => handleAnswerChange('q4', opt)} 
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div className="question-group">
              <h5>Question 5: Why is 'admin123' considered a weak password?</h5>
              <div className="options-grid">
                {['It is in common brute-force lists', 'It is too long', 'It uses numbers', 'It is case-sensitive'].map((opt) => (
                  <label key={opt} className={`option-label ${answers.q5 === opt ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="q5" 
                      value={opt} 
                      checked={answers.q5 === opt}
                      onChange={() => handleAnswerChange('q5', opt)} 
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div className="question-group">
              <h5>Question 6: What is a risk of poor session management?</h5>
              <div className="options-grid">
                {[
                  { val: 'Session fixation', label: 'Session Fixation' },
                  { val: 'Slow loading', label: 'Slow Page Loading' },
                  { val: 'Broken images', label: 'Broken Images' },
                  { val: 'Font errors', label: 'Incorrect Font Usage' }
                ].map((opt) => (
                  <label key={opt.val} className={`option-label ${answers.q6 === opt.val ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="q6" 
                      value={opt.val} 
                      checked={answers.q6 === opt.val}
                      onChange={() => handleAnswerChange('q6', opt.val)} 
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Action Button */}
        <div className="submit-section-wide">
          <button 
            className="submit-quiz-btn-large" 
            onClick={calculateScore}
            disabled={Object.keys(answers).length < 5}
          >
            Submit Assessment & See Results
          </button>
        </div>

        {/* Practice & Status Section */}
        <div className="info-grid">
          <div className="info-card practice">
            <h4>🛡️ Security Research</h4>
            <p>Analyze these vulnerability patterns to strengthen your final project’s defensive architecture.</p>
            <div className="url-example">
              <code>Secure Coding Standards</code>
            </div>
          </div>
          
          <div className="info-card achievement">
            <h4>📋 Defense Readiness</h4>
            <p>Project Assessment Progress:</p>
            <ul className="status-list">
              <li>✅ IA Principles Application</li>
              <li>✅ Vulnerability Mitigation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Score Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content animate-pop" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Assessment Results</h3>
              <button className="close-x" onClick={closeModal}>&times;</button>
            </div>
            
            <div className="score-display">
              <div className="score-circle-container">
                <div className="score-circle">
                  <span className="score-number">{score}</span>
                  <span className="score-total">/ 6</span>
                </div>
              </div>
              <div className="score-feedback">
                <h4>{score === 6 ? "Perfect Score!" : "Review the Answer Key"}</h4>
              </div>
            </div>

            {/* Answer Key Section */}
            <div className="answer-key-section">
              <h5>Answer Key</h5>
              <div className="answer-list">
                <div className="answer-item">
                  <p><strong>Q1:</strong> Mixing untrusted data with code</p>
                </div>
                <div className="answer-item">
                  <p><strong>Q2:</strong> Parameterized queries</p>
                </div>
                <div className="answer-item">
                  <p><strong>Q3:</strong> To comment out the rest of the query</p>
                </div>
                <div className="answer-item">
                  <p><strong>Q4:</strong> Rate limiting</p>
                </div>
                <div className="answer-item">
                  <p><strong>Q5:</strong> It is in common brute-force lists</p>
                </div>
                <div className="answer-item">
                  <p><strong>Q6:</strong> Session Fixation</p>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="close-modal-btn" onClick={closeModal}>
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}