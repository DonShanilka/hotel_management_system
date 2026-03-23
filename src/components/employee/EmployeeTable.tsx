import React from 'react';
import { Edit2, Trash2 } from "lucide-react";

type Employee = {
  employeeID: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  salary: number;
  hireDate: string;
  createdAt: string;
};

interface EmployeeTableProps {
  employees: Employee[];
  onDelete: (empID: string) => void;
  onUpdate: (index: number, empID: string) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees = [], onDelete, onUpdate }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Internal ID</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Identity</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Designation</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Deployment</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-left">Value (Salary)</th>
            <th className="py-4 px-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 text-right">Operations</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, index) => (
              <tr key={employee.employeeID} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                <td className="py-4 px-2 text-[10px] font-black text-slate-900 uppercase">#{employee.employeeID}</td>
                <td className="py-4 px-2">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-slate-900">{employee.fullName}</span>
                    <span className="text-[9px] font-bold text-slate-400">{employee.email}</span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className="text-[10px] font-black bg-slate-100 px-1.5 py-0.5 rounded-lg text-slate-600 border border-slate-200">{employee.role}</span>
                </td>
                <td className="py-4 px-2 text-[10px] font-bold text-slate-900">{employee.hireDate}</td>
                <td className="py-4 px-2 text-[11px] font-black text-slate-900">
                  ${employee.salary?.toLocaleString()}
                </td>
                <td className="py-4 px-2 text-right">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onUpdate(index, employee.employeeID)}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-teal-600 hover:border-teal-200 transition-all shadow-sm"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      onClick={() => onDelete(employee.employeeID)}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-all shadow-sm"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/30">
                Unauthorized - No roster detected
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
