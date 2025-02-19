import React from 'react';

interface EmployeeTableProps {
  employees: any[];
  onDelete: (index: number) => void;
  onUpdate: (index: number) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onDelete, onUpdate }) => {
  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Employee List</h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Full Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Salary</th>
            <th className="border p-2">Hire Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{employee.employeeID}</td>
              <td className="border p-2">{employee.fullName}</td>
              <td className="border p-2">{employee.email}</td>
              <td className="border p-2">{employee.phoneNumber}</td>
              <td className="border p-2">{employee.role}</td>
              <td className="border p-2">${employee.salary}</td>
              <td className="border p-2">{employee.hireDate}</td>
              <td className="border p-2 flex justify-center gap-2">
                <button onClick={() => onUpdate(index)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                <button onClick={() => onDelete(index)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
