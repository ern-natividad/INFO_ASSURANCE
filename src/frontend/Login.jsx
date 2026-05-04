import { useState } from "react";
import "../Login.css";

const BANNED = ["123admin", "123456", "qwerty", "admin"];

function isAlphanumeric(s) {
  return /^[A-Za-z0-9]+$/.test(s);
}
function hasLetterAndNumber(s) {
  return /[A-Za-z]/.test(s) && /\d/.test(s);
}
function containsSqlLike(s) {
  if (!s) return false;
  return /\b(select|insert|update|delete|drop|union|exec|declare)\b|--|;|\/\*|\*\/|\bor\b|\band\b|=/.test(
    s.toLowerCase(),
  );
}

export default function Login({ onLogin = () => {} }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!username.trim()) return { ok: false, message: "Username is required" };
    if (!password || password.length < 8)
      return { ok: false, message: "Password must be at least 8 characters" };
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
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Login successful");
        try {
          onLogin();
        } catch (e) {
          /* ignore */
        }
      } else {
        setMessage(data?.error || "Login failed");
      }
    } catch (err) {
      setMessage("Network error");
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
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        {message && <div className="message">{message}</div>}

        <button type="submit" className="submit" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <div className="login-note">
        Password: min 8 alphanumeric characters, include letters and numbers.
        Common weak passwords are forbidden.
      </div>
    </div>
  );
}
