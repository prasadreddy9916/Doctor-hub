import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../context/useAuthStore';
import '../styles/layouts/doctor-layout.css';

const DoctorLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="layout-container doctor-layout">
      <aside className="sidebar">
        <div className="logo-area">
          <h2>👨‍⚕️ DoctorPortal</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/doctor/dashboard" className={isActive('/doctor/dashboard') ? 'active' : ''}>
            Dashboard
          </Link>
          <Link to="/doctor/content" className={isActive('/doctor/content') ? 'active' : ''}>
            Content Library
          </Link>
          <Link to="/doctor/my-access" className={isActive('/doctor/my-access') ? 'active' : ''}>
            My Access
          </Link>
          <Link to="/doctor/profile" className={isActive('/doctor/profile') ? 'active' : ''}>
            Profile
          </Link>
        </nav>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <div className="user-info">
            <h3>Welcome, {user?.name || 'Doctor'}</h3>
            <span className="badge-specialization">{user?.specialization}</span>
          </div>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </header>

        <div className="content-area">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DoctorLayout;