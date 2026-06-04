'use server';

import { createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getGroups() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw new Error(error.message);
  return data || [];
}

export async function createGroup(group: { name: string; description?: string }) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('groups')
    .insert([{ name: group.name, description: group.description || '', member_count: 0 }])
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath('/dashboard');
  return data;
}

export async function updateGroup(id: string, group: { name: string; description?: string }) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('groups')
    .update({ name: group.name, description: group.description || '' })
    .eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/dashboard');
}

export async function deleteGroup(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from('groups').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/dashboard');
}
