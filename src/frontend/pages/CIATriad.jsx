import React, { useState } from 'react';

export default function Page3() {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);

  const correctAnswers = {
    q1: '3',
    q2: '1', 
    q3: '4',
    q4: '2'
  };

  const handleAnswerChange = (question, answer) => {
    setQuizAnswers(prev => ({ ...prev, [question]: answer }));
  };

  const calculateScore = () => {
    setShowModal(true);
  };

  const getScore = () => {
    let score = 0;
    Object.keys(correctAnswers).forEach(key => {
      if (quizAnswers[key] === correctAnswers[key]) score++;
    });
    return score;
  };

  return (
    <div>
      <h3>CIA Triad</h3>
      
      <div className="lesson-concept">
        <h4>Concept</h4>
        <p>
          The CIA Triad (confidentiality, integrity, availability) is a model for information security. The three elements are considered the most crucial security components and should be guaranteed in any secure system.
        </p>
        
        <h4>Confidentiality</h4>
        <p>
          Information is not made available or disclosed to unauthorized individuals. Unauthorized users should not be able to access sensitive resources.
        </p>
        <p><strong>Examples of compromise:</strong> Hacker accesses password database, sensitive email sent to wrong person, eavesdropping on data transfer.</p>
        <p><strong>Protection methods:</strong> Data encryption, authentication, access control, MFA, biometric verification.</p>
        
        <h4>Integrity</h4>
        <p>
          The property of accuracy and completeness. Data must remain consistent, accurate, and trustworthy over its entire lifecycle. Data should not change during transit or be altered by unauthorized entities.
        </p>
        <p><strong>Examples of compromise:</strong> Human data entry errors, transmission errors, software bugs, hackers changing information.</p>
        <p><strong>Protection methods:</strong> Authentication, hash functions, backups, auditing, logging.</p>
        
        <h4>Availability</h4>
        <p>
          The property of being accessible and usable on demand by authorized entities. Authorized persons should have access to permitted resources at all times.
        </p>
        <p><strong>Examples of compromise:</strong> DoS attacks, hardware failures, natural disasters, network misconfigurations.</p>
        <p><strong>Protection methods:</strong> Intrusion detection systems, firewalls, network traffic control, redundancy, hardware maintenance.</p>
      </div>

      <div className="testing-section">
        <h4>🧪 How to Test This Quiz</h4>
        <div className="testing-guide">
          <h5>Testing CIA Analysis:</h5>
          <ul>
            <li><strong>What to test:</strong> Answer quiz questions about CIA Triad scenarios</li>
            <li><strong>Expected result:</strong> Each question tests understanding of how attacks affect CIA principles</li>
            <li><strong>How to verify:</strong> Check if your answers match the security analysis</li>
            <li><strong>Why this matters:</strong> Understanding CIA helps identify security vulnerabilities</li>
          </ul>
        </div>
      </div>

      <div className="lesson-activity">
        <h4>CIA Triad Quiz</h4>
        
        <div className="activity-box">
          <h5>Security Scenario Analysis</h5>
          <p>
            Imagine a system that handles personal data but is not protected by a firewall. Answer the following questions:
          </p>
          
          <div className="quiz-interactive">
            <div className="question">
              <h4>1. How could an intruder harm the security goal of confidentiality?</h4>
              <div className="options">
                <label>
                  <input 
                    type="radio" 
                    name="q1" 
                    value="1"
                    checked={quizAnswers.q1 === '1'}
                    onChange={() => handleAnswerChange('q1', '1')}
                  /> 
                  By deleting all the databases.
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="q1" 
                    value="2"
                    checked={quizAnswers.q1 === '2'}
                    onChange={() => handleAnswerChange('q1', '2')}
                  /> 
                  By stealing a database where general configuration information is stored.
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="q1" 
                    value="3"
                    checked={quizAnswers.q1 === '3'}
                    onChange={() => handleAnswerChange('q1', '3')}
                  /> 
                  By stealing a database where names and emails are stored and uploading it to a website.
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="q1" 
                    value="4"
                    checked={quizAnswers.q1 === '4'}
                    onChange={() => handleAnswerChange('q1', '4')}
                  /> 
                  Confidentiality can't be harmed by an intruder.
                </label>
              </div>
            </div>

            <div className="question">
              <h4>2. How could an intruder harm the security goal of integrity?</h4>
              <div className="options">
                <label>
                  <input 
                    type="radio" 
                    name="q2" 
                    value="1"
                    checked={quizAnswers.q2 === '1'}
                    onChange={() => handleAnswerChange('q2', '1')}
                  /> 
                  By changing the names and emails of one or more users stored in a database.
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="q2" 
                    value="2"
                    checked={quizAnswers.q2 === '2'}
                    onChange={() => handleAnswerChange('q2', '2')}
                  /> 
                  By listening to incoming and outgoing network traffic.
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="q2" 
                    value="3"
                    checked={quizAnswers.q2 === '3'}
                    onChange={() => handleAnswerChange('q2', '3')}
                  /> 
                  By bypassing authentication mechanisms for database access.
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="q2" 
                    value="4"
                    checked={quizAnswers.q2 === '4'}
                    onChange={() => handleAnswerChange('q2', '4')}
                  /> 
                  Integrity can only be harmed when intruder has physical access.
                </label>
              </div>
            </div>

            <div className="question">
              <h4>3. How could an intruder harm the security goal of availability?</h4>
              <div className="options">
                <label>
                  <input 
                    type="radio" 
                    name="q3" 
                    value="1"
                    checked={quizAnswers.q3 === '1'}
                    onChange={() => handleAnswerChange('q3', '1')}
                  /> 
                  By exploiting bugs to bypass authentication mechanisms.
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="q3" 
                    value="2"
                    checked={quizAnswers.q3 === '2'}
                    onChange={() => handleAnswerChange('q3', '2')}
                  /> 
                  By redirecting emails with sensitive data to other individuals.
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="q3" 
                    value="3"
                    checked={quizAnswers.q3 === '3'}
                    onChange={() => handleAnswerChange('q3', '3')}
                  /> 
                  Availability can only be harmed by unplugging power supply.
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="q3" 
                    value="4"
                    checked={quizAnswers.q3 === '4'}
                    onChange={() => handleAnswerChange('q3', '4')}
                  /> 
                  By launching a denial of service attack on the servers.
                </label>
              </div>
            </div>

            <div className="question">
              <h4>4. What happens if at least one CIA security goal is harmed?</h4>
              <div className="options">
                <label>
                  <input 
                    type="radio" 
                    name="q4" 
                    value="1"
                    checked={quizAnswers.q4 === '1'}
                    onChange={() => handleAnswerChange('q4', '1')}
                  /> 
                  A system can be considered safe until all goals are harmed.
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="q4" 
                    value="2"
                    checked={quizAnswers.q4 === '2'}
                    onChange={() => handleAnswerChange('q4', '2')}
                  /> 
                  The system's security is compromised even if only one goal is harmed.
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="q4" 
                    value="3"
                    checked={quizAnswers.q4 === '3'}
                    onChange={() => handleAnswerChange('q4', '3')}
                  /> 
                  Only when availability is harmed is security compromised.
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="q4" 
                    value="4"
                    checked={quizAnswers.q4 === '4'}
                    onChange={() => handleAnswerChange('q4', '4')}
                  /> 
                  Only confidentiality harm is a problem.
                </label>
              </div>
            </div>

            <div className="submit-section">
              <button 
                onClick={calculateScore}
                className="submit-quiz-btn" 
                disabled={Object.keys(quizAnswers).length < 4}
              >
                Submit Quiz & See Results
              </button>
            </div>

            {showModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h3>🎯 CIA Triad Quiz Results</h3>
                  <div className="score-display">
                    <div className="score-circle">
                      <span className="score-number">{getScore()}/4</span>
                    </div>
                    <div className="score-text">
                      {getScore() === 4 ? 'Perfect! 🎉' : 
                       getScore() >= 3 ? 'Great job! 👍' : 
                       getScore() >= 2 ? 'Good effort! 📚' : 'Keep learning! 🌟'}
                    </div>
                  </div>
                  
                  <div className="answer-key">
                    <h5>🔑 Answer Key:</h5>
                    <div className="key-grid">
                      <div className="key-item">
                        <strong>Q1:</strong> <span className="correct-letter">3</span> - Stealing database with names/emails harms confidentiality
                      </div>
                      <div className="key-item">
                        <strong>Q2:</strong> <span className="correct-letter">1</span> - Changing user data harms integrity
                      </div>
                      <div className="key-item">
                        <strong>Q3:</strong> <span className="correct-letter">4</span> - DoS attack harms availability
                      </div>
                      <div className="key-item">
                        <strong>Q4:</strong> <span className="correct-letter">2</span> - System security compromised even if one goal harmed
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className="modal-close-btn"
                    onClick={() => setShowModal(false)}
                  >
                    Close Results
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="webgoat-link">
        <h4>🚀 Practice on WebGoat</h4>
        <p>Visit our WebGoat instance to complete the CIA Triad lesson:</p>
        <a href="https://8080-cs-749204404123-default.cs-asia-east1-duck.cloudshell.dev" target="_blank" className="webgoat-btn">
          Access WebGoat CIA Triad Lesson →
        </a>
      </div>
    </div>
  );
}
