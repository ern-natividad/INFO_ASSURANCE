import bcrypt from "bcryptjs";
import { supabase } from "../config/supabase.js";
import { validateInput } from "../utils/validators.js";

export async function signup(req, res) {
  const { username, password } = req.body;
  const validationError = validateInput(username, password);
  if (validationError) return res.status(400).json({ error: validationError });

  try {
    // Check if username already exists
    const { data, error } = await supabase
      .from("users")
      .select("id")
      .eq("username", username)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Database error:", error);
      return res.status(500).json({ error: "Server error" });
    }

    if (data) {
      return res.status(409).json({ error: "Username already exists" });
    }

    // Hash password and insert
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt);

    const { error: insertError } = await supabase
      .from("users")
      .insert([{ username, password_hash: hash, failed_attempts: 0 }]);

    if (insertError) {
      console.error("Insert error:", insertError);
      if (insertError.code === "23505") {
        return res.status(409).json({ error: "Username already exists" });
      }
      return res.status(500).json({ error: "Server error" });
    }

    return res.json({ success: true, message: "Account created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function login(req, res) {
  const { username, password } = req.body;
  const validationError = validateInput(username, password);
  if (validationError) return res.status(400).json({ error: validationError });

  try {
    const { data: row, error } = await supabase
      .from("users")
      .select("id, password_hash, failed_attempts, locked_until")
      .eq("username", username)
      .single();

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

    bcrypt.compare(password, row.password_hash, async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
      }

      if (result) {
        // Successful login - reset counters
        const { error: updateError } = await supabase
          .from("users")
          .update({ failed_attempts: 0, locked_until: null })
          .eq("id", row.id);

        if (updateError) console.error("Failed to reset failed_attempts", updateError);
        return res.json({ success: true });
      } else {
        // Failed login - increment counter
        const failed = (row.failed_attempts || 0) + 1;
        const threshold = 5;
        const lockDuration = 15 * 60 * 1000; // 15 minutes
        const lockedUntil =
          failed >= threshold ? Date.now() + lockDuration : null;

        const { error: updateError } = await supabase
          .from("users")
          .update({ failed_attempts: failed, locked_until: lockedUntil })
          .eq("id", row.id);

        if (updateError) console.error("Failed to update failed_attempts", updateError);

        if (lockedUntil)
          return res
            .status(429)
            .json({
              error: "Account locked due to too many failed attempts",
            });
        return res.status(401).json({ error: "Invalid credentials" });
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
