import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import sqlite3Package from "sqlite3";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

const sqlite3 = sqlite3Package.verbose();
const db = new sqlite3.Database("./server/users.db", (err) => {
  if (err) console.error("Failed to open DB", err);
});

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// Ensure schema includes fields for brute-force protection
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password_hash TEXT,
      failed_attempts INTEGER DEFAULT 0,
      locked_until INTEGER
    )`,
  );

  // Add columns if older DB lacks them
  db.all("PRAGMA table_info(users)", (err, rows) => {
    if (!err && rows) {
      const names = rows.map((r) => r.name);
      if (!names.includes("failed_attempts")) {
        db.run(
          "ALTER TABLE users ADD COLUMN failed_attempts INTEGER DEFAULT 0",
        );
      }
      if (!names.includes("locked_until")) {
        db.run("ALTER TABLE users ADD COLUMN locked_until INTEGER");
      }
    }
  });

  const defaultUsername = "testuser";
  const defaultPassword = "Test1234";
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(defaultPassword, salt);
  db.run("INSERT OR IGNORE INTO users(username,password_hash) VALUES (?,?)", [
    defaultUsername,
    hash,
  ]);
});

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

function validateInput(username, password) {
  if (!username || typeof username !== "string" || !username.trim())
    return "Invalid username";
  if (!password || typeof password !== "string" || password.length < 8)
    return "Invalid password";
  if (!isAlphanumeric(password)) return "Password must be alphanumeric";
  if (!hasLetterAndNumber(password))
    return "Password must include letters and numbers";
  const low = password.toLowerCase();
  for (const b of BANNED)
    if (low.includes(b)) return "Password contains forbidden substring";
  if (containsSqlLike(password) || containsSqlLike(username))
    return "Input contains unsafe patterns";
  return null;
}

// Rate limiter to slow down brute-force attempts from single IPs
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many login attempts from this IP, please try again later.",
  },
});

app.post("/api/login", loginLimiter, (req, res) => {
  const { username, password } = req.body;
  const validationError = validateInput(username, password);
  if (validationError) return res.status(400).json({ error: validationError });

  db.get(
    "SELECT id, password_hash, failed_attempts, locked_until FROM users WHERE username = ?",
    [username],
    (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
      }

      // If user does not exist, respond with generic message
      if (!row) return res.status(401).json({ error: "Invalid credentials" });

      const now = Date.now();
      if (row.locked_until && row.locked_until > now) {
        const waitSec = Math.ceil((row.locked_until - now) / 1000);
        return res
          .status(429)
          .json({ error: `Account locked. Try again in ${waitSec} seconds` });
      }

      bcrypt.compare(password, row.password_hash, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Server error" });
        }

        if (result) {
          // Successful login - reset counters
          db.run(
            "UPDATE users SET failed_attempts = 0, locked_until = NULL WHERE id = ?",
            [row.id],
            (uerr) => {
              if (uerr) console.error("Failed to reset failed_attempts", uerr);
              return res.json({ success: true });
            },
          );
        } else {
          const failed = (row.failed_attempts || 0) + 1;
          const threshold = 5;
          const lockDuration = 15 * 60 * 1000; // 15 minutes
          const lockedUntil =
            failed >= threshold ? Date.now() + lockDuration : null;

          db.run(
            "UPDATE users SET failed_attempts = ?, locked_until = ? WHERE id = ?",
            [failed, lockedUntil, row.id],
            (uerr) => {
              if (uerr) console.error("Failed to update failed_attempts", uerr);
              if (lockedUntil)
                return res
                  .status(429)
                  .json({
                    error: "Account locked due to too many failed attempts",
                  });
              return res.status(401).json({ error: "Invalid credentials" });
            },
          );
        }
      });
    },
  );
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Auth server listening on port ${PORT}`);
});
