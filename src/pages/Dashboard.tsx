import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis } from 'recharts';
import { Bell } from 'lucide-react';

const monthlyData = [
  { name: 'Jan', value: 5000 },
  { name: 'Feb', value: 7000 },
  { name: 'Mar', value: 6000 },
  { name: 'Apr', value: 8000 },
  { name: 'May', value: 15000 },
  { name: 'Jun', value: 6000 },
  { name: 'Jul', value: 7000 },
  { name: 'Aug', value: 9000 },
  { name: 'Sep', value: 8000 },
  { name: 'Oct', value: 10000 },
  { name: 'Nov', value: 9000 },
];

interface InvoiceType {
  id: string;
  dateCreated: string;
  client: string;
  amount: string;
  status: 'PAID' | 'OVERDUE' | 'PENDING';
}

const invoices: InvoiceType[] = [
  { id: 'PO-4391C', dateCreated: '3 Jul, 2020', client: 'Daniel Padilla', amount: '$2,450', status: 'PAID' },
  { id: 'IN-9971J', dateCreated: '21 May, 2021', client: 'Christina Jacobs', amount: '$14,900', status: 'OVERDUE' },
  { id: 'LV-2378A', dateCreated: '14 Apr, 2020', client: 'Elizabeth Bailey', amount: '$450', status: 'PENDING' },
];

const Dashboard: React.FC = () => {
  const [roomCount, setRoomCount] = useState<number>(0);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/room/getAllRoom');
        const data = await res.json();
        setRoomCount(data.length);
      } catch (error) {
        console.error('Failed to fetch room count:', error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="flex min-h-screen bg-blue-50">
      <div className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Type to search..."
              className="py-2 pl-8 pr-4 rounded-md bg-gray-100 w-64"
            />
            <svg className="absolute left-2 top-2.5 text-gray-500" width="16" height="16" viewBox="0 0 24 24">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="flex items-center">
            <div className="relative mr-4">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">2</span>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden mr-2">
                <span className="text-xs font-semibold">DS</span>
              </div>
              <div>
                <div className="font-medium text-sm">David Spade</div>
                <div className="text-gray-500 text-xs">Administrator</div>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <StatCard title="Total Revenue" value="$216k" change="+8%" changeType="positive" color="bg-red-100" textColor="text-red-500" />
          <StatCard title="Invoices" value="2,221" change="+8%" changeType="positive" color="bg-green-100" textColor="text-green-500" />
          <StatCard title="Clients" value="1,423" change="+6%" changeType="positive" color="bg-blue-100" textColor="text-blue-500" />
          <StatCard title="Loyalty" value="78%" change="-2%" changeType="negative" color="bg-purple-100" textColor="text-purple-500" />
          <StatCard title="Total Rooms" value={`${roomCount}`} change="+0%" changeType="positive" color="bg-yellow-100" textColor="text-yellow-500" />
        </div>

        {/* Revenue Chart & Template */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between mb-6">
              <div>
                <h2 className="text-lg font-medium mb-2">Monthly Revenue</h2>
                <div className="text-2xl font-semibold">$15,000</div>
              </div>
              <div className="relative">
                <div className="bg-black text-white p-2 rounded-lg text-sm">
                  $15,000
                  <div className="absolute w-3 h-3 bg-black rotate-45 -bottom-1 left-1/2 transform -translate-x-1/2"></div>
                </div>
              </div>
            </div>

            <BarChart width={500} height={200} data={monthlyData} barSize={20}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <Bar 
                dataKey="value" 
                shape={(props: any) => {
                  const { x, y, width, height, index } = props;
                  return (
                    <rect 
                      x={x} y={y} width={width} height={height} 
                      fill={index === 4 ? "#2563EB" : "#EEEEEE"} 
                      rx={4} ry={4} 
                    />
                  );
                }}
              />
            </BarChart>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="bg-blue-600 p-6 text-white">
              <div className="inline-block bg-white text-blue-600 text-xs px-2 py-1 rounded-full mb-2">NEW</div>
              <h2 className="text-xl font-semibold mb-2">We have added new invoicing templates!</h2>
              <p className="text-sm mb-6">New templates focused on helping you improve your business.</p>
              <button className="bg-white text-blue-600 py-2 px-4 rounded-lg font-medium">Download Now</button>
            </div>
          </div>
        </div>

        {/* Activities and Invoices */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-medium mb-4">Activities</h2>
            <div className="border-b pb-4 mb-4">
              <div className="flex items-start">
                <div className="rounded-full w-8 h-8 bg-gray-300 flex items-center justify-center mr-4">
                  <span className="text-xs font-semibold">FG</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">Francisco Gibbs</span>
                    <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded">New Invoice</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">created invoice PO-4391C</p>
                  <p className="text-gray-400 text-xs">2 min ago</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="rounded-full w-8 h-8 bg-yellow-100 text-yellow-500 flex items-center justify-center mr-4">
                  <Bell size={16} />
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <span className="font-medium">Invoice JL-3423B</span>
                    <span className="text-gray-500 text-sm ml-1">reminder</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">was sent to Chester Corp</p>
                  <p className="text-gray-400 text-xs">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-medium mb-4">Recent Invoices</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500">
                  <th className="text-left pb-4 font-medium">ID</th>
                  <th className="text-left pb-4 font-medium">Date Created</th>
                  <th className="text-left pb-4 font-medium">Client</th>
                  <th className="text-left pb-4 font-medium">Amount</th>
                  <th className="text-left pb-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-t">
                    <td className="py-3">{invoice.id}</td>
                    <td>{invoice.dateCreated}</td>
                    <td>{invoice.client}</td>
                    <td>{invoice.amount}</td>
                    <td><StatusBadge status={invoice.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatusBadgeProps {
  status: 'PAID' | 'OVERDUE' | 'PENDING';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const base = {
    PAID: ['bg-green-100', 'text-green-600'],
    OVERDUE: ['bg-red-100', 'text-red-600'],
    PENDING: ['bg-gray-100', 'text-gray-600'],
  }[status];

  return <span className={`${base[0]} ${base[1]} px-2 py-1 rounded text-xs font-medium`}>{status.toLowerCase()}</span>;
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  color: string;
  textColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType, color, textColor }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex mb-1">
        <div className={`w-8 h-8 ${color} ${textColor} rounded-full flex items-center justify-center mb-2`}>
          <span className="block w-3 h-3 rounded-full bg-current"></span>
        </div>
      </div>
      <p className="text-gray-500 text-sm mb-1">{title}</p>
      <div className="flex items-center">
        <span className="text-xl font-bold mr-2">{value}</span>
        <span className={`text-xs ${changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>{change}</span>
      </div>
    </div>
  );
};

export default Dashboard;
