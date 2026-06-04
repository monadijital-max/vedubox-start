'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/store';
import { Search, ChevronDown, Clock, BarChart, Users, Filter } from 'lucide-react';

export default function Library() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Hepsi');

  const categories = ['Hepsi', 'Compliance', 'Technical', 'Soft Skills', 'Onboarding'];

  const coursesData = [
    {
      id: '1',
      title: 'İş Sağlığı ve Güvenliği Temelleri',
      category: 'Compliance',
      duration: '2.5 Saat',
      lessons: '8 Ders',
      instructor: 'Ahmet Yılmaz',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '2',
      title: 'Etkili İletişim ve Geri Bildirim Kültürü',
      category: 'Soft Skills',
      duration: '4 Saat',
      lessons: '12 Ders',
      instructor: 'Zeynep Kaya',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '3',
      title: "Veri Analizi: Excel'den SQL'e Geçiş",
      category: 'Technical',
      duration: '10 Saat',
      lessons: '24 Ders',
      instructor: 'Caner Öz',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '4',
      title: 'Şirket Kültürü ve Değerlerimize Hoş Geldiniz',
      category: 'Onboarding',
      duration: '1.5 Saat',
      lessons: '5 Ders',
      instructor: 'Selin Işık',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80',
    }
  ];

  const getCategoryStyle = (cat: string) => {
    if (selectedCategory === cat) {
      return 'bg-primary text-white border-primary shadow-sm';
    }
    return 'bg-white text-on-surface-variant border-outline-variant/30 hover:bg-surface-container-low';
  };

  return (
    <div className="space-y-md animate-fadeIn text-on-surface pb-xl">
      
      {/* Page Title & Breadcrumb */}
      <div className="mb-sm">
        <h1 className="text-headline-md font-bold text-on-surface">Eğitim Kütüphanesi</h1>
        <div className="flex items-center text-label-sm text-on-surface-variant gap-xs mt-1">
          <span>Ana Sayfa</span>
          <span>/</span>
          <span className="text-primary font-semibold">Kütüphane</span>
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
            placeholder="Katalogda eğitim adı veya kategori ara..."
            className="w-full pl-10 pr-md py-[10px] bg-surface-container-low border border-transparent rounded-md text-body-sm focus:outline-none focus:border-outline-variant transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-sm w-full md:w-auto">
          <button className="flex-1 md:flex-none px-md py-[10px] bg-white border border-outline-variant hover:bg-surface-container rounded-md text-label-sm font-semibold transition-all flex items-center justify-center gap-xs shadow-soft-sm">
            <Filter className="w-4 h-4" />
            Filtrele
          </button>

          <div className="relative">
            <select 
              className="appearance-none bg-primary text-white px-md py-[10px] pr-8 rounded-md text-label-sm font-bold cursor-pointer outline-none shadow-md hover:bg-blue-800 transition-all"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="Hepsi">Kategori Seç (Hepsi)</option>
              {categories.slice(1).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-white absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 hide-scrollbar">
        {categories.map((cat) => (
          <button 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-sm font-semibold rounded-full border whitespace-nowrap transition-all ${getCategoryStyle(cat)}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Hero Banner */}
      <div className="w-full bg-[#9da3aa] rounded-[1rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between shadow-sm">
        <div className="flex flex-col items-start gap-4 z-10 max-w-xl">
          <span className="bg-[#8a4cfc] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
            Popüler
          </span>
          <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">
            Yöneticiler için İleri Liderlik ve Ekip Yönetimi
          </h2>
          <div className="flex items-center gap-6 mt-2 text-white text-sm font-medium">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              12 Saat
            </div>
            <div className="flex items-center gap-2">
              <BarChart className="w-4 h-4" />
              Orta Seviye
            </div>
          </div>
        </div>
        <div className="hidden md:flex bg-black/10 rounded-xl w-64 h-40 items-center justify-center text-white/50 font-medium border border-white/20">
          img
        </div>
      </div>

      {/* Grid of Courses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {coursesData.map((course) => {
          if (selectedCategory !== 'Hepsi' && selectedCategory !== 'Kategori Seç (Hepsi)' && course.category !== selectedCategory) return null;
          if (searchTerm && !course.title.toLowerCase().includes(searchTerm.toLowerCase())) return null;

          return (
            <div key={course.id} className="bg-white rounded-[1rem] shadow-sm border border-outline-variant/30 overflow-hidden flex flex-col group cursor-pointer hover:shadow-md transition-all">
              <div className="relative h-48 w-full bg-surface-container-low overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/95 text-on-surface text-xs font-bold px-3 py-1 rounded-md shadow-sm">
                  {course.category}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-on-surface leading-snug line-clamp-2 min-h-[44px]">
                    {course.title}
                  </h3>
                  <div className="mt-3 space-y-1">
                    <p className="text-xs text-on-surface-variant font-medium">
                      Eğitmen: <span className="text-on-surface font-semibold">{course.instructor}</span>
                    </p>
                    <p className="text-xs text-on-surface-variant font-medium">
                      {course.lessons}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-4 text-sm text-on-surface-variant font-medium">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More Button */}
      <div className="flex justify-center pt-8">
        <button className="px-8 py-2.5 bg-primary/5 text-primary text-sm font-bold rounded-lg hover:bg-primary/10 flex items-center gap-2 transition-all">
          Daha Fazla Göster
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
