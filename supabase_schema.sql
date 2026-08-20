-- ══════════════════════════════════════════════════════════════════════════
-- COMPLETE SUPABASE SCHEMA FOR JYOTISH APP
-- Run this in your Supabase Dashboard -> SQL Editor -> Run
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

DO $$ BEGIN
  CREATE POLICY "Users can view and update own profile"
    ON profiles FOR ALL
    USING (auth.uid() = id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 2. Kundlis Table
CREATE TABLE IF NOT EXISTS kundlis (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
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
  planets JSONB DEFAULT '[]',
  houses JSONB DEFAULT '[]',
  panchang JSONB DEFAULT '{}',
  life_path_number INTEGER,
  destiny_number INTEGER,
  soul_urge_number INTEGER,
  ai_report JSONB DEFAULT '{}',
  is_default BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE kundlis ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users can CRUD own kundlis"
    ON kundlis FOR ALL
    USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 3. Voice Sessions Table
CREATE TABLE IF NOT EXISTS voice_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  kundli_id UUID REFERENCES kundlis(id) ON DELETE SET NULL,
  messages JSONB DEFAULT '[]',
  session_duration INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE voice_sessions ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users can CRUD own voice sessions"
    ON voice_sessions FOR ALL
    USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 4. Gun Milan Reports Table
CREATE TABLE IF NOT EXISTS gun_milan_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
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
  total_score NUMERIC(5, 2),
  guna_scores JSONB DEFAULT '{}',
  ai_analysis TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE gun_milan_reports ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users can CRUD own gun milan reports"
    ON gun_milan_reports FOR ALL
    USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 5. Horoscope Preferences Table
CREATE TABLE IF NOT EXISTS horoscope_preferences (
  user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  rashi TEXT NOT NULL,
  notification_enabled BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE horoscope_preferences ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users can CRUD own horoscope preferences"
    ON horoscope_preferences FOR ALL
    USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 6. Horoscope Cache Table
CREATE TABLE IF NOT EXISTS horoscope_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rashi TEXT NOT NULL,
  date DATE NOT NULL,
  period TEXT DEFAULT 'today',
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_rashi_date_period UNIQUE (rashi, date, period)
);

ALTER TABLE horoscope_cache ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Anyone can read horoscope cache"
    ON horoscope_cache FOR SELECT
    USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Authenticated users can insert horoscope cache"
    ON horoscope_cache FOR INSERT
    WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Authenticated users can update horoscope cache"
    ON horoscope_cache FOR UPDATE
    USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
