import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import StarField from '@/components/StarField';
import KundliChart from '@/components/KundliChart';
import GoogleIcon from '@/components/GoogleIcon';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';
import { signUpWithEmail, signInWithGoogle } from '@/lib/auth';

export default function Signup() {
  const { lang } = useLang();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Validation helpers
  const isNameValid = formData.name.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  const isPasswordValid = formData.password.length >= 8;
  const isConfirmValid = formData.confirmPassword.length > 0 && formData.password === formData.confirmPassword;
  const isFormValid = isNameValid && isEmailValid && isPasswordValid && isConfirmValid && formData.agreeTerms;

  // Password strength calculation
  const calculateStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd) || /[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    if (pwd.length >= 12) score += 1;
    return Math.max(1, Math.min(4, score));
  };

  const strength = calculateStrength(formData.password);
  const strengthLabels = [
    '',
    t.strength_weak[lang],
    t.strength_fair[lang],
    t.strength_good[lang],
    t.strength_strong[lang],
  ];
  const strengthColors = ['', '#EF4444', '#F59E0B', '#C8822A', '#2AABA8'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setAuthError('');
    setLoading(true);
    try {
      await signUpWithEmail(formData.email.trim(), formData.password, formData.name.trim());
      setIsSuccess(true);
    } catch (err) {
      console.warn('Signup error:', err);
      setAuthError(err.message || 'Signup failed. Please check details and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError('');
    try {
      await signInWithGoogle();
    } catch (err) {
      console.warn('Google sign-in error:', err);
      setAuthError(err.message || 'Google sign-in failed.');
    }
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
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="signup-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
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
                    {t.signup_title[lang]}
                  </h1>
                  <p className="mt-1 text-xs sm:text-sm" style={{ color: 'var(--col-moonstone-dim)' }}>
                    {t.signup_subtitle[lang]}
                  </p>
                </div>

                {/* Auth Error Banner */}
                <AnimatePresence>
                  {authError && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -8 }}
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
                      <span>{authError}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 4. Google Sign In Button (Priority) */}
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

                {/* 5. Divider */}
                <div className="my-6 flex items-center justify-center gap-3 text-[11px] sm:text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>
                  <div className="flex-1 h-[1px]" style={{ background: 'rgba(255, 255, 255, 0.08)' }} />
                  <span>{t.or_email[lang]}</span>
                  <div className="flex-1 h-[1px]" style={{ background: 'rgba(255, 255, 255, 0.08)' }} />
                </div>

                {/* 6. Form Fields */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                  >
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--col-moonstone-dim)' }}>
                      {t.full_name[lang]}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'var(--col-moonstone-dim)' }} />
                      <input
                        type="text"
                        placeholder="Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onBlur={() => setTouched({ ...touched, name: true })}
                        className="input-base w-full text-sm"
                        style={{ paddingLeft: '44px' }}
                        required
                      />
                    </div>
                    {touched.name && !isNameValid && (
                      <p className="mt-1 text-[11px]" style={{ color: '#F59E0B' }}>
                        {lang === 'hinglish' ? 'Kripya poora naam daalo (kam se kam 2 characters)' : 'Please enter full name (min 2 characters)'}
                      </p>
                    )}
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--col-moonstone-dim)' }}>
                      {t.email_address[lang]}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'var(--col-moonstone-dim)' }} />
                      <input
                        type="email"
                        placeholder="rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onBlur={() => setTouched({ ...touched, email: true })}
                        className="input-base w-full text-sm"
                        style={{ paddingLeft: '44px' }}
                        required
                      />
                    </div>
                    {touched.email && !isEmailValid && (
                      <p className="mt-1 text-[11px]" style={{ color: '#F59E0B' }}>
                        {lang === 'hinglish' ? 'Sahi email address daalein' : 'Please enter a valid email address'}
                      </p>
                    )}
                  </motion.div>

                  {/* Password */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--col-moonstone-dim)' }}>
                      {t.password[lang]}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'var(--col-moonstone-dim)' }} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Min 8 characters"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        onBlur={() => setTouched({ ...touched, password: true })}
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

                    {/* 7. Password Strength Indicator */}
                    {formData.password.length > 0 && (
                      <div className="mt-2 space-y-1">
                        <div className="flex gap-1.5 h-1.5 w-full">
                          {[1, 2, 3, 4].map((seg) => (
                            <div
                              key={seg}
                              className="flex-1 rounded-full transition-all duration-300"
                              style={{
                                background:
                                  strength >= seg
                                    ? strengthColors[strength]
                                    : 'rgba(255, 255, 255, 0.1)',
                              }}
                            />
                          ))}
                        </div>
                        <div className="flex justify-between text-[11px]" style={{ color: 'var(--col-moonstone-dim)' }}>
                          <span>{t.pwd_strength[lang]}:</span>
                          <span style={{ color: strengthColors[strength], fontWeight: 600 }}>
                            {strengthLabels[strength]}
                          </span>
                        </div>
                      </div>
                    )}

                    {touched.password && !isPasswordValid && (
                      <p className="mt-1 text-[11px]" style={{ color: '#F59E0B' }}>
                        {lang === 'hinglish' ? 'Password mein kam se kam 8 characters hone chahiye' : 'Password must be at least 8 characters'}
                      </p>
                    )}
                  </motion.div>

                  {/* Confirm Password */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--col-moonstone-dim)' }}>
                      {t.confirm_password[lang]}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'var(--col-moonstone-dim)' }} />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Repeat password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        onBlur={() => setTouched({ ...touched, confirmPassword: true })}
                        className="input-base w-full text-sm"
                        style={{ paddingLeft: '44px', paddingRight: '44px' }}
                        required
                      />
                      <button
                        type="button"
                        aria-label="Toggle confirm password visibility"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-xs cursor-pointer"
                        style={{ color: 'var(--col-moonstone-dim)' }}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {touched.confirmPassword && !isConfirmValid && (
                      <p className="mt-1 text-[11px]" style={{ color: '#F59E0B' }}>
                        {lang === 'hinglish' ? 'Passwords match nahi kar rahe hain' : 'Passwords do not match'}
                      </p>
                    )}
                  </motion.div>

                  {/* 8. Terms Checkbox */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="pt-1"
                  >
                    <label className="flex items-start gap-2.5 text-xs cursor-pointer select-none" style={{ color: 'var(--col-moonstone-dim)' }}>
                      <input
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                        className="mt-0.5"
                        style={{ accentColor: 'var(--col-copper)', width: 15, height: 15 }}
                        required
                      />
                      <span className="leading-relaxed">
                        {lang === 'hinglish' ? (
                          <>
                            Main{' '}
                            <a href="#terms" className="hover:underline font-medium" style={{ color: 'var(--col-copper)' }}>
                              Terms of Service
                            </a>{' '}
                            aur{' '}
                            <a href="#privacy" className="hover:underline font-medium" style={{ color: 'var(--col-copper)' }}>
                              Privacy Policy
                            </a>{' '}
                            se sehmat hoon.
                          </>
                        ) : (
                          <>
                            I agree to the{' '}
                            <a href="#terms" className="hover:underline font-medium" style={{ color: 'var(--col-copper)' }}>
                              Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="#privacy" className="hover:underline font-medium" style={{ color: 'var(--col-copper)' }}>
                              Privacy Policy
                            </a>
                            .
                          </>
                        )}
                      </span>
                    </label>
                  </motion.div>

                  {/* 9. Sign Up Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-2"
                  >
                    <button
                      type="submit"
                      disabled={!isFormValid || loading}
                      className="btn-primary w-full justify-center py-3.5 text-sm font-semibold cursor-pointer"
                      style={{
                        opacity: isFormValid ? 1 : 0.5,
                        boxShadow: isFormValid ? '0 0 24px rgba(200, 130, 42, 0.35)' : 'none',
                      }}
                    >
                      {loading ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                          <span>{lang === 'hinglish' ? 'Ban raha hai...' : 'Creating Account...'}</span>
                        </span>
                      ) : (
                        t.create_account_btn[lang]
                      )}
                    </button>
                  </motion.div>
                </form>

                {/* 10. Login Link */}
                <div className="mt-6 text-center text-xs sm:text-sm" style={{ color: 'var(--col-moonstone-dim)' }}>
                  {t.already_account[lang]}{' '}
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
              /* Success State */
              <motion.div
                key="signup-success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="text-center py-4 space-y-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                  className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
                  style={{
                    background: 'rgba(200, 130, 42, 0.15)',
                    border: '1px solid rgba(200, 130, 42, 0.4)',
                    color: 'var(--col-copper)',
                    fontSize: '28px',
                    boxShadow: '0 0 30px rgba(200, 130, 42, 0.35)',
                  }}
                >
                  ✦
                </motion.div>

                <h2 className="font-display text-2xl" style={{ color: 'var(--col-moonstone)' }}>
                  {t.account_created[lang]}
                </h2>

                <p className="text-xs sm:text-sm max-w-xs mx-auto" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
                  {t.verify_email_note[lang]}
                </p>

                <div className="pt-4 flex flex-col gap-3">
                  <Link
                    to="/onboarding"
                    className="btn-primary w-full justify-center py-3.5 text-sm font-semibold"
                    style={{ boxShadow: '0 0 24px rgba(200, 130, 42, 0.35)' }}
                  >
                    {lang === 'hinglish' ? 'Kundli Shuru Karo →' : 'Begin Kundli Setup →'}
                  </Link>
                  <Link
                    to="/login"
                    className="btn-ghost w-full justify-center py-2.5 text-xs"
                    style={{ color: 'var(--col-moonstone-dim)' }}
                  >
                    {t.signin_link[lang]}
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
