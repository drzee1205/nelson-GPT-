import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Calendar, 
  HardDrive, 
  Shield, 
  FileText, 
  LogOut,
  Edit,
  Settings,
  Award,
  Clock
} from 'lucide-react';
import { useAppStore } from '../lib/store';

const ProfilePage = () => {
  const { user } = useAppStore();

  const stats = [
    { label: 'Conversations', value: '47', icon: '💬' },
    { label: 'Questions Asked', value: '156', icon: '❓' },
    { label: 'Days Active', value: '23', icon: '📅' },
    { label: 'Knowledge Areas', value: '8', icon: '📚' }
  ];

  const recentActivity = [
    {
      action: 'Asked about neonatal jaundice',
      time: '2 hours ago',
      category: 'Neonatology'
    },
    {
      action: 'Calculated drug dosage',
      time: '1 day ago',
      category: 'Pharmacology'
    },
    {
      action: 'Reviewed growth milestones',
      time: '2 days ago',
      category: 'Development'
    },
    {
      action: 'Searched respiratory infections',
      time: '3 days ago',
      category: 'Respiratory'
    }
  ];

  return (
    <div className="h-full bg-[#121212] p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
          <p className="text-[#B0B0B0]">Manage your account and preferences</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Basic Info */}
            <div className="bg-[#1E1E1E] rounded-lg border border-[#262626] p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Basic Information</h2>
                <button className="flex items-center space-x-2 px-3 py-2 text-[#B0B0B0] hover:text-white transition-colors">
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
              </div>

              <div className="flex items-center space-x-6 mb-6">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{user.name}</h3>
                  <p className="text-[#B0B0B0]">Pediatric Healthcare Professional</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Mail size={20} className="text-[#B0B0B0]" />
                  <div>
                    <label className="text-[#B0B0B0] text-sm">Email</label>
                    <div className="text-white">{user.email}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar size={20} className="text-[#B0B0B0]" />
                  <div>
                    <label className="text-[#B0B0B0] text-sm">Member Since</label>
                    <div className="text-white">January 2024</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="bg-[#1E1E1E] rounded-lg border border-[#262626] p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Usage Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="text-center p-4 bg-[#121212] rounded-lg border border-[#262626]"
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-[#B0B0B0] text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#1E1E1E] rounded-lg border border-[#262626] p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center space-x-4 p-3 bg-[#121212] rounded-lg border border-[#262626]"
                  >
                    <Clock size={16} className="text-[#B0B0B0]" />
                    <div className="flex-1">
                      <div className="text-white">{activity.action}</div>
                      <div className="text-[#B0B0B0] text-sm">{activity.time}</div>
                    </div>
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-300 text-xs rounded">
                      {activity.category}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Storage */}
            <div className="bg-[#1E1E1E] rounded-lg border border-[#262626] p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <HardDrive size={20} />
                <span>Storage</span>
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#B0B0B0]">Used</span>
                  <span className="text-white">2.5 MB / 10 MB</span>
                </div>
                <div className="w-full bg-[#262626] rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
                <p className="text-[#B0B0B0] text-xs">
                  Chat history and preferences
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#1E1E1E] rounded-lg border border-[#262626] p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-[#B0B0B0] hover:text-white hover:bg-[#262626] rounded-lg transition-colors">
                  <Settings size={16} />
                  <span>Account Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-[#B0B0B0] hover:text-white hover:bg-[#262626] rounded-lg transition-colors">
                  <Shield size={16} />
                  <span>Privacy Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-[#B0B0B0] hover:text-white hover:bg-[#262626] rounded-lg transition-colors">
                  <FileText size={16} />
                  <span>Export Data</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors">
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* App Info */}
            <div className="bg-[#1E1E1E] rounded-lg border border-[#262626] p-6">
              <h3 className="text-lg font-semibold text-white mb-4">App Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#B0B0B0]">Version</span>
                  <span className="text-white">v1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B0B0B0]">Last Updated</span>
                  <span className="text-white">Jan 15, 2024</span>
                </div>
                <div className="pt-3 border-t border-[#262626]">
                  <button className="text-blue-400 hover:text-blue-300 transition-colors">
                    Privacy Policy
                  </button>
                </div>
                <div>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors">
                    Terms of Service
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

