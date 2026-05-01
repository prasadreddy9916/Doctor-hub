import apiClient from '../services/apiClient';

/**
 * Assign access to a content.
 * Sends clean object to prevent backend errors.
 */
export const assignAccess = (doctorId, contentId) => {
  // ✅ FIX: Ensure IDs are Integers (not Strings)
  const payload = {
    doctor: parseInt(doctorId),
    content: parseInt(contentId)
  };

  return apiClient.post('/access/', payload);
};

/**
 * Get all access records.
 */
export const getAccessList = () => {
  return apiClient.get('/access/');
};

/**
 * Edit/Remove Access.
 * Used when unchecking a doctor in the Assign Panel.
 * Deletes the specific access record (doctor, content) by ID.
 */
export const deleteAccess = (accessId) => {
  if (!accessId) return;
  return apiClient.delete(`/access/${accessId}/`);
};