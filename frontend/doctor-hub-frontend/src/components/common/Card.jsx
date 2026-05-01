import React from 'react';
import '../../styles/components/card.css';

const Card = ({ children, title, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default Card;