import { create } from "zustand";
import apiClient from "../services/apiClient";

const useContentCountStore = create((set) => ({
  counts: {
    video: 0,
    image: 0,
    seminar: 0,
  },

  loading: false,
  error: null,

  fetchCounts: async () => {
    set({ loading: true, error: null });

    try {
      const res = await apiClient.get("/content/type-counts/");

      set({
        counts: {
          video: res.data.video,
          image: res.data.image,
          seminar: res.data.seminar,
        },
        loading: false,
      });
    } catch (error) {
      console.error("Content counts fetch error:", error);

      set({
        error: "Failed to load content counts",
        loading: false,
      });
    }
  },
}));

export default useContentCountStore;