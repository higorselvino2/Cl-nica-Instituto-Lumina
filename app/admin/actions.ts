'use server'

import { createClient } from '@supabase/supabase-js'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin010203';

export async function checkPasswordAction(password: string) {
  if (password !== ADMIN_PASSWORD) {
    throw new Error('Acesso negado. Senha incorreta.');
  }
  return true;
}

async function getAdminSupabaseClient(password: string) {
  if (password !== ADMIN_PASSWORD) {
    throw new Error('Acesso negado. Senha incorreta.');
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !serviceKey) {
    throw new Error('Erro de configuração do Supabase: Variáveis de ambiente não encontradas.');
  }

  return createClient(url, serviceKey);
}

// Leads
export async function fetchLeadsDataAction(password: string) {
  try {
    const supabase = await getAdminSupabaseClient(password);
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("fetchLeadsDataAction DB Error:", error);
      throw new Error(error.message);
    }
    return data;
  } catch (err: any) {
    console.error("fetchLeadsDataAction Catch:", err);
    throw err;
  }
}

export async function deleteLeadAction(password: string, id: string) {
  const supabase = await getAdminSupabaseClient(password);
  const { error } = await supabase.from('leads').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return true;
}

// Patients
export async function fetchPatientsDataAction(password: string) {
  const supabase = await getAdminSupabaseClient(password);
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .order('date', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function deletePatientAction(password: string, id: string) {
  const supabase = await getAdminSupabaseClient(password);
  const { error } = await supabase.from('patients').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return true;
}

export async function updatePatientAction(password: string, id: string, payload: any) {
  const supabase = await getAdminSupabaseClient(password);
  const { error } = await supabase.from('patients').update(payload).eq('id', id);
  if (error) throw new Error(error.message);
  return true;
}

export async function createPatientAction(password: string, payload: any) {
  const supabase = await getAdminSupabaseClient(password);
  const { error } = await supabase.from('patients').insert([payload]);
  if (error) throw new Error(error.message);
  return true;
}
