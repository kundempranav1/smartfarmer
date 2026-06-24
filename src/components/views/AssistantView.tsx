import React, { useState, useRef, useEffect } from 'react';
import { Bot, Mic, Image as ImageIcon, Send, Sparkles, Loader2 } from 'lucide-react';
import AIDoctor from '../AIDoctor';
import SeasonCropDetector from '../SeasonCropDetector';
import { useLanguage } from '../LanguageContext';
import ReactMarkdown from 'react-markdown';

export function AssistantView() {
  const [activeTab, setActiveTab] = useState<'chat' | 'doctor' | 'season'>('chat');
  const [messages, setMessages] = useState<{role: 'user'|'ai', text: string}[]>([
    { role: 'ai', text: 'Namaste! I am your AI Farm Assistant. You can ask me about fertilizer timing, weather forecasts, or crop diseases. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, language })
      });
      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Server returned an error: ${text.slice(0, 100)}...`);
      }
      
      if (!response.ok) throw new Error(data.error || 'Failed to get response');
      
      setMessages(prev => [...prev, { role: 'ai', text: data.result }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'ai', text: `Error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold font-display text-gray-900">AI Farm Assistant</h2>
        <p className="text-gray-500 mt-2">Your multi-lingual farming companion for disease diagnosis, planning, and expert advice.</p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-gray-100 p-1 rounded-full">
          <button 
            onClick={() => setActiveTab('chat')}
             className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'chat' ? 'bg-white shadow-sm text-green-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Chatbot
          </button>
          <button 
            onClick={() => setActiveTab('doctor')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'doctor' ? 'bg-white shadow-sm text-red-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Crop Doctor
          </button>
          <button 
            onClick={() => setActiveTab('season')}
             className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'season' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Season Predictor
          </button>
        </div>
      </div>

      {activeTab === 'chat' && (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
          <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-xl text-green-600">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">FarmFriend Assistant</div>
                <div className="text-xs text-green-600 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Online (Supports 12 Languages)</div>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto bg-gray-50/50 flex flex-col gap-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`${msg.role === 'user' ? 'self-end bg-green-600 text-white' : 'self-start bg-white border border-gray-100 text-gray-700'} shadow-sm p-4 rounded-2xl ${msg.role === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'} max-w-[80%] prose prose-sm ${msg.role === 'user' ? 'prose-invert text-white' : ''}`}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}
            {loading && (
              <div className="self-start bg-white border border-gray-100 shadow-sm p-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-green-600" />
                <span className="text-gray-500 text-sm">Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-green-500/20 focus-within:border-green-500 transition-all">
              <button className="text-gray-400 hover:text-green-600 transition-colors p-2"><Mic className="w-5 h-5" /></button>
              <button className="text-gray-400 hover:text-green-600 transition-colors p-2"><ImageIcon className="w-5 h-5" /></button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your farming question..." 
                className="flex-1 bg-transparent border-none focus:ring-0 text-gray-700 outline-none px-2" 
              />
              <button onClick={handleSend} disabled={loading || !input.trim()} className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 disabled:opacity-50 disabled:hover:bg-green-600 transition-colors"><Send className="w-4 h-4 ml-1" /></button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'doctor' && <AIDoctor />}
      {activeTab === 'season' && <SeasonCropDetector />}
    </div>
  );
}
