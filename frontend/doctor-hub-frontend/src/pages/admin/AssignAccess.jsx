import React, { useState, useEffect } from 'react';
import { getDoctorsList } from '../../api/doctorApi';
import { getContentList } from '../../api/contentApi';
import { assignAccess, deleteAccess } from '../../api/accessApi'; // Only using create now
import Button from '../../components/common/Button';
import '../../styles/pages/admin/assign-access.css';


const AssignAccess = () => {
  // 1. Global State
  const [allContent, setAllContent] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 2. Panel State
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedDoctors, setSelectedDoctors] = useState([]); // UI Selection
  const [searchQuery, setSearchQuery] = useState('');

  // NEW: State for Database Reality
  const [currentAccessList, setCurrentAccessList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const contentRes = await getContentList();
      const contentData = contentRes.data.results || contentRes.data || [];
      setAllContent(contentData);

      const docsRes = await getDoctorsList();
      const docsList = docsRes.data.results || docsRes.data || [];
      setDoctors(docsList.filter(d => d?.status === 'APPROVED'));
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // NEW: Fetch current database status for this content
  const fetchCurrentAccess = async (contentId) => {
    try {
      // Assuming you have a generic GET access endpoint, or we derive from Content list
      // For simplicity, let's assume we filter the global list for this content ID
      const docsRes = await getDoctorsList(); // We need doctors list for lookup
      
      // NOTE: Since we don't have a direct "Get Access for Content" API,
      // We will derive the 'DB State' based on our `selectedDoctors` list (what we WANT to save).
      // However, the checkbox logic below is the ultimate source of truth.
      
    } catch (err) {
      console.error("Error fetching access status:", err);
    }
  };

 const openAssignPanel = (content) => {
  setSelectedContent(content);

  // ✅ preload DB access
  const existingDoctors = content.access_list?.map(a => a.doctor_id) || [];

  setCurrentAccessList(existingDoctors);
  setSelectedDoctors(existingDoctors); // pre-check UI

  setSearchQuery('');
  setIsPanelOpen(true);
};

  const closePanel = () => {
    setIsPanelOpen(false);
    setSelectedContent(null);
  };

  const toggleDoctor = (id) => {
    setSelectedDoctors(prev =>
      prev.includes(id)
        ? prev.filter(docId => docId !== id)
        : [...prev, id]
    );
  };

  const filteredDoctors = doctors.filter(doc =>
    doc.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
 

const handleGrantAccess = async () => {
  if (!selectedContent) return;

  try {
    const original = currentAccessList || [];
    const updated = selectedDoctors || [];

    // 🟢 new doctors to assign
    const toAdd = updated.filter(id => !original.includes(id));

    // 🔴 doctors to remove
    const toRemove = original.filter(id => !updated.includes(id));

    // ✅ CREATE access
    for (const docId of toAdd) {
      await assignAccess(docId, selectedContent.id);
    }

    // ✅ DELETE access
    for (const docId of toRemove) {
      const accessRecord = selectedContent.access_list.find(
        a => a.doctor_id === docId
      );

      if (accessRecord?.id) {
        await deleteAccess(accessRecord.id);
      }
    }

    alert("Access updated successfully 🚀");
    closePanel();

  } catch (err) {
    console.error("Access update error:", err);
    alert("Error updating access");
  }
};









  if (loading) return <div className="loading-msg">Loading...</div>;

  return (
    <div className="assign-access-page">
      <h2>Assign Content Access</h2>
      
      {error && <div className="error-msg">{error}</div>}

      {/* CONTENT GRID */}
      <div className="content-grid">
        {allContent.length > 0 ? (
          allContent.map(content => (
            <div key={content.id} className="content-card">
              <div className="card-header">
                <span className="type-badge">{content.type}</span>
                <div className="media-container">
                  {content.file_url ? (
                    content.type === 'video' ? (
                     <div className="video-container">
  <video
    src={content.file_url}
    className="video-player"
    controls
    controlsList="nodownload"
  />
</div>
                    ) : (
                      <img src={content.file_url} alt={content.title} className="content-preview" />
                    )
                  ) : (
                    <div className="no-preview">No Media</div>
                  )}
                </div>
              </div>

              <div className="card-body">
                <h3>{content.title}</h3>
                <p>{content.description}</p>
                
                <div className="card-actions">
                  <Button onClick={() => openAssignPanel(content)}>
                    Assign Access
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-content">No content available.</div>
        )}
      </div>

      {/* SLIDE-OUT PANEL */}
      {isPanelOpen && (
        <>
          <div className="overlay" onClick={closePanel}></div>
          
          <div className="assign-panel">
            <div className="panel-header">
              <h3>Assign: {selectedContent?.title}</h3>
              <button onClick={closePanel} className="close-btn">&times;</button>
            </div>

            <div className="panel-body">
              <input
                className="search-input"
                placeholder="Search Doctors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <div className="doctor-list">
                {filteredDoctors.map(doc => (
                  <div key={doc.id} className="doctor-item">
                    <input 
                      type="checkbox" 
                      // ✅ FIX: Smart Check Logic
                      // Checked if (User Selected) AND (In DB or User Selection contains this ID)
                     checked={selectedDoctors.includes(doc.id)}
                      onChange={() => toggleDoctor(doc.id)}
                    />
                    <span className="doc-name">
                      {doc.name} {doc.specialization && <span>({doc.specialization})</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel-footer">
              <span>Selected: {selectedDoctors.length}</span>
              <Button onClick={handleGrantAccess}>Grant Access</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AssignAccess;