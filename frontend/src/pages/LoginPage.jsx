import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [view, setView] = useState('login');
  const [username, setUsername] = useState('');
  const [educationLevel, setEducationLevel] = useState('10th');
  const [levels, setLevels] = useState([]);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://edutrack-50li.onrender.com/api/platform/education')
      .then(res => res.json())
      .then(data => setLevels(data))
      .catch(() => {});
  }, []);

  const handleAuth = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    login(username, educationLevel);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 text-white">
      <div className="max-w-md w-full bg-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-800">
        
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 block">🎓</span>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            EduTrack
          </h1>
          <p className="text-gray-400 mt-2">AI-Powered Career Guidance Platform</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          {view === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
              <input type="text" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition" required />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Username / Email</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
              placeholder="Enter your name or email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Your Education Level</label>
            <select 
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
            >
              {levels.length > 0 ? levels.map(l => (
                <option key={l._id} value={l.name}>{l.name}</option>
              )) : (
                <>
                  <option>10th</option>
                  <option>Intermediate</option>
                  <option>B.Tech</option>
                  <option>Degree</option>
                  <option>Higher Studies</option>
                </>
              )}
            </select>
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg py-3 font-semibold hover:opacity-90 transition-opacity"
          >
            {view === 'login' ? 'Start Learning →' : 'Create Account →'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          {view === 'login' ? "New here? " : "Already registered? "}
          <button 
            onClick={() => setView(view === 'login' ? 'register' : 'login')} 
            className="text-blue-500 hover:underline"
          >
            {view === 'login' ? 'Register' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}

