'use server';

import { createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getSystemRoles() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('system_roles')
    .select('*')
    .order('name');
  if (error) throw new Error(error.message);
  return (data || []).map((r) => r.name);
}

export async function addSystemRole(name: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from('system_roles').insert([{ name }]);
  if (error) throw new Error(error.message);
  revalidatePath('/dashboard');
}

export async function deleteSystemRole(name: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from('system_roles').delete().eq('name', name);
  if (error) throw new Error(error.message);
  revalidatePath('/dashboard');
}

export async function getTrainingCategories() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('training_categories')
    .select('*')
    .order('name');
  if (error) throw new Error(error.message);
  return (data || []).map((c) => c.name);
}

export async function addTrainingCategory(name: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from('training_categories').insert([{ name }]);
  if (error) throw new Error(error.message);
  revalidatePath('/dashboard');
}

export async function deleteTrainingCategory(name: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from('training_categories').delete().eq('name', name);
  if (error) throw new Error(error.message);
  revalidatePath('/dashboard');
}

export async function getAcademyConfig() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('academy_config')
    .select('*')
    .limit(1)
    .single();
  if (error) return null;
  return data;
}

export async function updateAcademyConfig(config: Record<string, unknown>) {
  const supabase = createAdminClient();
  // Upsert – always update the first row
  const { data: existing } = await supabase.from('academy_config').select('id').limit(1).single();
  if (existing) {
    await supabase.from('academy_config').update(config).eq('id', existing.id);
  } else {
    await supabase.from('academy_config').insert([config]);
  }
  revalidatePath('/dashboard');
}
