import { Navigate } from 'react-router-dom';
import useAuthStore from '../context/useAuthStore';

/**
 * A component wrapper to protect routes based on authentication and role.
 * Usage: <ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>
 */
const ProtectedRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, role } = useAuthStore();

  // 1. Check if user is logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. Check if user has the specific role required (if provided)
  if (allowedRole && role !== allowedRole) {
    // If a Doctor tries to access Admin, redirect to Doctor Dashboard
    if (role === 'doctor') return <Navigate to="/doctor/dashboard" replace />;
    
    // If an Admin tries to access Doctor (unlikely but safe fallback), redirect to Admin Dashboard
    if (role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    
    // Fallback for unknown roles
    return <Navigate to="/login" replace />;
  }

  // If authenticated and role matches, render the child components
  return children;
};

export default ProtectedRoute;