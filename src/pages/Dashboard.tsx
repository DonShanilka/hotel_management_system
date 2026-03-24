import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  Bell,
  Search,
  LayoutGrid,
  Plus,
  Globe,
  Settings,
  MoreVertical,
  Activity,
  History,
  ShieldAlert
} from "lucide-react";
import { parseISO, format, subDays, isSameDay } from "date-fns";

const roomWeeklyData = [
  { name: "Mon", occupied: 45, available: 55 },
  { name: "Tue", occupied: 52, available: 48 },
  { name: "Wed", occupied: 48, available: 52 },
  { name: "Thu", occupied: 61, available: 39 },
  { name: "Fri", occupied: 75, available: 25 },
  { name: "Sat", occupied: 88, available: 12 },
  { name: "Sun", occupied: 70, available: 30 },
];

const Dashboard: React.FC = () => {
  const [roomCount, setRoomCount] = useState<number>(0);
  const [employeeCount, setEmployeeCount] = useState<number>(0);
  const [guestCount, setGuestCount] = useState<number>(0);
  const [bookingCount, setBookingCount] = useState<number>(0);
  const [paymentCount, setPaymentCount] = useState<number>(0);
  const [monthlyData, setMonthlyData] = useState<{ name: string; value: number }[]>([]);
  const [last7DaysData, setLast7DaysData] = useState<{ name: string; value: number }[]>([]);
  const [recentPayments, setRecentPayments] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rooms, employees, guests, bookings, payments] = await Promise.all([
          fetch("http://localhost:3000/api/room/getAllRoom").then((res) => res.json()),
          fetch("http://localhost:3000/api/emp/getAllEmployee").then((res) => res.json()),
          fetch("http://localhost:3000/api/gu/getAllGuest").then((res) => res.json()),
          fetch("http://localhost:3000/api/bo/getAllBooking").then((res) => res.json()),
          fetch("http://localhost:3000/api/payment/getAllPayment").then((res) => res.json()),
        ]);

        setRoomCount(rooms.length);
        setEmployeeCount(employees.length);
        setGuestCount(guests.length);
        setBookingCount(bookings.length);
        setRecentPayments(payments.slice(-8).reverse());

        const totalRevenue = payments.reduce((acc: any, payment: any) => acc + Number(payment.totalPayment || 0), 0);
        setPaymentCount(totalRevenue);

        const monthlyRevenueMap: { [key: string]: number } = {};
        payments.forEach((payment: any) => {
          const month = format(parseISO(payment.createdAt), "MMM");
          monthlyRevenueMap[month] = (monthlyRevenueMap[month] || 0) + Number(payment.totalPayment || 0);
        });
        const orderedMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const sortedMonthlyData = orderedMonths.map((month) => ({
          name: month,
          value: monthlyRevenueMap[month] || 0,
        }));
        setMonthlyData(sortedMonthlyData);

        const today = new Date();
        const last7Days = [...Array(7)].map((_, i) => subDays(today, i)).reverse();
        const dailyIncome = last7Days.map((date) => {
          const formatted = format(date, "MMM d");
          const total = payments
            .filter((p: any) => isSameDay(parseISO(p.createdAt), date))
            .reduce((acc: number, p: any) => acc + Number(p.totalPayment || 0), 0);
          return { name: formatted, value: total };
        });
        setLast7DaysData(dailyIncome);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const COLORS = ["#14b8a6", "#0ea5e9", "#f43f5e", "#f59e0b"];

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-800 pb-8 font-sans overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">

        {/* Triple Stat Row - Refined Medium Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <StatCardWithTrend
            title="Total Revenue"
            value={`$${paymentCount.toLocaleString()}`}
            trend="+12%"
            trendColor="text-teal-500"
            data={monthlyData.slice(-6)}
            icon={<Activity size={14} />}
            color="#14b8a6"
          />
          <StatCardWithTrend
            title="Total Bookings"
            value={`${bookingCount}`}
            trend="+5%"
            trendColor="text-teal-500"
            data={last7DaysData}
            icon={<ShieldAlert size={14} />}
            color="#f43f5e"
          />
          <StatCardWithTrend
            title="Active Guests"
            value={`${guestCount}`}
            trend="+8%"
            trendColor="text-teal-500"
            data={monthlyData.slice(-6).map(d => ({ ...d, value: d.value / 100 }))}
            icon={<History size={14} />}
            color="#0ea5e9"
          />
        </div>

        {/* Secondary Info Row - Medium View */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <SimpleStatCard title="Total Rooms" value={`${roomCount}`} icon={<LayoutGrid size={16} />} color="text-teal-600" bgColor="bg-teal-50" />
          <SimpleStatCard title="Employees" value={`${employeeCount}`} icon={<Plus size={16} />} color="text-amber-600" bgColor="bg-amber-50" />
          <SimpleStatCard title="Available Nodes" value="245" icon={<Globe size={16} />} color="text-sky-600" bgColor="bg-sky-50" />
          <SimpleStatCard title="Bot Detection" value="1,450" icon={<Activity size={16} />} color="text-rose-600" bgColor="bg-rose-50" />
        </div>

        {/* Grid for Table and Charts - Refined Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Room Status Analysis with Bar Chart */}
          <div className="lg:col-span-8 bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-md font-bold text-slate-900 tracking-tight">Weekly Room Status Analysis</h2>
              <div className="flex gap-2">
                <span className="flex items-center gap-1 text-[9px] font-black text-teal-600 bg-teal-50 px-2 py-0.5 rounded-lg border border-teal-100 uppercase">Occupied</span>
                <span className="flex items-center gap-1 text-[9px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100 uppercase">Available</span>
              </div>
            </div>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={roomWeeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 9, fontWeight: 900, fill: '#64748b' }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 9, fontWeight: 900, fill: '#64748b' }}
                  />
                  <Tooltip
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="occupied" stackId="a" fill="#14b8a6" radius={[0, 0, 0, 0]} barSize={32} />
                  <Bar dataKey="available" stackId="a" fill="#f1f5f9" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-slate-50">
              <AssessmentRow label="Dirty" value={12} color="bg-rose-500" type="Urgent" />
              <AssessmentRow label="Occupied" value={28} color="bg-[#14b8a6]" type="Active" />
              <AssessmentRow label="Available" value={110} color="bg-teal-500" type="Ready" />
              <AssessmentRow label="Maintenance" value={5} color="bg-slate-500" type="Hold" />
            </div>
          </div>

          {/* Donut Chart Section - Adjusted Place */}
          <div className="lg:col-span-4 bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-md font-bold text-slate-900 tracking-tight">Vulnerability Report</h2>
              <button className="text-teal-600 transition-colors"><MoreVertical size={14} /></button>
            </div>
            <div className="h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={monthlyData.slice(0, 4)}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={5}
                    stroke="none"
                  >
                    {monthlyData.slice(0, 4).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[9px] font-black text-slate-400 uppercase">Target</span>
                <span className="text-2xl font-black text-slate-900">85%</span>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <LegendItem color="#14b8a6" label="High" />
              <LegendItem color="#0ea5e9" label="Medium" />
              <LegendItem color="#f43f5e" label="Low" />
              <LegendItem color="#f59e0b" label="Fixed" />
            </div>
          </div>

          {/* List of Transactions Table - Full Width */}
          <div className="lg:col-span-12 bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-md font-bold text-slate-900 tracking-tight">Recent Financial Activity</h2>
              <button className="text-teal-600 text-[10px] font-black uppercase tracking-widest hover:underline">See All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em] border-b border-slate-50">
                    <th className="text-left py-3 px-1">ID</th>
                    <th className="text-left py-3 px-1">Type</th>
                    <th className="text-left py-3 px-1">Amount</th>
                    <th className="text-right py-3 px-1">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentPayments.map((p, i) => (
                    <tr key={i} className="group hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-1 text-[11px] font-bold text-teal-600">#{p.id || '2086'}</td>
                      <td className="py-3 px-1 text-[10px] font-bold text-slate-900 uppercase tracking-tight">{p.paymentMethod || 'Credit'}</td>
                      <td className="py-3 px-1 text-[11px] font-black text-slate-900">${Number(p.totalPayment).toLocaleString()}</td>
                      <td className="py-3 px-1 text-right">
                        <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-lg ${i % 2 === 0 ? 'bg-teal-50 text-[#14b8a6]' : 'bg-amber-50 text-amber-600'
                          }`}>
                          {i % 2 === 0 ? 'Success' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Sub-components inspired by CyberShield - Refined Medium Size ---

const StatCardWithTrend = ({ title, value, trend, trendColor, data, icon, color }: any) => (
  <div className="bg-white rounded-lg border border-slate-200 p-4 transition-all duration-300 relative overflow-hidden group hover:border-teal-200">
    <div className="flex justify-between items-start mb-2">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-teal-500 group-hover:bg-teal-50 transition-colors">
          {icon}
        </div>
        <div>
          <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{title}</h3>
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-slate-900 tracking-tight">{value}</span>
            <span className={`text-[8px] font-black bg-slate-50 px-1 py-0.5 rounded-lg ${trendColor}`}>{trend}</span>
          </div>
        </div>
      </div>
    </div>
    <div className="h-10 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`color-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.1} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fillOpacity={1} fill={`url(#color-${color})`} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const SimpleStatCard = ({ title, value, icon, color, bgColor }: any) => (
  <div className="bg-white rounded-lg border border-slate-200 p-3 flex items-center gap-3 hover:border-teal-100 transition-all">
    <div className={`w-8 h-8 rounded-lg ${bgColor} ${color} flex items-center justify-center`}>
      {icon}
    </div>
    <div>
      <h3 className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{title}</h3>
      <p className="text-md font-black text-slate-900 tracking-tight leading-none">{value}</p>
    </div>
  </div>
);

const AssessmentRow = ({ label, value, color, type }: any) => (
  <div className="flex items-center justify-between py-1 group">
    <div className="flex items-center gap-2 text-[11px]">
      <div className={`w-1.5 h-1.5 rounded-lg ${color}`}></div>
      <span className="font-bold text-slate-600 transition-colors group-hover:text-slate-900">{label}</span>
      <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-lg ${type === 'Critical' ? 'bg-rose-50 text-rose-600' :
        type === 'High' ? 'bg-amber-50 text-amber-600' :
          'bg-slate-50 text-slate-500'
        }`}>{type}</span>
    </div>
    <span className="text-[11px] font-black text-slate-900">{value}</span>
  </div>
);

const LegendItem = ({ color, label }: any) => (
  <div className="flex items-center gap-2">
    <div className="w-2.5 h-2.5 rounded-none" style={{ backgroundColor: color }}></div>
    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
  </div>
);

export default Dashboard;
