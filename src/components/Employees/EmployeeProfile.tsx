'use client';

import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Clock, CheckCircle2, Award, Mail, Phone, Calendar, MapPin } from 'lucide-react';
import { useAppStore } from '@/store/store';

interface EmployeeProfileProps {
  onBack: () => void;
  employeeId?: string;
}

export default function EmployeeProfile({ onBack, employeeId }: EmployeeProfileProps) {
  const [activeTab, setActiveTab] = useState<'devam_eden' | 'tamamlanan' | 'sinavlar'>('devam_eden');
  
  const { employees, courses } = useAppStore();
  const employee = employees.find(e => e.id === employeeId) || employees[0]; // fallback if not found

  // Calculate some stats from the employee's enrollments
  const inProgressCourses = employee.enrollments.filter(e => e.status === 'in_progress');
  const completedCourses = employee.enrollments.filter(e => e.status === 'completed');
  // Exams could be mocked since we don't track exams per employee in the store
  const takenExams = 2; 

  const getCourseDetails = (cId: string) => courses.find(c => c.id === cId);

  return (
    <div className="space-y-6 animate-fadeIn pb-8 text-on-surface">
      {/* Header / Breadcrumb */}
      <div className="flex items-center text-sm font-medium text-on-surface-variant gap-2 mb-4">
        <button onClick={onBack} className="hover:text-primary transition-colors flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Çalışanlar
        </button>
        <span>/</span>
        <span className="text-primary font-bold">Çalışan Profili</span>
      </div>

      {/* Top Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary to-[#8b5cf6]"></div>
        <div className="px-8 pb-8 relative">
          {/* Avatar */}
          <div className="absolute -top-12 left-8 w-24 h-24 rounded-full border-4 border-white bg-white shadow-sm overflow-hidden">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704a" alt="Profil" className="w-full h-full object-cover" />
          </div>
          
          <div className="pt-14 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-on-surface">{employee.name}</h2>
              <p className="text-sm font-medium text-on-surface-variant">{employee.department} • {employee.group}</p>
              
              <div className="flex gap-4 mt-4 text-sm text-on-surface-variant font-medium flex-wrap">
                <div className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {employee.email}</div>
                {employee.phone && <div className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {employee.phone}</div>}
                {employee.city && <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {employee.city}{employee.district ? `, ${employee.district}` : ''}</div>}
                <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Katılım: Oca 2024</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="inline-block px-4 py-2 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-xs font-bold text-amber-700 uppercase tracking-wide">Toplam Puan</p>
                <p className="text-2xl font-black text-amber-600 flex items-center gap-2">
                  <Award className="w-6 h-6" /> 2,450
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30 flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4"></div>
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center relative z-10">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-bold text-on-surface-variant">Tamamlanan Eğitim</p>
            <p className="text-2xl font-black text-on-surface">{completedCourses.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30 flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#8b5cf6]/5 rounded-bl-full -mr-4 -mt-4"></div>
          <div className="w-12 h-12 rounded-full bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center relative z-10">
            <Clock className="w-6 h-6" />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-bold text-on-surface-variant">Devam Eden Eğitim</p>
            <p className="text-2xl font-black text-on-surface">{inProgressCourses.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30 flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full -mr-4 -mt-4"></div>
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center relative z-10">
            <Award className="w-6 h-6" />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-bold text-on-surface-variant">Girdiği Sınavlar</p>
            <p className="text-2xl font-black text-on-surface">{takenExams}</p>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="flex border-b border-outline-variant/30 bg-surface-container-lowest px-4 pt-4 gap-6">
          <button 
            onClick={() => setActiveTab('devam_eden')}
            className={`py-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'devam_eden' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Devam Eden Eğitimler ({inProgressCourses.length})
          </button>
          <button 
            onClick={() => setActiveTab('tamamlanan')}
            className={`py-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'tamamlanan' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Tamamlanan Eğitimler ({completedCourses.length})
          </button>
          <button 
            onClick={() => setActiveTab('sinavlar')}
            className={`py-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'sinavlar' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Girdiği Sınavlar ({takenExams})
          </button>
        </div>

        <div className="p-0">
          {activeTab === 'devam_eden' && (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-lowest text-xs font-bold text-on-surface-variant uppercase border-b border-outline-variant/30">
                  <th className="px-6 py-4">Eğitim Adı</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">İlerleme</th>
                  <th className="px-6 py-4">Son Tarih</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {inProgressCourses.length > 0 ? inProgressCourses.map((enrollment) => {
                  const course = getCourseDetails(enrollment.courseId);
                  return (
                    <tr key={enrollment.courseId} className="hover:bg-surface-container-lowest transition-colors">
                      <td className="px-6 py-4 font-bold text-sm">{course?.title || 'Bilinmeyen Eğitim'}</td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">{course?.category || '-'}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                            <div className="h-full bg-[#8b5cf6] rounded-full" style={{ width: `${enrollment.progress}%` }}></div>
                          </div>
                          <span className="text-xs font-bold text-[#8b5cf6] w-8">{enrollment.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">Devam Ediyor</td>
                    </tr>
                  )
                }) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-on-surface-variant">Devam eden eğitim bulunmuyor.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          
          {activeTab === 'tamamlanan' && (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-lowest text-xs font-bold text-on-surface-variant uppercase border-b border-outline-variant/30">
                  <th className="px-6 py-4">Eğitim Adı</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Tamamlanma Tarihi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {completedCourses.length > 0 ? completedCourses.map((enrollment) => {
                  const course = getCourseDetails(enrollment.courseId);
                  return (
                    <tr key={enrollment.courseId} className="hover:bg-surface-container-lowest transition-colors">
                      <td className="px-6 py-4 font-bold text-sm flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        {course?.title || 'Bilinmeyen Eğitim'}
                      </td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">{course?.category || '-'}</td>
                      <td className="px-6 py-4 text-sm font-medium">{enrollment.completedAt ? new Date(enrollment.completedAt).toLocaleDateString('tr-TR') : '-'}</td>
                    </tr>
                  )
                }) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-on-surface-variant">Tamamlanan eğitim bulunmuyor.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {activeTab === 'sinavlar' && (
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-outline-variant/30 rounded-xl p-6 bg-surface-container-lowest flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-on-surface">İş Sağlığı ve Güvenliği Sınavı</h4>
                    <p className="text-xs text-on-surface-variant mt-1">12 Mayıs 2026</p>
                  </div>
                  <div className="px-3 py-1 bg-emerald-100 text-emerald-700 font-bold rounded-lg text-sm border border-emerald-200">
                    95 Puan
                  </div>
                </div>
                <div className="border border-outline-variant/30 rounded-xl p-6 bg-surface-container-lowest flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-on-surface">KVKK Sınavı</h4>
                    <p className="text-xs text-on-surface-variant mt-1">14 Mayıs 2026</p>
                  </div>
                  <div className="px-3 py-1 bg-emerald-100 text-emerald-700 font-bold rounded-lg text-sm border border-emerald-200">
                    88 Puan
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
