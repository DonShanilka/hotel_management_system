import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis } from "recharts";
import { Bell } from "lucide-react";
import { parseISO, format } from "date-fns";

const Dashboard: React.FC = () => {
  const [roomCount, setRoomCount] = useState<number>(0);
  const [employeeCount, setEmployeeCount] = useState<number>(0);
  const [guestCount, setGuestCount] = useState<number>(0);
  const [bookingCount, setBookingCount] = useState<number>(0);
  const [paymentCount, setPaymentCount] = useState<number>(0);
  const [monthlyData, setMonthlyData] = useState<{ name: string; value: number }[]>([]);

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

        const totalRevenue = payments.reduce((acc, payment) => acc + Number(payment.totalPayment), 0);
        setPaymentCount(totalRevenue);

        const monthlyRevenueMap: { [key: string]: number } = {};

        payments.forEach((payment: any) => {
          const month = format(parseISO(payment.createdAt), "MMM");
          if (!monthlyRevenueMap[month]) {
            monthlyRevenueMap[month] = 0;
          }
          monthlyRevenueMap[month] += Number(payment.totalPayment);
        });

        const orderedMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const sortedMonthlyData = orderedMonths.map((month) => ({
          name: month,
          value: monthlyRevenueMap[month] || 0,
        }));

        setMonthlyData(sortedMonthlyData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

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
            <svg
              className="absolute left-2 top-2.5 text-gray-500"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
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
          <StatCard
            title="Total Revenue"
            value={`$${paymentCount}`}
            change="+3%"
            changeType="positive"
            color="bg-green-100"
            textColor="text-green-500"
          />
          <StatCard
            title="Employees"
            value={`${employeeCount}`}
            change="+4%"
            changeType="positive"
            color="bg-red-100"
            textColor="text-red-500"
          />
          <StatCard
            title="Guests"
            value={`${guestCount}`}
            change="+2%"
            changeType="positive"
            color="bg-purple-100"
            textColor="text-purple-500"
          />
          <StatCard
            title="Bookings"
            value={`${bookingCount}`}
            change="+5%"
            changeType="positive"
            color="bg-blue-100"
            textColor="text-blue-500"
          />
          <StatCard
            title="Rooms"
            value={`${roomCount}`}
            change="+0%"
            changeType="positive"
            color="bg-yellow-100"
            textColor="text-yellow-500"
          />
        </div>

        <div className="w-2/5 gap-6">
          <div className="col-span-2 bg-white rounded-xl p-2 shadow-sm">
            <div className="flex justify-between mb-6">
              <div>
                <h2 className="text-lg font-medium mb-2">Monthly Revenue</h2>
                {/* <div className="text-2xl font-semibold">${paymentCount}</div> */}
              </div>
            </div>

            <BarChart width={600} height={200} data={monthlyData} barSize={20}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <Bar
                dataKey="value"
                shape={(props: any) => {
                  const { x, y, width, height, index } = props;
                  return (
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      fill={index === 4 ? "#000080" : "#2563EB"}
                      rx={4}
                      ry={4}
                    />
                  );
                }}
              />
            </BarChart>
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
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex mb-1">
        <div
          className={`w-8 h-8 ${color} ${textColor} rounded-full flex items-center justify-center mb-2`}
        >
          <span className="block w-3 h-3 rounded-full bg-current"></span>
        </div>
      </div>
      <p className="text-gray-500 text-sm mb-1">{title}</p>
      <div className="flex items-center">
        <span className="text-xl font-bold mr-2">{value}</span>
        <span
          className={`text-xs ${
            changeType === "positive" ? "text-green-500" : "text-red-500"
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
