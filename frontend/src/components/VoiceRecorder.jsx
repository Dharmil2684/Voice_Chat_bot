import React, { useState, useEffect } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';

const VoiceRecorder = ({ onRecordingComplete, isProcessing }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onRecordingComplete(transcript); // Send text to parent
        setIsRecording(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech Error:", event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recognition);
    } else {
      alert("Browser not supported! Use Google Chrome.");
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
      setIsRecording(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        onClick={toggleRecording}
        disabled={isProcessing}
        className={`p-6 rounded-full transition-all duration-300 shadow-xl ${
          isRecording
            ? 'bg-red-500 hover:bg-red-600 animate-pulse'
            : 'bg-blue-600 hover:bg-blue-700'
        } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isProcessing ? (
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        ) : isRecording ? (
          <Square className="w-8 h-8 text-white fill-current" />
        ) : (
          <Mic className="w-8 h-8 text-white" />
        )}
      </button>

      <p className="text-gray-600 font-medium">
        {isProcessing
          ? "Thinking..."
          : isRecording
          ? "Listening... (Speak Now)"
          : "Tap to Speak (Free Mode)"}
      </p>
    </div>
  );
};

export default VoiceRecorder;