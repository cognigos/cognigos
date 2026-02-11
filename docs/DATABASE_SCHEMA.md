# Database Schema

## Supabase SQL Schema

Run this SQL in your Supabase SQL editor to set up the database:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  level INTEGER DEFAULT 1,
  total_xp INTEGER DEFAULT 0,
  current_xp INTEGER DEFAULT 0,
  xp_to_next_level INTEGER DEFAULT 100,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cognitive nodes
CREATE TABLE public.cognitive_nodes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  node_type TEXT NOT NULL CHECK (node_type IN ('reasoning', 'memory', 'creativity', 'decision', 'flexibility', 'philosophy')),
  mastery_level NUMERIC(5,2) DEFAULT 0.0 CHECK (mastery_level >= 0 AND mastery_level <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, node_type)
);

-- Modules (content)
CREATE TABLE public.modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  domain TEXT NOT NULL,
  difficulty INTEGER CHECK (difficulty >= 1 AND difficulty <= 10),
  estimated_time INTEGER, -- seconds
  content_type TEXT CHECK (content_type IN ('philosophy', 'cognitive', 'nexus', 'meditation', 'breath', 'forbidden')),
  cards JSONB NOT NULL,
  quiz JSONB,
  xp_reward INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily batches
CREATE TABLE public.batch_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_modules INTEGER NOT NULL,
  completed_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Batch modules (junction table)
CREATE TABLE public.batch_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  batch_id UUID REFERENCES public.batch_progress(id) ON DELETE CASCADE,
  module_id UUID REFERENCES public.modules(id),
  position INTEGER NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  score NUMERIC(5,2),
  time_spent INTEGER, -- seconds
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(batch_id, position)
);

-- Achievements
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  category TEXT CHECK (category IN ('cognitive', 'streak', 'technique', 'social', 'special')),
  condition JSONB NOT NULL,
  xp_reward INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User achievements (junction)
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Meditation sessions
CREATE TABLE public.meditation_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  technique TEXT NOT NULL,
  duration INTEGER NOT NULL, -- seconds
  guidance_type TEXT,
  distractions INTEGER,
  note_count INTEGER,
  reflection TEXT,
  xp_earned INTEGER DEFAULT 20,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Breath sessions
CREATE TABLE public.breath_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  pattern TEXT NOT NULL,
  duration INTEGER NOT NULL, -- seconds
  cycles_completed INTEGER,
  resonance_score NUMERIC(5,2),
  breath_data JSONB,
  xp_earned INTEGER DEFAULT 15,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Philosophy track progress
CREATE TABLE public.philosophy_track_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  track_name TEXT NOT NULL,
  units_completed INTEGER DEFAULT 0,
  total_units INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, track_name)
);

-- Forbidden technique progress
CREATE TABLE public.forbidden_technique_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  technique TEXT NOT NULL,
  units_completed INTEGER DEFAULT 0,
  total_units INTEGER NOT NULL,
  sessions JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, technique)
);

-- Nexus scenario results
CREATE TABLE public.nexus_scenario_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  scenario_id TEXT,
  domain TEXT NOT NULL,
  user_choice TEXT,
  ratings JSONB,
  feedback TEXT,
  xp_earned INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_username ON public.users(username);
CREATE INDEX idx_cognitive_nodes_user_id ON public.cognitive_nodes(user_id);
CREATE INDEX idx_batch_progress_user_date ON public.batch_progress(user_id, date);
CREATE INDEX idx_meditation_sessions_user ON public.meditation_sessions(user_id);
CREATE INDEX idx_breath_sessions_user ON public.breath_sessions(user_id);

-- Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cognitive_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batch_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batch_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meditation_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.breath_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.philosophy_track_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forbidden_technique_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nexus_scenario_results ENABLE ROW LEVEL SECURITY;

-- RLS Policies (users can only access their own data)
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own nodes" ON public.cognitive_nodes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own nodes" ON public.cognitive_nodes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own nodes" ON public.cognitive_nodes FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own batches" ON public.batch_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own batches" ON public.batch_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own batches" ON public.batch_progress FOR UPDATE USING (auth.uid() = user_id);

-- Modules are public (everyone can read)
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Modules are public" ON public.modules FOR SELECT USING (true);

-- Achievements are public
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Achievements are public" ON public.achievements FOR SELECT USING (true);

-- Function to auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, username)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'username');
  
  -- Create initial cognitive nodes
  INSERT INTO public.cognitive_nodes (user_id, node_type, mastery_level)
  VALUES 
    (NEW.id, 'reasoning', 0),
    (NEW.id, 'memory', 0),
    (NEW.id, 'creativity', 0),
    (NEW.id, 'decision', 0),
    (NEW.id, 'flexibility', 0),
    (NEW.id, 'philosophy', 0);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Sample Data

Insert sample modules:

```sql
INSERT INTO public.modules (title, description, domain, difficulty, estimated_time, content_type, cards, xp_reward)
VALUES 
(
  'Dichotomy of Control',
  'Learn the foundational Stoic practice of distinguishing what is within your control from what is not.',
  'philosophy',
  3,
  180,
  'philosophy',
  '[
    {"id": "card-1", "type": "text", "text": "The Stoics divided the world into two categories: things within our control and things beyond it."},
    {"id": "card-2", "type": "text", "text": "Within your control: Your thoughts, actions, and judgments."},
    {"id": "card-3", "type": "text", "text": "Beyond your control: Other people''s opinions, the weather, the past."},
    {"id": "card-4", "type": "text", "text": "Focus your energy only on what you can control. Release the rest."}
  ]'::jsonb,
  10
),
(
  'The Memory Palace',
  'Learn the ancient Method of Loci used by competitive memory champions.',
  'memory',
  4,
  240,
  'cognitive',
  '[
    {"id": "card-1", "type": "text", "text": "The Memory Palace technique dates back to ancient Greece."},
    {"id": "card-2", "type": "text", "text": "Choose a familiar location: your home, a route you walk daily."},
    {"id": "card-3", "type": "text", "text": "Place vivid, exaggerated images at specific locations."},
    {"id": "card-4", "type": "text", "text": "Walk through your palace mentally to recall information."}
  ]'::jsonb,
  10
);
```

Insert sample achievements:

```sql
INSERT INTO public.achievements (name, description, icon, category, condition, xp_reward)
VALUES
('Week Warrior', 'Maintain a 7-day streak', '🔥', 'streak', '{"type": "streak", "value": 7}'::jsonb, 50),
('Logic Titan', 'Reach 100% mastery in Reasoning', '⚖️', 'cognitive', '{"type": "node_mastery", "node": "reasoning", "value": 100}'::jsonb, 100),
('Memory Master', 'Build 10 memory palaces', '🏛️', 'cognitive', '{"type": "technique_count", "technique": "memory_palace", "value": 10}'::jsonb, 75);
```
