-- =========================================================
-- JYOTISH VEDIC ASTROLOGY DATABASE SCHEMA & RLS POLICIES
-- Run this in Supabase Dashboard -> SQL Editor
-- =========================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TABLE 1: User Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  language_preference TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Grant schema and table access
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO postgres, anon, authenticated, service_role;

-- Fail-Safe Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email
  )
  ON CONFLICT (id) DO UPDATE
  SET
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
    email = COALESCE(EXCLUDED.email, public.profiles.email),
    updated_at = NOW();
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- TABLE 2: Kundlis
CREATE TABLE IF NOT EXISTS public.kundlis (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  
  -- Input data
  name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  time_of_birth TIME,
  time_unknown BOOLEAN DEFAULT FALSE,
  birth_place TEXT NOT NULL,
  latitude DECIMAL(10, 6),
  longitude DECIMAL(10, 6),
  timezone TEXT,
  
  -- Calculated data (stored as JSON)
  lagna TEXT,
  rashi TEXT,
  nakshatra TEXT,
  gana TEXT,
  planets JSONB,
  houses JSONB,
  panchang JSONB,
  
  -- Numerology
  life_path_number INTEGER,
  destiny_number INTEGER,
  soul_urge_number INTEGER,
  
  -- Vedic / Report
  ai_report JSONB,
  
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 3: Gun Milan Reports
CREATE TABLE IF NOT EXISTS public.gun_milan_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  
  -- Person 1
  person1_name TEXT NOT NULL,
  person1_dob DATE NOT NULL,
  person1_time TIME,
  person1_place TEXT,
  person1_rashi TEXT,
  person1_nakshatra TEXT,
  person1_is_manglik BOOLEAN,
  
  -- Person 2
  person2_name TEXT NOT NULL,
  person2_dob DATE NOT NULL,
  person2_time TIME,
  person2_place TEXT,
  person2_rashi TEXT,
  person2_nakshatra TEXT,
  person2_is_manglik BOOLEAN,
  
  -- Results
  total_score INTEGER,
  guna_scores JSONB,
  compatibility_areas JSONB,
  ai_analysis TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 4: Saved Horoscopes
CREATE TABLE IF NOT EXISTS public.horoscope_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  rashi TEXT,
  notification_enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 5: Daily Horoscopes Cache
CREATE TABLE IF NOT EXISTS public.horoscope_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rashi TEXT NOT NULL,
  date DATE NOT NULL,
  period TEXT NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(rashi, date, period)
);

-- TABLE 6: Consultations
CREATE TABLE IF NOT EXISTS public.consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  astrologer_name TEXT,
  scheduled_at TIMESTAMPTZ,
  status TEXT DEFAULT 'pending',
  amount INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kundlis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gun_milan_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.horoscope_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.horoscope_cache ENABLE ROW LEVEL SECURITY;

-- Profiles: users see, insert, and update their own
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Kundlis: Allow full CRUD for owner, plus open insert & read for guest/onboarding flow
DROP POLICY IF EXISTS "Users can CRUD own kundlis" ON public.kundlis;
DROP POLICY IF EXISTS "Allow anon insert kundlis" ON public.kundlis;
DROP POLICY IF EXISTS "Allow read kundlis" ON public.kundlis;

CREATE POLICY "Users can CRUD own kundlis"
  ON public.kundlis FOR ALL
  TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL)
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Allow anon insert kundlis"
  ON public.kundlis FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow read kundlis"
  ON public.kundlis FOR SELECT
  TO anon, authenticated
  USING (true);

-- Gun Milan: Allow insert and read
DROP POLICY IF EXISTS "Users can CRUD own reports" ON public.gun_milan_reports;
CREATE POLICY "Users can CRUD own reports"
  ON public.gun_milan_reports FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Horoscope preferences: own only
DROP POLICY IF EXISTS "Users can CRUD own preferences" ON public.horoscope_preferences;
CREATE POLICY "Users can CRUD own preferences"
  ON public.horoscope_preferences FOR ALL
  USING (auth.uid() = user_id);

-- Horoscope cache: everyone can read
DROP POLICY IF EXISTS "Anyone can read horoscope cache" ON public.horoscope_cache;
CREATE POLICY "Anyone can read horoscope cache"
  ON public.horoscope_cache FOR SELECT
  TO anon, authenticated
  USING (true);
