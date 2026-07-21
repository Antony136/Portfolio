import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, Mail, TrendingUp, Shield, LogOut, BarChart2, Clock, User } from 'lucide-react';

const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'https://portfolio-o6p3.onrender.com';

/* ── tiny bar for 7-day chart ── */
const MiniBar = ({ count, max, date }) => {
  const height = max > 0 ? Math.max((count / max) * 60, count > 0 ? 6 : 2) : 2;
  const label = new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short' });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1 }}>
      <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{count}</span>
      <div style={{
        width: '100%', height: `${height}px`, borderRadius: '3px',
        background: count > 0
          ? 'linear-gradient(180deg, var(--accent-primary), var(--accent-secondary))'
          : 'var(--glass-border)',
        transition: 'height 0.5s ease',
        minHeight: '3px',
      }} />
      <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>{label}</span>
    </div>
  );
};

/* ── stat card ── */
const StatCard = ({ icon, label, value, accent }) => (
  <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
    <div style={{
      width: '42px', height: '42px', borderRadius: '10px', flexShrink: 0,
      background: `${accent}18`, border: `1px solid ${accent}30`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent,
    }}>
      {icon}
    </div>
    <div>
      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
      <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>{value}</div>
    </div>
  </div>
);

const AdminDashboard = ({ onClose }) => {
  const [view, setView] = useState('login'); // 'login' | 'dashboard'
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  // restore session
  useEffect(() => {
    const token = sessionStorage.getItem('admin_token');
    if (token) { setView('fetching'); fetchDashboard(token); }
  }, []);

  const fetchDashboard = async (token) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) {
        setData(json);
        setView('dashboard');
      } else {
        sessionStorage.removeItem('admin_token');
        setView('login');
      }
    } catch {
      setError('Cannot reach backend.');
      setView('login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(creds),
      });
      const json = await res.json();
      if (json.success) {
        sessionStorage.setItem('admin_token', json.token);
        fetchDashboard(json.token);
      } else {
        setError(json.message || 'Invalid credentials.');
        setLoading(false);
      }
    } catch {
      setError('Cannot reach backend. Is it running?');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    setData(null);
    setView('login');
    setCreds({ username: '', password: '' });
  };

  const maxVisit = data ? Math.max(...(data.last7Days?.map(d => d.count) || [1]), 1) : 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        style={{
          width: '100%', maxWidth: view === 'dashboard' ? '700px' : '400px',
          maxHeight: '90vh', overflowY: 'auto',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--glass-border)',
          borderRadius: '24px',
          padding: '32px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Shield size={18} color="white" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1 }}>Admin Dashboard</h2>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Portfolio Analytics</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {view === 'dashboard' && (
              <button onClick={handleLogout} style={{ background: 'none', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '6px 12px', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
                <LogOut size={14} /> Logout
              </button>
            )}
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex' }}>
              <X size={22} />
            </button>
          </div>
        </div>

        {/* LOGIN FORM */}
        {(view === 'login' || view === 'fetching') && (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Username</label>
              <input
                type="text" autoComplete="username"
                value={creds.username}
                onChange={e => setCreds(p => ({ ...p, username: e.target.value }))}
                placeholder="admin"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '10px', padding: '12px 14px', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Password</label>
              <input
                type="password" autoComplete="current-password"
                value={creds.password}
                onChange={e => setCreds(p => ({ ...p, password: e.target.value }))}
                placeholder="••••••••"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '10px', padding: '12px 14px', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none' }}
              />
            </div>
            {error && <p style={{ color: '#ef4444', fontSize: '0.85rem', margin: 0 }}>{error}</p>}
            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: '4px',
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                border: 'none', borderRadius: '10px', padding: '13px',
                color: 'white', fontWeight: '700', fontSize: '0.95rem',
                cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        )}

        {/* DASHBOARD */}
        {view === 'dashboard' && data && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
              <StatCard icon={<Eye size={20} />} label="Total Visits" value={data.totalVisits.toLocaleString()} accent="var(--accent-primary)" />
              <StatCard icon={<TrendingUp size={20} />} label="Today" value={data.todayVisits} accent="#10b981" />
              <StatCard icon={<Mail size={20} />} label="Messages" value={data.totalMessages} accent="#f59e0b" />
            </div>

            {/* 7-day chart */}
            <div className="glass-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <BarChart2 size={16} color="var(--accent-primary)" />
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Visits — Last 7 Days</span>
              </div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', height: '80px' }}>
                {data.last7Days.map((d, i) => (
                  <MiniBar key={i} count={d.count} max={maxVisit} date={d.date} />
                ))}
              </div>
            </div>

            {/* Recent messages */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Mail size={16} color="var(--accent-secondary)" />
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recent Contact Messages</span>
              </div>
              {data.recentMessages.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center', padding: '20px' }}>No messages yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '320px', overflowY: 'auto' }}>
                  {data.recentMessages.map((msg, i) => (
                    <div key={i} className="glass-card" style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px', gap: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <User size={14} color="white" />
                          </div>
                          <div>
                            <span style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--text-primary)' }}>{msg.name}</span>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', display: 'block' }}>{msg.email}</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '0.7rem', flexShrink: 0 }}>
                          <Clock size={11} />
                          {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--accent-primary)', marginBottom: '4px' }}>{msg.subject}</div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5', margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

/* ════════════════════════════════════
   FOOTER + hidden admin trigger
   ════════════════════════════════════ */
const Footer = () => {
  const [showAdmin, setShowAdmin] = useState(false);

  // Ping backend on load to register a visit
  useEffect(() => {
    const API = window.location.hostname === 'localhost'
      ? 'http://localhost:5000'
      : 'https://portfolio-o6p3.onrender.com';
    fetch(API).catch(() => {});
  }, []);

  return (
    <>
      <AnimatePresence>
        {showAdmin && <AdminDashboard onClose={() => setShowAdmin(false)} />}
      </AnimatePresence>

      <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '40px 20px', textAlign: 'center', position: 'relative' }}>
        <div className="container mx-auto">
          <h2 className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>Portfolio.</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Built with MERN Stack • Designed with Passion
          </p>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            &copy; {new Date().getFullYear()} Antony Abishek A. All rights reserved.
          </div>
        </div>

        {/* Hidden Admin Button — bottom right */}
        <button
          onClick={() => setShowAdmin(true)}
          aria-label="Admin Login"
          title="Admin"
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '20px',
            background: 'none',
            border: '1px solid var(--glass-border)',
            borderRadius: '8px',
            padding: '5px 10px',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            fontSize: '0.65rem',
            opacity: 0.35,
            transition: 'opacity 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '1'}
          onMouseLeave={e => e.currentTarget.style.opacity = '0.35'}
        >
          <Shield size={12} /> Admin
        </button>
      </footer>
    </>
  );
};

export default Footer;
