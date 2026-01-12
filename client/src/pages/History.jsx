/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { API } from '../services/api';
import { Search, Filter, Calendar as CalIcon, Download } from 'lucide-react';

const History = () => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchHistory = async () => {
      const { data } = await API.get('/meals/history');
      setLogs(data);
    };
    fetchHistory();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Consumed': return 'bg-emerald-500/10 text-emerald-500';
      case 'Applied': return 'bg-blue-500/10 text-blue-500';
      case 'Missed': return 'bg-rose-500/10 text-rose-500';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  return (
    <div className="p-8 bg-slate-900 min-h-screen text-slate-100">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold">Meal History</h1>
          <p className="text-slate-400">Track your past applications and consumption records</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm transition-all border border-slate-700">
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden">
        <div className="p-4 border-b border-slate-700 flex flex-wrap gap-4 items-center bg-slate-800/50">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-10 pr-4 focus:border-emerald-500 outline-none text-sm" placeholder="Search by date..." />
          </div>
          <select 
            className="bg-slate-900 border border-slate-700 rounded-xl py-2 px-4 text-sm focus:border-emerald-500 outline-none"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="consumed">Consumed</option>
            <option value="missed">Missed</option>
          </select>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-500 text-[11px] uppercase tracking-widest border-b border-slate-700">
              <th className="p-6">Meal Date</th>
              <th className="p-6">Meal Type</th>
              <th className="p-6">Menu Item</th>
              <th className="p-6">Cost</th>
              <th className="p-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {logs.map((log, i) => (
              <tr key={i} className="hover:bg-slate-700/20 transition-colors">
                <td className="p-6 font-medium flex items-center gap-3">
                  <CalIcon size={16} className="text-slate-500" /> {new Date(log.date).toLocaleDateString()}
                </td>
                <td className="p-6">{log.mealType}</td>
                <td className="p-6 text-slate-400">{log.menuItem || 'Standard Meal'}</td>
                <td className="p-6 font-bold text-emerald-400">₹{log.amount}</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${getStatusColor(log.status)}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;