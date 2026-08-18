import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import StarField from '@/components/StarField';
import KundliChart from '@/components/KundliChart';
import GoogleIcon from '@/components/GoogleIcon';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function Login() {
  const { lang } = useLang();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError(t.invalid_creds[lang]);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Basic mock authentication validation
      if (email.includes('@') && password.length >= 6) {
        const user = {
          name: email.split('@')[0],
          email: email.trim(),
          loggedIn: true,
          rememberMe,
          lastLogin: new Date().toISOString(),
        };
        localStorage.setItem('jyotish_user', JSON.stringify(user));
        setLoading(false);
        navigate('/onboarding');
      } else {
        setLoading(false);
        setError(t.invalid_creds[lang]);
      }
    }, 600);
  };

  const handleGoogleSignIn = () => {
    const user = {
      name: 'Google User',
      email: 'user@gmail.com',
      loggedIn: true,
      provider: 'google',
      lastLogin: new Date().toISOString(),
    };
    localStorage.setItem('jyotish_user', JSON.stringify(user));
    navigate('/onboarding');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-24 sm:py-28 overflow-hidden" style={{ background: 'var(--col-midnight)' }}>
      <StarField count={90} />

      {/* Subtle Background Kundli Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[85vw] max-w-[500px] aspect-square flex items-center justify-center opacity-40">
          <KundliChart size={500} opacity={0.04} />
        </div>
      </div>

      <main className="relative z-10 w-full max-w-[460px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="glass-card shadow-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: 'clamp(24px, 6vw, 40px)',
            boxShadow: '0 0 60px rgba(0, 0, 0, 0.35)',
          }}
        >
          {/* 1. Logo */}
          <div className="text-center mb-2">
            <Link
              to="/"
              className="font-display text-xl inline-flex items-center gap-1.5 transition-transform hover:scale-105"
              style={{ color: 'var(--col-copper)' }}
            >
              <span>✦</span>
              <span>ज्योतिष</span>
            </Link>
          </div>

          {/* 2. Title & Subtitle */}
          <div className="text-center mb-6">
            <h1 className="font-display text-2xl sm:text-[28px] tracking-tight" style={{ color: 'var(--col-moonstone)' }}>
              {t.login_title[lang]}
            </h1>
            <p className="mt-1 text-xs sm:text-sm" style={{ color: 'var(--col-moonstone-dim)' }}>
              {t.login_subtitle[lang]}
            </p>
          </div>

          {/* Error Alert Box */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-5 p-3 rounded-xl flex items-center gap-2.5 text-xs"
                style={{
                  background: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  color: '#F59E0B',
                }}
              >
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: 'var(--col-moonstone)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(200, 130, 42, 0.6)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(200, 130, 42, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <GoogleIcon className="w-5 h-5 flex-shrink-0" />
            <span>{t.google_btn[lang]}</span>
          </button>

          {/* 4. Divider */}
          <div className="my-6 flex items-center justify-center gap-3 text-[11px] sm:text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>
            <div className="flex-1 h-[1px]" style={{ background: 'rgba(255, 255, 255, 0.08)' }} />
            <span>{lang === 'hinglish' ? 'ya' : 'or'}</span>
            <div className="flex-1 h-[1px]" style={{ background: 'rgba(255, 255, 255, 0.08)' }} />
          </div>

          {/* 5. Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--col-moonstone-dim)' }}>
                {t.email_address[lang]}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'var(--col-moonstone-dim)' }} />
                <input
                  type="email"
                  placeholder="rahul@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-base w-full text-sm"
                  style={{ paddingLeft: '44px' }}
                  required
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium" style={{ color: 'var(--col-moonstone-dim)' }}>
                  {t.password[lang]}
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium transition-colors hover:underline"
                  style={{ color: 'var(--col-copper)' }}
                >
                  {t.forgot_password[lang]}
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'var(--col-moonstone-dim)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-base w-full text-sm"
                  style={{ paddingLeft: '44px', paddingRight: '44px' }}
                  required
                />
                <button
                  type="button"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-xs cursor-pointer"
                  style={{ color: 'var(--col-moonstone-dim)' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </motion.div>

            {/* Remember Me Checkbox */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="pt-1"
            >
              <label className="flex items-center gap-2.5 text-xs cursor-pointer select-none" style={{ color: 'var(--col-moonstone-dim)' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: 'var(--col-copper)', width: 15, height: 15 }}
                />
                <span>{t.remember_me[lang]}</span>
              </label>
            </motion.div>

            {/* 7. Login Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="pt-2"
            >
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-3.5 text-sm font-semibold cursor-pointer"
                style={{
                  boxShadow: '0 0 24px rgba(200, 130, 42, 0.35)',
                }}
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                    <span>{lang === 'hinglish' ? 'Sign In ho raha hai...' : 'Signing In...'}</span>
                  </span>
                ) : (
                  t.signin_btn[lang]
                )}
              </button>
            </motion.div>
          </form>

          {/* 8. Signup Link */}
          <div className="mt-6 text-center text-xs sm:text-sm" style={{ color: 'var(--col-moonstone-dim)' }}>
            {t.no_account[lang]}{' '}
            <Link
              to="/signup"
              className="font-semibold transition-colors hover:underline ml-1"
              style={{ color: 'var(--col-copper)' }}
            >
              {t.create_one[lang]}
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
