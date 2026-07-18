import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi! I am your EduTrack AI Tutor 🤖. Ask me anything about careers, exams, coding, or education paths!' }
  ]);
  const [input, setInput] = useState('');

  const quickReplies = [
    'Best career after B.Tech CSE?',
    'How to prepare for UPSC?',
    'Best YouTube channels for DSA?',
    'Resume tips for freshers',
  ];

  const getAIResponse = (question) => {
    const q = question.toLowerCase();
    if (q.includes('career') && q.includes('cse')) return 'After B.Tech CSE, top careers include: Software Engineer (₹6-30L), Data Scientist (₹8-25L), AI Engineer (₹10-40L), DevOps Engineer (₹8-30L), and Cloud Engineer. Start with mastering DSA, then pick a specialization. Check our Placement Roles section for detailed roadmaps!';
    if (q.includes('upsc')) return 'UPSC Preparation: Start with NCERT books (Class 6-12), then move to standard references. Key subjects: History, Geography, Polity, Economy, Current Affairs. Dedicate 8-10 hours daily. Join our Government Jobs → UPSC section for the complete roadmap!';
    if (q.includes('youtube') && q.includes('dsa')) return 'Best YouTube channels for DSA:\n• Striver (take U forward) - Best for interview prep\n• Abdul Bari - Algorithms explained simply\n• Neetcode - LeetCode solutions\n• Love Babbar - DSA Sheet\n• CodeHelp by Babbar';
    if (q.includes('resume')) return 'Resume tips for freshers:\n1. Keep it 1 page\n2. Add GitHub & LinkedIn links\n3. List 2-3 projects with tech stack\n4. Use action verbs (Built, Developed, Implemented)\n5. Add relevant certifications\n6. Use our Resume Builder in Career Tools!';
    if (q.includes('intern')) return 'Best internship platforms for Indian students:\n• Internshala (most popular)\n• LinkedIn Jobs\n• Unstop (competitions + internships)\n• Google STEP / Microsoft Engage\n• Amazon SDE Intern\nCheck our Internships section for more!';
    if (q.includes('salary') || q.includes('package')) return 'Average packages in India (2024):\n• TCS Ninja: ₹3.36L, Digital: ₹7L\n• Infosys: ₹3.6L - ₹9L\n• Wipro: ₹3.5L - ₹5L\n• Google: ₹25L - ₹45L\n• Amazon: ₹28L - ₹45L\nCheck Company Prep for detailed info!';
    if (q.includes('gate')) return 'GATE Preparation: Focus on your core subject (CS/EC/ME etc). Key resources: NPTEL lectures, PYQs, Made Easy/ACE notes. Start 6 months before the exam. Our Higher Studies → M.Tech section has the complete roadmap!';
    return 'Great question! I recommend checking our Browse Paths section for detailed roadmaps, or the Placement Roles section for career-specific guidance. You can also explore Company Prep for interview preparation. Is there something specific I can help with?';
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: getAIResponse(userMsg) }]);
    }, 500);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform z-50"
        >
          <MessageCircle className="text-white" size={26} />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[380px] h-[520px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <div>
                <h3 className="font-bold text-white text-sm">EduTrack AI Tutor</h3>
                <p className="text-blue-200 text-xs">Ask me anything about careers</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white"><X size={20} /></button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl text-sm whitespace-pre-line ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-slate-800 text-gray-200 rounded-bl-none border border-slate-700'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {quickReplies.map((q, i) => (
                <button 
                  key={i} 
                  onClick={() => { setInput(q); }}
                  className="text-xs px-3 py-1.5 bg-slate-800 border border-slate-700 text-gray-300 rounded-full hover:bg-slate-700 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-slate-700 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            />
            <button onClick={handleSend} className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              <Send size={18} className="text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
