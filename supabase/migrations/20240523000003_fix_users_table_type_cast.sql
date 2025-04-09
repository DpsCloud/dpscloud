-- Ensure users table has the correct structure
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  token_identifier TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  avatar_url TEXT,
  credits TEXT,
  full_name TEXT,
  image TEXT,
  subscription TEXT
);

-- Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
DROP POLICY IF EXISTS "Users can view own data" ON public.users;
CREATE POLICY "Users can view own data" 
  ON public.users 
  FOR SELECT 
  USING (user_id = (auth.uid())::uuid);

DROP POLICY IF EXISTS "Users can update own data" ON public.users;
CREATE POLICY "Users can update own data" 
  ON public.users 
  FOR UPDATE 
  USING (user_id = (auth.uid())::uuid);

DROP POLICY IF EXISTS "Service can insert users" ON public.users;
CREATE POLICY "Service can insert users" 
  ON public.users 
  FOR INSERT 
  WITH CHECK (true);

-- Enable realtime for users table
alter publication supabase_realtime add table public.users;