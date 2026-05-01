import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../context/useAuthStore';
import '../styles/layouts/admin-layout.css';

const AdminLayout = () => {
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
    <div className="layout-container admin-layout">
      <aside className="sidebar">
        <div className="logo-area">
          <h2>🧑‍💼 AdminPanel</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/admin/dashboard" className={isActive('/admin/dashboard') ? 'active' : ''}>
            Dashboard
          </Link>
          <Link to="/admin/doctors" className={isActive('/admin/doctors') ? 'active' : ''}>
            Doctor Approvals
          </Link>
          <Link to="/admin/upload" className={isActive('/admin/upload') ? 'active' : ''}>
            Upload Content
          </Link>
          <Link to="/admin/access" className={isActive('/admin/access') ? 'active' : ''}>
            Assign Access
          </Link>
        </nav>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <h3>Control Tower</h3>
          <div className="user-actions">
            <span>Hello, {user?.username || 'Admin'}</span>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        </header>

        <div className="content-area">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;