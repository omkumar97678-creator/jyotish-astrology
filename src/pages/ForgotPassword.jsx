import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, KeyRound, CheckCircle2, RotateCcw } from 'lucide-react';
import StarField from '@/components/StarField';
import KundliChart from '@/components/KundliChart';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';
import { resetPassword } from '@/lib/auth';

export default function ForgotPassword() {
  const { lang } = useLang();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let timer;
    if (isSubmitted && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            setCanResend(true);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSubmitted, countdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setError('');
    setLoading(true);
    try {
      await resetPassword(email.trim());
      setIsSubmitted(true);
      setCountdown(60);
      setCanResend(false);
    } catch (err) {
      console.warn('Reset password error:', err);
      setError(err.message || 'Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setCanResend(false);
    setCountdown(60);
    try {
      await resetPassword(email.trim());
    } catch (err) {
      console.warn('Resend error:', err);
    }
  };

  const formatCountdown = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
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
          {/* Top Bar with Back Arrow and Logo */}
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs transition-colors hover:text-white"
              style={{ color: 'var(--col-moonstone-dim)' }}
            >
              <ArrowLeft size={14} />
              <span>{t.back_to_login[lang]}</span>
            </Link>

            <Link
              to="/"
              className="font-display text-base inline-flex items-center gap-1 transition-transform hover:scale-105"
              style={{ color: 'var(--col-copper)' }}
            >
              <span>✦</span>
              <span>ज्योतिष</span>
            </Link>
          </div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              /* PHASE A: Email Input Form */
              <motion.div
                key="forgot-phase-a"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                {/* 2. Key Icon */}
                <div className="flex justify-center my-3">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(200, 130, 42, 0.12)',
                      border: '1px solid rgba(200, 130, 42, 0.35)',
                      color: 'var(--col-copper)',
                      boxShadow: '0 0 24px rgba(200, 130, 42, 0.25)',
                    }}
                  >
                    <KeyRound size={28} />
                  </div>
                </div>

                {/* 3. Title & Subtitle */}
                <h1 className="font-display text-2xl sm:text-[26px] tracking-tight mt-2" style={{ color: 'var(--col-moonstone)' }}>
                  {t.forgot_title[lang]}
                </h1>
                <p className="mt-1.5 text-xs sm:text-sm text-center max-w-xs mx-auto mb-6" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.5 }}>
                  {t.forgot_subtitle[lang]}
                </p>

                {/* 4. Email Input & Form */}
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div>
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
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* 5. Send Reset Link Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading || !email.trim()}
                      className="btn-primary w-full justify-center py-3.5 text-sm font-semibold cursor-pointer"
                      style={{
                        boxShadow: '0 0 24px rgba(200, 130, 42, 0.35)',
                      }}
                    >
                      {loading ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                          <span>{lang === 'hinglish' ? 'Bhej rahe hain...' : 'Sending Link...'}</span>
                        </span>
                      ) : (
                        t.send_reset_link[lang]
                      )}
                    </button>
                  </div>
                </form>

                {/* 6. Back to login link */}
                <div className="mt-6 text-center text-xs sm:text-sm" style={{ color: 'var(--col-moonstone-dim)' }}>
                  {t.remember_pwd[lang]}{' '}
                  <Link
                    to="/login"
                    className="font-semibold transition-colors hover:underline ml-1"
                    style={{ color: 'var(--col-copper)' }}
                  >
                    {t.signin_link[lang]}
                  </Link>
                </div>
              </motion.div>
            ) : (
              /* PHASE B: Success Screen */
              <motion.div
                key="forgot-phase-b"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="text-center py-2 space-y-4"
              >
                {/* Email Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                  className="w-18 h-18 rounded-full mx-auto flex items-center justify-center"
                  style={{
                    background: 'rgba(200, 130, 42, 0.15)',
                    border: '1px solid rgba(200, 130, 42, 0.45)',
                    color: 'var(--col-copper)',
                    fontSize: '32px',
                    boxShadow: '0 0 32px rgba(200, 130, 42, 0.35)',
                  }}
                >
                  <Mail size={32} />
                </motion.div>

                <h2 className="font-display text-2xl" style={{ color: 'var(--col-moonstone)' }}>
                  {t.check_email_title[lang]}
                </h2>

                <p className="text-xs sm:text-sm max-w-xs mx-auto" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
                  {t.reset_link_sent[lang]}
                  <span className="block mt-1 font-semibold text-sm" style={{ color: 'var(--col-copper)' }}>
                    {email}
                  </span>
                </p>

                {/* Helpful Note Box */}
                <div
                  className="p-3.5 rounded-xl text-xs space-y-2 text-left"
                  style={{
                    background: 'rgba(42, 171, 168, 0.08)',
                    border: '1px solid rgba(42, 171, 168, 0.35)',
                  }}
                >
                  <p style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
                    {t.didnt_receive_note[lang]}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      disabled={!canResend}
                      onClick={handleResend}
                      className="inline-flex items-center gap-1.5 font-semibold text-xs transition-opacity cursor-pointer"
                      style={{
                        color: 'var(--col-copper)',
                        opacity: canResend ? 1 : 0.4,
                      }}
                    >
                      <RotateCcw size={13} />
                      <span>{t.resend_email[lang]}</span>
                    </button>

                    {!canResend && (
                      <span className="font-mono-num text-[11px]" style={{ color: 'var(--col-moonstone-dim)' }}>
                        {t.resend_available_in[lang]} {formatCountdown(countdown)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Back to Login button */}
                <div className="pt-3">
                  <Link
                    to="/login"
                    className="btn-ghost w-full justify-center py-3 text-xs sm:text-sm"
                    style={{ color: 'var(--col-moonstone)' }}
                  >
                    ← {t.back_to_login[lang]}
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}
