import React, {useEffect, useState} from 'react';
import EmployeeTable from './EmployeeTable';
import {useDispatch, useSelector} from 'react-redux';
import {getallEmployee, saveEmployee} from '../../reducer/EmployeeSlice';
import {getallGuest} from "../../reducer/GuestSlice.ts";

const EmployeeAddForm: React.FC = () => {
  const [employeeID, setEmployeeID] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [salary, setSalary] = useState('');
  const [hireDate, setHireDate] = useState('');
  const [employeeList, setEmployeeList] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees || []);

  // console.log("Employee AddForm Emp Data ", employees);

  useEffect(() => {
    dispatch(getallEmployee());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEmployee = {
      employeeID,
      fullName,
      email,
      phoneNumber,
      role,
      salary,
      hireDate,
      createdAt: new Date().toISOString(),
    };

    if (editIndex !== null) {
      const updatedList = [];
      updatedList[editIndex] = employees;
      setEmployeeList(updatedList);
      setEditIndex(null);
    } else {
      // setEmployeeList([...employeeList, newEmployee]);
      dispatch(saveEmployee(newEmployee));
    }

    // Reset form
    setEmployeeID('');
    setFullName('');
    setEmail('');
    setPhoneNumber('');
    setRole('');
    setSalary('');
    setHireDate('');
  };

  const handleDelete = (index: number) => {
    setEmployeeList(employeeList.filter((_, i) => i !== index));
  };

  const handleUpdate = (index: number) => {
    const employeeToUpdate = employeeList[index];
    setEmployeeID(employeeToUpdate.employeeID);
    setFullName(employeeToUpdate.fullName);
    setEmail(employeeToUpdate.email);
    setPhoneNumber(employeeToUpdate.phoneNumber);
    setRole(employeeToUpdate.role);
    setSalary(employeeToUpdate.salary);
    setHireDate(employeeToUpdate.hireDate);

    setEditIndex(index);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Employee Management Form</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Employee ID</label>
            <input
              type="text"
              value={employeeID}
              onChange={(e) => setEmployeeID(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Salary</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Hire Date</label>
            <input
              type="date"
              value={hireDate}
              onChange={(e) => setHireDate(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        <button
          type="submit"
          className={`mt-4 w-full text-white py-2 rounded-lg transition ${
            editIndex !== null ? "bg-yellow-600 hover:bg-yellow-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editIndex !== null ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      <EmployeeTable employees={employees} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
};

export default EmployeeAddForm;
