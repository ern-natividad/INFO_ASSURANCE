import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function Login({ onLogin = () => {}, onSwitchToSignUp = () => {} }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Login successful");
        try {
          onLogin();
          navigate("/");
        } catch (e) {
          /* ignore */
        }
      } else {
        setMessage(data?.error || "Login failed");
      }
    } catch (err) {
      setMessage("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-root">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h2>Sign in</h2>
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
              autoComplete="current-password"
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
        </label>

        {message && <div className="message">{message}</div>}

        <button type="submit" className="submit" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <p>Don't have an account? <button type="button" onClick={onSwitchToSignUp} style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer", textDecoration: "underline" }}>Sign up</button></p>
        </div>
      </form>
    </div>
  );
}
