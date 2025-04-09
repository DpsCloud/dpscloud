-- Verifica se a tabela users existe e cria se não existir
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  token_identifier TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adiciona políticas de acesso à tabela users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Política para permitir que usuários vejam apenas seus próprios dados
DROP POLICY IF EXISTS "Users can view own data" ON public.users;
CREATE POLICY "Users can view own data" 
  ON public.users 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Política para permitir que usuários atualizem apenas seus próprios dados
DROP POLICY IF EXISTS "Users can update own data" ON public.users;
CREATE POLICY "Users can update own data" 
  ON public.users 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Política para permitir que o serviço insira novos usuários
DROP POLICY IF EXISTS "Service can insert users" ON public.users;
CREATE POLICY "Service can insert users" 
  ON public.users 
  FOR INSERT 
  WITH CHECK (true);

-- Habilita realtime para a tabela users
alter publication supabase_realtime add table public.users;