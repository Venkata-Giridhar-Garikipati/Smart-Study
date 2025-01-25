"use client";
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/styled-engine';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress

const ChatBox = () => {
    // State Variables:
    //  - `messages`: Array to store chat messages. Each message is an object with 'text' and 'sender'.
    //  - `input`: Stores the current user input in the text field.
    //  - `chatBoxRef`: Ref to access the chatbox div for scrolling.
    //  - `isListening`: Boolean for microphone listening status.
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const chatBoxRef = useRef(null);
    const [isListening, setIsListening] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state

    // Check if SpeechRecognition API exists
    const SpeechRecognition =  typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
    // Create a speech recognition object if API exists
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    // useEffect Hook: Manages speech recognition lifecycle
    useEffect(() => {
       if(recognition) {
         //  1. onresult: When speech is converted to text, it updates the input field.
         recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
              .map((result) => result[0])
              .map((result) => result.transcript)
              .join("");
           setInput(transcript)
           setIsListening(false);
         };
        // 2. onstart:  Sets `isListening` to true when the speech recognition starts.
          recognition.onstart = () => {
             setIsListening(true);
          };
        // 3. onend: Set `isListening` to false when speech recognition ends
          recognition.onend = () => {
              setIsListening(false);
          }
       }
    },[recognition]);


    // Function to start microphone listening if the browser supports speech recognition
    const handleStartListening = () => {
        if(recognition) {
            recognition.start();
        } else {
            alert("Sorry, your browser doesn't support speech recognition.");
        }
    };

    // Function to stop microphone listening
    const handleStopListening = () => {
        if(recognition){
            recognition.stop();
        }
    }

    // `handleSendMessage`: Function to send a message and receive a response.
    //  - If `newMessage` is provided use that for sending the message. If not use user `input` field.
    const handleSendMessage = async (newMessage = null) => {
      const messageToSend = newMessage ? newMessage : input;
      if (messageToSend.trim() === '') return;

      //  Create a new user message object and add it to the messages array.
      const newUserMessage = { text: messageToSend, sender: 'user'};
      setMessages(prevMessages => [...prevMessages, newUserMessage]);
      setInput(''); // Clear input field
      setLoading(true); // Set loading to true when sending message

      try {
        // Send the user's message to the server to get a response.
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: messageToSend }),
        });

        const data = await response.json(); // Convert response to json
        // if response is successful
        if (data?.reply) {
          const newBotMessage = { text: data.reply, sender: 'bot' };
           setMessages(prevMessages => [...prevMessages, newBotMessage]);// Add bot message to the messages array.
        } else {
          // if there is a server error
            const errorMessage = { text: "Sorry, I'm having trouble connecting right now. Please try again later.", sender: 'bot' };
           setMessages(prevMessages => [...prevMessages, errorMessage]);
        }
      } catch (error) {
        // If error during fetch
          const errorMessage = { text: "Sorry, I'm having trouble connecting right now. Please try again later.", sender: 'bot' };
          setMessages(prevMessages => [...prevMessages, newUserMessage, errorMessage]);
          console.error("Failed to fetch:", error);
      } finally {
        setLoading(false); // Set loading to false when response is received or error occurred
      }
    };


    // Function to regenerate bot message
    const handleRegenerate = async (message) => {
      await handleSendMessage(`Regenerate the previous response: ${message}`);
    }

    // useEffect Hook: Scrolls to the bottom of chat box when messages update.
    useEffect(() => {
        if (chatBoxRef.current) {
          chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    // Function to check if the message is a code snippet.
    const isCodeSnippet = (text) => {
      return text.startsWith("```") && text.endsWith("```")
    };

    // MUI Theme
    const theme = createTheme();
    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
       <div className="flex flex-col w-full max-w-2xl bg-white rounded-lg shadow-xl">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between">
             <div className="flex items-center">
                <div className="font-semibold text-lg mr-2">
                     Study Buddy  {/* Name of the Chatbot */}
                     <ArrowDropDownOutlinedIcon fontSize="small"/>
                </div>
                <span className="text-gray-500">24/7 Available</span>
            </div>
            <div className="flex items-center">
                 <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm mr-2">
                    <span className="text-pink-500">✦</span>
                    Try For Your Doubts
                 </button>
                 <button>
                    <PersonOutlinedIcon/> {/* Add person icon */}
                 </button>
           </div>
      </div>
           {/* Chat messages area */}
           <div ref={chatBoxRef} className="flex-1  mb-4 p-4">
                {messages.map((msg, index) => (
                    <div
                       key={index}
                       className={`mb-4  ${
                         msg.sender === "user"
                         ? "flex justify-end"
                          : "flex justify-start"
                         }`}
                     >
                        <div
                          className={`rounded-lg p-3 max-w-[80%] break-words ${
                            msg.sender === "user"
                            ? "bg-blue-100 text-right"
                            : "bg-gray-100 text-left"
                         }`}
                        >
                        {/* display code snippet if it is */}
                        {msg.sender === 'bot' && isCodeSnippet(msg.text) ? (
                            <div className="bg-gray-200 rounded p-2 font-mono text-sm overflow-x-auto">
                                <pre className="whitespace-pre-wrap">
                                    {msg.text.slice(3, -3)}
                                </pre>
                            </div>
                            ) : (
                            msg.sender === 'bot' ? (
                                 <ReactMarkdown className="markdown-body" children={msg.text} />
                              ) : (
                                    msg.text
                                )
                           )}
                            {msg.sender === 'bot' && (
                             <div className="mt-2 flex justify-start items-center">
                                <button>
                                  <ThumbUpOutlinedIcon fontSize="small" className="mr-1 text-gray-500 hover:text-gray-700"/>
                                </button>
                                 <button>
                                   <ThumbDownOutlinedIcon fontSize="small" className="mr-1 text-gray-500 hover:text-gray-700"/>
                                 </button>
                                <button onClick={() => handleRegenerate(msg.text)}>
                                   <RefreshOutlinedIcon fontSize="small" className="mr-1 text-gray-500 hover:text-gray-700"/>
                                </button>
                           </div>
                          )}
                        </div>
                    </div>
                ))}
                 {/* Loading indicator */}
                {loading && (
                    <div className="flex justify-start">
                        <div className="rounded-lg p-3 max-w-[80%] bg-gray-100 text-left">
                            <CircularProgress size={24} />
                        </div>
                    </div>
                )}
            </div>
            {/* Input Area */}
            <div className="p-4 border-t flex">
                <div className="relative flex-1">
                     <input
                       type="text"
                       className="w-full border border-gray-300 rounded-full p-2 pl-10 focus:outline-none focus:ring focus:border-blue-500"
                       value={input}
                       onChange={(e) => setInput(e.target.value)}
                       onKeyDown={(e) => {
                            if (e.key === "Enter") handleSendMessage();
                       }}
                     placeholder="Ask me anything related to studies"
                   />
                   <button onClick={isListening ? handleStopListening : handleStartListening}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                       <MicOutlinedIcon color={isListening ? "primary": "inherit"} />
                    </button>
               </div>
            </div>
            <div className="text-center py-2 text-gray-500 text-sm">
                Chatbot can make mistakes, so double-check it
            </div>
       </div>
     </ThemeProvider>
     </StyledEngineProvider>
    );
};

export default ChatBox;