import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { VolumeX } from 'lucide-react'; // Import Icon
import VoiceRecorder from '../components/VoiceRecorder';
import ChatBubble from '../components/ChatBubble';
import { sendTextToBot, getChatHistory } from '../services/api';

const Home = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your assistant. Ask me anything.' }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); // Track speech state
  
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  // 1. Load Chat History
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); 
      return;
    }

    getChatHistory()
      .then(history => {
        if (history.length > 0) {
          setMessages(history);
        }
      })
      .catch(err => console.error("Failed to load history", err));
  }, [navigate]);

  // 2. Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- NEW: STOP AUDIO FUNCTION ---
  const stopAudio = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // 3. Handle Voice Input
  const handleVoiceInput = async (userText) => {
    stopAudio(); // <--- CRITICAL: Stop old audio immediately
    setIsProcessing(true);
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    
    try {
      const data = await sendTextToBot(userText);
      setMessages(prev => [...prev, { sender: 'bot', text: data.botResponse }]);

      const utterance = new SpeechSynthesisUtterance(data.botResponse);
      
      // Track start/end of speech for UI
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);

    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, I encountered an error." }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-full flex flex-col items-center pb-10">
      
      {/* Chat Area */}
      <div className="w-full max-w-md flex-1 overflow-y-auto px-4 pt-6 mb-40">
        <div className="flex flex-col justify-end min-h-[400px]">
            {messages.map((msg, idx) => (
              <ChatBubble key={idx} message={msg} />
            ))}
            <div ref={chatEndRef} />
        </div>
      </div>

      {/* CONTROLS AREA */}
      <div className="fixed bottom-10 z-40 flex flex-col items-center gap-4">
        
        {/* Manual Stop Button - Only appears when speaking */}
        {isSpeaking && (
          <button 
            onClick={stopAudio}
            className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-700 transition animate-bounce"
          >
            <VolumeX size={18} /> Stop Speaking
          </button>
        )}

        {/* Recorder with Auto-Stop Hook */}
        <VoiceRecorder 
            onRecordingComplete={handleVoiceInput} 
            isProcessing={isProcessing} 
            onInteraction={stopAudio} // <--- Tells recorder to stop audio when clicked
        />
      </div>
    </div>
  );
};

export default Home;