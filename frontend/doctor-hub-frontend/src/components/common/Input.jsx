import React from 'react';
import '../../styles/components/input.css';

const Input = ({ label, type, name, value, onChange, placeholder, required = false }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="form-control"
      />
    </div>
  );
};

export default Input;