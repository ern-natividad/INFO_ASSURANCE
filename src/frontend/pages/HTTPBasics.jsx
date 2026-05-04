import React, { useState } from 'react';

export default function Page1() {
  const [name, setName] = useState('');
  const [reversedName, setReversedName] = useState('');
  const [httpVerb, setHttpVerb] = useState('');
  const [magicNumber, setMagicNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate reversing the name
    const reversed = name.split('').reverse().join('');
    setReversedName(reversed);
  };

  const detectHttpVerb = () => {
    // Simulate detecting if it's POST or GET
    const detected = Math.random() > 0.5 ? 'POST' : 'GET';
    setHttpVerb(detected);
  };

  const [magicAttempts, setMagicAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [correctMagicNumber] = useState(404);

  const findMagicNumber = () => {
    // Simulate finding the magic number
    const numbers = [143, 22, 404, 97];
    const found = numbers[Math.floor(Math.random() * numbers.length)];
    
    if (parseInt(magicNumber) === correctMagicNumber) {
      setMagicNumber(found);
      setShowHint(false);
    } else {
      setMagicAttempts(magicAttempts + 1);
      setShowHint(true);
    }
  };

  return (
    <div>
      <h3>HTTP Basics</h3>
      
      <div className="lesson-concept">
        <h4>Concept</h4>
        <p>
          This lesson presents the basics for understanding the transfer of data between browser and web application and how to trap a request/response with a HTTP proxy.
        </p>
        
        <h4>Goals</h4>
        <p>
          The user should become familiar with features of WebGoat by manipulating the above buttons to view hints, show HTTP request parameters, HTTP request cookies, and Java source code. You can use the default Developer Tools in your browser to view the HTTP request and response.
        </p>
        
        <h4>How HTTP Works</h4>
        <p>
          All HTTP transactions follow the same general format. Each client request and server response has three parts: the request or response line, a header section and an entity body.
        </p>
        
        <p>
          The client initiates a transaction as follows:
        </p>
        
        <p>
          The client contacts the server and sends a document request. A GET request can have URL parameters and those parameters will be available in the web access logs.
        </p>
        
        <div className="http-example">
          <h5>Example Request:</h5>
          <pre><code>{`GET /index.html?param=value HTTP/1.0
User-Agent: Mozilla/4.06 
Accept: image/gif,image/jpeg,/`}</code></pre>
        </div>
        
        <p>
          Next, the client sends optional header information to inform the server of its configuration and the document formats it will accept.
        </p>
        
        <div className="http-example">
          <h5>Example Headers:</h5>
          <pre><code>{`User-Agent: Mozilla/4.06 
Accept: image/gif,image/jpeg,/`}</code></pre>
        </div>
        
        <p>
          In a POST request, user supplied data will follow the optional headers and is not part of the URL contained within the POST URL.
        </p>
      </div>

            <div className="testing-section">
        <h4>🧪 How to Test This Quiz</h4>
        <p>
          This interactive quiz helps you understand HTTP methods before using WebGoat. Here's how to test each part:
        </p>
        
        <div className="testing-guide">
          <h5>Testing Name Reversal:</h5>
          <ul>
            <li><strong>What to test:</strong> Enter your name and click "Go!" to see if the server reverses it</li>
            <li><strong>Expected result:</strong> The server should display your name backwards (e.g., "john" becomes "nhoj")</li>
            <li><strong>How to verify:</strong> Use Developer Tools to inspect the HTTP request and see the reversed name in the response</li>
            <li><strong>Why this matters:</strong> Tests your understanding of how servers process and manipulate string data</li>
          </ul>
        </div>
      </div>

      <div className="testing-section">
        <h4>🧪 How to Test This Quiz</h4>
        <p>
          This interactive quiz helps you understand HTTP methods before using WebGoat. Here's how to test each part:
        </p>
        
        <div className="testing-guide">
          <h5>Testing GET vs POST Detection:</h5>
          <ul>
            <li><strong>Purpose:</strong> The detection randomly chooses between GET and POST to simulate how WebGoat determines the HTTP method</li>
            <li><strong>What to test:</strong> Click "Detect" multiple times to see the random selection in action</li>
            <li><strong>Expected behavior:</strong> Each click should show either GET or POST, demonstrating randomness</li>
            <li><strong>Learning goal:</strong> Understand that forms can use different HTTP methods depending on the action</li>
          </ul>
          
          <h5>Testing Magic Number Detection:</h5>
          <ul>
            <li><strong>Purpose:</strong> Tests your understanding of WebGoat's "magic number" feature</li>
            <li><strong>How it works:</strong> The system validates if your input matches the predefined magic number (42)</li>
            <li><strong>Strategy:</strong> Try different numbers, use hints when stuck, observe the pattern</li>
            <li><strong>Connection to HTTP:</strong> Magic numbers in WebGoat often relate to HTTP status codes or headers</li>
          </ul>
          
          <h5>Why This Matters:</h5>
          <p>
            These interactive elements simulate hands-on learning you'll experience in WebGoat. By mastering these concepts here, you'll be better prepared for the actual WebGoat exercises.
          </p>
        </div>
      </div>

      <div className="lesson-activity">
        <h4>Try It Activity</h4>
        <p>
          Enter your name in the input field below and press "Go!" to submit. The server will accept the request, reverse the input and display it back to the user, illustrating the basics of handling an HTTP request.
        </p>
        
        <div className="activity-box">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label><strong>Enter your name:</strong></label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="activity-input"
              />
            </div>
            <button type="submit" className="activity-btn">
              Go!
            </button>
          </form>
          
          {reversedName && (
            <div className="result-display">
              <p><strong>Server Response:</strong></p>
              <div className="reversed-name">
                Hello, {reversedName}!
              </div>
              <p><small>Use Developer Tools to see the HTTP request and response</small></p>
            </div>
          )}
        </div>
        
        <div className="activity-questions">
          <h5>The Quiz</h5>
          <div className="quiz-interactive">
            <p><strong>What type of HTTP verb does WebGoat use when submitting a form in this assignment? A POST or a GET? And can you find the magic number?</strong></p>
            <div className="quiz-options">
              <label>
                <input 
                  type="radio" 
                  name="verb" 
                  value="GET"
                  checked={httpVerb === 'GET'}
                  onChange={() => setHttpVerb('GET')}
                /> 
                GET
              </label>
              <label>
                <input 
                  type="radio" 
                  name="verb" 
                  value="POST"
                  checked={httpVerb === 'POST'}
                  onChange={() => setHttpVerb('POST')}
                /> 
                POST
              </label>
              <button 
                onClick={detectHttpVerb}
                className="detect-btn"
              >
                Detect
              </button>
            </div>
            <div className="quiz-result">
              <strong>Detected:</strong> {httpVerb || 'Not detected'}
            </div>
            
            <p><strong>Can you find the magic number?</strong></p>
            <div className="quiz-options">
              <input 
                type="text" 
                value={magicNumber}
                onChange={(e) => setMagicNumber(e.target.value)}
                placeholder="Enter magic number"
                className="activity-input"
              />
              <button 
                onClick={findMagicNumber}
                className="detect-btn"
              >
                Find Magic Number
              </button>
            </div>
            <div className="quiz-result">
              <strong>Magic Number:</strong> {magicNumber || 'Not found'}
              {showHint && (
                <div className="hint-section">
                  <p><strong>Hint:</strong> The magic number is "Not Found" - just like when a web page doesn't exist!</p>
                  {magicAttempts > 0 && (
                    <p><small>Attempts: {magicAttempts} - Keep trying! The correct number is hidden in the HTTP response headers.</small></p>
                  )}
                </div>
              )}
              {parseInt(magicNumber) === correctMagicNumber && (
                <div className="success-message">
                  <p>🎉 Correct! You found the magic number!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="webgoat-link">
        <h4>🚀 Practice on WebGoat</h4>
        <p>Visit our WebGoat instance to complete the HTTP Basics lesson:</p>
        <a href="https://8080-cs-749204404123-default.cs-asia-east1-duck.cloudshell.dev" target="_blank" className="webgoat-btn">
          Access WebGoat HTTP Basics Lesson →
        </a>
      </div>
    </div>
  );
}
