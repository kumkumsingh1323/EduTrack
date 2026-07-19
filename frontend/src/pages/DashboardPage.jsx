import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { PlayCircle, Award, Target, Flame, TrendingUp, BookOpen, Briefcase, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch recommendations based on user's education level
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Get education levels
        const levelsRes = await fetch('https://edutrack-50li.onrender.com/api/platform/education');
        const levels = await levelsRes.json();
        const userLevel = levels.find(l => l.name === user?.educationLevel);
        
        if (userLevel) {
          // Get streams for the user's education level
          const streamsRes = await fetch(`/api/platform/streams/${userLevel._id}`);
          const streams = await streamsRes.json();
          
          // Get roadmaps for the first few streams
          const allRoadmaps = [];
          for (const stream of streams.slice(0, 3)) {
            const rmRes = await fetch(`/api/platform/roadmaps/${stream._id}`);
            const rms = await rmRes.json();
            allRoadmaps.push(...rms.slice(0, 2).map(r => ({ ...r, streamName: stream.name })));
          }
          setRecommendations(allRoadmaps.slice(0, 4));
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchRecommendations();
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Welcome & Stats Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}! 👋</h1>
          <p className="text-gray-400 mt-1">
            Education Level: <span className="text-blue-400 font-medium">{user?.educationLevel}</span> • Ready to learn?
          </p>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4 shadow-lg min-w-[130px]">
            <div className="p-2.5 bg-orange-500/20 text-orange-400 rounded-lg"><Flame size={22} /></div>
            <div>
              <p className="text-xs text-gray-400">Streak</p>
              <p className="text-lg font-bold text-white">{user?.streak} Day</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4 shadow-lg min-w-[130px]">
            <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-lg"><Target size={22} /></div>
            <div>
              <p className="text-xs text-gray-400">XP</p>
              <p className="text-lg font-bold text-white">{user?.xp}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link to="/paths" className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-800/50 rounded-xl p-5 hover:border-blue-500 transition group">
          <BookOpen className="text-blue-400 mb-3" size={28} />
          <h3 className="font-bold text-white text-sm">Browse Paths</h3>
          <p className="text-xs text-gray-400 mt-1">Explore your {user?.educationLevel} roadmaps</p>
        </Link>
        <Link to="/placements" className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-800/50 rounded-xl p-5 hover:border-purple-500 transition group">
          <Briefcase className="text-purple-400 mb-3" size={28} />
          <h3 className="font-bold text-white text-sm">Placement Prep</h3>
          <p className="text-xs text-gray-400 mt-1">Interview & coding prep</p>
        </Link>
        <Link to="/companies" className="bg-gradient-to-br from-pink-600/20 to-pink-800/20 border border-pink-800/50 rounded-xl p-5 hover:border-pink-500 transition group">
          <Building2 className="text-pink-400 mb-3" size={28} />
          <h3 className="font-bold text-white text-sm">Company Prep</h3>
          <p className="text-xs text-gray-400 mt-1">Google, TCS, Amazon...</p>
        </Link>
        <Link to="/resume" className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-800/50 rounded-xl p-5 hover:border-green-500 transition group">
          <Award className="text-green-400 mb-3" size={28} />
          <h3 className="font-bold text-white text-sm">Resume Builder</h3>
          <p className="text-xs text-gray-400 mt-1">ATS-friendly templates</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Recommended for your level */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="text-purple-500" /> Recommended for {user?.educationLevel}
            </h2>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5 animate-pulse">
                    <div className="h-4 bg-slate-800 rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-slate-800 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : recommendations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map((rm, i) => (
                  <Link to="/paths" state={{ selectedRoadmap: rm }} key={rm._id || i} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-purple-500/50 transition-colors cursor-pointer group">
                    <span className="text-xs text-purple-400 font-bold uppercase">{rm.streamName}</span>
                    <h3 className="font-bold text-white mt-1 mb-2 group-hover:text-blue-400 transition">{rm.title}</h3>
                    <p className="text-sm text-gray-500">{rm.description}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
                <p className="text-gray-400">Select your education level to get personalized recommendations.</p>
                <Link to="/paths" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">Browse All Paths</Link>
              </div>
            )}
          </section>

          {/* Quick Links */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <PlayCircle className="text-blue-500" /> Explore More
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/internships" className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-blue-500/50 transition text-center">
                <span className="text-3xl block mb-2">💼</span>
                <h3 className="font-bold text-white text-sm">Internships</h3>
              </Link>
              <Link to="/certifications" className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-blue-500/50 transition text-center">
                <span className="text-3xl block mb-2">📜</span>
                <h3 className="font-bold text-white text-sm">Certifications</h3>
              </Link>
              <Link to="/tools" className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-blue-500/50 transition text-center">
                <span className="text-3xl block mb-2">🛠️</span>
                <h3 className="font-bold text-white text-sm">Career Tools</h3>
              </Link>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="font-bold mb-4">Daily Goal</h2>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Complete 1 lesson today</span>
              <span className="text-blue-400 font-bold text-sm">{user?.xp} / 50 XP</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full mb-4">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min((user?.xp / 50) * 100, 100)}%` }}></div>
            </div>
            <p className="text-xs text-gray-500 italic">Start a lesson to earn XP and maintain your streak!</p>
          </section>

          <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <Award className="text-yellow-500" size={20} /> Badges
            </h2>
            <div className="flex flex-wrap gap-3">
              {user?.badges?.map(badge => (
                <div key={badge} className="flex flex-col items-center p-3 bg-slate-800 rounded-lg border border-slate-700 w-[75px]">
                  <span className="text-2xl mb-1">🥇</span>
                  <span className="text-[10px] font-bold text-gray-300 uppercase text-center">{badge}</span>
                </div>
              ))}
              <div className="flex flex-col items-center p-3 border-2 border-slate-800 border-dashed rounded-lg w-[75px] opacity-50">
                <span className="text-2xl mb-1 grayscale opacity-50">🔒</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase text-center">Locked</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

