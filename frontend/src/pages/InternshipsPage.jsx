import { useState, useEffect, useContext } from 'react';
import { Briefcase, ExternalLink } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';

export default function InternshipsPage() {
  const { user } = useContext(AuthContext);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('/api/platform/careers/internships')
      .then(res => res.json())
      .then(data => {
        // Filter based on user level
        if (user?.educationLevel === '10th' || user?.educationLevel === 'Intermediate') {
          setInternships([
            { _id: '1', title: 'Student Ambassador', company: 'Unacademy', type: 'Virtual', source: 'Internshala', link: 'internshala.com' },
            { _id: '2', title: 'Content Writing Intern', company: 'EduTrack Media', type: 'Virtual', source: 'LinkedIn', link: 'linkedin.com' },
            { _id: '3', title: 'Social Media Marketing', company: 'Local Startups', type: 'Summer', source: 'Wellfound', link: 'wellfound.com' },
            { _id: '4', title: 'Data Entry Operator', company: 'Govt Initiatives', type: 'Paid', source: 'NCS Portal', link: 'ncs.gov.in' },
          ]);
        } else if (user?.educationLevel === 'ITI' || user?.educationLevel === 'Polytechnic') {
          setInternships([
            { _id: '1', title: 'Apprentice Trainee', company: 'BHEL', type: 'Paid', source: 'Govt Portal', link: 'apprenticeshipindia.gov.in' },
            { _id: '2', title: 'Workshop Assistant', company: 'Tata Motors', type: 'Summer', source: 'Tata Careers', link: 'tatamotors.com' },
            { _id: '3', title: 'Junior Technician', company: 'Local Manufacturing', type: 'Paid', source: 'Indeed', link: 'indeed.com' },
          ]);
        } else {
          setInternships(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load internships:', err);
        setLoading(false);
      });
  }, [user]);

  const types = ['All', 'Summer', 'Winter', 'Virtual', 'Paid', 'Free', 'Government', 'Startup'];
  const filtered = filter === 'All' ? internships : internships.filter(i => i.type === filter);

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8 border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent flex items-center gap-3">
          <Briefcase /> {user?.educationLevel === '10th' || user?.educationLevel === 'Intermediate' ? 'Student Programs Hub' : 'Internship Hub'}
        </h1>
        <p className="text-gray-400 mt-2">
          {user?.educationLevel === '10th' || user?.educationLevel === 'Intermediate' 
            ? 'Find beginner-friendly student ambassador programs and virtual gigs.'
            : 'Find top internships from Google, Microsoft, Amazon, and more.'}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {types.map(t => (
          <button key={t} onClick={() => setFilter(t)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${filter === t ? 'bg-blue-600 text-white' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(intern => (
          <div key={intern._id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition">
            <div className="flex justify-between items-start mb-3">
              <span className="px-2 py-1 bg-cyan-900/30 text-cyan-400 text-xs font-bold rounded uppercase">{intern.type}</span>
              <ExternalLink size={16} className="text-gray-500" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{intern.title}</h3>
            <p className="text-sm text-gray-400 mb-1">Company: {intern.company}</p>
            <p className="text-sm text-gray-500">Source: {intern.source}</p>
            <a href={`https://${intern.link}`} target="_blank" rel="noreferrer" className="inline-block mt-4 text-sm text-cyan-400 hover:text-cyan-300 font-medium">
              Apply Now →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
