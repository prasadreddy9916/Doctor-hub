import React, { useEffect, useState } from 'react';
import { getContentList } from '../../api/contentApi';
import ContentCard from '../../components/doctor/ContentCard';
import AccessBadge from '../../components/doctor/AccessBadge';
import '../../styles/pages/doctor/content.css';

const ContentPage = () => {
  const [allContent, setAllContent] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await getContentList();

        const data = res.data.results || res.data || [];

        // 🧠 Add access logic (important)
        const updated = data.map(item => ({
          ...item,
          is_accessible: item.is_accessible ?? true // default if backend not sending
        }));

        setAllContent(updated);

      } catch (error) {
        console.error(error);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="content-library-page">

      <div className="library-header">
        <h2>Content Library</h2>
        <AccessBadge isAccessible={true} />
      </div>

      <div className="content-grid">
        {allContent.length > 0 ? (
          allContent.map(content => (
            <ContentCard key={content.id} content={content} />
          ))
        ) : (
          <div className="empty-state">No content available</div>
        )}
      </div>

    </div>
  );
};

export default ContentPage;