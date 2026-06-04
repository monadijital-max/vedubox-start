-- ============================================================
-- Vedubox Start – Supabase Schema
-- Supabase SQL Editor'da çalıştırın
-- ============================================================

-- 1. Akademi Konfigürasyonu
create table if not exists academy_config (
  id uuid primary key default gen_random_uuid(),
  company_name text not null default 'Şirketim',
  sector text default '',
  company_size text default '',
  establishment_year text default '',
  logo_text text default '',
  logo_bg text default '',
  academy_name text default '',
  subdomain text default '',
  is_onboarded boolean default false,
  created_at timestamptz default now()
);

-- 2. Eğitim Kategorileri
create table if not exists training_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz default now()
);

-- 3. Sistem Rolleri
create table if not exists system_roles (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz default now()
);

-- 4. Gruplar
create table if not exists groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text default '',
  member_count integer default 0,
  created_at timestamptz default now()
);

-- 5. Birimler
create table if not exists units (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  manager text default '',
  user_count integer default 0,
  status text default 'Aktif',
  created_at timestamptz default now()
);

-- 6. Çalışanlar
create table if not exists employees (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  department text default '',
  "group" text default '',
  role text default 'Öğrenci / Çalışan',
  title text default '',
  status text default 'active',
  progress integer default 0,
  created_at timestamptz default now()
);

-- 7. Kurslar / Eğitimler
create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text default '',
  duration text default '',
  modules_count integer default 0,
  cover_emoji text default '📚',
  cover_bg text default 'from-blue-500 to-indigo-600',
  is_ready boolean default true,
  assigned_count integer default 0,
  completed_count integer default 0,
  created_at timestamptz default now()
);

-- 8. Kurs Modülleri
create table if not exists course_modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  title text not null,
  duration text default '',
  order_index integer default 0,
  created_at timestamptz default now()
);

-- 9. Kayıtlar (Çalışan–Kurs)
create table if not exists enrollments (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid references employees(id) on delete cascade,
  course_id uuid references courses(id) on delete cascade,
  progress integer default 0,
  status text default 'not_started',
  completed_at timestamptz,
  created_at timestamptz default now(),
  unique(employee_id, course_id)
);

-- 10. Sertifikalar
create table if not exists certificates (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid references employees(id) on delete cascade,
  employee_name text not null,
  course_id uuid references courses(id) on delete cascade,
  course_title text not null,
  issue_date date default current_date,
  code text not null unique,
  created_at timestamptz default now()
);

-- ============================================================
-- SEED DATA
-- ============================================================

-- Kategoriler
insert into training_categories (name) values
  ('Compliance'),
  ('Technical'),
  ('Soft Skills'),
  ('Onboarding'),
  ('Regülasyon')
on conflict (name) do nothing;

-- Sistem Rolleri
insert into system_roles (name) values
  ('Öğrenci / Çalışan'),
  ('Eğitmen'),
  ('Sistem Yöneticisi'),
  ('İçerik Yöneticisi'),
  ('Rapor Yöneticisi')
on conflict (name) do nothing;

-- Akademi Konfigürasyonu (varsayılan)
insert into academy_config (company_name, sector, company_size, logo_text, logo_bg, academy_name, subdomain, is_onboarded)
values ('ABC Teknoloji A.Ş.', 'Teknoloji', '11-60 çalışan', 'ABC', 'bg-indigo-600 text-white', 'ABC Akademi', 'abc-akademi', true)
on conflict do nothing;

-- Gruplar
insert into groups (name, description, member_count) values
  ('Tüm Çalışanlar', 'Şirketteki tüm çalışanlar', 48),
  ('Yöneticiler', 'Departman ve birim yöneticileri', 6),
  ('Satış Ekipleri', 'Satış ve müşteri ilişkileri ekibi', 12),
  ('Yazılım Ekipleri', 'Yazılım geliştirme ekibi', 18)
on conflict do nothing;

-- Birimler
insert into units (name, manager, user_count, status) values
  ('İnsan Kaynakları', 'Ayşe Yılmaz', 12, 'Aktif'),
  ('Yazılım Geliştirme', 'Emre Can', 24, 'Aktif'),
  ('Satış & Pazarlama', 'Mert Demir', 18, 'Aktif'),
  ('Finans', 'Selma Aydın', 8, 'Aktif')
on conflict do nothing;

-- Kurslar
insert into courses (title, category, duration, modules_count, cover_emoji, cover_bg, is_ready, assigned_count, completed_count) values
  ('Hoş Geldin! Oryantasyon Eğitimi', 'Onboarding', '35 dk', 4, '👋', 'from-blue-500 to-indigo-600', true, 48, 32),
  ('Şirket Kültürü ve Değerlerimiz', 'Onboarding', '25 dk', 3, '🌱', 'from-green-400 to-emerald-600', true, 0, 0),
  ('İş Sağlığı ve Güvenliği (İSG)', 'Compliance', '45 dk', 5, '🛡️', 'from-teal-400 to-emerald-500', true, 48, 48),
  ('KVKK ve Veri Güvenliği', 'Compliance', '30 dk', 3, '🔑', 'from-amber-400 to-orange-500', true, 48, 28),
  ('GDPR (Genel Veri Koruma Yönetmeliği)', 'Compliance', '40 dk', 4, '🇪🇺', 'from-blue-600 to-indigo-800', true, 0, 0),
  ('Siber Güvenlik Farkındalığı', 'Technical', '25 dk', 3, '👾', 'from-violet-500 to-purple-700', true, 12, 0),
  ('Şifre Güvenliği ve MFA', 'Technical', '15 dk', 2, '🔐', 'from-rose-500 to-red-600', true, 0, 0),
  ('Etkili İletişim Becerileri', 'Soft Skills', '40 dk', 4, '💬', 'from-cyan-400 to-blue-500', true, 48, 14),
  ('Zaman Yönetimi ve Verimlilik', 'Soft Skills', '35 dk', 3, '⏱️', 'from-orange-400 to-amber-600', true, 8, 0),
  ('Müşteri İletişimi ve Satış', 'Soft Skills', '45 dk', 4, '🤝', 'from-indigo-400 to-purple-600', true, 15, 0)
on conflict do nothing;

-- Çalışanlar
insert into employees (name, email, department, "group", role, title, status, progress) values
  ('Ayşe Yılmaz', 'ayse.yilmaz@abcteknoloji.com', 'İnsan Kaynakları', 'Yöneticiler', 'İçerik Yöneticisi', 'HR Manager', 'active', 77),
  ('Ahmet Demir', 'ahmet.demir@abcteknoloji.com', 'Yazılım', 'Yazılım Ekipleri', 'Eğitmen', 'Senior Developer', 'active', 85),
  ('Elif Kaya', 'elif.kaya@abcteknoloji.com', 'Satış', 'Satış Ekipleri', 'Öğrenci / Çalışan', 'Satış Uzmanı', 'active', 58),
  ('Mehmet Öztürk', 'mehmet.ozturk@abcteknoloji.com', 'Yazılım', 'Yazılım Ekipleri', 'Sistem Yöneticisi', 'Tech Lead', 'active', 100),
  ('Zeynep Çelik', 'zeynep.celik@abcteknoloji.com', 'Pazarlama', 'Tüm Çalışanlar', 'Öğrenci / Çalışan', 'Pazarlama Uzmanı', 'active', 20),
  ('Emre Can', 'emre.can@vedubox.com', 'Yazılım Geliştirme', 'Yazılım Ekipleri', 'Sistem Yöneticisi', 'CTO', 'active', 85),
  ('Zeynep Kaya', 'zeynep.kaya@vedubox.com', 'İnsan Kaynakları', 'Yöneticiler', 'İçerik Yöneticisi', 'HR Specialist', 'active', 42),
  ('Mert Demir', 'mert.demir@vedubox.com', 'Satış & Pazarlama', 'Satış Ekipleri', 'Eğitmen', 'Sales Manager', 'active', 100),
  ('Selma Aydın', 'selma.aydin@vedubox.com', 'Finans', 'Tüm Çalışanlar', 'Öğrenci / Çalışan', 'CFO', 'active', 15)
on conflict (email) do nothing;
