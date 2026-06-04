'use server';

import { createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getCourses() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('courses')
    .select('*, course_modules(*)')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
}

export async function createCourse(course: {
  title: string;
  category: string;
  duration: string;
  modules_count: number;
  cover_emoji: string;
  cover_bg: string;
}) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('courses')
    .insert([{ ...course, is_ready: true, assigned_count: 0, completed_count: 0 }])
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath('/dashboard');
  return data;
}

export async function assignCourse(
  courseId: string,
  scope: 'all' | 'group' | 'employee',
  targetValue?: string
) {
  const supabase = createAdminClient();

  // Get employees based on scope
  let query = supabase.from('employees').select('id');
  if (scope === 'group' && targetValue) {
    query = query.eq('group', targetValue);
  } else if (scope === 'employee' && targetValue) {
    query = query.eq('id', targetValue);
  }

  const { data: employees, error: empError } = await query;
  if (empError) throw new Error(empError.message);

  if (!employees || employees.length === 0) return;

  // Upsert enrollments
  const enrollments = employees.map((e) => ({
    employee_id: e.id,
    course_id: courseId,
    progress: 0,
    status: 'not_started',
  }));

  const { error: enrollError } = await supabase
    .from('enrollments')
    .upsert(enrollments, { onConflict: 'employee_id,course_id', ignoreDuplicates: true });
  if (enrollError) throw new Error(enrollError.message);

  // Update assigned_count
  await supabase.rpc('increment_course_assigned', {
    course_uuid: courseId,
    increment_by: employees.length,
  }).catch(() => {}); // rpc optional

  revalidatePath('/dashboard');
}
