'use client';

import React, { useState } from 'react';
import { useAppStore, Course } from '@/store/store';
import { 
  Plus, Sparkles, BookOpen, Clock, Users, Edit, Search, Filter, ChevronDown, BarChart, FileText, MoreVertical
} from 'lucide-react';
import TrainingDetail from './TrainingDetail';
import CourseCreator from './CourseCreator';
import CourseEditor from './CourseEditor';
import NewAssignmentModal from '../Assignments/NewAssignmentModal';

export default function Trainings() {
  const { courses, createCourse, isCreatingCourse, setIsCreatingCourse } = useAppStore();
  const [activeSubTab, setActiveSubTab] = useState<'manual' | 'ai'>('manual');
  
  // Library-like states
  const [mainTab, setMainTab] = useState<'hazir' | 'olusturduklarim'>('hazir');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Hepsi');
  
  // Detail & Editor views state
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assignCourseId, setAssignCourseId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const categories = ['Hepsi', 'Compliance', 'Technical', 'Soft Skills', 'Onboarding', 'Sales'];

  const getCategoryStyle = (cat: string) => {
    if (selectedCategory === cat) {
      return 'bg-[#3b4ae4] text-white border-[#3b4ae4] shadow-sm';
    }
    return 'bg-white text-on-surface-variant border-outline-variant/30 hover:bg-surface-container-low';
  };

  if (isCreatingCourse) {
    return (
      <div className="h-[calc(100vh-140px)]">
        <CourseCreator 
          onCancel={() => setIsCreatingCourse(false)} 
          onComplete={() => setIsCreatingCourse(false)} 
        />
      </div>
    );
  }

  if (selectedCourseId) {
    return <TrainingDetail onBack={() => setSelectedCourseId(null)} />;
  }

  if (editingCourseId) {
    return <CourseEditor courseId={editingCourseId} onBack={() => setEditingCourseId(null)} />;
  }

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Hepsi' || c.category === selectedCategory;
    const matchesTab = mainTab === 'olusturduklarim' ? true : true;
    return matchesSearch && matchesCategory && matchesTab;
  });

  return (
    <div className="space-y-md animate-fadeIn text-on-surface pb-xl">
      
      {/* Page Title & Breadcrumb */}
      <div className="mb-sm">
        <h1 className="text-headline-md font-bold text-on-surface">Eğitim Yönetimi</h1>
        <div className="flex items-center text-label-sm text-on-surface-variant gap-xs mt-1">
          <span>Ana Sayfa</span>
          <span>/</span>
          <span className="text-primary font-semibold">Eğitim Yönetimi</span>
        </div>
      </div>

      {/* Top Controls Row */}
      <div className="flex flex-col md:flex-row gap-sm justify-between items-center bg-white p-sm rounded-lg shadow-soft-sm border border-outline-variant/30">
        <div className="w-full md:w-[400px] relative">
          <Search className="w-4 h-4 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Eğitim adı veya kategori ara..."
            className="w-full pl-10 pr-md py-[10px] bg-surface-container-low border border-transparent rounded-md text-body-sm focus:outline-none focus:border-outline-variant transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-sm w-full md:w-auto">
          <div className="relative hidden md:block w-48">
            <select 
              className="appearance-none bg-surface-container-low text-on-surface w-full px-md py-[10px] pr-8 rounded-md text-label-sm font-semibold cursor-pointer outline-none border border-outline-variant/30 hover:bg-surface-container transition-all"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="Hepsi">Kategori Seç</option>
              {categories.slice(1).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-on-surface-variant absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="flex items-center gap-1 ml-2">
            <button 
              onClick={() => setIsCreatingCourse(true)}
              className="flex-1 md:flex-none px-md py-[10px] bg-primary text-white text-label-sm font-bold rounded-md hover:bg-blue-800 shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-xs"
            >
              <Plus className="w-4 h-4" />
              Eğitim Oluştur
            </button>
          </div>
        </div>
      </div>

      {/* Tabs & Categories */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mt-6">
        
        {/* Main Tabs */}
        <div className="flex bg-surface-container-low p-1 rounded-lg border border-outline-variant/30 shadow-soft-sm">
          <button 
            onClick={() => setMainTab('hazir')}
            className={`px-6 py-2 text-sm font-bold rounded-md transition-all ${
              mainTab === 'hazir' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Hazır Eğitimler
          </button>
          <button 
            onClick={() => setMainTab('olusturduklarim')}
            className={`px-6 py-2 text-sm font-bold rounded-md transition-all ${
              mainTab === 'olusturduklarim' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Oluşturduklarım
          </button>
        </div>

      </div>

      {/* Grid of Courses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {filteredCourses.map((course) => {
          const instructor = 'Ayşe Yılmaz';
          const defaultImage = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80';
          
          return (
            <div key={course.id} className="bg-white rounded-[1rem] shadow-sm border border-outline-variant/30 overflow-hidden flex flex-col group cursor-pointer hover:shadow-md transition-all">
              <div className="relative h-48 w-full bg-surface-container-low overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${course.coverBg || 'from-slate-200 to-slate-300'} opacity-20`}></div>
                <img 
                  src={defaultImage} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                <span className="absolute top-3 left-3 bg-white/95 text-on-surface text-xs font-bold px-3 py-1 rounded-md shadow-sm">
                  {course.category}
                </span>

                {/* 3 Dots Menu overlay */}
                <div className="absolute top-3 right-3">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === course.id ? null : course.id); }}
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary shadow-sm hover:bg-surface-container transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  
                  {openMenuId === course.id && (
                    <div className="absolute top-full right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-outline-variant/30 py-1 z-20">
                      <button 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          setOpenMenuId(null);
                          setEditingCourseId(course.id);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-on-surface hover:bg-surface-container-low flex items-center gap-2 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" /> Düzenle
                      </button>
                      <button 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          setOpenMenuId(null);
                          setAssignCourseId(course.id);
                          setIsAssignModalOpen(true);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-on-surface hover:bg-surface-container-low flex items-center gap-2 transition-colors"
                      >
                        <Users className="w-3.5 h-3.5" /> Atama Yap
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between" onClick={() => setSelectedCourseId(course.id)}>
                <div>
                  <h3 className="text-base font-bold text-on-surface leading-snug line-clamp-2 min-h-[44px] group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <div className="mt-3 space-y-1">
                    <p className="text-xs text-on-surface-variant font-medium">
                      Eğitmen: <span className="text-on-surface font-semibold">{instructor}</span>
                    </p>
                    <p className="text-xs text-on-surface-variant font-medium">
                      {course.modulesCount || 4} Ders
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1.5 text-sm text-on-surface-variant font-medium">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  {course.assignedCount > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-surface-container-low border border-outline-variant/30 flex items-center justify-center text-[10px] font-bold text-primary shrink-0 shadow-sm">
                        👤
                      </div>
                      <span className="text-xs font-semibold text-on-surface-variant">
                        {course.assignedCount} kişiye atandı
                      </span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="bg-white p-12 rounded-xl border border-outline-variant/30 text-center flex flex-col items-center mt-6">
          <BookOpen className="w-12 h-12 text-on-surface-variant mb-4 opacity-50" />
          <h3 className="text-lg font-bold text-on-surface">Eğitim Bulunamadı</h3>
          <p className="text-on-surface-variant mt-2">Bu kategoride veya aramaya uygun bir eğitim eşleşmiyor.</p>
        </div>
      )}

      {/* Show More Button */}
      {filteredCourses.length > 0 && (
        <div className="flex justify-center pt-8">
          <button className="px-8 py-2.5 bg-primary/5 text-primary text-sm font-bold rounded-lg hover:bg-primary/10 flex items-center gap-2 transition-all">
            Daha Fazla Göster
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Assignment Modal */}
      {isAssignModalOpen && (
        <NewAssignmentModal 
          onClose={() => setIsAssignModalOpen(false)} 
          initialCourseId={assignCourseId} 
        />
      )}

    </div>
  );
}
