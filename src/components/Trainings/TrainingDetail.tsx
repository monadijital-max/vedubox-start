'use client';

import React, { useState } from 'react';
import { 
  Star, UserPlus, Play, SkipForward, Subtitles, Settings, Maximize, 
  CheckCircle2, Lock, FileText, PlayCircle, Circle
} from 'lucide-react';
import NewAssignmentModal from '../Assignments/NewAssignmentModal';

interface TrainingDetailProps {
  onBack: () => void;
}

export default function TrainingDetail({ onBack }: TrainingDetailProps) {
  const [activeTab, setActiveTab] = useState<'aciklama' | 'kaynaklar' | 'tartisma'>('aciklama');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  return (
    <div className="space-y-lg animate-fadeIn text-on-surface pb-xl">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm font-medium text-on-surface-variant gap-2">
        <button onClick={onBack} className="hover:text-primary transition-colors">Eğitimler</button>
        <span>/</span>
        <span className="text-primary font-bold">Oryantasyon</span>
      </div>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex-1 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-bold w-max shadow-sm border border-orange-200">
            <Star className="w-3.5 h-3.5 fill-current" />
            Zorunlu Eğitim
          </div>
          
          <h1 className="text-3xl font-bold text-on-surface leading-tight">
            Hoş Geldin! Oryantasyon Eğitimi
          </h1>
          
          <p className="text-on-surface-variant text-sm font-medium leading-relaxed max-w-2xl">
            Bu eğitim, Vedubox Start ailesine yeni katılan ekip arkadaşlarımızın şirket kültürünü, araçlarını ve süreçlerini en hızlı şekilde öğrenmesi için tasarlanmıştır.
          </p>
        </div>

        <button 
          onClick={() => setIsAssignModalOpen(true)}
          className="shrink-0 flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-all shadow-md"
        >
          <UserPlus className="w-4 h-4" />
          Eğitimi Ata
        </button>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        
        {/* Left Column (Video & Details) */}
        <div className="flex-1 space-y-6">
          
          {/* Video Player */}
          <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
            {/* Video Placeholder (Blue Area) */}
            <div className="w-full aspect-video bg-[#383fd8] relative overflow-hidden flex items-center justify-center">
               <div className="absolute top-0 bottom-0 right-0 w-1/3 bg-black/20 rounded-l-[100%]"></div>
               {/* Just styling to match the abstract blue shape in the screenshot */}
            </div>
            
            {/* Video Controls */}
            <div className="px-4 py-3 flex items-center justify-between border-t border-outline-variant/30 bg-white">
              <div className="flex items-center gap-4 text-on-surface">
                <button className="hover:text-primary"><Play className="w-5 h-5 fill-current" /></button>
                <button className="hover:text-primary"><SkipForward className="w-5 h-5 fill-current" /></button>
                <span className="text-sm font-semibold tracking-wide ml-2">04:20 / 12:45</span>
              </div>
              <div className="flex items-center gap-4 text-on-surface-variant">
                <button className="hover:text-on-surface"><Subtitles className="w-5 h-5" /></button>
                <button className="hover:text-on-surface"><Settings className="w-5 h-5" /></button>
                <button className="hover:text-on-surface"><Maximize className="w-5 h-5" /></button>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 p-6 space-y-6">
            
            {/* Tabs */}
            <div className="flex items-center gap-8 border-b border-outline-variant/40">
              <button 
                onClick={() => setActiveTab('aciklama')}
                className={`pb-3 text-sm font-bold border-b-2 transition-all ${
                  activeTab === 'aciklama' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Açıklama
              </button>
              <button 
                onClick={() => setActiveTab('kaynaklar')}
                className={`pb-3 text-sm font-bold border-b-2 transition-all ${
                  activeTab === 'kaynaklar' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Kaynaklar (4)
              </button>
              <button 
                onClick={() => setActiveTab('tartisma')}
                className={`pb-3 text-sm font-bold border-b-2 transition-all ${
                  activeTab === 'tartisma' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Tartışma
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'aciklama' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-on-surface">Eğitim Hakkında</h3>
                  <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                    Bu modülde, Vedubox Start platformunun temel özelliklerini ve günlük iş akışınızı nasıl kolaylaştıracağını öğreneceksiniz. Şirket içi iletişim kanalları, raporlama sistemleri ve performans takip araçları hakkında detaylı bilgi sahibi olacaksınız.
                  </p>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/20">
                    <p className="text-xs text-on-surface-variant font-semibold">Süre</p>
                    <p className="text-base font-bold text-on-surface mt-1">120 Dakika</p>
                  </div>
                  <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/20">
                    <p className="text-xs text-on-surface-variant font-semibold">Modül Sayısı</p>
                    <p className="text-base font-bold text-on-surface mt-1">8 Ünite</p>
                  </div>
                  <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/20">
                    <p className="text-xs text-on-surface-variant font-semibold">Sertifika</p>
                    <p className="text-base font-bold text-on-surface mt-1">Dijital Onaylı</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'kaynaklar' && (
              <div className="text-sm font-medium text-on-surface-variant animate-fadeIn">
                Kaynaklar içeriği buraya gelecek.
              </div>
            )}

            {activeTab === 'tartisma' && (
              <div className="text-sm font-medium text-on-surface-variant animate-fadeIn">
                Tartışma içeriği buraya gelecek.
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Curriculum Playlist) */}
        <div className="w-full lg:w-[380px] shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden flex flex-col">
            
            {/* Header & Progress */}
            <div className="p-5 border-b border-outline-variant/30 bg-surface-container-low">
              <h3 className="text-lg font-bold text-on-surface mb-4">Eğitim İçeriği</h3>
              
              <div className="flex items-center justify-between text-xs font-bold text-primary mb-2">
                <span className="text-transparent">0</span>
                <span>45% Tamamlandı</span>
              </div>
              <div className="w-full h-2.5 bg-outline-variant/20 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            {/* Curriculum List */}
            <div className="divide-y divide-outline-variant/20">
              
              {/* Item 1 - Completed */}
              <div className="p-4 flex items-start gap-4 hover:bg-surface-container-lowest transition-colors cursor-pointer group">
                <div className="mt-1">
                  <CheckCircle2 className="w-6 h-6 text-primary fill-primary/10" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors leading-tight">
                    Bölüm 1: Şirket Vizyonu ve Kültürü
                  </h4>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-on-surface-variant font-medium">
                    <PlayCircle className="w-3.5 h-3.5" />
                    15:00 Dakika
                  </div>
                </div>
              </div>

              {/* Item 2 - Active / Playing */}
              <div className="p-4 flex items-start gap-4 bg-[#e5eeff] border-l-4 border-primary cursor-pointer">
                <div className="mt-1 relative">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white shadow-sm">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-primary leading-tight">
                    Bölüm 2: Vedubox Start Temel Kullanımı
                  </h4>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-primary font-bold">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    Şu an izleniyor
                  </div>
                </div>
              </div>

              {/* Item 3 - Pending (Text) */}
              <div className="p-4 flex items-start gap-4 hover:bg-surface-container-lowest transition-colors cursor-pointer group">
                <div className="mt-1">
                  <Circle className="w-6 h-6 text-outline-variant/60" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors leading-tight">
                    Bölüm 3: İK Süreçleri ve Yan Haklar
                  </h4>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-on-surface-variant font-medium">
                    <FileText className="w-3.5 h-3.5" />
                    Okuma Metni
                  </div>
                </div>
              </div>

              {/* Item 4 - Locked (Quiz) */}
              <div className="p-4 flex items-start gap-4 opacity-50 cursor-not-allowed">
                <div className="mt-1 bg-surface-container w-6 h-6 rounded-full flex items-center justify-center">
                  <Lock className="w-3.5 h-3.5 text-on-surface-variant" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-on-surface-variant leading-tight">
                    Bölüm 4: Proje Yönetim Araçları
                  </h4>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-on-surface-variant font-medium">
                    <FileText className="w-3.5 h-3.5" />
                    Sınav
                  </div>
                </div>
              </div>

              {/* Item 5 - Locked (Video) */}
              <div className="p-4 flex items-start gap-4 opacity-50 cursor-not-allowed">
                <div className="mt-1 bg-surface-container w-6 h-6 rounded-full flex items-center justify-center">
                  <Lock className="w-3.5 h-3.5 text-on-surface-variant" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-on-surface-variant leading-tight">
                    Bölüm 5: İletişim Protokolleri
                  </h4>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-on-surface-variant font-medium">
                    <PlayCircle className="w-3.5 h-3.5" />
                    12:00 Dakika
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {isAssignModalOpen && (
        <NewAssignmentModal 
          onClose={() => setIsAssignModalOpen(false)} 
          initialCourseId="c1" 
        />
      )}
    </div>
  );
}
