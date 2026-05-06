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

export default function Login({ onLogin = () => {} }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function validate() {
    if (!username.trim()) return { ok: false, message: "Username is required" };
    if (!validateUsername(username))
      return {
        ok: false,
        message: "Username must be 3-20 alphanumeric characters",
      };

    if (!password || password.length < 8)
      return { ok: false, message: "Password must be at least 8 characters" };
    if (password.length > 128)
      return { ok: false, message: "Password is too long" };
    if (!hasLetterAndNumber(password))
      return {
        ok: false,
        message: "Password must include letters and numbers",
      };

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
      return {
        ok: false,
        message: "Input contains potentially dangerous content",
      };

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
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        },
      );
      const data = await res.json();
      if (res.ok) {
        // Save username to localStorage for use in LessonLayout
        console.log("Login successful! Saving username:", username);
        localStorage.setItem("username", username);
        sessionStorage.setItem("loggedIn", "1");
        if (onLogin) onLogin();
        navigate("/dashboard");
      } else {
        console.log("Login failed. Response:", data);
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
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              style={{ paddingRight: "45px" }}
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
                fontSize: "18px",
                color: "#94a3b8",
              }}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </label>

        {message && <div className="message">{message}</div>}

        <button type="submit" className="submit" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <div
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            fontSize: "0.9rem",
            color: "#64748b",
          }}
        >
          Don't have an account?
          <button
            type="button"
            onClick={() => navigate("/signup")}
            style={{
              background: "none",
              border: "none",
              color: "#2563eb",
              cursor: "pointer",
              fontWeight: "600",
              marginLeft: "5px",
            }}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
