import React from 'react';
import '../../styles/components/stat-card.css';

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className={`stat-card stat-card-${color}`}>
      <div>
        <p className="stat-title">{title}</p>
        <p className="stat-value">{value}</p>
      </div>
      <div className="stat-icon">{icon}</div>
    </div>
  );
};

export default StatCard;