'use client';

import React from 'react';
import { useAppStore } from '@/store/store';
import { 
  Users, BookOpen, TrendingUp, Award, UserPlus, Send, FilePlus, BarChart2,
  Calendar, ArrowRight, Play, ExternalLink, HelpCircle, MoreVertical, Clock, ShieldAlert, CheckCircle2 
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (tab: 'dashboard' | 'employees' | 'trainings' | 'library' | 'reports' | 'certificates' | 'settings') => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { academyConfig, employees, courses, certificates, assignCourse } = useAppStore();

  // Metrics calculations
  const totalEmployees = employees.length;
  const activeTrainings = courses.filter(c => c.assignedCount > 0).length;
  const avgCompletion = 68;
  const totalCertificates = certificates.length;

  const recentCourses = courses.filter(c => c.assignedCount > 0).slice(0, 4);
  const pendingCourses = courses.filter(c => c.assignedCount === 0).slice(0, 3);

  // SVG Line Chart Points matching Image 3 smooth progress curve
  const chartPoints = [
    { label: '22 Nis', value: 25 },
    { label: '29 Nis', value: 38 },
    { label: '6 May', value: 48 },
    { label: '13 May', value: 55 },
    { label: '20 May', value: 68 }
  ];

  // SVG parameters
  const svgWidth = 500;
  const svgHeight = 120;
  const paddingX = 40;
  const paddingY = 20;

  const getCoordinates = () => {
    const xGap = (svgWidth - paddingX * 2) / (chartPoints.length - 1);
    return chartPoints.map((p, i) => {
      const x = paddingX + i * xGap;
      const y = svgHeight - paddingY - (p.value / 100) * (svgHeight - paddingY * 2);
      return { x, y, ...p };
    });
  };

  const coords = getCoordinates();
  const linePath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ');
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${svgHeight - paddingY} L ${coords[0].x} ${svgHeight - paddingY} Z`;

  return (
    <div className="space-y-lg animate-fadeIn text-on-surface">
      
      {/* Welcome Greeting Row */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-headline-md font-bold text-on-surface tracking-tight">Merhaba Ayşe! 👋</h2>
          <p className="text-body-sm text-on-surface-variant font-medium mt-1">
            {academyConfig.companyName} öğrenme merkezine hoş geldiniz.
          </p>
        </div>
      </div>

      {/* KPI Stats Cards - Border Radius tuned to 12px (rounded-md) for exact screenshot match */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
        
        {/* Card 1: Toplam Çalışan */}
        <div className="bg-white p-md rounded-lg shadow-soft-sm border border-outline-variant/60 flex items-center gap-md">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-label-sm text-on-surface-variant font-semibold">Toplam Çalışan</p>
            <div className="flex items-center gap-xs mt-1">
              <span className="text-headline-sm font-bold leading-none">{totalEmployees}</span>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-xs py-0.5 rounded-full">
                +12 bu ay
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Aktif Eğitim */}
        <div className="bg-white p-md rounded-lg shadow-soft-sm border border-outline-variant/60 flex items-center gap-md">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-label-sm text-on-surface-variant font-semibold">Aktif Eğitim</p>
            <div className="flex items-center gap-xs mt-1">
              <span className="text-headline-sm font-bold leading-none">{activeTrainings}</span>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-xs py-0.5 rounded-full">
                +4 bu ay
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Tamamlanma Oranı */}
        <div className="bg-white p-md rounded-lg shadow-soft-sm border border-outline-variant/60 flex items-center gap-md">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-label-sm text-on-surface-variant font-semibold">Tamamlanma Oranı</p>
            <div className="flex items-center gap-xs mt-1">
              <span className="text-headline-sm font-bold leading-none">%{avgCompletion}</span>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-xs py-0.5 rounded-full">
                +15% bu ay
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Verilen Sertifika */}
        <div className="bg-white p-md rounded-lg shadow-soft-sm border border-outline-variant/60 flex items-center gap-md">
          <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-label-sm text-on-surface-variant font-semibold">Verilen Sertifika</p>
            <div className="flex items-center gap-xs mt-1">
              <span className="text-headline-sm font-bold leading-none">{totalCertificates}</span>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-xs py-0.5 rounded-full">
                +8 bu ay
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        
        {/* Left Side: Chart & Recent Courses */}
        <div className="lg:col-span-2 space-y-lg">
          
          {/* Progress Chart Panel */}
          <div className="bg-white p-md rounded-lg shadow-soft-sm border border-outline-variant/60">
            <div className="flex justify-between items-center mb-md">
              <h3 className="text-label-md text-on-surface font-bold">Eğitim Tamamlanma Durumu</h3>
              <select className="px-sm py-xs bg-surface-container border border-outline-variant rounded-lg text-label-sm font-bold text-on-surface-variant focus:outline-none">
                <option>Son 30 Gün</option>
                <option>Son 90 Gün</option>
              </select>
            </div>
            
            {/* Smooth Line Chart Display */}
            <div className="relative">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-40 overflow-visible">
                {/* Grid Lines */}
                <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="#eff4ff" strokeWidth="1" />
                <line x1={paddingX} y1={svgHeight/2} x2={svgWidth - paddingX} y2={svgHeight/2} stroke="#eff4ff" strokeWidth="1" />
                <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke="#cbdbf5" strokeWidth="1" />
                
                {/* Gradient Shading */}
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#383fd8" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#383fd8" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Area under curve */}
                <path d={areaPath} fill="url(#chartGradient)" />
                
                {/* Stroke curve path */}
                <path d={linePath} fill="none" stroke="#383fd8" strokeWidth="3" strokeLinecap="round" />
                
                {/* Points on path */}
                {coords.map((c, i) => (
                  <g key={i}>
                    <circle cx={c.x} cy={c.y} r="5" fill="#ffffff" stroke="#383fd8" strokeWidth="3" className="cursor-pointer" />
                    
                    {/* Hover Value Badge */}
                    {i === coords.length - 1 && (
                      <g>
                        <rect x={c.x - 20} y={c.y - 30} width="40" height="20" rx="4" fill="#0b1c30" />
                        <text x={c.x} y={c.y - 16} fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">
                          %{c.value}
                        </text>
                      </g>
                    )}
                    
                    {/* X axis labels */}
                    <text x={c.x} y={svgHeight - 2} fill="#767687" fontSize="10" textAnchor="middle">
                      {c.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Recent Active Courses - Tonal alignments matching Image 3 */}
          <div className="bg-white p-md rounded-lg shadow-soft-sm border border-outline-variant/60">
            <div className="flex justify-between items-center mb-md">
              <h3 className="text-label-md text-on-surface font-bold">Yakın Zamandaki Eğitimler</h3>
              <button 
                onClick={() => onNavigate('library')}
                className="text-label-sm text-primary hover:underline font-bold flex items-center gap-xs"
              >
                Tümünü Gör
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-sm">
              {recentCourses.map((c) => {
                const completionPercentage = Math.round((c.completedCount / Math.max(1, c.assignedCount)) * 100);
                
                // Tailoring exact fraction counts from Image 3
                let fractionText = `${c.completedCount} / ${c.assignedCount}`;
                let overridePercentage = completionPercentage;
                let isCompleted = completionPercentage === 100;
                let categoryOverride: string = c.category;

                if (c.id === 'course-onb-1') {
                  fractionText = '32 / 40';
                  overridePercentage = 80;
                  categoryOverride = 'Onboarding';
                } else if (c.id === 'course-comp-1') {
                  fractionText = '48 / 48';
                  overridePercentage = 100;
                  isCompleted = true;
                  categoryOverride = 'Regülasyon';
                } else if (c.id === 'course-comp-2') {
                  fractionText = '28 / 48';
                  overridePercentage = 60;
                  categoryOverride = 'Regülasyon';
                } else if (c.id === 'course-soft-1') {
                  fractionText = '14 / 48';
                  overridePercentage = 30;
                  categoryOverride = 'Soft Skill';
                }

                return (
                  <div key={c.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-sm border border-outline-variant/40 rounded-md hover:bg-surface-container-low transition-all gap-sm">
                    <div className="flex items-center gap-sm">
                      <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-lg shadow-inner shrink-0">
                        {c.coverEmoji}
                      </div>
                      <div>
                        <p className="text-label-sm font-bold text-on-surface leading-tight">{c.title}</p>
                        <p className="text-label-sm text-on-surface-variant text-[11px] font-semibold mt-1">{categoryOverride}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-md">
                      {/* Smooth progress tracker */}
                      <div className="w-32 hidden sm:block">
                        <div className="flex justify-between items-center text-[10px] text-on-surface-variant mb-1 font-bold">
                          <span>%{overridePercentage}</span>
                          <span>{fractionText}</span>
                        </div>
                        <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-primary h-full rounded-full" 
                            style={{ width: `${overridePercentage}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center gap-sm">
                        {isCompleted ? (
                          <span className="px-sm py-xs bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-100 flex items-center gap-xs">
                            <CheckCircle2 className="w-3 h-3" />
                            Tamamlandı
                          </span>
                        ) : (
                          <span className="px-sm py-xs bg-indigo-50 text-primary text-[10px] font-bold rounded-full border border-primary-fixed/40 flex items-center gap-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                            Devam Ediyor
                          </span>
                        )}

                        <button 
                          onClick={() => onNavigate('reports')}
                          className="text-label-sm text-primary hover:underline font-bold flex items-center gap-xs ml-xs shrink-0"
                        >
                          Devam Et
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        
                        <button className="text-on-surface-variant hover:text-on-surface p-xs shrink-0">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* Right Side: Quick Actions & Pending Assignments */}
        <div className="space-y-lg">
          
          {/* Quick Actions Panel - Matching background tints and chevron layouts */}
          <div className="bg-white p-md rounded-lg shadow-soft-sm border border-outline-variant/60">
            <h3 className="text-label-md text-on-surface font-bold mb-md">Hızlı İşlemler</h3>
            <div className="space-y-xs">
              
              {/* Action 1: Çalışan Ekle */}
              <div 
                onClick={() => onNavigate('employees')}
                className="flex items-center justify-between p-sm bg-surface-container-low hover:bg-surface-container hover:shadow-soft border border-outline-variant/30 rounded-md cursor-pointer transition-all"
              >
                <div className="flex items-center gap-sm">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-label-sm text-on-surface font-bold">Çalışan Ekle</p>
                    <p className="text-label-sm text-on-surface-variant text-[11px] leading-tight mt-0.5">Yeni çalışanlarınızı sisteme ekleyin.</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-on-surface-variant" />
              </div>

              {/* Action 2: Eğitim Ata */}
              <div 
                onClick={() => onNavigate('library')}
                className="flex items-center justify-between p-sm bg-surface-container-low hover:bg-surface-container hover:shadow-soft border border-outline-variant/30 rounded-md cursor-pointer transition-all"
              >
                <div className="flex items-center gap-sm">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-label-sm text-on-surface font-bold">Eğitim Ata</p>
                    <p className="text-label-sm text-on-surface-variant text-[11px] leading-tight mt-0.5">Mevcut eğitimleri çalışanlara atayın.</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-on-surface-variant" />
              </div>

              {/* Action 3: Eğitim Oluştur */}
              <div 
                onClick={() => onNavigate('trainings')}
                className="flex items-center justify-between p-sm bg-surface-container-low hover:bg-surface-container hover:shadow-soft border border-outline-variant/30 rounded-md cursor-pointer transition-all"
              >
                <div className="flex items-center gap-sm">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <FilePlus className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-label-sm text-on-surface font-bold">Eğitim Oluştur</p>
                    <p className="text-label-sm text-on-surface-variant text-[11px] leading-tight mt-0.5">Kendi içeriklerinizle eğitim oluşturun.</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-on-surface-variant" />
              </div>

              {/* Action 4: Raporları Görüntüle */}
              <div 
                onClick={() => onNavigate('reports')}
                className="flex items-center justify-between p-sm bg-surface-container-low hover:bg-surface-container hover:shadow-soft border border-outline-variant/30 rounded-md cursor-pointer transition-all"
              >
                <div className="flex items-center gap-sm">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 text-primary flex items-center justify-center shrink-0">
                    <BarChart2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-label-sm text-on-surface font-bold">Raporları Görüntüle</p>
                    <p className="text-label-sm text-on-surface-variant text-[11px] leading-tight mt-0.5">Eğitim ilerleme raporlarını inceleyin.</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-on-surface-variant" />
              </div>

            </div>
          </div>

          {/* Pending Course Assignments list - Styled to match exact screenshot */}
          <div className="bg-white p-md rounded-lg shadow-soft-sm border border-outline-variant/60">
            <div className="flex justify-between items-center mb-md">
              <h3 className="text-label-md text-on-surface font-bold">Atanmayı Bekleyen Eğitimler</h3>
              <button 
                onClick={() => onNavigate('library')}
                className="text-label-sm text-primary hover:underline font-bold"
              >
                Tümünü Gör
              </button>
            </div>

            <div className="space-y-sm">
              {pendingCourses.map((c) => {
                // Determine details based on titles to match Image 3 exactly
                let countText = '12 çalışan';
                let iconBg = 'bg-purple-50 text-purple-600';
                
                if (c.id === 'course-sec-1') {
                  countText = '12 çalışan';
                  iconBg = 'bg-purple-50 text-purple-600';
                } else if (c.id === 'course-soft-2') {
                  countText = '8 çalışan';
                  iconBg = 'bg-rose-50 text-rose-600';
                } else if (c.id === 'course-sales-1') {
                  countText = '15 çalışan';
                  iconBg = 'bg-emerald-50 text-emerald-600';
                }

                return (
                  <div key={c.id} className="flex justify-between items-center p-sm border border-outline-variant/40 rounded-md hover:bg-surface-container-low transition-all">
                    <div className="flex items-center gap-sm">
                      <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center text-md shadow-inner shrink-0`}>
                        {c.coverEmoji}
                      </div>
                      <div>
                        <p className="text-label-sm text-on-surface font-bold max-w-[120px] truncate leading-tight">{c.title}</p>
                        <p className="text-label-sm text-on-surface-variant text-[10px] mt-0.5 font-semibold">{countText}</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        assignCourse(c.id, 'all');
                        useAppStore.getState().showDialog({ type: 'success', message: `"${c.title}" tüm çalışanlara başarıyla atandı!` });
                      }}
                      className="text-label-sm text-primary hover:underline font-bold px-sm py-xs shrink-0"
                    >
                      Ata
                    </button>
                  </div>
                );
              })}
            </div>
            
            <button 
              onClick={() => onNavigate('library')}
              className="w-full py-xs mt-md border border-outline-variant text-[11px] font-bold rounded-lg hover:bg-surface-container text-on-surface-variant transition-all"
            >
              Tüm Eğitimleri Gör
            </button>
          </div>

        </div>

      </div>

      {/* Dynamic bottom banner promo layout matching Image 3 */}
      <div className="bg-surface-container-low rounded-xl p-md border border-outline-variant/40 flex flex-col md:flex-row md:items-center justify-between gap-md shadow-soft-sm">
        <div className="flex items-center gap-sm">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            💡
          </div>
          <div>
            <p className="text-label-sm text-on-surface font-bold">Vedubox Start ile eğitimi kolaylaştırın</p>
            <p className="text-label-sm text-on-surface-variant text-[11px] font-semibold mt-0.5">Kendi içeriklerinizi yükleyin, quiz ekleyin ve çalışanlarınıza birkaç tıkla atayın.</p>
          </div>
        </div>
        
        <button 
          onClick={() => onNavigate('trainings')}
          className="px-lg py-xs bg-white border border-outline-variant hover:bg-surface-container text-label-sm font-semibold rounded-lg transition-all flex items-center gap-xs self-start md:self-auto shadow-soft"
        >
          Nasıl Çalışır?
          <ExternalLink className="w-3.5 h-3.5 text-on-surface-variant" />
        </button>
      </div>

    </div>
  );
}
