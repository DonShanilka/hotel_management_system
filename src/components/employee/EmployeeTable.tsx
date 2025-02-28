import React from 'react';

type Employee = {
  employeeID : string;
  fullName : string;
  email : string;
  phoneNumber : string;
  role : string;
  salary : number;
  hireDate : string;
  createdAt : Date;

  reportType : string;
  guestId : string;
  description : string;
};

interface EmployeeTableProps {
  employees: Employee[];
  onDelete: (index: number) => void;
  onUpdate: (index: number) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onDelete, onUpdate }) => {
  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Employee List</h2>

      <table className="w-full ">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="p-2">ID</th>
            <th className="p-2">Full Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Role</th>
            <th className="p-2">Salary</th>
            <th className="p-2">Hire Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index} className="text-center">
              <td className=" p-2">{employee.employeeID}</td>
              <td className=" p-2">{employee.fullName}</td>
              <td className=" p-2">{employee.email}</td>
              <td className=" p-2">{employee.phoneNumber}</td>
              <td className=" p-2">{employee.role}</td>
              <td className=" p-2">${employee.salary}</td>
              <td className=" p-2">{employee.hireDate}</td>
              <td className=" p-2 flex justify-center gap-2">
                <button onClick={() => onUpdate(index, employee.employeeID)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                <button onClick={() => onDelete(employee.employeeID)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
