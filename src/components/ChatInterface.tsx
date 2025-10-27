import { useState, useRef, useEffect } from 'react';
import { Message, DEPARTMENTS } from '../types/chat';
import { ChatMessage } from './ChatMessage';
import { Send, Sparkles, ArrowLeft } from 'lucide-react';

interface ChatInterfaceProps {
  departmentId: string;
  onBack: () => void;
}

export function ChatInterface({ departmentId, onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const department = DEPARTMENTS.find((d) => d.id === departmentId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      content: `Welcome to ${department?.name} learning! I'm your AI study assistant. Ask me anything about ${department?.name} - from basic concepts to exam preparation. How can I help you today?`,
      role: 'assistant',
      timestamp: new Date(),
      department: departmentId,
    };
    setMessages([welcomeMessage]);
  }, [departmentId, department]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
      department: departmentId,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        `Great question! In ${department?.name}, this concept is fundamental. Let me break it down for you step by step...`,
        `I'd be happy to help you with that! Here's what you need to know about this ${department?.name} topic...`,
        `Excellent inquiry! This is an important area in ${department?.name}. Let's explore it together...`,
        `That's a thoughtful question! In ${department?.name}, understanding this will help you build a strong foundation...`,
      ];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        role: 'assistant',
        timestamp: new Date(),
        department: departmentId,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className={`bg-gradient-to-r ${department?.color} text-white p-4 shadow-lg`}>
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">LearningisLife AI</h1>
              <p className="text-sm text-white/90">{department?.name} Assistant</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-md">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-200 shadow-lg">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask anything about ${department?.name}...`}
            className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className={`px-6 py-3 rounded-full bg-gradient-to-r ${department?.color} text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2`}
          >
            <Send className="w-5 h-5" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
        <p className="text-xs text-gray-500 text-center mt-2">
          AI responses are for educational purposes. Always verify important information.
        </p>
      </div>
    </div>
  );
}
