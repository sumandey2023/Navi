import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../config/api";

const useUserStore = create(
  persist(
    (set, get) => ({
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
      fetchCurrentUser: async () => {
        try {
          set({ isLoading: true, error: "" });
          const response = await api.get("/auth/me");
          set({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
          });
          return response.data.user;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to fetch user",
            isLoading: false,
            isAuthenticated: false,
            user: null,
          });
          throw error;
        }
      },

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
    }),
    {
      name: "user-storage", // unique name for localStorage key
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useUserStore;
