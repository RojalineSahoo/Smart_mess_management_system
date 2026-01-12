import React from 'react';

const MealCard = ({ type, menuItem, onApply }) => {
  // Determine theme based on meal type
  const themeClass = type.toLowerCase() + "-theme";

  return (
    <div className={`visual-menu-card ${themeClass}`}>
      <div className="menu-card-header">
        <h4>{type.toUpperCase()}</h4>
      </div>
      <div className="menu-card-body">
        <p className="menu-item-text">{menuItem}</p>
        <button className="apply-btn" onClick={onApply}>
          Apply for tomorrow
        </button>
      </div>
    </div>
  );
};

export default MealCard;