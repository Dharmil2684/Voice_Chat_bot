import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import VoiceRecorder from '../components/VoiceRecorder';
import ChatBubble from '../components/ChatBubble';
import { sendTextToBot, getChatHistory } from '../services/api';

const Home = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your assistant. Ask me anything.' }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  
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

  // 3. Handle Voice Input
  const handleVoiceInput = async (userText) => {
    setIsProcessing(true);
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    
    try {
      const data = await sendTextToBot(userText);
      setMessages(prev => [...prev, { sender: 'bot', text: data.botResponse }]);

      const utterance = new SpeechSynthesisUtterance(data.botResponse);
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
      {/* Added 'pt-6' so messages don't hide behind the Navbar */}
      <div className="w-full max-w-md flex-1 overflow-y-auto px-4 pt-6 mb-32">
        <div className="flex flex-col justify-end min-h-[400px]">
            {messages.map((msg, idx) => (
              <ChatBubble key={idx} message={msg} />
            ))}
            <div ref={chatEndRef} />
        </div>
      </div>

      {/* Recorder Controls */}
      <div className="fixed bottom-10 z-40">
        <VoiceRecorder onRecordingComplete={handleVoiceInput} isProcessing={isProcessing} />
      </div>
    </div>
  );
};

export default Home;