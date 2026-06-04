import { create } from 'zustand';

export interface GlobalDialog {
  id: string;
  type: 'alert' | 'confirm' | 'success' | 'error';
  title?: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

// Types
export interface Employee {
  id: string;
  name: string;
  email: string;
  username?: string;
  phone?: string;
  city?: string;
  district?: string;
  address?: string;
  description?: string;
  department: string;
  group: string;
  status: 'active' | 'pending';
  progress: number; // overall progress percentage
  enrollments: {
    courseId: string;
    progress: number;
    status: 'not_started' | 'in_progress' | 'completed';
    completedAt?: string;
  }[];
}

export interface Course {
  id: string;
  title: string;
  category: 'Onboarding' | 'Compliance' | 'Cyber Security' | 'Soft Skills' | 'Sales';
  duration: string;
  modulesCount: number;
  modules: { title: string; duration: string; completed?: boolean }[];
  quizzes: { question: string; options: string[]; answer: number }[];
  coverEmoji: string;
  coverBg: string;
  isReady: boolean;
  assignedCount: number;
  completedCount: number;
}

export interface Certificate {
  id: string;
  employeeId: string;
  employeeName: string;
  courseId: string;
  courseTitle: string;
  issueDate: string;
  code: string;
}

export interface AcademyConfig {
  companyName: string;
  sector: string;
  companySize: string;
  establishmentYear: string;
  logoText: string;
  logoBg: string;
  academyName: string;
  subdomain: string;
  isOnboarded: boolean;
}

interface AppState {
  // Navigation & Simulator
  activeTab: 'dashboard' | 'custom_dashboard' | 'employees' | 'trainings' | 'live_trainings' | 'replays' | 'exams' | 'reports' | 'certificates' | 'settings';
  deviceView: 'desktop' | 'mobile' | 'tablet';
  theme: 'light' | 'dark';
  isCreatingCourse: boolean;
  
  // FTUE state
  currentStep: number;
  completedSteps: number[];
  
  // App Data
  academyConfig: AcademyConfig;
  employees: Employee[];
  courses: Course[];
  certificates: Certificate[];
  groups: any[];
  units: any[];
  departments: string[];
  globalDialogs: GlobalDialog[];
  
  // Actions
  showDialog: (dialog: Omit<GlobalDialog, 'id'>) => void;
  closeDialog: (id: string) => void;
  setTab: (tab: AppState['activeTab']) => void;
  setDeviceView: (view: AppState['deviceView']) => void;
  setTheme: (theme: AppState['theme']) => void;
  setIsCreatingCourse: (v: boolean) => void;
  setStep: (step: number) => void;
  completeStep: (step: number) => void;
  updateAcademyConfig: (config: Partial<AcademyConfig>) => void;
  addDepartment: (dept: string) => void;
  deleteDepartment: (dept: string) => void;
  
  // Employee Actions
  addEmployee: (employee: Omit<Employee, 'id' | 'progress' | 'enrollments'>) => void;
  importEmployees: (rawText: string) => void;
  removeEmployee: (id: string) => void;
  
  // Course Actions
  createCourse: (course: Omit<Course, 'id' | 'assignedCount' | 'completedCount'>) => Course;
  assignCourse: (courseId: string, scope: 'all' | 'department' | 'group' | 'employee', targetValue?: string) => void;
  simulateProgress: (employeeId: string, courseId: string, progressToAdd: number) => void;
  
  // Onboarding action
  finishOnboarding: () => void;
  resetOnboarding: () => void;
}

// Initial courses mock data matching the category structure
const initialCourses: Course[] = [
  // Onboarding
  {
    id: 'course-onb-1',
    title: 'Hoş Geldin! Oryantasyon Eğitimi',
    category: 'Onboarding',
    duration: '35 dk',
    modulesCount: 4,
    modules: [
      { title: 'Şirketimizi Tanıyalım', duration: '10 dk' },
      { title: 'Vizyon, Misyon ve Değerlerimiz', duration: '8 dk' },
      { title: 'Şirket Politikaları', duration: '10 dk' },
      { title: 'Sıkça Sorulan Sorular', duration: '7 dk' }
    ],
    quizzes: [
      { question: 'Şirketimizin temel kültür değeri nedir?', options: ['Bireysel çalışma', 'Takım çalışması ve şeffaflık', 'Hızlı teslimat', 'Geleneksel hiyerarşi'], answer: 1 }
    ],
    coverEmoji: '👋',
    coverBg: 'from-blue-500 to-indigo-600',
    isReady: true,
    assignedCount: 48,
    completedCount: 32
  },
  {
    id: 'course-onb-2',
    title: 'Şirket Kültürü ve Değerlerimiz',
    category: 'Onboarding',
    duration: '25 dk',
    modulesCount: 3,
    modules: [
      { title: 'Değerlerimiz Nelerdir?', duration: '10 dk' },
      { title: 'Davranış Kuralları', duration: '8 dk' },
      { title: 'İş Yerinde Saygı', duration: '7 dk' }
    ],
    quizzes: [],
    coverEmoji: '🌱',
    coverBg: 'from-green-400 to-emerald-600',
    isReady: true,
    assignedCount: 0,
    completedCount: 0
  },
  // Compliance
  {
    id: 'course-comp-1',
    title: 'İş Sağlığı ve Güvenliği (İSG)',
    category: 'Compliance',
    duration: '45 dk',
    modulesCount: 5,
    modules: [
      { title: 'Temel İSG Tanımları ve Kuralları', duration: '10 dk' },
      { title: 'İş Yerindeki Risk Faktörleri', duration: '10 dk' },
      { title: 'Acil Durum Prosedürleri', duration: '10 dk' },
      { title: 'Kişisel Koruyucu Donanımlar', duration: '8 dk' },
      { title: 'İSG Sınavı', duration: '7 dk' }
    ],
    quizzes: [
      { question: 'Acil bir durumda ilk yapılması gereken nedir?', options: ['Eşyaları toplamak', 'Sakin kalıp acil çıkış kapısına yönelmek', 'Asansörü kullanmak', 'Telefonla konuşmak'], answer: 1 }
    ],
    coverEmoji: '🛡️',
    coverBg: 'from-teal-400 to-emerald-500',
    isReady: true,
    assignedCount: 48,
    completedCount: 48
  },
  {
    id: 'course-comp-2',
    title: 'KVKK ve Veri Güvenliği',
    category: 'Compliance',
    duration: '30 dk',
    modulesCount: 3,
    modules: [
      { title: 'Kişisel Veri Nedir?', duration: '10 dk' },
      { title: 'Veri Sorumlusunun Yükümlülükleri', duration: '10 dk' },
      { title: 'Veri İhlali Durumunda Yapılması Gerekenler', duration: '10 dk' }
    ],
    quizzes: [
      { question: 'Hangisi kişisel veridir?', options: ['Şirket logosu', 'TC Kimlik Numarası', 'Ofis adresi', 'Sektör raporu'], answer: 1 }
    ],
    coverEmoji: '🔑',
    coverBg: 'from-amber-400 to-orange-500',
    isReady: true,
    assignedCount: 48,
    completedCount: 28
  },
  {
    id: 'course-comp-3',
    title: 'GDPR (Genel Veri Koruma Yönetmeliği)',
    category: 'Compliance',
    duration: '40 dk',
    modulesCount: 4,
    modules: [
      { title: 'GDPR Nedir?', duration: '10 dk' },
      { title: 'Veri Sahibi Hakları', duration: '10 dk' },
      { title: 'Cezai Müeyyideler', duration: '10 dk' },
      { title: 'Uyum Süreçleri', duration: '10 dk' }
    ],
    quizzes: [],
    coverEmoji: '🇪🇺',
    coverBg: 'from-blue-600 to-indigo-800',
    isReady: true,
    assignedCount: 0,
    completedCount: 0
  },
  // Cyber Security
  {
    id: 'course-sec-1',
    title: 'Siber Güvenlik Farkındalığı',
    category: 'Cyber Security',
    duration: '25 dk',
    modulesCount: 3,
    modules: [
      { title: 'Siber Tehdit Türleri', duration: '8 dk' },
      { title: 'Sosyal Mühendislik', duration: '9 dk' },
      { title: 'Güvenli İnternet Kullanımı', duration: '8 dk' }
    ],
    quizzes: [],
    coverEmoji: '👾',
    coverBg: 'from-violet-500 to-purple-700',
    isReady: true,
    assignedCount: 12,
    completedCount: 0
  },
  {
    id: 'course-sec-2',
    title: 'Şifre Güvenliği ve MFA',
    category: 'Cyber Security',
    duration: '15 dk',
    modulesCount: 2,
    modules: [
      { title: 'Güçlü Şifre Oluşturma Kuralları', duration: '7 dk' },
      { title: 'Çok Faktörlü Kimlik Doğrulama', duration: '8 dk' }
    ],
    quizzes: [],
    coverEmoji: '🔐',
    coverBg: 'from-rose-500 to-red-600',
    isReady: true,
    assignedCount: 0,
    completedCount: 0
  },
  // Soft Skills
  {
    id: 'course-soft-1',
    title: 'Etkili İletişim Becerileri',
    category: 'Soft Skills',
    duration: '40 dk',
    modulesCount: 4,
    modules: [
      { title: 'Aktif Dinleme', duration: '10 dk' },
      { title: 'Beden Dili ve Empati', duration: '10 dk' },
      { title: 'Geri Bildirim Verme', duration: '10 dk' },
      { title: 'Çatışma Yönetimi', duration: '10 dk' }
    ],
    quizzes: [
      { question: 'İletişimde aktif dinlemenin ilk adımı nedir?', options: ['Karşıdakinin sözünü kesmek', 'Göz teması kurmak ve dikkati vermek', 'Kendi cevabını düşünmek', 'Telefonla ilgilenmek'], answer: 1 }
    ],
    coverEmoji: '💬',
    coverBg: 'from-cyan-400 to-blue-500',
    isReady: true,
    assignedCount: 48,
    completedCount: 14
  },
  {
    id: 'course-soft-2',
    title: 'Zaman Yönetimi ve Verimlilik',
    category: 'Soft Skills',
    duration: '35 dk',
    modulesCount: 3,
    modules: [
      { title: 'Önceliklendirme Teknikleri', duration: '12 dk' },
      { title: 'Pomodoro Tekniği ve Odaklanma', duration: '11 dk' },
      { title: 'Toplantı Yönetimi', duration: '12 dk' }
    ],
    quizzes: [],
    coverEmoji: '⏱️',
    coverBg: 'from-orange-400 to-amber-600',
    isReady: true,
    assignedCount: 8,
    completedCount: 0
  },
  // Sales
  {
    id: 'course-sales-1',
    title: 'Müşteri İletişimi ve Satış',
    category: 'Sales',
    duration: '45 dk',
    modulesCount: 4,
    modules: [
      { title: 'Müşteri İhtiyaç Analizi', duration: '12 dk' },
      { title: 'Ürün Sunumu Hazırlama', duration: '11 dk' },
      { title: 'İkna Teknikleri', duration: '12 dk' },
      { title: 'Satış Kapama', duration: '10 dk' }
    ],
    quizzes: [],
    coverEmoji: '🤝',
    coverBg: 'from-indigo-400 to-purple-600',
    isReady: true,
    assignedCount: 15,
    completedCount: 0
  }
];

// Initial mock employees to match statistical data in the screenshot
// (Total 48 employees, Completion rate 68%, etc.)
const initialEmployees: Employee[] = [
  {
    id: 'emp-1',
    name: 'Ayşe Yılmaz',
    email: 'ayse.yilmaz@abcteknoloji.com',
    department: 'İnsan Kaynakları',
    group: 'Yöneticiler',
    status: 'active',
    progress: 77,
    enrollments: [
      { courseId: 'course-onb-1', progress: 80, status: 'in_progress' },
      { courseId: 'course-comp-1', progress: 100, status: 'completed', completedAt: '2026-05-10T14:30:00Z' },
      { courseId: 'course-comp-2', progress: 60, status: 'in_progress' },
      { courseId: 'course-soft-1', progress: 30, status: 'in_progress' }
    ]
  },
  {
    id: 'emp-2',
    name: 'Ahmet Demir',
    email: 'ahmet.demir@abcteknoloji.com',
    department: 'Yazılım',
    group: 'Tüm Çalışanlar',
    status: 'active',
    progress: 85,
    enrollments: [
      { courseId: 'course-onb-1', progress: 100, status: 'completed', completedAt: '2026-05-02T10:15:00Z' },
      { courseId: 'course-comp-1', progress: 100, status: 'completed', completedAt: '2026-05-12T11:45:00Z' },
      { courseId: 'course-comp-2', progress: 100, status: 'completed', completedAt: '2026-05-20T16:00:00Z' },
      { courseId: 'course-soft-1', progress: 40, status: 'in_progress' }
    ]
  },
  {
    id: 'emp-3',
    name: 'Elif Kaya',
    email: 'elif.kaya@abcteknoloji.com',
    department: 'Satış',
    group: 'Satış Ekipleri',
    status: 'active',
    progress: 58,
    enrollments: [
      { courseId: 'course-onb-1', progress: 100, status: 'completed', completedAt: '2026-05-05T09:20:00Z' },
      { courseId: 'course-comp-1', progress: 100, status: 'completed', completedAt: '2026-05-14T17:00:00Z' },
      { courseId: 'course-sales-1', progress: 30, status: 'in_progress' }
    ]
  },
  {
    id: 'emp-4',
    name: 'Mehmet Öztürk',
    email: 'mehmet.ozturk@abcteknoloji.com',
    department: 'Yazılım',
    group: 'Tüm Çalışanlar',
    status: 'active',
    progress: 100,
    enrollments: [
      { courseId: 'course-onb-1', progress: 100, status: 'completed', completedAt: '2026-05-01T15:30:00Z' },
      { courseId: 'course-comp-1', progress: 100, status: 'completed', completedAt: '2026-05-08T11:10:00Z' },
      { courseId: 'course-comp-2', progress: 100, status: 'completed', completedAt: '2026-05-18T13:40:00Z' }
    ]
  },
  {
    id: 'emp-5',
    name: 'Zeynep Çelik',
    email: 'zeynep.celik@abcteknoloji.com',
    department: 'Pazarlama',
    group: 'Tüm Çalışanlar',
    status: 'active',
    progress: 20,
    enrollments: [
      { courseId: 'course-onb-1', progress: 40, status: 'in_progress' },
      { courseId: 'course-comp-1', progress: 20, status: 'in_progress' }
    ]
  }
];

// Seed 32 completed certificates to match the screenshot statistics (Verilen Sertifika: 32)
const seedCertificates: Certificate[] = [
  { id: 'cert-1', employeeId: 'emp-4', employeeName: 'Mehmet Öztürk', courseId: 'course-onb-1', courseTitle: 'Hoş Geldin! Oryantasyon Eğitimi', issueDate: '2026-05-01', code: 'VDB-839-MHT' },
  { id: 'cert-2', employeeId: 'emp-4', employeeName: 'Mehmet Öztürk', courseId: 'course-comp-1', courseTitle: 'İş Sağlığı ve Güvenliği (İSG)', issueDate: '2026-05-08', code: 'VDB-194-MHT' },
  { id: 'cert-3', employeeId: 'emp-4', employeeName: 'Mehmet Öztürk', courseId: 'course-comp-2', courseTitle: 'KVKK ve Veri Güvenliği', issueDate: '2026-05-18', code: 'VDB-732-MHT' },
  { id: 'cert-4', employeeId: 'emp-2', employeeName: 'Ahmet Demir', courseId: 'course-onb-1', courseTitle: 'Hoş Geldin! Oryantasyon Eğitimi', issueDate: '2026-05-02', code: 'VDB-345-ADM' },
  { id: 'cert-5', employeeId: 'emp-2', employeeName: 'Ahmet Demir', courseId: 'course-comp-1', courseTitle: 'İş Sağlığı ve Güvenliği (İSG)', issueDate: '2026-05-12', code: 'VDB-847-ADM' },
  { id: 'cert-6', employeeId: 'emp-2', employeeName: 'Ahmet Demir', courseId: 'course-comp-2', courseTitle: 'KVKK ve Veri Güvenliği', issueDate: '2026-05-20', code: 'VDB-982-ADM' },
  { id: 'cert-7', employeeId: 'emp-1', employeeName: 'Ayşe Yılmaz', courseId: 'course-comp-1', courseTitle: 'İş Sağlığı ve Güvenliği (İSG)', issueDate: '2026-05-10', code: 'VDB-293-AYM' },
  { id: 'cert-8', employeeId: 'emp-3', employeeName: 'Elif Kaya', courseId: 'course-onb-1', courseTitle: 'Hoş Geldin! Oryantasyon Eğitimi', issueDate: '2026-05-05', code: 'VDB-385-ELK' },
  { id: 'cert-9', employeeId: 'emp-3', employeeName: 'Elif Kaya', courseId: 'course-comp-1', courseTitle: 'İş Sağlığı ve Güvenliği (İSG)', issueDate: '2026-05-14', code: 'VDB-203-ELK' }
];

// Seed other 23 mock certificates to total exactly 32 certificates
for (let i = 10; i <= 32; i++) {
  const names = ['Can Soydan', 'Deniz Şahin', 'Merve Koç', 'Bora Yıldız', 'Selin Özer', 'Kerem Arslan'];
  const name = names[i % names.length];
  seedCertificates.push({
    id: `cert-${i}`,
    employeeId: `emp-mock-${i}`,
    employeeName: name,
    courseId: i % 2 === 0 ? 'course-onb-1' : 'course-comp-1',
    courseTitle: i % 2 === 0 ? 'Hoş Geldin! Oryantasyon Eğitimi' : 'İş Sağlığı ve Güvenliği (İSG)',
    issueDate: `2026-05-${10 + (i % 15)}`,
    code: `VDB-${200 + i * 7}-MCK`
  });
}

// Generate remaining 43 mock employees to match "Toplam Çalışan: 48" exactly
const mockDepartments = ['Yazılım', 'Satış', 'Pazarlama', 'Tasarım', 'İnsan Kaynakları', 'Operasyon'];
const mockGroups = ['Tüm Çalışanlar', 'Satış Ekipleri', 'Yazılım Ekipleri', 'Yöneticiler'];
const firstNames = ['Can', 'Deniz', 'Merve', 'Bora', 'Selin', 'Kerem', 'Görkem', 'Seda', 'Emre', 'Burcu', 'Murat', 'Aslı', 'Oğuz', 'Gizem', 'Fatih', 'Ceren'];
const lastNames = ['Soydan', 'Şahin', 'Koç', 'Yıldız', 'Özer', 'Arslan', 'Aydın', 'Yılmaz', 'Kılıç', 'Tekin', 'Bulut', 'Turan', 'Yavuz', 'Erdoğan', 'Şen', 'Güler'];

const seedEmployees = [...initialEmployees];
for (let i = 6; i <= 48; i++) {
  const dept = mockDepartments[i % mockDepartments.length];
  const group = dept === 'Satış' ? 'Satış Ekipleri' : dept === 'Yazılım' ? 'Yazılım Ekipleri' : 'Tüm Çalışanlar';
  const name = `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`;
  const email = `${name.toLowerCase().replace(' ', '.')}@abcteknoloji.com`;
  
  // Mix progress to ensure overall completion average hangs around 68%
  let progress = 0;
  let enrollments: Employee['enrollments'] = [];
  
  if (i <= 32) {
    // These 26 are completed (to yield 32 completed employees total including Mehmet and Ahmet, plus additional individual completions)
    progress = 100;
    enrollments = [
      { courseId: 'course-onb-1', progress: 100, status: 'completed', completedAt: '2026-05-12T10:00:00Z' },
      { courseId: 'course-comp-1', progress: 100, status: 'completed', completedAt: '2026-05-18T14:00:00Z' }
    ];
  } else if (i <= 42) {
    // In progress
    progress = 40 + (i % 5) * 10;
    enrollments = [
      { courseId: 'course-onb-1', progress: 60 + (i % 4) * 10, status: 'in_progress' },
      { courseId: 'course-comp-1', progress: 20 + (i % 3) * 20, status: 'in_progress' }
    ];
  } else {
    // Not started
    progress = 0;
    enrollments = [
      { courseId: 'course-onb-1', progress: 0, status: 'not_started' },
      { courseId: 'course-comp-1', progress: 0, status: 'not_started' }
    ];
  }
  
  seedEmployees.push({
    id: `emp-${i}`,
    name,
    email,
    department: dept,
    group,
    status: 'active',
    progress,
    enrollments
  });
}

// Create the Zustand store
export const useAppStore = create<AppState>((set, get) => ({
  // Navigation & Simulator defaults
  activeTab: 'custom_dashboard',
  deviceView: 'desktop',
  theme: 'light',
  isCreatingCourse: false,
  
  // FTUE State defaults
  currentStep: 1,
  completedSteps: [],
  
  // App Data Seeded
  academyConfig: {
    companyName: 'ABC Teknoloji A.Ş.',
    sector: 'Teknoloji',
    companySize: '11-60 çalışan',
    establishmentYear: '2020',
    logoText: 'ABC',
    logoBg: 'bg-indigo-600 text-white',
    academyName: 'ABC Akademi',
    subdomain: 'abc-akademi',
    isOnboarded: false, // Wizard shows up first
  },
  employees: seedEmployees,
  courses: initialCourses,
  certificates: seedCertificates,
  groups: [],
  units: [],
  departments: ['Genel', 'Yazılım', 'Satış', 'Pazarlama', 'Tasarım', 'İnsan Kaynakları', 'Operasyon'],
  globalDialogs: [],
  
  // Actions
  showDialog: (dialog) => set((state) => ({
    globalDialogs: [...state.globalDialogs, { ...dialog, id: Math.random().toString(36).substr(2, 9) }]
  })),
  closeDialog: (id) => set((state) => ({
    globalDialogs: state.globalDialogs.filter(d => d.id !== id)
  })),
  setTab: (tab) => set({ activeTab: tab }),
  setDeviceView: (view) => set({ deviceView: view }),
  setTheme: (theme) => set({ theme }),
  setIsCreatingCourse: (v) => set({ isCreatingCourse: v }),
  setStep: (step) => set({ currentStep: step }),
  
  completeStep: (step) => set((state) => {
    const updated = state.completedSteps.includes(step)
      ? state.completedSteps
      : [...state.completedSteps, step];
    return { completedSteps: updated };
  }),
  
  updateAcademyConfig: (newConfig) => set((state) => ({
    academyConfig: { ...state.academyConfig, ...newConfig }
  })),

  addDepartment: (dept) => set((state) => ({ departments: [...state.departments, dept] })),
  deleteDepartment: (dept) => set((state) => ({ departments: state.departments.filter(d => d !== dept) })),
  
  // Employee Management Actions
  addEmployee: (newEmp) => set((state) => {
    const id = `emp-${state.employees.length + 1}`;
    
    // Enroll newly added employee in standard courses automatically as part of onboarding assignment
    const enrollments: Employee['enrollments'] = state.courses
      .filter(c => c.assignedCount > 0)
      .map(c => ({
        courseId: c.id,
        progress: 0,
        status: 'not_started'
      }));

    const employee: Employee = {
      ...newEmp,
      id,
      status: 'active',
      progress: 0,
      enrollments
    };
    
    // Update courses assignedCount metric
    const updatedCourses = state.courses.map(c => {
      if (enrollments.some(e => e.courseId === c.id)) {
        return { ...c, assignedCount: c.assignedCount + 1 };
      }
      return c;
    });

    return {
      employees: [...state.employees, employee],
      courses: updatedCourses
    };
  }),
  
  importEmployees: (rawText) => set((state) => {
    // Basic text parsing of lists (e.g. Ayşe Yılmaz, ayse@gmail.com, Yazılım)
    const lines = rawText.split('\n');
    const newEmployeesList: Employee[] = [];
    
    lines.forEach((line, index) => {
      const parts = line.split(',');
      if (parts.length >= 2) {
        const name = parts[0].trim();
        const email = parts[1].trim();
        const department = parts[2]?.trim() || 'Genel';
        
        if (name && email) {
          const id = `emp-imported-${state.employees.length + index + 1}`;
          
          // Pre-enroll in active courses
          const enrollments: Employee['enrollments'] = state.courses
            .filter(c => c.assignedCount > 0)
            .map(c => ({
              courseId: c.id,
              progress: 0,
              status: 'not_started'
            }));

          newEmployeesList.push({
            id,
            name,
            email,
            department,
            group: 'Tüm Çalışanlar',
            status: 'active',
            progress: 0,
            enrollments
          });
        }
      }
    });

    if (newEmployeesList.length === 0) return {};
    
    // Update courses assignedCount metric
    const updatedCourses = state.courses.map(c => {
      const addedCount = newEmployeesList.length;
      if (c.assignedCount > 0) {
        return { ...c, assignedCount: c.assignedCount + addedCount };
      }
      return c;
    });

    return {
      employees: [...state.employees, ...newEmployeesList],
      courses: updatedCourses
    };
  }),
  
  removeEmployee: (id) => set((state) => {
    const target = state.employees.find(e => e.id === id);
    if (!target) return {};
    
    // De-increment course assignment counters
    const updatedCourses = state.courses.map(c => {
      const enrolled = target.enrollments.some(e => e.courseId === c.id);
      const wasCompleted = target.enrollments.some(e => e.courseId === c.id && e.status === 'completed');
      return {
        ...c,
        assignedCount: enrolled ? Math.max(0, c.assignedCount - 1) : c.assignedCount,
        completedCount: wasCompleted ? Math.max(0, c.completedCount - 1) : c.completedCount
      };
    });

    return {
      employees: state.employees.filter(e => e.id !== id),
      courses: updatedCourses
    };
  }),
  
  // Course Management Actions
  createCourse: (newCourse) => {
    const id = `course-custom-${Math.random().toString(36).substr(2, 9)}`;
    const course: Course = {
      ...newCourse,
      id,
      assignedCount: 0,
      completedCount: 0
    };
    set((state) => ({
      courses: [...state.courses, course]
    }));
    return course;
  },
  
  assignCourse: (courseId, scope, targetValue) => set((state) => {
    // 1. Filter target employees based on scope
    const targetEmployees = state.employees.filter(e => {
      if (scope === 'all') return true;
      if (scope === 'department') return e.department === targetValue;
      if (scope === 'group') return e.group === targetValue;
      if (scope === 'employee') return e.id === targetValue;
      return false;
    });
    
    let newlyAssignedCount = 0;
    
    const updatedEmployees = state.employees.map(e => {
      const isTarget = targetEmployees.some(te => te.id === e.id);
      if (!isTarget) return e;
      
      const alreadyEnrolled = e.enrollments.some(en => en.courseId === courseId);
      if (alreadyEnrolled) return e;
      
      newlyAssignedCount++;
      return {
        ...e,
        enrollments: [
          ...e.enrollments,
          { courseId, progress: 0, status: 'not_started' as const }
        ]
      };
    });
    
    const updatedCourses = state.courses.map(c => {
      if (c.id === courseId) {
        return {
          ...c,
          assignedCount: c.assignedCount + newlyAssignedCount
        };
      }
      return c;
    });
    
    return {
      employees: updatedEmployees,
      courses: updatedCourses
    };
  }),
  
  simulateProgress: (employeeId, courseId, progressToAdd) => set((state) => {
    const employee = state.employees.find(e => e.id === employeeId);
    if (!employee) return {};
    
    let isCompletedJustNow = false;
    const updatedEnrollments: Employee['enrollments'] = employee.enrollments.map(en => {
      if (en.courseId !== courseId) return en;
      
      const newProgress = Math.min(100, en.progress + progressToAdd);
      const isCompleted = newProgress === 100;
      isCompletedJustNow = isCompleted && en.status !== 'completed';
      
      return {
        ...en,
        progress: newProgress,
        status: isCompleted ? 'completed' : 'in_progress',
        completedAt: isCompleted ? new Date().toISOString() : en.completedAt
      };
    });
    
    // Calculate new overall progress
    const totalProgress = updatedEnrollments.reduce((acc, curr) => acc + curr.progress, 0);
    const overallProgress = Math.round(totalProgress / Math.max(1, updatedEnrollments.length));
    
    const updatedEmployees = state.employees.map(e => {
      if (e.id === employeeId) {
        return {
          ...e,
          progress: overallProgress,
          enrollments: updatedEnrollments
        };
      }
      return e;
    });
    
    // If just completed, increment course completion counter and create a certificate!
    let updatedCourses = state.courses;
    let updatedCertificates = state.certificates;
    
    if (isCompletedJustNow) {
      updatedCourses = state.courses.map(c => {
        if (c.id === courseId) {
          return { ...c, completedCount: c.completedCount + 1 };
        }
        return c;
      });
      
      const targetCourse = state.courses.find(c => c.id === courseId);
      const certId = `cert-${state.certificates.length + 1}`;
      const certCode = `VDB-${Math.floor(100 + Math.random() * 899)}-${employee.name.substr(0, 3).toUpperCase()}`;
      
      const newCertificate: Certificate = {
        id: certId,
        employeeId,
        employeeName: employee.name,
        courseId,
        courseTitle: targetCourse?.title || 'Eğitim',
        issueDate: new Date().toISOString().split('T')[0],
        code: certCode
      };
      
      updatedCertificates = [...state.certificates, newCertificate];
    }
    
    return {
      employees: updatedEmployees,
      courses: updatedCourses,
      certificates: updatedCertificates
    };
  }),
  
  // Onboarding Complete Flow
  finishOnboarding: () => set((state) => ({
    academyConfig: { ...state.academyConfig, isOnboarded: true },
    activeTab: 'custom_dashboard'
  })),
  
  resetOnboarding: () => set((state) => ({
    academyConfig: { ...state.academyConfig, isOnboarded: false },
    currentStep: 1,
    completedSteps: []
  }))
}));
