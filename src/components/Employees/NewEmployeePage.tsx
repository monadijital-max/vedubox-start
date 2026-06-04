import React, { useState } from 'react';
import { ArrowLeft, Save, User, Mail, Lock, Phone, MapPin, FileText } from 'lucide-react';
import { useAppStore } from '@/store/store';
import turkeyData from '@/lib/turkey-data.json';

interface NewEmployeePageProps {
  onBack: () => void;
}

export default function NewEmployeePage({ onBack }: NewEmployeePageProps) {
  const { addEmployee, showDialog, departments } = useAppStore();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    phone: '',
    description: '',
    city: '',
    district: '',
    address: '',
    department: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      // Reset district if city changes
      if (name === 'city') {
        newData.district = '';
      }
      return newData;
    });
  };

  const selectedCityData = turkeyData.find(city => city.il_adi === formData.city);
  const districts = selectedCityData ? selectedCityData.ilceler : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) {
      showDialog({
        type: 'warning',
        message: 'Lütfen zorunlu alanları doldurun (Ad, Soyad, E-posta).'
      });
      return;
    }

    addEmployee({
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      username: formData.username,
      password: formData.password,
      phone: formData.phone,
      city: formData.city,
      district: formData.district,
      address: formData.address,
      description: formData.description,
      department: formData.department || 'Genel',
      group: 'Tüm Çalışanlar',
      role: 'Öğrenci / Çalışan'
    });

    showDialog({
      type: 'success',
      message: `${formData.firstName} ${formData.lastName} başarıyla sisteme eklendi.`
    });

    onBack();
  };

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#1e1e2d]">Yeni Kullanıcı Ekle</h1>
            <p className="text-sm text-slate-500 mt-1">Sisteme yeni bir kullanıcı tanımlamak için aşağıdaki bilgileri doldurun.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onBack}
            className="px-6 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            İptal
          </button>
          <button 
            onClick={handleSubmit}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Kaydet
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8">
          
          <form className="space-y-8">
            
            {/* Temel Bilgiler */}
            <div>
              <h3 className="text-lg font-semibold text-[#1e1e2d] mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                <User className="w-5 h-5 text-indigo-500" />
                Temel Bilgiler
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Ad <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                    placeholder="Kullanıcının adı"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Soyad <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                    placeholder="Kullanıcının soyadı"
                  />
                </div>
              </div>
            </div>

            {/* Hesap Bilgileri */}
            <div>
              <h3 className="text-lg font-semibold text-[#1e1e2d] mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Lock className="w-5 h-5 text-indigo-500" />
                Hesap Bilgileri
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">E-posta <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                      placeholder="ornek@sirket.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Kullanıcı Adı</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                      placeholder="kullanici_adi"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Şifre</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="password" 
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* İletişim ve Adres */}
            <div>
              <h3 className="text-lg font-semibold text-[#1e1e2d] mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                <MapPin className="w-5 h-5 text-indigo-500" />
                İletişim & Adres
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">GSM Numarası</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                      placeholder="05XX XXX XX XX"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">İl</label>
                  <select 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                  >
                    <option value="">İl Seçiniz</option>
                    {turkeyData.map(city => (
                      <option key={city.il_adi} value={city.il_adi}>{city.il_adi}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">İlçe</label>
                  <select 
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    disabled={!formData.city}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">İlçe Seçiniz</option>
                    {districts.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Açık Adres</label>
                <textarea 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm resize-none"
                  placeholder="Mahalle, sokak, bina ve daire no..."
                />
              </div>
            </div>

            {/* Diğer Detaylar */}
            <div>
              <h3 className="text-lg font-semibold text-[#1e1e2d] mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                <FileText className="w-5 h-5 text-indigo-500" />
                Diğer
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Departman</label>
                  <select 
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                  >
                    <option value="">Departman Seçiniz</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Açıklama</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm resize-none"
                  placeholder="Kullanıcı hakkında ek bilgiler veya notlar..."
                />
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
