export const normalizePhone = (value) =>
  value.replace(/[()\s-]/g, "");

export function validateAccount(account) {
  const errors = {};

  if (!account.fullName.trim()) errors.fullName = "Full name is required.";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account.email)) {
    errors.email = "Enter a valid email.";
  }

  if (!/^\+?\d{7,15}$/.test(normalizePhone(account.phone))) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!account.city.trim()) errors.city = "City is required.";

  if (account.password.length < 8 || !/\d/.test(account.password)) {
    errors.password = "Minimum 8 characters and at least one number.";
  }

  if (account.password !== account.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

export const situations = [
  ["CURRENTLY_EMPLOYED", "Currently employed"],
  ["RECENTLY_IMPACTED", "Recently impacted"],
  ["CAREER_BREAK", "On a career break"],
  ["RETURNING_TO_WORKFORCE", "Returning to the workforce"]
];