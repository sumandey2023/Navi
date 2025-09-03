import { create } from "zustand";

const useUserStore = create((set, get) => ({
  // State
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: "",

  // Actions
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: "" }),

  // Auth Actions
  login: async (credentials) => {
    try {
      set({ isLoading: true, error: "" });
      // Login logic will be implemented here
      // For now, just set loading state
      set({ isLoading: false });
    } catch (error) {
      set({
        error: error.message || "Login failed",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      error: "",
    });
  },

  // Utility Actions
  resetState: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: "",
    }),
}));

export default useUserStore;
