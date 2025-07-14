import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  Type, 
  Download, 
  MessageSquare,
  Save,
  Bell,
  Shield,
  HelpCircle
} from 'lucide-react';
import { useAppStore } from '../lib/store';

const SettingsPage = () => {
  const { settings, updateSettings } = useAppStore();
  const [localSettings, setLocalSettings] = useState(settings);
  const [feedback, setFeedback] = useState('');
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  const handleSettingChange = (key, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    updateSettings(localSettings);
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  const handleExportData = () => {
    // In real app, this would export user data
    const data = {
      settings: localSettings,
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nelson-gpt-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmitFeedback = () => {
    // In real app, this would submit to backend
    console.log('Feedback submitted:', feedback);
    setFeedback('');
    alert('Thank you for your feedback!');
  };

  return (
    <div className="h-full bg-[#121212] p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-[#B0B0B0]">Customize your Nelson-GPT experience</p>
        </motion.div>

        {/* Save Notification */}
        {showSaveNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 bg-green-900/20 border border-green-600/30 rounded-lg p-4 flex items-center space-x-2"
          >
            <Save size={20} className="text-green-500" />
            <span className="text-green-200">Settings saved successfully!</span>
          </motion.div>
        )}

        <div className="grid gap-8">
          {/* Appearance */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#1E1E1E] rounded-lg border border-[#262626] p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Moon size={20} />
              <span>Appearance</span>
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white font-medium">Theme</label>
                  <p className="text-[#B0B0B0] text-sm">Choose your preferred theme</p>
                </div>
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-2 px-3 py-2 bg-[#121212] text-white rounded-lg border border-[#262626]">
                    <Moon size={16} />
                    <span>Dark</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 bg-[#262626] text-[#B0B0B0] rounded-lg border border-[#262626] opacity-50 cursor-not-allowed">
                    <Sun size={16} />
                    <span>Light</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white font-medium">Font Size</label>
                  <p className="text-[#B0B0B0] text-sm">Adjust text size for better readability</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Type size={16} className="text-[#B0B0B0]" />
                  <input
                    type="range"
                    min="12"
                    max="18"
                    value={localSettings.fontSize}
                    onChange={(e) => handleSettingChange('fontSize', parseInt(e.target.value))}
                    className="w-24"
                  />
                  <span className="text-white text-sm w-8">{localSettings.fontSize}px</span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Chat Settings */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1E1E1E] rounded-lg border border-[#262626] p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <MessageSquare size={20} />
              <span>Chat Settings</span>
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white font-medium">Typing Sound</label>
                  <p className="text-[#B0B0B0] text-sm">Play sound when typing</p>
                </div>
                <button
                  onClick={() => handleSettingChange('typingSound', !localSettings.typingSound)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    localSettings.typingSound
                      ? 'bg-blue-600 text-white'
                      : 'bg-[#262626] text-[#B0B0B0]'
                  }`}
                >
                  {localSettings.typingSound ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  <span>{localSettings.typingSound ? 'On' : 'Off'}</span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white font-medium">Auto-scroll</label>
                  <p className="text-[#B0B0B0] text-sm">Automatically scroll to new messages</p>
                </div>
                <button
                  onClick={() => handleSettingChange('autoScroll', !localSettings.autoScroll)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    localSettings.autoScroll
                      ? 'bg-blue-600 text-white'
                      : 'bg-[#262626] text-[#B0B0B0]'
                  }`}
                >
                  {localSettings.autoScroll ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            </div>
          </motion.section>

          {/* Privacy & Security */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1E1E1E] rounded-lg border border-[#262626] p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Shield size={20} />
              <span>Privacy & Security</span>
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white font-medium">Data Collection</label>
                  <p className="text-[#B0B0B0] text-sm">Help improve the app by sharing usage data</p>
                </div>
                <button className="px-3 py-2 bg-[#262626] text-[#B0B0B0] rounded-lg">
                  Manage
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white font-medium">Export Data</label>
                  <p className="text-[#B0B0B0] text-sm">Download your chat history and settings</p>
                </div>
                <button
                  onClick={handleExportData}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Download size={16} />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </motion.section>

          {/* Notifications */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#1E1E1E] rounded-lg border border-[#262626] p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Bell size={20} />
              <span>Notifications</span>
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white font-medium">Push Notifications</label>
                  <p className="text-[#B0B0B0] text-sm">Receive notifications for important updates</p>
                </div>
                <button className="px-3 py-2 bg-[#262626] text-[#B0B0B0] rounded-lg">
                  Disabled
                </button>
              </div>
            </div>
          </motion.section>

          {/* Feedback */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#1E1E1E] rounded-lg border border-[#262626] p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <HelpCircle size={20} />
              <span>Feedback</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-white font-medium mb-2 block">
                  Share your thoughts
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us how we can improve Nelson-GPT..."
                  className="w-full bg-[#121212] text-white placeholder-[#B0B0B0] border border-[#262626] rounded-lg p-3 h-24 resize-none focus:border-[#333333] outline-none"
                />
              </div>
              <button
                onClick={handleSubmitFeedback}
                disabled={!feedback.trim()}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  feedback.trim()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-[#262626] text-[#B0B0B0] cursor-not-allowed'
                }`}
              >
                Submit Feedback
              </button>
            </div>
          </motion.section>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-end"
          >
            <button
              onClick={handleSaveSettings}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Save size={20} />
              <span>Save Settings</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

