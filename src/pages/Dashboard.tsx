import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, PieChart, Pie, Cell, Tooltip } from "recharts";
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

  console.log("Monthly Data ",monthlyData);
  console.log("Last 7 Day Data ",last7DaysData);

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

        // Monthly Revenue
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

        // Last 7 Days Income
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
    <div className="flex h-full bg-blue-50 w-full relative -top-20">
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Type to search..."
              className="py-2 pl-8 pr-4 rounded-md bg-gray-100 w-64"
            />
            <svg className="absolute left-2 top-2.5 text-gray-500" width="16" height="16" viewBox="0 0 24 24">
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex items-center">
            <div className="relative mr-4">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                2
              </span>
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

        <div className="grid grid-cols-5 gap-4 mb-6">
          <StatCard title="Total Revenue" value={`$${paymentCount}`} change="+3%" changeType="positive" color="bg-green-100" textColor="text-green-500" />
          <StatCard title="Employees" value={`${employeeCount}`} change="+4%" changeType="positive" color="bg-red-100" textColor="text-red-500" />
          <StatCard title="Guests" value={`${guestCount}`} change="+2%" changeType="positive" color="bg-purple-100" textColor="text-purple-500" />
          <StatCard title="Bookings" value={`${bookingCount}`} change="+5%" changeType="positive" color="bg-blue-100" textColor="text-blue-500" />
          <StatCard title="Rooms" value={`${roomCount}`} change="+0%" changeType="positive" color="bg-yellow-100" textColor="text-yellow-500" />
        </div>

        <div className="flex gap-6">
          <div className="bg-white rounded-xl p-4 shadow-sm w-2/3">
            <h2 className="text-lg font-medium mb-12">Monthly Revenue</h2>
            <BarChart width={600} height={200} data={monthlyData} barSize={20}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <Bar dataKey="value">
                {monthlyData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={index === 4 ? "#000080" : "#2563EB"} rx={4} ry={4} />
                ))}
              </Bar>
            </BarChart>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm w-1/2">
            <h2 className="text-lg font-medium mb-4">Last 7 Days Income</h2>
            <PieChart width={400} height={250}>
              <Pie
                data={last7DaysData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {last7DaysData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
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
        <span className={`text-xs ${changeType === "positive" ? "text-green-500" : "text-red-500"}`}>{change}</span>
      </div>
    </div>
  );
};

export default Dashboard;