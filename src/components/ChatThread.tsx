import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  Info, 
  Search, 
  MoreVertical, 
  Paperclip, 
  Camera, 
  Send, 
  Image as ImageIcon, 
  MapPin, 
  AlertCircle, 
  Pin, 
  Check, 
  CheckCheck,
  Plus,
  Smile,
  Mic,
  ArrowDown,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatThreadProps {
  chat: any;
  onBack: () => void;
}

const MOCK_MESSAGES = [
  {
    id: '1',
    sender: 'Sarah Jenkins',
    text: 'Hey! Did you see the new reports for Temple Street?',
    timestamp: '10:00 AM',
    isMe: false,
    type: 'text'
  },
  {
    id: '2',
    sender: 'Me',
    text: 'Yes, I just saw them. The garbage pile is getting really big near the market entrance.',
    timestamp: '10:05 AM',
    isMe: true,
    type: 'text',
    status: 'read'
  },
  {
    id: '3',
    sender: 'Sarah Jenkins',
    text: 'I just took a photo of it. It looks like the collection was missed this morning.',
    timestamp: '10:06 AM',
    isMe: false,
    type: 'text'
  },
  {
    id: '4',
    sender: 'Sarah Jenkins',
    type: 'image',
    url: 'https://picsum.photos/seed/garbage/600/400',
    caption: 'Missed collection at Market Entrance',
    timestamp: '10:06 AM',
    isMe: false
  },
  {
    id: '5',
    sender: 'Me',
    text: 'That is bad. I will add a formal report now.',
    timestamp: '10:08 AM',
    isMe: true,
    type: 'text',
    status: 'read'
  },
  {
    id: '6',
    sender: 'System',
    text: 'Issue Updated: Garbage collection reported at Temple Street Market.',
    timestamp: '10:10 AM',
    isMe: false,
    type: 'system'
  },
  {
    id: '7',
    sender: 'Sarah Jenkins',
    text: 'Great! I will support your report so it gets more visibility.',
    timestamp: '10:12 AM',
    isMe: false,
    type: 'text'
  },
  {
    id: '8',
    sender: 'Sarah Jenkins',
    type: 'location',
    locationName: 'Temple Street Market Entrance',
    timestamp: '10:12 AM',
    isMe: false
  }
];

export const ChatThread: React.FC<ChatThreadProps> = ({ chat, onBack }) => {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      sender: 'Me',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      type: 'text',
      status: 'sent'
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="bg-white h-screen flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className="px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-slate-900" />
          </button>
          <div className="relative">
            <img 
              src={chat.avatar} 
              className="w-10 h-10 rounded-xl object-cover shadow-sm" 
              alt={chat.name}
              referrerPolicy="no-referrer"
            />
            {chat.status === 'Online' && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            )}
          </div>
          <div className="min-w-0">
            <h1 className="text-sm font-black text-slate-900 truncate leading-none mb-1">{chat.name}</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
              {chat.type === 'Group' ? `${chat.location || 'Local Group'}` : chat.status || 'Offline'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400">
            <Info className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Pinned Context Strip */}
      <div className="px-6 py-3 bg-green-50/50 border-b border-green-100/50 flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-green-600 shadow-sm flex-shrink-0">
          <Pin className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black text-green-700 uppercase tracking-widest truncate">Pinned Context</p>
          <p className="text-[10px] text-green-800 font-medium truncate">Large potholes reported near School Road. Sharing updates here.</p>
        </div>
        <button className="p-1.5 hover:bg-green-100 rounded-lg transition-colors text-green-600">
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar px-6 py-6 space-y-6 bg-slate-50/30"
      >
        <div className="flex justify-center mb-4">
          <span className="px-4 py-1.5 bg-white border border-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-sm">
            Today
          </span>
        </div>

        {messages.map((msg, i) => {
          if (msg.type === 'system') {
            return (
              <div key={msg.id} className="flex justify-center">
                <div className="max-w-[80%] bg-white border border-slate-100 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
                  <AlertCircle className="w-3 h-3 text-green-600" />
                  <span className="text-[10px] font-bold text-slate-600">{msg.text}</span>
                </div>
              </div>
            );
          }

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                {!msg.isMe && (
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-2">
                    {msg.sender}
                  </span>
                )}
                
                <div className={`relative p-4 rounded-[28px] shadow-sm ${
                  msg.isMe 
                    ? 'bg-green-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-900 rounded-tl-none border border-slate-100'
                }`}>
                  {msg.type === 'text' && (
                    <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                  )}
                  
                  {msg.type === 'image' && (
                    <div className="space-y-3">
                      <img 
                        src={msg.url} 
                        className="rounded-2xl w-full object-cover shadow-inner" 
                        alt="Shared media"
                        referrerPolicy="no-referrer"
                      />
                      {msg.caption && <p className="text-xs font-medium opacity-90">{msg.caption}</p>}
                    </div>
                  )}

                  {msg.type === 'location' && (
                    <div className="bg-white/10 p-3 rounded-2xl space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-green-600 shadow-sm">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Shared Location</p>
                          <p className="text-xs font-bold truncate">{msg.locationName}</p>
                        </div>
                      </div>
                      <button className="w-full bg-white text-green-600 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm active:scale-95 transition-all">
                        View on Map
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 mt-1.5 px-2">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    {msg.timestamp}
                  </span>
                  {msg.isMe && (
                    <span className="text-green-500">
                      {msg.status === 'read' ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-slate-100 p-4 pb-8 sticky bottom-0 z-30">
        {/* Quick Actions */}
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
          {[
            { label: 'Share Update', icon: AlertCircle },
            { label: 'Add Photo', icon: Camera },
            { label: 'Location', icon: MapPin },
            { label: 'Important', icon: Pin }
          ].map((action, i) => (
            <button 
              key={i}
              className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-green-50 hover:border-green-100 hover:text-green-600 transition-all whitespace-nowrap"
            >
              <action.icon className="w-3 h-3" />
              {action.label}
            </button>
          ))}
        </div>

        <div className="flex items-end gap-3">
          <div className="flex-1 bg-slate-50 rounded-[32px] p-2 flex items-end border border-slate-100 focus-within:border-green-200 focus-within:bg-white transition-all">
            <button className="p-3 text-slate-400 hover:text-green-600 transition-colors">
              <Plus className="w-5 h-5" />
            </button>
            <textarea 
              rows={1}
              placeholder="Share a useful update..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 bg-transparent border-none py-3 px-2 text-sm font-medium focus:ring-0 resize-none max-h-32"
            />
            <button className="p-3 text-slate-400 hover:text-green-600 transition-colors">
              <Smile className="w-5 h-5" />
            </button>
          </div>
          <button 
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 ${
              inputText.trim() 
                ? 'bg-green-600 text-white shadow-green-600/30' 
                : 'bg-slate-100 text-slate-300 shadow-none'
            }`}
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
