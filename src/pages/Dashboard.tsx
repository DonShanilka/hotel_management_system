import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
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

        {/* CyberShield Style Header - Refined */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
              Dashboard
              <div className="flex bg-slate-100 p-0.5 rounded-lg gap-0.5 transform scale-75 ml-1 border border-slate-200">
                <button className="px-2 py-0.5 rounded-lg bg-white text-[9px] font-bold">Expert Mode</button>
                <button className="px-2 py-0.5 rounded-lg text-[9px] font-bold text-slate-400">Easy Mode</button>
              </div>
            </h1>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full py-2 pl-9 pr-3 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-teal-500 transition-all text-xs"
              />
            </div>

            <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-bold text-xs transition-all flex items-center gap-2">
              <Plus size={16} /> Add Room
            </button>

            <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200">
              <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors relative">
                <Bell size={18} className="text-slate-600" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full border border-white"></span>
              </button>
              <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
                <Settings size={18} className="text-slate-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Triple Stat Row - Refined */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <StatCardWithTrend
            title="Total Revenue"
            value={`$${paymentCount.toLocaleString()}`}
            trend="+12%"
            trendColor="text-teal-500"
            data={monthlyData.slice(-6)}
            icon={<Activity size={16} />}
            color="#14b8a6"
          />
          <StatCardWithTrend
            title="Total Bookings"
            value={`${bookingCount}`}
            trend="+5%"
            trendColor="text-teal-500"
            data={last7DaysData}
            icon={<ShieldAlert size={16} />}
            color="#f43f5e"
          />
          <StatCardWithTrend
            title="Active Guests"
            value={`${guestCount}`}
            trend="+8%"
            trendColor="text-teal-500"
            data={monthlyData.slice(-6).map(d => ({ ...d, value: d.value / 100 }))}
            icon={<History size={16} />}
            color="#0ea5e9"
          />
        </div>

        {/* Secondary Info Row - Refined */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <SimpleStatCard title="Total Rooms" value={`${roomCount}`} icon={<LayoutGrid size={18} />} color="text-teal-600" bgColor="bg-teal-50" />
          <SimpleStatCard title="Employees" value={`${employeeCount}`} icon={<Plus size={18} />} color="text-amber-600" bgColor="bg-amber-50" />
          <SimpleStatCard title="Available Nodes" value="245" icon={<Globe size={18} />} color="text-sky-600" bgColor="bg-sky-50" />
          <SimpleStatCard title="Bot Detection" value="1,450" icon={<Activity size={18} />} color="text-rose-600" bgColor="bg-rose-50" />
        </div>

        {/* Grid for Table and Charts - Refined */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Assessment Table List */}
          <div className="lg:col-span-4 bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-md font-bold text-slate-900 tracking-tight">Room Status Analysis</h2>
              <button className="text-teal-600 text-[10px] font-black uppercase tracking-widest hover:underline">See Details</button>
            </div>
            <div className="space-y-3">
              <AssessmentRow label="Dirty (Urgent)" value={12} color="bg-rose-500" type="Critical" />
              <AssessmentRow label="Pending Cleaning" value={45} color="bg-amber-500" type="High" />
              <AssessmentRow label="Occupied" value={28} color="bg-[#14b8a6]" type="Medium" />
              <AssessmentRow label="Clean & Available" value={110} color="bg-teal-500" type="Low" />
              <AssessmentRow label="Maintenance" value={5} color="bg-slate-500" type="Potentials" />
              <AssessmentRow label="Reserved" value={15} color="bg-sky-500" type="Compliant" />
            </div>
          </div>

          {/* List of Transactions Table */}
          <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200 p-6">
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

          {/* Donut Chart Section */}
          <div className="lg:col-span-3 bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-md font-bold text-slate-900 tracking-tight">Vulnerability Report</h2>
              <button className="text-teal-600 transition-colors"><MoreVertical size={14} /></button>
            </div>
            <div className="h-56 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={monthlyData.slice(0, 4)}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
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
            <div className="mt-6 grid grid-cols-2 gap-2">
              <LegendItem color="#14b8a6" label="High" />
              <LegendItem color="#0ea5e9" label="Medium" />
              <LegendItem color="#f43f5e" label="Low" />
              <LegendItem color="#f59e0b" label="Fixed" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Sub-components inspired by CyberShield - Refined ---

const StatCardWithTrend = ({ title, value, trend, trendColor, data, icon, color }: any) => (
  <div className="bg-white rounded-lg border border-slate-200 p-6 transition-all duration-300 relative overflow-hidden">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-[#14b8a6]">
          {icon}
        </div>
        <div>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xl font-black text-slate-900">{value}</span>
            <span className={`text-[9px] font-black bg-slate-50 px-1 py-0.5 rounded-lg ${trendColor}`}>{trend}</span>
          </div>
        </div>
      </div>
    </div>
    <div className="h-12 w-full -mb-1">
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
    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.1em] mt-1 block">vs Last 7 days</span>
  </div>
);

const SimpleStatCard = ({ title, value, icon, color, bgColor }: any) => (
  <div className="bg-white rounded-lg border border-slate-200 p-4 flex items-center gap-3 hover:bg-slate-50 transition-colors">
    <div className={`w-10 h-10 rounded-lg ${bgColor} ${color} flex items-center justify-center`}>
      {icon}
    </div>
    <div>
      <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{title}</h3>
      <p className="text-lg font-black text-slate-900 tracking-tight">{value}</p>
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
