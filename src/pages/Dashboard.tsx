import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Bell } from "lucide-react";
import { parseISO, format, subDays, isSameDay } from "date-fns";

const Dashboard: React.FC = () => {
  const [roomCount, setRoomCount] = useState<number>(0);
  const [employeeCount, setEmployeeCount] = useState<number>(0);
  const [guestCount, setGuestCount] = useState<number>(0);
  const [bookingCount, setBookingCount] = useState<number>(0);
  const [paymentCount, setPaymentCount] = useState<number>(0);
  const [monthlyData, setMonthlyData] = useState<{ name: string; value: number }[]>([]);
  const [last7DaysData, setLast7DaysData] = useState<{ name: string; value: number }[]>([]);

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

  const COLORS = ["#2563EB", "#38BDF8", "#22C55E", "#EAB308", "#F97316", "#EF4444", "#8B5CF6"];

  return (
    <div className="min-h-screen w-full bg-gray-100 text-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="py-2 pl-10 pr-4 rounded-full bg-white shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
            <svg className="absolute left-3 top-2.5 text-gray-500" width="18" height="18" viewBox="0 0 24 24">
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                2
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center font-medium text-sm">
                DS
              </div>
              <div>
                <div className="font-semibold">David Spade</div>
                <div className="text-xs text-gray-500">Administrator</div>
              </div>
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          <StatCard title="Total Revenue" value={`$${paymentCount}`} change="+3%" changeType="positive" color="bg-green-100" textColor="text-green-600" />
          <StatCard title="Employees" value={`${employeeCount}`} change="+4%" changeType="positive" color="bg-red-100" textColor="text-red-600" />
          <StatCard title="Guests" value={`${guestCount}`} change="+2%" changeType="positive" color="bg-purple-100" textColor="text-purple-600" />
          <StatCard title="Bookings" value={`${bookingCount}`} change="+5%" changeType="positive" color="bg-blue-100" textColor="text-blue-600" />
          <StatCard title="Rooms" value={`${roomCount}`} change="+0%" changeType="positive" color="bg-yellow-100" textColor="text-yellow-600" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {monthlyData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={index === 4 ? "#1E3A8A" : "#3B82F6"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Last 7 Days Income</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={last7DaysData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {last7DaysData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  color: string;
  textColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType,
  color,
  textColor,
}) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md">
      <div className="flex items-center space-x-2 mb-2">
        <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center`}>
          <span className={`w-3 h-3 rounded-full ${textColor} bg-current`}></span>
        </div>
        <p className="text-gray-500 text-sm">{title}</p>
      </div>
      <div className="flex items-baseline space-x-2">
        <span className="text-xl font-bold">{value}</span>
        <span className={`text-xs ${changeType === "positive" ? "text-green-500" : "text-red-500"}`}>
          {change}
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
