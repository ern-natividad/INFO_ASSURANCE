import React, { useState } from 'react';

export default function Assessment() {
  const [answers, setAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);

  const correctAnswers = {
    q1: 'POST',
    q2: '404', 
    q3: '2',
    q4: '3',
    q5: '4',
    q6: '1',
    q7: '4'
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
    <div>
      <h3>📝 Comprehensive Assessment</h3>
      <p>Test your understanding of HTTP Basics, HTTP Proxies, and CIA Triad concepts:</p>
      
      <div className="quiz-section">
        <div className="lesson-section">
          <h4>🌐 HTTP Basics Questions</h4>
          
          <div className="question">
            <h4>Question 1: What HTTP verb does WebGoat use when submitting a form?</h4>
            <div className="options">
              <label>
                <input 
                  type="radio" 
                  name="q1" 
                  value="GET"
                  checked={answers.q1 === 'GET'}
                  onChange={() => handleAnswerChange('q1', 'GET')}
                /> 
                GET
              </label>
              <label>
                <input 
                  type="radio" 
                  name="q1" 
                  value="POST"
                  checked={answers.q1 === 'POST'}
                  onChange={() => handleAnswerChange('q1', 'POST')}
                /> 
                POST
              </label>
            </div>
          </div>

          <div className="question">
            <h4>Question 2: What is the magic number in WebGoat that represents "Not Found"?</h4>
            <div className="options">
              <label>
                <input 
                  type="radio" 
                  name="q2" 
                  value="404"
                  checked={answers.q2 === '404'}
                  onChange={() => handleAnswerChange('q2', '404')}
                /> 
                404
              </label>
              <label>
                <input 
                  type="radio" 
                  name="q2" 
                  value="200"
                  checked={answers.q2 === '200'}
                  onChange={() => handleAnswerChange('q2', '200')}
                /> 
                200
              </label>
              <label>
                <input 
                  type="radio" 
                  name="q2" 
                  value="403"
                  checked={answers.q2 === '403'}
                  onChange={() => handleAnswerChange('q2', '403')}
                /> 
                403
              </label>
              <label>
                <input 
                  type="radio" 
                  name="q2" 
                  value="500"
                  checked={answers.q2 === '500'}
                  onChange={() => handleAnswerChange('q2', '500')}
                /> 
                500
              </label>
            </div>
          </div>
        </div>

        <div className="lesson-section">
          <h4>🔍 HTTP Proxies Questions</h4>
          
          <div className="question">
            <h4>Question 3: How can you identify hidden parameters in requests using a proxy?</h4>
            <div className="options">
              <label>
                <input 
                  type="radio" 
                  name="q3" 
                  value="1"
                  checked={answers.q3 === '1'}
                  onChange={() => handleAnswerChange('q3', '1')}
                /> 
                By looking at request headers
              </label>
              <label>
                <input 
                  type="radio" 
                  name="q3" 
                  value="2"
                  checked={answers.q3 === '2'}
                  onChange={() => handleAnswerChange('q3', '2')}
                /> 
                By intercepting and analyzing traffic
              </label>
              <label>
                <input 
                  type="radio" 
                  name="q3" 
                  value="3"
                  checked={answers.q3 === '3'}
                  onChange={() => handleAnswerChange('q3', '3')}
                /> 
                By checking server logs
              </label>
              <label>
                <input 
                  type="radio" 
                  name="q3" 
                  value="4"
                  checked={answers.q3 === '4'}
                  onChange={() => handleAnswerChange('q3', '4')}
                /> 
                By asking the server admin
              </label>
            </div>
          </div>

          <div className="question">
            <h4>Question 4: What happens when you enable a proxy in your browser?</h4>
            <div className="options">
              <label>
                <input 
                  type="radio" 
                  name="q4" 
                  value="1"
                  checked={answers.q4 === '1'}
                  onChange={() => handleAnswerChange('q4', '1')}
                /> 
                All traffic goes directly to the server
              </label>
              <label>
                <input 
                  type="radio" 
                  name="q4" 
                  value="2"
                  checked={answers.q4 === '2'}
                  onChange={() => handleAnswerChange('q4', '2')}
                /> 
                  Traffic is blocked
              </label>
              <label>
                <input 
                  type="radio" 
                  name="q4" 
                  value="3"
                  checked={answers.q4 === '3'}
                  onChange={() => handleAnswerChange('q4', '3')}
                /> 
                All HTTP traffic flows through the proxy first
              </label>
              <label>
                <input 
                  type="radio" 
                  name="q4" 
                  value="4"
                  checked={answers.q4 === '4'}
                  onChange={() => handleAnswerChange('q4', '4')}
                /> 
                Only HTTPS traffic goes through proxy
              </label>
            </div>
          </div>
        </div>

        <div className="lesson-section">
          <h4>🛡️ CIA Triad Questions</h4>
          
          <div className="question">
            <h4>Question 5: How could an intruder harm the security goal of confidentiality?</h4>
            <div className="options">
              <label>
                <input 
                  type="radio" 
                  name="q5" 
                  value="1"
                  checked={answers.q5 === '1'}
                  onChange={() => handleAnswerChange('q5', '1')}
                /> 
                By deleting all the databases
              </label>
              <label>
                <input 
                  type="radio" 
                  name="q5" 
                  value="2"
                  checked={answers.q5 === '2'}
                  onChange={() => handleAnswerChange('q5', '2')}
                /> 
                By stealing configuration information
              </label>
              <label>
                <input 
                  type="radio" 
                  name="q5" 
                  value="3"
                  checked={answers.q5 === '3'}
                  onChange={() => handleAnswerChange('q5', '3')}
                /> 
                Confidentiality can't be harmed
              </label>
              <label>
                <input 
                  type="radio" 
                  name="q5" 
                  value="4"
                  checked={answers.q5 === '4'}
                  onChange={() => handleAnswerChange('q5', '4')}
                /> 
                By stealing database with names/emails and uploading it
              </label>
            </div>
          </div>

          <div className="question">
            <h4>Question 6: How could an intruder harm the security goal of integrity?</h4>
            <div className="options">
              <label>
                <input 
                  type="radio" 
                  name="q6" 
                  value="1"
                  checked={answers.q6 === '1'}
                  onChange={() => handleAnswerChange('q6', '1')}
                /> 
                By changing names and emails in database
              </label>
              <label>
                <input 
                  type="radio" 
                  name="q6" 
                  value="2"
                  checked={answers.q6 === '2'}
                  onChange={() => handleAnswerChange('q6', '2')}
                /> 
                By listening to network traffic
              </label>
              <label>
                <input 
                  type="radio" 
                  name="q6" 
                  value="3"
                  checked={answers.q6 === '3'}
                  onChange={() => handleAnswerChange('q6', '3')}
                /> 
                By bypassing authentication
              </label>
              <label>
                <input 
                  type="radio" 
                  name="q6" 
                  value="4"
                  checked={answers.q6 === '4'}
                  onChange={() => handleAnswerChange('q6', '4')}
                /> 
                Integrity can only be harmed with physical access
              </label>
            </div>
          </div>

          <div className="question">
            <h4>Question 7: How could an intruder harm the security goal of availability?</h4>
            <div className="options">
              <label>
                <input 
                  type="radio" 
                  name="q7" 
                  value="1"
                  checked={answers.q7 === '1'}
                  onChange={() => handleAnswerChange('q7', '1')}
                /> 
                By exploiting bugs to bypass authentication
              </label>
              <label>
                <input 
                  type="radio" 
                  name="q7" 
                  value="2"
                  checked={answers.q7 === '2'}
                  onChange={() => handleAnswerChange('q7', '2')}
                /> 
                By redirecting emails
              </label>
              <label>
                <input 
                  type="radio" 
                  name="q7" 
                  value="3"
                  checked={answers.q7 === '3'}
                  onChange={() => handleAnswerChange('q7', '3')}
                /> 
                By unplugging power supply
              </label>
              <label>
                <input 
                  type="radio" 
                  name="q7" 
                  value="4"
                  checked={answers.q7 === '4'}
                  onChange={() => handleAnswerChange('q7', '4')}
                /> 
                By launching denial of service attack
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="submit-section">
        <button 
          className="submit-quiz-btn" 
          onClick={calculateScore}
          disabled={Object.keys(answers).length < 7}
        >
          Submit Quiz & See Results
        </button>
      </div>

      <div className="webgoat-link">
        <h4>� Practice More</h4>
        <p>Visit our WebGoat instance on Google Cloud Console to understand and try assessments...</p>
        <div className="webgoat-instructions">
          <p><strong>Instructions:</strong></p>
          <ol>
            <li>Click the link below to access our WebGoat instance</li>
            <li>Add <code className="path-text">/WebGoat</code> at the end of the URL</li>
            <li>If you don't have an account yet, register first</li>
            <li>Then login to access the SQL Injection lessons</li>
          </ol>
          <div className="url-example">
            <strong>Base URL:</strong> 
            <a href="https://8080-cs-749204404123-default.cs-asia-east1-duck.cloudshell.dev" target="_blank" className="webgoat-btn">
              https://8080-cs-749204404123-default.cs-asia-east1-duck.cloudshell.dev
            </a>
            <p className="final-url">
              <strong>Final URL will be:</strong> 
              <code>https://8080-cs-749204404123-default.cs-asia-east1-duck.cloudshell.dev/WebGoat</code>
            </p>
          </div>
        </div>
      </div>

      {/* Score Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>🎯 Quiz Results</h3>
            <div className="score-display">
              <div className="score-circle">
                <span className="score-number">{score}/7</span>
              </div>
              <p className="score-text">
                You got {score} out of 7 questions correct!
              </p>
            </div>
            
            <div className="answers-review">
              <h4>Answer Review:</h4>
              
              <div className="answer-key">
                <h5>🔑 Answer Key:</h5>
                <div className="key-grid">
                  <div className="key-item">
                    <strong>Q1:</strong> <span className="correct-letter">POST</span> - WebGoat uses POST for form submissions
                  </div>
                  <div className="key-item">
                    <strong>Q2:</strong> <span className="correct-letter">404</span> - 404 represents "Not Found" HTTP status
                  </div>
                  <div className="key-item">
                    <strong>Q3:</strong> <span className="correct-letter">2</span> - Proxies identify hidden parameters by intercepting traffic
                  </div>
                  <div className="key-item">
                    <strong>Q4:</strong> <span className="correct-letter">3</span> - All HTTP traffic flows through proxy when enabled
                  </div>
                  <div className="key-item">
                    <strong>Q5:</strong> <span className="correct-letter">4</span> - Stealing names/emails harms confidentiality
                  </div>
                  <div className="key-item">
                    <strong>Q6:</strong> <span className="correct-letter">1</span> - Changing data harms integrity
                  </div>
                  <div className="key-item">
                    <strong>Q7:</strong> <span className="correct-letter">4</span> - DoS attacks harm availability
                  </div>
                </div>
              </div>

              <div className="review-results">
                <h5>📊 Your Results:</h5>
                <div className="review-item">
                  <strong>Q1:</strong> {answers.q1 === correctAnswers.q1 ? '✅ Correct' : '❌ Incorrect'} 
                  {answers.q1 !== correctAnswers.q1 && <span className="correct-answer"> (POST: WebGoat uses POST for form submissions)</span>}
                </div>
                <div className="review-item">
                  <strong>Q2:</strong> {answers.q2 === correctAnswers.q2 ? '✅ Correct' : '❌ Incorrect'}
                  {answers.q2 !== correctAnswers.q2 && <span className="correct-answer"> (404: 404 represents "Not Found" HTTP status)</span>}
                </div>
                <div className="review-item">
                  <strong>Q3:</strong> {answers.q3 === correctAnswers.q3 ? '✅ Correct' : '❌ Incorrect'}
                  {answers.q3 !== correctAnswers.q3 && <span className="correct-answer"> (2: Proxies identify hidden parameters by intercepting traffic)</span>}
                </div>
                <div className="review-item">
                  <strong>Q4:</strong> {answers.q4 === correctAnswers.q4 ? '✅ Correct' : '❌ Incorrect'}
                  {answers.q4 !== correctAnswers.q4 && <span className="correct-answer"> (3: All HTTP traffic flows through proxy when enabled)</span>}
                </div>
                <div className="review-item">
                  <strong>Q5:</strong> {answers.q5 === correctAnswers.q5 ? '✅ Correct' : '❌ Incorrect'}
                  {answers.q5 !== correctAnswers.q5 && <span className="correct-answer"> (4: Stealing names/emails harms confidentiality)</span>}
                </div>
                <div className="review-item">
                  <strong>Q6:</strong> {answers.q6 === correctAnswers.q6 ? '✅ Correct' : '❌ Incorrect'}
                  {answers.q6 !== correctAnswers.q6 && <span className="correct-answer"> (1: Changing data harms integrity)</span>}
                </div>
                <div className="review-item">
                  <strong>Q7:</strong> {answers.q7 === correctAnswers.q7 ? '✅ Correct' : '❌ Incorrect'}
                  {answers.q7 !== correctAnswers.q7 && <span className="correct-answer"> (4: DoS attacks harm availability)</span>}
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="close-modal-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
