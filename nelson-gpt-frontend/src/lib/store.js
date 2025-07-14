import { create } from 'zustand';

export const useAppStore = create((set, get) => ({
  // UI State
  showSplash: true,
  sidebarOpen: false,
  theme: 'dark',
  
  // Chat State
  messages: [],
  isTyping: false,
  currentChatId: null,
  
  // User State
  user: {
    name: 'Zeeshan Islam',
    email: 'zeeshan@example.com'
  },
  
  // Actions
  setSplashScreen: (show) => set({ showSplash: show }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, {
      ...message,
      id: Date.now(),
      timestamp: new Date().toISOString()
    }]
  })),
  
  setIsTyping: (typing) => set({ isTyping: typing }),
  
  clearMessages: () => set({ messages: [] }),
  
  setCurrentChatId: (id) => set({ currentChatId: id }),
  
  // Chat history management
  chatHistory: [],
  
  addChatToHistory: (chat) => set((state) => ({
    chatHistory: [chat, ...state.chatHistory]
  })),
  
  removeChatFromHistory: (chatId) => set((state) => ({
    chatHistory: state.chatHistory.filter(chat => chat.id !== chatId)
  })),
  
  // Settings
  settings: {
    typingSound: true,
    fontSize: 14,
    autoScroll: true
  },
  
  updateSettings: (newSettings) => set((state) => ({
    settings: { ...state.settings, ...newSettings }
  }))
}));

