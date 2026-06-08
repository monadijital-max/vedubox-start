import React from 'react';
import { useAppStore } from '@/store/store';
import { 
  Users, BookOpen, TrendingUp, Award, ChevronDown, ChevronRight, MoreVertical, 
  Play, Plus, GraduationCap, BarChart2, ShieldCheck, Clock, MessageCircle, ArrowRight
} from 'lucide-react';

export default function Dashboard2() {
  const { academyConfig, employees, courses, certificates } = useAppStore();

  const stats = [
    {
      title: 'Toplam Çalışan',
      value: '48',
      trend: '+12 bu ay',
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Aktif Eğitim',
      value: '16',
      trend: '+4 bu ay',
      icon: BookOpen,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Tamamlanma Oranı',
      value: '%68',
      trend: '+15% bu ay',
      icon: TrendingUp,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50'
    },
    {
      title: 'Verilen Sertifika',
      value: '32',
      trend: '+8 bu ay',
      icon: Award,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    }
  ];

  const recentTrainings = [
    { title: 'Hoş Geldin! Oryantasyon Eğitimi', category: 'Onboarding', progress: 80, completed: 32, total: 40, icon: Users, color: 'bg-indigo-100 text-indigo-600', progressColor: 'bg-indigo-600' },
    { title: 'İş Sağlığı ve Güvenliği', category: 'Regülasyon', progress: 100, completed: 48, total: 48, icon: GraduationCap, color: 'bg-emerald-100 text-emerald-600', progressColor: 'bg-emerald-600' },
    { title: 'KVKK Farkındalık Eğitimi', category: 'Regülasyon', progress: 60, completed: 28, total: 48, icon: BookOpen, color: 'bg-rose-100 text-rose-600', progressColor: 'bg-rose-600' },
    { title: 'Etkili İletişim', category: 'Soft Skill', progress: 30, completed: 14, total: 48, icon: MessageCircle, color: 'bg-blue-100 text-blue-600', progressColor: 'bg-amber-500' }
  ];

  const quickActions = [
    { title: 'Çalışan Ekle', description: 'Yeni çalışanlarınızı sisteme ekleyin.', icon: Users, color: 'bg-indigo-100 text-indigo-600' },
    { title: 'Eğitim Ata', description: 'Mevcut eğitimleri çalışanlara atayın.', icon: GraduationCap, color: 'bg-emerald-100 text-emerald-600' },
    { title: 'Eğitim Oluştur', description: 'Kendi içeriklerinizi yükleyin ve eğitiminizi oluşturun.', icon: Plus, color: 'bg-amber-100 text-amber-600' },
    { title: 'Raporları Görüntüle', description: 'Eğitim ilerleme raporlarını inceleyin.', icon: BarChart2, color: 'bg-blue-100 text-blue-600' }
  ];

  const pendingTrainings = [
    { title: 'Siber Güvenlik Farkındalığı', employees: '12 çalışan', icon: ShieldCheck, color: 'bg-purple-100 text-purple-600' },
    { title: 'Zaman Yönetimi', employees: '8 çalışan', icon: Clock, color: 'bg-rose-100 text-rose-600' },
    { title: 'Müşteri İletişimi', employees: '15 çalışan', icon: MessageCircle, color: 'bg-emerald-100 text-emerald-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Merhaba Ayşe! 👋</h1>
        <p className="text-slate-500">{academyConfig.companyName} öğrenme merkezine hoş geldiniz.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.bgColor} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-800">{stat.value}</span>
                <span className="text-xs font-bold text-emerald-500">{stat.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Chart Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">Eğitim Tamamlanma Durumu</h3>
              <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
                Son 30 Gün <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            {/* Mock Chart Area */}
            <div className="relative h-64 w-full">
              <div className="absolute inset-0 flex flex-col justify-between text-xs text-slate-400">
                <div className="flex items-center gap-4 border-b border-slate-100 flex-1"><span className="w-8">100%</span></div>
                <div className="flex items-center gap-4 border-b border-slate-100 flex-1"><span className="w-8">75%</span></div>
                <div className="flex items-center gap-4 border-b border-slate-100 flex-1"><span className="w-8">50%</span></div>
                <div className="flex items-center gap-4 border-b border-slate-100 flex-1"><span className="w-8">25%</span></div>
                <div className="flex items-center gap-4 border-b border-slate-100 flex-1"><span className="w-8">0%</span></div>
              </div>
              
              {/* SVG Mock Line */}
              <svg className="absolute inset-0 w-full h-full pl-12" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#383fd8" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#383fd8" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path 
                  d="M0,80 Q10,70 20,60 T40,50 T60,40 T80,35 T100,32 L100,100 L0,100 Z" 
                  fill="url(#chartGradient)" 
                />
                <path 
                  d="M0,80 Q10,70 20,60 T40,50 T60,40 T80,35 T100,32" 
                  fill="none" 
                  stroke="#383fd8" 
                  strokeWidth="3" 
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                />
              </svg>
              
              {/* Point and Tooltip via HTML */}
              <div className="absolute right-0 top-[32%] flex items-center justify-center -translate-y-1/2">
                <div className="w-3 h-3 bg-[#383fd8] rounded-full border-2 border-white shadow-sm absolute right-[-6px]"></div>
                <div className="bg-slate-800 text-white text-xs font-bold py-1 px-2.5 rounded absolute right-4 shadow-md">
                  %68
                </div>
              </div>
              
              <div className="absolute bottom-[-20px] left-12 right-0 flex justify-between text-xs text-slate-400 font-medium">
                <span>22 Nis</span>
                <span>29 Nis</span>
                <span>6 May</span>
                <span>13 May</span>
                <span>20 May</span>
              </div>
            </div>
          </div>

          {/* Recent Trainings */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">Yakın Zamandaki Eğitimler</h3>
              <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                Tümünü Gör <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {recentTrainings.map((training, i) => (
                <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors group">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${training.color}`}>
                    <training.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 truncate">{training.title}</h4>
                    <p className="text-xs text-slate-500">{training.category}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-32 hidden sm:block">
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${training.progressColor} rounded-full`} style={{ width: `${training.progress}%` }}></div>
                      </div>
                    </div>
                    <div className="text-right w-12">
                      <span className="text-sm font-bold text-slate-800">%{training.progress}</span>
                    </div>
                    <div className="text-right w-16 hidden sm:block">
                      <span className="text-xs font-bold text-slate-800">{training.completed} / {training.total}</span>
                    </div>
                    <div className="w-24 text-right">
                      <span className={`text-xs font-bold ${training.progress === 100 ? 'text-emerald-500' : 'text-indigo-600'}`}>
                        {training.progress === 100 ? 'Tamamlandı' : 'Devam Ediyor'}
                      </span>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute left-0 top-0 w-32 h-32 bg-indigo-600/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                <div className="w-6 h-6 bg-indigo-600 rounded-md rotate-45 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full -rotate-45"></div>
                </div>
              </div>
              <div>
                <h4 className="text-base font-bold text-indigo-900 mb-1">Vedubox Start ile eğitimi kolaylaştırın</h4>
                <p className="text-sm text-indigo-700/80">Kendi içeriklerinizi yükleyin, hazır eğitimlerden seçin ve çalışanlarınıza birkaç tıkla atayın.</p>
              </div>
            </div>
            <button className="shrink-0 bg-white border border-indigo-200 text-indigo-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-50 transition-colors flex items-center gap-2 relative z-10">
              <Play className="w-4 h-4" />
              Nasıl Çalışır?
            </button>
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Hızlı İşlemler</h3>
            <div className="space-y-4">
              {quickActions.map((action, i) => (
                <div key={i} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${action.color}`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{action.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{action.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 self-center" />
                </div>
              ))}
            </div>
          </div>

          {/* Pending Trainings */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">Atanmayı Bekleyen Eğitimler</h3>
              <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                Tümünü Gör <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4 mb-6">
              {pendingTrainings.map((training, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${training.color}`}>
                    <training.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 truncate">{training.title}</h4>
                    <p className="text-xs text-slate-500">{training.employees}</p>
                  </div>
                  <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700">
                    Ata
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-indigo-600 text-sm font-bold rounded-xl border border-slate-200 transition-colors">
              Tüm Eğitimleri Gör
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
