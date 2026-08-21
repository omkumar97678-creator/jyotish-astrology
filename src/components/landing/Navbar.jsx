import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { t } from '@/translations';
import LanguageToggle from '@/components/LanguageToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { lang } = useLang();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await signOut();
    setMobileOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: t.nav_kundli[lang] || 'Kundli', path: '/kundli', icon: '☸' },
    { name: t.nav_numerology[lang] || 'Numerology', path: '/numerology', icon: '∑' },
    { name: t.nav_gunmilan[lang] || 'Gun Milan', path: '/gunmilan', icon: '⚭' },
    { name: t.nav_horoscope[lang] || 'Horoscope', path: '/horoscope', icon: '☽' },
    { name: t.nav_voice[lang] || 'Voice Consultation', path: '/voice', icon: '🎙️' },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 w-full z-50"
        style={{
          background:
            scrolled || location.pathname !== '/' || mobileOpen
              ? 'rgba(13,15,43,0.95)'
              : 'rgba(13,15,43,0.5)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          transition: 'all 0.35s var(--ease-smooth)',
        }}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-[60px] sm:h-[72px] flex items-center justify-between gap-2">
          {/* Logo */}
          <Link
            to="/"
            className="font-display text-base sm:text-xl whitespace-nowrap flex items-center gap-1.5 flex-shrink-0"
            style={{ color: 'var(--col-copper)' }}
          >
            <span style={{ fontSize: '1.2rem' }}>✦</span>
            <span>ज्योतिष</span>
          </Link>

          {/* Desktop Links (Hidden on mobile/tablet) */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => {
              const isActive = location.pathname === l.path;
              return (
                <Link
                  key={l.path}
                  to={l.path}
                  className="text-sm font-medium transition-all flex items-center gap-1.5"
                  style={{
                    color: isActive
                      ? 'var(--col-copper)'
                      : l.path === '/voice'
                      ? '#2AABA8'
                      : 'var(--col-moonstone-dim)',
                    background:
                      l.path === '/voice'
                        ? 'rgba(42, 171, 168, 0.08)'
                        : 'transparent',
                    border:
                      l.path === '/voice'
                        ? '1px solid rgba(42, 171, 168, 0.25)'
                        : '1px solid transparent',
                    padding: l.path === '/voice' ? '4px 10px' : '0',
                    borderRadius: l.path === '/voice' ? '12px' : '0',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive && l.path !== '/voice') e.currentTarget.style.color = 'var(--col-moonstone)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive && l.path !== '/voice') e.currentTarget.style.color = 'var(--col-moonstone-dim)';
                  }}
                >
                  {l.path === '/voice' && <span style={{ fontSize: '13px' }}>🎙️</span>}
                  <span>{l.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side: Language Toggle, Auth/CTA (Desktop), and Hamburger Menu (Mobile) */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <LanguageToggle />

            {/* Auth Buttons for Desktop/Tablet */}
            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/kundli"
                  className="btn-ghost text-xs sm:text-sm whitespace-nowrap flex items-center gap-1.5"
                  style={{ padding: '7px 14px', color: 'var(--col-copper)', border: '1px solid rgba(200, 130, 42, 0.3)' }}
                >
                  <User size={14} />
                  <span>{user.name ? user.name.slice(0, 10) : t.my_account[lang]}</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  title="Log out"
                  className="p-2 rounded-xl text-xs transition-colors hover:text-white"
                  style={{ color: 'var(--col-moonstone-dim)' }}
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2.5">
                <Link
                  to="/login"
                  className="btn-ghost text-xs sm:text-sm whitespace-nowrap"
                  style={{ padding: '7px 14px', color: 'var(--col-moonstone)' }}
                >
                  {t.sign_in_nav[lang]}
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary text-xs sm:text-sm whitespace-nowrap"
                  style={{ padding: '8px 18px' }}
                >
                  {t.nav_cta[lang]}
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle Button - Always visible on mobile */}
            <button
              type="button"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden p-2 sm:p-2.5 rounded-xl glass-card flex items-center justify-center transition-colors min-w-[38px] min-h-[38px] cursor-pointer"
              style={{
                color: mobileOpen ? 'var(--col-copper)' : 'var(--col-moonstone)',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Slide-Down Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-0 top-[60px] sm:top-[72px] z-40 lg:hidden px-4 pb-6 pt-3 shadow-2xl"
            style={{
              background: 'rgba(13, 15, 43, 0.98)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(200, 130, 42, 0.3)',
              maxHeight: 'calc(100vh - 64px)',
              overflowY: 'auto',
            }}
          >
            <div className="space-y-1">
              {navLinks.map((l) => {
                const isActive = location.pathname === l.path;
                return (
                  <Link
                    key={l.path}
                    to={l.path}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between p-3.5 rounded-xl transition-all"
                    style={{
                      background: isActive ? 'rgba(200, 130, 42, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                      border: isActive
                        ? '1px solid rgba(200, 130, 42, 0.4)'
                        : '1px solid rgba(255, 255, 255, 0.05)',
                      color: isActive ? 'var(--col-copper)' : 'var(--col-moonstone)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span style={{ fontSize: '18px', color: 'var(--col-copper)' }}>{l.icon}</span>
                      <span className="font-medium text-sm">{l.name}</span>
                    </div>
                    {isActive && (
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--col-copper)', color: '#0D0F2B', fontWeight: 600 }}>
                        Active
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-[rgba(255,255,255,0.08)] space-y-2.5">
              {user ? (
                <>
                  <Link
                    to="/kundli"
                    onClick={() => setMobileOpen(false)}
                    className="btn-ghost w-full text-center justify-center py-3 text-sm flex items-center gap-2"
                    style={{ color: 'var(--col-copper)', border: '1px solid rgba(200, 130, 42, 0.3)' }}
                  >
                    <User size={16} />
                    <span>{user.name ? user.name : t.my_account[lang]}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full py-2.5 text-xs text-center flex items-center justify-center gap-1.5 cursor-pointer"
                    style={{ color: 'var(--col-moonstone-dim)' }}
                  >
                    <LogOut size={14} />
                    <span>Log Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary w-full text-center justify-center py-3.5 text-sm font-semibold"
                  >
                    {t.nav_cta[lang]}
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="btn-ghost w-full text-center justify-center py-2.5 text-xs"
                    style={{ color: 'var(--col-moonstone)' }}
                  >
                    {t.sign_in_nav[lang]}
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}