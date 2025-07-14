import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Search, MoreHorizontal, Trash2, Download, Edit3, Calendar } from 'lucide-react';

const ChatsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChats, setSelectedChats] = useState([]);

  const sampleChats = [
    {
      id: 1,
      title: 'Neonatal Jaundice Discussion',
      preview: 'What are the signs of neonatal jaundice and when should I be concerned?',
      date: '2024-01-15',
      messageCount: 12,
      lastMessage: 'Thank you for the comprehensive explanation about phototherapy...'
    },
    {
      id: 2,
      title: 'Fever Management in Infants',
      preview: 'How do I manage fever in a 6-month-old infant?',
      date: '2024-01-14',
      messageCount: 8,
      lastMessage: 'The guidelines you provided are very helpful for clinical practice.'
    },
    {
      id: 3,
      title: 'Developmental Milestones',
      preview: 'Can you explain the normal developmental milestones for a 2-year-old?',
      date: '2024-01-12',
      messageCount: 15,
      lastMessage: 'This information will be useful for my pediatric rotation.'
    },
    {
      id: 4,
      title: 'Respiratory Infections',
      preview: 'What are the differences between bronchiolitis and pneumonia in children?',
      date: '2024-01-10',
      messageCount: 10,
      lastMessage: 'The diagnostic criteria you mentioned are very clear.'
    },
    {
      id: 5,
      title: 'Nutrition Guidelines',
      preview: 'What are the current breastfeeding recommendations?',
      date: '2024-01-08',
      messageCount: 6,
      lastMessage: 'Thank you for the WHO guidelines reference.'
    }
  ];

  const filteredChats = sampleChats.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectChat = (chatId) => {
    setSelectedChats(prev =>
      prev.includes(chatId)
        ? prev.filter(id => id !== chatId)
        : [...prev, chatId]
    );
  };

  const handleDeleteSelected = () => {
    // In real app, this would delete from backend
    console.log('Deleting chats:', selectedChats);
    setSelectedChats([]);
  };

  const handleExportSelected = () => {
    // In real app, this would export chat data
    console.log('Exporting chats:', selectedChats);
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
          <h1 className="text-3xl font-bold text-white mb-2">Chat History</h1>
          <p className="text-[#B0B0B0]">View and manage your conversation history</p>
        </motion.div>

        {/* Search and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B0B0B0]" size={20} />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1E1E1E] text-white placeholder-[#B0B0B0] pl-10 pr-4 py-3 rounded-lg border border-[#262626] focus:border-[#333333] outline-none"
              />
            </div>

            {selectedChats.length > 0 && (
              <div className="flex space-x-2">
                <button
                  onClick={handleExportSelected}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Download size={16} />
                  <span>Export</span>
                </button>
                <button
                  onClick={handleDeleteSelected}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>

          {selectedChats.length > 0 && (
            <div className="mt-4 text-[#B0B0B0] text-sm">
              {selectedChats.length} conversation{selectedChats.length !== 1 ? 's' : ''} selected
            </div>
          )}
        </motion.div>

        {/* Chat List */}
        <div className="space-y-4">
          {filteredChats.map((chat, index) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-[#1E1E1E] rounded-lg border transition-colors cursor-pointer ${
                selectedChats.includes(chat.id)
                  ? 'border-blue-600 bg-blue-900/20'
                  : 'border-[#262626] hover:border-[#333333]'
              }`}
              onClick={() => handleSelectChat(chat.id)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded border-2 transition-colors ${
                      selectedChats.includes(chat.id)
                        ? 'bg-blue-600 border-blue-600'
                        : 'border-[#B0B0B0]'
                    }`}>
                      {selectedChats.includes(chat.id) && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <MessageCircle size={20} className="text-[#B0B0B0]" />
                    <h3 className="text-white font-semibold text-lg">{chat.title}</h3>
                  </div>
                  
                  <button className="text-[#B0B0B0] hover:text-white transition-colors">
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                <p className="text-[#B0B0B0] mb-4 line-clamp-2">
                  {chat.preview}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} className="text-[#B0B0B0]" />
                      <span className="text-[#B0B0B0]">
                        {new Date(chat.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle size={14} className="text-[#B0B0B0]" />
                      <span className="text-[#B0B0B0]">
                        {chat.messageCount} messages
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle edit
                      }}
                      className="text-[#B0B0B0] hover:text-white transition-colors"
                      title="Rename chat"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle delete
                      }}
                      className="text-[#B0B0B0] hover:text-red-400 transition-colors"
                      title="Delete chat"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-[#262626]">
                  <p className="text-[#B0B0B0] text-sm italic">
                    "{chat.lastMessage}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredChats.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <MessageCircle size={48} className="text-[#B0B0B0] mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">
              {searchQuery ? 'No chats found' : 'No chat history'}
            </h3>
            <p className="text-[#B0B0B0]">
              {searchQuery 
                ? 'Try adjusting your search terms.'
                : 'Start a conversation to see your chat history here.'
              }
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChatsPage;

