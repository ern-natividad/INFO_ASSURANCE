import React, { useState } from "react";
import "../App.css";

export default function SQLInjection() {
  const [activeLesson, setActiveLesson] = useState(1); // 1, 2, or 3
  const [userInput, setUserInput] = useState("");
  const [injectionResult, setInjectionResult] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const mockDatabase = [
    {
      id: 101,
      name: "Villanueva",
      position: "Manager",
      salary: "$85,000",
      department: "Sales",
    },
    {
      id: 102,
      name: "Ignacio",
      position: "Developer",
      salary: "$70,000",
      department: "IT",
    },
    {
      id: 103,
      name: "Natividad",
      position: "CEO",
      salary: "$250,000",
      department: "Executive",
    },
  ];

  const lessons = {
    1: {
      title: "Lesson 1: String Injection",
      goal: "Retrieve ALL employees using a string bypass.",
      query: (val) =>
        `SELECT * FROM employees WHERE last_name = '${val || "____"}'`,
      check: (val) =>
        val.includes("' OR '1'='1") || val.includes("' or '1'='1"),
    },
    2: {
      title: "Lesson 2: Numeric Injection",
      goal: "Numeric fields don't use quotes. Bypass the ID check.",
      query: (val) =>
        `SELECT * FROM employees WHERE user_id = ${val || "____"}`,
      check: (val) => val.includes("1 OR 1=1") || val.includes("101 OR 1=1"),
    },
    3: {
      title: "Lesson 3: Query Commenting",
      goal: "Use SQL comments (--) to ignore the rest of the server's code.",
      query: (val) =>
        `SELECT * FROM employees WHERE last_name = '${val || "____"}' AND status = 'ACTIVE'`,
      check: (val) => val.includes("'--") || val.includes("' --"),
    },
  };

  const handleFetchData = () => {
    const lesson = lessons[activeLesson];
    const isInjected = lesson.check(userInput);

    if (isInjected) {
      setInjectionResult({
        status: "SQL INJECTION SUCCESSFUL",
        message: `Exploited Query: ${lesson.query(userInput)}`,
        data: mockDatabase,
      });
    } else {
      const found = mockDatabase.filter((emp) =>
        activeLesson === 2
          ? emp.id.toString() === userInput
          : emp.name.toLowerCase() === userInput.toLowerCase(),
      );
      setInjectionResult({
        status: found.length > 0 ? "✅ Query Executed" : "ℹ️ No Results",
        message: `Standard Query: ${lesson.query(userInput)}`,
        data: found,
      });
    }
  };

  const switchLesson = (id) => {
    setActiveLesson(id);
    setUserInput("");
    setInjectionResult(null);
    setShowHint(false);
  };

  return (
    <div className="lesson-container">
      <div className="lesson-content fade-in-content">
        <div className="sql-header">
          <h1>SQL Injection Intro Laboratory</h1>
          <div className="lesson-tabs">
            <button
              className={activeLesson === 1 ? "tab-btn active" : "tab-btn"}
              onClick={() => switchLesson(1)}
            >
              1. String SQLi
            </button>
            <button
              className={activeLesson === 2 ? "tab-btn active" : "tab-btn"}
              onClick={() => switchLesson(2)}
            >
              2. Numeric SQLi
            </button>
            <button
              className={activeLesson === 3 ? "tab-btn active" : "tab-btn"}
              onClick={() => switchLesson(3)}
            >
              3. Commenting
            </button>
          </div>
        </div>

        {/* Educational Section */}
        <div className="sql-explainer">
          <h2>What is SQL Injection?</h2>
          <p>
            <strong>SQL Injection (SQLi)</strong> is a vulnerability where an
            attacker &ldquo;injects&rdquo; malicious code into a database query.
            It happens when an application fails to properly sanitize user
            input, allowing that input to be executed as a command rather than
            being treated as simple data.
          </p>

          <h3>The Attack Flow</h3>
          <ol className="attack-flow-list">
            <li>
              <span className="step-label">Input Manipulation</span> — An
              attacker enters special characters, like a single quote (
              <code>'</code>), into an input field.
            </li>
            <li>
              <span className="step-label">Breaking Syntax</span> — This quote
              &ldquo;breaks out&rdquo; of the developer&apos;s intended text
              string, ending the legitimate command early.
            </li>
            <li>
              <span className="step-label">Command Injection</span> — The
              attacker adds new SQL keywords (like <code>OR</code>,{" "}
              <code>AND</code>, or <code>--</code>).
            </li>
            <li>
              <span className="step-label">Logic Alteration</span> — By
              appending a condition that is always true (e.g., <code>1=1</code>
              ), the attacker forces the database to ignore security filters.
            </li>
            <li>
              <span className="step-label">Execution</span> — The database runs
              the modified query, potentially exposing sensitive data or
              bypassing login screens.
            </li>
          </ol>

          <div className="sql-fix-box">
            <h3>The Fix</h3>
            <p>
              The primary cause of SQLi is <strong>string concatenation</strong>{" "}
              (manually building queries with user input). To prevent it, always
              use <strong>Prepared Statements</strong> or{" "}
              <strong>Parameterized Queries</strong>, which keep data and code
              strictly separated.
            </p>
          </div>
        </div>

        <div className="sql-info-grid">
          <div className="sql-card definition">
            <h4>{lessons[activeLesson].title}</h4>
            <p>{lessons[activeLesson].goal}</p>
          </div>

          <div className="sql-card impact">
            <h4>How to Solve</h4>
            <p>
              {activeLesson === 1 && (
                <span>
                  Try breaking the string: <code>' OR '1'='1</code>
                </span>
              )}
              {activeLesson === 2 && (
                <span>
                  No quotes needed here! Try: <code>1 OR 1=1</code>
                </span>
              )}
              {activeLesson === 3 && (
                <span>
                  Break the string and comment out the rest: <code>' --</code>
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="sql-lab-box">
          <div className="lab-header">
            <h4>
              {activeLesson === 2
                ? "Search by Employee ID"
                : "Search by Last Name"}
            </h4>
          </div>

          <div className="lab-layout">
            <div className="lab-form">
              <div className="sql-input-group">
                <label>
                  {activeLesson === 2 ? "Enter ID:" : "Enter Last Name:"}
                </label>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={activeLesson === 2 ? "101" : "Smith"}
                  className="sql-input"
                />
              </div>
              <button className="sql-btn-test" onClick={handleFetchData}>
                Execute Query
              </button>
            </div>

            <div className="lab-visualizer">
              {/* Flex container to hold the title and the button on the same line */}
              <div className="visualizer-header">
                <h5>Server-Side Query Visualizer</h5>
                <button
                  className="hint-toggle-small"
                  onClick={() => setShowHint(!showHint)}
                >
                  {showHint ? "Hide Hint" : "Show Hint"}
                </button>
              </div>

              <div className="sql-code-display">
                <code>{lessons[activeLesson].query(userInput)}</code>
              </div>

              {/* Hint bubble stays below the code box */}
              {showHint && (
                <div className="sql-hint-bubble">
                  {activeLesson === 2
                    ? "Since there are no quotes around the ID, you don't need a leading quote. Just append the OR statement directly."
                    : "The -- characters tell the database to ignore everything that follows on that line."}
                </div>
              )}
            </div>
          </div>

          {injectionResult && (
            <div
              className={`sql-result-area ${injectionResult.status.includes("ℹ️") ? "danger" : "success"}`}
            >
              <h5>{injectionResult.status}</h5>
              <code className="query-log">{injectionResult.message}</code>
              {injectionResult.data.length > 0 && (
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {injectionResult.data.map((emp, i) => (
                      <tr key={i}>
                        <td>{emp.id}</td>
                        <td>{emp.name}</td>
                        <td>{emp.position}</td>
                        <td
                          className={
                            injectionResult.status.includes("🚨")
                              ? "red-text"
                              : ""
                          }
                        >
                          {emp.salary}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
