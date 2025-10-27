import { Department, DEPARTMENTS } from '../types/chat';
import * as Icons from 'lucide-react';

interface DepartmentSelectorProps {
  selectedDepartment: string | null;
  onSelectDepartment: (departmentId: string) => void;
}

export function DepartmentSelector({ selectedDepartment, onSelectDepartment }: DepartmentSelectorProps) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
        Select Your Subject
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Choose a department to start learning
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {DEPARTMENTS.map((dept) => {
          const IconComponent = Icons[dept.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
          const isSelected = selectedDepartment === dept.id;

          return (
            <button
              key={dept.id}
              onClick={() => onSelectDepartment(dept.id)}
              className={`relative p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                isSelected
                  ? 'bg-gradient-to-br ' + dept.color + ' text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 shadow-md hover:shadow-xl'
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                {IconComponent && <IconComponent className="w-8 h-8" />}
                <span className="text-sm font-semibold text-center">{dept.name}</span>
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <Icons.Check className="w-4 h-4 text-blue-600" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
