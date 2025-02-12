import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Hotel, BookOpen, Users, ScrollText, BarChart3, User, Briefcase, ClipboardList, DollarSign } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { text: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { text: 'Room Management', icon: Hotel, path: '/room-management' },
    { text: 'Reservation', icon: BookOpen, path: '/reservation' },
    { text: 'Guest Management', icon: Users, path: '/guest-management' },
    { text: 'Housekeeping', icon: ScrollText, path: '/housekeeping' },
    { text: 'Accusation', icon: BarChart3, path: '/accusation' },
    { text: 'Employee', icon: User, path: '/employee' },  // Changed to 'User' for employees
    { text: 'Service', icon: Briefcase, path: '/service' }, // 'Briefcase' for services
    { text: 'Service Usage', icon: ClipboardList, path: '/serviceUsage' }, // 'ClipboardList' for usage tracking
    { text: 'Payment', icon: DollarSign, path: '/payment' }
];

  return (
    <div className="w-70 min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-white flex flex-col">
      <div className="h-16 flex items-center px-4 border-b border-white/10 bg-gradient-to-r from-blue-900 to-blue-800">
        <h1 className="text-lg font-semibold tracking-wide text-white">
          Hotel Management
        </h1>
      </div>

      <nav className="flex-1 pt-4">
        <ul className="space-y-1 px-4">
          {menuItems.map(({ text, icon: Icon, path }) => (
            <li key={path}>
              <button
                onClick={() => navigate(path)}
                className={`w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 group relative
                  ${location.pathname === path 
                    ? 'bg-white/20 font-semibold' 
                    : 'hover:bg-white/10 hover:translate-x-1'
                  }`}
              >
                {location.pathname === path && (
                  <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-1 h-8 bg-white rounded-r" />
                )}
                <Icon 
                  size={20} 
                  className={`mr-3 ${location.pathname === path 
                    ? 'text-white' 
                    : 'text-white/70 group-hover:text-white'
                  }`}
                />
                <span className={`${location.pathname === path 
                  ? 'text-white' 
                  : 'text-white/70 group-hover:text-white'
                }`}>
                  {text}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
