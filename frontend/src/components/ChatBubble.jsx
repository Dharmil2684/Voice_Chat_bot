import React from 'react';
import { Bot, User } from 'lucide-react';

const ChatBubble = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-2`}>
        
        {/* Avatar */}
        <div className={`p-2 rounded-full ${isUser ? 'bg-blue-100' : 'bg-green-100'}`}>
          {isUser ? <User size={20} className="text-blue-600" /> : <Bot size={20} className="text-green-600" />}
        </div>

        {/* Message Box */}
        <div
          className={`p-3 rounded-lg shadow-sm text-sm md:text-base ${
            isUser
              ? 'bg-blue-600 text-white rounded-tr-none'
              : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
          }`}
        >
          {message.text}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;