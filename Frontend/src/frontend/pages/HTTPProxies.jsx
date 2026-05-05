import React, { useState } from 'react';

export default function Page2() {
  const [selectedHeaders, setSelectedHeaders] = useState([]);
  const [hiddenParams, setHiddenParams] = useState([]);
  const [httpMethod, setHttpMethod] = useState('');
  const [proxyConfig, setProxyConfig] = useState({
    enabled: false,
    port: '',
    host: ''
  });

  const handleHeaderToggle = (header) => {
    setSelectedHeaders(prev => 
      prev.includes(header) 
        ? prev.filter(h => h !== header)
        : [...prev, header]
    );
  };

  const findHiddenParams = () => {
    const params = ['session_id', 'csrf_token', 'api_key', 'debug_mode'];
    const found = params.filter(() => Math.random() > 0.5);
    setHiddenParams(found);
  };

  const detectHttpMethod = () => {
    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
    const detected = methods[Math.floor(Math.random() * methods.length)];
    setHttpMethod(detected);
  };

  const toggleProxy = () => {
    setProxyConfig(prev => ({
      ...prev,
      enabled: !prev.enabled
    }));
  };

  return (
    <div>
      <h3>HTTP Proxies</h3>
      
      <div className="lesson-concept">
        <h4>Concept</h4>
        <p>
          HTTP proxies allow you to intercept and modify HTTP requests and responses between your browser and the web server. This is essential for understanding web application security and debugging.
        </p>
        
        <h4>How Proxies Work</h4>
        <p>
          When you configure a proxy, all HTTP traffic flows through the proxy server first. The proxy can:
        </p>
        <ul>
          <li>Intercept requests before they reach the server</li>
          <li>Modify request parameters and headers</li>
          <li>View and analyze server responses</li>
          <li>Inject malicious payloads for testing</li>
        </ul>
        
        <h4>Proxy Benefits for Security Testing</h4>
        <ul>
          <li><strong>Request Analysis:</strong> See exactly what your browser sends</li>
          <li><strong>Response Inspection:</strong> Analyze server responses</li>
          <li><strong>Parameter Manipulation:</strong> Test different input values</li>
          <li><strong>Header Modification:</strong> Test security headers</li>
        </ul>
      </div>

      <div className="testing-section">
        <h4>🧪 How to Test This Quiz</h4>
        <div className="testing-guide">
          <h5>Testing Proxy Configuration:</h5>
          <ul>
            <li><strong>What to test:</strong> Toggle proxy on/off to see how it affects traffic interception</li>
            <li><strong>Expected result:</strong> When enabled, all HTTP traffic should flow through the proxy</li>
            <li><strong>How to verify:</strong> Check proxy logs to see captured requests</li>
            <li><strong>Why this matters:</strong> Proxies help you understand HTTP communication patterns</li>
          </ul>
        </div>
      </div>

      <div className="lesson-activity">
        <h4>Proxy Configuration Activity</h4>
        
        <div className="activity-box">
          <h5>Proxy Setup Simulator</h5>
          <div className="proxy-config">
            <div className="proxy-toggle">
              <label>
                <input 
                  type="checkbox" 
                  checked={proxyConfig.enabled}
                  onChange={toggleProxy}
                />
                Enable Proxy
              </label>
            </div>
            
            {proxyConfig.enabled && (
              <div className="proxy-settings">
                <div className="input-group">
                  <label><strong>Proxy Host:</strong></label>
                  <input 
                    type="text" 
                    value={proxyConfig.host}
                    onChange={(e) => setProxyConfig(prev => ({...prev, host: e.target.value}))}
                    placeholder="localhost"
                    className="activity-input"
                  />
                </div>
                <div className="input-group">
                  <label><strong>Proxy Port:</strong></label>
                  <input 
                    type="text" 
                    value={proxyConfig.port}
                    onChange={(e) => setProxyConfig(prev => ({...prev, port: e.target.value}))}
                    placeholder="8080"
                    className="activity-input"
                  />
                </div>
              </div>
            )}
            
            <div className="proxy-status">
              <strong>Proxy Status:</strong> {proxyConfig.enabled ? '🟢 Active' : '🔴 Inactive'}
              {proxyConfig.enabled && (
                <p><small>Traffic is being intercepted at {proxyConfig.host || 'localhost'}:{proxyConfig.port || '8080'}</small></p>
              )}
            </div>
          </div>
        </div>

        <div className="activity-questions">
          <h5>Interactive Proxy Testing</h5>
          
          <div className="quiz-interactive">
            <p><strong>What HTTP headers can you modify through a proxy?</strong></p>
            <div className="header-selection">
              {['User-Agent', 'Authorization', 'Cookie', 'Referer', 'Accept-Language'].map(header => (
                <label key={header} className="header-checkbox">
                  <input 
                    type="checkbox" 
                    checked={selectedHeaders.includes(header)}
                    onChange={() => handleHeaderToggle(header)}
                  />
                  {header}
                </label>
              ))}
            </div>
            <div className="quiz-result">
              <strong>Selected Headers:</strong> {selectedHeaders.length > 0 ? selectedHeaders.join(', ') : 'None selected'}
            </div>
            
            <p><strong>How can you identify hidden parameters in requests?</strong></p>
            <button onClick={findHiddenParams} className="detect-btn">
              Find Hidden Parameters
            </button>
            <div className="quiz-result">
              <strong>Hidden Parameters Found:</strong> {hiddenParams.length > 0 ? hiddenParams.join(', ') : 'Click to search'}
            </div>
            
            <p><strong>What's the difference between GET and POST in proxy analysis?</strong></p>
            <button onClick={detectHttpMethod} className="detect-btn">
              Detect HTTP Method
            </button>
            <div className="quiz-result">
              <strong>Detected Method:</strong> {httpMethod || 'Click to detect'}
            </div>
          </div>
        </div>
      </div>

      <div className="webgoat-link">
        <h4>🚀 Practice on WebGoat</h4>
        <p>Visit our WebGoat instance to complete the HTTP Proxies lesson:</p>
        <a href="https://8080-cs-749204404123-default.cs-asia-east1-duck.cloudshell.dev" target="_blank" className="webgoat-btn">
          Access WebGoat HTTP Proxies Lesson →
        </a>
      </div>
    </div>
  );
}
