import React, { useState } from 'react';
import { MessageSquare, MoreVertical, ChevronDown, Paperclip, Smile, Send, Bot } from 'lucide-react';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      
      {/* Chat Window */}
      <div 
        className={`bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col w-[350px] transition-all duration-300 origin-bottom-right mb-4 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none absolute'
        }`}
        style={{ height: '520px' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1a56ff] to-[#00b4d8] text-white p-4 pb-12 relative shrink-0">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden bg-white">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                  alt="Jessica Smith" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs text-blue-100">Chat with</p>
                <h3 className="font-bold text-base leading-tight">Jessica Smith</h3>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-sm font-medium relative z-10">We are online!</p>

          {/* SVG Wave */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[150%] h-[30px] block" style={{ transform: 'rotate(180deg) translateX(15%)' }}>
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
            </svg>
          </div>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 bg-white flex flex-col gap-4 text-sm">
          {/* Incoming Message */}
          <div className="flex gap-2 w-full">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] text-on-surface">
              Welcome to our store 👋<br/>
              How can I help you?
            </div>
          </div>

          {/* Quick Replies */}
          <div className="flex flex-wrap gap-2 justify-end mt-2">
            {['Purchase info', 'Order status', 'Refund info', 'Shipping'].map((reply, i) => (
              <button 
                key={i}
                className="px-4 py-1.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-white font-medium transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Footer */}
        <div className="p-3 border-t border-outline-variant/30 bg-white relative shrink-0">
          <div className="flex items-center">
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder="Enter your message..." 
                className="w-full pl-3 pr-10 py-3 text-sm focus:outline-none placeholder:text-on-surface-variant/60"
              />
              <div className="absolute left-3 bottom-[-20px] flex items-center gap-2 text-on-surface-variant/50 pb-1">
                <button className="hover:text-primary transition-colors"><Bot className="w-4 h-4" /></button>
                <button className="hover:text-primary transition-colors"><Paperclip className="w-4 h-4" /></button>
                <button className="hover:text-primary transition-colors"><Smile className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Send Button overlapping */}
            <button className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-600 transition-colors absolute right-4 -top-6">
              <Send className="w-5 h-5 ml-1" />
            </button>
          </div>
          
          <div className="text-center mt-3 pt-2">
            <span className="text-[9px] font-bold text-on-surface-variant/40 tracking-widest">
              POWERED BY <span className="text-[#00b4d8]">TIDIO</span>
            </span>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-transform hover:scale-105 ${
          isOpen ? 'bg-slate-800' : 'bg-[#1a56ff]'
        }`}
      >
        {isOpen ? <ChevronDown className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

    </div>
  );
}
