import type { FakeUser } from "../data/users";

const KEY = "brms_user";

export function setSessionUser(user: FakeUser) {
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email,
      })
    );
  } catch {}
}

export function getSessionUser(): {
  id: string;
  role: string;
  name: string;
  email: string;
} | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearSessionUser() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
