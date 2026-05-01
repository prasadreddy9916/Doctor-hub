import apiClient from '../services/apiClient';

// Admin & Doctor: Get Content
export const getContentList = () => {
  return apiClient.get('/content/');
};




// ✅ ADD THIS (your missing piece)
export const getMyAccessContent = () => {
  return apiClient.get("/content/my-access/");
};

// Admin: Upload Video/Image/Seminar
export const uploadContent = (formData) => {
  // ✅ CHANGE: Removed manual 'headers' object. 
  // apiClient handles it automatically now.
  return apiClient.post('/content/', formData); 
};

// Admin: Delete Content
export const deleteContent = (id) => {
  return apiClient.delete(`/content/${id}/`);
};