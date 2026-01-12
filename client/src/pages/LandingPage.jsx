import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, BarChart3, Clock, ArrowRight, UtensilsCrossed } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-slate-900 text-white min-h-screen font-sans selection:bg-emerald-500/30">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500 p-2 rounded-lg">
            <UtensilsCrossed size={24} className="text-slate-900" />
          </div>
          <span className="text-xl font-black tracking-tighter">SMART MESS</span>
        </div>
        <Link to="/login" className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105">
          Staff & Student Login
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
          Modernizing Mess Ops <br />
          <span className="text-emerald-500 italic">One Meal at a Time.</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          The industry-leading MERN platform for university hostels to eliminate food waste, 
          automate attendance, and provide real-time analytics to kitchen staff.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/login" className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-slate-200 transition-all">
            Get Started <ArrowRight size={20} />
          </Link>
          <button className="bg-slate-800 border border-slate-700 px-8 py-4 rounded-2xl font-bold hover:bg-slate-700 transition-all">
            Watch Demo
          </button>
        </div>
      </header>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Zap className="text-amber-400" />, title: "Live Analytics", desc: "Kitchen staff gets real-time headcounts to prevent overcooking and reduce costs." },
            { icon: <ShieldCheck className="text-emerald-400" />, title: "Secure Wallet", desc: "Digital credit system for students to apply for meals without physical tokens." },
            { icon: <Clock className="text-blue-400" />, title: "Time-Lock Logic", desc: "Strict application cut-offs ensure the mess manager has accurate data hours in advance." }
          ].map((feature, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl hover:border-emerald-500/50 transition-all group">
              <div className="mb-4 p-3 bg-slate-900 w-fit rounded-2xl group-hover:scale-110 transition-transform">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 text-center text-slate-500 text-sm">
        <p>© 2026 Smart Mess Management System. Built with MERN Stack.</p>
      </footer>
    </div>
  );
};

export default LandingPage;