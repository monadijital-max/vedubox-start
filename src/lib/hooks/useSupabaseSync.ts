'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAppStore } from '@/store/store';

export function useSupabaseSync() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const supabase = createClient();

    async function fetchAll() {
      try {
        setIsLoading(true);

        const [
          { data: employees },
          { data: courses },
          { data: certificates },
          { data: groups },
          { data: units },
          { data: config },
        ] = await Promise.all([
          supabase.from('employees').select('*').order('created_at', { ascending: false }),
          supabase.from('courses').select('*, course_modules(*)').order('created_at', { ascending: false }),
          supabase.from('certificates').select('*').order('issue_date', { ascending: false }),
          supabase.from('groups').select('*').order('created_at', { ascending: true }),
          supabase.from('units').select('*').order('created_at', { ascending: true }),
          supabase.from('academy_config').select('*').limit(1).single(),
        ]);

        if (!isMounted) return;

        // Map DB rows → store shape
        if (employees) {
          const mapped = employees.map((e: any) => ({
            id: e.id,
            name: e.name,
            email: e.email,
            department: e.department || '',
            group: e.group || '',
            role: e.role || 'Öğrenci / Çalışan',
            title: e.title || '',
            status: e.status || 'active',
            progress: e.progress || 0,
            enrollments: [],
          }));
          useAppStore.setState({ employees: mapped });
        }

        if (courses) {
          const mapped = courses.map((c: any) => ({
            id: c.id,
            title: c.title,
            category: c.category || 'Compliance',
            duration: c.duration || '',
            modulesCount: c.modules_count || 0,
            modules: (c.course_modules || []).map((m: any) => ({
              title: m.title,
              duration: m.duration,
            })),
            quizzes: [],
            coverEmoji: c.cover_emoji || '📚',
            coverBg: c.cover_bg || 'from-blue-500 to-indigo-600',
            isReady: c.is_ready ?? true,
            assignedCount: c.assigned_count || 0,
            completedCount: c.completed_count || 0,
          }));
          useAppStore.setState({ courses: mapped });
        }

        if (certificates) {
          const mapped = certificates.map((cert: any) => ({
            id: cert.id,
            employeeId: cert.employee_id,
            employeeName: cert.employee_name,
            courseId: cert.course_id,
            courseTitle: cert.course_title,
            issueDate: cert.issue_date,
            code: cert.code,
          }));
          useAppStore.setState({ certificates: mapped });
        }

        if (groups) {
          useAppStore.setState({ groups: groups as any });
        }

        if (units) {
          useAppStore.setState({ units: units as any });
        }

        if (config) {
          useAppStore.setState({
            academyConfig: {
              companyName: config.company_name || '',
              sector: config.sector || '',
              companySize: config.company_size || '',
              establishmentYear: config.establishment_year || '',
              logoText: config.logo_text || '',
              logoBg: config.logo_bg || '',
              academyName: config.academy_name || '',
              subdomain: config.subdomain || '',
              isOnboarded: config.is_onboarded ?? true,
            },
          });
        }
      } catch (err: any) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchAll();

    // Real-time: employees tablosu değişince yenile
    const channel = supabase
      .channel('db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'employees' }, () => {
        fetchAll();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'courses' }, () => {
        fetchAll();
      })
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return { isLoading, error };
}
