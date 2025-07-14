import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Copy, Volume2, RotateCcw, User, Bot } from 'lucide-react';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

const MessageBubble = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message.content);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const renderContent = () => {
    if (isUser) {
      return <div className="whitespace-pre-wrap">{message.content}</div>;
    } else {
      // Render markdown for assistant messages
      const htmlContent = md.render(message.content);
      return (
        <div 
          className="prose prose-invert prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-[#2A2A2A] ml-3' : 'bg-[#1E1E1E] mr-3'
        }`}>
          {isUser ? (
            <User size={16} className="text-white" />
          ) : (
            <Bot size={16} className="text-white" />
          )}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`rounded-2xl px-4 py-3 ${
            isUser 
              ? 'bg-[#2A2A2A] text-white' 
              : 'bg-[#1E1E1E] text-white'
          }`}>
            {renderContent()}
          </div>

          {/* Message Actions */}
          {!isUser && (
            <div className="flex items-center space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleCopy}
                className="p-1 text-[#B0B0B0] hover:text-white transition-colors"
                title={copied ? 'Copied!' : 'Copy'}
              >
                <Copy size={16} />
              </button>
              
              <button
                onClick={handleSpeak}
                className="p-1 text-[#B0B0B0] hover:text-white transition-colors"
                title="Read aloud"
              >
                <Volume2 size={16} />
              </button>
              
              <button
                className="p-1 text-[#B0B0B0] hover:text-white transition-colors"
                title="Thumbs up"
              >
                <ThumbsUp size={16} />
              </button>
              
              <button
                className="p-1 text-[#B0B0B0] hover:text-white transition-colors"
                title="Thumbs down"
              >
                <ThumbsDown size={16} />
              </button>
              
              <button
                className="p-1 text-[#B0B0B0] hover:text-white transition-colors"
                title="Retry"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          )}

          {/* Timestamp */}
          <div className="text-xs text-[#B0B0B0] mt-1">
            {message.timestamp ? new Date(message.timestamp).toLocaleTimeString() : ''}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;

