import React, { useState } from 'react';
import '../App.css';

export default function BrokenAuthentication() {
  const [attempts, setAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [currentPassword, setCurrentPassword] = useState('');
  const [bruteForceResult, setBruteForceResult] = useState('');
  const passwordList = ['admin', 'password', '123456', 'admin123', 'qwerty'];

  const simulateBruteForce = () => {
    let found = passwordList.some(p => p === currentPassword.toLowerCase());
    setBruteForceResult(found 
      ? `PASSWORD CRACKED! This weak password is in the common list.` 
      : `Password not found in common lists. This is a better start!`);
  };

  const simulateLockout = () => {
    if (attempts < 3) {
      setAttempts(prev => prev + 1);
    } else {
      setLockoutTime(24);
    }
  };

  return (
    <div className="lesson-container">
      <div className="auth-header">
        <h3>Broken Authentication Techniques</h3>
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Left Column: Icons and Definitions */}
        <div className="vulnerability-grid" style={{ flex: 1 }}>
          <div className="vuln-card">
            <span style={{fontSize: '2rem'}}>🔒</span>
            <h5>Weak Password Policies</h5>
            <p>Weak password policies are a danger for web security.</p>
          </div>
          <div className="vuln-card">
            <span style={{fontSize: '2rem'}}>🛑</span>
            <h5>No Rate Limiting</h5>
            <p>Allows attackers to try unlimited login combinations.</p>
          </div>
          <div className="vuln-card">
            <span style={{fontSize: '2rem'}}>🕵️</span>
            <h5>Session Fixation</h5>
            <p>Masked hijacks and session-based identity theft.</p>
          </div>
          <div className="vuln-card">
            <span style={{fontSize: '2rem'}}>📂</span>
            <h5>Information Disclosure</h5>
            <p>Informed data leaks through error messages.</p>
          </div>
        </div>

        {/* Right Column: Simulations */}
        <div className="sim-container" style={{ flex: 2, display: 'flex', gap: '1rem' }}>
          <div className="sim-card" style={{ flex: 1.5 }}>
            <h4>Brute Force Attack Simulation</h4>
            <div className="code-box">
              passwordList = [<br/>
              {passwordList.map(p => `'${p}'`).join(', ')}<br/>
              ]
            </div>
            <label>Test Password:</label>
            <input 
              type="password" 
              className="input-field"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
            />
            <button className="btn-primary" onClick={simulateBruteForce}>
              Simulate Brute Force Attack
            </button>
            {bruteForceResult && (
              <div className={bruteForceResult.includes('CRACKED') ? "result-danger" : "result-success"}>
                {bruteForceResult}
              </div>
            )}
          </div>

          <div className="sim-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h4>Rate Limiting Demo</h4>
            <p>Failed attempts: <span style={{ color: 'red', fontWeight: 'bold' }}>{attempts}/3</span></p>
            
            <button 
              className="btn-primary" 
              style={{ background: '#e2e8f0', color: '#64748b', marginBottom: '1rem' }}
              onClick={simulateLockout}
              disabled={lockoutTime > 0}
            >
              {lockoutTime > 0 ? "System Locked" : "Simulate Failed Login"}
            </button>
            
            {/* The Result Alert (Stays middle) */}
            {lockoutTime > 0 && (
              <div className="lockout-alert" style={{ marginBottom: '1rem' }}>
                <span>🔒</span> Account locked for {lockoutTime}s
              </div>
            )}

            {/* New Content to fill the space and explain the logic */}
            <div className="sim-info-footer" style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
              <h6 style={{ margin: '0 0 5px 0', color: '#475569' }}>Why this matters:</h6>
              <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: '1.4', margin: 0 }}>
                Without rate limiting, an attacker can use automated scripts to try thousands of passwords per second. 
              </p>
              <div style={{ marginTop: '10px', background: '#f8fafc', padding: '8px', borderRadius: '4px', fontSize: '0.75rem', border: '1px dashed #cbd5e1' }}>
                <strong>💡 Pro Tip:</strong> Implement <em>Exponential Backoff</em> where the wait time doubles after every failed attempt (e.g., 2s, 4s, 8s...).
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="solution-footer" style={{marginTop: '2rem'}}>
        <h4>Secure Solutions</h4>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '1rem'}}>
          <div>
            <strong>🛡️ Strong Password Policies</strong>
            <ul style={{fontSize: '0.85rem', color: '#64748b', paddingLeft: '1rem'}}>
              <li>Recruit robust password policies</li>
              <li>Check against common breaches</li>
            </ul>
          </div>
          <div>
            <strong>⏳ Rate Limiting</strong>
            <ul style={{fontSize: '0.85rem', color: '#64748b', paddingLeft: '1rem'}}>
              <li>Simulate limiting intended logins</li>
              <li>Requires account lockouts</li>
            </ul>
          </div>
          <div>
            <strong>🔗 Secure Session Management</strong>
            <ul style={{fontSize: '0.85rem', color: '#64748b', paddingLeft: '1rem'}}>
              <li>Secure session management risks</li>
              <li>Prevent session hijacking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}