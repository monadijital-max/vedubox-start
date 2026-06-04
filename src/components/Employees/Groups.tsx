'use client';
import { useAppStore } from '@/store/store';

import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Users, ChevronLeft, ChevronRight, Check, Edit2, Trash2 } from 'lucide-react';
import NewGroupModal from './NewGroupModal';

export default function Groups() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editGroup, setEditGroup] = useState<{ id: number; name: string; description: string } | null>(null);

  const groups = useAppStore(state => state.groups) || [];

  return (
    <div className="space-y-lg animate-fadeIn text-on-surface">
      {/* Header */}
      <div className="mb-sm">
        <h1 className="text-headline-md font-bold text-on-surface">Gruplar</h1>
        <div className="flex items-center text-label-sm text-on-surface-variant gap-xs mt-1">
          <span>Kullanıcılar</span>
          <span>/</span>
          <span className="text-primary font-semibold">Gruplar</span>
        </div>
      </div>

      {/* Top Controls Row */}
      <div className="flex flex-col md:flex-row gap-sm justify-between items-center bg-white p-sm rounded-lg shadow-soft-sm border border-outline-variant/30">
        <div className="w-full md:w-[400px] relative">
          <Search className="w-4 h-4 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Grup ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-md py-[10px] bg-surface-container-low border border-transparent rounded-md text-body-sm focus:outline-none focus:border-outline-variant transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-sm w-full md:w-auto">
          <button className="flex-1 md:flex-none px-md py-[10px] bg-white border border-outline-variant hover:bg-surface-container rounded-md text-label-sm font-semibold transition-all flex items-center justify-center gap-xs shadow-soft-sm">
            <Filter className="w-4 h-4" />
            Filtrele
          </button>
          <button 
            onClick={() => {
              setEditGroup(null);
              setIsModalOpen(true);
            }}
            className="flex-1 md:flex-none px-md py-[10px] bg-primary text-white text-label-sm font-bold rounded-md hover:bg-blue-800 shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-xs"
          >
            <Plus className="w-4 h-4" />
            Grup Oluştur
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest text-[11px] font-bold text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/30">
                <th className="px-6 py-4">GRUP ADI</th>
                <th className="px-6 py-4">AÇIKLAMA</th>
                <th className="px-6 py-4">KULLANICI SAYISI</th>
                <th className="px-6 py-4">DURUM</th>
                <th className="px-6 py-4 text-center">İŞLEMLER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {groups.map((group) => (
                <tr key={group.id} className="hover:bg-surface-container-lowest transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface leading-tight">{group.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-on-surface-variant">{group.description}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-on-surface">{group.member_count} Kişi</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md uppercase ${group.status === 'Aktif' ? 'text-emerald-700 bg-emerald-100' : 'text-rose-700 bg-rose-100'}`}>
                      {group.status}
                    </span>
                  </td>
                  <td className="py-sm px-lg text-right relative">
                    <div className="flex justify-end items-center gap-2">
                      <button 
                        onClick={() => {
                          setEditGroup(group);
                          setIsModalOpen(true);
                        }}
                        className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-md transition-colors"
                        title="Düzenle"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          useAppStore.getState().showDialog({
                            type: 'confirm',
                            message: 'Bu grubu silmek istediğinizden emin misiniz?',
                            onConfirm: () => {
                              useAppStore.getState().showDialog({ type: 'success', message: 'Grup silindi.' });
                            }
                          });
                        }}
                        className="p-1.5 text-on-surface-variant hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination & Footer */}
        <div className="p-4 bg-surface-container-low flex justify-between items-center border-t border-outline-variant/30">
          <p className="text-sm font-medium text-on-surface-variant">Toplam {groups.length} grup gösteriliyor</p>
          <div className="flex items-center gap-4 bg-white border border-outline-variant/30 rounded-lg overflow-hidden shadow-sm">
            <button className="p-2 hover:bg-surface-container transition-colors text-on-surface-variant hover:text-on-surface">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-bold text-on-surface px-2">1 / 1</span>
            <button className="p-2 hover:bg-surface-container transition-colors text-on-surface-variant hover:text-on-surface border-l border-outline-variant/30">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {isModalOpen && <NewGroupModal onClose={() => setIsModalOpen(false)} initialData={editGroup} />}
    </div>
  );
}
