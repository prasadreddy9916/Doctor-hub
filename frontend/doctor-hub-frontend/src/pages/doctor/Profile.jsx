import React, { useEffect, useState } from 'react';
import { getMyProfile, updateMyProfile } from '../../api/doctorApi';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import '../../styles/pages/doctor/profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getMyProfile();
      setProfile(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const editableFields = [
        'doctor_name',
        'doctor_contact_number',
        'doctor_license_no',
        'doctor_specialization',
        'doctor_hospital',
        'degree',
        'university',
        'registration_number',
        'years_experience',
        'clinic_name',
        'clinic_address',
        'phone_number',
        'certificate_url',
        'identity_proof_url',
        'profile_completed',
      ];

      const payload = {};
      editableFields.forEach((field) => {
        if (profile[field] !== undefined) {
          payload[field] = profile[field];
        }
      });

      await updateMyProfile(payload);
      await fetchProfile();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert('Update failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (value) => (value ? new Date(value).toLocaleString() : 'N/A');

  return (
    <div className="profile-page">
      <div className="profile-content">
        <Card title="My Profile" className="profile-main">
          {!isEditing ? (
            <div className="profile-view">
              <div className="profile-grid">
                <div>
                  <p><strong>Name:</strong> {profile.doctor_name || 'N/A'}</p>
                  <p><strong>Email:</strong> {profile.doctor_email || 'N/A'}</p>
                  <p><strong>Contact Number:</strong> {profile.doctor_contact_number || 'N/A'}</p>
                  <p><strong>License No:</strong> {profile.doctor_license_no || 'N/A'}</p>
                  <p><strong>Specialization:</strong> {profile.doctor_specialization || 'N/A'}</p>
                  <p><strong>Hospital:</strong> {profile.doctor_hospital || 'N/A'}</p>
                </div>
                <div>
                  <p><strong>Degree:</strong> {profile.degree || 'N/A'}</p>
                  <p><strong>University:</strong> {profile.university || 'N/A'}</p>
                  <p><strong>Registration No:</strong> {profile.registration_number || 'N/A'}</p>
                  <p><strong>Years Experience:</strong> {profile.years_experience || 0}</p>
                  <p><strong>Clinic Name:</strong> {profile.clinic_name || 'N/A'}</p>
                  <p><strong>Clinic Address:</strong> {profile.clinic_address || 'N/A'}</p>
                </div>
              </div>
              <div className="profile-grid">
                <div>
                  <p><strong>Phone Number:</strong> {profile.phone_number || 'N/A'}</p>
                  <p><strong>Certificate URL:</strong> {profile.certificate_url || 'N/A'}</p>
                </div>
                <div>
                  <p><strong>Identity Proof URL:</strong> {profile.identity_proof_url || 'N/A'}</p>
                  <p><strong>Profile Completed:</strong> {profile.profile_completed ? 'Yes' : 'No'}</p>
                  <p><strong>Status:</strong> {profile.doctor_status || 'N/A'}</p>
                </div>
              </div>
              <div className="profile-actions">
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="profile-edit-form">
              <div className="profile-grid">
                <Input label="Name" name="doctor_name" value={profile.doctor_name || ''} onChange={handleChange} />
                <div className="form-group">
                  <label htmlFor="doctor_email">Email</label>
                  <input
                    id="doctor_email"
                    type="email"
                    name="doctor_email"
                    value={profile.doctor_email || ''}
                    readOnly
                    className="form-control"
                  />
                </div>
                <Input label="Contact Number" name="doctor_contact_number" value={profile.doctor_contact_number || ''} onChange={handleChange} />
                <Input label="License No" name="doctor_license_no" value={profile.doctor_license_no || ''} onChange={handleChange} />
                <Input label="Specialization" name="doctor_specialization" value={profile.doctor_specialization || ''} onChange={handleChange} />
                <Input label="Hospital" name="doctor_hospital" value={profile.doctor_hospital || ''} onChange={handleChange} />
                <Input label="Degree" name="degree" value={profile.degree || ''} onChange={handleChange} />
                <Input label="University" name="university" value={profile.university || ''} onChange={handleChange} />
                <Input label="Registration No" name="registration_number" value={profile.registration_number || ''} onChange={handleChange} />
                <Input label="Years Experience" type="number" name="years_experience" value={profile.years_experience || ''} onChange={handleChange} />
                <Input label="Clinic Name" name="clinic_name" value={profile.clinic_name || ''} onChange={handleChange} />
                <Input label="Clinic Address" name="clinic_address" value={profile.clinic_address || ''} onChange={handleChange} />
                <Input label="Phone Number" name="phone_number" value={profile.phone_number || ''} onChange={handleChange} />
                <Input label="Certificate URL" name="certificate_url" value={profile.certificate_url || ''} onChange={handleChange} />
                <Input label="Identity Proof URL" name="identity_proof_url" value={profile.identity_proof_url || ''} onChange={handleChange} />
              </div>
              <div className="form-actions">
                <Button type="submit" disabled={loading}>Save Changes</Button>
                <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            </form>
          )}
        </Card>

        <Card title="Profile Details" className="profile-sidebar">
          <div className="sidebar-list">
            <div className="sidebar-item">
              <p><strong>Doctor Created:</strong> {formatDate(profile.doctor_created_at)}</p>
              <p><strong>Doctor Updated:</strong> {formatDate(profile.doctor_updated_at)}</p>
            </div>
            <div className="sidebar-item">
              <p><strong>Profile Created:</strong> {formatDate(profile.created_at)}</p>
              <p><strong>Profile Updated:</strong> {formatDate(profile.updated_at)}</p>
            </div>
            <div className="sidebar-item">
              <p><strong>Profile ID:</strong> {profile.id || 'N/A'}</p>
              <p><strong>Doctor ID:</strong> {profile.doctor || 'N/A'}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;