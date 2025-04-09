-- Adiciona coluna is_admin na tabela users
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Atualiza o usuário admin
UPDATE public.users 
SET is_admin = TRUE 
WHERE email = 'fabiopersi@outlook.com';

-- Cria política para permitir que admins vejam todos os dados
DROP POLICY IF EXISTS "Admins can view all data" ON public.users;
CREATE POLICY "Admins can view all data" 
  ON public.users 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE user_id = auth.uid()::uuid 
      AND is_admin = TRUE
    )
  );

-- Cria política para permitir que admins atualizem todos os dados
DROP POLICY IF EXISTS "Admins can update all data" ON public.users;
CREATE POLICY "Admins can update all data" 
  ON public.users 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE user_id = auth.uid()::uuid 
      AND is_admin = TRUE
    )
  ); 