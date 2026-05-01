import React, { useEffect, useState } from 'react';
import { getMyAccessContent } from '../../api/contentApi';
import ContentCard from '../../components/doctor/ContentCard';
import '../../styles/pages/doctor/content.css';

const MyAccess = () => {
  const [myContent, setMyContent] = useState([]);

  useEffect(() => {
    const fetchMyAccess = async () => {
      try {
        const res = await getMyAccessContent();

        // handle pagination or plain list
        const data = res.data.results || res.data || [];

        // ✅ IMPORTANT: mark all as accessible
        const accessibleContent = data.map(item => ({
          ...item,
          is_accessible: true,
        }));

        setMyContent(accessibleContent);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMyAccess();
  }, []);

  return (
    <div className="my-access-page">
      <h2>My Authorized Content</h2>
      <p>Here are the materials assigned specifically to you.</p>

      <div className="content-grid">
        {myContent.length > 0 ? (
          myContent.map(content => (
            <ContentCard key={content.id} content={content} />
          ))
        ) : (
          <p>No content assigned yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyAccess;