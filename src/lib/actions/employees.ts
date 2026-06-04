'use server';

import { createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getEmployees() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
}

export async function addEmployee(employee: {
  name: string;
  email: string;
  department: string;
  group: string;
  role: string;
  title: string;
}) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('employees')
    .insert([{ ...employee, status: 'active', progress: 0 }])
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath('/dashboard');
  return data;
}

export async function removeEmployee(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from('employees').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/dashboard');
}

export async function assignRoleToEmployee(id: string, role: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('employees')
    .update({ role })
    .eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/dashboard');
}
