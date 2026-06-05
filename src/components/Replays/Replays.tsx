import React, { useState } from 'react';
import { Search, ChevronDown, MoreVertical, Play, Calendar, Clock, Filter, Trash2, FileText, Image as ImageIcon } from 'lucide-react';

const MOCK_REPLAYS = [
  { id: 1, title: '8888 31.12.2025', date: '31/12/2025', time: '10:00', duration: '6', category: 'Eğitim', course: 'tekrar izle f' },
  { id: 2, title: '8888 31.12.2025', date: '31/12/2025', time: '10:00', duration: '6', category: 'Eğitim', course: 'tekrar izle f' },
  { id: 3, title: 'Duosoft 09.12.2025', date: '09/12/2025', time: '13:10', duration: '9', category: 'Eğitim', course: 'Zoom Randevusu, Video Toplantı ve Görüşme' },
  { id: 4, title: 'Duosoft 09.12.2025', date: '09/12/2025', time: '12:55', duration: '9', category: 'Eğitim', course: 'Zoom Randevusu, Video Toplantı ve Görüşme' },
  { id: 5, title: 'Duosoft 08.12.2025', date: '08/12/2025', time: '14:50', duration: '12', category: 'Eğitim', course: 'Zoom Randevusu, Video Toplantı ve Görüşme' },
];

export default function Replays() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(MOCK_REPLAYS.map(r => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="flex flex-col h-full animate-fade-in pb-10">
      
      {/* Header Section */}
      <div className="mb-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1e1e2d]">Tekrar İzle</h2>
          <p className="text-sm text-slate-500 mt-1">Geçmiş canlı yayın kayıtlarınıza ve videolarınıza buradan ulaşabilirsiniz.</p>
        </div>

        {/* Search and Filters Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Kayıt ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm placeholder:text-slate-400"
            />
          </div>

          {/* Filters and Actions */}
          <div className="flex flex-wrap items-center justify-end gap-3 w-full md:w-auto">
            {selectedIds.length > 0 && (
              <div className="flex items-center gap-2 mr-2 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 animate-fade-in">
                <span className="text-sm font-semibold text-indigo-700">{selectedIds.length} seçildi</span>
                <div className="w-px h-4 bg-indigo-200 mx-1"></div>
                <button 
                  onClick={() => setSelectedIds([])}
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Sil
                </button>
              </div>
            )}

            <div className="relative group">
              <select className="appearance-none bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 hover:border-indigo-300 transition-colors shadow-sm cursor-pointer">
                <option value="">Tüm Kayıt Tipleri</option>
                <option value="zoom">Zoom</option>
                <option value="meet">Google Meet</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-indigo-500 transition-colors" />
            </div>

            <div className="relative group">
              <select className="appearance-none bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 hover:border-indigo-300 transition-colors shadow-sm cursor-pointer">
                <option value="">Tüm Eğitim Kategorileri</option>
                <option value="egitim">Eğitim</option>
                <option value="webinar">Webinar</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-indigo-500 transition-colors" />
            </div>
            
            <div className="relative group">
              <select className="appearance-none bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 hover:border-indigo-300 transition-colors shadow-sm cursor-pointer">
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="50">50</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-indigo-500 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-visible relative">
        <div className="overflow-x-auto overflow-y-visible">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="py-4 pl-6 pr-2 w-12 text-center">#</th>
                <th className="py-4 px-2 w-12">
                  <div className="flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer transition-colors"
                      checked={selectedIds.length === MOCK_REPLAYS.length && MOCK_REPLAYS.length > 0}
                      onChange={handleSelectAll}
                    />
                  </div>
                </th>
                <th className="py-4 px-4 font-semibold">Başlık</th>
                <th className="py-4 px-4 font-semibold">Tarih</th>
                <th className="py-4 px-4 font-semibold">Saat</th>
                <th className="py-4 px-4 font-semibold text-center whitespace-nowrap">Gerçekleşen Süre</th>
                <th className="py-4 px-4 font-semibold">Kategori</th>
                <th className="py-4 px-4 font-semibold">Eğitim</th>
                <th className="py-4 pr-6 pl-2 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_REPLAYS.map((item, index) => {
                const isSelected = selectedIds.includes(item.id);
                return (
                  <tr 
                    key={item.id} 
                    className={`group transition-colors hover:bg-slate-50 relative ${isSelected ? 'bg-indigo-50/30' : 'bg-white'}`}
                  >
                    <td className="py-4 pl-6 pr-2 text-center text-sm font-medium text-slate-400">
                      {index + 1}
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer transition-colors"
                          checked={isSelected}
                          onChange={() => handleSelect(item.id)}
                        />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                          <Play className="w-3.5 h-3.5 text-indigo-600 ml-0.5" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors cursor-pointer whitespace-nowrap">
                          {item.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-slate-600 text-sm font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {item.date}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-slate-600 text-sm font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {item.time}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center justify-center min-w-[2rem] h-6 px-2 text-xs font-bold rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {item.duration} dk
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200/50">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-slate-600 font-medium truncate max-w-[250px] lg:max-w-[300px]" title={item.course}>
                        {item.course}
                      </p>
                    </td>
                    <td className="py-4 pr-6 pl-2 relative">
                      <button 
                        onClick={() => setActiveDropdownId(activeDropdownId === item.id ? null : item.id)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {/* Dropdown Menu */}
                      {activeDropdownId === item.id && (
                        <>
                          <div 
                            className="fixed inset-0 z-40" 
                            onClick={() => setActiveDropdownId(null)}
                          ></div>
                          <div className="absolute right-10 top-10 w-56 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-slate-100 z-50 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                            <button className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-3 transition-colors">
                              <Play className="w-4 h-4 text-slate-400" />
                              İzle
                            </button>
                            <button className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-3 transition-colors">
                              <FileText className="w-4 h-4 text-slate-400" />
                              İzleme Raporu
                            </button>
                            <button className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-3 transition-colors">
                              <ImageIcon className="w-4 h-4 text-slate-400" />
                              Video Resmi Ekle
                            </button>
                            <div className="h-px bg-slate-100 my-1"></div>
                            <button className="w-full text-left px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-3 transition-colors">
                              <Trash2 className="w-4 h-4 text-rose-500" />
                              Sil
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {MOCK_REPLAYS.length === 0 && (
            <div className="py-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3 border border-slate-100">
                <Search className="w-6 h-6 text-slate-300" />
              </div>
              <h3 className="text-sm font-bold text-slate-700">Kayıt bulunamadı</h3>
              <p className="text-xs text-slate-500 mt-1">Arama kriterlerinize uygun tekrar izleme kaydı yok.</p>
            </div>
          )}
        </div>
        
        {/* Pagination Details */}
        <div className="bg-slate-50/50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          <p className="text-xs font-medium text-slate-500">
            Toplam <span className="font-bold text-slate-700">{MOCK_REPLAYS.length}</span> kayıttan <span className="font-bold text-slate-700">1-{MOCK_REPLAYS.length}</span> arası gösteriliyor
          </p>
          <div className="flex gap-1">
            <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-colors disabled:opacity-50" disabled>
              &lt;
            </button>
            <button className="w-8 h-8 rounded-lg border border-indigo-200 bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold transition-colors">
              1
            </button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-colors disabled:opacity-50" disabled>
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
