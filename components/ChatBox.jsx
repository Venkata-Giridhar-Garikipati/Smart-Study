"use client";
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { MessageCircle, Mic, ThumbsUp, ThumbsDown, RefreshCw, ChevronDown, User, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatBoxRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const SpeechRecognition = typeof window !== 'undefined' ? 
    (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  useEffect(() => {
    if(recognition) {
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        setInput(transcript);
        setIsListening(false);
      };
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
    }
  }, [recognition]);

  const handleStartListening = () => {
    if(recognition) {
      recognition.start();
    } else {
      alert("Sorry, your browser doesn't support speech recognition.");
    }
  };

  const handleStopListening = () => {
    if(recognition) {
      recognition.stop();
    }
  };

  const handleSendMessage = async (newMessage = null) => {
    const messageToSend = newMessage ? newMessage : input;
    if (messageToSend.trim() === '') return;

    const newUserMessage = { text: messageToSend, sender: 'user' };
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageToSend }),
      });

      const data = await response.json();
      
      if (data?.reply) {
        const newBotMessage = { text: data.reply, sender: 'bot' };
        setMessages(prev => [...prev, newBotMessage]);
      } else {
        const errorMessage = { 
          text: "Sorry, I'm having trouble connecting right now. Please try again later.", 
          sender: 'bot',
          isError: true
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
      const errorMessage = { 
        text: "Sorry, I'm having trouble connecting right now. Please try again later.", 
        sender: 'bot',
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const handleRegenerate = async (message) => {
    await handleSendMessage(`Regenerate the previous response: ${message}`);
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const isCodeSnippet = (text) => {
    return text.startsWith("```") && text.endsWith("```");
  };

  return (
    <div className="flex flex-col w-full max-w-2xl bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b bg-white/95 backdrop-blur-sm flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-blue-500" />
          <div className="font-semibold text-lg flex items-center gap-1">
            Study Buddy
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
          <span className="text-sm text-gray-500 bg-green-100 px-2 py-0.5 rounded-full">
            Online
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="text-sm flex items-center gap-1">
            <span className="text-pink-500">✦</span>
            Try Premium
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={chatBoxRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[400px] max-h-[600px]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={cn(
              "flex w-full",
              msg.sender === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl p-4 transition-all duration-200",
                msg.sender === "user" 
                  ? "bg-blue-500 text-white" 
                  : msg.isError 
                    ? "bg-red-50 text-red-600" 
                    : "bg-gray-100 text-gray-800"
              )}
            >
              {msg.sender === 'bot' && isCodeSnippet(msg.text) ? (
                <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm text-white overflow-x-auto">
                  <pre className="whitespace-pre-wrap">
                    {msg.text.slice(3, -3)}
                  </pre>
                </div>
              ) : (
                msg.sender === 'bot' ? (
                  <ReactMarkdown className="prose prose-sm max-w-none">
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )
              )}

              {msg.sender === 'bot' && !msg.isError && (
                <div className="mt-3 flex items-center gap-2 border-t pt-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleRegenerate(msg.text)}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl p-4">
              <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white/95 backdrop-blur-sm">
        <div className="relative">
          <Input
            type="text"
            className="w-full pr-10 pl-4 py-2 rounded-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            placeholder="Ask me anything related to studies..."
          />
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8",
              isListening && "text-blue-500"
            )}
            onClick={isListening ? handleStopListening : handleStartListening}
          >
            <Mic className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-center text-xs text-gray-500 mt-2">
          Responses may not always be accurate. Please verify important information.
        </p>
      </div>
    </div>
  );
};

export default ChatBox;