// src/store/auth.js
import { create } from "zustand";

// Credentials (env overrides allowed)
const ADMIN_USER = process.env.REACT_APP_ADMIN_USER || "admin";
const ADMIN_PASS = process.env.REACT_APP_ADMIN_PASS || "password";

// Simple token generator (in-memory only)
function makeToken() {
  if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
    return window.crypto.getRandomValues(new Uint32Array(4)).join("-");
  }
  return Math.random().toString(36).slice(2) + "-" + Date.now();
}

/**
 * In-memory auth store (NO persistence).
 * Refreshing the page clears state => login is required again.
 */
export const useAuth = create((set, get) => ({
  session: null, // { token, user, startedAt }

  isAuthed: () => Boolean(get().session?.token),

  login: (username, password) => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      const token = makeToken();
      const session = { token, user: { username }, startedAt: Date.now() };
      set({ session });
      return true; // success
    }
    return false; // invalid creds
  },

  logout: () => set({ session: null }),
}));
