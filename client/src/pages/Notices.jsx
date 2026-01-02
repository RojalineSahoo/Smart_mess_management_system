import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import NoticeBoard from '../components/NoticeBoard';
import '../styles/global.css'; // or notices.css if you created one

const Notices = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar role="student" />
      <main className="dashboard-main">
        <Navbar pageTitle="Notices & Announcements" />
        <div className="content-area">
          {/* This component displays the list of notices */}
          <NoticeBoard />
        </div>
      </main>
    </div>
  );
};

// THIS IS THE MISSING LINE:
export default Notices;