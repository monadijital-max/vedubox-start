'use client';
import { useAppStore } from '@/store/store';

import React, { useState } from 'react';
import { X, UserCog } from 'lucide-react';

interface AssignRoleModalProps {
  onClose: () => void;
  employeeName: string;
}

export default function AssignRoleModal({ onClose, employeeName }: AssignRoleModalProps) {
  const [selectedRole, setSelectedRole] = useState('Öğrenci / Çalışan');

  const roles = ['Öğrenci / Çalışan', 'Eğitmen', 'Sistem Yöneticisi', 'İçerik Yöneticisi', 'Rapor Yöneticisi'];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fadeIn p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest">
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <UserCog className="w-5 h-5 text-primary" />
            Rol Ata
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-full transition-colors">
            <X className="w-5 h-5 text-on-surface-variant" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm font-medium text-on-surface-variant">
            <strong className="text-on-surface">{employeeName}</strong> kullanıcısı için yeni bir rol seçin.
          </p>

          <div className="space-y-2">
            <label className="text-sm font-bold text-on-surface block mb-2">Sistem Rolü</label>
            <select 
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-sm font-medium focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
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
            onClick={() => {
              useAppStore.getState().showDialog({ type: 'success', message: `${employeeName} kişisine '${selectedRole}' rolü başarıyla atandı.` });
              onClose();
            }}
            className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-all"
          >
            Rolü Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}
