'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, PlayCircle, BookOpen, MonitorPlay, Users, Award, CheckCircle2, Star, Clock } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fcf9f5] font-sans text-[#2c333f]">
      
      {/* Header */}
      <header className="fixed top-0 inset-x-0 bg-white/90 backdrop-blur-md z-50 border-b border-[#f0ebe4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="text-2xl font-black text-[#2c333f] tracking-tight flex items-center gap-2.5">
              <div className="w-10 h-10 bg-[#383FD8] rounded-xl flex items-center justify-center text-white">
                <span className="text-xl font-black leading-none">V</span>
              </div>
              Vedubox
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-10">
              <a href="#ozellikler" className="text-[15px] font-semibold text-[#5a6270] hover:text-[#383FD8] transition-colors">Özellikler</a>
              <a href="#egitimler" className="text-[15px] font-semibold text-[#5a6270] hover:text-[#383FD8] transition-colors">Eğitimler</a>
              <a href="#yorumlar" className="text-[15px] font-semibold text-[#5a6270] hover:text-[#383FD8] transition-colors">Yorumlar</a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard"
                className="hidden md:flex items-center justify-center px-5 py-2.5 text-[15px] font-semibold text-[#5a6270] hover:text-[#383FD8] transition-colors"
              >
                Giriş Yap
              </Link>
              <Link 
                href="/dashboard"
                className="flex items-center justify-center px-7 py-3 bg-[#383FD8] text-white text-[15px] font-bold rounded-2xl hover:bg-[#2d32b0] transition-all shadow-lg shadow-[#383FD8]/25 hover:shadow-[#383FD8]/40 hover:-translate-y-0.5"
              >
                Yönetim Paneli
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-28 lg:pt-28 lg:pb-40">
          {/* Gradient blobs */}
          <div className="absolute top-[-100px] right-[-200px] w-[600px] h-[600px] bg-gradient-to-br from-[#383FD8]/8 to-indigo-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] bg-gradient-to-br from-amber-100/40 to-orange-50/40 rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Hero Content */}
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#eee5da] text-[#383FD8] font-bold text-[13px] uppercase tracking-wider mb-8 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#383FD8] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#383FD8]"></span>
                  </span>
                  Eğitimde Modern Çözüm
                </div>
                <h1 className="text-5xl lg:text-[68px] font-black text-[#2c333f] leading-[1.08] mb-8 tracking-tight">
                  Çalışanlarınızı <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#383FD8] to-[#6366f1]">İlhamla</span> Eğitin.
                </h1>
                <p className="text-lg text-[#6b7280] mb-10 leading-relaxed">
                  Vedubox ile şirket içi eğitim süreçlerinizi tek bir çatı altında toplayın. Yapay zeka destekli altyapımızla öğrenme kültürünüzü dönüştürün.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/dashboard"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-[#383FD8] text-white font-bold rounded-2xl hover:bg-[#2d32b0] transition-all shadow-xl shadow-[#383FD8]/25 hover:shadow-[#383FD8]/40 hover:-translate-y-1 text-[16px]"
                  >
                    Ücretsiz Dene <ArrowRight className="w-5 h-5" />
                  </Link>
                  <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#2c333f] font-bold rounded-2xl hover:bg-gray-50 transition-all border border-[#e5ddd4] shadow-md hover:-translate-y-1 text-[16px]">
                    <PlayCircle className="w-5 h-5 text-[#383FD8]" /> Tanıtım Videosu
                  </button>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative hidden lg:block">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-white">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000" 
                    alt="Corporate training session" 
                    className="w-full h-[420px] object-cover"
                  />
                </div>
                {/* Floating Badge - Top Left */}
                <div className="absolute -top-4 -left-6 bg-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Tamamlanma</p>
                    <p className="text-xl font-black text-[#2c333f]">%94</p>
                  </div>
                </div>
                {/* Floating Badge - Bottom Right */}
                <div className="absolute -bottom-4 -right-6 bg-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100">
                  <div className="w-12 h-12 bg-[#383FD8]/10 rounded-full flex items-center justify-center text-[#383FD8]">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Aktif Öğrenci</p>
                    <p className="text-xl font-black text-[#2c333f]">1.2M+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="ozellikler" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[#383FD8] font-bold uppercase tracking-wider text-[13px] mb-3 block">Neden Vedubox?</span>
              <h2 className="text-4xl lg:text-[44px] font-black text-[#2c333f] mb-5">Her Şey Tek Platformda</h2>
              <p className="text-lg text-[#6b7280]">Farklı araçlar arasında kaybolmayın. Eğitim, iletişim ve raporlama için ihtiyacınız olan her şey parmaklarınızın ucunda.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group bg-[#fcf9f5] border border-[#f0ebe4] p-10 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-[#383FD8]/5 transition-all duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 rounded-full bg-white text-[#383FD8] flex items-center justify-center mb-7 shadow-sm group-hover:scale-110 group-hover:bg-[#383FD8] group-hover:text-white transition-all duration-300">
                  <MonitorPlay className="w-9 h-9" />
                </div>
                <h3 className="text-xl font-bold text-[#2c333f] mb-4">Canlı Eğitim</h3>
                <p className="text-[#6b7280] leading-relaxed">Zoom, Teams ve Meet entegrasyonları ile kesintisiz ve yüksek etkileşimli canlı dersler düzenleyin.</p>
              </div>

              {/* Feature 2 */}
              <div className="group bg-[#fcf9f5] border border-[#f0ebe4] p-10 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-[#383FD8]/5 transition-all duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 rounded-full bg-white text-[#383FD8] flex items-center justify-center mb-7 shadow-sm group-hover:scale-110 group-hover:bg-[#383FD8] group-hover:text-white transition-all duration-300">
                  <BookOpen className="w-9 h-9" />
                </div>
                <h3 className="text-xl font-bold text-[#2c333f] mb-4">Gelişmiş LMS</h3>
                <p className="text-[#6b7280] leading-relaxed">Video, PDF, SCORM formatında içerikler yükleyin, kişiselleştirilmiş öğrenme yolları oluşturun.</p>
              </div>

              {/* Feature 3 */}
              <div className="group bg-[#fcf9f5] border border-[#f0ebe4] p-10 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-[#383FD8]/5 transition-all duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 rounded-full bg-white text-[#383FD8] flex items-center justify-center mb-7 shadow-sm group-hover:scale-110 group-hover:bg-[#383FD8] group-hover:text-white transition-all duration-300">
                  <Award className="w-9 h-9" />
                </div>
                <h3 className="text-xl font-bold text-[#2c333f] mb-4">Sınav ve Sertifika</h3>
                <p className="text-[#6b7280] leading-relaxed">Güvenli çevrimiçi sınavlar yapın, başarılı öğrencilere sistem üzerinden anında dijital sertifika verin.</p>
              </div>
            </div>

            {/* Additional Features Row */}
            <div className="grid md:grid-cols-4 gap-6 mt-12">
              {[
                { icon: '📱', title: 'Mobil Uyumluluk', desc: 'Her cihazdan erişim' },
                { icon: '🔒', title: 'KVKK Uyumu', desc: 'Tam veri güvenliği' },
                { icon: '📊', title: 'Detaylı Raporlama', desc: 'Anlık analitikler' },
                { icon: '🤖', title: 'AI Destekli', desc: 'Otomatik içerik üretimi' },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-4 bg-white border border-[#f0ebe4] p-5 rounded-2xl hover:shadow-md transition-all">
                  <span className="text-3xl">{f.icon}</span>
                  <div>
                    <h4 className="font-bold text-[#2c333f] text-[15px]">{f.title}</h4>
                    <p className="text-sm text-[#9ca3af]">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Courses Section */}
        <section id="egitimler" className="py-24 bg-[#fcf9f5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
              <div>
                <span className="text-[#383FD8] font-bold uppercase tracking-wider text-[13px] mb-3 block">Sürekli Gelişim</span>
                <h2 className="text-4xl lg:text-[44px] font-black text-[#2c333f]">Popüler Eğitimler</h2>
              </div>
              <Link href="/dashboard" className="inline-flex items-center gap-2 font-bold text-[#383FD8] hover:text-[#2d32b0] transition-colors group text-[15px]">
                Tüm Eğitimleri Gör <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Course 1 */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-md shadow-gray-200/60 hover:shadow-xl transition-all duration-300 group">
                <div className="h-52 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800" alt="Course" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 font-bold text-sm text-[#2c333f] shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> 4.9
                  </div>
                </div>
                <div className="p-7">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[12px] font-bold uppercase tracking-wider">Oryantasyon</span>
                  <h3 className="text-lg font-bold text-[#2c333f] mt-3 mb-2 group-hover:text-[#383FD8] transition-colors leading-snug">Etkili İletişim ve Takım Çalışması</h3>
                  <div className="flex items-center gap-2 text-sm text-[#9ca3af]">
                    <Clock className="w-4 h-4" /> 2 Saat
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#f0ebe4]">
                    <div className="flex items-center gap-2.5">
                      <img src="https://i.pravatar.cc/150?img=32" alt="Instructor" className="w-8 h-8 rounded-full" />
                      <span className="font-semibold text-sm text-[#5a6270]">Ayşe Yılmaz</span>
                    </div>
                    <span className="font-black text-[#383FD8]">Ücretsiz</span>
                  </div>
                </div>
              </div>

              {/* Course 2 */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-md shadow-gray-200/60 hover:shadow-xl transition-all duration-300 group">
                <div className="h-52 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800" alt="Course" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 font-bold text-sm text-[#2c333f] shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> 4.8
                  </div>
                </div>
                <div className="p-7">
                  <span className="px-3 py-1 bg-red-50 text-red-500 rounded-lg text-[12px] font-bold uppercase tracking-wider">Liderlik</span>
                  <h3 className="text-lg font-bold text-[#2c333f] mt-3 mb-2 group-hover:text-[#383FD8] transition-colors leading-snug">Kriz Yönetimi ve Karar Alma</h3>
                  <div className="flex items-center gap-2 text-sm text-[#9ca3af]">
                    <Clock className="w-4 h-4" /> 4.5 Saat
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#f0ebe4]">
                    <div className="flex items-center gap-2.5">
                      <img src="https://i.pravatar.cc/150?img=11" alt="Instructor" className="w-8 h-8 rounded-full" />
                      <span className="font-semibold text-sm text-[#5a6270]">Ahmet Demir</span>
                    </div>
                    <span className="font-black text-[#383FD8]">Premium</span>
                  </div>
                </div>
              </div>

              {/* Course 3 */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-md shadow-gray-200/60 hover:shadow-xl transition-all duration-300 group">
                <div className="h-52 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800" alt="Course" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 font-bold text-sm text-[#2c333f] shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> 5.0
                  </div>
                </div>
                <div className="p-7">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[12px] font-bold uppercase tracking-wider">Teknoloji</span>
                  <h3 className="text-lg font-bold text-[#2c333f] mt-3 mb-2 group-hover:text-[#383FD8] transition-colors leading-snug">Yapay Zeka ve Üretkenlik</h3>
                  <div className="flex items-center gap-2 text-sm text-[#9ca3af]">
                    <Clock className="w-4 h-4" /> 6 Saat
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#f0ebe4]">
                    <div className="flex items-center gap-2.5">
                      <img src="https://i.pravatar.cc/150?img=68" alt="Instructor" className="w-8 h-8 rounded-full" />
                      <span className="font-semibold text-sm text-[#5a6270]">Zeynep Kaya</span>
                    </div>
                    <span className="font-black text-[#383FD8]">Ücretsiz</span>
                  </div>
                </div>
              </div>

              {/* Course 4 */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-md shadow-gray-200/60 hover:shadow-xl transition-all duration-300 group">
                <div className="h-52 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800" alt="Course" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 font-bold text-sm text-[#2c333f] shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> 4.7
                  </div>
                </div>
                <div className="p-7">
                  <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-lg text-[12px] font-bold uppercase tracking-wider">İnsan Kaynakları</span>
                  <h3 className="text-lg font-bold text-[#2c333f] mt-3 mb-2 group-hover:text-[#383FD8] transition-colors leading-snug">KVKK ve Veri Gizliliği Eğitimi</h3>
                  <div className="flex items-center gap-2 text-sm text-[#9ca3af]">
                    <Clock className="w-4 h-4" /> 3 Saat
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#f0ebe4]">
                    <div className="flex items-center gap-2.5">
                      <img src="https://i.pravatar.cc/150?img=23" alt="Instructor" className="w-8 h-8 rounded-full" />
                      <span className="font-semibold text-sm text-[#5a6270]">Selin Arslan</span>
                    </div>
                    <span className="font-black text-[#383FD8]">Ücretsiz</span>
                  </div>
                </div>
              </div>

              {/* Course 5 */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-md shadow-gray-200/60 hover:shadow-xl transition-all duration-300 group">
                <div className="h-52 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800" alt="Course" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 font-bold text-sm text-[#2c333f] shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> 4.6
                  </div>
                </div>
                <div className="p-7">
                  <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[12px] font-bold uppercase tracking-wider">Satış</span>
                  <h3 className="text-lg font-bold text-[#2c333f] mt-3 mb-2 group-hover:text-[#383FD8] transition-colors leading-snug">Dijital Pazarlama Stratejileri</h3>
                  <div className="flex items-center gap-2 text-sm text-[#9ca3af]">
                    <Clock className="w-4 h-4" /> 5 Saat
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#f0ebe4]">
                    <div className="flex items-center gap-2.5">
                      <img src="https://i.pravatar.cc/150?img=53" alt="Instructor" className="w-8 h-8 rounded-full" />
                      <span className="font-semibold text-sm text-[#5a6270]">Burak Özkan</span>
                    </div>
                    <span className="font-black text-[#383FD8]">Premium</span>
                  </div>
                </div>
              </div>

              {/* Course 6 */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-md shadow-gray-200/60 hover:shadow-xl transition-all duration-300 group">
                <div className="h-52 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800" alt="Course" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 font-bold text-sm text-[#2c333f] shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> 4.9
                  </div>
                </div>
                <div className="p-7">
                  <span className="px-3 py-1 bg-cyan-50 text-cyan-600 rounded-lg text-[12px] font-bold uppercase tracking-wider">İş Güvenliği</span>
                  <h3 className="text-lg font-bold text-[#2c333f] mt-3 mb-2 group-hover:text-[#383FD8] transition-colors leading-snug">İş Sağlığı ve Güvenliği Temelleri</h3>
                  <div className="flex items-center gap-2 text-sm text-[#9ca3af]">
                    <Clock className="w-4 h-4" /> 2.5 Saat
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#f0ebe4]">
                    <div className="flex items-center gap-2.5">
                      <img src="https://i.pravatar.cc/150?img=15" alt="Instructor" className="w-8 h-8 rounded-full" />
                      <span className="font-semibold text-sm text-[#5a6270]">Deniz Yılmaz</span>
                    </div>
                    <span className="font-black text-[#383FD8]">Ücretsiz</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Counter */}
        <section className="py-20 bg-[#383FD8] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoLTZWMzRoNnptMC0zMHY2aC02VjRoNnptMCAxMnY2aC02VjE2aDZ6bTAgMTJ2NmgtNlYyOGg2em0tMTIgNnY2aC02di02aDZ6bTAtMTJ2NmgtNlYyMmg2em0wLTEydjZoLTZWMTBoNnptMTIgMjR2NmgtNlYzNGg2em0xMi0xMnY2aC02VjIyaDZ6bTAtMTJ2NmgtNlYxMGg2em0wIDI0djZoLTZWMzRoNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
              <div>
                <div className="text-5xl lg:text-6xl font-black text-white mb-2">500<span className="text-white/40">+</span></div>
                <p className="text-white/70 font-semibold uppercase tracking-wider text-sm">Kurumsal Müşteri</p>
              </div>
              <div>
                <div className="text-5xl lg:text-6xl font-black text-white mb-2">1.2M<span className="text-white/40">+</span></div>
                <p className="text-white/70 font-semibold uppercase tracking-wider text-sm">Aktif Kullanıcı</p>
              </div>
              <div>
                <div className="text-5xl lg:text-6xl font-black text-white mb-2">15<span className="text-white/40">+</span></div>
                <p className="text-white/70 font-semibold uppercase tracking-wider text-sm">Dil Seçeneği</p>
              </div>
              <div>
                <div className="text-5xl lg:text-6xl font-black text-white mb-2">%100</div>
                <p className="text-white/70 font-semibold uppercase tracking-wider text-sm">Bulut Tabanlı</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="yorumlar" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[#383FD8] font-bold uppercase tracking-wider text-[13px] mb-3 block">Müşteri Yorumları</span>
              <h2 className="text-4xl lg:text-[44px] font-black text-[#2c333f]">Kullanıcılarımız Ne Diyor?</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Review 1 */}
              <div className="bg-[#fcf9f5] p-8 rounded-3xl border border-[#f0ebe4] relative">
                <div className="flex items-center gap-4 mb-6">
                  <img src="https://i.pravatar.cc/150?img=47" alt="User" className="w-14 h-14 rounded-full border-3 border-white shadow-md" />
                  <div>
                    <h4 className="font-bold text-[#2c333f]">Mert Gürsoy</h4>
                    <span className="text-sm text-[#9ca3af]">İnsan Kaynakları Direktörü</span>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-[#5a6270] leading-relaxed">"Vedubox sayesinde şirket içi tüm eğitimlerimizi tek bir ekrana taşıdık. Arayüzün sadeliği ve kullanım kolaylığı personelimizin adaptasyonunu çok hızlandırdı."</p>
              </div>

              {/* Review 2 */}
              <div className="bg-[#fcf9f5] p-8 rounded-3xl border border-[#f0ebe4] relative md:-translate-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <img src="https://i.pravatar.cc/150?img=44" alt="User" className="w-14 h-14 rounded-full border-3 border-white shadow-md" />
                  <div>
                    <h4 className="font-bold text-[#2c333f]">Elif Yıldırım</h4>
                    <span className="text-sm text-[#9ca3af]">Eğitim Yöneticisi</span>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-[#5a6270] leading-relaxed">"Yapay zeka ile eğitim oluşturma özelliği inanılmaz zaman kazandırıyor. Eğitim sertifikalarını dijital olarak dağıtabilmek operasyonel yükümüzü sıfıra indirdi."</p>
              </div>

              {/* Review 3 */}
              <div className="bg-[#fcf9f5] p-8 rounded-3xl border border-[#f0ebe4] relative">
                <div className="flex items-center gap-4 mb-6">
                  <img src="https://i.pravatar.cc/150?img=12" alt="User" className="w-14 h-14 rounded-full border-3 border-white shadow-md" />
                  <div>
                    <h4 className="font-bold text-[#2c333f]">Caner Tekin</h4>
                    <span className="text-sm text-[#9ca3af]">Satış Direktörü</span>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-[#5a6270] leading-relaxed">"Satış ekibimizin ürün eğitimlerini Vedubox'a taşıdıktan sonra sahadaki performanslarında belirgin bir artış gözlemledik. Raporlama araçları çok başarılı."</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-[#fcf9f5]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white p-14 md:p-20 rounded-[2rem] border border-[#f0ebe4] shadow-xl shadow-gray-200/30">
              <h2 className="text-3xl lg:text-[42px] font-black text-[#2c333f] mb-5 leading-tight">Öğrenme Kültürünüzü<br/>Bugünden Dönüştürün</h2>
              <p className="text-lg text-[#6b7280] mb-10 max-w-xl mx-auto">Kurulum gerektirmeden, 5 dakika içerisinde kendi akademinizi kurun ve çalışanlarınızı eğitmeye başlayın.</p>
              <Link 
                href="/dashboard"
                className="inline-flex items-center justify-center px-10 py-4 bg-[#383FD8] text-white font-bold rounded-2xl hover:bg-[#2d32b0] transition-all shadow-xl shadow-[#383FD8]/25 hover:shadow-[#383FD8]/40 hover:-translate-y-1 text-lg"
              >
                Hemen Başlayın
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1e2330] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 bg-[#383FD8] rounded-xl flex items-center justify-center text-white">
                  <span className="text-lg font-black leading-none">V</span>
                </div>
                <span className="text-xl font-black tracking-tight">Vedubox</span>
              </div>
              <p className="text-gray-400 text-[15px] max-w-sm leading-relaxed">Kurumunuzun tüm eğitim, iletişim ve etkileşim ihtiyaçlarını tek bir platformda birleştiren yeni nesil E-Learning çözümü.</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-5 text-white">Hızlı Linkler</h4>
              <ul className="space-y-3">
                <li><a href="#ozellikler" className="text-gray-400 hover:text-[#383FD8] transition-colors text-[15px]">Özellikler</a></li>
                <li><a href="#egitimler" className="text-gray-400 hover:text-[#383FD8] transition-colors text-[15px]">Eğitimler</a></li>
                <li><a href="#yorumlar" className="text-gray-400 hover:text-[#383FD8] transition-colors text-[15px]">Yorumlar</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#383FD8] transition-colors text-[15px]">İletişim</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-5 text-white">Bize Ulaşın</h4>
              <ul className="space-y-3">
                <li className="text-gray-400 text-[15px]">info@vedubox.com</li>
                <li className="text-gray-400 text-[15px]">+90 850 123 45 67</li>
                <li className="flex gap-3 mt-5">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#383FD8] transition-colors cursor-pointer text-sm font-bold">IN</div>
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#383FD8] transition-colors cursor-pointer text-sm font-bold">TW</div>
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#383FD8] transition-colors cursor-pointer text-sm font-bold">FB</div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Vedubox. Tüm hakları saklıdır.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a>
              <a href="#" className="hover:text-white transition-colors">Kullanım Şartları</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
