import React, { useState } from 'react';
import "../styles/notices.css";

const Notices = ({ notices }) => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="notice-section">
      <h3 className="section-title">Smart Notice Board</h3>
      <div className="notice-scroll-wrapper">
        <div className="compact-notice-list">
          {notices.map((notice) => (
            <div 
              key={notice.id} 
              className={`slim-notice-card ${hoveredId === notice.id ? 'is-hovered' : ''}`}
              onMouseEnter={() => setHoveredId(notice.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="slim-header">
                <div className="title-flex">
                  <span className="dot"></span>
                  <h4 className="notice-title-main">{notice.title}</h4>
                </div>
                <span className="notice-date-tag">{notice.date}</span>
              </div>
              
              <div className="reveal-container">
                <div className="inner-content">
                  <p className="notice-text-content">{notice.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notices;