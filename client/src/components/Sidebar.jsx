import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Utensils, 
  Calendar, 
  User, 
  LogOut, 
  Settings, 
  ShieldCheck, 
  History 
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Define navigation links based on roles
  const studentLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Weekly Menu', path: '/menu', icon: <Calendar size={20} /> },
    { name: 'My History', path: '/history', icon: <History size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
  ];

  const adminLinks = [
    { name: 'Admin Control', path: '/admin', icon: <ShieldCheck size={20} /> },
    { name: 'Manage Menu', path: '/menu', icon: <Utensils size={20} /> },
    { name: 'User Records', path: '/users', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-2xl font-black text-emerald-500 tracking-tighter">SMART MESS</h2>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
          {user?.role} Portal
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {/* Render Student Links */}
        {user?.role === 'student' && studentLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              }`
            }
          >
            {link.icon} <span className="font-medium">{link.name}</span>
          </NavLink>
        ))}

        {/* Render Admin Links */}
        {user?.role === 'admin' && adminLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              }`
            }
          >
            {link.icon} <span className="font-medium">{link.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700 space-y-2">
        <NavLink to="/settings" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-all">
          <Settings size={20} /> <span className="font-medium">Settings</span>
        </NavLink>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all font-medium"
        >
          <LogOut size={20} /> Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;