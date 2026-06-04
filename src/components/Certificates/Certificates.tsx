'use client';

import React, { useState } from 'react';
import { Search, Filter, Calendar, Eye, Download, Share2, ChevronLeft, ChevronRight, X, Linkedin, Facebook, Send, Mail } from 'lucide-react';

export default function Certificates() {
  const [searchTerm, setSearchTerm] = useState('');
  const [previewCert, setPreviewCert] = useState<any>(null);
  const [shareCert, setShareCert] = useState<any>(null);

  const visualCertificates = [
    {
      id: '1',
      title: 'İş Güvenliği Uzmanlığı',
      employee: 'Mehmet Demir',
      date: '12 Mayıs 2024',
      avatar: 'https://ui-avatars.com/api/?name=Mehmet+Demir&background=e5eeff&color=0b1c30&bold=true',
      image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      title: 'Modern Liderlik Eğitimi',
      employee: 'Zeynep Kaya',
      date: '08 Mayıs 2024',
      avatar: 'https://ui-avatars.com/api/?name=Zeynep+Kaya&background=e5eeff&color=0b1c30&bold=true',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '3',
      title: 'Etkili Sunum Teknikleri',
      employee: 'Caner Aksoy',
      date: '01 Mayıs 2024',
      avatar: 'https://ui-avatars.com/api/?name=Caner+Aksoy&background=e5eeff&color=0b1c30&bold=true',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '4',
      title: 'Temel Excel Eğitimi',
      employee: 'Elif Sönmez',
      date: '28 Nisan 2024',
      avatar: 'https://ui-avatars.com/api/?name=Elif+Sonmez&background=e5eeff&color=0b1c30&bold=true',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    }
  ];

  return (
    <div className="space-y-lg animate-fadeIn text-on-surface pb-8">
      
      {/* Header */}
      <div>
        <h2 className="text-[28px] font-bold text-on-surface leading-tight">Sertifikalar</h2>
        <p className="text-sm text-on-surface-variant font-medium mt-1">
          Çalışanlarınızın kazandığı başarı belgelerini buradan yönetin ve doğrulayın.
        </p>
      </div>

      {/* Controls Row */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Search */}
        <div className="w-full md:flex-1 relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Çalışan adı veya eğitim başlığı ile ara..." 
            className="w-full pl-12 pr-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-sm font-medium focus:outline-none focus:border-primary focus:bg-white transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex items-center justify-center gap-2 px-5 py-3 bg-white border border-outline-variant/40 rounded-xl text-sm font-semibold text-on-surface hover:bg-surface-container transition-colors shadow-sm flex-1 md:flex-none whitespace-nowrap">
            <Calendar className="w-4 h-4 text-on-surface-variant" />
            Tarih Aralığı
          </button>
          <button className="flex items-center justify-center gap-2 px-5 py-3 bg-white border border-outline-variant/40 rounded-xl text-sm font-semibold text-on-surface hover:bg-surface-container transition-colors shadow-sm flex-1 md:flex-none whitespace-nowrap">
            <Filter className="w-4 h-4 text-on-surface-variant" />
            Filtrele
          </button>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visualCertificates.map((cert) => (
          <div key={cert.id} className="bg-white rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden hover:shadow-md transition-all group flex flex-col">
            
            {/* Image Section */}
            <div className="relative h-48 w-full overflow-hidden bg-surface-container">
              {/* Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
              
              <img 
                src={cert.image} 
                alt={cert.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full shadow-sm">
                  Doğrulanmış Sertifika
                </span>
              </div>
              
              {/* Title inside image */}
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <h3 className="text-white font-bold text-base leading-tight truncate">{cert.title}</h3>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-1 justify-between bg-white">
              
              <div className="flex items-center gap-3 mb-5">
                <img src={cert.avatar} alt={cert.employee} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="text-sm font-bold text-on-surface leading-tight">{cert.employee}</p>
                  <p className="text-xs text-on-surface-variant font-medium mt-0.5">{cert.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 relative">
                <button 
                  onClick={() => setPreviewCert(cert)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <Eye className="w-4 h-4 fill-current opacity-80" />
                  Görüntüle
                </button>
                <a 
                  href={cert.image} 
                  download={`Sertifika-${cert.title}.jpg`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 shrink-0 flex items-center justify-center border border-outline-variant/40 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                >
                  <Download className="w-4 h-4" />
                </a>
                <button 
                  onClick={() => setShareCert(shareCert?.id === cert.id ? null : cert)}
                  className={`w-10 h-10 shrink-0 flex items-center justify-center border rounded-lg transition-colors ${
                    shareCert?.id === cert.id 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-outline-variant/40 text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <Share2 className="w-4 h-4" />
                </button>

                {/* Share Dropdown */}
                {shareCert?.id === cert.id && (
                  <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-xl shadow-lg border border-outline-variant/30 py-2 z-30 animate-fadeIn">
                    <p className="px-4 pb-2 text-xs font-bold text-on-surface-variant border-b border-outline-variant/20 mb-2">Şurada Paylaş:</p>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(cert.image)}`} target="_blank" className="flex items-center gap-3 px-4 py-2 hover:bg-surface-container-low text-sm font-medium transition-colors">
                      <Linkedin className="w-4 h-4 text-[#0077b5]" /> LinkedIn
                    </a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(cert.image)}`} target="_blank" className="flex items-center gap-3 px-4 py-2 hover:bg-surface-container-low text-sm font-medium transition-colors">
                      <Facebook className="w-4 h-4 text-[#1877f2]" /> Facebook
                    </a>
                    <a href={`https://t.me/share/url?url=${encodeURIComponent(cert.image)}&text=Yeni sertifikamı kazandım!`} target="_blank" className="flex items-center gap-3 px-4 py-2 hover:bg-surface-container-low text-sm font-medium transition-colors">
                      <Send className="w-4 h-4 text-[#229ED9]" /> Telegram
                    </a>
                    <a href={`https://api.whatsapp.com/send?text=Yeni sertifikamı kazandım! ${encodeURIComponent(cert.image)}`} target="_blank" className="flex items-center gap-3 px-4 py-2 hover:bg-surface-container-low text-sm font-medium transition-colors">
                      <div className="w-4 h-4 bg-[#25D366] rounded-full flex items-center justify-center text-white"><span className="text-[10px] font-bold">W</span></div> WhatsApp
                    </a>
                    <a href={`mailto:?subject=Yeni Sertifikam&body=Yeni sertifikamı kazandım! Görüntülemek için: ${encodeURIComponent(cert.image)}`} className="flex items-center gap-3 px-4 py-2 hover:bg-surface-container-low text-sm font-medium transition-colors">
                      <Mail className="w-4 h-4 text-rose-500" /> E-posta
                    </a>
                  </div>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-2 bg-white border border-outline-variant/30 rounded-xl p-1 shadow-sm">
          <button className="p-2 hover:bg-surface-container transition-colors text-on-surface-variant hover:text-on-surface rounded-lg disabled:opacity-50" disabled>
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center px-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface font-semibold hover:bg-surface-container text-sm transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface font-semibold hover:bg-surface-container text-sm transition-colors">3</button>
            <span className="w-8 h-8 flex items-center justify-center text-on-surface-variant text-sm">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface font-semibold hover:bg-surface-container text-sm transition-colors">8</button>
          </div>

          <button className="p-2 hover:bg-surface-container transition-colors text-on-surface-variant hover:text-on-surface rounded-lg">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {previewCert && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={() => setPreviewCert(null)}>
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setPreviewCert(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="bg-white p-2 rounded-xl shadow-2xl">
              <img src={previewCert.image} alt={previewCert.title} className="w-full rounded-lg" />
              <div className="p-4 flex justify-between items-center bg-surface-container-lowest mt-2 rounded-lg">
                <div>
                  <h3 className="font-bold text-lg text-on-surface">{previewCert.title}</h3>
                  <p className="text-on-surface-variant">{previewCert.employee} • {previewCert.date}</p>
                </div>
                <a 
                  href={previewCert.image} 
                  download={`Sertifika-${previewCert.title}.jpg`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  İndir
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
