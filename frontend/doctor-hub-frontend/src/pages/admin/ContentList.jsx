import React, { useEffect, useState } from 'react';
import { getContentList, deleteContent } from '../../api/contentApi';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import '../../styles/pages/admin/content.css';

const ContentList = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await getContentList();
      setContents(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this content?')) return;
    try {
      await deleteContent(id);
      fetchContent(); // Refresh
    } catch (error) {
      alert('Failed to delete');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="content-list-page">
      <h2>All Content Library</h2>
      <div className="content-grid">
        {contents.map(item => (
          <div key={item.id} className="content-item">
            {item.type === 'image' && item.file_url ? (
              <img src={item.file_url} alt={item.title} />
            ) : (
              <div className="video-thumb">{item.type === 'video' ? '▶ Video' : '📚 Seminar'}</div>
            )}
            <div className="content-info">
              <div className="content-meta-row">
                <span className="content-type-chip">{item.type}</span>
                <span className="access-count">{item.access_list?.length ?? 0} assigned</span>
              </div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <div className="content-actions">
                <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>Delete</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentList;