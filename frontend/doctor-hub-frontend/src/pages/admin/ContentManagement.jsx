import React, { useState } from 'react';
import { uploadContent } from '../../api/contentApi';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import '../../styles/pages/admin/content.css';

const ContentManagement = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'video',
    description: '',
    file: null
  });
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) return alert("Please select a file");

    setUploading(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('type', formData.type);
    data.append('description', formData.description);
    data.append('file', formData.file);

    try {
      await uploadContent(data);
      alert('Content uploaded successfully!');
      setFormData({ title: '', type: 'video', description: '', file: null });
    } catch (error) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };



  return (
  <div className="upload-wrapper">
    <div className="upload-container">
      <Card title="📤 Upload New Content">
        <form onSubmit={handleSubmit} className="upload-form">
          
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <div className="form-group">
            <label>Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="form-control"
            >
              <option value="video">🎥 Video</option>
              <option value="image">🖼 Image</option>
              <option value="seminar">🎤 Seminar</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description..."
            />
          </div>

          <div className="form-group file-upload">
            <label>Upload File</label>
            <input type="file" onChange={handleFileChange} />
          </div>

          <Button type="submit" disabled={uploading}>
            {uploading ? 'Uploading...' : '🚀 Upload Content'}
          </Button>

        </form>
      </Card>
    </div>
  </div>
);
};

export default ContentManagement;