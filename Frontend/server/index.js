/*import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

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

app.post("/api/signup", (req, res) => {
  const { username, password } = req.body;
  const validationError = validateInput(username, password);
  if (validationError) return res.status(400).json({ error: validationError });

  // Check if username already exists
  supabase
    .from("users")
    .select("id")
    .eq("username", username)
    .single()
    .then(({ data, error }) => {
      if (error && error.code !== "PGRST116") {
        // PGRST116 means no rows found, which is good
        console.error("Database error:", error);
        return res.status(500).json({ error: "Server error" });
      }

      if (data) {
        return res.status(409).json({ error: "Username already exists" });
      }

      // Hash password and insert
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(password, salt);

      supabase
        .from("users")
        .insert([{ username, password_hash: hash, failed_attempts: 0 }])
        .then(({ error }) => {
          if (error) {
            console.error("Insert error:", error);
            if (error.code === "23505") {
              // Unique constraint violation
              return res.status(409).json({ error: "Username already exists" });
            }
            return res.status(500).json({ error: "Server error" });
          }
          return res.json({ success: true, message: "Account created successfully" });
        });
    });
});

app.post("/api/login", loginLimiter, (req, res) => {
  const { username, password } = req.body;
  const validationError = validateInput(username, password);
  if (validationError) return res.status(400).json({ error: validationError });

  supabase
    .from("users")
    .select("id, password_hash, failed_attempts, locked_until")
    .eq("username", username)
    .single()
    .then(({ data: row, error }) => {
      if (error && error.code !== "PGRST116") {
        console.error(error);
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
          supabase
            .from("users")
            .update({ failed_attempts: 0, locked_until: null })
            .eq("id", row.id)
            .then(({ error: uerr }) => {
              if (uerr) console.error("Failed to reset failed_attempts", uerr);
              return res.json({ success: true });
            });
        } else {
          const failed = (row.failed_attempts || 0) + 1;
          const threshold = 5;
          const lockDuration = 15 * 60 * 1000; // 15 minutes
          const lockedUntil =
            failed >= threshold ? Date.now() + lockDuration : null;

          supabase
            .from("users")
            .update({ failed_attempts: failed, locked_until: lockedUntil })
            .eq("id", row.id)
            .then(({ error: uerr }) => {
              if (uerr) console.error("Failed to update failed_attempts", uerr);
              if (lockedUntil)
                return res
                  .status(429)
                  .json({
                    error: "Account locked due to too many failed attempts",
                  });
              return res.status(401).json({ error: "Invalid credentials" });
            });
        }
      });
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Auth server listening on port ${PORT}`);
});*/
