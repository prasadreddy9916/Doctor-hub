import React, { useEffect, useState } from 'react';
import { getContentList } from '../../api/contentApi';
import '../../styles/pages/doctor/dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAccessible: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getContentList();
        const data = res.data.results || res.data || [];

        // count only accessible content
        const accessible = data.filter(item => item.is_accessible);

        setStats({
          totalAccessible: accessible.length,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="doctor-dashboard">

      {/* 🔹 HEADER */}
      <h2>Welcome back 👨‍⚕️</h2>

      {/* 🔹 STATUS */}
      <div className="status-badge">
        ✅ Approved
      </div>

      {/* 🔹 STATS CARDS */}
      <div className="stats-grid">

        <div className="stat-card">
          <h4>📚 My Access</h4>
          <p>{stats.totalAccessible}</p>
        </div>

       <div className="stat-card content-types-card">
  <h4>🎬 Content Types</h4>

  <div className="types-grid">
    <div className="type-item video">
      <span className="type-icon">🎥</span>
      <span>Video</span>
    </div>

    <div className="type-item image">
      <span className="type-icon">🖼</span>
      <span>Image</span>
    </div>

    <div className="type-item seminar">
      <span className="type-icon">🎤</span>
      <span>Seminar</span>
    </div>
  </div>
</div>

      </div>

      {/* 🔹 QUICK ACTIONS */}
      <div className="section">
        <h3>Quick Actions</h3>

        <div className="actions-grid">
          <button className="action-btn">📚 Content Library</button>
          <button className="action-btn">🔐 My Access</button>
          <button className="action-btn">👤 Profile</button>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;