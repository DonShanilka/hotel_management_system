import React, { useEffect, useState } from 'react';
import EmployeeTable from './EmployeeTable';
import { useDispatch, useSelector } from 'react-redux';
import { getallEmployee, saveEmployee, updateEmployee, deleteEmployee } from '../../reducer/EmployeeSlice';
import { UserPlus, Search, Briefcase } from "lucide-react";

const EmployeeAddForm: React.FC = () => {
  const [employeeID, setEmployeeID] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [salary, setSalary] = useState('');
  const [hireDate, setHireDate] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const dispatch = useDispatch();
  const employees = useSelector((state: any) => state.employees || []);

  useEffect(() => {
    dispatch(getallEmployee());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const employeeData = {
      employeeID,
      fullName,
      email,
      phoneNumber,
      role,
      salary: Number(salary),
      hireDate,
      createdAt: new Date().toISOString(),
    };

    if (editIndex !== null) {
      dispatch(updateEmployee(employeeData));
      setEditIndex(null);
    } else {
      dispatch(saveEmployee(employeeData));
    }

    setEmployeeID('');
    setFullName('');
    setEmail('');
    setPhoneNumber('');
    setRole('');
    setSalary('');
    setHireDate('');
  };

  const handleDelete = (empID: string) => {
    const isConfirm = window.confirm("Are you sure want to delete Employee ?");
    if (isConfirm) {
      dispatch(deleteEmployee(empID))
    }
  };

  const handleUpdate = (index: number, empID: string) => {
    const employeeToUpdate = employees?.find((emp: any) => emp.employeeID === empID);

    if (!employeeToUpdate) {
      console.error("Employee not found for ID:", empID);
      return;
    }

    setEmployeeID(employeeToUpdate.employeeID);
    setFullName(employeeToUpdate.fullName);
    setEmail(employeeToUpdate.email);
    setPhoneNumber(employeeToUpdate.phoneNumber);
    setRole(employeeToUpdate.role);
    setSalary(employeeToUpdate.salary?.toString() || '');
    setHireDate(employeeToUpdate.hireDate);
    setEditIndex(index);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          Personnel Management
          <span className="text-[10px] font-black bg-teal-50 text-teal-600 px-2 py-0.5 rounded-lg border border-teal-100">INTERNAL DEPLOYMENT</span>
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search personnel..."
              className="py-2 pl-9 pr-3 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-teal-500 transition-all text-xs w-48"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <UserPlus size={14} className="text-teal-500" /> {editIndex !== null ? "Modify Allocation" : "New Agent Registration"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Employee Serial (ID)</label>
              <input
                type="text"
                value={employeeID}
                onChange={(e) => setEmployeeID(e.target.value)}
                placeholder="EMP-000"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Legal Identity Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Email Communication</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@hotel.com"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Mobile Terminal (Phone)</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+00-0000000"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Operational Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Designation"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Resource Value (Salary)</label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="0.00"
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Deployment Date (Hire)</label>
              <input
                type="date"
                value={hireDate}
                onChange={(e) => setHireDate(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className={`px-8 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${editIndex !== null
                  ? "bg-amber-500 hover:bg-amber-600 text-white"
                  : "bg-teal-500 hover:bg-teal-600 text-white"
                }`}
            >
              {editIndex !== null ? "Update Identity" : "Authorize Agent"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <Briefcase size={14} className="text-teal-500" /> Active Roster
        </h2>
        <EmployeeTable employees={employees} onDelete={handleDelete} onUpdate={handleUpdate} />
      </div>
    </div>
  );
};

export default EmployeeAddForm;
