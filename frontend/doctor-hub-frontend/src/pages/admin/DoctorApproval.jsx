import React, { useEffect, useState } from 'react';
import { getDoctorsList, updateDoctorStatus } from '../../api/doctorApi';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import '../../styles/pages/admin/approvals.css';

const DoctorApproval = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await getDoctorsList();
      setDoctors(res.data);
      setFilteredDoctors(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // 🔍 FILTER LOGIC
  useEffect(() => {
    let data = [...doctors];

    if (search) {
      data = data.filter(
        (doc) =>
          doc.name.toLowerCase().includes(search.toLowerCase()) ||
          doc.license_no.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== 'ALL') {
      data = data.filter((doc) => doc.status === statusFilter);
    }

    setFilteredDoctors(data);
    setCurrentPage(1);
  }, [search, statusFilter, doctors]);

  // 📄 PAGINATION
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const paginatedDoctors = filteredDoctors.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredDoctors.length / rowsPerPage);

  const handleStatusChange = async (id, newStatus) => {
    if (!window.confirm(`Are you sure you want to ${newStatus.toLowerCase()} this doctor?`)) return;

    try {
      await updateDoctorStatus(id, newStatus);
      fetchDoctors();
    } catch (error) {
      alert('Failed to update status');
    }
  };

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
    return (
      <span className={`status-badge status-${doc.status.toLowerCase()}`}>
        {doc.status}
      </span>
    );
  };

  if (loading) return <Loader />;

  return (
    <div className="approval-page">
      <h2>Doctor Approvals</h2>

      {/* 🔍 FILTERS */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or license..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <span className="total-count">Total: {filteredDoctors.length}</span>
      </div>

      {/* 📊 TABLE */}
      <table className="modern-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>License</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginatedDoctors.map((doc, index) => {
            const rowNumber = (currentPage - 1) * rowsPerPage + index + 1;

            return (
              <tr key={doc.id}>
                <td className="row-number">{rowNumber}</td>
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
            );
          })}
        </tbody>
      </table>

      {/* 📄 PAGINATION */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </button>

        <span>Page {currentPage} / {totalPages || 1}</span>

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DoctorApproval;