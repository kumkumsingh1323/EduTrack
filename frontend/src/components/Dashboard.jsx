import { useState, useEffect } from 'react';
import RoadmapView from './RoadmapView';

export default function Dashboard({ onLogout }) {
  const [levels, setLevels] = useState([]);
  const [streams, setStreams] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);
  
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedStream, setSelectedStream] = useState(null);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  
  const [loading, setLoading] = useState(true);

  // 1. Fetch Education Levels on load
  useEffect(() => {
    fetch('https://edutrack-50li.onrender.com/api/platform/education')
      .then(res => res.json())
      .then(data => {
        setLevels(data);
        setLoading(false);
      })
      .catch(err => console.error('Error fetching levels:', err));
  }, []);

  // 2. Fetch Streams when Level is clicked
  const handleLevelClick = (level) => {
    setSelectedLevel(level);
    setSelectedStream(null);
    setSelectedRoadmap(null);
    setLoading(true);
    fetch(`/api/platform/streams/${level._id}`)
      .then(res => res.json())
      .then(data => {
        setStreams(data);
        setLoading(false);
      });
  };

  // 3. Fetch Roadmaps when Stream is clicked
  const handleStreamClick = (stream) => {
    setSelectedStream(stream);
    setSelectedRoadmap(null);
    setLoading(true);
    fetch(`/api/platform/roadmaps/${stream._id}`)
      .then(res => res.json())
      .then(data => {
        setRoadmaps(data);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            EduTrack Categories
          </h1>
          <p className="text-gray-400 mt-2">Dynamic AI-Powered Career Navigation</p>
        </div>
        <button onClick={onLogout} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition">Logout</button>
      </div>

      {/* Breadcrumbs */}
      <div className="flex gap-2 text-sm text-gray-400 mb-8 font-medium">
        <span className="cursor-pointer hover:text-white" onClick={() => { setSelectedLevel(null); setSelectedStream(null); setSelectedRoadmap(null); }}>Home</span>
        {selectedLevel && <><span className="text-slate-600">/</span> <span className="cursor-pointer hover:text-white" onClick={() => { setSelectedStream(null); setSelectedRoadmap(null); }}>{selectedLevel.name}</span></>}
        {selectedStream && <><span className="text-slate-600">/</span> <span className="cursor-pointer hover:text-white" onClick={() => setSelectedRoadmap(null)}>{selectedStream.name}</span></>}
        {selectedRoadmap && <><span className="text-slate-600">/</span> <span className="text-blue-400">{selectedRoadmap.title}</span></>}
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>
      ) : selectedRoadmap ? (
        <RoadmapView roadmapId={selectedRoadmap._id} onBack={() => setSelectedRoadmap(null)} />
      ) : selectedStream ? (
        // Level 2: Roadmaps List View
        <div>
          <h2 className="text-2xl font-bold mb-6">{selectedStream.name} Career Paths</h2>
          {roadmaps.length === 0 ? (
            <div className="bg-slate-900 p-8 rounded-xl text-center border border-slate-800">
              <p className="text-gray-400">No specific paths found under {selectedStream.name} yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {roadmaps.map(rm => (
                <div key={rm._id} onClick={() => setSelectedRoadmap(rm)} className="bg-slate-900 border border-slate-800 p-6 rounded-xl cursor-pointer hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all">
                  <h3 className="text-lg font-bold text-blue-400 mb-2">{rm.title}</h3>
                  <p className="text-sm text-gray-500">{rm.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : selectedLevel ? (
        // Level 1: Streams List View
        <div>
          <h2 className="text-2xl font-bold mb-6">Select a category in {selectedLevel.name}</h2>
          {streams.length === 0 ? (
            <div className="bg-slate-900 p-8 rounded-xl text-center border border-slate-800">
              <p className="text-gray-400">No detailed categories found yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {streams.map(str => (
                <div key={str._id} onClick={() => handleStreamClick(str)} className="bg-slate-900 border border-slate-800 p-6 rounded-xl cursor-pointer hover:border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all">
                  <h3 className="text-lg font-bold text-purple-400">{str.name}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        // Level 0: Main Education Levels Grid
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {levels.map(lvl => (
            <div key={lvl._id} onClick={() => handleLevelClick(lvl)} className="bg-slate-900 border border-slate-800 p-6 rounded-xl cursor-pointer hover:bg-slate-800 transition-all flex flex-col justify-center items-center h-32">
              <h3 className="text-xl font-bold text-center">{lvl.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

