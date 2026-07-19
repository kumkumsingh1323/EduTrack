import { useState, useEffect, useContext } from 'react';
import { Briefcase, Map, Target, TrendingUp, CheckCircle, Award } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';

export default function PlacementsHub() {
  const { user } = useContext(AuthContext);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    fetch('https://edutrack-50li.onrender.com/api/platform/careers/placements')
      .then(res => res.json())
      .then(data => {
        if (user?.educationLevel === '10th' || user?.educationLevel === 'Intermediate') {
          setRoles([
            {
              _id: 'p1',
              title: 'National Defence Academy (NDA)',
              salaryRange: '₹56,100 - ₹1,77,500',
              estimatedLearningTime: '6-12 Months',
              requiredSkills: ['Mathematics', 'General Ability', 'Physical Fitness', 'English'],
              beginnerProjects: ['Current Affairs Quiz', 'Physical Training Routine'],
              advancedProjects: ['Mock SSB Interview', 'Previous Year Paper Analysis'],
              interviewQuestions: ['Why do you want to join the Armed Forces?', 'Tell me about a time you showed leadership.', 'Current geopolitical issues.'],
              topHiringCompanies: ['Indian Army', 'Indian Navy', 'Indian Air Force']
            },
            {
              _id: 'p2',
              title: 'Staff Selection Commission (SSC CHSL)',
              salaryRange: '₹19,900 - ₹81,100',
              estimatedLearningTime: '6 Months',
              requiredSkills: ['Quantitative Aptitude', 'General Intelligence', 'English', 'General Awareness'],
              beginnerProjects: ['Daily Vocabulary Log', 'Math Shortcuts Notebook'],
              advancedProjects: ['Typing Speed Test (35 wpm)', 'Full Mock Test Series'],
              interviewQuestions: ['(No Interview - Skill Test Only)'],
              topHiringCompanies: ['Central Govt Ministries', 'Departments', 'Offices']
            },
            {
              _id: 'p3',
              title: 'Railway Recruitment Board (RRB NTPC)',
              salaryRange: '₹19,900 - ₹35,400',
              estimatedLearningTime: '6-8 Months',
              requiredSkills: ['General Awareness', 'Mathematics', 'Reasoning'],
              beginnerProjects: ['Static GK Flashcards', 'Time & Distance Problem Set'],
              advancedProjects: ['Computer Based Aptitude Test Mock', 'Speed Math Calculation'],
              interviewQuestions: ['(No Interview - Document Verification Only)'],
              topHiringCompanies: ['Indian Railways']
            }
          ]);
        } else {
          setRoles(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;
  }

  return (
    <div className="animate-in fade-in duration-500">
      {!selectedRole ? (
        <>
          <div className="mb-8 border-b border-slate-800 pb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent flex items-center gap-3">
              <Briefcase /> Placement Prep Hub
            </h1>
            <p className="text-gray-400 mt-2">Master your dream role with highly specialized roadmaps and interview strategies.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles?.map(role => (
              <div 
                key={role._id} 
                onClick={() => setSelectedRole(role)}
                className="bg-slate-900 border border-slate-800 p-6 rounded-xl cursor-pointer hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all group"
              >
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  <Target size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{role.title}</h3>
                <p className="text-sm text-gray-400 mb-4">Estimated Time: {role.estimatedLearningTime || 'Varies'}</p>
                <div className="flex flex-wrap gap-2">
                  {role.requiredSkills?.slice(0, 3).map(skill => (
                    <span key={skill} className="px-2 py-1 bg-slate-800 text-xs text-gray-300 rounded">{skill}</span>
                  ))}
                  {role.requiredSkills?.length > 3 && <span className="px-2 py-1 bg-slate-800 text-xs text-gray-300 rounded">+{role.requiredSkills.length - 3}</span>}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="max-w-4xl mx-auto pb-12">
          <button onClick={() => setSelectedRole(null)} className="mb-6 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition text-sm flex items-center gap-2">
            ← Back to Roles
          </button>
          
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-9xl"><Briefcase /></div>
            <h2 className="text-4xl font-bold mb-4 text-white">{selectedRole.title}</h2>
            <div className="flex gap-4 mb-6">
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-bold flex items-center gap-1">
                <TrendingUp size={16}/> {selectedRole.salaryRange || 'Variable'}
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-bold flex items-center gap-1">
                <Map size={16}/> {selectedRole.estimatedLearningTime || 'Self-paced'}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-200 mb-2">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {selectedRole.requiredSkills?.map(skill => (
                <span key={skill} className="px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-800 rounded-md text-sm">{skill}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-yellow-500"><Award /> Top Projects</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase">Beginner</h4>
                  <ul className="list-disc pl-5 text-gray-200 mt-1 space-y-1">
                    {selectedRole.beginnerProjects?.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase">Advanced</h4>
                  <ul className="list-disc pl-5 text-gray-200 mt-1 space-y-1">
                    {selectedRole.advancedProjects?.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-400"><CheckCircle /> Interview Questions</h3>
                <ul className="list-disc pl-5 text-gray-200 space-y-2">
                  {selectedRole.interviewQuestions?.map((q, i) => <li key={i}>{q}</li>)}
                </ul>
              </div>
              
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-white">Top Hiring Companies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRole.topHiringCompanies?.map(c => (
                    <span key={c} className="px-3 py-1 bg-slate-800 text-gray-300 rounded-md border border-slate-700">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

