import React from 'react';
import '../styles/menu.css';

const MealCard = ({ day, date, breakfast, lunch, dinner }) => {
  return (
    <div className="meal-card">
      <div className="card-header">
        <h3>{day}</h3>
        <p>{date}</p>
      </div>
      <div className="meal-section">
        <label>Breakfast</label>
        <p>{breakfast}</p>
      </div>
      <div className="meal-section">
        <label>Lunch</label>
        <p>{lunch}</p>
      </div>
      <div className="meal-section">
        <label>Dinner</label>
        <p>{dinner}</p>
      </div>
    </div>
  );
};

export default MealCard;