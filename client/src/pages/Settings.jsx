import React from 'react';
import { Shield, Bell, Smartphone, Globe } from 'lucide-react';

const Settings = () => {
  return (
    <div className="p-8 bg-slate-900 min-h-screen text-slate-100 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-slate-400 mb-10">Configure your account and security preferences.</p>

      <div className="space-y-4">
        {[
          { icon: <Shield className="text-blue-400" />, title: 'Security', desc: 'Manage your password and 2FA.' },
          { icon: <Bell className="text-amber-400" />, title: 'Notifications', desc: 'Configure meal reminders and alerts.' },
          { icon: <Smartphone className="text-emerald-400" />, title: 'Devices', desc: 'See where you are currently logged in.' },
          { icon: <Globe className="text-purple-400" />, title: 'Language', desc: 'Change the display language.' },
        ].map((item, i) => (
          <div key={i} className="bg-slate-800 border border-slate-700 p-6 rounded-2xl flex items-center justify-between hover:border-slate-500 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-900 rounded-xl">{item.icon}</div>
              <div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            </div>
            <button className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;