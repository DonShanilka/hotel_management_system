import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Hotel,
  BookOpen,
  Users,
  ScrollText,
  BarChart3,
  User,
  Briefcase,
  DollarSign,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("rolle");

  const menuItems = [
    { text: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { text: "Room Management", icon: Hotel, path: "/room-management" },
    { text: "Reservation", icon: BookOpen, path: "/reservation" },
    { text: "Guest Management", icon: Users, path: "/guest-management" },
    { text: "Housekeeping", icon: ScrollText, path: "/housekeeping" },
    { text: "Accusation", icon: BarChart3, path: "/accusation" },
    { text: "Employee", icon: User, path: "/employee" },
    { text: "Service", icon: Briefcase, path: "/service" },
    { text: "Payment", icon: DollarSign, path: "/payment" },
  ];

  let filteredMenuItems = [];

  if (role === "HOUSEKEEPING") {
    filteredMenuItems = menuItems.filter(
      (item) => item.text === "Dashboard"
    );
  } else if (role === "RECEPTIONIST") {
    filteredMenuItems = menuItems.filter(
      (item) =>
        item.text === "Dashboard" ||
        item.text === "Reservation" ||
        item.text === "Guest Management" ||
        item.text === "Payment"
    );
  } else if (role === "MANAGER") {
    filteredMenuItems = menuItems; 
  } else {
    filteredMenuItems = menuItems; 
  }

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <div className="w-70 min-h-screen bg-white text-black flex flex-col fixed left-0 top-0 bottom-0">
        <div className="h-16 flex items-center px-4 border-b">
          <h1 className="text-lg font-semibold tracking-wide text-black">
            Blue Beach Villa
          </h1>
        </div>

        <nav className="flex-1 pt-4 overflow-y-auto">
          <ul className="space-y-1 px-4">
            {filteredMenuItems.map(({ text, icon: Icon, path }) => (
              <li key={path}>
                <button
                  onClick={() => navigate(path)}
                  className={`w-full flex items-center px-3 py-2 rounded-sm transition-all duration-200 group relative
                    ${
                      location.pathname === path
                        ? "bg-blue-50 font-semibold"
                        : "hover:bg-gray-100 hover:translate-x-1"
                    }`}
                >
                  {location.pathname === path && (
                    <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r" />
                  )}

                  <Icon
                    size={20}
                    className={`mr-3 ${
                      location.pathname === path
                        ? "text-blue-600"
                        : "text-black/70 group-hover:text-black"
                    }`}
                  />

                  <span
                    className={`${
                      location.pathname === path
                        ? "text-blue-600"
                        : "text-black/70 group-hover:text-black"
                    }`}
                  >
                    {text}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* CONTENT SPACE */}
      <div className="flex-1 ml-70 overflow-y-auto"></div>
    </div>
  );
};

export default Sidebar;
