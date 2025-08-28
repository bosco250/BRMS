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
        phone: user.phone,
        // Customer-specific fields
        loyaltyPoints: user.loyaltyPoints,
        totalVisits: user.totalVisits,
        totalSpent: user.totalSpent,
        tier: user.tier,
        joinDate: user.joinDate,
        preferences: user.preferences,
        avatar: user.avatar,
      })
    );
  } catch {}
}

export function getSessionUser(): {
  id: string;
  role: string;
  name: string;
  email: string;
  phone: string;
  // Customer-specific fields
  loyaltyPoints?: number;
  totalVisits?: number;
  totalSpent?: number;
  tier?: string;
  joinDate?: string;
  preferences?: string[];
  avatar?: string | null;
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
