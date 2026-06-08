'use client';

import React, { useState } from 'react';
import { 
  Plus, ChevronLeft, ChevronRight, LayoutGrid, List, 
  Clock, Video, Users, Edit, Trash2, Bell, Link as LinkIcon, ChevronDown, ChevronUp, X, MoreVertical
} from 'lucide-react';
import LiveTrainingForm from './LiveTrainingForm';

export default function LiveTrainings() {
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [weekOffset, setWeekOffset] = useState(0);

  const getWeekRange = (offset: number) => {
    if (offset === 0) return "02 - 06 Haz";
    if (offset === 1) return "09 - 13 Haz";
    if (offset === -1) return "26 - 30 May";
    return `${2 + offset * 7} - ${6 + offset * 7} Haz`;
  };

  if (isAdding) {
    return <LiveTrainingForm onCancel={() => setIsAdding(false)} />;
  }

  return (
    <div className="flex flex-col h-full animate-fadeIn pb-8">
      
      {/* Header Row: Filters and Add Button */}
      <div className="flex flex-col xl:flex-row items-center justify-between border-b border-outline-variant/30 pb-4 mb-6">
        
        {/* Left Filters */}
        <div className="flex items-center gap-6 w-full xl:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs text-on-surface-variant font-medium whitespace-nowrap">Eğitim:</span>
            <div className="relative flex items-center">
              <select className="text-sm font-bold text-primary bg-transparent border-b border-outline-variant/30 pb-1 pr-6 pl-2 outline-none cursor-pointer appearance-none w-28">
                <option>Hepsi</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-on-surface-variant font-medium whitespace-nowrap">Eğitmen:</span>
            <div className="relative flex items-center">
              <select className="text-sm font-bold text-primary bg-transparent border-b border-outline-variant/30 pb-1 pr-6 pl-2 outline-none cursor-pointer appearance-none w-28">
                <option>Hepsi</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-on-surface-variant font-medium whitespace-nowrap">Kategori:</span>
            <div className="relative flex items-center">
              <select className="text-sm font-bold text-primary bg-transparent border-b border-outline-variant/30 pb-1 pr-6 pl-2 outline-none cursor-pointer appearance-none w-28">
                <option>Hepsi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Actions: Navigation and Add Button */}
        <div className="flex items-center gap-6 mt-4 xl:mt-0 w-full xl:w-auto justify-between xl:justify-end">
          
          {/* Navigation */}
          <div className="flex items-center gap-4 text-primary xl:pr-6 xl:border-r border-outline-variant/30">
            <div className="flex items-center gap-2 text-on-surface-variant hidden md:flex">
              <LayoutGrid 
                className={`w-5 h-5 cursor-pointer transition-colors ${viewMode === 'grid' ? 'text-primary' : 'hover:text-primary'}`} 
                onClick={() => setViewMode('grid')}
              />
              <List 
                className={`w-6 h-6 cursor-pointer transition-colors ${viewMode === 'list' ? 'text-primary' : 'hover:text-primary'}`} 
                onClick={() => setViewMode('list')}
              />
            </div>
            <div className="flex items-center gap-2">
              <button 
                className="p-1 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors"
                onClick={() => setWeekOffset(prev => prev - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                className="p-1 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors"
                onClick={() => setWeekOffset(prev => prev + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <span className="text-sm font-bold text-primary ml-1 whitespace-nowrap">{getWeekRange(weekOffset)}</span>
          </div>

          {/* Add Button */}
          <button 
            className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-lg shadow-sm transition-all whitespace-nowrap"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="w-4 h-4" />
            Yeni Ekle
          </button>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'grid' ? (
        <div className="flex-1 grid grid-cols-5 gap-2">
        
        {/* Tuesday */}
        <div className="flex-1 flex flex-col">
          <div className="text-center py-4 border-b border-transparent">
            <h4 className="font-bold text-sm text-on-surface">Salı</h4>
            <p className="text-xs text-on-surface-variant">02/06/2026</p>
          </div>
          <div className="flex-1 p-2 bg-surface-container-lowest"></div>
        </div>

        {/* Wednesday */}
        <div className="flex-1 flex flex-col">
          <div className="text-center py-4 border-b border-transparent">
            <h4 className="font-bold text-sm text-on-surface">Çarşamba</h4>
            <p className="text-xs text-on-surface-variant">03/06/2026</p>
          </div>
          <div className="flex-1 p-2 bg-surface-container-lowest flex flex-col gap-3">
            {/* Past Training 1 */}
            <div className="bg-[#F8F9FF] rounded-[16px] border border-[#E9E9F3] hover:shadow-md transition-shadow p-4 relative opacity-80">
              <h3 className="text-sm font-bold text-on-surface mb-1 pr-8">Şirket İçi İletişim</h3>
              <div className="flex flex-col gap-0.5 mb-4">
                <span className="text-xs text-on-surface-variant">09:00 - 11:30</span>
                <span className="text-[11px] text-on-surface-variant flex items-center gap-1"><Video className="w-3 h-3" /> Zoom</span>
              </div>
              
              <div className="flex justify-between items-end">
                <div 
                  className="flex -space-x-2 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setShowParticipantsModal(true)}
                >
                  <img className="w-7 h-7 rounded-full border-2 border-[#F8F9FF] object-cover" src="https://i.pravatar.cc/100?img=3" alt="Avatar" />
                  <img className="w-7 h-7 rounded-full border-2 border-[#F8F9FF] object-cover" src="https://i.pravatar.cc/100?img=4" alt="Avatar" />
                </div>
                <button className="w-8 h-8 rounded-full bg-white border border-[#E9E9F3] flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors" title="Sil">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Past Training 2 */}
            <div className="bg-[#F8F9FF] rounded-[16px] border border-[#E9E9F3] hover:shadow-md transition-shadow p-4 relative opacity-80">
              <h3 className="text-sm font-bold text-on-surface mb-1 pr-8">Zaman Yönetimi</h3>
              <div className="flex flex-col gap-0.5 mb-4">
                <span className="text-xs text-on-surface-variant">13:00 - 15:00</span>
                <span className="text-[11px] text-on-surface-variant flex items-center gap-1"><Video className="w-3 h-3" /> Google Meet</span>
              </div>
              
              <div className="flex justify-between items-end">
                <div 
                  className="flex -space-x-2 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setShowParticipantsModal(true)}
                >
                  <img className="w-7 h-7 rounded-full border-2 border-[#F8F9FF] object-cover" src="https://i.pravatar.cc/100?img=5" alt="Avatar" />
                  <img className="w-7 h-7 rounded-full border-2 border-[#F8F9FF] object-cover" src="https://i.pravatar.cc/100?img=6" alt="Avatar" />
                  <div className="w-7 h-7 rounded-full border-2 border-[#F8F9FF] bg-gray-300 text-gray-700 text-[9px] font-bold flex items-center justify-center">
                    +4
                  </div>
                </div>
                <button className="w-8 h-8 rounded-full bg-white border border-[#E9E9F3] flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors" title="Sil">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Thursday (Active) */}
        <div className="flex-1 flex flex-col bg-[#f8fbff] rounded-t-xl relative">
          <div className="text-center py-3 bg-[#1d7bf2] text-white rounded-xl shadow-md z-10 mx-1 -mt-1 border border-blue-600">
            <h4 className="font-bold text-sm">Perşembe</h4>
            <p className="text-xs opacity-90">04/06/2026</p>
          </div>
          
          <div className="flex-1 p-2 bg-[#f8fbff] flex flex-col gap-3">
            {/* Nearest Current Training 1 */}
            <div className={`bg-white rounded-[16px] shadow-sm hover:shadow-md transition-shadow p-4 relative ${activeMenu === 'current1' ? 'z-20' : 'z-10'}`}>
              <h3 className="text-sm font-bold text-on-surface mb-1 pr-6">CRM EĞİTİMİ 1. GÜN</h3>
              <div className="flex flex-col gap-0.5 mb-3">
                <span className="text-xs text-on-surface-variant">10:05 - 16:45</span>
                <span className="text-[11px] text-on-surface-variant flex items-center gap-1"><Video className="w-3 h-3" /> Video Görüşme</span>
              </div>
              
              {/* Tags */}
              <div className="flex gap-2 mb-6">
                <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-full">CRM</span>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4">
                {/* Avatars (Katılımcılar) */}
                <div 
                  className="flex -space-x-2 cursor-pointer hover:scale-105 transition-transform" 
                  onClick={() => setShowParticipantsModal(true)}
                >
                  <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=1" alt="Avatar" />
                  <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=2" alt="Avatar" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-rose-400 text-white text-[10px] font-bold flex items-center justify-center">
                    +9
                  </div>
                </div>

                {/* Actions Menu */}
                <div className="relative">
                  <button 
                    className={`w-8 h-8 rounded-full border border-outline-variant/50 flex items-center justify-center transition-colors ${activeMenu === 'current1' ? 'bg-surface-container text-primary' : 'text-on-surface hover:bg-surface-container'}`}
                    onClick={() => setActiveMenu(activeMenu === 'current1' ? null : 'current1')}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {/* Actions Popup Menu */}
                  {activeMenu === 'current1' && (
                    <div className="absolute bottom-full mb-2 right-0 w-40 bg-white rounded-xl shadow-xl border border-outline-variant/30 overflow-hidden z-50 animate-fadeIn origin-bottom-right">
                      <button 
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-on-surface hover:bg-surface-container-lowest transition-colors"
                        onClick={() => setActiveMenu(null)}
                      >
                        <Edit className="w-4 h-4 text-teal-600" /> Düzenle
                      </button>
                      <button 
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                        onClick={() => setActiveMenu(null)}
                      >
                        <Trash2 className="w-4 h-4" /> Sil
                      </button>
                      <div className="h-px bg-outline-variant/10 w-full" />
                      <button 
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-on-surface hover:bg-surface-container-lowest transition-colors"
                        onClick={() => setActiveMenu(null)}
                      >
                        <Bell className="w-4 h-4 text-blue-500" /> Hatırlatma
                      </button>
                      <button 
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-on-surface hover:bg-surface-container-lowest transition-colors"
                        onClick={() => setActiveMenu(null)}
                      >
                        <LinkIcon className="w-4 h-4 text-on-surface-variant" /> Link
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Nearest Current Training 2 */}
            <div className={`bg-white rounded-[16px] shadow-sm hover:shadow-md transition-shadow p-4 relative ${activeMenu === 'current2' ? 'z-20' : 'z-10'}`}>
              <h3 className="text-sm font-bold text-on-surface mb-1 pr-6">İLETİŞİM BECERİLERİ</h3>
              <div className="flex flex-col gap-0.5 mb-3">
                <span className="text-xs text-on-surface-variant">17:00 - 18:30</span>
                <span className="text-[11px] text-on-surface-variant flex items-center gap-1"><Video className="w-3 h-3" /> Video Görüşme</span>
              </div>
              
              {/* Tags */}
              <div className="flex gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full">Kişisel Gelişim</span>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4">
                {/* Avatars (Katılımcılar) */}
                <div 
                  className="flex -space-x-2 cursor-pointer hover:scale-105 transition-transform" 
                  onClick={() => setShowParticipantsModal(true)}
                >
                  <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=7" alt="Avatar" />
                  <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=8" alt="Avatar" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-400 text-white text-[10px] font-bold flex items-center justify-center">
                    +12
                  </div>
                </div>

                {/* Actions Menu */}
                <div className="relative">
                  <button 
                    className={`w-8 h-8 rounded-full border border-outline-variant/50 flex items-center justify-center transition-colors ${activeMenu === 'current2' ? 'bg-surface-container text-primary' : 'text-on-surface hover:bg-surface-container'}`}
                    onClick={() => setActiveMenu(activeMenu === 'current2' ? null : 'current2')}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {/* Actions Popup Menu */}
                  {activeMenu === 'current2' && (
                    <div className="absolute bottom-full mb-2 right-0 w-40 bg-white rounded-xl shadow-xl border border-outline-variant/30 overflow-hidden z-50 animate-fadeIn origin-bottom-right">
                      <button 
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-on-surface hover:bg-surface-container-lowest transition-colors"
                        onClick={() => setActiveMenu(null)}
                      >
                        <Edit className="w-4 h-4 text-teal-600" /> Düzenle
                      </button>
                      <button 
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                        onClick={() => setActiveMenu(null)}
                      >
                        <Trash2 className="w-4 h-4" /> Sil
                      </button>
                      <div className="h-px bg-outline-variant/10 w-full" />
                      <button 
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-on-surface hover:bg-surface-container-lowest transition-colors"
                        onClick={() => setActiveMenu(null)}
                      >
                        <Bell className="w-4 h-4 text-blue-500" /> Hatırlatma
                      </button>
                      <button 
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-on-surface hover:bg-surface-container-lowest transition-colors"
                        onClick={() => setActiveMenu(null)}
                      >
                        <LinkIcon className="w-4 h-4 text-on-surface-variant" /> Link
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Friday */}
        <div className="flex-1 flex flex-col">
          <div className="text-center py-4 border-b border-transparent">
            <h4 className="font-bold text-sm text-on-surface">Cuma</h4>
            <p className="text-xs text-on-surface-variant">05/06/2026</p>
          </div>
          <div className="flex-1 p-2 bg-surface-container-lowest flex flex-col gap-3">
            {/* Future Training 1 */}
            <div className={`bg-[#0EA5E9] rounded-[16px] shadow-sm hover:shadow-md transition-shadow p-4 relative text-white ${activeMenu === 'future1' ? 'z-20' : 'z-10'}`}>
              <h3 className="text-sm font-bold mb-1 pr-6">Liderlik Eğitimi</h3>
              <div className="flex flex-col gap-0.5 mb-3">
                <span className="text-xs text-white/80">14:00 - 16:00</span>
                <span className="text-[11px] text-white/70 flex items-center gap-1"><Video className="w-3 h-3" /> Google Meet</span>
              </div>
              
              <div className="flex gap-2 mb-6">
                <span className="px-3 py-1 bg-white/20 text-[10px] font-bold rounded-full">Yönetim</span>
              </div>

              <div className="flex justify-between items-end mt-4">
                <div 
                  className="flex -space-x-2 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setShowParticipantsModal(true)}
                >
                  <img className="w-8 h-8 rounded-full border-2 border-[#0EA5E9] object-cover" src="https://i.pravatar.cc/100?img=9" alt="Avatar" />
                  <img className="w-8 h-8 rounded-full border-2 border-[#0EA5E9] object-cover" src="https://i.pravatar.cc/100?img=10" alt="Avatar" />
                  <div className="w-8 h-8 rounded-full border-2 border-[#0EA5E9] bg-white/20 text-white text-[10px] font-bold flex items-center justify-center">
                    +15
                  </div>
                </div>
                
                {/* Actions Menu */}
                <div className="relative">
                  <button 
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeMenu === 'future1' ? 'bg-white text-[#0EA5E9]' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    onClick={() => setActiveMenu(activeMenu === 'future1' ? null : 'future1')}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {/* Actions Popup Menu */}
                  {activeMenu === 'future1' && (
                    <div className="absolute bottom-full mb-2 right-0 w-40 bg-white rounded-xl shadow-xl border border-outline-variant/30 overflow-hidden z-50 animate-fadeIn origin-bottom-right text-on-surface">
                      <button 
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-on-surface hover:bg-surface-container-lowest transition-colors"
                        onClick={() => setActiveMenu(null)}
                      >
                        <Edit className="w-4 h-4 text-teal-600" /> Düzenle
                      </button>
                      <button 
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                        onClick={() => setActiveMenu(null)}
                      >
                        <Trash2 className="w-4 h-4" /> Sil
                      </button>
                      <div className="h-px bg-outline-variant/10 w-full" />
                      <button 
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-on-surface hover:bg-surface-container-lowest transition-colors"
                        onClick={() => setActiveMenu(null)}
                      >
                        <Bell className="w-4 h-4 text-blue-500" /> Hatırlatma
                      </button>
                      <button 
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-on-surface hover:bg-surface-container-lowest transition-colors"
                        onClick={() => setActiveMenu(null)}
                      >
                        <LinkIcon className="w-4 h-4 text-on-surface-variant" /> Link
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Future Training 2 */}
            <div className={`bg-[#0EA5E9] rounded-[16px] shadow-sm hover:shadow-md transition-shadow p-4 relative text-white ${activeMenu === 'future2' ? 'z-20' : 'z-10'}`}>
              <h3 className="text-sm font-bold mb-1 pr-6">Stres Yönetimi</h3>
              <div className="flex flex-col gap-0.5 mb-3">
                <span className="text-xs text-white/80">16:30 - 18:00</span>
                <span className="text-[11px] text-white/70 flex items-center gap-1"><Video className="w-3 h-3" /> Zoom</span>
              </div>
              
              <div className="flex gap-2 mb-6">
                <span className="px-3 py-1 bg-white/20 text-[10px] font-bold rounded-full">Sağlık</span>
              </div>

              <div className="flex justify-between items-end mt-4">
                <div 
                  className="flex -space-x-2 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setShowParticipantsModal(true)}
                >
                  <img className="w-8 h-8 rounded-full border-2 border-[#0EA5E9] object-cover" src="https://i.pravatar.cc/100?img=11" alt="Avatar" />
                  <img className="w-8 h-8 rounded-full border-2 border-[#0EA5E9] object-cover" src="https://i.pravatar.cc/100?img=12" alt="Avatar" />
                  <div className="w-8 h-8 rounded-full border-2 border-[#0EA5E9] bg-white/20 text-white text-[10px] font-bold flex items-center justify-center">
                    +8
                  </div>
                </div>
                
                {/* Actions Menu */}
                <div className="relative">
                  <button 
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeMenu === 'future2' ? 'bg-white text-[#0EA5E9]' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    onClick={() => setActiveMenu(activeMenu === 'future2' ? null : 'future2')}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {/* Actions Popup Menu */}
                  {activeMenu === 'future2' && (
                    <div className="absolute bottom-full mb-2 right-0 w-40 bg-white rounded-xl shadow-xl border border-outline-variant/30 overflow-hidden z-50 animate-fadeIn origin-bottom-right text-on-surface">
                      <button 
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-on-surface hover:bg-surface-container-lowest transition-colors"
                        onClick={() => setActiveMenu(null)}
                      >
                        <Edit className="w-4 h-4 text-teal-600" /> Düzenle
                      </button>
                      <button 
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                        onClick={() => setActiveMenu(null)}
                      >
                        <Trash2 className="w-4 h-4" /> Sil
                      </button>
                      <div className="h-px bg-outline-variant/10 w-full" />
                      <button 
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-on-surface hover:bg-surface-container-lowest transition-colors"
                        onClick={() => setActiveMenu(null)}
                      >
                        <Bell className="w-4 h-4 text-blue-500" /> Hatırlatma
                      </button>
                      <button 
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-on-surface hover:bg-surface-container-lowest transition-colors"
                        onClick={() => setActiveMenu(null)}
                      >
                        <LinkIcon className="w-4 h-4 text-on-surface-variant" /> Link
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Saturday */}
        <div className="flex-1 flex flex-col">
          <div className="text-center py-4 border-b border-transparent">
            <h4 className="font-bold text-sm text-on-surface">Cumartesi</h4>
            <p className="text-xs text-on-surface-variant">06/06/2026</p>
          </div>
          <div className="flex-1 p-2 bg-surface-container-lowest"></div>
        </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-4 px-2">
          {/* List items representing the mock data */}
          <div className="bg-white rounded-[16px] shadow-sm border border-outline-variant/30 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-on-surface">Şirket İçi İletişim</h3>
              <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-2">
                09:00 - 11:30 • Çarşamba, 03/06/2026
                <span className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-full"><Video className="w-3 h-3" /> Zoom</span>
              </p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto justify-between">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=3" alt="Avatar" />
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=4" alt="Avatar" />
              </div>
              <button className="text-primary text-xs font-bold px-4 py-2 border border-primary rounded-xl hover:bg-primary/5 transition-colors">Detaylar</button>
            </div>
          </div>
          
          <div className="bg-white rounded-[16px] shadow-sm border border-outline-variant/30 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-l-4 border-l-primary">
            <div>
              <h3 className="text-sm font-bold text-on-surface">CRM EĞİTİMİ 1. GÜN</h3>
              <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-2">
                10:05 - 16:45 • Perşembe, 04/06/2026
                <span className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-full"><Video className="w-3 h-3" /> Video Görüşme</span>
              </p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto justify-between">
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-full">CRM</span>
              </div>
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=1" alt="Avatar" />
                <div className="w-8 h-8 rounded-full border-2 border-white bg-rose-400 text-white text-[10px] font-bold flex items-center justify-center">+9</div>
              </div>
              <button className="text-white bg-primary text-xs font-bold px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors">Katıl</button>
            </div>
          </div>

          <div className="bg-white rounded-[16px] shadow-sm border border-outline-variant/30 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-l-4 border-l-[#0EA5E9]">
            <div>
              <h3 className="text-sm font-bold text-on-surface">Liderlik Eğitimi</h3>
              <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-2">
                14:00 - 16:00 • Cuma, 05/06/2026
                <span className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-full"><Video className="w-3 h-3" /> Google Meet</span>
              </p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto justify-between">
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full">Yönetim</span>
              </div>
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=9" alt="Avatar" />
                <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-400 text-white text-[10px] font-bold flex items-center justify-center">+15</div>
              </div>
              <button className="text-primary text-xs font-bold px-4 py-2 border border-primary rounded-xl hover:bg-primary/5 transition-colors">Detaylar</button>
            </div>
          </div>
        </div>
      )}

      {/* Participants Modal */}
      {showParticipantsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fadeIn p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest">
              <h2 className="text-lg font-bold text-on-surface">Katılımcılar</h2>
              <button 
                onClick={() => setShowParticipantsModal(false)} 
                className="p-2 hover:bg-surface-container rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-on-surface-variant" />
              </button>
            </div>
            <div className="p-4 max-h-64 overflow-y-auto space-y-4">
              <div className="flex items-center gap-3">
                <img className="w-10 h-10 rounded-full object-cover shadow-sm" src="https://i.pravatar.cc/100?img=1" alt="Avatar" />
                <div>
                  <p className="text-sm font-bold text-on-surface leading-tight">Ayşe Yılmaz</p>
                  <p className="text-xs text-on-surface-variant">İnsan Kaynakları</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img className="w-10 h-10 rounded-full object-cover shadow-sm" src="https://i.pravatar.cc/100?img=2" alt="Avatar" />
                <div>
                  <p className="text-sm font-bold text-on-surface leading-tight">Mehmet Demir</p>
                  <p className="text-xs text-on-surface-variant">Yazılım Geliştirme</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img className="w-10 h-10 rounded-full object-cover shadow-sm" src="https://i.pravatar.cc/100?img=3" alt="Avatar" />
                <div>
                  <p className="text-sm font-bold text-on-surface leading-tight">Caner Aksoy</p>
                  <p className="text-xs text-on-surface-variant">Satış & Pazarlama</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img className="w-10 h-10 rounded-full object-cover shadow-sm" src="https://i.pravatar.cc/100?img=4" alt="Avatar" />
                <div>
                  <p className="text-sm font-bold text-on-surface leading-tight">Zeynep Kaya</p>
                  <p className="text-xs text-on-surface-variant">Finans</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
