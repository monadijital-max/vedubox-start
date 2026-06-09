import React, { useState } from 'react';
import { useAppStore } from '@/store/store';
import { BookOpen, User, Monitor, Clock, PlayCircle, MoreVertical, Award, ChevronLeft, ChevronRight, Video, GraduationCap, Users, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const { courses } = useAppStore();
  const [selectedDate, setSelectedDate] = useState<number>(16);

  // Mock schedule data for calendar
  const scheduleData: Record<number, any[]> = {
    16: [
      { id: 1, title: 'Liderlik Eğitimi', type: 'Canlı Ders', time: '09:00 am', platform: 'Zoom meeting', icon: Video, color: 'text-blue-500', bg: 'bg-blue-100' },
      { id: 2, title: 'Uyum Süreci (Oryantasyon)', type: 'Canlı Ders', time: '03:00 pm', platform: 'Zoom meeting', icon: Video, color: 'text-indigo-500', bg: 'bg-indigo-100' }
    ],
    17: [
      { id: 3, title: 'Bilgi Güvenliği Sınavı', type: 'Sınav', time: '10:00 am', platform: 'Online Sınav', icon: BookOpen, color: 'text-rose-500', bg: 'bg-rose-100' }
    ],
    18: []
  };

  const selectedSchedule = scheduleData[selectedDate] || [];

  const recentUsers = [
    { name: 'mehmet aydın', unit: 'Ankara - Mavi Yaka', date: '08/05/2026 14:54' },
    { name: 'Ahmet Aydın', unit: 'Ankara - Mavi Yaka', date: '08/05/2026 14:54' },
    { name: 'ahmet daşdemir', unit: 'a taşeron firması', date: '17/04/2026 14:23' },
    { name: 'asy asy', unit: 'Ankara', date: '13/04/2026 12:08' },
    { name: 'Nazlı Deniz', unit: 'Ankara', date: '03/03/2026 15:06' },
  ];

  return (
    <div className="flex h-full w-full bg-[#f8f9fe] xl:pr-80">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-8 pt-4 w-full max-w-6xl mx-auto">
          
          <div className="space-y-6">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-[28px] font-bold text-[#1e1e2d] leading-tight">Admin Dashboard</h2>
              <p className="text-sm text-slate-500 mt-1">Sistem yönetimi ve genel istatistikler.</p>
            </div>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Eğitmenler */}
              <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col items-center justify-center h-44 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-5">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-[32px] font-black text-slate-800 mb-1 leading-none">9</span>
                <span className="text-[13px] font-semibold text-slate-500">Eğitmenler</span>
              </div>

              {/* Kullanıcılar */}
              <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col items-center justify-center h-44 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center mb-5">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-[32px] font-black text-slate-800 mb-1 leading-none">21</span>
                <span className="text-[13px] font-semibold text-slate-500">Kullanıcılar</span>
              </div>

              {/* Çevrimiçi Kullanıcılar */}
              <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col items-center justify-center h-44 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-5">
                  <Activity className="w-6 h-6" />
                </div>
                <span className="text-[32px] font-black text-slate-800 mb-1 leading-none">2</span>
                <span className="text-[13px] font-semibold text-slate-500">Çevrimiçi Kullanıcılar</span>
                <span className="text-[10px] text-slate-400 mt-1 font-medium">( son güncelleme: 11:17:02 )</span>
              </div>

            </div>

            {/* Middle Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Son Kayıt Olan Kullanıcılar (2x) */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col">
                <h3 className="text-sm font-bold text-slate-600 mb-6 px-1">Son Kayıt Olan Kullanıcılar</h3>
                <div className="flex-1 overflow-x-auto">
                  <table className="w-full text-left text-[13px] text-slate-500">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="pb-3 px-2 font-bold text-slate-500">Ad Soyad <span className="text-[10px] opacity-50 ml-1">▼</span></th>
                        <th className="pb-3 px-2 font-bold text-slate-500">Birim <span className="text-[10px] opacity-50 ml-1">▼</span></th>
                        <th className="pb-3 px-2 font-bold text-slate-500">Oluşturulma Tarihi <span className="text-[10px] opacity-50 ml-1">▼</span></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-medium">
                      {recentUsers.map((u, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-2 text-[#3b82f6] hover:underline cursor-pointer">{u.name}</td>
                          <td className="py-3 px-2">{u.unit}</td>
                          <td className="py-3 px-2 text-slate-400">{u.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Genel İlerleme (1x) */}
              <div className="lg:col-span-1 bg-white rounded-[16px] p-6 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col justify-between">
                <h3 className="text-base font-bold text-[#1e1e2d] mb-4">Genel İlerleme</h3>
                <div className="flex items-center gap-6">
                  <div className="relative w-32 h-32 shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="56" fill="transparent" stroke="#f1f5f9" strokeWidth="16" />
                      <circle cx="64" cy="64" r="56" fill="transparent" stroke="#383fd8" strokeWidth="16" strokeDasharray={`${2*Math.PI*56}`} strokeDashoffset={`${2*Math.PI*56 * (1 - 0.72)}`} strokeLinecap="round" />
                      <circle cx="64" cy="64" r="56" fill="transparent" stroke="#0ea5e9" strokeWidth="16" strokeDasharray={`${2*Math.PI*56}`} strokeDashoffset={`${2*Math.PI*56 * (1 - 0.40)}`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-[#1e1e2d]">%72</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 rounded-full bg-[#383fd8]"></div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Toplam Eğitim</p>
                        <p className="text-lg font-bold text-[#1e1e2d]">{courses.length || 24}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#0ea5e9]"></div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Tamamlanan</p>
                        <p className="text-lg font-bold text-[#1e1e2d]">17</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Zamanında tamamlama oranı:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1e1e2d] text-lg">%94</span>
                    <span className="bg-indigo-100 text-[#383fd8] text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      ↗ 2.3%
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Row: Son Yüklenen Eğitimler */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-[#1e1e2d]">Son Yüklenen Eğitimler</h3>
                <button className="text-sm font-semibold text-slate-500 hover:text-[#383fd8]">Tümünü Gör {'>'}</button>
              </div>
              
              <div className="space-y-3">
                {courses.slice(0, 3).map((c, i) => (
                  <div key={c.id} className="bg-white p-4 rounded-[16px] border border-slate-100 flex items-center justify-between gap-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-md transition-all">
                    
                    {/* Left: Thumbnail & Info */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 shadow-sm border border-slate-100">
                        <img 
                          src={
                            i === 0 ? "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=150&q=80" :
                            i === 1 ? "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=150&q=80" :
                            "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=150&q=80"
                          } 
                          alt={c.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#1e1e2d] mb-1 leading-tight">{c.title}</h4>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {c.duration} Süre</span>
                          <span className="flex items-center gap-1"><User className="w-3 h-3" /> Ayşe Yılmaz</span>
                          <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {8 + i} Ders</span>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Progress */}
                    <div className="flex-1 hidden md:block max-w-[200px] pr-4">
                      <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-2">
                        <span>%{(24 + i * 18)} tamamlandı</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#383fd8] rounded-full" style={{ width: `${(24 + i * 18)}%` }}></div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR AREA */}
      <div className="fixed top-0 right-0 w-80 h-screen bg-white border-l border-slate-100 flex flex-col shrink-0 hidden xl:flex shadow-[-4px_0_24px_rgba(0,0,0,0.02)] z-50 overflow-y-auto">
        <div className="p-6 pt-6 flex-1">
          
          {/* Leaderboard (Liderlik Tablosu) */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-[#1e1e2d]">Liderlik Tablosu</h3>
              <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
            </div>
            
            <div className="space-y-4">
              {/* Person 1 */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden">
                    <img src="https://i.pravatar.cc/150?img=11" alt="Durmuş Şahbaz" className="w-full h-full object-cover" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5"><Award className="w-3 h-3 text-amber-500" /></span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-[#1e1e2d]">Durmuş Şahbaz</span>
                    <span className="text-[10px] font-bold text-slate-500">1485 Puan</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
              
              {/* Person 2 */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
                    <img src="https://i.pravatar.cc/150?img=33" alt="Muhiddin Öktem" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-[#1e1e2d]">Muhiddin Öktem</span>
                    <span className="text-[10px] font-bold text-slate-500">950 Puan</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#383fd8] rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
              
              {/* Person 3 */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center overflow-hidden">
                    <img src="https://i.pravatar.cc/150?img=47" alt="Funda Yavuz" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-[#1e1e2d]">Funda Yavuz</span>
                    <span className="text-[10px] font-bold text-slate-500">420 Puan</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <button className="text-xs font-bold text-slate-500 hover:text-[#383fd8] border border-slate-200 rounded-lg px-4 py-1.5 w-full transition-colors">Tümünü Gör</button>
            </div>
          </div>

          <h3 className="text-xl font-bold text-[#1e1e2d] mb-6">Takvim</h3>
          
          {/* Calendar Widget */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <span className="text-base font-bold text-[#1e1e2d]">Ekim 2021</span>
              <div className="flex gap-2">
                <button className="w-6 h-6 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-slate-100">
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                </button>
                <button className="w-6 h-6 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-slate-100">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(d => (
                <span key={d} className="text-[10px] font-bold text-slate-400 uppercase">{d}</span>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-center text-sm font-semibold text-slate-700">
              {/* Previous month empty days */}
              <div></div><div></div><div></div><div></div>
              {/* Days */}
              {[15, 16, 17, 18, 19, 20, 21].map(day => (
                <button 
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full transition-all ${
                    selectedDate === day 
                      ? 'bg-[#383fd8] text-white shadow-lg shadow-[#383fd8]/30 scale-110' 
                      : 'hover:bg-slate-100'
                  } ${scheduleData[day]?.length > 0 && selectedDate !== day ? 'border-2 border-indigo-200' : ''}`}
                >
                  {day}
                </button>
              ))}
              {/* Following days */}
              {[22, 23, 24, 25, 26, 27, 28].map(day => (
                <button 
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className="w-8 h-8 mx-auto flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule List */}
          <div>
            <h4 className="text-sm font-bold text-[#1e1e2d] mb-4">Program ({selectedDate} Ekim)</h4>
            
            {selectedSchedule.length === 0 ? (
              <p className="text-sm text-slate-500 italic bg-slate-50 p-4 rounded-[16px] border border-slate-100 text-center">Bu tarihte herhangi bir canlı ders veya sınav bulunmuyor.</p>
            ) : (
              <div className="space-y-4">
                {selectedSchedule.map((item: any) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="bg-white p-4 rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 flex gap-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className={`w-12 h-12 rounded-[12px] flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-[#1e1e2d] mb-1 leading-tight">{item.title}</h5>
                        <div className="flex flex-col gap-1 text-[11px] text-slate-500 font-medium">
                          <span className="flex items-center gap-1.5"><Video className="w-3.5 h-3.5" /> {item.platform}</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {item.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
