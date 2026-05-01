import { create } from "zustand";
import apiClient from "../services/apiClient";

const useAdminCountStore = create((set) => ({
  stats: {
    totalDoctors: 0,
    pendingApprovals: 0,
    totalContent: 0,
  },

  loading: false,
  error: null,

  fetchStats: async () => {
    set({ loading: true, error: null });

    try {
      const res = await apiClient.get("/accounts/stats/");

      set({
        stats: {
          totalDoctors: res.data.total_doctors,
          pendingApprovals: res.data.pending_approvals,
          totalContent: res.data.total_content,
        },
        loading: false,
      });
    } catch (error) {
      console.error("Stats fetch error:", error);

      set({
        error: "Failed to load stats",
        loading: false,
      });
    }
  },
}));

export default useAdminCountStore;