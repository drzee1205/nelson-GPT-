import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useAppStore } from './lib/store';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatPage from './components/ChatPage';
import LibraryPage from './components/LibraryPage';
import ExploreGPTsPage from './components/ExploreGPTsPage';
import ChatsPage from './components/ChatsPage';
import SettingsPage from './components/SettingsPage';
import ProfilePage from './components/ProfilePage';
import SplashScreen from './components/SplashScreen';
import './App.css';

const queryClient = new QueryClient();

function App() {
  const { showSplash, sidebarOpen } = useAppStore();

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="app bg-[#121212] text-white min-h-screen flex">
          <Sidebar />
          
          <div className={`flex-1 flex flex-col transition-all duration-300 ${
            sidebarOpen ? 'ml-64' : 'ml-0'
          }`}>
            <Header />
            
            <main className="flex-1 overflow-hidden">
              <Routes>
                <Route path="/" element={<ChatPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/explore" element={<ExploreGPTsPage />} />
                <Route path="/chats" element={<ChatsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

