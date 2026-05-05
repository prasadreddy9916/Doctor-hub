import { create } from "zustand";
import apiClient from "../services/apiClient";

const useCountStoreAll = create((set) => ({
  stats: {
    totalDoctors: 0,
    video: 0,
    image: 0,
    seminar: 0,
    // Including pendingApprovals/totalContent just in case, 
    // set to 0 since public stats don't usually show these
    pendingApprovals: 0, 
    totalContent: 0,
  },

  loading: false,
  error: null,

  fetchStats: async () => {
    set({ loading: true, error: null });

    try {
      // Pointing to your new PUBLIC endpoint
      const res = await apiClient.get("/content/public-stats/");

      set({
        stats: {
          totalDoctors: res.data.totalDoctors || 0,
          video: res.data.video || 0,
          image: res.data.image || 0,
          seminar: res.data.seminar || 0,
          pendingApprovals: res.data.pendingApprovals || 0,
          totalContent: res.data.totalContent || 0,
        },
        loading: false,
      });
    } catch (error) {
      console.error("Public Stats fetch error:", error);
      set({
        error: "Failed to load stats",
        loading: false,
      });
    }
  },
}));

export default useCountStoreAll;