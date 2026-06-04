'use client';
import { useAppStore } from '@/store/store';

import React, { useState } from 'react';
import { X, Search, Check, Users, BookOpen } from 'lucide-react';

interface NewAssignmentModalProps {
  onClose: () => void;
  initialCourseId?: string | null;
}

export default function NewAssignmentModal({ onClose, initialCourseId }: NewAssignmentModalProps) {
  const [step, setStep] = useState<1 | 2>(initialCourseId ? 2 : 1);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(initialCourseId || null);
  
  const [assignTab, setAssignTab] = useState<'kisi' | 'birim'>('kisi');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  
  const [deadline, setDeadline] = useState('');

  const mockCourses = [
    { id: 'c1', title: 'Hoş Geldin! Oryantasyon Eğitimi', category: 'Onboarding' },
    { id: 'c2', title: 'İleri Seviye Satış Teknikleri', category: 'Sales' },
    { id: 'c3', title: 'KVKK ve Bilgi Güvenliği', category: 'Compliance' },
  ];

  const mockUsers = [
    { id: 'u1', name: 'Ayşe Yılmaz', department: 'İnsan Kaynakları' },
    { id: 'u2', name: 'Mehmet Demir', department: 'Yazılım Geliştirme' },
    { id: 'u3', name: 'Caner Aksoy', department: 'Satış & Pazarlama' },
    { id: 'u4', name: 'Zeynep Kaya', department: 'Finans' },
  ];

  const mockGroups = [
    { id: 'g1', name: 'Yeni Başlayanlar' },
    { id: 'g2', name: 'Yöneticiler' },
    { id: 'g3', name: 'Stajyerler' },
  ];

  const mockUnits = [
    { id: 'un1', name: 'İnsan Kaynakları' },
    { id: 'un2', name: 'Yazılım Geliştirme' },
    { id: 'un3', name: 'Satış & Pazarlama' },
  ];

  const toggleUser = (id: string) => {
    setSelectedUsers(prev => 
      prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
    );
  };

  const toggleGroup = (id: string) => {
    setSelectedGroups(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const toggleUnit = (id: string) => {
    setSelectedUnits(prev => 
      prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
    );
  };

  const totalSelected = selectedUsers.length + selectedGroups.length + selectedUnits.length;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fadeIn p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest">
          <h2 className="text-xl font-bold text-on-surface">
            {step === 1 ? 'Eğitim Seçin (Adım 1/2)' : (initialCourseId ? 'Atanacak Hedefleri Seçin' : 'Atanacak Hedefleri Seçin (Adım 2/2)')}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-full transition-colors">
            <X className="w-5 h-5 text-on-surface-variant" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 1 && (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                <input 
                  type="text" 
                  placeholder="Eğitim ara..." 
                  className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-sm font-medium focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-3 mt-4">
                {mockCourses.map(course => (
                  <div 
                    key={course.id}
                    onClick={() => setSelectedCourse(course.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      selectedCourse === course.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-outline-variant/30 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedCourse === course.id ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'}`}>
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-on-surface">{course.title}</h4>
                        <p className="text-xs text-on-surface-variant mt-0.5">{course.category}</p>
                      </div>
                    </div>
                    {selectedCourse === course.id && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-bold text-on-surface block mb-2">Bitiş Tarihi (Opsiyonel)</label>
                <input 
                  type="date" 
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-sm font-medium focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <div className="flex justify-between items-end mb-3">
                  <label className="text-sm font-bold text-on-surface block">Atanacak Hedefler</label>
                </div>
                
                {/* Tabs */}
                <div className="flex gap-2 border-b border-outline-variant/30 mb-4">
                  <button 
                    onClick={() => setAssignTab('birim')}
                    className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${assignTab === 'birim' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}
                  >
                    Birime Ata
                  </button>
                  <button 
                    onClick={() => setAssignTab('kisi')}
                    className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${assignTab === 'kisi' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}
                  >
                    Kişiye Ata
                  </button>
                </div>

                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                  <input 
                    type="text" 
                    placeholder="Ara..." 
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-sm font-medium focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {/* Tab Content */}
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                  {assignTab === 'kisi' && mockUsers.map(user => (
                    <div 
                      key={user.id}
                      onClick={() => toggleUser(user.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                        selectedUsers.includes(user.id) 
                          ? 'border-primary bg-primary/5' 
                          : 'border-outline-variant/30 hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`} alt={user.name} className="w-8 h-8 rounded-full" />
                        <div>
                          <p className="text-sm font-bold text-on-surface leading-tight">{user.name}</p>
                          <p className="text-xs text-on-surface-variant">{user.department}</p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedUsers.includes(user.id) ? 'bg-primary border-primary text-white' : 'border-outline-variant/50'}`}>
                        {selectedUsers.includes(user.id) && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  ))}

                  {assignTab === 'birim' && mockUnits.map(unit => (
                    <div 
                      key={unit.id}
                      onClick={() => toggleUnit(unit.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                        selectedUnits.includes(unit.id) 
                          ? 'border-primary bg-primary/5' 
                          : 'border-outline-variant/30 hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-on-surface leading-tight">{unit.name}</p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedUnits.includes(unit.id) ? 'bg-primary border-primary text-white' : 'border-outline-variant/50'}`}>
                        {selectedUnits.includes(unit.id) && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Selected Items List */}
                {totalSelected > 0 && (
                  <div className="mt-4 p-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl">
                    <p className="text-xs font-bold text-on-surface-variant mb-2">Seçilenler:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedGroups.map(id => {
                        const group = mockGroups.find(g => g.id === id);
                        return group ? (
                          <span key={id} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-700 text-xs font-bold border border-emerald-500/20">
                            {group.name} 
                            <button onClick={() => toggleGroup(id)} className="ml-1 text-emerald-700/60 hover:text-rose-500 transition-colors">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </span>
                        ) : null;
                      })}
                      {selectedUnits.map(id => {
                        const unit = mockUnits.find(u => u.id === id);
                        return unit ? (
                          <span key={id} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-700 text-xs font-bold border border-purple-500/20">
                            {unit.name} 
                            <button onClick={() => toggleUnit(id)} className="ml-1 text-purple-700/60 hover:text-rose-500 transition-colors">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </span>
                        ) : null;
                      })}
                      {selectedUsers.map(id => {
                        const user = mockUsers.find(u => u.id === id);
                        return user ? (
                          <span key={id} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                            {user.name} 
                            <button onClick={() => toggleUser(id)} className="ml-1 text-primary/60 hover:text-rose-500 transition-colors">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-outline-variant/30 bg-surface-container-lowest flex justify-between">
          {step === 2 && !initialCourseId ? (
            <button 
              onClick={() => setStep(1)}
              className="px-6 py-2.5 text-sm font-bold text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Geri
            </button>
          ) : (
            <div></div> // Spacer
          )}
          
          {step === 1 ? (
            <button 
              disabled={!selectedCourse}
              onClick={() => setStep(2)}
              className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl disabled:opacity-50 hover:bg-primary/90 transition-all ml-auto"
            >
              İleri
            </button>
          ) : (
            <button 
              disabled={totalSelected === 0}
              onClick={() => {
                useAppStore.getState().showDialog({ type: 'success', message: `Atama işlemi başarıyla tamamlandı!` });
                onClose();
              }}
              className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl disabled:opacity-50 hover:bg-primary/90 transition-all flex items-center gap-2 ml-auto"
            >
              <Users className="w-4 h-4" />
              Atamayı Tamamla ({totalSelected} Hedef)
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
