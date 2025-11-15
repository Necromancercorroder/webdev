import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  ClipboardList, 
  Map, 
  History, 
  Award, 
  BookOpen, 
  MessageCircle, 
  Settings 
} from 'lucide-react';

const VolunteerSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/volunteer-application', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/volunteer-application/profile', icon: User, label: 'Profile' },
    { path: '/volunteer-application/assigned-tasks', icon: ClipboardList, label: 'Assigned Tasks' },
    { path: '/volunteer-application/map-view', icon: Map, label: 'Map View' },
    { path: '/volunteer-application/verification-history', icon: History, label: 'Verification History' },
    { path: '/volunteer-application/rewards-leaderboard', icon: Award, label: 'Rewards & Leaderboard' },
    { path: '/volunteer-application/training-resources', icon: BookOpen, label: 'Training & Resources' },
    { path: '/volunteer-application/support-chat', icon: MessageCircle, label: 'Support / Chat' },
    { path: '/volunteer-application/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 h-full p-4">
      <h1 className="text-2xl font-bold mb-8">TrustBridge</h1>
      <nav>
        <ul>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path} className="mb-4">
                <Link 
                  to={item.path} 
                  className={`flex items-center gap-3 text-lg hover:text-blue-400 transition-colors ${
                    isActive ? 'text-blue-400' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default VolunteerSidebar;
