import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { signOut as authSignOut } from '../lib/auth';

const AuthContext = createContext({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If Supabase credentials are not configured, use local storage session
    if (!isSupabaseConfigured()) {
      const local = localStorage.getItem('jyotish_user');
      if (local) {
        try {
          const parsed = JSON.parse(local);
          setUser(parsed);
        } catch {
          setUser(null);
        }
      }
      setLoading(false);
      return;
    }

    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
          ...session.user,
        });
      } else {
        const local = localStorage.getItem('jyotish_user');
        setUser(local ? JSON.parse(local) : null);
      }
      setLoading(false);
    }).catch(() => {
      const local = localStorage.getItem('jyotish_user');
      setUser(local ? JSON.parse(local) : null);
      setLoading(false);
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        const u = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
          ...session.user,
        };
        setUser(u);
        localStorage.setItem('jyotish_user', JSON.stringify(u));
      } else {
        setUser(null);
        localStorage.removeItem('jyotish_user');
      }
      setLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await authSignOut();
    setUser(null);
    setSession(null);
  };

  const value = { user, session, loading, signOut: handleSignOut };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
