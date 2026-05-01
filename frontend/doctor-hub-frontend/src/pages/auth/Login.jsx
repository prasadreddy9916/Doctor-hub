import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../context/useAuthStore';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import '../../styles/pages/auth/login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);
    if (result.success) {
      const role = useAuthStore.getState().role;
      navigate(role === 'admin' ? '/admin/dashboard' : '/doctor/dashboard');
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="auth-container">
      <Card title="Login" className="auth-card">
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="doctor@example.com"
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            required
          />
          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? <Loader /> : 'Login'}
          </Button>
          <p className="auth-switch">
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Login;