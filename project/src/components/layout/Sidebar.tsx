import React, { useState } from 'react';
import { 
  BarChart3, 
  Activity, 
  AlertCircle, 
  Cpu, 
  Settings, 
  Menu, 
  X, 
  Home,
  Network,
  Shield,
  History
} from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive = false, onClick }) => {
  return (
    <button
      className={`flex items-center space-x-3 w-full px-3 py-2 text-left transition-colors rounded-md ${
        isActive 
          ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100' 
          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
      }`}
      onClick={onClick}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
};

interface SidebarProps {
  onNavChange: (view: string) => void;
  currentView: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavChange, currentView }) => {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (view: string) => {
    onNavChange(view);
    if (window.innerWidth < 768) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        onClick={toggleMobileSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-gray-600 bg-opacity-75 z-30"
          onClick={toggleMobileSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-900 transition-all duration-300 shadow-lg z-30
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 ${expanded ? 'w-64' : 'w-20'}`}
      >
        <div className="h-full flex flex-col">
          {/* Logo and collapse button */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center">
              <Network className="h-8 w-8 text-blue-600 dark:text-blue-500" />
              {expanded && (
                <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                  NetMonitor
                </span>
              )}
            </div>
            <button
              type="button"
              className="hidden md:block p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={toggleSidebar}
            >
              <span className="sr-only">
                {expanded ? 'Collapse sidebar' : 'Expand sidebar'}
              </span>
              {expanded ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            <NavItem
              icon={<Home className="h-5 w-5" />}
              label="Dashboard"
              isActive={currentView === 'dashboard'}
              onClick={() => handleNavClick('dashboard')}
            />
            <NavItem
              icon={<Activity className="h-5 w-5" />}
              label="Live Traffic"
              isActive={currentView === 'liveTraffic'}
              onClick={() => handleNavClick('liveTraffic')}
            />
            <NavItem
              icon={<Cpu className="h-5 w-5" />}
              label="Devices"
              isActive={currentView === 'devices'}
              onClick={() => handleNavClick('devices')}
            />
            <NavItem
              icon={<BarChart3 className="h-5 w-5" />}
              label="Analytics"
              isActive={currentView === 'analytics'}
              onClick={() => handleNavClick('analytics')}
            />
            <NavItem
              icon={<History className="h-5 w-5" />}
              label="History"
              isActive={currentView === 'history'}
              onClick={() => handleNavClick('history')}
            />
            <NavItem
              icon={<AlertCircle className="h-5 w-5" />}
              label="Alerts"
              isActive={currentView === 'alerts'}
              onClick={() => handleNavClick('alerts')}
            />
            <NavItem
              icon={<Shield className="h-5 w-5" />}
              label="Security"
              isActive={currentView === 'security'}
              onClick={() => handleNavClick('security')}
            />

            <div className="border-t border-gray-200 dark:border-gray-800 my-4"></div>

            <NavItem
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              isActive={currentView === 'settings'}
              onClick={() => handleNavClick('settings')}
            />
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;