import apiClient from '../services/apiClient';

// Admin: Get list of all doctors (for approvals)
export const getDoctorsList = (params) => {
  return apiClient.get('/accounts/doctors/', { params });
};

// Admin: Approve/Reject Doctor
export const updateDoctorStatus = (id, status) => {
  return apiClient.patch(`/accounts/doctors/${id}/`, { status });
};

// Doctor: Get My Profile
export const getMyProfile = () => {
  return apiClient.get('/doctors/profile/');
};

// Doctor: Update My Profile
export const updateMyProfile = (data) => {
  return apiClient.patch('/doctors/profile/', data);
};