import { supabase, isSupabaseConfigured } from './supabase';

// ── Sign Up with Email ──────────────
export async function signUpWithEmail(email, password, fullName) {
  if (!isSupabaseConfigured()) {
    // Local / Demo mode fallback
    const mockUser = {
      id: 'demo-user-' + Date.now(),
      email,
      user_metadata: { full_name: fullName },
    };
    localStorage.setItem('jyotish_user', JSON.stringify({
      id: mockUser.id,
      email,
      name: fullName,
      loggedIn: true,
      joinedAt: new Date().toISOString(),
    }));
    return { user: mockUser, session: null };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${window.location.origin}/onboarding`,
    },
  });
  if (error) throw error;
  if (data?.user) {
    localStorage.setItem('jyotish_user', JSON.stringify({
      id: data.user.id,
      email: data.user.email,
      name: fullName || data.user.user_metadata?.full_name || email.split('@')[0],
      loggedIn: true,
    }));
  }
  return data;
}

// ── Sign In with Email ──────────────
export async function signInWithEmail(email, password) {
  if (!isSupabaseConfigured()) {
    // Local / Demo mode fallback
    if (email && password.length >= 6) {
      const mockUser = {
        id: 'demo-user-1',
        email,
        name: email.split('@')[0],
        loggedIn: true,
      };
      localStorage.setItem('jyotish_user', JSON.stringify(mockUser));
      return { user: mockUser, session: null };
    }
    throw new Error('Invalid email or password');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  if (data?.user) {
    localStorage.setItem('jyotish_user', JSON.stringify({
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.full_name || data.user.email.split('@')[0],
      loggedIn: true,
    }));
  }
  return data;
}

// ── Sign In with Google ─────────────
export async function signInWithGoogle() {
  if (!isSupabaseConfigured()) {
    // Local / Demo mode fallback
    const mockUser = {
      id: 'demo-google-user',
      email: 'user@gmail.com',
      name: 'Google User',
      loggedIn: true,
      provider: 'google',
    };
    localStorage.setItem('jyotish_user', JSON.stringify(mockUser));
    window.location.href = '/onboarding';
    return { user: mockUser };
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/onboarding`,
    },
  });
  if (error) throw error;
  return data;
}

// ── Sign Out ────────────────────────
export async function signOut() {
  localStorage.removeItem('jyotish_user');
  localStorage.removeItem('current_kundli_id');
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) console.warn('Supabase signOut error:', error);
    } catch (e) {
      console.warn('SignOut exception:', e);
    }
  }
}

// ── Reset Password ──────────────────
export async function resetPassword(email) {
  if (!isSupabaseConfigured()) {
    return { data: { message: 'Reset email sent in demo mode' } };
  }

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw error;
  return data;
}

// ── Get Current User ────────────────
export async function getCurrentUser() {
  if (!isSupabaseConfigured()) {
    const local = localStorage.getItem('jyotish_user');
    return local ? JSON.parse(local) : null;
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch {
    const local = localStorage.getItem('jyotish_user');
    return local ? JSON.parse(local) : null;
  }
}

// ── Get Current Session ─────────────
export async function getSession() {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch {
    return null;
  }
}

// ── Auth State Listener ─────────────
export function onAuthChange(callback) {
  if (!isSupabaseConfigured()) {
    return { data: { subscription: { unsubscribe: () => {} } } };
  }
  return supabase.auth.onAuthStateChange(callback);
}
