'use client';

import React, { useState } from 'react';
import { User, Settings as SettingsIcon, Bell, Shield, Palette, Camera, Database, Plus, Trash2, Briefcase } from 'lucide-react';

import { useAppStore } from '@/store/store';

export default function Settings() {
  const { theme, setTheme, showDialog, departments, addDepartment, deleteDepartment } = useAppStore();
  const [activeTab, setActiveTab] = useState<'profil' | 'guvenlik' | 'departmanlar'>('profil');

  const [roles, setRoles] = useState(['Öğrenci / Çalışan', 'Eğitmen', 'Sistem Yöneticisi']);
  const [newRole, setNewRole] = useState('');
  
  const [newDepartment, setNewDepartment] = useState('');

  const [categories, setCategories] = useState(['Compliance', 'Technical', 'Soft Skills', 'Onboarding', 'Regülasyon']);
  const [newCategory, setNewCategory] = useState('');

  return (
    <div className="space-y-6 animate-fadeIn pb-8 text-on-surface">
      {/* Header */}
      <div>
        <h2 className="text-[28px] font-bold text-on-surface leading-tight">Ayarlar</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          <button 
            onClick={() => setActiveTab('profil')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
              activeTab === 'profil' ? 'bg-[#e5eeff] text-primary' : 'text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <User className={`w-5 h-5 ${activeTab === 'profil' ? 'text-primary' : 'text-on-surface-variant'}`} />
            Profil
          </button>

          <button 
            onClick={() => setActiveTab('guvenlik')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
              activeTab === 'guvenlik' ? 'bg-[#e5eeff] text-primary' : 'text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <Shield className={`w-5 h-5 ${activeTab === 'guvenlik' ? 'text-primary' : 'text-on-surface-variant'}`} />
            Güvenlik
          </button>

          <button 
            onClick={() => setActiveTab('departmanlar')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
              activeTab === 'departmanlar' ? 'bg-[#e5eeff] text-primary' : 'text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <Briefcase className={`w-5 h-5 ${activeTab === 'departmanlar' ? 'text-primary' : 'text-on-surface-variant'}`} />
            Birimler
          </button>

        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col min-h-[600px]">
          
          {activeTab === 'profil' && (
            <div className="flex-1 flex flex-col">
              <div className="p-8 flex-1">
                <div>
                  <h3 className="text-lg font-bold text-on-surface">Profil Bilgileri</h3>
                  <p className="text-sm text-on-surface-variant mt-1 font-medium">Görünen isminiz ve kişisel bilgilerinizi buradan yönetebilirsiniz.</p>
                </div>

                {/* Avatar Section */}
                <div className="mt-8 bg-surface-container-lowest border border-outline-variant/30 border-dashed rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full p-1 bg-white border border-outline-variant/30 shadow-sm">
                      <img src="https://i.pravatar.cc/150?u=a042581f4e29026704a" alt="Profil" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white shadow-sm hover:scale-105 transition-transform border-2 border-white">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-sm font-bold text-on-surface">Profil Fotoğrafı</h4>
                    <p className="text-xs text-on-surface-variant font-medium mt-1 mb-4">En az 400x400px boyutunda JPG veya PNG yükleyin.</p>
                    <div className="flex justify-center md:justify-start gap-3">
                      <button className="px-4 py-2 bg-[#545ceb] text-white text-sm font-bold rounded-lg shadow-sm hover:bg-[#545ceb]/90 transition-colors">
                        Yeni Yükle
                      </button>
                      <button className="px-4 py-2 bg-white border border-outline-variant/40 text-on-surface text-sm font-semibold rounded-lg hover:bg-surface-container-low transition-colors">
                        Kaldır
                      </button>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface">Tam Ad Soyad</label>
                    <input 
                      type="text" 
                      defaultValue="Ayşe Yılmaz" 
                      className="w-full px-4 py-3 bg-[#f5f8ff] border border-transparent rounded-xl text-sm font-medium focus:outline-none focus:border-primary/30 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface">E-posta Adresi</label>
                    <input 
                      type="email" 
                      defaultValue="ayse.yilmaz@vedubox.com" 
                      className="w-full px-4 py-3 bg-[#f5f8ff] border border-transparent rounded-xl text-sm font-medium focus:outline-none focus:border-primary/30 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-on-surface">Unvan</label>
                    <input 
                      type="text" 
                      defaultValue="HR Manager" 
                      className="w-full px-4 py-3 bg-[#f5f8ff] border border-transparent rounded-xl text-sm font-medium focus:outline-none focus:border-primary/30 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-on-surface">Hakkında (Biyografi)</label>
                    <textarea 
                      rows={4}
                      defaultValue="İnsan kaynakları yönetimi ve dijital öğrenme süreçleri üzerine 10 yılı aşkın deneyime sahibim." 
                      className="w-full px-4 py-3 bg-[#f5f8ff] border border-transparent rounded-xl text-sm font-medium focus:outline-none focus:border-primary/30 focus:bg-white transition-all resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              {/* Footer Actions */}
              <div className="p-6 bg-surface-container-lowest border-t border-outline-variant/30 flex justify-end gap-4 rounded-b-2xl">
                <button className="px-6 py-2.5 text-sm font-bold text-on-surface-variant hover:text-on-surface transition-colors">
                  İptal
                </button>
                <button className="px-8 py-2.5 bg-[#383fd8] text-white text-sm font-bold rounded-xl shadow-md hover:bg-[#383fd8]/90 transition-all">
                  Kaydet
                </button>
              </div>
            </div>
          )}

          {activeTab === 'guvenlik' && (
            <div className="flex-1 flex flex-col p-8 overflow-y-auto">
              <div>
                <h3 className="text-lg font-bold text-on-surface">Güvenlik</h3>
                <p className="text-sm text-on-surface-variant mt-1 font-medium">Şifrenizi ve hesap güvenlik ayarlarınızı güncelleyin.</p>
              </div>

              <div className="mt-8 max-w-lg space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface">Eski Şifre</label>
                    <input 
                      type="password" 
                      placeholder="Mevcut şifreniz"
                      className="w-full px-4 py-3 bg-[#f5f8ff] border border-transparent rounded-xl text-sm font-medium focus:outline-none focus:border-primary/30 focus:bg-white transition-all dark:bg-surface-container-low dark:text-on-surface"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface">Yeni Şifre</label>
                    <input 
                      type="password" 
                      placeholder="Yeni şifreniz"
                      className="w-full px-4 py-3 bg-[#f5f8ff] border border-transparent rounded-xl text-sm font-medium focus:outline-none focus:border-primary/30 focus:bg-white transition-all dark:bg-surface-container-low dark:text-on-surface"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface">Şifre Tekrar</label>
                    <input 
                      type="password" 
                      placeholder="Yeni şifrenizi tekrar girin"
                      className="w-full px-4 py-3 bg-[#f5f8ff] border border-transparent rounded-xl text-sm font-medium focus:outline-none focus:border-primary/30 focus:bg-white transition-all dark:bg-surface-container-low dark:text-on-surface"
                    />
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <button 
                    onClick={() => {
                      showDialog({ type: 'success', message: 'Şifreniz başarıyla güncellendi.' });
                    }}
                    className="px-8 py-2.5 bg-[#383fd8] text-white text-sm font-bold rounded-xl shadow-md hover:bg-[#383fd8]/90 transition-all"
                  >
                    Şifreyi Güncelle
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'departmanlar' && (
            <div className="flex-1 flex flex-col">
              <div className="p-8 flex-1">
                <div>
                  <h3 className="text-lg font-bold text-on-surface">Birim Yönetimi</h3>
                  <p className="text-sm text-on-surface-variant mt-1 font-medium">Şirketinizdeki birimleri buradan yönetebilirsiniz. Yeni birimler ekleyebilir, silebilirsiniz.</p>
                </div>

                <div className="mt-8">
                  <div className="flex items-center gap-4 mb-6">
                    <input 
                      type="text"
                      placeholder="Yeni birim adı..."
                      value={newDepartment}
                      onChange={(e) => setNewDepartment(e.target.value)}
                      className="flex-1 px-4 py-3 bg-[#f5f8ff] border border-transparent rounded-xl text-sm font-medium focus:outline-none focus:border-primary/30 focus:bg-white transition-all"
                    />
                    <button 
                      onClick={() => {
                        if (newDepartment.trim()) {
                          addDepartment(newDepartment.trim());
                          setNewDepartment('');
                          showDialog({ type: 'success', message: 'Birim eklendi.' });
                        }
                      }}
                      className="px-6 py-3 bg-primary text-white font-bold rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-soft-sm"
                    >
                      <Plus className="w-5 h-5" />
                      Ekle
                    </button>
                  </div>

                  <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden">
                    <ul className="divide-y divide-outline-variant/30">
                      {departments.map((dept) => (
                        <li key={dept} className="flex items-center justify-between px-6 py-4 hover:bg-[#f8faff] transition-colors">
                          <span className="font-bold text-on-surface text-sm">{dept}</span>
                          <button 
                            onClick={() => {
                              deleteDepartment(dept);
                              showDialog({ type: 'success', message: 'Birim silindi.' });
                            }}
                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
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
