import React from 'react';
import './../styles/HighlightCard.css';

const HighlightCard = ({ title, value, unit, children }) => {
  return (
    <div className="highlight-card">
      <h3 className="highlight-card__title">{title}</h3>
      <p className="highlight-card__value">
        {value}
        {unit && <span className="unit">{unit}</span>}
      </p>
      {children && <div className="highlight-card__extra">{children}</div>}
    </div>
  );
};

export default HighlightCard;
