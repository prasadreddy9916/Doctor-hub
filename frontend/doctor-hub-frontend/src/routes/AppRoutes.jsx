import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../hooks/useProtectedRoute.jsx';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import AdminLayout from '../layouts/AdminLayout';
import DoctorLayout from '../layouts/DoctorLayout';
import Dashboard from '../pages/admin/Dashboard';
import DoctorApproval from '../pages/admin/DoctorApproval';
import ContentManagement from '../pages/admin/ContentManagement';
import AssignAccess from '../pages/admin/AssignAccess';
import ContentList from '../pages/admin/ContentList';
import DoctorDashboard from '../pages/doctor/Dashboard';
import ContentPage from '../pages/doctor/ContentPage';
import MyAccess from '../pages/doctor/MyAccess';
import Profile from '../pages/doctor/Profile';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {/* FIX 1: Changed 'endpoint' to 'element' */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* ADMIN ROUTES (Protected) */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRole="admin">
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="doctors" element={<DoctorApproval />} />
        
        {/* FIX 2: Changed 'local_element' to 'element' */}
        <Route path="upload" element={<ContentManagement />} />
        
        <Route path="access" element={<AssignAccess />} />
        <Route path="content" element={<ContentList />} />
        <Route path="" element={<Navigate to="/admin/dashboard" replace />} />
      </Route>

      {/* DOCTOR ROUTES (Protected) */}
      <Route path="/doctor" element={
        <ProtectedRoute allowedRole="doctor">
          <DoctorLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<DoctorDashboard />} />
        <Route path="content" element={<ContentPage />} />
        <Route path="my-access" element={<MyAccess />} />
        <Route path="profile" element={<Profile />} />
        <Route path="" element={<Navigate to="/doctor/dashboard" replace />} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;