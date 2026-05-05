import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../hooks/useProtectedRoute.jsx';



import SiteLayout from '../layouts/SiteLayout.jsx';
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Services from '../pages/Services.jsx';
import Contact from '../pages/Contact.jsx';

import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';

import AdminLayout from '../layouts/AdminLayout.jsx';
import DoctorLayout from '../layouts/DoctorLayout.jsx';

import Dashboard from '../pages/admin/Dashboard.jsx';
import DoctorApproval from '../pages/admin/DoctorApproval.jsx';
import ContentManagement from '../pages/admin/ContentManagement.jsx';
import AssignAccess from '../pages/admin/AssignAccess.jsx';
import ContentList from '../pages/admin/ContentList.jsx';

import DoctorDashboard from '../pages/doctor/Dashboard.jsx';
import ContentPage from '../pages/doctor/ContentPage.jsx';
import MyAccess from '../pages/doctor/MyAccess.jsx';
import Profile from '../pages/doctor/Profile.jsx';

import NotFound from '../pages/NotFound.jsx';

const AppRoutes = () => {
  return (
    <Routes>

    {/* Public marketing site */}
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

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