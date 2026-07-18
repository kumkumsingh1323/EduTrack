import { Link } from 'react-router-dom';
import { FileText, Globe, Users, Code, Briefcase, Bot } from 'lucide-react';

export default function CareerToolsPage() {
  const tools = [
    { name: 'ATS Resume Builder', desc: 'Create a professional resume that passes ATS filters.', icon: FileText, path: '/resume', color: 'green' },
    { name: 'GitHub Profile Guide', desc: 'Build a standout GitHub profile with pinned repos and README.', icon: Globe, path: null, color: 'gray', tips: ['Create a profile README with your skills', 'Pin 6 best repositories', 'Add proper README to each project', 'Contribute to open source', 'Use consistent commit messages'] },
    { name: 'LinkedIn Profile Guide', desc: 'Optimize your LinkedIn for recruiter visibility.', icon: Users, path: null, color: 'blue', tips: ['Use a professional headline (not just "Student")', 'Write a compelling About section', 'Add all projects with descriptions', 'Get endorsements for top skills', 'Post technical content weekly'] },
    { name: 'Coding Platforms', desc: 'Practice on LeetCode, Codeforces, HackerRank.', icon: Code, path: null, color: 'purple',
      links: [
        { name: 'LeetCode', url: 'https://leetcode.com' },
        { name: 'Codeforces', url: 'https://codeforces.com' },
        { name: 'GeeksforGeeks', url: 'https://geeksforgeeks.org' },
        { name: 'HackerRank', url: 'https://hackerrank.com' },
      ]
    },
    { name: 'Interview Preparation', desc: 'HR, Technical, and Mock interview guides.', icon: Briefcase, path: null, color: 'orange', tips: ['Practice STAR method for HR rounds', 'Revise DSA daily (2 problems minimum)', 'Mock interviews with peers', 'Prepare "Tell me about yourself"', 'Research the company before interview'] },
    { name: 'AI Career Tutor', desc: 'Chat with our AI for personalized guidance.', icon: Bot, path: null, color: 'cyan', tips: ['Click the chat bubble at bottom-right corner', 'Ask about career paths, exam prep, salary info', 'Get personalized recommendations'] },
  ];

  const colorMap = {
    green: 'from-green-600/20 to-green-800/20 border-green-800/50 hover:border-green-500',
    gray: 'from-gray-600/20 to-gray-800/20 border-gray-700/50 hover:border-gray-500',
    blue: 'from-blue-600/20 to-blue-800/20 border-blue-800/50 hover:border-blue-500',
    purple: 'from-purple-600/20 to-purple-800/20 border-purple-800/50 hover:border-purple-500',
    orange: 'from-orange-600/20 to-orange-800/20 border-orange-800/50 hover:border-orange-500',
    cyan: 'from-cyan-600/20 to-cyan-800/20 border-cyan-800/50 hover:border-cyan-500',
  };

  return (
    <div>
      <div className="mb-8 border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
          Career Tools & Resources
        </h1>
        <p className="text-gray-400 mt-2">Everything you need to land your dream job.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map(tool => {
          const Icon = tool.icon;
          const Wrapper = tool.path ? Link : 'div';
          return (
            <Wrapper key={tool.name} to={tool.path || undefined} className={`bg-gradient-to-br ${colorMap[tool.color]} border rounded-xl p-6 transition`}>
              <div className="flex items-center gap-3 mb-4">
                <Icon size={28} className="text-white" />
                <h3 className="text-xl font-bold text-white">{tool.name}</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">{tool.desc}</p>
              
              {tool.path && (
                <span className="text-sm font-medium text-green-400">Open Tool →</span>
              )}

              {tool.tips && (
                <ul className="space-y-2">
                  {tool.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-blue-400 mt-0.5">•</span> {tip}
                    </li>
                  ))}
                </ul>
              )}

              {tool.links && (
                <div className="flex flex-wrap gap-2">
                  {tool.links.map(link => (
                    <a key={link.name} href={link.url} target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-slate-800 text-gray-300 rounded-lg text-sm hover:bg-slate-700 transition">
                      {link.name} ↗
                    </a>
                  ))}
                </div>
              )}
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
}
