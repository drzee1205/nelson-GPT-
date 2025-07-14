import React from 'react';
import { Menu, MoreHorizontal } from 'lucide-react';
import { useAppStore } from '../lib/store';

const Header = () => {
  const { toggleSidebar } = useAppStore();

  return (
    <header className="bg-[#121212] border-b border-[#262626] px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="text-white hover:bg-[#333333] p-2 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>
      
      <h1 className="text-white font-bold text-xl">Nelson-GPT</h1>
      
      <button className="text-white hover:bg-[#333333] p-2 rounded-lg transition-colors">
        <MoreHorizontal size={24} />
      </button>
    </header>
  );
};

export default Header;

