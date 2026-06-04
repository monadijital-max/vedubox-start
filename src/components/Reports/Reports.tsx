'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function Reports() {
  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-primary">Raporlar & Analizler</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 p-6 flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium text-on-surface-variant">Aylık Tamamlanma Oranı</p>
            <div className="flex items-end gap-3 mt-2">
              <h3 className="text-4xl font-bold text-primary">84%</h3>
              <span className="text-sm font-bold text-emerald-600 mb-1">↑ 12% artış</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <div className="flex justify-between items-center text-sm border-b border-outline-variant/20 pb-2">
              <span className="text-on-surface-variant">Tamamlanan Eğitim</span>
              <span className="font-bold text-on-surface">1,245</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-outline-variant/20 pb-2">
              <span className="text-on-surface-variant">Devam Eden Eğitim</span>
              <span className="font-bold text-on-surface">320</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-on-surface-variant">Genel Başarı Oranı</span>
              <span className="font-bold text-emerald-600">92%</span>
            </div>
          </div>
        </div>

        {/* Top Middle: Aktif Eğitimler */}
        <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-sm font-medium text-on-surface-variant">Aktif Eğitimler</p>
            <h3 className="text-4xl font-bold text-on-surface mt-2">124</h3>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="px-2 py-0.5 bg-violet-500 text-white text-xs font-bold rounded-full w-10 text-center">+12</span>
                <span className="text-on-surface-variant font-medium">Bu hafta eklenen</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full w-10 text-center">+5</span>
                <span className="text-on-surface-variant font-medium">Yayına alınacak</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Right: Kritik Uyarı */}
        <div className="bg-rose-50 rounded-xl border border-rose-200 p-6 flex flex-col justify-between">
          <div>
            <p className="text-sm font-bold text-rose-700 mb-2">Sınav İstatistikleri</p>
            <div className="space-y-3 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-rose-900 font-medium">Toplam Tamamlanan Sınav</span>
                <span className="font-bold text-rose-700">856</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-rose-900 font-medium">Bu Ayki Sınav Sayısı</span>
                <span className="font-bold text-rose-700">142</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-rose-900 font-medium">Başarısız Sınav Oranı</span>
                <span className="font-bold text-rose-700">%8</span>
              </div>
            </div>
          </div>
          <button className="text-rose-700 text-sm font-bold flex items-center gap-1 mt-4 hover:underline w-max">
            Detayı Gör <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Middle Left: Kullanıcı İşlemleri */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-outline-variant/30 p-6 h-[320px] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-on-surface">Kullanıcı İşlemleri</h3>
            <button className="text-xs font-bold text-primary hover:underline">Tümünü Gör</button>
          </div>
          <div className="flex-1 overflow-auto border border-outline-variant/30 rounded-lg">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-on-surface-variant uppercase bg-white z-10 sticky top-0 border-b border-outline-variant/30 shadow-sm">
                <tr>
                  <th className="px-4 py-3 font-semibold">Tarih</th>
                  <th className="px-4 py-3 font-semibold">Kullanıcı</th>
                  <th className="px-4 py-3 font-semibold">İşlem</th>
                  <th className="px-4 py-3 font-semibold">Detay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                <tr className="hover:bg-surface-container-lowest transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-on-surface-variant">04 Haz 10:30</td>
                  <td className="px-4 py-3 font-bold text-on-surface">Ayşe Yılmaz</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-md">Sınav Tamamladı</span></td>
                  <td className="px-4 py-3 text-on-surface-variant">KVKK ve Bilgi Güvenliği - 95 Puan</td>
                </tr>
                <tr className="hover:bg-surface-container-lowest transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-on-surface-variant">04 Haz 09:15</td>
                  <td className="px-4 py-3 font-bold text-on-surface">Mehmet Demir</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-md">Eğitime Başladı</span></td>
                  <td className="px-4 py-3 text-on-surface-variant">İleri Seviye Satış Teknikleri</td>
                </tr>
                <tr className="hover:bg-surface-container-lowest transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-on-surface-variant">03 Haz 16:45</td>
                  <td className="px-4 py-3 font-bold text-on-surface">Caner Aksoy</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-md">Sertifika Aldı</span></td>
                  <td className="px-4 py-3 text-on-surface-variant">Liderlik Temelleri</td>
                </tr>
                <tr className="hover:bg-surface-container-lowest transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-on-surface-variant">03 Haz 14:20</td>
                  <td className="px-4 py-3 font-bold text-on-surface">Zeynep Kaya</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-rose-100 text-rose-800 text-xs font-bold rounded-md">Sınav Başarısız</span></td>
                  <td className="px-4 py-3 text-on-surface-variant">İletişim Becerileri - 65 Puan</td>
                </tr>
                <tr className="hover:bg-surface-container-lowest transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-on-surface-variant">02 Haz 11:10</td>
                  <td className="px-4 py-3 font-bold text-on-surface">Emre Aydın</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-md">Yorum Yaptı</span></td>
                  <td className="px-4 py-3 text-on-surface-variant">React JS Temelleri Eğitimi</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Middle Right: Kategori Dağılımı */}
        <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 p-6 h-[320px] flex flex-col">
          <h3 className="text-base font-bold text-on-surface mb-6">Kategori Dağılımı</h3>
          <div className="flex-1 flex flex-col justify-center items-center relative">
            {/* Fake Donut Chart */}
            <div className="w-32 h-32 rounded-full border-[16px] border-primary border-r-[#8b5cf6] border-b-amber-500 border-l-rose-500 relative flex items-center justify-center">
              <div className="text-center absolute">
                <p className="text-xl font-bold text-on-surface">30%</p>
                <p className="text-[10px] text-on-surface-variant">Satış</p>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2 grid grid-cols-2 gap-x-2 gap-y-1">
            <div className="flex justify-between items-center text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                <span className="text-on-surface-variant">Satış</span>
              </div>
              <span className="text-on-surface">30%</span>
            </div>
            <div className="flex justify-between items-center text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]"></div>
                <span className="text-on-surface-variant">Teknik</span>
              </div>
              <span className="text-on-surface">25%</span>
            </div>
            <div className="flex justify-between items-center text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                <span className="text-on-surface-variant">İnsan K.</span>
              </div>
              <span className="text-on-surface">25%</span>
            </div>
            <div className="flex justify-between items-center text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                <span className="text-on-surface-variant">Yönetim</span>
              </div>
              <span className="text-on-surface">20%</span>
            </div>
          </div>
        </div>

        {/* Bottom Left: En Başarılı Öğrenenler */}
        <div className="md:col-span-1 bg-white rounded-xl shadow-sm border border-outline-variant/30 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-on-surface">En Başarılı Öğrenenler</h3>
            <button className="text-xs font-bold text-primary hover:underline">Tümünü Gör</button>
          </div>
          <div className="space-y-5">
            {/* User 1 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  MK
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface leading-tight">Mert Korkmaz</p>
                  <p className="text-xs text-on-surface-variant">Ürün Yönetimi</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-primary">2,450 Puan</p>
                <p className="text-[10px] font-bold text-amber-500 uppercase tracking-wide">12 Kurs</p>
              </div>
            </div>
            {/* User 2 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-sm">
                  SD
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface leading-tight">Selin Demir</p>
                  <p className="text-xs text-on-surface-variant">Satış & Pazarlama</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-primary">2,100 Puan</p>
                <p className="text-[10px] font-bold text-amber-500 uppercase tracking-wide">10 Kurs</p>
              </div>
            </div>
            {/* User 3 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                  EA
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface leading-tight">Emre Aydın</p>
                  <p className="text-xs text-on-surface-variant">Yazılım Geliştirme</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-primary">1,980 Puan</p>
                <p className="text-[10px] font-bold text-amber-500 uppercase tracking-wide">9 Kurs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Right: Departman Performansı */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-outline-variant/30 p-6">
          <h3 className="text-base font-bold text-on-surface mb-6">Birim Performansı</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm font-bold mb-2 text-on-surface">
                <span>Yazılım Geliştirme</span>
                <span className="text-on-surface-variant">92%</span>
              </div>
              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                <div className="w-[92%] h-full bg-primary rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold mb-2 text-on-surface">
                <span>Satış & Pazarlama</span>
                <span className="text-on-surface-variant">78%</span>
              </div>
              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                <div className="w-[78%] h-full bg-[#8b5cf6] rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold mb-2 text-on-surface">
                <span>İnsan Kaynakları</span>
                <span className="text-rose-600">42%</span>
              </div>
              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden mb-1">
                <div className="w-[42%] h-full bg-rose-600 rounded-full"></div>
              </div>
              <p className="text-[10px] text-on-surface-variant italic">
                * Uyum eğitimleri için son tarih yaklaşıyor.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
