import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronDown, Bold, Italic, Underline, Strikethrough, 
  Quote, Code, List, ListOrdered, Subscript, Superscript, 
  AlignLeft, AlignCenter, AlignRight, Image, Video, Paperclip, Plus, Trash2
} from 'lucide-react';

interface LiveTrainingFormProps {
  onCancel: () => void;
}

export default function LiveTrainingForm({ onCancel }: LiveTrainingFormProps) {
  const [selectedType, setSelectedType] = useState('Video Görüşme');
  const [isMultipleSessions, setIsMultipleSessions] = useState(false);
  const [sessions, setSessions] = useState([{ date: '', timeHour: '12', timeMinute: '00' }]);

  return (
    <div className="flex flex-col h-full animate-fadeIn pb-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onCancel}
          className="p-2 bg-white border border-outline-variant/30 hover:bg-surface-container rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-on-surface" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-on-surface">Yeni Canlı Eğitim Ekle</h2>
          <p className="text-sm text-on-surface-variant mt-1">Sisteme yeni bir canlı eğitim oturumu tanımlayın</p>
        </div>
      </div>

      <div className="bg-white border border-outline-variant/30 rounded-2xl shadow-sm p-8 max-w-4xl">
        <div className="space-y-6">
          
          {/* Eğitim/Toplantı Adı */}
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-6 md:items-center">
            <label className="text-sm font-bold text-on-surface">Eğitim/Toplantı Adı</label>
            <div className="relative w-full">
              <select className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl pl-4 pr-10 py-3 text-sm text-on-surface focus:outline-none focus:border-primary appearance-none cursor-pointer">
                <option>Seçiniz...</option>
                <option>Emlak Sektörü - Emlak Danışmanı Eğitimi 120 Saatlik Kurs</option>
                <option>CRM Eğitimi</option>
                <option>Liderlik Eğitimi</option>
              </select>
              <ChevronDown className="w-5 h-5 text-on-surface-variant absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Tür */}
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-6 md:items-center">
            <label className="text-sm font-bold text-on-surface">Tür</label>
            <div className="flex items-center gap-3">
              <button 
                type="button"
                onClick={() => setSelectedType('Video Görüşme')}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedType === 'Video Görüşme' ? 'bg-primary/10 text-primary border-primary' : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/30 hover:bg-surface-container'} border`}
              >
                Video Görüşme
              </button>
              <button 
                type="button"
                onClick={() => setSelectedType('Google Meet')}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedType === 'Google Meet' ? 'bg-primary/10 text-primary border-primary' : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/30 hover:bg-surface-container'} border`}
              >
                Google Meet
              </button>
            </div>
          </div>

          {/* Birden çok */}
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-6 md:items-center">
            <label className="text-sm font-bold text-on-surface">Birden Çok Seans</label>
            <div className="flex items-center h-full">
              <input 
                type="checkbox" 
                checked={isMultipleSessions}
                onChange={(e) => setIsMultipleSessions(e.target.checked)}
                className="w-5 h-5 rounded border-outline-variant/50 text-primary focus:ring-primary cursor-pointer accent-primary" 
              />
            </div>
          </div>

          {/* Başlık */}
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-6 md:items-center">
            <label className="text-sm font-bold text-on-surface">Oturum Başlığı</label>
            <input 
              type="text" 
              placeholder="Örn: Mehmet 04.06.2026"
              className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Tarih ve Saat */}
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-6 md:items-start">
            <label className="text-sm font-bold text-on-surface pt-3">Zamanlama</label>
            <div className="flex flex-col gap-4 w-full">
              {!isMultipleSessions ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative w-full sm:w-64">
                    <input 
                      type="date" 
                      className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative flex items-center">
                      <select className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl pl-4 pr-7 py-3 text-sm text-on-surface appearance-none focus:outline-none focus:border-primary cursor-pointer min-w-[72px]">
                        {Array.from({length: 24}).map((_, i) => (
                          <option key={i}>{i.toString().padStart(2, '0')}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-on-surface-variant absolute right-2 pointer-events-none" />
                    </div>
                    <span className="font-bold text-on-surface-variant">:</span>
                    <div className="relative flex items-center">
                      <select className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl pl-4 pr-7 py-3 text-sm text-on-surface appearance-none focus:outline-none focus:border-primary cursor-pointer min-w-[72px]">
                        {['00', '15', '30', '45'].map(m => (
                          <option key={m}>{m}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-on-surface-variant absolute right-2 pointer-events-none" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {sessions.map((session, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-outline-variant/30 rounded-xl bg-surface-container-lowest">
                      <input 
                        type="date" 
                        value={session.date}
                        onChange={(e) => {
                          const newSessions = [...sessions];
                          newSessions[index].date = e.target.value;
                          setSessions(newSessions);
                        }}
                        className="w-full sm:w-48 bg-white border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors cursor-pointer"
                      />
                      <div className="flex items-center gap-2">
                        <div className="relative flex items-center">
                          <select 
                            value={session.timeHour}
                            onChange={(e) => {
                              const newSessions = [...sessions];
                              newSessions[index].timeHour = e.target.value;
                              setSessions(newSessions);
                            }}
                            className="bg-white border border-outline-variant/50 rounded-xl pl-4 pr-7 py-2.5 text-sm text-on-surface appearance-none focus:outline-none focus:border-primary cursor-pointer min-w-[72px]"
                          >
                            {Array.from({length: 24}).map((_, i) => (
                              <option key={i}>{i.toString().padStart(2, '0')}</option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-on-surface-variant absolute right-2 pointer-events-none" />
                        </div>
                        <span className="font-bold text-on-surface-variant">:</span>
                        <div className="relative flex items-center">
                          <select 
                            value={session.timeMinute}
                            onChange={(e) => {
                              const newSessions = [...sessions];
                              newSessions[index].timeMinute = e.target.value;
                              setSessions(newSessions);
                            }}
                            className="bg-white border border-outline-variant/50 rounded-xl pl-4 pr-7 py-2.5 text-sm text-on-surface appearance-none focus:outline-none focus:border-primary cursor-pointer min-w-[72px]"
                          >
                            {['00', '15', '30', '45'].map(m => (
                              <option key={m}>{m}</option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-on-surface-variant absolute right-2 pointer-events-none" />
                        </div>
                      </div>
                      {sessions.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => setSessions(sessions.filter((_, i) => i !== index))}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors ml-auto sm:ml-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button 
                    type="button"
                    onClick={() => setSessions([...sessions, { date: '', timeHour: '12', timeMinute: '00' }])}
                    className="flex items-center gap-2 text-primary font-bold text-sm hover:underline"
                  >
                    <Plus className="w-4 h-4" />
                    Yeni Seans Ekle
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Süre */}
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-6 md:items-center">
            <label className="text-sm font-bold text-on-surface">Süre (Dakika)</label>
            <input 
              type="number" 
              defaultValue="40"
              className="w-full sm:w-32 bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Katılım Limiti */}
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-6 md:items-center">
            <label className="text-sm font-bold text-on-surface">Katılım Limiti</label>
            <div className="flex items-center gap-3">
              <input 
                type="number" 
                defaultValue="0"
                className="w-full sm:w-32 bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
              />
              <span className="text-xs text-on-surface-variant italic">0 değeri limitsiz anlamına gelir.</span>
            </div>
          </div>

          {/* Açıklama */}
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-6">
            <label className="text-sm font-bold text-on-surface pt-3">Açıklama</label>
            <div className="border border-outline-variant/30 rounded-xl overflow-hidden bg-white">
              <div className="bg-surface-container-lowest border-b border-outline-variant/30 p-2 flex flex-wrap items-center gap-1">
                <button className="p-1.5 hover:bg-surface-container rounded text-on-surface-variant"><Bold className="w-4 h-4" /></button>
                <button className="p-1.5 hover:bg-surface-container rounded text-on-surface-variant"><Italic className="w-4 h-4" /></button>
                <button className="p-1.5 hover:bg-surface-container rounded text-on-surface-variant"><Underline className="w-4 h-4" /></button>
                <button className="p-1.5 hover:bg-surface-container rounded text-on-surface-variant"><Strikethrough className="w-4 h-4" /></button>
                <div className="w-px h-4 bg-outline-variant/30 mx-1" />
                <button className="p-1.5 hover:bg-surface-container rounded text-on-surface-variant"><List className="w-4 h-4" /></button>
                <button className="p-1.5 hover:bg-surface-container rounded text-on-surface-variant"><ListOrdered className="w-4 h-4" /></button>
                <div className="w-px h-4 bg-outline-variant/30 mx-1" />
                <button className="p-1.5 hover:bg-surface-container rounded text-on-surface-variant"><AlignLeft className="w-4 h-4" /></button>
                <button className="p-1.5 hover:bg-surface-container rounded text-on-surface-variant"><AlignCenter className="w-4 h-4" /></button>
                <button className="p-1.5 hover:bg-surface-container rounded text-on-surface-variant"><AlignRight className="w-4 h-4" /></button>
              </div>
              <textarea 
                className="w-full h-32 p-4 resize-none focus:outline-none text-sm text-on-surface bg-transparent"
                placeholder="Eğitim hakkında kısa bir açıklama..."
              />
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="mt-10 pt-6 border-t border-outline-variant/30 flex items-center justify-end gap-3">
          <button 
            onClick={onCancel}
            className="px-6 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm font-bold text-on-surface hover:bg-surface-container transition-colors"
          >
            İptal
          </button>
          <button 
            onClick={onCancel}
            className="px-8 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 shadow-sm transition-all"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}
