import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import '../styles/pages/notfound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/"><Button>Go Home</Button></Link>
    </div>
  );
};

export default NotFound;