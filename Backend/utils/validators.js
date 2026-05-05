const BANNED = ["123admin", "123456", "qwerty", "admin"];

export function isAlphanumeric(s) {
  return /^[A-Za-z0-9]+$/.test(s);
}

export function hasLetterAndNumber(s) {
  return /[A-Za-z]/.test(s) && /\d/.test(s);
}

export function containsSqlLike(s) {
  if (!s) return false;
  return /\b(select|insert|update|delete|drop|union|exec|declare)\b|--|;|\/\*|\*\/|\bor\b|\band\b|=/.test(
    s.toLowerCase(),
  );
}

export function validateInput(username, password) {
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
