'use client';
import { useAppStore } from '@/store/store';

import React, { useState } from 'react';
import { X, UserPlus, Check } from 'lucide-react';

interface NewEmployeeModalProps {
  onClose: () => void;
}

export default function NewEmployeeModal({ onClose }: NewEmployeeModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Öğrenci');
  const [title, setTitle] = useState('');
  
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);

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

  const toggleGroup = (id: string) => {
    setSelectedGroups(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);
  };

  const toggleUnit = (id: string) => {
    setSelectedUnits(prev => prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fadeIn p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest shrink-0">
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary" />
            Yeni Kullanıcı Ekle
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-full transition-colors">
            <X className="w-5 h-5 text-on-surface-variant" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-on-surface block mb-2">Ad Soyad</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn: Ayşe Yılmaz" 
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-sm font-medium focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-on-surface block mb-2">E-posta Adresi</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Örn: ayse@sirket.com" 
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-sm font-medium focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-on-surface block mb-2">Ünvan</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Örn: Kıdemli Yazılım Geliştirici" 
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-sm font-medium focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-on-surface block mb-2">Pozisyon / Rol</label>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-sm font-medium focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option value="Öğrenci">Öğrenci / Çalışan</option>
                <option value="Eğitmen">Eğitmen</option>
                <option value="Yönetici">Sistem Yöneticisi</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Units Selection */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-on-surface block">Birime Ekle</label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {mockUnits.map(unit => (
                  <div 
                    key={unit.id}
                    onClick={() => toggleUnit(unit.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                      selectedUnits.includes(unit.id) 
                        ? 'border-primary bg-primary/5' 
                        : 'border-outline-variant/30 hover:border-primary/30'
                    }`}
                  >
                    <span className="text-sm font-bold text-on-surface">{unit.name}</span>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedUnits.includes(unit.id) ? 'bg-primary border-primary text-white' : 'border-outline-variant/50'}`}>
                      {selectedUnits.includes(unit.id) && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Groups Selection */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-on-surface block">Gruba Ekle</label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {mockGroups.map(group => (
                  <div 
                    key={group.id}
                    onClick={() => toggleGroup(group.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                      selectedGroups.includes(group.id) 
                        ? 'border-primary bg-primary/5' 
                        : 'border-outline-variant/30 hover:border-primary/30'
                    }`}
                  >
                    <span className="text-sm font-bold text-on-surface">{group.name}</span>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedGroups.includes(group.id) ? 'bg-primary border-primary text-white' : 'border-outline-variant/50'}`}>
                      {selectedGroups.includes(group.id) && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-outline-variant/30 bg-surface-container-lowest flex justify-end gap-3 shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-xl transition-colors"
          >
            İptal
          </button>
          <button 
            disabled={!name.trim() || !email.trim()}
            onClick={() => {
              useAppStore.getState().showDialog({ type: 'success', message: `Kullanıcı başarıyla eklendi!` });
              onClose();
            }}
            className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl disabled:opacity-50 hover:bg-primary/90 transition-all"
          >
            Kullanıcıyı Ekle
          </button>
        </div>
      </div>
    </div>
  );
}
