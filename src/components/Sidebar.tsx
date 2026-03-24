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
  ChevronRight,
  ShieldCheck,
  Settings,
  HelpCircle,
} from "lucide-react";

interface MenuItem {
  text: string;
  icon: any;
  path: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("rolle");

  const menuSections: MenuSection[] = [
    {
      title: "Main Menu",
      items: [
        { text: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { text: "Room Status", icon: Hotel, path: "/room-management" },
        { text: "Guest List", icon: Users, path: "/guest-management" },
        { text: "Reservations", icon: BookOpen, path: "/reservation" },
      ],
    },
    {
      title: "Service Modules",
      items: [
        { text: "Housekeeping", icon: ScrollText, path: "/housekeeping" },
        { text: "Service Mgmt", icon: Briefcase, path: "/service" },
        { text: "Financial Reports", icon: BarChart3, path: "/accusation" },
      ],
    },
    {
      title: "Management",
      items: [
        { text: "Employees", icon: User, path: "/employee" },
        { text: "Payments", icon: DollarSign, path: "/payment" },
      ],
    },
    {
      title: "System",
      items: [
        { text: "Settings", icon: Settings, path: "/settings" },
        { text: "Help Center", icon: HelpCircle, path: "/help" },
      ],
    },
  ];

  const filterMenuByRole = (sections: MenuSection[]) => {
    if (role === "HOUSEKEEPING") {
      return sections.map(s => ({
        ...s,
        items: s.items.filter(i => i.text === "Dashboard" || i.text === "Housekeeping")
      })).filter(s => s.items.length > 0);
    } else if (role === "RECEPTIONIST") {
      return sections.map(s => ({
        ...s,
        items: s.items.filter(i =>
          i.text === "Dashboard" ||
          i.text === "Reservations" ||
          i.text === "Guest List" ||
          i.text === "Payments"
        )
      })).filter(s => s.items.length > 0);
    }
    return sections;
  };

  const filteredSections = filterMenuByRole(menuSections);

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 font-sans">

      {/* Brand Logo Section */}
      <div className="h-20 flex items-center px-6 gap-3 pt-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-[#14b8a6] flex items-center justify-center shadow-lg shadow-teal-100">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight text-slate-900 leading-none">
              Blue<span className="text-[#14b8a6]">Villa</span>
            </h1>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">v2.4 Management</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 px-4 overflow-y-auto custom-scrollbar space-y-8">
        {filteredSections.map((section, idx) => (
          <div key={idx}>
            <div className="px-3 mb-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
              {section.title}
            </div>
            <ul className="space-y-1">
              {section.items.map(({ text, icon: Icon, path }) => {
                const isActive = location.pathname === path || (path === "/dashboard" && location.pathname === "/");
                return (
                  <li key={path}>
                    <button
                      onClick={() => navigate(path)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium group
                        ${isActive
                          ? "bg-gradient-to-r from-[#14b8a6] to-[#0ea5e9] text-white shadow-md shadow-teal-100"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                    >
                      <Icon
                        size={18}
                        className={`transition-colors duration-200 ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"}`}
                      />
                      <span className="flex-1 text-left truncate">{text}</span>
                      {isActive && <ChevronRight size={14} className="text-white/70" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs shadow-inner">
              NV
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">Noviq Agency</p>
            <p className="text-[11px] text-slate-400 font-medium">Administrator</p>
          </div>
          <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
            <Settings size={16} />
          </button>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
