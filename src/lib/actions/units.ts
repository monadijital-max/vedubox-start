'use server';

import { createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getUnits() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('units')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw new Error(error.message);
  return data || [];
}

export async function createUnit(unit: { name: string; manager?: string }) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('units')
    .insert([{ name: unit.name, manager: unit.manager || '', user_count: 0, status: 'Aktif' }])
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath('/dashboard');
  return data;
}

export async function updateUnit(id: string, unit: { name: string; manager?: string }) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('units')
    .update({ name: unit.name, manager: unit.manager || '' })
    .eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/dashboard');
}

export async function deleteUnit(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from('units').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/dashboard');
}
