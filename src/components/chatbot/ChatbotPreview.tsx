
import React, { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Chatbot } from "./ChatbotBuilder";

interface ChatbotPreviewProps {
  chatbot: Chatbot;
}

interface Message {
  id: string;
  content: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

const ChatbotPreview: React.FC<ChatbotPreviewProps> = ({ chatbot }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: chatbot.welcomeMessage,
      sender: "bot",
      timestamp: new Date()
    }
  ]);

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: "This is a preview bot response. In a real chatbot, this would be determined by your conversation flow or AI model.",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="w-[350px] max-w-full shadow-lg rounded-lg overflow-hidden flex flex-col border" style={{
      fontFamily: chatbot.theme.fontFamily
    }}>
      {/* Chat Header */}
      <div
        className="p-4 flex items-center justify-between"
        style={{ backgroundColor: chatbot.theme.primaryColor, color: 'hsl(var(--primary-foreground))' }}
      >
        <div>
          <h3 className="font-medium">{chatbot.name}</h3>
          <p className="text-xs opacity-90">{chatbot.description}</p>
        </div>
        <button
          className="w-6 h-6 rounded-full flex items-center justify-center bg-card/20 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "−" : "+"}
        </button>
      </div>

      {/* Chat Body */}
      {isOpen && (
        <>
          <div className="flex-1 p-4 h-[300px] overflow-y-auto bg-slate-50">
            <div className="flex flex-col gap-3">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'self-end' : ''
                    }`}
                >
                  <div
                    className={`rounded-lg p-2 text-sm ${message.sender === 'bot'
                      ? `bg-[${chatbot.theme.primaryColor}] text-white`
                      : `bg-[${chatbot.theme.secondaryColor}] text-gray-800`
                      }`}
                    style={{
                      backgroundColor: message.sender === 'bot' ? chatbot.theme.primaryColor : chatbot.theme.secondaryColor,
                      color: message.sender === 'bot' ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))'
                    }}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-3 border-t bg-card">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button
                size="icon"
                onClick={sendMessage}
                style={{ backgroundColor: chatbot.theme.primaryColor }}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatbotPreview;
