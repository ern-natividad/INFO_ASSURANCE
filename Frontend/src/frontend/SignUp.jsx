import { useState } from "react";
import "../Login.css";

const BANNED = ["123admin", "123456", "qwerty", "admin", "password", "letmein"];

function isAlphanumeric(s) {
  return /^[A-Za-z0-9]+$/.test(s);
}
function hasLetterAndNumber(s) {
  return /[A-Za-z]/.test(s) && /\d/.test(s);
}
function containsSqlLike(s) {
  if (!s) return false;
  return /\b(select|insert|update|delete|drop|union|exec|declare)\b|--|;|\/\*|\*\/|\bor\b|\band\b|=|'|"|<|>/.test(
    s.toLowerCase(),
  );
}
function containsXssLike(s) {
  if (!s) return false;
  return /<script|<\/script>|javascript:|onload=|onerror=|onclick=/i.test(s);
}
function validateUsername(username) {
  if (!username || username.length < 3) return false;
  if (username.length > 20) return false;
  if (!isAlphanumeric(username)) return false;
  return true;
}

function getPasswordStrength(password) {
  if (!password) return { score: 0, level: "No password", color: "#d1d5db" };

  let score = 0;

  // Length scoring
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;

  // Variety scoring
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (hasLower) score += 1;
  if (hasUpper) score += 1;
  if (hasNumber) score += 1;

  // Check for repetitive patterns
  if (!/(.)\1{2,}/.test(password)) score += 1; // No 3+ repeated chars

  // Determine strength level
  let level, color;
  if (score <= 2) {
    level = "Weak";
    color = "#dc2626";
  } else if (score <= 4) {
    level = "Fair";
    color = "#ea580c";
  } else if (score <= 6) {
    level = "Good";
    color = "#ca8a04";
  } else {
    level = "Strong";
    color = "#16a34a";
  }

  return { score: Math.min(score, 7), level, color, maxScore: 7 };
}

export default function SignUp({ onSwitchToLogin = () => {} }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordStrength = getPasswordStrength(password);
  const isStrongPassword = passwordStrength.score >= 5;

  function validate() {
    // Username validation
    if (!username.trim()) return { ok: false, message: "Username is required" };
    if (!validateUsername(username))
      return { ok: false, message: "Username must be 3-20 alphanumeric characters" };
    
    // Password validation
    if (!password || password.length < 8)
      return { ok: false, message: "Password must be at least 8 characters" };
    if (password.length > 128)
      return { ok: false, message: "Password is too long" };
    if (!isAlphanumeric(password))
      return {
        ok: false,
        message: "Password must be alphanumeric (letters and digits only)",
      };
    if (!hasLetterAndNumber(password))
      return {
        ok: false,
        message: "Password must include letters and numbers",
      };
    
    // Check password strength
    if (!isStrongPassword)
      return { ok: false, message: "Password is not strong enough. Use a mix of uppercase, lowercase, and numbers." };
    
    // Confirm password
    if (password !== confirmPassword)
      return { ok: false, message: "Passwords do not match" };
    
    // Security checks
    const low = password.toLowerCase();
    for (const b of BANNED) {
      if (low.includes(b))
        return {
          ok: false,
          message: "Password contains a forbidden substring",
        };
    }
    if (containsSqlLike(password) || containsSqlLike(username))
      return { ok: false, message: "Input contains unsafe patterns" };
    if (containsXssLike(password) || containsXssLike(username))
      return { ok: false, message: "Input contains potentially dangerous content" };
    
    return { ok: true };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    const v = validate();
    if (!v.ok) {
      setMessage(v.message);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✓ Account created successfully! Please log in.");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => onSwitchToLogin(), 2000);
      } else {
        setMessage(data?.error || "Sign up failed");
      }
    } catch (err) {
      setMessage("Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-root">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h2>Create Account</h2>
        <label className="field">
          <span>Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </label>

        <label className="field">
          <span>Password</span>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
              style={{ width: "100%", paddingRight: "40px" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "12px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "20px",
                padding: "0",
                color: "#6b7280"
              }}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {password && (
            <div style={{ display: "flex", gap: "6px", alignItems: "center", marginTop: "4px" }}>
              <div style={{ flex: 1, height: "6px", backgroundColor: "#e5e7eb", borderRadius: "3px", overflow: "hidden" }}>
                <div 
                  style={{
                    height: "100%",
                    width: `${(passwordStrength.score / passwordStrength.maxScore) * 100}%`,
                    backgroundColor: passwordStrength.color,
                    transition: "width 0.3s ease"
                  }}
                />
              </div>
              <span style={{ fontSize: "12px", fontWeight: "600", color: passwordStrength.color, minWidth: "60px" }}>
                {passwordStrength.level}
              </span>
            </div>
          )}
          {password && !isStrongPassword && (
            <small style={{ color: "#6b7280", marginTop: "4px" }}>
              💡 Mix uppercase, lowercase, and numbers for a stronger password
            </small>
          )}
        </label>

        <label className="field">
          <span>Confirm Password</span>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
              style={{ width: "100%", paddingRight: "40px" }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: "absolute",
                right: "12px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "20px",
                padding: "0",
                color: "#6b7280"
              }}
              title={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </label>

        {message && <div className={`message ${message.startsWith("✓") ? "success" : ""}`}>{message}</div>}

        <button type="submit" className="submit" disabled={loading || (password && !isStrongPassword)}>
          {loading ? "Creating account…" : "Sign up"}
        </button>

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <p>Already have an account? <button type="button" onClick={onSwitchToLogin} style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer", textDecoration: "underline" }}>Sign in</button></p>
        </div>
      </form>
    </div>
  );
}
