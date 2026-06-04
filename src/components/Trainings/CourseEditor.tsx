'use client';
import { useAppStore } from '@/store/store';

import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, GripVertical, Trash2, Clock, Edit3, BookOpen } from 'lucide-react';
import { Course } from '@/store/store';

interface CourseEditorProps {
  courseId: string;
  onBack: () => void;
}

export default function CourseEditor({ courseId, onBack }: CourseEditorProps) {
  // Mock initial modules based on the course
  const [modules, setModules] = useState([
    { id: 'm1', title: 'Giriş ve Şirket Kültürü', duration: '15 dk' },
    { id: 'm2', title: 'İnsan Kaynakları Politikaları', duration: '20 dk' },
    { id: 'm3', title: 'Bilgi Güvenliği Temelleri', duration: '10 dk' },
  ]);

  const [courseTitle, setCourseTitle] = useState('Hoş Geldin! Oryantasyon Eğitimi');

  const addModuleBetween = (index: number) => {
    const newModules = [...modules];
    newModules.splice(index + 1, 0, { id: `m${Date.now()}`, title: 'Yeni Ders', duration: '10 dk' });
    setModules(newModules);
  };

  const updateModule = (index: number, field: 'title' | 'duration', value: string) => {
    const newModules = [...modules];
    newModules[index][field] = value;
    setModules(newModules);
  };

  const removeModule = (index: number) => {
    const newModules = [...modules];
    newModules.splice(index, 1);
    setModules(newModules);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-8 text-on-surface">
      {/* Header */}
      <div className="flex items-center text-sm font-medium text-on-surface-variant gap-2 mb-4">
        <button onClick={onBack} className="hover:text-primary transition-colors flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Eğitimler
        </button>
        <span>/</span>
        <span className="text-primary font-bold">İçeriği Düzenle</span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
        
        {/* Top Info Area */}
        <div className="p-8 border-b border-outline-variant/30 bg-surface-container-lowest">
          <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
            <div className="flex-1">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1 block">Eğitim Başlığı</label>
              <div className="flex items-center gap-3">
                <input 
                  type="text" 
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="w-full max-w-xl px-4 py-2 bg-white border border-outline-variant/40 rounded-lg text-2xl font-bold text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                />
                <Edit3 className="w-5 h-5 text-on-surface-variant opacity-50" />
              </div>
              <p className="text-sm font-medium text-on-surface-variant mt-3">
                Sürükle bırak ile sıralamayı değiştirebilir, ders isimlerini ve sürelerini doğrudan üzerine tıklayarak düzenleyebilirsiniz. İki dersin arasına yeni bir ders eklemek için "Araya Ders Ekle" butonlarını kullanın.
              </p>
            </div>
            
            <button 
              onClick={() => {
                useAppStore.getState().showDialog({ type: 'success', message: `Değişiklikler başarıyla kaydedildi!` });
                onBack();
              }}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-bold rounded-xl shadow-md hover:bg-primary/90 transition-all shrink-0 h-max"
            >
              <Save className="w-4 h-4" />
              Değişiklikleri Kaydet
            </button>
          </div>
        </div>

        {/* Modules Editor */}
        <div className="p-8 bg-[#f5f8ff] min-h-[500px]">
          
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Müfredat İçeriği
            </h3>

            {/* List */}
            <div className="space-y-2">
              
              {/* Insert Before First */}
              <div className="relative h-4 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center -my-3 z-10 group">
                <div className="absolute inset-x-0 h-px bg-primary/40 group-hover:bg-primary"></div>
                <button 
                  onClick={() => {
                    const newModules = [...modules];
                    newModules.unshift({ id: `m${Date.now()}`, title: 'Yeni Ders', duration: '10 dk' });
                    setModules(newModules);
                  }}
                  className="bg-[#e5eeff] text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20 z-10 hover:bg-primary hover:text-white transition-colors"
                >
                  + Buraya Ekle
                </button>
              </div>

              {modules.map((mod, index) => (
                <React.Fragment key={mod.id}>
                  {/* Module Item */}
                  <div className="bg-white border border-outline-variant/30 rounded-xl p-4 shadow-sm flex items-center gap-4 hover:border-primary/40 transition-colors group">
                    <button className="cursor-grab text-on-surface-variant hover:text-primary">
                      <GripVertical className="w-5 h-5" />
                    </button>
                    
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-bold text-sm text-on-surface-variant shrink-0">
                      {index + 1}
                    </div>

                    <div className="flex-1 flex flex-col sm:flex-row gap-4 sm:items-center">
                      <div className="flex-1 relative">
                        <input 
                          type="text" 
                          value={mod.title}
                          onChange={(e) => updateModule(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 bg-transparent border-b border-transparent hover:border-outline-variant/50 focus:border-primary focus:outline-none text-sm font-bold text-on-surface transition-colors"
                        />
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        <Clock className="w-4 h-4 text-on-surface-variant" />
                        <input 
                          type="text" 
                          value={mod.duration}
                          onChange={(e) => updateModule(index, 'duration', e.target.value)}
                          className="w-20 px-2 py-1.5 bg-surface-container-lowest border border-outline-variant/40 rounded-md focus:border-primary focus:outline-none text-xs font-bold text-center transition-colors"
                        />
                      </div>
                    </div>

                    <button 
                      onClick={() => removeModule(index)}
                      className="p-2 text-on-surface-variant hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors ml-2 opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Insert Between (or after) */}
                  <div className="relative h-6 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center -my-2 z-10 group">
                    <div className="absolute inset-x-0 h-px bg-primary/40 group-hover:bg-primary"></div>
                    <button 
                      onClick={() => addModuleBetween(index)}
                      className="bg-[#e5eeff] text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20 z-10 hover:bg-primary hover:text-white transition-colors"
                    >
                      + Araya Ekle
                    </button>
                  </div>
                </React.Fragment>
              ))}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
