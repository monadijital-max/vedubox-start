'use client';

import React from 'react';
import { useAppStore } from '@/store/store';
import { AlertTriangle, CheckCircle, Info, XCircle, X } from 'lucide-react';

export default function GlobalDialogs() {
  const { globalDialogs, closeDialog } = useAppStore();

  if (globalDialogs.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 pointer-events-auto backdrop-blur-sm transition-opacity" onClick={() => closeDialog(globalDialogs[0].id)}></div>
      
      {/* Dialogs */}
      <div className="relative z-10 w-full max-w-md pointer-events-auto">
        {globalDialogs.map((dialog, index) => {
          // Only show the top-most dialog if multiple exist, or stack them visually
          if (index !== globalDialogs.length - 1) return null;

          const isConfirm = dialog.type === 'confirm';
          const isSuccess = dialog.type === 'success';
          const isError = dialog.type === 'error';
          
          let Icon = Info;
          let iconColor = 'text-blue-500';
          let iconBg = 'bg-blue-50';
          
          if (isConfirm || dialog.type === 'alert') {
            Icon = AlertTriangle;
            iconColor = 'text-amber-500';
            iconBg = 'bg-amber-50';
          } else if (isSuccess) {
            Icon = CheckCircle;
            iconColor = 'text-emerald-500';
            iconBg = 'bg-emerald-50';
          } else if (isError) {
            Icon = XCircle;
            iconColor = 'text-rose-500';
            iconBg = 'bg-rose-50';
          }

          return (
            <div key={dialog.id} className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fadeInUpBig">
              <div className="p-6">
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg font-bold text-on-surface mb-2">
                      {dialog.title || (isConfirm ? 'Emin misiniz?' : isSuccess ? 'Başarılı!' : isError ? 'Hata' : 'Bilgi')}
                    </h3>
                    <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                      {dialog.message}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-surface-container-lowest border-t border-outline-variant/30 flex justify-end gap-3">
                {isConfirm && (
                  <button 
                    onClick={() => {
                      if (dialog.onCancel) dialog.onCancel();
                      closeDialog(dialog.id);
                    }}
                    className="px-5 py-2.5 text-sm font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-xl transition-colors"
                  >
                    {dialog.cancelText || 'İptal'}
                  </button>
                )}
                <button 
                  onClick={() => {
                    if (dialog.onConfirm) dialog.onConfirm();
                    closeDialog(dialog.id);
                  }}
                  className={`px-5 py-2.5 text-white text-sm font-bold rounded-xl transition-all shadow-sm ${
                    isConfirm || isError ? 'bg-rose-600 hover:bg-rose-700' : 'bg-primary hover:bg-primary/90'
                  }`}
                >
                  {dialog.confirmText || 'Tamam'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
