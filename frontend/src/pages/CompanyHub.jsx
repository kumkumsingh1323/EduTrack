import { useState, useEffect, useContext } from 'react';
import { Building2, Search, Code, CheckCircle, MessagesSquare, Users, Briefcase, Star } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';

export default function CompanyHub() {
  const { user } = useContext(AuthContext);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/platform/careers/companies')
      .then(res => res.json())
      .then(data => {
        if (user?.educationLevel === '10th' || user?.educationLevel === 'Intermediate') {
          setCompanies([
            {
              _id: 'c1',
              name: 'Indian Army',
              industry: 'Defence',
              type: 'Government',
              eligibility: '10th/12th Pass',
              salaryPackages: 'As per 7th Pay Commission',
              description: 'The land-based branch and largest component of the Indian Armed Forces.',
              hiringProcess: ['Written Exam (NDA)', 'SSB Interview', 'Medical Test', 'Merit List'],
              technicalInterview: ['Current Affairs', 'Physical Fitness Standards', 'Logical Reasoning', 'General Knowledge'],
              codingTopics: ['Strategy', 'Endurance', 'Discipline', 'Leadership'],
              hrInterview: ['Why do you want to join the Army?', 'Explain your motivation to serve the nation.', 'How do you handle high-pressure situations?'],
              placementTips: ['Maintain physical fitness daily', 'Stay updated with geopolitical news', 'Develop a strong sense of discipline']
            },
            {
              _id: 'c2',
              name: 'Indian Railways',
              industry: 'Transportation',
              type: 'Government',
              eligibility: '10th/12th Pass',
              salaryPackages: 'As per 7th Pay Commission',
              description: 'The statutory body under the ownership of Ministry of Railways, Government of India.',
              hiringProcess: ['CBT 1', 'CBT 2', 'Typing Test (if applicable)', 'Document Verification'],
              technicalInterview: ['Basic Technical Skills', 'General Aptitude', 'Reasoning'],
              codingTopics: ['Quantitative Aptitude', 'General Awareness', 'Analytical Skills'],
              hrInterview: ['Why Railways?', 'Are you ready for transferable jobs?', 'How do you contribute to public service?'],
              placementTips: ['Practice previous years papers', 'Focus on time management in CBT', 'Stay consistent with current affairs']
            },
            {
              _id: 'c3',
              name: 'Staff Selection Commission',
              industry: 'Government Administration',
              type: 'Government',
              eligibility: '12th Pass/Graduate',
              salaryPackages: 'As per 7th Pay Commission',
              description: 'An organization under Government of India to recruit staff for various posts in the various Ministries and Departments.',
              hiringProcess: ['Tier-I CBT', 'Tier-II CBT', 'Skill Test', 'Document Verification'],
              technicalInterview: ['English Comprehension', 'General Intelligence', 'Quantitative Skills'],
              codingTopics: ['Mathematics', 'English Language', 'General Intelligence'],
              hrInterview: ['Tell us about yourself', 'Why this specific department?', 'How do you ensure accuracy in administrative tasks?'],
              placementTips: ['Master vocabulary and grammar', 'Practice speed-based math problems', 'Regular mock test series']
            }
          ]);
        } else {
          setCompanies(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  const filteredCompanies = companies?.filter(c => c.name?.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;

  return (
    <div className="animate-in fade-in duration-500">
      {!selectedCompany ? (
        <>
          <div className="mb-8 border-b border-slate-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent flex items-center gap-3">
                <Building2 /> Company Prep Hub
              </h1>
              <p className="text-gray-400 mt-2">Company-specific interview guides, hiring processes, and tips.</p>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-3 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search companies..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies?.map(c => (
              <div 
                key={c._id} 
                onClick={() => setSelectedCompany(c)}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-indigo-500/50 transition cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                    <Building2 size={24} />
                  </div>
                  <span className="px-2 py-1 bg-slate-800 text-gray-300 text-xs rounded">{c.industry}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{c.name}</h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{c.description}</p>
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded">Hiring: {c.hiringProcess?.length || 0} Rounds</span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="max-w-4xl mx-auto pb-12">
          <button onClick={() => setSelectedCompany(null)} className="mb-6 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition text-sm flex items-center gap-2">
            ← Back to Companies
          </button>
          
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl mb-8">
            <h2 className="text-4xl font-bold mb-2 text-white flex items-center gap-3">
              <Building2 className="text-indigo-400" size={32}/> {selectedCompany.name}
            </h2>
            <p className="text-gray-400 text-lg mb-6">{selectedCompany.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <p className="text-gray-500 text-xs uppercase font-bold mb-1">Industry</p>
                <p className="text-gray-200 font-medium">{selectedCompany.industry}</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <p className="text-gray-500 text-xs uppercase font-bold mb-1">Type</p>
                <p className="text-gray-200 font-medium">{selectedCompany.type}</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <p className="text-gray-500 text-xs uppercase font-bold mb-1">Eligibility</p>
                <p className="text-gray-200 font-medium">{selectedCompany.eligibility || 'Varies'}</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <p className="text-gray-500 text-xs uppercase font-bold mb-1">Avg Salary</p>
                <p className="text-green-400 font-medium">{selectedCompany.salaryPackages || 'Variable'}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-400"><Code /> Hiring Process</h3>
              <ul className="space-y-4">
                {selectedCompany.hiringProcess?.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">{i+1}</div>
                    <span className="text-gray-300">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-purple-400"><CheckCircle /> Core Topics to Prepare</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">Technical</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.technicalInterview?.map(t => <span key={t} className="px-2 py-1 bg-slate-800 text-gray-300 rounded text-xs">{t}</span>)}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">Coding/Logical</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.codingTopics?.map(t => <span key={t} className="px-2 py-1 bg-slate-800 text-gray-300 rounded text-xs">{t}</span>)}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-400"><Users /> HR Interview Questions</h3>
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                {selectedCompany.hrInterview?.map((q, i) => <li key={i}>{q}</li>)}
              </ul>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-yellow-500"><Star /> Placement Tips</h3>
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                {selectedCompany.placementTips?.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
