'use client';
import { useAppStore } from '@/store/store';

import React, { useState } from 'react';
import { X, Building } from 'lucide-react';

interface NewUnitModalProps {
  onClose: () => void;
  initialData?: { id: number; name: string; manager: string } | null;
}

export default function NewUnitModal({ onClose, initialData }: NewUnitModalProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [manager, setManager] = useState(initialData?.manager || '');

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fadeIn p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest">
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <Building className="w-5 h-5 text-primary" />
            {initialData ? 'Birimi Düzenle' : 'Yeni Birim Oluştur'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-full transition-colors">
            <X className="w-5 h-5 text-on-surface-variant" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm font-bold text-on-surface block mb-2">Birim Adı</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Örn: İnsan Kaynakları" 
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-sm font-medium focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-on-surface block mb-2">Birim Yöneticisi</label>
            <input 
              type="text" 
              value={manager}
              onChange={(e) => setManager(e.target.value)}
              placeholder="Yönetici adını girin..." 
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-sm font-medium focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-outline-variant/30 bg-surface-container-lowest flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-xl transition-colors"
          >
            İptal
          </button>
          <button 
            disabled={!name.trim()}
            onClick={() => {
              alert(initialData ? 'Birim başarıyla güncellendi!' : 'Birim başarıyla oluşturuldu!');
              onClose();
            }}
            className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl disabled:opacity-50 hover:bg-primary/90 transition-all"
          >
            {initialData ? 'Değişiklikleri Kaydet' : 'Birimi Kaydet'}
          </button>
        </div>
      </div>
    </div>
  );
}
