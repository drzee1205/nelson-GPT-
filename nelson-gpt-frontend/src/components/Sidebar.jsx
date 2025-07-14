import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Search, 
  MessageCircle, 
  Plus, 
  Settings, 
  User,
  LogOut,
  X
} from 'lucide-react';
import { useAppStore } from '../lib/store';

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen, user } = useAppStore();
  const location = useLocation();

  const menuItems = [
    { icon: BookOpen, label: 'Library', path: '/library' },
    { icon: Search, label: 'Explore GPTs', path: '/explore' },
    { icon: MessageCircle, label: 'Chats', path: '/chats' },
    { icon: Plus, label: 'New Chat', path: '/chat' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-64 bg-[#121212] border-r border-[#262626] z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-[#262626] flex items-center justify-between">
              <h2 className="text-white font-bold text-lg">Menu</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-[#B0B0B0] hover:text-white transition-colors lg:hidden"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 p-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-[#1E1E1E] text-white'
                      : 'text-[#B0B0B0] hover:text-white hover:bg-[#1E1E1E]'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Profile Section */}
            <div className="p-4 border-t border-[#262626]">
              <Link
                to="/profile"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors mb-2 ${
                  isActive('/profile')
                    ? 'bg-[#1E1E1E] text-white'
                    : 'text-[#B0B0B0] hover:text-white hover:bg-[#1E1E1E]'
                }`}
              >
                <User size={20} />
                <div className="flex-1">
                  <div className="text-sm font-medium">{user.name}</div>
                  <div className="text-xs text-[#B0B0B0]">View Profile</div>
                </div>
              </Link>
              
              <button className="flex items-center space-x-3 px-3 py-2 rounded-lg text-[#B0B0B0] hover:text-white hover:bg-[#333333] transition-colors w-full">
                <LogOut size={20} />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;

