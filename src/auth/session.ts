// Define User type for session management
export type User = {
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
};

const KEY = "brms_user";

export function setSessionUser(user: User) {
  try {
    const sessionData = {
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
      // Add session expiration
      expiresAt: Date.now() + 12 * 60 * 60 * 1000, // 12 hours
    };
    localStorage.setItem(KEY, JSON.stringify(sessionData));
  } catch (error) {
    console.error("Failed to save session:", error);
  }
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
  expiresAt?: number;
} | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;

    const sessionData = JSON.parse(raw);

    // Check if session has expired
    if (sessionData.expiresAt && Date.now() > sessionData.expiresAt) {
      clearSessionUser();
      return null;
    }

    return sessionData;
  } catch (error) {
    clearSessionUser();
    return null;
  }
}

export function clearSessionUser() {
  try {
    localStorage.removeItem(KEY);
    localStorage.removeItem("access_token"); 
  } catch {}
}
