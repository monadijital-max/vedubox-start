'use client';

import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, ChevronLeft, ChevronRight, UserPlus, BookOpen } from 'lucide-react';
import NewAssignmentModal from './NewAssignmentModal';

export default function Assignments() {
  const [activeTab, setActiveTab] = useState<'tumu' | 'devam' | 'tamamlanan' | 'geciken'>('tumu');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignCourseId, setAssignCourseId] = useState<string | null>(null);

  return (
    <div className="space-y-lg animate-fadeIn text-on-surface">
      
      {/* Header */}
      <div className="mb-sm">
        <h1 className="text-headline-md font-bold text-on-surface">Atamalar</h1>
        <div className="flex items-center text-label-sm text-on-surface-variant gap-xs mt-1">
          <span>Ana Sayfa</span>
          <span>/</span>
          <span className="text-primary font-semibold">Atamalar</span>
        </div>
      </div>

      {/* Top Controls Row */}
      <div className="flex flex-col md:flex-row gap-sm justify-between items-center bg-white p-sm rounded-lg shadow-soft-sm border border-outline-variant/30">
        <div className="w-full md:w-[400px] relative">
          <Search className="w-4 h-4 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Eğitim ara..." 
            className="w-full pl-10 pr-md py-[10px] bg-surface-container-low border border-transparent rounded-md text-body-sm focus:outline-none focus:border-outline-variant transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-sm w-full md:w-auto">
          <button className="flex-1 md:flex-none px-md py-[10px] bg-white border border-outline-variant hover:bg-surface-container rounded-md text-label-sm font-semibold transition-all flex items-center justify-center gap-xs shadow-soft-sm">
            <Filter className="w-4 h-4" />
            Filtrele
          </button>
          <button 
            onClick={() => {
              setAssignCourseId(null);
              setIsModalOpen(true);
            }}
            className="flex-1 md:flex-none px-md py-[10px] bg-primary text-white text-label-sm font-bold rounded-md hover:bg-blue-800 shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-xs"
          >
            <Plus className="w-4 h-4" />
            Yeni Atama Yap
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        
        {/* Tabs & Filter */}
        <div className="p-2 border-b border-outline-variant/30 bg-surface-container-low flex justify-between items-center">
          <div className="flex gap-1 p-1 bg-white rounded-lg border border-outline-variant/20 shadow-sm">
            <button 
              onClick={() => setActiveTab('tumu')}
              className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${
                activeTab === 'tumu' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Tümü
            </button>
            <button 
              onClick={() => setActiveTab('devam')}
              className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${
                activeTab === 'devam' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Aktif Eğitimler
            </button>
            <button 
              onClick={() => setActiveTab('tamamlanan')}
              className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${
                activeTab === 'tamamlanan' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Pasif Eğitimler
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-bold text-on-surface border border-outline-variant/40 rounded-md bg-white hover:bg-surface-container transition-colors shadow-sm mr-2">
            <Filter className="w-4 h-4" />
            Filtrele
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest text-[11px] font-bold text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/30">
                <th className="px-6 py-4">EĞİTİM ADI</th>
                <th className="px-6 py-4">KATEGORİ</th>
                <th className="px-6 py-4">OLUŞTURULMA TARİHİ</th>
                <th className="px-6 py-4">DURUM</th>
                <th className="px-6 py-4 text-center">İŞLEMLER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              
              {/* Row 1 */}
              <tr className="hover:bg-surface-container-lowest transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src="https://picsum.photos/seed/course1/100/100" alt="Dijital Pazarlama" className="w-10 h-10 rounded-lg object-cover border border-outline-variant/30 shadow-sm" />
                    <div>
                      <p className="text-sm font-bold text-on-surface leading-tight">Dijital Pazarlama Temelleri</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">12 Ders</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium bg-surface-container rounded-md">Pazarlama</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-on-surface font-medium">12 Ekim 2023</p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-100 rounded-md">AKTİF</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <button 
                      onClick={() => {
                        setAssignCourseId('c1');
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 text-on-surface-variant hover:text-primary rounded-full hover:bg-surface-container transition-colors"
                      title="Atama Yap"
                    >
                      <UserPlus className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-surface-container-lowest transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src="https://picsum.photos/seed/course2/100/100" alt="İleri React" className="w-10 h-10 rounded-lg object-cover border border-outline-variant/30 shadow-sm" />
                    <div>
                      <p className="text-sm font-bold text-on-surface leading-tight">İleri React & Next.js</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">10 Ders</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium bg-surface-container rounded-md">Yazılım</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-on-surface font-medium">05 Kas 2023</p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-100 rounded-md">AKTİF</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <button 
                      onClick={() => {
                        setAssignCourseId('c2');
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 text-on-surface-variant hover:text-primary rounded-full hover:bg-surface-container transition-colors"
                      title="Atama Yap"
                    >
                      <UserPlus className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-surface-container-lowest transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src="https://picsum.photos/seed/course3/100/100" alt="KVKK" className="w-10 h-10 rounded-lg object-cover border border-outline-variant/30 shadow-sm" />
                    <div>
                      <p className="text-sm font-bold text-on-surface leading-tight">KVKK Uyumluluk Eğitimi</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">5 Ders</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium bg-surface-container rounded-md">Uyum</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-on-surface font-medium">20 Eyl 2023</p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 text-[10px] font-bold text-rose-700 bg-rose-100 rounded-md">PASİF</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <button 
                      onClick={() => {
                        setAssignCourseId('c3');
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 text-on-surface-variant hover:text-primary rounded-full hover:bg-surface-container transition-colors"
                      title="Atama Yap"
                    >
                      <UserPlus className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* Pagination & Footer */}
        <div className="p-4 bg-surface-container-low flex justify-between items-center border-t border-outline-variant/30">
          <p className="text-sm font-medium text-on-surface-variant">Toplam 3 eğitim gösteriliyor</p>
          <div className="flex items-center gap-4 bg-white border border-outline-variant/30 rounded-lg overflow-hidden shadow-sm">
            <button className="p-2 hover:bg-surface-container transition-colors text-on-surface-variant hover:text-on-surface">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-bold text-on-surface px-2">1 / 1</span>
            <button className="p-2 hover:bg-surface-container transition-colors text-on-surface-variant hover:text-on-surface border-l border-outline-variant/30">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {isModalOpen && <NewAssignmentModal onClose={() => setIsModalOpen(false)} initialCourseId={assignCourseId} />}
    </div>
  );
}

