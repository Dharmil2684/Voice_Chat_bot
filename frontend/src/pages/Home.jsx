import React, { useState, useEffect, useRef } from 'react'; // <-- THIS WAS MISSING
import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, LogOut } from 'lucide-react';
import VoiceRecorder from '../components/VoiceRecorder';
import ChatBubble from '../components/ChatBubble';
import { sendTextToBot, getChatHistory } from '../services/api';

const Home = () => {
  // 1. State for storing chat messages
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your banking assistant. Ask me anything.' }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const navigate = useNavigate();
  const chatEndRef = useRef(null); // To auto-scroll to bottom

  // 2. Load Chat History when page opens
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // If not logged in, send to Login page
    if (!token) {
      navigate('/login'); 
      return;
    }

    // Fetch previous chats from Database
    getChatHistory()
      .then(history => {
        if (history.length > 0) {
          setMessages(history);
        }
      })
      .catch(err => console.error("Failed to load history", err));
  }, [navigate]);

  // 3. Auto-scroll to bottom when new message arrives
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 4. Handle Voice Input
  const handleVoiceInput = async (userText) => {
    setIsProcessing(true);
    
    // Optimistically add user text to UI
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    
    try {
      // Send to Backend
      const data = await sendTextToBot(userText);
      
      // Add Bot Response to UI
      setMessages(prev => [...prev, { sender: 'bot', text: data.botResponse }]);

      // Speak the Response
      const utterance = new SpeechSynthesisUtterance(data.botResponse);
      window.speechSynthesis.speak(utterance);

    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, I encountered an error." }]);
    } finally {
      setIsProcessing(false);
    }
  };

  // 5. Logout Function
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      
      {/* Header */}
      <div className="w-full max-w-md px-4 flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Voice Bot 🤖</h1>
        <div className="flex gap-2">
          <Link to="/dashboard" className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
            <BarChart3 className="text-gray-600" size={20} />
          </Link>
          <button onClick={handleLogout} className="p-2 bg-red-50 rounded-full shadow hover:bg-red-100">
            <LogOut className="text-red-500" size={20} />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-full max-w-md flex-1 overflow-y-auto px-4 mb-32">
        <div className="flex flex-col justify-end min-h-[400px]">
            {messages.map((msg, idx) => (
              <ChatBubble key={idx} message={msg} />
            ))}
            <div ref={chatEndRef} />
        </div>
      </div>

      {/* Recorder Controls */}
      <div className="fixed bottom-10">
        <VoiceRecorder onRecordingComplete={handleVoiceInput} isProcessing={isProcessing} />
      </div>
    </div>
  );
};

export default Home;