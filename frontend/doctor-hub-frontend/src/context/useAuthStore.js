import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // Keep this if you installed the middleware
import { login as loginApi, registerDoctor } from '../api/authApi';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // 1. Login Action
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await loginApi(email, password);
          const data = response.data;

          let userRole = ''; // Default empty
          let userData = null;

          // LOGIC FIX: Handle your specific Django response structure
          if (data.admin === true) {
            userRole = 'admin';
            userData = data.user; // Admin sends user object inside
          } else if (data.doctor) {
            userRole = 'doctor';
            userData = data.doctor; // Doctor sends doctor object inside
          }

          set({
            user: userData,
            token: data.access,
            refreshToken: data.refresh,
            role: userRole, // Now correctly 'admin' or 'doctor'
            isAuthenticated: true,
            isLoading: false,
          });

          // Save to LocalStorage (Manual save ensures it works even if persist fails)
          localStorage.setItem('access_token', data.access);
          localStorage.setItem('refresh_token', data.refresh);
          localStorage.setItem('user_role', userRole);

          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return {
            success: false,
            error: error.response?.data?.error || 'Login failed'
          };
        }
      },

      // 2. Register Action
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          await registerDoctor(userData);
          set({ isLoading: false });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return {
            success: false,
            error: error.response?.data?.detail || 'Registration failed'
          };
        }
      },

      // 3. Logout Action
      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          role: null,
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_role');
      },

      // 4. Check Auth
      checkAuth: () => {
        const token = localStorage.getItem('access_token');
        const role = localStorage.getItem('user_role');
        if (token && role) {
          set({ isAuthenticated: true, role: role, token: token });
        } else {
          get().logout();
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;