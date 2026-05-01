import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../context/useAuthStore';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import '../../styles/pages/auth/register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact_number:'',
    password: '',
    license_no: '',
    specialization: '',
    hospital: ''
  });
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(formData);
    if (result.success) {
      alert('Registration successful! Please wait for admin approval.');
      navigate('/login');
    } else {
      alert(result.error || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <Card title="Doctor Registration" className="auth-card">
        <form onSubmit={handleSubmit}>
          <Input label="Full Name" type="text" name="name" value={formData.name} onChange={handleChange} required />
          <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
          <Input label="Contact Number" type="text" name="contact_number" value={formData.contact_number} onChange={handleChange} required />
          <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
          <Input label="License Number" type="text" name="license_no" value={formData.license_no} onChange={handleChange} required />
          <Input label="Specialization" type="text" name="specialization" value={formData.specialization} onChange={handleChange} />
          <Input label="Hospital" type="text" name="hospital" value={formData.hospital} onChange={handleChange} />

          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? <Loader /> : 'Register'}
          </Button>
          <p className="auth-switch">
            Already registered? <a href="/login">Login here</a>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Register;