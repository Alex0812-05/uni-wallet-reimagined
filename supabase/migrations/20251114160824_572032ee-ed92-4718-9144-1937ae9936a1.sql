-- Add salario_mensal column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN salario_mensal NUMERIC DEFAULT 0;