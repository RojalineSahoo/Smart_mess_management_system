/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { API } from '../services/api';
import { User, Mail, Hash, MapPin, Wallet, ArrowUpRight, ShieldCheck } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { data } = await API.get('/users/profile');
        setProfile(data.user);
        setHistory(data.transactions || []);
      } catch (err) {
        console.error("Failed to load profile");
      }
    };
    fetchProfileData();
  }, []);

  return (
    <div className="p-8 bg-slate-900 min-h-screen text-slate-100">
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-slate-400">Manage your personal information and meal credits</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left: Personal Information */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-3xl">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <User size={20} className="text-emerald-400" /> Personal Details
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-700/50">
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Full Name</label>
                <p className="font-medium">{user?.name || 'N/A'}</p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-700/50">
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Email Address</label>
                <p className="font-medium">{user?.email || 'N/A'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-700/50">
                  <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Roll Number</label>
                  <p className="font-medium">{user?.rollNo || 'N/A'}</p>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-700/50">
                  <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Room No</label>
                  <p className="font-medium">{user?.roomNo || 'N/A'}</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 py-3 border border-slate-600 hover:border-emerald-500 text-slate-300 hover:text-emerald-400 rounded-xl transition-all text-sm font-bold flex items-center justify-center gap-2">
              <ShieldCheck size={16} /> Change Password
            </button>
          </div>
        </div>

        {/* Right: Wallet & History */}
        <div className="xl:col-span-2 space-y-6">
          {/* Wallet Balance Card */}
          <div className="bg-emerald-600 p-8 rounded-3xl relative overflow-hidden shadow-2xl shadow-emerald-900/20">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <p className="text-emerald-100/80 text-sm font-bold uppercase tracking-widest">Available Balance</p>
                  <h2 className="text-5xl font-black mt-1">₹ {profile.balance || '0.00'}</h2>
                </div>
                <div className="p-3 bg-white/10 rounded-2xl">
                  <Wallet size={32} className="text-white" />
                </div>
              </div>
              <button className="bg-white text-emerald-700 px-6 py-2 rounded-xl font-bold hover:bg-emerald-50 transition-all flex items-center gap-2">
                Add Credits <ArrowUpRight size={18} />
              </button>
            </div>
            {/* Decorative circles */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          {/* Transaction History Table */}
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-3xl">
            <h3 className="text-lg font-bold mb-6">Recent Transactions</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-500 text-[11px] uppercase tracking-widest border-b border-slate-700">
                    <th className="pb-4">Date</th>
                    <th className="pb-4">Description</th>
                    <th className="pb-4">Amount</th>
                    <th className="pb-4">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {history.length > 0 ? history.map((tx, i) => (
                    <tr key={i} className="border-b border-slate-700/50 last:border-0">
                      <td className="py-4 text-slate-400">{new Date(tx.date).toLocaleDateString()}</td>
                      <td className="py-4 font-medium">{tx.description}</td>
                      <td className="py-4 font-bold text-rose-400">-{tx.amount}</td>
                      <td className="py-4">
                        <span className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-md text-[10px] font-bold">SUCCESS</span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="py-10 text-center text-slate-500 italic">No transactions found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;