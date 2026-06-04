'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/store';
import { 
  Search, Plus, Filter, MoreVertical, ShieldCheck, UserPlus, Eye, BookOpen, ChevronLeft, ChevronRight
} from 'lucide-react';
import EmployeeProfile from './EmployeeProfile';
import NewEmployeePage from './NewEmployeePage';
import AssignCourseModal from './AssignCourseModal';
import AssignRoleModal from './AssignRoleModal';

export default function Employees() {
  const { employees } = useAppStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [assignCourseEmployee, setAssignCourseEmployee] = useState<{ id: string, name: string } | null>(null);

  // We are visually matching the uploaded image which has specific data points.
  // We will map over the existing employees but format them to match the visual as closely as possible.
  // The visual has 4 rows: Emre Can, Zeynep Kaya, Mert Demir, Selma Aydın.


  if (selectedEmployeeId) {
    return <EmployeeProfile onBack={() => setSelectedEmployeeId(null)} employeeId={selectedEmployeeId} />;
  }

  if (isAddingNew) {
    return <NewEmployeePage onBack={() => setIsAddingNew(false)} />;
  }

  return (
    <div className="space-y-md animate-fadeIn text-on-surface">
      
      {/* Page Title & Breadcrumb */}
      <div className="mb-sm">
        <h1 className="text-headline-md font-bold text-on-surface">Kullanıcılar</h1>
        <div className="flex items-center text-label-sm text-on-surface-variant gap-xs mt-1">
          <span>Ana Sayfa</span>
          <span>/</span>
          <span className="text-primary font-semibold">Kullanıcılar</span>
        </div>
      </div>

      {/* Top Controls Row */}
      <div className="flex flex-col md:flex-row gap-sm justify-between items-center bg-white p-sm rounded-lg shadow-soft-sm border border-outline-variant/30">
        <div className="w-full md:w-[400px] relative">
          <Search className="w-4 h-4 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Kullanıcı ismi, departman veya e-posta ile ara..."
            className="w-full pl-10 pr-md py-[10px] bg-surface-container-low border border-transparent rounded-md text-body-sm focus:outline-none focus:border-outline-variant transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-sm w-full md:w-auto">
          <button 
            onClick={() => setIsAddingNew(true)}
            className="flex-1 md:flex-none px-md py-[10px] bg-primary text-white rounded-md text-label-sm font-bold flex items-center justify-center gap-xs hover:bg-primary-container transition-all shadow-soft-sm"
          >
            <UserPlus className="w-4 h-4" />
            Kullanıcı Ekle
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
        
        {/* Card 1: Toplam Kullanıcı */}
        <div className="bg-white p-lg rounded-lg shadow-soft-sm border border-outline-variant/30 flex flex-col justify-between">
          <p className="text-label-sm text-on-surface-variant font-medium">Toplam Kullanıcı</p>
          <div className="flex items-end justify-between mt-sm">
            <span className="text-[32px] font-bold leading-none text-on-surface">124</span>
            <span className="bg-indigo-50 text-primary text-[10px] font-bold px-sm py-1 rounded-full mb-1">
              +4 bu ay
            </span>
          </div>
        </div>

        {/* Card 2: Ortalama Tamamlama */}
        <div className="bg-white p-lg rounded-lg shadow-soft-sm border border-outline-variant/30 flex flex-col justify-between">
          <p className="text-label-sm text-on-surface-variant font-medium">Ortalama Tamamlama</p>
          <div className="flex items-center justify-between mt-sm">
            <span className="text-[32px] font-bold leading-none text-on-surface">%78</span>
            <div className="w-20 bg-surface-container h-2.5 rounded-full overflow-hidden mb-1">
              <div className="bg-primary h-full rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>

        {/* Card 3: Yeni Sertifika Dönemi */}
        <div className="bg-primary p-lg rounded-lg shadow-soft-sm flex items-center justify-between relative overflow-hidden">
          {/* subtle background decoration */}
          <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-xl"></div>
          
          <div className="z-10">
            <h3 className="text-[18px] text-white font-bold leading-tight">Yeni Sertifika Dönemi</h3>
            <p className="text-white/80 text-[13px] font-medium mt-1 max-w-[200px]">
              Sertifika yenileme zamanı gelen 12 kullanıcı var.
            </p>
          </div>
          <div className="z-10 bg-white/10 p-sm rounded-md backdrop-blur-sm border border-white/20">
            <ShieldCheck className="w-8 h-8 text-white opacity-90" />
          </div>
        </div>

      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-lg shadow-soft-sm border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/40 text-label-sm text-on-surface-variant bg-white">
                <th className="py-md px-lg font-bold w-16"></th>
                <th className="py-md px-md font-bold">Ad</th>
                <th className="py-md px-md font-bold">Soyad</th>
                <th className="py-md px-md font-bold">E-posta</th>
                <th className="py-md px-md font-bold">Kullanıcı Adı</th>
                <th className="py-md px-lg font-bold text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {employees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((emp) => (
                <tr key={emp.id} className="hover:bg-surface-container-lowest transition-all group">
                  <td className="py-sm px-lg">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shrink-0">
                      <img src={`https://i.pravatar.cc/150?u=${emp.id}`} alt={emp.name} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="py-sm px-md text-label-sm font-bold text-on-surface">
                    {emp.name.split(' ')[0]}
                  </td>
                  <td className="py-sm px-md text-label-sm font-bold text-on-surface">
                    {emp.name.split(' ').slice(1).join(' ')}
                  </td>
                  <td className="py-sm px-md text-label-sm text-on-surface-variant font-medium">
                    {emp.email}
                  </td>
                  <td className="py-sm px-md text-label-sm text-on-surface-variant font-medium">
                    {emp.email.split('@')[0]}
                  </td>
                  <td className="py-sm px-lg text-right">
                    <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => setSelectedEmployeeId(emp.id)}
                        title="Profili Gör"
                        className="p-1.5 text-on-surface-variant hover:text-primary transition-colors rounded-md hover:bg-primary/10"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setAssignCourseEmployee({ id: emp.id, name: emp.name })}
                        title="Eğitim Ata"
                        className="p-1.5 text-on-surface-variant hover:text-indigo-600 transition-colors rounded-md hover:bg-indigo-50"
                      >
                        <BookOpen className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="border-t border-outline-variant/30 px-6 py-4 flex items-center justify-between bg-white">
          <span className="text-sm text-on-surface-variant">
            Toplam <span className="font-bold text-on-surface">{employees.length}</span> kullanıcıdan <span className="font-bold text-on-surface">{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, employees.length)}</span> arası gösteriliyor
          </span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-md border border-outline-variant/50 text-on-surface-variant hover:bg-surface-container-low disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-bold px-3">{currentPage} / {Math.max(1, Math.ceil(employees.length / itemsPerPage))}</span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(Math.ceil(employees.length / itemsPerPage), p + 1))}
              disabled={currentPage === Math.ceil(employees.length / itemsPerPage) || employees.length === 0}
              className="p-1.5 rounded-md border border-outline-variant/50 text-on-surface-variant hover:bg-surface-container-low disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Course Assignment Modal */}
      {assignCourseEmployee && (
        <AssignCourseModal 
          onClose={() => setAssignCourseEmployee(null)} 
          preselectedEmployeeId={assignCourseEmployee.id}
        />
      )}
    </div>
  );
}
