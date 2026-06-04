'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, Plus, Save, X, BookOpen
} from 'lucide-react';

interface CourseCreatorProps {
  onCancel: () => void;
  onComplete: () => void;
}

export default function CourseCreator({ onCancel, onComplete }: CourseCreatorProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // Category State
  const [categories, setCategories] = useState(['Compliance', 'Technical', 'Soft Skills', 'Onboarding', 'Sales']);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  // Instructor State
  const [instructors, setInstructors] = useState(['Ahmet Yılmaz', 'Can Soydan', 'Selin Özer']);
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [isInstructorModalOpen, setIsInstructorModalOpen] = useState(false);
  const [newInstructor, setNewInstructor] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory.trim()]);
      setSelectedCategory(newCategory.trim());
    }
    setIsCategoryModalOpen(false);
    setNewCategory('');
  };

  const handleAddInstructor = () => {
    if (newInstructor.trim()) {
      setInstructors([...instructors, newInstructor.trim()]);
      setSelectedInstructor(newInstructor.trim());
    }
    setIsInstructorModalOpen(false);
    setNewInstructor('');
  };

  const handleSave = () => {
    // Save logic can be added here
    onComplete();
  };

  return (
    <div className="flex flex-col h-full bg-surface-container-lowest text-on-surface">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onCancel}
          className="p-2 hover:bg-surface-container rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-on-surface-variant" />
        </button>
        <h1 className="text-[22px] font-bold text-on-surface flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          Yeni Eğitim Oluştur
        </h1>
      </div>

      <div className="flex-1 max-w-3xl">
        <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 p-8 space-y-6">
          
          {/* Eğitim Adı */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-on-surface">Eğitim Adı</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: İleri Düzey İletişim Teknikleri"
              className="w-full h-[46px] px-4 bg-surface-container-low border border-outline-variant/50 rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Açıklama */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-on-surface">Açıklama</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Eğitimin içeriği, hedef kitlesi ve kazanımları hakkında bilgi verin..."
              className="w-full p-4 bg-surface-container-low border border-outline-variant/50 rounded-lg text-sm focus:outline-none focus:border-primary transition-colors min-h-[120px] resize-y"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Kategori Seç */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-on-surface">Kategori</label>
              <div className="flex gap-2">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="flex-1 h-[46px] px-4 pr-10 bg-surface-container-low border border-outline-variant/50 rounded-lg text-sm focus:outline-none focus:border-primary transition-colors appearance-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                >
                  <option value="">Seçiniz...</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
                <button 
                  onClick={() => setIsCategoryModalOpen(true)}
                  className="w-[46px] h-[46px] shrink-0 bg-primary-fixed/20 text-primary border border-primary/20 rounded-lg flex items-center justify-center hover:bg-primary-fixed/40 transition-colors"
                  title="Yeni Kategori Ekle"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Eğitmen Seç */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-on-surface">Eğitmen</label>
              <div className="flex gap-2">
                <select 
                  value={selectedInstructor}
                  onChange={(e) => setSelectedInstructor(e.target.value)}
                  className="flex-1 h-[46px] px-4 pr-10 bg-surface-container-low border border-outline-variant/50 rounded-lg text-sm focus:outline-none focus:border-primary transition-colors appearance-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                >
                  <option value="">Seçiniz...</option>
                  {instructors.map((inst, idx) => (
                    <option key={idx} value={inst}>{inst}</option>
                  ))}
                </select>
                <button 
                  onClick={() => setIsInstructorModalOpen(true)}
                  className="w-[46px] h-[46px] shrink-0 bg-primary-fixed/20 text-primary border border-primary/20 rounded-lg flex items-center justify-center hover:bg-primary-fixed/40 transition-colors"
                  title="Yeni Eğitmen Ekle"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="mt-8 pt-6 border-t border-outline-variant/30 flex justify-end gap-4 bg-surface-container-lowest max-w-3xl">
        <button 
          onClick={onCancel}
          className="px-6 py-2.5 text-on-surface-variant text-sm font-bold rounded-lg border border-outline-variant hover:bg-surface-container transition-colors"
        >
          İptal
        </button>
        <button 
          onClick={handleSave}
          className="px-8 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 shadow-md transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Kaydet
        </button>
      </div>

      {/* Modals */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm overflow-hidden animate-fadeIn">
            <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest">
              <h3 className="font-bold text-on-surface">Yeni Kategori Ekle</h3>
              <button onClick={() => setIsCategoryModalOpen(false)} className="text-on-surface-variant hover:bg-surface-container p-1 rounded-md">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-on-surface mb-2 block">Kategori Adı</label>
                <input 
                  type="text" 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Örn: Liderlik"
                  className="w-full h-[46px] px-3 bg-surface-container border border-outline-variant rounded-lg text-sm focus:outline-none focus:border-primary"
                  autoFocus
                />
              </div>
              <button 
                onClick={handleAddCategory}
                className="w-full h-[46px] bg-primary text-white font-bold rounded-lg hover:bg-primary-container"
              >
                Ekle
              </button>
            </div>
          </div>
        </div>
      )}

      {isInstructorModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm overflow-hidden animate-fadeIn">
            <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest">
              <h3 className="font-bold text-on-surface">Yeni Eğitmen Ekle</h3>
              <button onClick={() => setIsInstructorModalOpen(false)} className="text-on-surface-variant hover:bg-surface-container p-1 rounded-md">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-on-surface mb-2 block">Eğitmen Adı Soyadı</label>
                <input 
                  type="text" 
                  value={newInstructor}
                  onChange={(e) => setNewInstructor(e.target.value)}
                  placeholder="Örn: Ayşe Yılmaz"
                  className="w-full h-[46px] px-3 bg-surface-container border border-outline-variant rounded-lg text-sm focus:outline-none focus:border-primary"
                  autoFocus
                />
              </div>
              <button 
                onClick={handleAddInstructor}
                className="w-full h-[46px] bg-primary text-white font-bold rounded-lg hover:bg-primary-container"
              >
                Ekle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

