// api/register.ts
import { supabase } from '../lib/supabase';

export async function registerUser(
  email: string,
  password: string,
  phone: string,
  full_name: string,
  avatar_url?: string,
  role?: string
) {
  const { data, error } = await supabase.auth.signUp({
    email, 
    password,
    options: {
      data: {
        phone,
        full_name,
        avatar_url: avatar_url || null,
        role,
      },
    },
  });

  if (error) {
    throw error;
  }

  return data;
}