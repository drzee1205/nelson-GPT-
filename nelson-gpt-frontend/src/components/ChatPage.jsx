import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Image, Settings, ThumbsUp, ThumbsDown, Copy, Volume2, RotateCcw } from 'lucide-react';
import { useAppStore } from '../lib/store';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const ChatPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  const { messages, addMessage, isTyping, setIsTyping, clearMessages } = useAppStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isStreaming) return;

    const userMessage = {
      role: 'user',
      content: inputValue.trim()
    };

    addMessage(userMessage);
    setInputValue('');
    setIsTyping(true);
    setIsStreaming(true);

    try {
      // Call backend API for streaming response
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages.slice(-10) // Send last 10 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      // Add initial assistant message
      const assistantMessageObj = {
        role: 'assistant',
        content: '',
        isStreaming: true
      };
      addMessage(assistantMessageObj);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                assistantMessage += data.content;
                // Update the last message with streaming content
                // This would need to be implemented in the store
              } else if (data.done) {
                setIsTyping(false);
                setIsStreaming(false);
              } else if (data.error) {
                throw new Error(data.error);
              }
            } catch (e) {
              console.error('Error parsing streaming data:', e);
            }
          }
        }
      }

      // Final message update
      addMessage({
        role: 'assistant',
        content: assistantMessage,
        isStreaming: false
      });

    } catch (error) {
      console.error('Error sending message:', error);
      addMessage({
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        isStreaming: false
      });
    } finally {
      setIsTyping(false);
      setIsStreaming(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    clearMessages();
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full bg-[#121212]">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🩺</div>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome to Nelson-GPT</h2>
              <p className="text-[#B0B0B0] mb-6 max-w-md mx-auto">
                Your AI assistant for pediatric medicine. Ask me anything about child health, 
                development, or medical conditions based on the Nelson Textbook of Pediatrics.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {[
                  "What are the signs of neonatal jaundice?",
                  "How do I manage fever in infants?",
                  "What are normal developmental milestones?",
                  "Tell me about pediatric respiratory infections"
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(suggestion)}
                    className="p-3 bg-[#1E1E1E] hover:bg-[#2A2A2A] rounded-lg text-left text-[#B0B0B0] hover:text-white transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            messages.map((message, index) => (
              <MessageBubble key={message.id || index} message={message} />
            ))
          )}
        </AnimatePresence>

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-[#262626] p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1E1E1E] rounded-3xl p-2 flex items-end space-x-2">
            <button className="p-2 text-[#B0B0B0] hover:text-white transition-colors">
              <Image size={20} />
            </button>
            
            <button className="p-2 text-[#B0B0B0] hover:text-white transition-colors">
              <Settings size={20} />
            </button>

            <div className="flex-1">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about pediatric medicine..."
                className="w-full bg-transparent text-white placeholder-[#B0B0B0] resize-none outline-none py-2 px-2 max-h-32"
                rows={1}
                style={{
                  minHeight: '40px',
                  height: 'auto'
                }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />
            </div>

            <button className="p-2 text-[#B0B0B0] hover:text-white transition-colors">
              <Mic size={20} />
            </button>

            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isStreaming}
              className={`p-2 rounded-full transition-colors ${
                inputValue.trim() && !isStreaming
                  ? 'text-white hover:bg-[#333333]'
                  : 'text-[#B0B0B0] cursor-not-allowed'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
          
          {messages.length > 0 && (
            <div className="flex justify-center mt-2">
              <button
                onClick={handleNewChat}
                className="text-[#B0B0B0] hover:text-white text-sm transition-colors"
              >
                Start New Chat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

