import React, { useState } from 'react';
import { Search, ChevronRight, ChevronDown, Folder, FolderOpen, Plus, Save, Trash2, X, Check, MoreVertical, List, Download, Image as ImageIcon, Star, Info, Eye, Edit2, History, ChevronsUpDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { useAppStore } from '../../store/store';

const TABS = ['Soru-Test Kategorileri', 'Soru havuzu', 'Test havuzu', 'Sınavlar'];

const QUESTION_TYPES = [
  'Tüm Soru Türleri',
  'Çoktan Seçmeli',
  'Doğru Yanlış',
  'Açık Uçlu',
  'Sıralama',
  'Eşleştirme',
  'Boşluk Doldurma',
  'Çok Yanıtlı',
  'Hesaplama'
];

const MOCK_CATEGORIES = [
  {
    id: 1,
    name: 'Açıkuçlu Kategori',
    children: [
      { id: 2, name: 'Açık Uçlu Sınav Soruları', children: [], questionCount: 4 }
    ]
  },
  {
    id: 3,
    name: 'Bilişim',
    children: [
      { id: 4, name: 'LMS', children: [], questionCount: 12 },
      { id: 5, name: 'Metaverse', children: [
        { id: 6, name: 'Teknoloji', children: [], questionCount: 5 }
      ] },
      { id: 7, name: 'Davranış Bilimi', children: [], questionCount: 8 }
    ]
  },
  {
    id: 8,
    name: 'Deneme',
    children: [
      { id: 9, name: 'Test', children: [], questionCount: 0 },
      { id: 10, name: 'Etkileşimli Video', children: [], questionCount: 3 },
      { id: 11, name: 'Etkili İletişim', children: [], questionCount: 15 },
      { id: 12, name: 'Genel Kategori', children: [], questionCount: 22 }
    ]
  }
];

const MOCK_QUESTIONS = [
  { id: 1, text: 'Q', type: 'Çoktan Seçmeli', options: 4, creator: 'Nida Kılıç', category: 'PP', date: '14/05/2026', isPublic: true, isEditable: true },
  { id: 2, text: 'Uvuvwe', type: 'Çoktan Seçmeli', options: 4, creator: 'Nida Kılıç', category: 'PP', date: '25/04/2026', isPublic: true, isEditable: true },
  { id: 3, text: 'Malatyanın en ünlü tarım ürünü hangisidir?', type: 'Çoktan Seçmeli', options: 4, creator: 'Nida Kılıç', category: 'Davranış Bilimi 1. Dönem Soruları', date: '27/04/2026', isPublic: true, isEditable: true },
  { id: 4, text: 'Soru', type: 'Çoktan Seçmeli', options: 4, creator: 'Nida Kılıç', category: 'Davranış Bilimi 1. Dönem Soruları', date: '27/04/2026', isPublic: true, isEditable: true },
  { id: 5, text: 'Akdeniz hangi iki kıta arasında yer alır?', type: 'Çoktan Seçmeli', options: 4, creator: 'Nida Kılıç', category: 'Davranış Bilimi 1. Dönem Soruları', date: '20/04/2026', isPublic: true, isEditable: true },
  { id: 6, text: 'Aşağıdakilerden hangisi Malatya\'nın...', type: 'Çoktan Seçmeli', options: 4, creator: 'Nida Kılıç', category: 'Davranış Bilimi 1. Dönem Soruları', date: '20/04/2026', isPublic: true, isEditable: true },
];

const MOCK_TESTS = [
  { id: 1, name: 'Nida deneme - Kopya', desc: 'Jsis', creator: 'Nida Kılıç', category: 'Kurum Kültürü ve Kurum İçi İletişim', date: '27/04/2026', isPublic: true, isEditable: true },
  { id: 2, name: 'Nida deneme', desc: 'Jsis', creator: 'Nida Kılıç', category: 'Kurum Kültürü ve Kurum İçi İletişim', date: '27/04/2026', isPublic: true, isEditable: true },
  { id: 3, name: 'Kurum Kültürü Karışık Soru Tipleri - Kopya', desc: 'Soruları Dikkatli Okuyunuz', creator: 'Nida Kılıç', category: 'Kurum Kültürü ve Kurum İçi İletişim', date: '20/04/2026', isPublic: true, isEditable: true },
  { id: 4, name: 'Test sınav', desc: '', creator: 'Nida Kılıç', category: 'Kurum Kültürü ve Kurum İçi İletişim', date: '20/04/2026', isPublic: true, isEditable: true },
  { id: 5, name: 'lkj', desc: '', creator: 'Duosoft Duosoft', category: 'Kurum Kültürü ve Kurum İçi İletişim', date: '20/04/2026', isPublic: true, isEditable: false },
  { id: 6, name: 'slkj', desc: '', creator: 'Duosoft Duosoft', category: 'tüm sorular', date: '20/04/2026', isPublic: true, isEditable: false },
  { id: 7, name: 'Nidaaa - Kopya', desc: '', creator: 'Nida Kılıç', category: 'Kurum Kültürü ve Kurum İçi İletişim', date: '20/04/2026', isPublic: true, isEditable: true },
  { id: 8, name: 'Nidaaa', desc: '', creator: 'Nida Kılıç', category: 'Kurum Kültürü ve Kurum İçi İletişim', date: '20/04/2026', isPublic: true, isEditable: true },
  { id: 9, name: 'ses', desc: '', creator: 'Duosoft Duosoft', category: 'tüm sorular', date: '11/12/2025', isPublic: true, isEditable: false },
  { id: 10, name: 'ipucu', desc: '', creator: 'Duosoft Duosoft', category: 'tüm sorular', date: '11/12/2025', isPublic: true, isEditable: false },
  { id: 11, name: 'pdf li test', desc: '', creator: 'Duosoft Duosoft', category: 'tüm sorular', date: '10/12/2025', isPublic: true, isEditable: true },
  { id: 12, name: 'test örneği1 - soru örneği 2', desc: '', creator: 'Duosoft Duosoft', category: 'tüm sorular', date: '02/12/2025', isPublic: true, isEditable: true },
];

const MOCK_EXAMS_DATA = [
  { id: 1, name: 'Genel Değerlendirme Sınavı', desc: '1. Dönem sonu değerlendirmesi', creator: 'Ahmet Yılmaz', createdAt: '15/05/2026' },
  { id: 2, name: 'Kurum İçi İletişim Testi', desc: 'Yeni başlayanlar için oryantasyon', creator: 'Nida Kılıç', createdAt: '20/04/2026' },
  { id: 3, name: 'Davranış Bilimleri Vize', desc: 'Vize sınavı', creator: 'Mehmet Demir', createdAt: '10/04/2026' },
  { id: 4, name: 'LMS Kullanım Sınavı', desc: 'LMS temel kullanım yeterliliği', creator: 'Zeynep Kaya', createdAt: '05/04/2026' },
  { id: 5, name: 'İş Güvenliği Sertifika Sınavı', desc: 'Zorunlu İSG eğitimi sonu sınavı', creator: 'Ahmet Yılmaz', createdAt: '01/04/2026' }
];

const TreeNode = ({ node, level, expandedIds, toggleExpand, selectedId, onSelect }: any) => {
  const isExpanded = expandedIds.includes(node.id);
  const isSelected = selectedId === node.id;
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <div 
        className={`flex items-center gap-2 py-2 pr-3 cursor-pointer rounded-xl transition-colors mb-1 ${isSelected ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 text-slate-700'}`}
        style={{ paddingLeft: `${level * 1.25 + 0.5}rem` }}
        onClick={() => onSelect(node)}
      >
        <button 
          className={`p-1 rounded-md transition-colors ${hasChildren ? 'hover:bg-indigo-100 text-slate-400' : 'opacity-0 cursor-default'}`}
          onClick={(e) => {
            e.stopPropagation();
            if (hasChildren) toggleExpand(node.id);
          }}
          disabled={!hasChildren}
        >
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        {isExpanded ? (
          <FolderOpen className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-indigo-600' : 'text-indigo-400'}`} />
        ) : (
          <Folder className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
        )}
        <span className={`text-sm select-none truncate ${isSelected ? 'font-semibold' : 'font-medium'}`}>
          {node.name}
        </span>
      </div>
      
      {isExpanded && hasChildren && (
        <div className="relative">
          <div className="absolute left-[1.125rem] top-0 bottom-0 w-px bg-slate-100" style={{ left: `${level * 1.25 + 1.125}rem` }}></div>
          {node.children.map((child: any) => (
            <TreeNode 
              key={child.id} 
              node={child} 
              level={level + 1} 
              expandedIds={expandedIds} 
              toggleExpand={toggleExpand}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Exams() {
  const [activeTab, setActiveTab] = useState(TABS[0]); 
  const [expandedIds, setExpandedIds] = useState<number[]>([1, 3, 8]);
  const [selectedNode, setSelectedNode] = useState<any | null>(MOCK_CATEGORIES[0].children[0]);
  const [categoryName, setCategoryName] = useState(MOCK_CATEGORIES[0].children[0].name);
  const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);
  const [isCreatingTest, setIsCreatingTest] = useState(false);
  const [testWizardStep, setTestWizardStep] = useState(1);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<number[]>([]);
  const [selectedTestIds, setSelectedTestIds] = useState<number[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [hoverLevel, setHoverLevel] = useState<number>(0);
  const [level, setLevel] = useState<number>(3);
  const [questionType, setQuestionType] = useState<string>('Çoktan Seçmeli');
  const [questionOptions, setQuestionOptions] = useState<number[]>([1, 2, 3, 4]);

  const handleAddOption = () => {
    setQuestionOptions(prev => [...prev, (prev.length > 0 ? Math.max(...prev) : 0) + 1]);
  };

  const handleRemoveOption = (id: number) => {
    setQuestionOptions(prev => prev.filter(optId => optId !== id));
  };
  
  const getLevelText = (val: number) => {
    switch(val) {
      case 1: return 'Çok Kolay';
      case 2: return 'Kolay';
      case 3: return 'Orta';
      case 4: return 'Zor';
      case 5: return 'Çok Zor';
      default: return '';
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSelect = (node: any) => {
    setSelectedNode(node);
    setCategoryName(node.name);
  };

  return (
    <div className="flex flex-col h-full animate-fade-in pb-10">
      
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-end gap-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1e1e2d]">Test/Sınav İşlemleri</h2>
            <p className="text-sm text-slate-500 mt-1">Sınavları, testleri ve soru havuzunu buradan yönetebilirsiniz.</p>
          </div>

          {/* Sweet Tab Menu */}
          <div className="flex p-1 bg-slate-100/80 backdrop-blur-sm rounded-xl border border-slate-200/60 overflow-x-auto hide-scrollbar max-w-full">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setIsCreatingQuestion(false);
                }}
                className={`px-5 py-2.5 text-sm font-semibold rounded-lg whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab 
                    ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-900/5' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === 'Soru-Test Kategorileri' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[650px] animate-fade-in-up">
          <div className="bg-slate-50 px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm">Tüm Soru-Test Kategorileri</h3>
            <div className="flex items-center gap-2">
            <button className="h-9 px-4 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors flex items-center gap-2 font-semibold text-sm shadow-sm" title="Kategori Ekle">
              <Plus className="w-5 h-5" /> Kategori Ekle
            </button>
          </div>
          </div>
          
          <div className="p-4 border-b border-slate-100 bg-white flex max-w-md">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Ara..." 
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 scroll-smooth custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                {MOCK_CATEGORIES.map(node => (
                  <TreeNode 
                    key={node.id} 
                    node={node} 
                    level={0} 
                    expandedIds={expandedIds} 
                    toggleExpand={toggleExpand}
                    selectedId={selectedNode?.id}
                    onSelect={handleSelect}
                  />
                ))}
              </div>
              <div>
                {selectedNode ? (
                  <div className="bg-slate-50/50 rounded-2xl shadow-sm border border-slate-200 p-6">
                    <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <FolderOpen className="w-4 h-4 text-indigo-500" /> Kategori Detayı
                    </h4>
                    <div className="mb-4">
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Kategori Adı</label>
                      <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 font-medium" />
                    </div>
                    <div className="mb-6">
                      <p className="text-xs font-semibold text-slate-500 mb-1">Toplam Soru Sayısı</p>
                      <p className="font-bold text-slate-800">{selectedNode.questionCount ?? 0}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => useAppStore.getState().showDialog({ type: 'success', message: 'Kategori güncellendi.' })} className="px-4 py-2 bg-[#383FD8] text-white text-xs font-bold rounded-lg hover:bg-[#383FD8]/90">Kaydet</button>
                      <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50">Alt Kategori Ekle</button>
                      <button className="px-4 py-2 bg-white border border-rose-200 text-rose-600 text-xs font-bold rounded-lg hover:bg-rose-50 ml-auto">Sil</button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50/50 rounded-2xl border border-slate-200 border-dashed p-8 flex flex-col items-center justify-center text-center h-full min-h-[200px]">
                    <Folder className="w-8 h-8 text-slate-300 mb-2" />
                    <p className="text-sm text-slate-500">Düzenlemek için sol taraftan bir kategori seçin.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Soru havuzu' && (
        <div className="w-full">
          {isCreatingQuestion ? (
              // New Question Form
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[650px] animate-fade-in-up">
                <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="font-bold text-indigo-900 text-lg flex items-center gap-2">
                    Soru Bilgileri
                  </h3>
                </div>
                
                <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6 custom-scrollbar">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Tipi</label>
                    <div className="relative">
                      <select 
                        value={questionType}
                        onChange={(e) => setQuestionType(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800 appearance-none cursor-pointer"
                      >
                        {QUESTION_TYPES.slice(1).map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    {questionType === 'Boşluk Doldurma' && (
                      <p className="text-xs font-medium text-rose-500 mt-2">
                        Örnek Kalıp: Türkiye'nin başkenti olan ((Ankara)) nüfusu yaklaşık ((5)) milyondur.
                      </p>
                    )}
                  </div>
                  
                  {questionType === 'Çoktan Seçmeli' && (
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-slate-700">Soru Resmi (İsteğe Bağlı)</label>
                      <label className="border border-slate-200 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                        <input type="file" className="hidden" accept="image/*" />
                        <div className="p-3 bg-slate-100 text-slate-500 rounded-full group-hover:bg-[#383FD8]/10 group-hover:text-[#383FD8] transition-colors mb-2">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <p className="text-sm font-semibold text-slate-700">Browse (Gözat)</p>
                        <p className="text-xs text-slate-500 mt-1">resim seçmek için tıklayın veya sürükleyin</p>
                      </label>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Soru</label>
                    <div className="border border-slate-300 rounded-xl overflow-hidden">
                      <div className="bg-slate-50 border-b border-slate-300 px-3 py-2 flex items-center gap-2 text-slate-600 text-xs">
                         <span className="font-bold px-1 cursor-pointer hover:text-slate-800">B</span> 
                         <span className="italic px-1 cursor-pointer hover:text-slate-800">I</span> 
                         <span className="underline px-1 cursor-pointer hover:text-slate-800">U</span>
                         <span className="line-through px-1 cursor-pointer hover:text-slate-800">S</span>
                         <div className="w-px h-4 bg-slate-300 mx-1"></div>
                         <span className="cursor-pointer hover:text-slate-800">Sans Serif</span>
                      </div>
                      <textarea className="w-full h-20 p-3 focus:outline-none text-sm resize-none"></textarea>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Çözüm (İsteğe Bağlı)</label>
                    <div className="border border-slate-300 rounded-xl overflow-hidden">
                      <div className="bg-slate-50 border-b border-slate-300 px-3 py-2 flex items-center gap-2 text-slate-600 text-xs">
                         <span className="font-bold px-1 cursor-pointer hover:text-slate-800">B</span> 
                         <span className="italic px-1 cursor-pointer hover:text-slate-800">I</span> 
                         <span className="underline px-1 cursor-pointer hover:text-slate-800">U</span>
                         <span className="line-through px-1 cursor-pointer hover:text-slate-800">S</span>
                         <div className="w-px h-4 bg-slate-300 mx-1"></div>
                         <span className="cursor-pointer hover:text-slate-800">Sans Serif</span>
                      </div>
                      <textarea className="w-full h-20 p-3 focus:outline-none text-sm resize-none"></textarea>
                    </div>
                  </div>

                  

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Puan</label>
                    <div className="relative">
                      <input type="number" defaultValue="10" className="w-full px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-slate-800" />
                      <Check className="w-4 h-4 text-emerald-500 absolute right-4 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Seviye</label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          onMouseEnter={() => setHoverLevel(star)}
                          onMouseLeave={() => setHoverLevel(0)}
                          onClick={() => setLevel(star)}
                          className={`w-6 h-6 cursor-pointer transition-colors ${
                            star <= (hoverLevel || level) 
                              ? 'text-amber-400 fill-amber-400' 
                              : 'text-slate-200 fill-slate-200'
                          }`} 
                        />
                      ))}
                      <span className="ml-3 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-md min-w-[80px] text-center">
                        {getLevelText(hoverLevel || level)}
                      </span>
                    </div>
                  </div>

                  {!['Açık Uçlu', 'Boşluk Doldurma', 'Eşleştirme', 'Sıralama'].includes(questionType) && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-semibold text-slate-700">Seçenekler</label>
                        {questionType !== 'Hesaplama' && (
                          <div className="flex gap-8 text-xs font-semibold text-slate-500">
                            <span>Doğru Cevap</span>
                            <span className="mr-4">Metni</span>
                            {questionType !== 'Doğru Yanlış' && <span>Sil</span>}
                          </div>
                        )}
                      </div>
                      
                      {questionType === 'Doğru Yanlış' ? (
                        <div className="space-y-4">
                          {['Doğru', 'Yanlış'].map((text, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                              <div className="w-20 flex justify-center">
                                <input type="radio" name="correct" defaultChecked={idx === 0} className="w-4 h-4 text-[#383FD8] focus:ring-[#383FD8] cursor-pointer" />
                              </div>
                              <div className="flex-1 flex items-center border border-slate-200 rounded-md bg-white px-4 py-3">
                                 <input type="text" value={text} readOnly className="text-sm font-medium text-slate-700 flex-1 bg-transparent focus:outline-none cursor-default" />
                                 <ChevronsUpDown className="w-4 h-4 text-slate-300" />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : questionType === 'Hesaplama' ? (
                        <div className="border border-slate-200 rounded-md p-4 bg-white flex items-center gap-4">
                           <input type="text" defaultValue="0" className="w-32 px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#383FD8]" />
                           <span className="text-sm font-medium text-slate-600">Doğru Cevap</span>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {questionOptions.map((opt, idx) => (
                            <div key={opt} className="flex items-start gap-4">
                              <div className="mt-4 w-20 flex justify-center">
                                <input type={questionType === 'Çok Yanıtlı' ? 'checkbox' : 'radio'} name={questionType === 'Çok Yanıtlı' ? `correct_${opt}` : 'correct'} defaultChecked={idx === 0} className={`w-4 h-4 cursor-pointer ${questionType === 'Çok Yanıtlı' ? 'text-[#383FD8] focus:ring-[#383FD8] rounded-[4px] border-slate-300' : 'text-indigo-600 focus:ring-indigo-500'}`} />
                              </div>
                              <div className="flex-1 border border-slate-300 rounded-xl overflow-hidden">
                                <div className="bg-slate-50 border-b border-slate-300 px-3 py-2 flex items-center gap-2 text-slate-600 text-xs">
                                  <span className="font-bold px-1 cursor-pointer hover:text-slate-800">B</span> 
                                  <span className="italic px-1 cursor-pointer hover:text-slate-800">I</span> 
                                  <span className="underline px-1 cursor-pointer hover:text-slate-800">U</span>
                                </div>
                                <textarea className="w-full h-12 p-3 focus:outline-none text-sm resize-none"></textarea>
                              </div>
                              <button onClick={() => handleRemoveOption(opt)} className="mt-4 p-2 bg-rose-50 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors flex-shrink-0">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          <div className="flex justify-end pt-2">
                            <button onClick={handleAddOption} className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-100 transition-colors shadow-sm">
                              <Plus className="w-4 h-4" /> Ekle
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="pt-6 border-t border-slate-100 mt-4">
                    <label className="block text-sm font-bold text-[#4B5E7D] mb-3">Soru-Test Kategorisi</label>
                    <div className="border border-slate-200 rounded-md h-48 overflow-y-auto p-4 bg-white custom-scrollbar">
                      {MOCK_CATEGORIES.map(node => (
                        <TreeNode 
                          key={node.id} 
                          node={node} 
                          level={0} 
                          expandedIds={expandedIds} 
                          toggleExpand={toggleExpand}
                          selectedId={selectedNode?.id}
                          onSelect={handleSelect}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 pt-10 pb-6">
                    <button 
                      onClick={() => {
                        useAppStore.getState().showDialog({ type: 'success', message: 'Soru başarıyla eklendi!' });
                        setIsCreatingQuestion(false);
                      }}
                      className="flex items-center gap-2 px-6 py-2 bg-[#383FD8] text-white text-sm font-bold rounded-full hover:bg-[#383FD8]/90 transition-colors shadow-sm"
                    >
                      <Save className="w-4 h-4" />
                      Kaydet
                    </button>
                    <button 
                      onClick={() => setIsCreatingQuestion(false)}
                      className="flex items-center gap-2 px-6 py-2 bg-white border border-slate-200 text-[#64748B] text-sm font-bold rounded-full hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      <X className="w-4 h-4" />
                      İptal
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Question Pool Table
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[650px] overflow-hidden animate-fade-in-up">
                
                {/* Toolbar */}
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsCreatingQuestion(true)}
                      className="h-9 px-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center font-semibold text-sm gap-2 shadow-sm"
                    >
                      <Plus className="w-4 h-4" /> Yeni
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                  {selectedQuestionIds.length > 0 && (
                    <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-1.5 animate-fade-in h-9">
                      <span className="text-sm font-bold text-indigo-700">{selectedQuestionIds.length} seçildi</span>
                      <button 
                        onClick={() => setSelectedQuestionIds([])}
                        className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-white px-2 py-1 rounded border border-rose-200 transition-colors shadow-sm"
                      >
                        Sil
                      </button>
                    </div>
                  )}

                    <div className="relative group hidden md:block">
                      <select className="appearance-none bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer w-48">
                        {QUESTION_TYPES.map(t => <option key={t}>{t}</option>)}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    
                    <div className="relative w-40">
                      <input 
                        type="text" 
                        placeholder="Ara..." 
                        className="w-full bg-white border border-slate-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-400"
                      />
                    </div>
                    
                    <button className="p-2 text-white bg-[#383FD8] border border-transparent rounded-lg hover:bg-[#383FD8]/90 transition-colors shadow-sm">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-auto custom-scrollbar">
                  <table className="w-full text-left border-collapse whitespace-nowrap text-sm">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider sticky top-0 z-10 backdrop-blur-md">
                        <th className="py-3 px-4 w-10">#</th>
                        <th className="py-3 px-2 w-10">
                          <input 
                            type="checkbox" 
                            checked={selectedQuestionIds.length === MOCK_QUESTIONS.length && MOCK_QUESTIONS.length > 0}
                            onChange={(e) => {
                              if (e.target.checked) setSelectedQuestionIds(MOCK_QUESTIONS.map(q => q.id));
                              else setSelectedQuestionIds([]);
                            }}
                            className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer" 
                          />
                        </th>
                        <th className="py-3 px-4 min-w-[250px]">Metni</th>
                        <th className="py-3 px-4">Tür</th>

                        <th className="py-3 px-4">Oluşturan Kullanıcı</th>
                        <th className="py-3 px-4">Soru-Test Kategorisi</th>
                        <th className="py-3 px-4">Oluşturulma Tarihi</th>

                        <th className="py-3 px-4 text-center w-12">İşlem</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {MOCK_QUESTIONS.map((q, i) => (
                        <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4 text-slate-400 font-medium">{i + 1}</td>
                          <td className="py-3 px-2">
                            <input 
                              type="checkbox" 
                              checked={selectedQuestionIds.includes(q.id)}
                              onChange={(e) => {
                                if (e.target.checked) setSelectedQuestionIds(prev => [...prev, q.id]);
                                else setSelectedQuestionIds(prev => prev.filter(id => id !== q.id));
                              }}
                              className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer" 
                            />
                          </td>
                          <td className="py-3 px-4 text-slate-700 font-medium truncate max-w-[250px]" title={q.text}>
                            {q.text}
                          </td>
                          <td className="py-3 px-4 text-slate-600 truncate max-w-[150px]" title={q.type}>{q.type}</td>

                          <td className="py-3 px-4 text-slate-600 truncate max-w-[150px]" title={q.creator}>{q.creator}</td>
                          <td className="py-3 px-4 text-slate-600 truncate max-w-[200px]" title={q.category}>{q.category}</td>
                          <td className="py-3 px-4 text-slate-600">{q.date}</td>

                          <td className="py-3 px-4 text-center relative">
                            <button 
                              onClick={() => setOpenMenuId(openMenuId === `q-${q.id}` ? null : `q-${q.id}`)}
                              onBlur={() => setTimeout(() => setOpenMenuId(null), 200)}
                              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            {openMenuId === `q-${q.id}` && (
                              <div className="absolute right-12 top-2 mt-1 w-40 bg-white border border-slate-200 shadow-xl rounded-xl py-2 z-[60] flex flex-col text-left">
                                <button className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors text-left flex items-center gap-2"><Edit2 className="w-4 h-4" /> Güncelle</button>
                                <button className="px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors text-left flex items-center gap-2"><Trash2 className="w-4 h-4" /> Sil</button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-slate-50/50 border-t border-slate-200 px-4 py-3 flex items-center justify-between text-xs font-medium text-slate-500">
                  <p>Toplam {MOCK_QUESTIONS.length} soru gösteriliyor</p>
                </div>
              </div>
            )}
        </div>
      )}
      {activeTab === 'Test havuzu' && (
        <div className="w-full">
          {isCreatingTest ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[650px] overflow-hidden animate-fade-in-up">
              {/* Header */}
              <div className="bg-[#383FD8] px-6 py-4 flex items-center justify-center shrink-0">
                <h2 className="text-white text-lg font-bold">Test Bilgileri</h2>
              </div>
              
              {/* Wizard Steps */}
              <div className="flex items-center justify-center py-6 border-b border-slate-100 shrink-0">
                <div className="flex items-center w-full max-w-xl px-8">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-colors ${testWizardStep === 1 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>1</div>
                    <span className={`font-semibold text-sm transition-colors ${testWizardStep === 1 ? 'text-emerald-500' : 'text-slate-400'}`}>Test Bilgileri</span>
                  </div>
                  <div className="flex-1 h-px bg-slate-200 mx-4"></div>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-colors ${testWizardStep === 2 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>2</div>
                    <span className={`font-semibold text-sm transition-colors ${testWizardStep === 2 ? 'text-emerald-500' : 'text-slate-400'}`}>Soru Seçimi</span>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                {testWizardStep === 1 ? (
                  <div className="max-w-4xl mx-auto space-y-6">
                    <div className="grid grid-cols-[200px_1fr] items-start gap-6">
                      <label className="text-sm font-semibold text-slate-700 mt-3">Ad</label>
                      <input type="text" className="w-full border border-rose-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#383FD8]/20 focus:border-[#383FD8] text-sm text-slate-700 transition-colors" placeholder="Ad" />
                    </div>
                    
                    <div className="grid grid-cols-[200px_1fr] items-start gap-6">
                      <label className="text-sm font-semibold text-slate-700 mt-3">Açıklama</label>
                      <textarea className="w-full border border-slate-200 rounded-xl px-4 py-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#383FD8]/20 focus:border-[#383FD8] text-sm text-slate-700 transition-colors" placeholder="Açıklama"></textarea>
                    </div>

                    <div className="grid grid-cols-[200px_1fr] items-start gap-6">
                      <label className="text-sm font-semibold text-slate-700 mt-1">Etiketler</label>
                      <div>
                        <p className="text-[10px] italic text-slate-400 mb-1">Her bir etiketin arasına virgül koyun.</p>
                        <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#383FD8]/20 focus:border-[#383FD8] text-sm text-slate-700 transition-colors" />
                      </div>
                    </div>

                    <div className="grid grid-cols-[200px_1fr] items-start gap-6">
                      <label className="text-sm font-semibold text-slate-700 mt-3">Kod</label>
                      <input type="text" className="w-48 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#383FD8]/20 focus:border-[#383FD8] text-sm text-slate-700 transition-colors" />
                    </div>

                    <div className="grid grid-cols-[200px_1fr] items-start gap-6">
                      <label className="text-sm font-semibold text-slate-700 mt-3">Talimatlar</label>
                      <textarea className="w-full border border-slate-200 rounded-xl px-4 py-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#383FD8]/20 focus:border-[#383FD8] text-sm text-slate-700 transition-colors" placeholder="Talimatlar"></textarea>
                    </div>

                    <div className="grid grid-cols-[200px_1fr] items-center gap-6">
                      <label className="text-sm font-semibold text-slate-700">Test Süresi</label>
                      <div className="flex items-center gap-3">
                        <input type="number" defaultValue="240" className="w-32 border border-emerald-500 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm text-slate-700 bg-emerald-50/30" />
                        <span className="text-sm font-semibold text-slate-600">Dakika</span>
                      </div>
                    </div>

                    {/* Checkboxes Group */}
                    <div className="space-y-4 pt-4">
                      {[
                        { id: 'public', label: 'Herkese Açık', checked: false },
                        { id: 'optik', label: 'Optik Okuyucu Etkin', checked: false },
                        { id: 'taban', label: 'Taban Puan Olsun', checked: false, info: true },
                        { id: 'yuvarla', label: 'Sonuçları Tam Sayıya Yuvarla', checked: false, info: true },
                        { id: 'karistir', label: 'Cevaplar Karıştırılsın', checked: false },
                        { id: 'gecis', label: 'Sorular Arası Geçiş', checked: true },
                        { id: 'bos', label: 'Boş Bırakılan Sorular Yanlış Kabul Edilsin', checked: false }
                      ].map(cb => (
                        <div key={cb.id} className="grid grid-cols-[200px_1fr] items-center gap-6">
                          <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                            {cb.label}
                            {cb.info && <Info className="w-3.5 h-3.5 text-slate-400" />}
                          </label>
                          <input type="checkbox" defaultChecked={cb.checked} className="w-4 h-4 rounded border-slate-300 text-[#383FD8] focus:ring-[#383FD8] cursor-pointer" />
                        </div>
                      ))}

                      <div className="grid grid-cols-[200px_1fr] items-center gap-6">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                          Testin Ortalamadaki % Değeri <Info className="w-3.5 h-3.5 text-slate-400" />
                        </label>
                        <div className="flex items-center gap-4">
                          <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#383FD8] focus:ring-[#383FD8] cursor-pointer" />
                          <input type="number" defaultValue="100" className="w-32 border border-slate-200 rounded-full px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#383FD8]/20 focus:border-[#383FD8] text-sm text-slate-700 bg-slate-50 transition-colors" />
                        </div>
                      </div>

                      <div className="grid grid-cols-[200px_1fr] items-center gap-6">
                        <label className="text-sm font-semibold text-slate-700">Soru Havuzundan Rastgele Sorular Sorulsun</label>
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#383FD8] focus:ring-[#383FD8] cursor-pointer" />
                      </div>

                      <div className="grid grid-cols-[200px_1fr] items-center gap-6">
                        <label className="text-sm font-semibold text-slate-700">Yanlışlar Doğruları Götürsün</label>
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#383FD8] focus:ring-[#383FD8] cursor-pointer" />
                      </div>
                    </div>

                    <div className="grid grid-cols-[200px_1fr] items-start gap-6 pt-4 border-t border-slate-100">
                      <label className="text-sm font-semibold text-slate-700 mt-2">Soru-Test Kategorisi</label>
                      <div className="border border-slate-200 rounded-xl h-64 overflow-y-auto p-4 bg-white custom-scrollbar">
                        {MOCK_CATEGORIES.map(node => (
                          <TreeNode 
                            key={node.id} 
                            node={node} 
                            level={0} 
                            expandedIds={expandedIds} 
                            toggleExpand={toggleExpand}
                            selectedId={selectedNode?.id}
                            onSelect={handleSelect}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 overflow-auto p-6 md:p-8 custom-scrollbar">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-full min-h-[500px]">
                      
                      {/* Left Pane: Soru Listesi */}
                      <div className="flex flex-col border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm h-[500px]">
                        <div className="bg-[#8699B5] px-4 py-2 flex items-center justify-center shrink-0">
                          <h3 className="text-white text-sm font-bold">Soru Listesi</h3>
                        </div>
                        
                        <div className="p-3 border-b border-slate-200 flex flex-col gap-3 shrink-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <select className="border border-slate-200 rounded-lg text-xs font-medium px-2 py-1.5 focus:outline-none focus:border-indigo-500 text-slate-700 min-w-[150px]">
                              <option>| Kurum Kültürü ve Kurum İçi İletişim</option>
                            </select>
                            <button className="border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">Ekle</button>
                            <button className="border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">Toplu Kayıt</button>
                            <button className="border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1">
                              Aktar <ArrowRight className="w-3 h-3" />
                            </button>
                            <select className="border border-slate-200 rounded-lg text-xs font-medium px-2 py-1.5 focus:outline-none focus:border-indigo-500 text-slate-700">
                              <option>10</option>
                            </select>
                          </div>
                          
                          <div className="relative w-48">
                            <input type="text" placeholder="Ara..." className="w-full border border-slate-200 rounded-full pl-3 pr-8 py-1.5 text-xs focus:outline-none focus:border-indigo-500" />
                            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>

                        <div className="flex-1 overflow-auto custom-scrollbar">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/50">
                                <th className="py-2.5 px-3 w-10 text-center">
                                  <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 w-3.5 h-3.5 cursor-pointer" />
                                </th>
                                <th className="py-2.5 px-3 text-center">Metni</th>
                                <th className="py-2.5 px-3 w-16"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                "Which climate condition is most suitable...",
                                "How are Malatya apricots usually...",
                                "Açık uçlu soru"
                              ].map((q, i) => (
                                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                  <td className="py-3 px-3 text-center">
                                    <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 w-3.5 h-3.5 cursor-pointer" />
                                  </td>
                                  <td className="py-3 px-3 font-medium text-slate-600 flex items-center gap-3">
                                    <div className="w-3.5 h-3.5 border border-slate-400 rounded-sm flex items-center justify-center shrink-0">
                                      <Plus className="w-2.5 h-2.5 text-slate-500" />
                                    </div>
                                    <span className="truncate max-w-[200px]" title={q}>{q}</span>
                                  </td>
                                  <td className="py-3 px-3 text-right">
                                    <button className="text-[11px] font-bold text-teal-600 hover:text-teal-700 transition-colors border-l-2 border-teal-500 pl-2">Aktar</button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Right Pane: Soru */}
                      <div className="flex flex-col border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm h-[500px]">
                        <div className="bg-[#8699B5] px-4 py-2 flex items-center justify-center shrink-0">
                          <h3 className="text-white text-sm font-bold">Soru</h3>
                        </div>
                        
                        <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-center gap-6 shrink-0">
                          <span className="text-xs font-medium text-slate-600">Eklenen Soru Sayısı: 4</span>
                          
                          <select className="border border-slate-200 rounded-lg text-xs font-medium px-2 py-1.5 focus:outline-none focus:border-indigo-500 text-slate-700">
                            <option>10</option>
                          </select>
                          
                          <div className="relative w-40">
                            <input type="text" placeholder="Ara..." className="w-full border border-slate-200 rounded-full pl-3 pr-8 py-1.5 text-xs focus:outline-none focus:border-indigo-500" />
                            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
                          </div>
                          
                          <span className="text-xs font-medium text-slate-600">Toplam Puan: 40</span>
                        </div>

                        <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                          <table className="w-full text-center border-collapse text-xs border border-emerald-600/40 rounded-lg overflow-hidden">
                            <thead>
                              <tr className="border-b border-emerald-600/40 text-emerald-700 font-bold bg-white">
                                <th className="py-2.5 px-4 w-10 border-r border-emerald-600/40">#</th>
                                <th className="py-2.5 px-4 text-center border-r border-emerald-600/40">Metni</th>
                                <th className="py-2.5 px-4 w-20">Puan</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                "What is the main export product of...",
                                "Which vitamin is abundant in Malatya...",
                                "What month is the Malatya Apricot...",
                                "(Doğru Yanlış)Kurum kültürü en temel v..."
                              ].map((q, i) => (
                                <tr key={i} className="border-b border-emerald-600/20 hover:bg-slate-50 transition-colors">
                                  <td className="py-2.5 px-4 text-center border-r border-emerald-600/20 text-slate-500 font-medium">{i + 1}</td>
                                  <td className="py-2.5 px-4 font-medium text-slate-600 flex items-center gap-3 border-r border-emerald-600/20">
                                    <div className="w-3.5 h-3.5 border border-slate-400 rounded-sm flex items-center justify-center shrink-0">
                                      <Plus className="w-2.5 h-2.5 text-slate-500" />
                                    </div>
                                    <ChevronsUpDown className="w-3.5 h-3.5 text-slate-300" />
                                    <span className="truncate max-w-[250px]">{q}</span>
                                  </td>
                                  <td className="py-2.5 px-4">
                                    <div className="flex items-center justify-end gap-3">
                                      <input type="text" defaultValue="10" className="w-12 text-center border border-slate-200 rounded-full py-1 text-xs text-slate-600 focus:outline-none focus:border-indigo-500" />
                                      <button className="flex items-center justify-center border-l-2 border-rose-600 pl-2 text-slate-800 hover:text-rose-600 transition-colors">
                                        <X className="w-3.5 h-3.5 font-bold" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="bg-slate-50 border-t border-slate-200 px-8 py-4 flex items-center justify-between shrink-0">
                <button 
                  onClick={() => setTestWizardStep(1)}
                  disabled={testWizardStep === 1}
                  className={`flex items-center gap-2 px-6 py-2 border border-slate-200 text-sm font-bold rounded-full transition-colors shadow-sm ${testWizardStep === 1 ? 'text-slate-300 bg-white cursor-not-allowed' : 'text-slate-600 bg-white hover:bg-slate-50'}`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Önceki
                </button>
                
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => {
                      setIsCreatingTest(false);
                      setTestWizardStep(1);
                    }}
                    className="flex items-center gap-2 px-6 py-2 bg-white border border-slate-200 text-[#64748B] text-sm font-bold rounded-full hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    <X className="w-4 h-4" /> İptal
                  </button>
                  <button 
                    onClick={() => {
                      useAppStore.getState().showDialog({ type: 'success', message: 'Test başarıyla kaydedildi!' });
                      setIsCreatingTest(false);
                      setTestWizardStep(1);
                    }}
                    className="flex items-center gap-2 px-6 py-2 bg-[#383FD8] text-white text-sm font-bold rounded-full hover:bg-[#383FD8]/90 transition-colors shadow-sm"
                  >
                    <Save className="w-4 h-4" /> Kaydet
                  </button>
                </div>
                
                <button 
                  onClick={() => setTestWizardStep(2)}
                  disabled={testWizardStep === 2}
                  className={`flex items-center gap-2 px-6 py-2 bg-white border border-slate-200 text-sm font-bold rounded-full transition-colors shadow-sm ${testWizardStep === 2 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  Sonraki
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[650px] overflow-hidden animate-fade-in-up">
              {/* Toolbar */}
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button onClick={() => setIsCreatingTest(true)} className="h-9 px-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center font-semibold text-sm gap-2 shadow-sm">
                    <Plus className="w-4 h-4" /> Yeni
                  </button>
                </div>
                
              <div className="flex flex-wrap items-center gap-2">
                  {selectedTestIds.length > 0 && (
                    <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-1.5 animate-fade-in h-9">
                      <span className="text-sm font-bold text-indigo-700">{selectedTestIds.length} seçildi</span>
                      <button 
                        onClick={() => setSelectedTestIds([])}
                        className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-white px-2 py-1 rounded border border-rose-200 transition-colors shadow-sm"
                      >
                        Sil
                      </button>
                    </div>
                  )}

                <div className="relative group hidden md:block">
                  <select className="appearance-none bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer w-48">
                    <option value="">Tüm Soru-Test Kategorileri</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                
                <div className="relative group hidden sm:block">
                  <select className="appearance-none bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer w-20">
                    <option value="15">15</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="relative w-40">
                  <input 
                    type="text" 
                    placeholder="Ara..." 
                    className="w-full bg-white border border-slate-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-400"
                  />
                </div>

                <button className="p-2 text-white bg-[#383FD8] border border-transparent rounded-lg hover:bg-[#383FD8]/90 transition-colors shadow-sm">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto custom-scrollbar">
              <table className="w-full text-center border-collapse whitespace-nowrap text-sm">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider sticky top-0 z-10 backdrop-blur-md">
                    <th className="py-3 px-4 w-10">#</th>
                    <th className="py-3 px-2 w-10">
                      <input 
                        type="checkbox" 
                        checked={selectedTestIds.length === MOCK_TESTS.length && MOCK_TESTS.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedTestIds(MOCK_TESTS.map(t => t.id));
                          else setSelectedTestIds([]);
                        }}
                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer" 
                      />
                    </th>
                    <th className="py-3 px-4 min-w-[200px] text-left">Ad</th>
                    <th className="py-3 px-4 text-left">Açıklama</th>
                    <th className="py-3 px-4">Oluşturan Kullanıcı</th>
                    <th className="py-3 px-4">Soru-Test Kategorisi</th>
                    <th className="py-3 px-4">Oluşturulma Tarihi</th>

                    <th className="py-3 px-4 w-12">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_TESTS.map((t, i) => (
                    <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 text-slate-400 font-medium">{i + 1}</td>
                      <td className="py-3 px-2">
                        <input 
                          type="checkbox" 
                          checked={selectedTestIds.includes(t.id)}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedTestIds(prev => [...prev, t.id]);
                            else setSelectedTestIds(prev => prev.filter(id => id !== t.id));
                          }}
                          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer" 
                        />
                      </td>
                      <td className="py-3 px-4 text-slate-700 font-medium truncate max-w-[200px] text-left" title={t.name}>
                        {t.name}
                      </td>
                      <td className="py-3 px-4 text-slate-600 text-left truncate max-w-[250px]" title={t.desc}>{t.desc}</td>
                      <td className="py-3 px-4 text-slate-600 truncate max-w-[150px]" title={t.creator}>{t.creator}</td>
                      <td className="py-3 px-4 text-slate-600 truncate max-w-[200px]" title={t.category}>{t.category}</td>
                      <td className="py-3 px-4 text-slate-600">{t.date}</td>

                      <td className="py-3 px-4 relative">
                            <button 
                              onClick={() => setOpenMenuId(openMenuId === `t-${t.id}` ? null : `t-${t.id}`)}
                              onBlur={() => setTimeout(() => setOpenMenuId(null), 200)}
                              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            >
                              <MoreVertical className="w-4 h-4 mx-auto" />
                            </button>
                            {openMenuId === `t-${t.id}` && (
                              <div className="absolute right-12 top-2 mt-1 w-40 bg-white border border-slate-200 shadow-xl rounded-xl py-2 z-[60] flex flex-col text-left">
                                <button className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors text-left flex items-center gap-2"><Eye className="w-4 h-4" /> Gör</button>
                                <button className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors text-left flex items-center gap-2"><Edit2 className="w-4 h-4" /> Güncelle</button>
                                <button className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors text-left flex items-center gap-2"><Download className="w-4 h-4" /> İndir</button>
                                <button className="px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors text-left flex items-center gap-2"><Trash2 className="w-4 h-4" /> Sil</button>
                              </div>
                            )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-slate-50/50 border-t border-slate-200 px-4 py-3 flex items-center justify-between text-xs font-medium text-slate-500">
              <p>Toplam {MOCK_TESTS.length} test gösteriliyor</p>
            </div>
          </div>
          )}
        </div>
      )}
      {activeTab === 'Sınavlar' && (
        <div className="w-full animate-fade-in-up">
          {/* Top Toolbar */}
          <div className="flex flex-wrap items-center justify-end gap-4 mb-6">
            <button className="h-9 px-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center font-semibold text-sm gap-2 shadow-sm">
              <Plus className="w-4 h-4" /> Yeni
            </button>
            <div className="relative group">
              <select className="appearance-none bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer w-40">
                <option value="">Tüm sınavlar</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <div className="relative group">
              <select className="appearance-none bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer w-20">
                <option value="15">15</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <div className="relative w-40">
              <input 
                type="text" 
                placeholder="Ara..." 
                className="w-full bg-white border border-slate-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Date Filter Bar */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6 flex flex-wrap items-end gap-6">
            <div className="flex-1 min-w-[250px]">
              <label className="block text-sm font-bold text-slate-700 mb-2">Başlama Tarihi</label>
              <div className="relative">
                <input 
                  type="date" 
                  defaultValue="2022-02-03"
                  className="w-full bg-emerald-50/50 border border-emerald-200 text-emerald-800 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
            <div className="flex-1 min-w-[250px]">
              <label className="block text-sm font-bold text-slate-700 mb-2">Bitiş Tarihi</label>
              <div className="relative">
                <input 
                  type="date" 
                  defaultValue="2026-06-06"
                  className="w-full bg-slate-50/50 border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
            <button className="px-6 py-2.5 bg-slate-100 text-slate-600 font-bold rounded-lg hover:bg-slate-200 transition-colors shadow-sm">
              Ara
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[500px] overflow-hidden">
            <div className="flex-1 overflow-auto custom-scrollbar">
              <table className="w-full text-center border-collapse whitespace-nowrap text-sm">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider sticky top-0 z-10 backdrop-blur-md">
                    <th className="py-4 px-4 w-10">#</th>
                    <th className="py-4 px-4 text-left">Ad</th>
                    <th className="py-4 px-4 text-left">Açıklama</th>
                    <th className="py-4 px-4">Oluşturan Eğitmen</th>
                    <th className="py-4 px-4">Oluşturulma Tarihi</th>
                    <th className="py-4 px-4 w-12">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_EXAMS_DATA.map((exam, i) => (
                    <tr key={exam.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 text-slate-400 font-medium">{i + 1}</td>
                      <td className="py-4 px-4 text-slate-700 font-medium text-left truncate max-w-[200px]" title={exam.name}>
                        {exam.name}
                      </td>
                      <td className="py-4 px-4 text-slate-600 text-left truncate max-w-[250px]" title={exam.desc}>{exam.desc}</td>
                      <td className="py-4 px-4 text-slate-600 truncate max-w-[150px]" title={exam.creator}>{exam.creator}</td>
                      <td className="py-4 px-4 text-slate-600">{exam.createdAt}</td>
                      <td className="py-4 px-4 relative">
                        <button 
                          onClick={() => setOpenMenuId(openMenuId === `e-${exam.id}` ? null : `e-${exam.id}`)}
                          onBlur={() => setTimeout(() => setOpenMenuId(null), 200)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 mx-auto" />
                        </button>
                        {openMenuId === `e-${exam.id}` && (
                          <div className="absolute right-12 top-2 mt-1 w-52 bg-white border border-slate-200 shadow-xl rounded-xl py-2 z-[60] flex flex-col text-left">
                            <button className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors text-left flex items-center gap-2"><Eye className="w-4 h-4" /> Gör</button>
                            <button className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors text-left flex items-center gap-2"><Edit2 className="w-4 h-4" /> Güncelle</button>
                            <button className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors text-left flex items-center gap-2"><History className="w-4 h-4" /> Geçmiş</button>
                            <button className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors text-left flex items-center gap-2"><Download className="w-4 h-4" /> Soruları İndir</button>
                            <button className="px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors text-left flex items-center gap-2"><Trash2 className="w-4 h-4" /> Sil</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-slate-50/50 border-t border-slate-200 px-4 py-3 flex items-center justify-between text-xs font-medium text-slate-500">
              <p>Toplam {MOCK_EXAMS_DATA.length} sınav gösteriliyor</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
