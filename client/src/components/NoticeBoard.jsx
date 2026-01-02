import React from 'react';

const NoticeBoard = ({ notices }) => {
  return (
    <div className="notice-container">
      <h3 className="section-title">Smart Notice Board</h3>
      <div className="notice-list">
        {notices.map((notice, index) => (
          <div key={index} className="notice-card">
            <p className="notice-text">{notice.title}</p>
            <span className="notice-date">{notice.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeBoard;