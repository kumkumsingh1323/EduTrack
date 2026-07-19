import { useState, useEffect, useContext } from 'react';
import { Award, ExternalLink } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';

export default function CertificationsPage() {
  const { user } = useContext(AuthContext);
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://edutrack-50li.onrender.com/api/platform/careers/certifications')
      .then(res => res.json())
      .then(data => {
        if (user?.educationLevel === '10th' || user?.educationLevel === 'Intermediate') {
          setCerts([
            { _id: 'c1', name: 'Basic Computer Course (BCC)', provider: 'NIELIT', cost: '₹500', level: 'Beginner', duration: '36 Hours', skillsCovered: ['MS Office', 'Internet', 'Email'], officialWebsite: 'nielit.gov.in' },
            { _id: 'c2', name: 'Digital Literacy Certification', provider: 'PMGDisha', cost: 'Free', level: 'Beginner', duration: '20 Hours', skillsCovered: ['Digital Payments', 'Browsing'], officialWebsite: 'pmgdisha.in' },
            { _id: 'c3', name: 'English Communication', provider: 'British Council', cost: 'Free', level: 'Beginner', duration: '4 Weeks', skillsCovered: ['Speaking', 'Grammar'], officialWebsite: 'britishcouncil.in' },
          ]);
        } else if (user?.educationLevel === 'ITI' || user?.educationLevel === 'Polytechnic') {
          setCerts([
            { _id: 'c1', name: 'AutoCAD Certification', provider: 'Autodesk', cost: '₹2000', level: 'Intermediate', duration: '40 Hours', skillsCovered: ['2D Drafting', '3D Modeling'], officialWebsite: 'autodesk.com' },
            { _id: 'c2', name: 'Industrial Safety', provider: 'NPTEL', cost: 'Free', level: 'Beginner', duration: '8 Weeks', skillsCovered: ['Safety Protocols', 'Hazard Management'], officialWebsite: 'nptel.ac.in' },
            { _id: 'c3', name: 'PLC Programming', provider: 'Siemens', cost: '₹5000', level: 'Intermediate', duration: '60 Hours', skillsCovered: ['Automation', 'Ladder Logic'], officialWebsite: 'siemens.com' },
          ]);
        } else {
          setCerts(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load certifications:', err);
        setError(true);
        setLoading(false);
      });
  }, [user]);

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;

  if (error) {
    return (
      <div className="animate-in fade-in duration-500 text-center py-20">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Backend Connection Failed</h2>
        <p className="text-gray-400">Could not load data. The backend server is down because of the MongoDB Authentication error.</p>
        <p className="text-gray-400 mt-2">Please fix the database credentials in Atlas and restart the backend.</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8 border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent flex items-center gap-3">
          <Award /> {user?.educationLevel === '10th' || user?.educationLevel === 'Intermediate' ? 'Foundational Skills' : 'Certification Hub'}
        </h1>
        <p className="text-gray-400 mt-2">
          {user?.educationLevel === '10th' || user?.educationLevel === 'Intermediate' 
            ? 'Build your fundamental skills with these basic certifications.'
            : 'Boost your resume with industry-recognized certifications.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map(cert => (
          <div key={cert._id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-yellow-500/50 transition">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-yellow-500/10 rounded-lg">
                <Award className="text-yellow-400" size={24} />
              </div>
              <span className={`px-2 py-1 text-xs font-bold rounded ${cert.cost === 'Free' || cert.cost?.includes('Free') ? 'bg-green-900/30 text-green-400' : 'bg-orange-900/30 text-orange-400'}`}>
                {cert.cost}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{cert.name}</h3>
            <p className="text-sm text-gray-400 mb-3">by {cert.provider}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Level</span><span className="text-gray-300">{cert.level}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Duration</span><span className="text-gray-300">{cert.duration}</span></div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-4">
              {cert.skillsCovered?.map(skill => (
                <span key={skill} className="px-2 py-0.5 bg-slate-800 text-gray-300 rounded text-xs">{skill}</span>
              ))}
            </div>

            <a href={`https://${cert.officialWebsite}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 mt-4 text-sm text-yellow-400 hover:text-yellow-300 font-medium">
              Official Website <ExternalLink size={14} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

