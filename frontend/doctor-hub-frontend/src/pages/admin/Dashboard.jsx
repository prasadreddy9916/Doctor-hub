import React, { useEffect } from "react";
import StatCard from "../../components/admin/StatCard";
import useAdminCountStore from "../../context/useAdminCountStore";
import "../../styles/pages/admin/dashboard.css";

const Dashboard = () => {
  const { stats, fetchStats, loading, error } = useAdminCountStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="dashboard-page">
      <h2>Admin Overview</h2>

      {loading && <p>Loading stats...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="stats-grid">
        <StatCard
          title="Total Doctors"
          value={stats.totalDoctors}
          icon="👨‍⚕️"
          color="blue"
        />

        <StatCard
          title="Pending Approvals"
          value={stats.pendingApprovals}
          icon="⏳"
          color="orange"
        />

        <StatCard
          title="Total Content"
          value={stats.totalContent}
          icon="🎥"
          color="green"
        />
      </div>
    </div>
  );
};

export default Dashboard;