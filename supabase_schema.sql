-- ══════════════════════════════════════════════════════════════════════════
-- COMPLETE SUPABASE SCHEMA & RLS FIX FOR ALL TABLES
-- Copy this entire file and run in Supabase Dashboard -> SQL Editor -> Run
-- ══════════════════════════════════════════════════════════════════════════

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can view and update own profile" ON profiles;

CREATE POLICY "Public can all profiles"
  ON profiles FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);


-- 2. Kundlis Table
CREATE TABLE IF NOT EXISTS kundlis (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  time_of_birth TIME,
  time_unknown BOOLEAN DEFAULT FALSE,
  birth_place TEXT NOT NULL,
  latitude NUMERIC(10, 6) DEFAULT 28.6139,
  longitude NUMERIC(10, 6) DEFAULT 77.2090,
  timezone TEXT DEFAULT 'Asia/Kolkata',
  lagna TEXT,
  rashi TEXT,
  nakshatra TEXT,
  gana TEXT,
  ayanamsha DECIMAL(10,4),
  planets JSONB DEFAULT '{}',
  houses JSONB DEFAULT '[]',
  dashas JSONB DEFAULT '[]',
  current_dasha JSONB DEFAULT '{}',
  is_manglik BOOLEAN DEFAULT FALSE,
  panchang JSONB DEFAULT '{}',
  life_path_number INTEGER,
  destiny_number INTEGER,
  soul_urge_number INTEGER,
  ai_report JSONB DEFAULT '{}',
  is_default BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Schema Migrations if table already exists
ALTER TABLE kundlis 
  ADD COLUMN IF NOT EXISTS ayanamsha DECIMAL(10,4),
  ADD COLUMN IF NOT EXISTS houses JSONB,
  ADD COLUMN IF NOT EXISTS dashas JSONB,
  ADD COLUMN IF NOT EXISTS current_dasha JSONB,
  ADD COLUMN IF NOT EXISTS is_manglik BOOLEAN DEFAULT FALSE;

ALTER TABLE kundlis ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can all kundlis" ON kundlis;
DROP POLICY IF EXISTS "Users can CRUD own kundlis" ON kundlis;

CREATE POLICY "Public can all kundlis"
  ON kundlis FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);


-- 3. Voice Sessions Table
CREATE TABLE IF NOT EXISTS voice_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  kundli_id UUID,
  messages JSONB DEFAULT '[]',
  session_duration INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE voice_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can all voice_sessions" ON voice_sessions;
DROP POLICY IF EXISTS "Users can CRUD own voice sessions" ON voice_sessions;

CREATE POLICY "Public can all voice_sessions"
  ON voice_sessions FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);


-- 4. Gun Milan Reports Table
CREATE TABLE IF NOT EXISTS gun_milan_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  person1_name TEXT,
  person1_dob DATE,
  person1_time TIME,
  person1_place TEXT,
  person1_rashi TEXT,
  person1_nakshatra TEXT,
  person1_is_manglik BOOLEAN DEFAULT FALSE,
  person2_name TEXT,
  person2_dob DATE,
  person2_time TIME,
  person2_place TEXT,
  person2_rashi TEXT,
  person2_nakshatra TEXT,
  person2_is_manglik BOOLEAN DEFAULT FALSE,
  total_score INTEGER DEFAULT 0,
  guna_scores JSONB DEFAULT '{}',
  compatibility_areas JSONB DEFAULT '{}',
  ai_analysis TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE gun_milan_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can all gun_milan_reports" ON gun_milan_reports;
DROP POLICY IF EXISTS "Users can CRUD own gun_milan_reports" ON gun_milan_reports;

CREATE POLICY "Public can all gun_milan_reports"
  ON gun_milan_reports FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);


-- 5. Horoscope Preferences Table
CREATE TABLE IF NOT EXISTS horoscope_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  saved_rashi TEXT,
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE horoscope_preferences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can all horoscope_preferences" ON horoscope_preferences;
DROP POLICY IF EXISTS "Users can CRUD own horoscope_preferences" ON horoscope_preferences;

CREATE POLICY "Public can all horoscope_preferences"
  ON horoscope_preferences FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);


-- 6. Horoscope Cache Table
CREATE TABLE IF NOT EXISTS horoscope_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rashi TEXT NOT NULL,
  period TEXT NOT NULL,
  date TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_rashi_date_period UNIQUE (rashi, date, period)
);

ALTER TABLE horoscope_cache ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can all horoscope_cache" ON horoscope_cache;
DROP POLICY IF EXISTS "Users can read/write horoscope_cache" ON horoscope_cache;

CREATE POLICY "Public can all horoscope_cache"
  ON horoscope_cache FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);
