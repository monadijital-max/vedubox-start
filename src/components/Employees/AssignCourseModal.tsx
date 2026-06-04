import React, { useState } from 'react';
import { useAppStore } from '@/store/store';
import { X, BookOpen, User, Briefcase } from 'lucide-react';

interface AssignCourseModalProps {
  onClose: () => void;
  preselectedEmployeeId?: string | null;
}

export default function AssignCourseModal({ onClose, preselectedEmployeeId }: AssignCourseModalProps) {
  const { employees, departments, courses, assignCourse, showDialog } = useAppStore();
  
  const [targetType, setTargetType] = useState<'employee' | 'department'>(preselectedEmployeeId ? 'employee' : 'department');
  const [targetId, setTargetId] = useState<string>(preselectedEmployeeId || '');
  const [courseId, setCourseId] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseId) {
      showDialog({ type: 'error', message: 'Lütfen bir eğitim seçin.' });
      return;
    }
    if (!targetId) {
      showDialog({ type: 'error', message: 'Lütfen bir hedef seçin.' });
      return;
    }

    assignCourse(courseId, targetType, targetId);
    showDialog({ type: 'success', message: 'Eğitim başarıyla atandı.' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Eğitim Ata</h2>
              <p className="text-sm font-medium text-slate-500">
                {preselectedEmployeeId 
                  ? `${employees.find(e => e.id === preselectedEmployeeId)?.name} kişisine eğitim atayın` 
                  : 'Kişiye veya departmana eğitim atayın'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <form id="assign-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Target Selection - Hidden if preselected */}
            {!preselectedEmployeeId && (
              <>
                {/* Target Type Selector */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => { setTargetType('employee'); setTargetId(''); }}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      targetType === 'employee' ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700' : 'border-slate-100 hover:border-slate-200 text-slate-600'
                    }`}
                  >
                    <User className="w-6 h-6" />
                    <span className="font-bold text-sm">Kişiye Özel</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setTargetType('department'); setTargetId(''); }}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      targetType === 'department' ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700' : 'border-slate-100 hover:border-slate-200 text-slate-600'
                    }`}
                  >
                    <Briefcase className="w-6 h-6" />
                    <span className="font-bold text-sm">Departmana Ata</span>
                  </button>
                </div>

                {/* Target Dropdown */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    {targetType === 'employee' ? 'Çalışan Seçin' : 'Departman Seçin'}
                  </label>
                  {targetType === 'employee' ? (
                    <select
                      value={targetId}
                      onChange={(e) => setTargetId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-700"
                    >
                      <option value="">Seçiniz</option>
                      {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.name} ({emp.department})</option>
                      ))}
                    </select>
                  ) : (
                    <select
                      value={targetId}
                      onChange={(e) => setTargetId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-700"
                    >
                      <option value="">Seçiniz</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  )}
                </div>
              </>
            )}

            {/* Course Selection */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Eğitim Seçin</label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-700"
              >
                <option value="">Seçiniz</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.title} ({course.category})</option>
                ))}
              </select>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
          >
            İptal
          </button>
          <button 
            type="submit"
            form="assign-form"
            className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Ata
          </button>
        </div>

      </div>
    </div>
  );
}
