import React, { useEffect, useState } from 'react';
import DoctorTable from '../../components/admin/DoctorTable';
import { getDoctorsList } from '../../api/doctorApi';
import { updateDoctorStatus } from '../../api/doctorApi';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import '../../styles/pages/admin/approvals.css';

const DoctorApproval = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await getDoctorsList();
      setDoctors(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    if (!window.confirm(`Are you sure you want to ${newStatus.toLowerCase()} this doctor?`)) return;

    try {
      await updateDoctorStatus(id, newStatus);
      fetchDoctors(); // Refresh list
    } catch (error) {
      alert('Failed to update status');
    }
  };

  if (loading) return <Loader />;

  const getActions = (doc) => {
    if (doc.status === 'PENDING') {
      return (
        <div className="action-buttons">
          <Button variant="success" size="sm" onClick={() => handleStatusChange(doc.id, 'APPROVED')}>
            Approve
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleStatusChange(doc.id, 'REJECTED')}>
            Reject
          </Button>
        </div>
      );
    }
    return <span className={`status-badge status-${doc.status.toLowerCase()}`}>{doc.status}</span>;
  };

  return (
    <div className="approval-page">
      <h2>Doctor Approvals</h2>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>License</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.name}</td>
              <td>{doc.email}</td>
              <td>{doc.license_no}</td>
              <td>
                <span className={`status-badge status-${doc.status.toLowerCase()}`}>
                  {doc.status}
                </span>
              </td>
              <td>{getActions(doc)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorApproval;