import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../context/useAuthStore';
import '../styles/layouts/admin-layout.css';
import logo from '../assets/logo1.png';
import { Weight } from 'lucide-react';

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
          <img src={logo} alt="DoctorHub" className="logo-img" />
          <span className="logo-text">DoctorHub</span>
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
          <h3 style={{ color: '#3a14b8', fontWeight: 'bold',fontsize:'2em' }}>Admin Panel</h3>
          <div className="user-actions">
          <span >
  Hello, {user?.first_name || user?.last_name
    ? `${user.first_name || ''} ${user.last_name || ''}`.trim()
    : user?.username || 'Admin'}
</span>
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