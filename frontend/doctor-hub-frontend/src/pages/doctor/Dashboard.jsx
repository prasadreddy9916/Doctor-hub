import React, { useEffect, useState } from 'react';
import { getContentList } from '../../api/contentApi';
import ContentCard from '../../components/doctor/ContentCard';
import '../../styles/pages/doctor/dashboard.css';

const Dashboard = () => {
  const [recentContent, setRecentContent] = useState([]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await getContentList();
        // Take last 3 items
        setRecentContent(res.data.slice(-3).reverse());
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecent();
  }, []);

  return (
    <div className="doctor-dashboard">
      <h2>Welcome back!</h2>
      <div className="section">
        <h3>Recent Content</h3>
        {recentContent.length === 0 ? <p>No recent content available.</p> : (
          <div className="card-grid">
            {recentContent.map(content => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;