import React, { useState } from "react";
import "../App.css";
import AlertModal from "../components/AlertModal";

export default function TryItActivities() {
  const [name, setName] = useState("");
  const [reversedName, setReversedName] = useState("");
  const [httpVerb, setHttpVerb] = useState("");
  const [magicNumber, setMagicNumber] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [proxyEnabled, setProxyEnabled] = useState(false);
  const [selectedHeader, setSelectedHeader] = useState("");
  const [hiddenParam, setHiddenParam] = useState("");
  const [httpMethod, setHttpMethod] = useState("");
  const [confidentialityHarm, setConfidentialityHarm] = useState("");
  const [integrityHarm, setIntegrityHarm] = useState("");
  const [availabilityHarm, setAvailabilityHarm] = useState("");

  // Modal state
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  const showModal = (title, message, type = "info") => {
    setModal({ isOpen: true, title, message, type });
  };

  const closeModal = () => {
    setModal({ isOpen: false, title: "", message: "", type: "info" });
  };

  // ALL LOGIC PRESERVED FROM ORIGINAL
  const handleNameReversal = () =>
    setReversedName(name.split("").reverse().join(""));
  const handleHttpVerbCheck = () => {
    if (httpVerb.toLowerCase() === "post") {
      showModal(
        "Correct!",
        "✅ WebGoat uses POST for form submissions.",
        "success",
      );
    } else {
      showModal(
        "Try Again",
        "❌ What HTTP method does WebGoat use for forms?",
        "error",
      );
    }
  };
  const handleMagicNumber = () => {
    if (magicNumber === "404") {
      showModal(
        "Correct!",
        '🎉 404 is the "Not Found" HTTP status code.',
        "success",
      );
    } else {
      setShowHint(true);
    }
  };
  const handleProxyToggle = () => {
    setProxyEnabled(!proxyEnabled);
    showModal(
      "Proxy Status",
      `Proxy ${!proxyEnabled ? "enabled" : "disabled"}. All HTTP traffic will ${!proxyEnabled ? "flow through" : "go directly to"} the server.`,
      "info",
    );
  };
  const handleHeaderSelection = () => {
    if (selectedHeader === "User-Agent") {
      showModal(
        "Correct!",
        "✅ User-Agent header reveals browser information.",
        "success",
      );
    } else {
      showModal("Try Again", "❌ Which header reveals browser type?", "error");
    }
  };
  const handleHiddenParam = () => {
    if (hiddenParam === "admin") {
      showModal(
        "Found!",
        "🔍 Hidden parameters can expose admin functionality.",
        "success",
      );
    } else {
      showModal(
        "Try Again",
        "❌ What common admin parameter name might be hidden?",
        "error",
      );
    }
  };
  const handleHttpMethodDetect = () => {
    if (httpMethod.toLowerCase() === "get") {
      showModal("Correct!", "✅ GET is used for retrieving data.", "success");
    } else {
      showModal(
        "Try Again",
        "❌ What method is most common for data retrieval?",
        "error",
      );
    }
  };
  const handleConfidentiality = () => {
    if (
      confidentialityHarm.toLowerCase().includes("steal database") ||
      confidentialityHarm.toLowerCase().includes("upload data")
    ) {
      showModal(
        "Correct!",
        "🚨 Stealing or uploading sensitive data harms confidentiality.",
        "warning",
      );
    } else {
      showModal(
        "Try Again",
        "❌ How do attackers breach data privacy?",
        "error",
      );
    }
  };
  const handleIntegrity = () => {
    if (
      integrityHarm.toLowerCase().includes("modify data") ||
      integrityHarm.toLowerCase().includes("change records")
    ) {
      showModal(
        "Correct!",
        "⚠️ Unauthorized data modification harms integrity.",
        "warning",
      );
    } else {
      showModal(
        "Try Again",
        "❌ How do attackers tamper with information?",
        "error",
      );
    }
  };
  const handleAvailability = () => {
    if (
      availabilityHarm.toLowerCase().includes("dos attack") ||
      availabilityHarm.toLowerCase().includes("server crash")
    ) {
      showModal(
        "Correct!",
        "🚫 DoS attacks make services unavailable.",
        "warning",
      );
    } else {
      showModal(
        "Try Again",
        "❌ What attack prevents legitimate users from accessing services?",
        "error",
      );
    }
  };

  return (
    <div className="activities-container">
      <div className="activities-header">
        <h3>Try It Activities - All Lessons</h3>
        <p style={{ color: "#64748b" }}>
          Practice security concepts with hands-on activities from all lessons:
        </p>
      </div>

      {/* HTTP Basics Section */}
      <div className="lesson-section">
        <div className="lesson-summary">
          <h4>HTTP Basics - WebGoat Lesson</h4>
          <div className="summary-content">
            <h5>Lesson Summary:</h5>
            <p>
              HTTP (Hypertext Transfer Protocol) is the foundation of web
              communication. Understanding HTTP requests, responses, and methods
              is crucial for web security.
            </p>
            <div className="key-concepts">
              <strong>Key Concepts:</strong>
              <ul>
                <li>HTTP methods (GET, POST, PUT, DELETE)</li>
                <li>Status codes (200, 404, 500)</li>
                <li>Request/response structure</li>
                <li>Headers and parameters</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="activity-box">
          <h5>Name Reversal</h5>
          <p>Test string manipulation like in WebGoat:</p>
          <div className="input-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
            <button onClick={handleNameReversal}>Reverse Name</button>
          </div>
          {reversedName && (
            <div className="result-display">Reversed: {reversedName}</div>
          )}
        </div>

        <div className="activity-box">
          <h5>HTTP Verb Detection</h5>
          <p>What HTTP verb does WebGoat use for form submissions?</p>
          <div className="input-group">
            <input
              type="text"
              value={httpVerb}
              onChange={(e) => setHttpVerb(e.target.value)}
              placeholder="Enter HTTP verb (GET, POST, etc.)"
            />
            <button onClick={handleHttpVerbCheck}>Check Verb</button>
          </div>
        </div>

        <div className="activity-box">
          <h5>Magic Number Challenge</h5>
          <p>Find the magic number (hint: related to HTTP "Not Found"):</p>
          <div className="input-group">
            <input
              type="text"
              value={magicNumber}
              onChange={(e) => setMagicNumber(e.target.value)}
              placeholder="Enter the magic number"
            />
            <button onClick={handleMagicNumber}>Submit Number</button>
          </div>
          {showHint && (
            <div className="hint">
              💡 <strong>Hint:</strong> The magic number is 404 - the HTTP
              status code for "Not Found"!
            </div>
          )}
        </div>
      </div>

      {/* HTTP Proxies Section */}
      <div className="lesson-section">
        <div className="lesson-summary">
          <h4>HTTP Proxies - WebGoat Lesson</h4>
          <div className="summary-content">
            <h5>Lesson Summary:</h5>
            <p>
              HTTP proxies intercept and analyze web traffic between clients and
              servers. They're essential for security testing and debugging.
            </p>
            <div className="key-concepts">
              <strong>Key Concepts:</strong>
              <ul>
                <li>Proxy configuration and setup</li>
                <li>Request/response interception</li>
                <li>Header analysis and modification</li>
                <li>Hidden parameter discovery</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="activity-box">
          <h5>Proxy Configuration</h5>
          <p>Enable/disable proxy to see how traffic flows:</p>
          <div className="input-group">
            <button
              onClick={handleProxyToggle}
              className={proxyEnabled ? "proxy-enabled" : "proxy-disabled"}
            >
              {proxyEnabled ? "🟢 Proxy Enabled" : "🔴 Proxy Disabled"}
            </button>
          </div>
        </div>

        <div className="activity-box">
          <h5>Header Analysis</h5>
          <p>Which header reveals browser information?</p>
          <div className="input-group">
            <select
              value={selectedHeader}
              onChange={(e) => setSelectedHeader(e.target.value)}
            >
              <option value="">Select a header...</option>
              <option value="User-Agent">User-Agent</option>
              <option value="Accept">Accept</option>
              <option value="Authorization">Authorization</option>
              <option value="Cookie">Cookie</option>
            </select>
            <button onClick={handleHeaderSelection}>Analyze Header</button>
          </div>
        </div>

        <div className="activity-box">
          <h5>Hidden Parameter Detection</h5>
          <div className="input-group">
            <input
              type="text"
              value={hiddenParam}
              onChange={(e) => setHiddenParam(e.target.value)}
              placeholder="Enter suspected hidden parameter"
            />
            <button onClick={handleHiddenParam}>Check for Hidden Params</button>
          </div>
        </div>

        <div className="activity-box">
          <h5>HTTP Method Detection</h5>
          <div className="input-group">
            <input
              type="text"
              value={httpMethod}
              onChange={(e) => setHttpMethod(e.target.value)}
              placeholder="Enter observed HTTP method"
            />
            <button onClick={handleHttpMethodDetect}>Detect Method</button>
          </div>
        </div>
      </div>

      {/* CIA Triad Section */}
      <div className="lesson-section">
        <div className="lesson-summary">
          <h4>CIA Triad - WebGoat Lesson</h4>
          <div className="summary-content">
            <h5>Lesson Summary:</h5>
            <p>
              The CIA Triad represents the three core principles:
              Confidentiality, Integrity, and Availability.
            </p>
            <div className="key-concepts">
              <strong>Key Concepts:</strong>
              <ul>
                <li>Confidentiality - Data Privacy</li>
                <li>Integrity - Data Accuracy</li>
                <li>Availability - Reliable Access</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="activity-box">
          <h5>Confidentiality Breach</h5>
          <div className="input-group">
            <input
              type="text"
              value={confidentialityHarm}
              onChange={(e) => setConfidentialityHarm(e.target.value)}
              placeholder="Describe a confidentiality attack"
            />
            <button onClick={handleConfidentiality}>
              Test Confidentiality
            </button>
          </div>
        </div>

        <div className="activity-box">
          <h5>Integrity Attack</h5>
          <div className="input-group">
            <input
              type="text"
              value={integrityHarm}
              onChange={(e) => setIntegrityHarm(e.target.value)}
              placeholder="Describe an integrity attack"
            />
            <button onClick={handleIntegrity}>Test Integrity</button>
          </div>
        </div>

        <div className="activity-box">
          <h5>Availability Attack</h5>
          <div className="input-group">
            <input
              type="text"
              value={availabilityHarm}
              onChange={(e) => setAvailabilityHarm(e.target.value)}
              placeholder="Describe an availability attack"
            />
            <button onClick={handleAvailability}>Test Availability</button>
          </div>
        </div>
      </div>

      {/* Practice on WebGoat Card */}
      <div className="webgoat-external-card">
        <div className="webgoat-card-content">
          <div className="webgoat-info">
            <div className="webgoat-badge">HANDS-ON LAB</div>
            <h4>Ready to apply your skills?</h4>
            <p>
              Launch the official WebGoat environment in Google Cloud to
              practice these vulnerabilities in a safe, sandboxed environment.
            </p>
          </div>

          <div className="webgoat-action-zone">
            <div className="instruction-mini-list">
              <span>
                1️⃣ Go to <strong>shell.cloud.google.com</strong>
              </span>
              <span>
                2️⃣ Run <code className="path-text">java -jar webgoat.jar</code>
              </span>
              <span>
                3️⃣ Click <strong>Web Preview → Port 8080</strong>
              </span>
              <span>
                4️⃣ Navigate to <code className="path-text">/WebGoat</code>
              </span>
            </div>
            <a
              href="https://shell.cloud.google.com"
              target="_blank"
              className="launch-instance-btn"
              rel="noreferrer"
            >
              Open Google Cloud Shell
            </a>
          </div>
        </div>
      </div>

      <div className="completion-note">
        <h4>Comprehensive Learning</h4>
        <ul>
          <li>HTTP manipulation mastered</li>
          <li>Proxy & traffic analysis practiced</li>
          <li>CIA Triad principles applied</li>
        </ul>
        <p>
          <strong>Status:</strong> 100% Complete
        </p>
      </div>

      {/* Alert Modal */}
      <AlertModal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </div>
  );
}
