/* eslint-disable react-hooks/immutability */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { API } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Megaphone, Trash2, Clock, ShieldAlert } from 'lucide-react';

const NoticeHub = () => {
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const { data } = await API.get('/notices');
      setNotices(data);
    } catch (err) {
      console.error("Could not fetch notices");
    }
  };

  const deleteNotice = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    try {
      await API.delete(`/notices/${id}`);
      fetchNotices();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="p-8 bg-slate-900 min-h-screen text-slate-100">
      <div className="mb-10">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Megaphone className="text-emerald-400" /> Notice Center
        </h1>
        <p className="text-slate-400 text-sm mt-1">Official updates and announcements from the Mess Management.</p>
      </div>

      <div className="grid gap-6 max-w-4xl">
        {notices.length > 0 ? notices.map((notice) => (
          <div key={notice._id} className="bg-slate-800 border border-slate-700 p-6 rounded-2xl relative group hover:border-emerald-500/50 transition-all">
            <div className="flex justify-between items-start mb-3">
              <span className={`text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest ${
                notice.priority === 'high' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {notice.priority || 'General'} Update
              </span>
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <Clock size={14} /> {new Date(notice.createdAt).toLocaleDateString()}
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-2">{notice.title}</h3>
            <p className="text-slate-400 leading-relaxed">{notice.content}</p>

            {isAdmin && (
              <button 
                onClick={() => deleteNotice(notice._id)}
                className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-rose-500 transition-all"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        )) : (
          <div className="text-center py-20 bg-slate-800/30 rounded-3xl border border-dashed border-slate-700">
            <ShieldAlert className="mx-auto text-slate-600 mb-4" size={48} />
            <p className="text-slate-500">No active notices at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeHub;