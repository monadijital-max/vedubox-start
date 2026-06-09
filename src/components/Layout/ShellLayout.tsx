'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/store';
import Employees from '../Employees/Employees';
import Units from '../Employees/Units';
import Groups from '../Employees/Groups';
import Trainings from '../Trainings/Trainings';
import Reports from '../Reports/Reports';
import Settings from '../Settings/Settings';
import LiveTrainings from '../LiveTrainings/LiveTrainings';
import Replays from '../Replays/Replays';
import Exams from '../Exams/Exams';
import Certificates from '../Certificates/Certificates';
import CustomDashboard from '../Dashboard/CustomDashboard';
import Dashboard2 from '../Dashboard2/Dashboard2';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import ChatbotWidget from './ChatbotWidget';
import OnboardingWizard from '../FTUE/Wizard';
import GlobalDialogs from '../GlobalDialogs';
import { useSupabaseSync } from '@/lib/hooks/useSupabaseSync';

import { 
  Home, Users, BookOpen, Library as LibraryIcon, BarChart2, 
  Award, Settings as SettingsIcon, Monitor, Smartphone, Tablet, 
  HelpCircle, ChevronRight, ChevronDown, Menu, Bell, Search, Plus, PlayCircle, ShieldCheck, ClipboardList, LogOut, User, MessageSquare, X, Send,
  Video, RotateCcw, FileText, MessageCircle, LayoutDashboard
} from 'lucide-react';

export default function ShellLayout() {
  const { 
    activeTab, 
    activeRole,
    setRole,
    deviceView, 
    academyConfig, 
    setTab, 
    setDeviceView,
    setIsCreatingCourse,
    courses,
    employees
  } = useAppStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveSubTab, setMobileActiveSubTab] = useState<'home' | 'courses' | 'reports' | 'profile'>('home');
  const [selectedMobileCourseId, setSelectedMobileCourseId] = useState<string | null>(null);
  
  const desktopMenuItems: any[] = [
    { 
      id: 'dashboards', 
      label: 'Ana Sayfa', 
      icon: Home,
      subItems: [
        { id: 'custom_dashboard', label: 'Dashboard 1' },
        { id: 'dashboard2', label: 'Dashboard 2' }
      ]
    },
    { id: 'employees', label: 'Kullanıcılar', icon: Users },
    { id: 'trainings', label: 'Eğitimler', icon: BookOpen },
    { id: 'live_trainings', label: 'Canlı Eğitim', icon: Video },
    { id: 'replays', label: 'Tekrar İzle', icon: RotateCcw },
    { id: 'exams', label: 'Sınav', icon: FileText },
    { id: 'reports', label: 'Raporlar', icon: BarChart2 },
    { id: 'settings', label: 'Ayarlar', icon: SettingsIcon },
  ] as const;

  const [expandedMenu, setExpandedMenu] = useState<string | null>(
    desktopMenuItems.find(m => m.subItems?.some((s: any) => s.id === activeTab))?.id || null
  );
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  // Sync Supabase data into Zustand store
  const { isLoading: isSyncing } = useSupabaseSync();

  // If the academy is not onboarded, strictly show the Setup Wizard
  if (!academyConfig.isOnboarded && !isSyncing) {
    return <OnboardingWizard />;
  }

  // Loading Screen
  if (isSyncing) {
    return (
      <div className="min-h-screen bg-surface-container-lowest flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        <p className="mt-4 text-on-surface font-semibold animate-pulse">Veriler yükleniyor...</p>
      </div>
    );
  }

  // Render correct component based on active tab for desktop view
  const renderDesktopContent = () => {
    if (activeRole === 'admin' && (activeTab === 'dashboard' || activeTab === 'custom_dashboard' || activeTab === 'dashboard2')) {
      return <AdminDashboard />;
    }

    switch (activeTab) {
      case 'custom_dashboard':
        return <CustomDashboard />;
      case 'dashboard2':
        return <Dashboard2 />;
      case 'employees':
        return <Employees />;
      case 'trainings':
        return <Trainings />;
      case 'live_trainings':
        return <LiveTrainings />;
      case 'replays':
        return <Replays />;
      case 'exams':
        return <Exams />;
      case 'reports':
        return <Reports />;
      case 'certificates':
        return <Certificates />;
      case 'settings':
        return <Settings />;
      default:
        return <CustomDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col transition-colors duration-300">
      
      {/* Dynamic Device Simulator Top Bar */}
      <header className="bg-[#0b1c30] text-white px-lg py-sm flex justify-between items-center shadow-md no-print shrink-0">
        <div className="flex items-center gap-xs">
          <span className="text-[10px] uppercase font-bold tracking-widest text-primary-fixed/80 bg-white/10 px-xs py-0.5 rounded">
            Simülatör
          </span>
          <h2 className="text-label-md font-bold">Cihaz Görünümünü Değiştir:</h2>
        </div>

        {/* View Toggle Buttons */}
        <div className="flex bg-white/10 rounded-lg p-0.5 border border-white/5">
          <button 
            onClick={() => setDeviceView('desktop')}
            className={`px-sm py-xs text-label-sm font-semibold rounded-md flex items-center gap-xs transition-all ${
              deviceView === 'desktop' ? 'bg-primary text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
            Masaüstü (Yönetici)
          </button>
          <button 
            onClick={() => setDeviceView('mobile')}
            className={`px-sm py-xs text-label-sm font-semibold rounded-md flex items-center gap-xs transition-all ${
              deviceView === 'mobile' ? 'bg-primary text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            Mobil (Çalışan)
          </button>
          <button 
            onClick={() => setDeviceView('tablet')}
            className={`px-sm py-xs text-label-sm font-semibold rounded-md flex items-center gap-xs transition-all ${
              deviceView === 'tablet' ? 'bg-primary text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Tablet className="w-4 h-4" />
            Tablet
          </button>
        </div>

        <div className="hidden sm:block text-label-sm text-slate-300 font-medium">
          Akademi: <span className="text-emerald-400 font-bold">{academyConfig.subdomain}.vedubox.com</span>
        </div>
      </header>

      {/* RENDER DESKTOP LAYOUT (IMAGE 3) */}
      {deviceView === 'desktop' && (
        <div className="flex-1 flex overflow-hidden">
          
          {/* LEFT SIDEBAR NAVIGATION */}
          <aside className="w-[80px] hover:w-64 bg-white border-r border-outline-variant/60 flex flex-col justify-between shrink-0 no-print shadow-soft transition-all duration-300 group z-50 overflow-hidden relative">
            <div className="p-md space-y-lg">
              
              {/* Logo section */}
              <div className="flex items-center gap-sm px-2">
                <div className="w-9 h-9 rounded-lg bg-[#383fd8] flex items-center justify-center font-bold text-white text-md shadow-md shrink-0">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/70"></div>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  <h1 className="text-lg font-bold text-[#1e1e2d] leading-tight tracking-tight">VEDUSTART</h1>
                </div>
              </div>

              {/* Sidebar Links */}
              <nav className="space-y-xs">
                {desktopMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id || (item.subItems && item.subItems.some((sub: any) => sub.id === activeTab));
                  return (
                    <div key={item.id}>
                      <button 
                        onClick={() => {
                          if (item.subItems) {
                            setExpandedMenu(expandedMenu === item.id ? null : item.id);
                          } else {
                            setTab(item.id);
                          }
                        }}
                        className={`w-full px-3 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between ${
                          isActive && (!item.subItems || expandedMenu !== item.id)
                            ? 'bg-[#383fd8] text-white shadow-md' 
                            : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <Icon className={`w-5 h-5 shrink-0 ${isActive && (!item.subItems || expandedMenu !== item.id) ? 'text-white' : ''}`} />
                          <span className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${isActive && (!item.subItems || expandedMenu !== item.id) ? 'text-white' : ''}`}>{item.label}</span>
                        </div>
                        {item.subItems && (
                          <ChevronRight className={`w-4 h-4 shrink-0 transition-transform opacity-0 group-hover:opacity-100 ${expandedMenu === item.id ? 'rotate-90 text-white' : 'opacity-50'}`} />
                        )}
                      </button>

                      {/* Accordion Submenu */}
                      {item.subItems && expandedMenu === item.id && (
                        <div className="pl-10 pr-2 py-1 space-y-1 mt-1 hidden group-hover:block">
                          {item.subItems.map((sub: any) => (
                            <button
                              key={sub.id}
                              onClick={() => setTab(sub.id as any)}
                              className={`w-full text-left px-3 py-2.5 text-sm font-bold rounded-lg transition-colors ${
                                activeTab === sub.id 
                                  ? 'bg-[#383fd8]/10 text-[#383fd8]' 
                                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                              }`}
                            >
                              {sub.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

            </div>


          </aside>

          {/* MAIN DESKTOP PANEL AREA */}
          <main className="flex-1 bg-surface-container-lowest flex flex-col min-w-0">
            {/* Global Desktop Header */}
            <div className={`h-16 bg-white border-b border-outline-variant/30 flex justify-between items-center pl-lg ${(activeTab === 'custom_dashboard' || activeTab === 'dashboard2') ? 'pr-lg xl:pr-[340px]' : 'pr-lg'} shrink-0 sticky top-0 z-40 shadow-sm transition-all duration-300`}>
                {/* Search Bar */}
              <div className="w-[400px] relative">
                <Search className="w-4 h-4 text-on-surface-variant absolute right-4 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search anything ..."
                  className="w-full pl-4 pr-10 py-2.5 bg-surface-container-low border border-transparent rounded-full text-sm focus:outline-none focus:border-outline-variant transition-all font-medium"
                />
              </div>

              <div className="flex items-center gap-4">
                {/* Notification Bell */}
                <div className="relative">
                  <button 
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="relative w-9 h-9 flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-full transition-colors border border-outline-variant/30 bg-white"
                  >
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                  </button>

                  {isNotificationsOpen && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-outline-variant/30 overflow-hidden py-2 animate-fadeIn z-50">
                      <div className="px-4 py-3 border-b border-outline-variant/30 flex items-center justify-between">
                        <p className="text-sm font-bold text-on-surface">Bildirimler</p>
                        <span className="text-xs font-semibold text-primary cursor-pointer hover:underline">Tümünü Okundu İşaretle</span>
                      </div>
                      <div className="max-h-[300px] overflow-y-auto">
                        <div className="px-4 py-3 hover:bg-surface-container-low transition-colors border-b border-outline-variant/10 cursor-pointer">
                          <p className="text-sm text-on-surface"><span className="font-bold">Ahmet Yılmaz</span> kişisine eğitim atandı.</p>
                          <p className="text-xs text-on-surface-variant mt-1">10 dakika önce</p>
                        </div>
                        <div className="px-4 py-3 hover:bg-surface-container-low transition-colors border-b border-outline-variant/10 cursor-pointer">
                          <p className="text-sm text-on-surface"><span className="font-bold">Fatma Gülşen</span> CRM Eğitimi'ni bitirdi.</p>
                          <p className="text-xs text-on-surface-variant mt-1">1 saat önce</p>
                        </div>
                        <div className="px-4 py-3 hover:bg-surface-container-low transition-colors border-b border-outline-variant/10 cursor-pointer bg-blue-50/50">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <p className="text-sm text-on-surface"><span className="font-bold">Mehmet Demir</span> yeni bir soru ekledi.</p>
                          </div>
                          <p className="text-xs text-on-surface-variant ml-4">2 saat önce</p>
                        </div>
                        <div className="px-4 py-3 hover:bg-surface-container-low transition-colors cursor-pointer">
                          <p className="text-sm text-on-surface">Sistem güncellemesi tamamlandı.</p>
                          <p className="text-xs text-on-surface-variant mt-1">Dün</p>
                        </div>
                      </div>
                      <div className="px-4 py-2 border-t border-outline-variant/30 text-center">
                        <span className="text-sm font-bold text-primary cursor-pointer hover:underline">Tüm Bildirimleri Gör</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Custom Role Switch Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                    className="flex items-center gap-2 bg-surface-container-low px-4 h-11 rounded-full border border-outline-variant/30 hover:border-outline-variant/50 transition-all focus:outline-none shadow-sm"
                  >
                    <span className="text-xs font-bold text-on-surface">
                      {activeRole === 'admin' ? 'Admin (Yönetici)' : activeRole === 'instructor' ? 'Eğitmen' : 'Kullanıcı (Öğrenci)'}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-on-surface-variant transition-transform ${isRoleDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                  </button>

                  {isRoleDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-outline-variant/30 overflow-hidden py-1 animate-fadeIn z-50">
                      <button 
                        onClick={() => { setRole('admin'); setIsRoleDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${activeRole === 'admin' ? 'bg-[#383fd8]/10 text-[#383fd8]' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                      >
                        Admin (Yönetici)
                      </button>
                      <button 
                        onClick={() => { setRole('instructor'); setIsRoleDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${activeRole === 'instructor' ? 'bg-[#383fd8]/10 text-[#383fd8]' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                      >
                        Eğitmen
                      </button>
                      <button 
                        onClick={() => { setRole('student'); setIsRoleDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${activeRole === 'student' ? 'bg-[#383fd8]/10 text-[#383fd8]' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                      >
                        Kullanıcı (Öğrenci)
                      </button>
                    </div>
                  )}
                </div>

              {/* Profile Widget Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-sm bg-surface-container-low px-3 h-11 rounded-full border border-outline-variant/30 hover:bg-surface-container transition-all"
                >
                  <div className="relative w-8 h-8 rounded-full shrink-0">
                    <img src="https://i.pravatar.cc/150?img=5" alt="Ayşe Yılmaz" className="w-8 h-8 rounded-full object-cover border border-outline-variant/30" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-label-sm font-bold text-on-surface leading-none">Ayşe Yılmaz</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-on-surface-variant transition-transform ${isProfileOpen ? 'rotate-90' : 'rotate-0'}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-outline-variant/30 overflow-hidden py-2 animate-fadeIn z-50">
                    <div className="px-4 py-2 border-b border-outline-variant/30 mb-2">
                      <p className="text-sm font-bold text-on-surface">Ayşe Yılmaz</p>
                      <p className="text-xs text-on-surface-variant font-medium">Sistem Yöneticisi</p>
                    </div>
                    <button 
                      onClick={() => {
                        setTab('settings');
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm font-medium text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-2"
                    >
                      <User className="w-4 h-4" /> Profilim
                    </button>
                    <button 
                      onClick={() => {
                        setIsSupportModalOpen(true);
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm font-medium text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-2"
                    >
                      <HelpCircle className="w-4 h-4" /> Destek
                    </button>
                    <div className="h-px bg-outline-variant/30 my-2"></div>
                    <button className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2">
                      <LogOut className="w-4 h-4" /> Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
            </div>
            </div>
            <div className={`flex-1 overflow-y-auto ${(activeTab === 'custom_dashboard' || activeTab === 'dashboard2') ? 'p-0' : 'p-lg'}`}>
              {activeTab === 'custom_dashboard' && (
                <div className="w-full h-full">
                  {renderDesktopContent()}
                </div>
              )}
              {activeTab === 'dashboard2' && (
                <div className="w-full min-h-full bg-slate-50">
                  <div className="max-w-6xl mx-auto p-6">
                    {renderDesktopContent()}
                  </div>
                </div>
              )}
              {activeTab !== 'custom_dashboard' && activeTab !== 'dashboard2' && (
                <div className="max-w-6xl mx-auto">
                  {renderDesktopContent()}
                </div>
              )}
            </div>
          </main>

        </div>
      )}

      {/* RENDER MOBILE LEARNER SIMULATOR (IMAGE 2) */}
      {(deviceView === 'mobile' || deviceView === 'tablet') && (
        <div className="flex-1 flex items-center justify-center p-md overflow-y-auto">
          
          {/* Phone Shell Container */}
          <div className={`bg-slate-900 rounded-[48px] p-4 shadow-soft-xl border-4 border-slate-700 max-w-full relative transition-all ${
            deviceView === 'mobile' ? 'w-[360px] h-[720px]' : 'w-[640px] h-[800px]'
          }`}>
            
            {/* Camera / Notch */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-full z-50 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-800"></div>
            </div>

            {/* Inner viewport screen */}
            <div className="w-full h-full bg-background rounded-[36px] overflow-hidden flex flex-col relative border border-slate-800 select-none">
              
              {/* Status Indicator Bar */}
              <div className="bg-white px-md pt-sm pb-xs flex justify-between items-center text-[11px] text-slate-800 font-bold shrink-0 z-40">
                <span>9:41</span>
                <div className="flex items-center gap-xs">
                  <span>📶</span>
                  <span>🛜</span>
                  <span>🔋</span>
                </div>
              </div>

              {/* Simulated Screen Content View */}
              <div className="flex-1 overflow-y-auto pb-16 flex flex-col bg-surface-container-low">
                
                {/* 1. HOME SUB-TAB SCREEN */}
                {mobileActiveSubTab === 'home' && !selectedMobileCourseId && (
                  <div className="space-y-sm p-sm animate-fadeIn">
                    
                    {/* Welcome banner */}
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-[11px] text-on-surface-variant font-medium">Hoş Geldiniz!</span>
                        <h3 className="text-label-md text-on-surface font-bold">Merhaba, Ayşe Yılmaz 👋</h3>
                        <p className="text-[10px] text-on-surface-variant">{academyConfig.companyName}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-label-sm">
                        AY
                      </div>
                    </div>

                    {/* Stats Widget */}
                    <div className="bg-primary p-md rounded-2xl text-white shadow-md">
                      <p className="text-[11px] text-primary-fixed/80 font-bold uppercase tracking-wider">Akademinizde Bugün</p>
                      <div className="grid grid-cols-3 gap-xs text-center mt-sm">
                        <div>
                          <p className="text-headline-sm font-bold">5</p>
                          <p className="text-[9px] text-primary-fixed/80">Başlamayan</p>
                        </div>
                        <div>
                          <p className="text-headline-sm font-bold">12</p>
                          <p className="text-[9px] text-primary-fixed/80">Devam Eden</p>
                        </div>
                        <div>
                          <p className="text-headline-sm font-bold">8</p>
                          <p className="text-[9px] text-primary-fixed/80">Tamamlanan</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setMobileActiveSubTab('courses')}
                        className="w-full py-xs bg-white/10 hover:bg-white/20 mt-md rounded-xl text-[11px] font-bold text-white transition-all flex items-center justify-center gap-xs"
                      >
                        ⚡ Hızlı İşlemler
                      </button>
                    </div>

                    {/* Circular overall Progress Indicator */}
                    <div className="bg-white p-sm rounded-2xl border border-outline-variant/40 shadow-soft flex items-center justify-between">
                      <div className="flex items-center gap-sm">
                        <div className="relative w-12 h-12 flex items-center justify-center font-bold text-label-sm text-primary">
                          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                            <circle cx="24" cy="24" r="20" fill="transparent" stroke="#eff4ff" strokeWidth="4" />
                            <circle cx="24" cy="24" r="20" fill="transparent" stroke="#383fd8" strokeWidth="4" strokeDasharray={`${2*Math.PI*20}`} strokeDashoffset={`${2*Math.PI*20 * (1 - 0.68)}`} strokeLinecap="round" />
                          </svg>
                          <span>%68</span>
                        </div>
                        <div>
                          <p className="text-label-sm text-on-surface font-bold">Genel İlerleme</p>
                          <p className="text-[9px] text-emerald-500 font-semibold">▲ Bu ay %15 artış</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-on-surface-variant font-bold bg-surface-container px-xs py-0.5 rounded">Tüm zamanlar</span>
                    </div>

                    {/* Recent courses checklist */}
                    <div className="space-y-xs">
                      <div className="flex justify-between items-center px-xs">
                        <span className="text-label-sm text-on-surface font-bold">Eğitimlerim</span>
                        <span className="text-[10px] text-primary font-bold cursor-pointer" onClick={() => setMobileActiveSubTab('courses')}>Tümünü Gör</span>
                      </div>
                      
                      <div className="space-y-xs">
                        {courses.slice(0, 3).map((c) => (
                          <div 
                            key={c.id} 
                            onClick={() => setSelectedMobileCourseId(c.id)}
                            className="bg-white p-sm rounded-xl border border-outline-variant/40 shadow-soft flex justify-between items-center cursor-pointer hover:bg-surface-container-low transition-all"
                          >
                            <div className="flex items-center gap-sm">
                              <span className="text-xl">{c.coverEmoji}</span>
                              <div>
                                <p className="text-label-sm text-on-surface font-bold max-w-[140px] truncate">{c.title}</p>
                                <p className="text-[9px] text-on-surface-variant">{c.category} • {c.duration}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-xs">
                              <span className="text-[9px] font-bold text-primary bg-indigo-50 px-xs py-0.5 rounded">%80</span>
                              <ChevronRight className="w-4 h-4 text-on-surface-variant" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* 2. COURSES TAB / VIDEO LEARNING SYSTEM (IMAGE 2) */}
                {mobileActiveSubTab === 'courses' && !selectedMobileCourseId && (
                  <div className="space-y-sm p-sm animate-fadeIn">
                    <h3 className="text-label-md text-on-surface font-bold">Hazır Eğitimler</h3>
                    
                    <div className="relative">
                      <Search className="w-4 h-4 text-on-surface-variant absolute left-3 top-[10px]" />
                      <input 
                        type="text" 
                        placeholder="Eğitim ara..."
                        className="w-full pl-lg pr-md py-xs bg-white border border-outline-variant rounded-lg text-[11px]"
                      />
                    </div>

                    <div className="flex gap-xs overflow-x-auto pb-xs">
                      <span className="px-sm py-0.5 bg-primary text-white text-[10px] font-bold rounded-full whitespace-nowrap">Tümü</span>
                      <span className="px-sm py-0.5 bg-white border border-outline-variant text-[10px] text-on-surface-variant font-bold rounded-full whitespace-nowrap">Onboarding</span>
                      <span className="px-sm py-0.5 bg-white border border-outline-variant text-[10px] text-on-surface-variant font-bold rounded-full whitespace-nowrap">Regülasyon</span>
                    </div>

                    <div className="space-y-xs">
                      {courses.map((c) => (
                        <div 
                          key={c.id} 
                          onClick={() => setSelectedMobileCourseId(c.id)}
                          className="bg-white p-sm rounded-xl border border-outline-variant/40 shadow-soft flex items-center justify-between cursor-pointer"
                        >
                          <div className="flex items-center gap-sm">
                            <span className="text-xl">{c.coverEmoji}</span>
                            <div>
                              <p className="text-label-sm text-on-surface font-bold max-w-[160px] truncate">{c.title}</p>
                              <p className="text-[9px] text-on-surface-variant">{c.category} • {c.duration}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-on-surface-variant" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. MOBILE COURSE DETAIL PLAYER (IMAGE 2) */}
                {selectedMobileCourseId && (
                  <div className="animate-fadeIn flex flex-col h-full bg-white">
                    {/* Header back */}
                    <div className="p-sm border-b border-outline-variant flex items-center justify-between shrink-0">
                      <button 
                        onClick={() => setSelectedMobileCourseId(null)}
                        className="text-label-sm text-primary font-bold flex items-center gap-xs"
                      >
                        ← Geri
                      </button>
                      <span className="text-label-sm font-bold text-on-surface">Eğitim Detayı</span>
                      <div className="w-6"></div>
                    </div>

                    {/* Video Player Simulator */}
                    <div className="w-full aspect-video bg-indigo-950 flex flex-col items-center justify-center text-white relative">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 hover:scale-105 transition-all">
                        <PlayCircle className="w-8 h-8 fill-current" />
                      </div>
                      <span className="text-[10px] text-indigo-200 mt-xs font-semibold">Video Dersi Simüle Et</span>
                      <span className="absolute bottom-2 left-2 text-[9px] bg-black/40 px-xs py-0.5 rounded font-mono">00:00 / 10:00</span>
                    </div>

                    <div className="p-sm flex-1 overflow-y-auto space-y-sm">
                      {/* Tabs */}
                      <div className="flex border-b border-outline-variant">
                        <span className="flex-1 text-center py-xs text-[11px] font-bold border-b-2 border-primary text-primary">Genel Bakış</span>
                        <span className="flex-1 text-center py-xs text-[11px] font-bold text-on-surface-variant">İçerikler</span>
                        <span className="flex-1 text-center py-xs text-[11px] font-bold text-on-surface-variant">Yorumlar</span>
                      </div>

                      {/* Course Info */}
                      <div>
                        {(() => {
                          const course = courses.find(c => c.id === selectedMobileCourseId);
                          if (!course) return null;
                          return (
                            <div className="space-y-sm">
                              <div>
                                <h4 className="text-label-md font-bold text-on-surface">{course.title}</h4>
                                <span className="text-[10px] text-on-surface-variant font-medium">{course.category} • {course.duration} • 4 Modül</span>
                              </div>

                              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                                Bu eğitimde şirketimizi, kültürümüzü ve süreçlerimizi yakından tanıyacaksınız.
                              </p>

                              {/* Lessons modules */}
                              <div className="space-y-xs">
                                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Modüller</p>
                                <div className="space-y-xs">
                                  {course.modules.map((m, idx) => (
                                    <div key={idx} className="flex justify-between items-center p-xs bg-surface-container rounded-lg text-label-sm border border-outline-variant/20">
                                      <span className="font-semibold">{idx + 1}. {m.title}</span>
                                      <span className="text-[10px] font-bold text-primary">{m.duration}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. REPORTS TAB SCREEN (IMAGE 2) */}
                {mobileActiveSubTab === 'reports' && !selectedMobileCourseId && (
                  <div className="space-y-sm p-sm animate-fadeIn">
                    <h3 className="text-label-md text-on-surface font-bold">Raporlar</h3>
                    
                    <div className="flex border-b border-outline-variant">
                      <span className="flex-1 text-center py-xs text-[11px] font-bold border-b-2 border-primary text-primary">Genel Bakış</span>
                      <span className="flex-1 text-center py-xs text-[11px] font-bold text-on-surface-variant">Kullanıcılar</span>
                      <span className="flex-1 text-center py-xs text-[11px] font-bold text-on-surface-variant">Eğitimler</span>
                    </div>

                    <div className="grid grid-cols-2 gap-sm">
                      <div className="bg-white p-sm rounded-xl border border-outline-variant/40 shadow-soft">
                        <span className="text-[9px] text-on-surface-variant font-bold block">Toplam Çalışan</span>
                        <span className="text-label-md font-bold text-primary block mt-1">{employees.length}</span>
                        <span className="text-[9px] text-emerald-500 font-semibold">▲ bu ay</span>
                      </div>
                      <div className="bg-white p-sm rounded-xl border border-outline-variant/40 shadow-soft">
                        <span className="text-[9px] text-on-surface-variant font-bold block">Tamamlanma Oranı</span>
                        <span className="text-label-md font-bold text-primary block mt-1">%68</span>
                        <span className="text-[9px] text-emerald-500 font-semibold">▲ %15</span>
                      </div>
                    </div>

                    {/* Progress curve */}
                    <div className="bg-white p-sm rounded-xl border border-outline-variant/40 shadow-soft">
                      <p className="text-[10px] text-on-surface font-bold mb-xs">İlerleme Grafiği</p>
                      <div className="w-full h-24 bg-surface-container flex items-end justify-between p-xs rounded-lg relative">
                        <span className="absolute top-2 right-2 bg-primary text-white text-[8px] px-xs py-0.5 rounded font-bold">%68</span>
                        <div className="w-4 bg-primary/20 h-[20%] rounded"></div>
                        <div className="w-4 bg-primary/40 h-[35%] rounded"></div>
                        <div className="w-4 bg-primary/60 h-[48%] rounded"></div>
                        <div className="w-4 bg-primary/80 h-[55%] rounded"></div>
                        <div className="w-4 bg-primary h-[68%] rounded"></div>
                      </div>
                      <div className="flex justify-between text-[8px] text-on-surface-variant font-bold mt-xs px-xs">
                        <span>22 Nis</span>
                        <span>29 Nis</span>
                        <span>6 May</span>
                        <span>13 May</span>
                        <span>20 May</span>
                      </div>
                    </div>

                  </div>
                )}

                {/* 5. PROFILE TAB SCREEN */}
                {mobileActiveSubTab === 'profile' && !selectedMobileCourseId && (
                  <div className="space-y-sm p-sm animate-fadeIn">
                    <div className="bg-white p-md rounded-2xl border border-outline-variant/40 shadow-soft text-center space-y-xs">
                      <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-bold text-headline-sm mx-auto shadow-md">
                        AY
                      </div>
                      <div>
                        <h4 className="text-label-md font-bold text-on-surface">Ayşe Yılmaz</h4>
                        <p className="text-[10px] text-on-surface-variant font-semibold">HR Yöneticisi • Sistem Yöneticisi</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-outline-variant/40 shadow-soft divide-y divide-outline-variant/30 text-label-sm font-semibold">
                      <div className="p-sm flex items-center justify-between">
                        <span className="text-on-surface">Şirket Akademisi</span>
                        <span className="text-primary font-bold">{academyConfig.companyName}</span>
                      </div>
                      <div className="p-sm flex items-center justify-between">
                        <span className="text-on-surface">Rolüm</span>
                        <span className="text-on-surface-variant">Sistem Yöneticisi</span>
                      </div>
                      <div className="p-sm flex items-center justify-between">
                        <span className="text-on-surface">E-posta</span>
                        <span className="text-on-surface-variant font-mono text-[11px]">ayse@abcteknoloji.com</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Mobile Navigation Bar */}
              <nav className="absolute bottom-0 inset-x-0 h-14 bg-white border-t border-outline-variant flex justify-around items-center z-50 px-sm shadow-lg no-print">
                <button 
                  onClick={() => { setMobileActiveSubTab('home'); setSelectedMobileCourseId(null); }}
                  className={`flex flex-col items-center gap-0.5 ${mobileActiveSubTab === 'home' ? 'text-primary' : 'text-slate-400'}`}
                >
                  <Home className="w-5 h-5" />
                  <span className="text-[9px] font-bold">Ana Sayfa</span>
                </button>

                <button 
                  onClick={() => { setMobileActiveSubTab('courses'); setSelectedMobileCourseId(null); }}
                  className={`flex flex-col items-center gap-0.5 ${mobileActiveSubTab === 'courses' ? 'text-primary' : 'text-slate-400'}`}
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="text-[9px] font-bold">Eğitimler</span>
                </button>

                {/* FAB: Plus button mimicking mobile app fabric */}
                <div className="relative -top-3">
                  <button 
                    onClick={() => useAppStore.getState().showDialog({
                      type: 'info',
                      title: 'Hızlı Ekle',
                      message: 'Mobil Hızlı Ekleme Menüsü: Yeni ders oluşturabilir veya çalışanları buraya hızlıca davet edebilirsiniz.'
                    } as any)}
                    className="w-11 h-11 bg-primary hover:bg-primary-container text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 transform hover:scale-105 transition-all"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>

                <button 
                  onClick={() => { setMobileActiveSubTab('reports'); setSelectedMobileCourseId(null); }}
                  className={`flex flex-col items-center gap-0.5 ${mobileActiveSubTab === 'reports' ? 'text-primary' : 'text-slate-400'}`}
                >
                  <BarChart2 className="w-5 h-5" />
                  <span className="text-[9px] font-bold">Raporlar</span>
                </button>

                <button 
                  onClick={() => { setMobileActiveSubTab('profile'); setSelectedMobileCourseId(null); }}
                  className={`flex flex-col items-center gap-0.5 ${mobileActiveSubTab === 'profile' ? 'text-primary' : 'text-slate-400'}`}
                >
                  <Users className="w-5 h-5" />
                  <span className="text-[9px] font-bold">Profil</span>
                </button>
              </nav>

            </div>
          </div>

        </div>
      )}
      
      <GlobalDialogs />

      {/* Support Modal */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-slideUp">
            
            <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-on-surface">Destek Talebi Oluştur</h3>
                  <p className="text-xs text-on-surface-variant font-medium">Size nasıl yardımcı olabiliriz?</p>
                </div>
              </div>
              <button 
                onClick={() => setIsSupportModalOpen(false)}
                className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-on-surface mb-1">Destek Konusu</label>
                <select className="w-full px-3 py-2 border border-outline-variant rounded-lg text-sm bg-surface-container-low focus:outline-none focus:border-primary">
                  <option>Teknik Sorun</option>
                  <option>Fatura ve Ödeme</option>
                  <option>Eğitim İçerikleri</option>
                  <option>Kullanıcı Yönetimi</option>
                  <option>Diğer</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-on-surface mb-1">Başlık</label>
                <input 
                  type="text" 
                  placeholder="Sorununuzu kısaca özetleyin" 
                  className="w-full px-3 py-2 border border-outline-variant rounded-lg text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface mb-1">Açıklama</label>
                <textarea 
                  rows={4}
                  placeholder="Detaylı bilgi verin..." 
                  className="w-full px-3 py-2 border border-outline-variant rounded-lg text-sm focus:outline-none focus:border-primary resize-none"
                ></textarea>
              </div>
            </div>

            <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant/30 flex justify-end gap-3">
              <button 
                onClick={() => setIsSupportModalOpen(false)}
                className="px-4 py-2 text-sm font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors"
              >
                İptal
              </button>
              <button 
                onClick={() => {
                  setIsSupportModalOpen(false);
                  useAppStore.getState().showDialog({
                    type: 'success',
                    title: 'Talebiniz Alındı',
                    message: 'Destek ekibimiz en kısa sürede sizinle iletişime geçecektir.'
                  });
                }}
                className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-blue-800 shadow-md flex items-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                Gönder
              </button>
            </div>
            
          </div>
        </div>
      )}

      {/* Simulated Chatbot Widget */}
      <ChatbotWidget />

    </div>
  );
}
