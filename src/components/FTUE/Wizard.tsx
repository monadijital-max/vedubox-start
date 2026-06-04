'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/store';
import { 
  Building2, Users, BookOpen, UserCheck, CheckCircle2, 
  Upload, Download, Plus, Trash2, Search, ArrowRight, ArrowLeft 
} from 'lucide-react';

export default function OnboardingWizard() {
  const { 
    currentStep, 
    completedSteps, 
    academyConfig, 
    employees, 
    courses,
    setStep, 
    completeStep, 
    updateAcademyConfig, 
    addEmployee, 
    importEmployees, 
    removeEmployee,
    finishOnboarding 
  } = useAppStore();

  // Local state for Step 2 manual entry
  const [manualName, setManualName] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualDept, setManualDept] = useState('İnsan Kaynakları');
  const [activeImportTab, setActiveImportTab] = useState<'excel' | 'manual'>('excel');
  const [excelText, setExcelText] = useState('');
  
  // Local state for Step 3 search/category selection
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>(['course-onb-1', 'course-comp-1', 'course-comp-2']);

  // Local state for Step 4 assignment details
  const [assignmentScope, setAssignmentScope] = useState<'all' | 'department' | 'new'>('all');
  const [assignmentTime, setAssignmentTime] = useState<'immediate' | 'scheduled'>('immediate');

  const stepsList = [
    { num: 1, label: 'Şirket Bilgileri', desc: 'Şirket bilgilerinizi girin.', icon: Building2 },
    { num: 2, label: 'Çalışanlar', desc: 'Ekibinizi sisteme ekleyin.', icon: Users },
    { num: 3, label: 'Eğitim Seçimi', desc: 'Hazır eğitimleri seçin.', icon: BookOpen },
    { num: 4, label: 'İlk Atamalar', desc: 'Eğitimleri atayın.', icon: UserCheck },
    { num: 5, label: 'Akademiniz Hazır!', desc: 'Kurulumu tamamlayın.', icon: CheckCircle2 }
  ];

  const handleNext = () => {
    completeStep(currentStep);
    if (currentStep < 5) {
      setStep(currentStep + 1);
    } else {
      finishOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setStep(currentStep - 1);
    }
  };

  const handleAddManualEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName || !manualEmail) return;
    addEmployee({
      name: manualName,
      email: manualEmail,
      department: manualDept,
      group: 'Tüm Çalışanlar',
      status: 'active'
    });
    setManualName('');
    setManualEmail('');
  };

  const handleBulkImport = () => {
    if (!excelText) return;
    importEmployees(excelText);
    setExcelText('');
    useAppStore.getState().showDialog({ type: 'success', message: `Çalışanlar başarıyla içe aktarıldı.` });
  };

  const toggleCourseSelection = (id: string) => {
    if (selectedCourseIds.includes(id)) {
      setSelectedCourseIds(selectedCourseIds.filter(cid => cid !== id));
    } else {
      setSelectedCourseIds([...selectedCourseIds, id]);
    }
  };

  // Mock template text for copying
  const mockExcelTemplate = "Ayşe Yılmaz, ayse.yilmaz@abcteknoloji.com, İnsan Kaynakları\nCan Soydan, can.soydan@abcteknoloji.com, Yazılım\nSelin Özer, selin.ozer@abcteknoloji.com, Pazarlama\nBora Yıldız, bora.yildiz@abcteknoloji.com, Satış";

  // Categories list
  const categories = ['Tümü', 'Onboarding', 'Compliance', 'Cyber Security', 'Soft Skills', 'Sales'];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* FTUE Header */}
      <header className="bg-white border-b border-outline-variant px-lg py-sm flex justify-between items-center shadow-soft">
        <div className="flex items-center gap-sm">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-bold text-white text-lg shadow-md">
            v
          </div>
          <div>
            <h1 className="text-headline-sm text-on-surface">vedubox <span className="text-primary font-bold">Start</span></h1>
            <p className="text-label-sm text-on-surface-variant font-medium">Hızlı Kurulum Sihirbazı</p>
          </div>
        </div>

        <div className="flex items-center gap-md">
          <span className="text-label-sm text-on-surface-variant">Kurulumu daha sonra tamamlayabilirsiniz.</span>
          <button 
            onClick={finishOnboarding}
            className="text-label-sm text-primary hover:underline font-semibold bg-primary-fixed px-sm py-xs rounded-lg transition-all"
          >
            Şimdi Atla
          </button>
        </div>
      </header>

      {/* Steps Indicator Bar */}
      <div className="bg-surface-container-low border-b border-outline-variant px-lg py-md">
        <div className="max-w-6xl mx-auto grid grid-cols-5 gap-sm md:gap-gutter">
          {stepsList.map((s) => {
            const Icon = s.icon;
            const isCompleted = completedSteps.includes(s.num);
            const isActive = currentStep === s.num;
            return (
              <div 
                key={s.num} 
                onClick={() => s.num < currentStep && setStep(s.num)}
                className={`flex flex-col md:flex-row items-center gap-sm p-sm rounded-xl cursor-pointer transition-all ${
                  isActive 
                    ? 'bg-white shadow-soft border border-primary/20 scale-[1.02]' 
                    : isCompleted
                      ? 'opacity-80 hover:opacity-100'
                      : 'opacity-50 pointer-events-none'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-label-sm ${
                  isCompleted 
                    ? 'bg-emerald-500 text-white' 
                    : isActive 
                      ? 'bg-primary text-white shadow-md shadow-primary/20' 
                      : 'bg-surface-dim text-on-surface-variant'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                </div>
                <div className="hidden md:block text-left">
                  <p className={`text-label-md leading-tight ${isActive ? 'text-primary font-bold' : 'text-on-surface font-semibold'}`}>
                    {s.label}
                  </p>
                  <p className="text-label-sm text-on-surface-variant text-[11px] leading-none mt-1">
                    {isActive ? 'Şu Anki Adım' : isCompleted ? 'Tamamlandı' : 'Bekliyor'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-lg flex flex-col justify-center">
        <div className="bg-white rounded-xl shadow-soft border border-outline-variant/60 overflow-hidden flex flex-col md:flex-row min-h-[500px]">
          
          {/* Welcome Banner Side Panel */}
          <div className="md:w-1/3 bg-gradient-to-br from-primary to-primary-container p-xl text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
            <div>
              <span className="text-label-sm uppercase tracking-wider text-primary-fixed/80 bg-white/10 px-xs py-[2px] rounded-full">
                Hoş Geldiniz!
              </span>
              <h2 className="text-headline-md leading-tight mt-sm">Akdeminizi 5 dakikada kurun 🚀</h2>
              <p className="text-body-sm mt-md text-primary-fixed/90">
                Sadece birkaç basit adımda şirket akademimizi oluşturup çalışanlarınızın gelişimini hemen başlatın.
              </p>
            </div>
            
            <div className="mt-xl pt-lg border-t border-white/10">
              <div className="flex items-center gap-sm text-primary-fixed">
                <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
                <span className="text-label-sm font-medium">WhatsApp seviyesinde sadelik</span>
              </div>
              <div className="flex items-center gap-sm text-primary-fixed mt-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
                <span className="text-label-sm font-medium">İSG, KVKK ve hazır eğitimler dahil</span>
              </div>
            </div>
          </div>

          {/* Form Step Render */}
          <div className="flex-1 p-xl flex flex-col justify-between bg-surface-container-lowest">
            <div className="flex-1">
              
              {/* STEP 1: Şirket Bilgileri */}
              {currentStep === 1 && (
                <div className="space-y-md">
                  <div>
                    <h3 className="text-headline-sm text-on-surface">1. Şirket Bilgileri</h3>
                    <p className="text-body-sm text-on-surface-variant mt-xs">Şirket bilgilerinizi girerek şirket akademinizin kurulumuna başlayalım.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md pt-sm">
                    <div className="space-y-xs">
                      <label className="text-label-md text-on-surface">Şirket Adı</label>
                      <input 
                        type="text" 
                        value={academyConfig.companyName}
                        onChange={(e) => updateAcademyConfig({ companyName: e.target.value, academyName: `${e.target.value.split(' ')[0]} Akademi` })}
                        className="w-full h-[46px] px-md bg-surface-container border border-outline-variant rounded-lg text-body-sm focus:outline-none focus:border-primary focus:bg-white transition-all"
                        placeholder="Örn: ABC Teknoloji A.Ş."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-sm">
                      <div className="space-y-xs">
                        <label className="text-label-md text-on-surface">Sektör</label>
                        <select 
                          value={academyConfig.sector}
                          onChange={(e) => updateAcademyConfig({ sector: e.target.value })}
                          className="w-full h-[46px] px-sm pr-10 bg-surface-container border border-outline-variant rounded-lg text-body-sm focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none"
                          style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                        >
                          <option>Teknoloji</option>
                          <option>Sağlık</option>
                          <option>Finans</option>
                          <option>Hizmet</option>
                          <option>Üretim</option>
                          <option>Eğitim</option>
                          <option>Diğer</option>
                        </select>
                      </div>

                      <div className="space-y-xs">
                        <label className="text-label-md text-on-surface">Şirket Büyüklüğü</label>
                        <select 
                          value={academyConfig.companySize}
                          onChange={(e) => updateAcademyConfig({ companySize: e.target.value })}
                          className="w-full h-[46px] px-sm pr-10 bg-surface-container border border-outline-variant rounded-lg text-body-sm focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none"
                          style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                        >
                          <option>1-10 çalışan</option>
                          <option>11-60 çalışan</option>
                          <option>61-100 çalışan</option>
                          <option>101-250 çalışan</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-xs">
                      <label className="text-label-md text-on-surface">Kuruluş Yılı</label>
                      <input 
                        type="text" 
                        value={academyConfig.establishmentYear}
                        onChange={(e) => updateAcademyConfig({ establishmentYear: e.target.value })}
                        className="w-full h-[46px] px-md bg-surface-container border border-outline-variant rounded-lg text-body-sm focus:outline-none focus:border-primary focus:bg-white transition-all"
                        placeholder="Örn: 2020"
                      />
                    </div>

                    <div className="space-y-xs">
                      <label className="text-label-md text-on-surface">Akademi Adı</label>
                      <input 
                        type="text" 
                        value={academyConfig.academyName}
                        onChange={(e) => updateAcademyConfig({ academyName: e.target.value })}
                        className="w-full h-[46px] px-md bg-surface-container border border-outline-variant rounded-lg text-body-sm focus:outline-none focus:border-primary focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-xs md:col-span-2">
                      <label className="text-label-md text-on-surface">Akademi Alt Alan Adı (Subdomain)</label>
                      <div className="flex items-center">
                        <input 
                          type="text" 
                          value={academyConfig.subdomain}
                          onChange={(e) => updateAcademyConfig({ subdomain: e.target.value })}
                          className="flex-1 h-[46px] px-md bg-surface-container border border-outline-variant rounded-l-lg text-body-sm focus:outline-none focus:border-primary focus:bg-white transition-all text-right"
                          placeholder="abc-akademi"
                        />
                        <span className="h-[46px] px-md flex items-center bg-surface-container-high border-y border-r border-outline-variant rounded-r-lg text-body-sm text-on-surface-variant font-medium">
                          .vedubox.com
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Çalışanlarınızı Ekleyin */}
              {currentStep === 2 && (
                <div className="space-y-md">
                  <div>
                    <h3 className="text-headline-sm text-on-surface">2. Çalışanlarınızı Ekleyin</h3>
                    <p className="text-body-sm text-on-surface-variant mt-xs">Çalışanlarınızı Excel ile topluca içe aktarabilir veya tek tek manuel ekleyebilirsiniz.</p>
                  </div>

                  {/* Tabs */}
                  <div className="flex border-b border-outline-variant pt-sm">
                    <button 
                      onClick={() => setActiveImportTab('excel')}
                      className={`px-md py-sm text-label-md font-semibold border-b-2 transition-all ${
                        activeImportTab === 'excel' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      Excel ile İçe Aktar
                    </button>
                    <button 
                      onClick={() => setActiveImportTab('manual')}
                      className={`px-md py-sm text-label-md font-semibold border-b-2 transition-all ${
                        activeImportTab === 'manual' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      Manuel Ekle
                    </button>
                  </div>

                  {/* Excel Import Simulation */}
                  {activeImportTab === 'excel' && (
                    <div className="space-y-md pt-sm">
                      <div className="border-2 border-dashed border-outline-variant rounded-xl p-lg bg-surface flex flex-col items-center justify-center text-center">
                        <Upload className="w-10 h-10 text-primary mb-sm" />
                        <p className="text-label-md text-on-surface font-semibold">Excel dosyanızı buraya sürükleyin</p>
                        <p className="text-label-sm text-on-surface-variant mt-xs">veya dosya seçin</p>
                        
                        <div className="mt-md flex gap-sm">
                          <button 
                            onClick={() => {
                              setExcelText(mockExcelTemplate);
                              useAppStore.getState().showDialog({ type: 'success', message: `Örnek şablon verisi yüklendi. Şimdi "Verileri İçe Aktar" düğmesine basabilirsiniz.` });
                            }}
                            className="px-md py-xs bg-white border border-outline-variant text-label-sm font-semibold rounded-lg hover:bg-surface-container transition-all text-primary"
                          >
                            Örnek Excel Şablonu Yükle
                          </button>
                        </div>
                      </div>

                      {/* Bulk text box area for simulated spreadsheet input */}
                      <div className="space-y-xs">
                        <label className="text-label-sm text-on-surface-variant font-medium">Toplu Metin İçe Aktarma (İsim, E-posta, Departman şeklinde satır satır):</label>
                        <textarea 
                          value={excelText}
                          onChange={(e) => setExcelText(e.target.value)}
                          rows={3}
                          placeholder="Örn: Ahmet Yılmaz, ahmet@sirket.com, Yazılım"
                          className="w-full p-sm bg-surface-container border border-outline-variant rounded-lg text-body-sm focus:outline-none focus:border-primary focus:bg-white"
                        />
                        <button 
                          onClick={handleBulkImport}
                          disabled={!excelText}
                          className="w-full py-xs bg-primary-container text-white text-label-sm font-bold rounded-lg hover:bg-primary transition-all disabled:opacity-50"
                        >
                          Verileri İçe Aktar
                        </button>
                      </div>

                      <div className="text-label-sm text-on-surface-variant space-y-xs bg-surface-container-low p-sm rounded-lg">
                        <p className="font-semibold text-on-surface">İpucu:</p>
                        <ul className="list-disc pl-sm space-y-1">
                          <li>Excel dosyanız .xlsx formatında olmalıdır.</li>
                          <li>En az Ad Soyad ve E-posta sütunları olmalıdır.</li>
                          <li>Maksimum dosya boyutu 5MB.</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Manual Entry */}
                  {activeImportTab === 'manual' && (
                    <div className="space-y-md pt-sm">
                      <form onSubmit={handleAddManualEmployee} className="grid grid-cols-1 md:grid-cols-3 gap-sm items-end bg-surface-container p-sm rounded-xl">
                        <div className="space-y-xs">
                          <label className="text-label-sm text-on-surface font-semibold">Çalışan Adı Soyadı</label>
                          <input 
                            type="text" 
                            value={manualName}
                            onChange={(e) => setManualName(e.target.value)}
                            placeholder="Ayşe Yılmaz"
                            className="w-full h-[46px] px-sm bg-white border border-outline-variant rounded-lg text-body-sm focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="space-y-xs">
                          <label className="text-label-sm text-on-surface font-semibold">E-posta Adresi</label>
                          <input 
                            type="email" 
                            value={manualEmail}
                            onChange={(e) => setManualEmail(e.target.value)}
                            placeholder="ayse@sirket.com"
                            className="w-full h-[46px] px-sm bg-white border border-outline-variant rounded-lg text-body-sm focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="flex gap-sm">
                          <div className="space-y-xs flex-1">
                            <label className="text-label-sm text-on-surface font-semibold">Departman</label>
                            <select 
                              value={manualDept}
                              onChange={(e) => setManualDept(e.target.value)}
                              className="w-full h-[46px] px-sm pr-10 bg-white border border-outline-variant rounded-lg text-body-sm focus:outline-none focus:border-primary appearance-none"
                              style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                            >
                              <option>Yazılım</option>
                              <option>Satış</option>
                              <option>Pazarlama</option>
                              <option>Tasarım</option>
                              <option>İnsan Kaynakları</option>
                              <option>Operasyon</option>
                            </select>
                          </div>
                          <button 
                            type="submit" 
                            className="h-[46px] w-[46px] bg-primary text-white rounded-lg hover:bg-primary-container transition-all shadow-md self-end flex items-center justify-center shrink-0"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      </form>

                      {/* Employees List View */}
                      <div className="space-y-sm">
                        <p className="text-label-md text-on-surface font-bold">Eklenen Çalışanlar ({employees.length})</p>
                        <div className="max-h-48 overflow-y-auto border border-outline-variant rounded-lg divide-y divide-outline-variant/60 bg-white">
                          {employees.map((emp) => (
                            <div key={emp.id} className="flex justify-between items-center px-md py-sm">
                              <div>
                                <p className="text-label-md text-on-surface font-semibold">{emp.name}</p>
                                <p className="text-label-sm text-on-surface-variant text-[11px]">{emp.email} • <span className="font-medium text-primary">{emp.department}</span></p>
                              </div>
                              <button 
                                onClick={() => removeEmployee(emp.id)}
                                className="text-rose-500 hover:text-rose-700 p-xs"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: Hazır Eğitim Seçin */}
              {currentStep === 3 && (
                <div className="space-y-md">
                  <div>
                    <h3 className="text-headline-sm text-on-surface">3. Hazır Eğitim Seçin</h3>
                    <p className="text-body-sm text-on-surface-variant mt-xs">İhtiyaçlarınıza uygun hazır eğitimleri seçin. Bu eğitimler kütüphanenize eklenecektir.</p>
                  </div>

                  {/* Search and Category Filter */}
                  <div className="flex flex-col md:flex-row gap-sm pt-sm">
                    <label className="h-[46px] w-[46px] flex items-center justify-center bg-surface-container border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-high transition-colors shrink-0" title="Tümünü Seç">
                      <input 
                        type="checkbox" 
                        checked={selectedCourseIds.length === courses.length && courses.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCourseIds(courses.map(c => c.id));
                          } else {
                            setSelectedCourseIds([]);
                          }
                        }}
                        className="w-5 h-5 text-primary accent-primary cursor-pointer" 
                      />
                    </label>
                    <div className="flex-1 relative">
                      <Search className="w-4 h-4 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Eğitim ara..."
                        className="w-full h-[46px] pl-9 pr-md bg-surface-container border border-outline-variant rounded-lg text-body-sm focus:outline-none focus:border-primary focus:bg-white transition-all"
                      />
                    </div>
                    <select 
                      value={selectedCategory} 
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="h-[46px] px-sm pr-10 bg-surface-container border border-outline-variant rounded-lg text-body-sm focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none"
                      style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                    >
                      {categories.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>

                  {/* Courses selection list */}
                  <div className="max-h-64 overflow-y-auto space-y-xs pr-xs divide-y divide-outline-variant/30">
                    {courses
                      .filter(c => {
                        const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
                        const matchesCat = selectedCategory === 'Tümü' || c.category === selectedCategory;
                        return matchesSearch && matchesCat;
                      })
                      .map((c) => {
                        const isChecked = selectedCourseIds.includes(c.id);
                        return (
                          <div 
                            key={c.id} 
                            onClick={() => toggleCourseSelection(c.id)}
                            className={`flex items-center gap-md p-md rounded-xl cursor-pointer transition-all border mt-2 ${
                              isChecked 
                                ? 'bg-primary-fixed/30 border-primary shadow-soft' 
                                : 'bg-white border-outline-variant/60 hover:bg-surface-container-low'
                            }`}
                          >
                            <input 
                              type="checkbox" 
                              checked={isChecked} 
                              onChange={() => {}} // Controlled via parent click
                              className="w-4 h-4 text-primary accent-primary" 
                            />
                            
                            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-lg shadow-inner">
                              {c.coverEmoji}
                            </div>
                            
                            <div className="flex-1">
                              <p className="text-label-md text-on-surface font-semibold">{c.title}</p>
                              <div className="flex items-center gap-xs mt-1">
                                <span className="px-xs py-[2px] bg-secondary-fixed text-[10px] rounded-full font-bold text-secondary text-scale-8">
                                  {c.category}
                                </span>
                                <span className="text-label-sm text-on-surface-variant text-[11px] font-medium">
                                  {c.duration} • {c.modulesCount} Modül
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  
                  <div className="flex justify-between items-center p-sm bg-surface-container rounded-lg text-label-sm">
                    <span className="font-semibold text-on-surface">Seçilen Eğitim Sayısı:</span>
                    <span className="text-primary font-bold text-body-md">{selectedCourseIds.length} Eğitim</span>
                  </div>
                </div>
              )}

              {/* STEP 4: İlk Atamalarınızı Yapın */}
              {currentStep === 4 && (
                <div className="space-y-md">
                  <div>
                    <h3 className="text-headline-sm text-on-surface">4. İlk Atamalarınızı Yapın</h3>
                    <p className="text-body-sm text-on-surface-variant mt-xs">Seçtiğiniz eğitimleri çalışanlarınıza atayarak eğitim süreçlerini başlatın.</p>
                  </div>

                  <div className="space-y-lg pt-sm">
                    {/* Scope Selector */}
                    <div className="space-y-xs">
                      <label className="text-label-md text-on-surface font-bold">Atama Kapsamı</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-sm">
                        <div 
                          onClick={() => setAssignmentScope('all')}
                          className={`p-md rounded-xl border cursor-pointer transition-all ${
                            assignmentScope === 'all' ? 'bg-primary-fixed/30 border-primary shadow-soft' : 'bg-white border-outline-variant/60 hover:bg-surface-container-low'
                          }`}
                        >
                          <p className="text-label-md font-bold text-on-surface">Tüm Çalışanlar</p>
                          <p className="text-label-sm text-on-surface-variant text-[11px] mt-xs">Tüm çalışanlara ata ({employees.length} kişi)</p>
                        </div>
                        <div 
                          onClick={() => setAssignmentScope('department')}
                          className={`p-md rounded-xl border cursor-pointer transition-all ${
                            assignmentScope === 'department' ? 'bg-primary-fixed/30 border-primary shadow-soft' : 'bg-white border-outline-variant/60 hover:bg-surface-container-low'
                          }`}
                        >
                          <p className="text-label-md font-bold text-on-surface">Departman Bazlı</p>
                          <p className="text-label-sm text-on-surface-variant text-[11px] mt-xs">Seçili departmanlara ata</p>
                        </div>
                        <div 
                          onClick={() => setAssignmentScope('new')}
                          className={`p-md rounded-xl border cursor-pointer transition-all ${
                            assignmentScope === 'new' ? 'bg-primary-fixed/30 border-primary shadow-soft' : 'bg-white border-outline-variant/60 hover:bg-surface-container-low'
                          }`}
                        >
                          <p className="text-label-md font-bold text-on-surface">Yeni Çalışanlar</p>
                          <p className="text-label-sm text-on-surface-variant text-[11px] mt-xs">Sadece yeni eklenen çalışanlara ata</p>
                        </div>
                      </div>
                    </div>

                    {/* Time Selector */}
                    <div className="space-y-xs">
                      <label className="text-label-md text-on-surface font-bold">Atama Zamanı</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
                        <div 
                          onClick={() => setAssignmentTime('immediate')}
                          className={`p-md rounded-xl border cursor-pointer transition-all ${
                            assignmentTime === 'immediate' ? 'bg-primary-fixed/30 border-primary shadow-soft' : 'bg-white border-outline-variant/60 hover:bg-surface-container-low'
                          }`}
                        >
                          <p className="text-label-md font-bold text-on-surface">Hemen Ata</p>
                          <p className="text-label-sm text-on-surface-variant text-[11px] mt-xs">Çalışanlar hemen erişebilir</p>
                        </div>
                        <div 
                          onClick={() => setAssignmentTime('scheduled')}
                          className={`p-md rounded-xl border cursor-pointer transition-all ${
                            assignmentTime === 'scheduled' ? 'bg-primary-fixed/30 border-primary shadow-soft' : 'bg-white border-outline-variant/60 hover:bg-surface-container-low'
                          }`}
                        >
                          <p className="text-label-md font-bold text-on-surface">İleri Tarihli Ata</p>
                          <p className="text-label-sm text-on-surface-variant text-[11px] mt-xs">Belirli bir tarihte başlasın</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Akademiniz Hazır! */}
              {currentStep === 5 && (
                <div className="space-y-md text-center py-lg">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-500 shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <div className="space-y-sm">
                    <h3 className="text-headline-md text-on-surface font-bold">Tebrikler! Akademiniz Hazır! 🎉</h3>
                    <p className="text-body-sm text-on-surface-variant max-w-md mx-auto">
                      Tüm kurulum adımlarını başarıyla tamamladınız. Akademiniz yayında ve çalışanlarınız eğitimlerine başlamaya hazır!
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-sm max-w-sm mx-auto pt-md">
                    <div className="bg-surface-container p-sm rounded-lg border border-outline-variant">
                      <p className="text-label-sm text-on-surface-variant">Çalışanlar</p>
                      <p className="text-headline-sm text-primary font-bold">{employees.length}</p>
                    </div>
                    <div className="bg-surface-container p-sm rounded-lg border border-outline-variant">
                      <p className="text-label-sm text-on-surface-variant">Eğitimler</p>
                      <p className="text-headline-sm text-primary font-bold">{selectedCourseIds.length}</p>
                    </div>
                    <div className="bg-surface-container p-sm rounded-lg border border-outline-variant">
                      <p className="text-label-sm text-on-surface-variant">Atamalar</p>
                      <p className="text-headline-sm text-primary font-bold">Hazır</p>
                    </div>
                  </div>
                  
                  <div className="bg-primary-fixed/20 p-sm rounded-xl max-w-md mx-auto border border-primary/10 mt-md">
                    <p className="text-label-sm text-primary font-semibold">
                      Akademi Linkiniz: <a href={`https://${academyConfig.subdomain}.vedubox.com`} className="underline hover:text-primary-container" target="_blank" rel="noreferrer">{academyConfig.subdomain}.vedubox.com</a>
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Next/Back Action Buttons */}
            <div className="border-t border-outline-variant/60 pt-md mt-lg flex justify-between items-center">
              <button 
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-lg py-xs border border-outline-variant text-label-md font-semibold rounded-lg hover:bg-surface-container transition-all flex items-center gap-xs disabled:opacity-40"
              >
                <ArrowLeft className="w-4 h-4" />
                Vazgeç
              </button>

              <button 
                onClick={handleNext}
                className="px-xl py-xs bg-primary text-white text-label-md font-bold rounded-lg hover:bg-primary-container shadow-md shadow-primary/20 transition-all flex items-center gap-xs"
              >
                {currentStep === 5 ? 'Akademiye Git' : 'Devam Et'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </main>

      {/* Footer hint */}
      <footer className="text-center py-md text-label-sm text-on-surface-variant bg-surface-container-low border-t border-outline-variant/40">
        💡 <b>İpucu:</b> Tüm adımları tamamladığınızda çalışanlarınız e-posta bildirimi alır ve hemen eğitimlere başlayabilir.
      </footer>
    </div>
  );
}
