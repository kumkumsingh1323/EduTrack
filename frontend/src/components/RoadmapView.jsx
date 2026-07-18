import { useState, useEffect } from 'react';
import { PlayCircle, BookOpen } from 'lucide-react';

export default function RoadmapView({ roadmapId, onBack }) {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSubject, setOpenSubject] = useState(null);

  useEffect(() => {
    fetch(`/api/platform/roadmap-details/${roadmapId}`)
      .then(res => res.json())
      .then(data => {
        setRoadmap(data);
        if (data.subjects && data.subjects.length > 0) {
          setOpenSubject(data.subjects[0]._id);
        } else {
          setOpenSubject('d1'); // Default open first generated module
        }
        setLoading(false);
      });
  }, [roadmapId]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!roadmap) {
    return <div className="text-center text-red-500">Failed to load roadmap details.</div>;
  }

  // Dynamic Curriculum Generator for Empty Roadmaps
  const defaultSubjects = [
    {
      _id: 'd1',
      name: `Introduction to ${roadmap?.title}`,
      description: `Learn the fundamentals and basic concepts of ${roadmap?.title}`,
      lessons: [
        { _id: 'l1', title: 'Getting Started & Basics', type: 'Video' },
        { _id: 'l2', title: 'Core Principles & Theory', type: 'Video' },
        { _id: 'l3', title: 'Fundamental Concepts', type: 'Video' }
      ]
    },
    {
      _id: 'd2',
      name: `Advanced ${roadmap?.title}`,
      description: `Deep dive into advanced topics, tools, and real-world applications.`,
      lessons: [
        { _id: 'l4', title: 'Advanced Techniques', type: 'Video' },
        { _id: 'l5', title: 'Best Practices & Optimization', type: 'Video' },
        { _id: 'l6', title: 'Real-world Implementation', type: 'Project' }
      ]
    },
    {
      _id: 'd3',
      name: `Interview Prep & Career Growth`,
      description: `Prepare for technical interviews and accelerate your career.`,
      lessons: [
        { _id: 'l7', title: 'Top Interview Questions', type: 'Quiz' },
        { _id: 'l8', title: 'Resume Building & Portfolio', type: 'Video' }
      ]
    }
  ];

  const subjectsToRender = roadmap?.subjects?.length > 0 ? roadmap.subjects : defaultSubjects;

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <button onClick={onBack} className="mb-6 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition text-sm flex items-center gap-2">
        ← Back to Paths
      </button>

      {/* Hero Section */}
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl">🚀</div>
        <h2 className="text-4xl font-bold mb-4 text-white">{roadmap.title}</h2>
        <p className="text-gray-400 text-lg max-w-2xl">{roadmap.description}</p>
        
        {/* Dynamic Metadata Tags */}
        <div className="flex flex-wrap gap-3 mt-6">
          <span className="px-3 py-1 bg-blue-900/50 text-blue-400 border border-blue-800 rounded-full text-sm font-medium">Type: {roadmap.type || 'General'}</span>
          <span className="px-3 py-1 bg-purple-900/50 text-purple-400 border border-purple-800 rounded-full text-sm font-medium">Duration: {roadmap.estimatedMonths || '3'} Months</span>
          {roadmap.salary && <span className="px-3 py-1 bg-green-900/50 text-green-400 border border-green-800 rounded-full text-sm font-medium">Expected Salary: {roadmap.salary}</span>}
        </div>
      </div>

      {/* Detailed Information Panel */}
      {(roadmap.eligibility || roadmap.examPattern || roadmap.topColleges) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {roadmap.eligibility && (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-2 text-gray-200 flex items-center gap-2">🎓 Eligibility</h3>
              <p className="text-gray-400 text-sm">{roadmap.eligibility}</p>
            </div>
          )}
          {roadmap.examPattern && (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-2 text-gray-200 flex items-center gap-2">📝 Exam Pattern</h3>
              <p className="text-gray-400 text-sm">{roadmap.examPattern}</p>
            </div>
          )}
          {roadmap.topColleges && roadmap.topColleges.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl md:col-span-2">
              <h3 className="text-lg font-bold mb-2 text-gray-200 flex items-center gap-2">🏫 Top Colleges</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {roadmap.topColleges.map((college, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-800 text-gray-300 rounded-md text-sm">{college}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Curriculum Accordion */}
      <h3 className="text-2xl font-bold mb-6 mt-12 border-b border-slate-800 pb-4">Comprehensive Curriculum</h3>
      
      <div className="space-y-4">
        {subjectsToRender.map((subject, index) => {
          const isOpen = openSubject === subject._id;
          return (
            <div key={subject._id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-all">
              <button 
                className="w-full p-6 text-left flex justify-between items-center hover:bg-slate-800/50 transition-colors"
                onClick={() => setOpenSubject(isOpen ? null : subject._id)}
              >
                <div>
                  <span className="text-sm font-bold text-blue-500 mb-1 block">MODULE {index + 1}</span>
                  <h4 className="text-xl font-bold text-white">{subject.name}</h4>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">{subject.lessons?.length || 0} Lessons</span>
                  <span className={`transform transition-transform text-2xl ${isOpen ? 'rotate-180 text-blue-500' : 'text-gray-600'}`}>↓</span>
                </div>
              </button>
              
              {isOpen && (
                <div className="border-t border-slate-800 bg-slate-950/50 p-6">
                  <p className="text-gray-400 text-sm mb-6">{subject.description}</p>
                  
                  {subject.lessons && subject.lessons.length > 0 ? (
                    <div className="space-y-3">
                      {subject.lessons.map((lesson, lIndex) => (
                        <div key={lesson._id} className="p-4 bg-slate-900 border border-slate-800 rounded-lg hover:border-blue-500/50 transition-colors group">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full shrink-0 bg-slate-800 flex items-center justify-center text-gray-400 group-hover:bg-blue-900 group-hover:text-blue-400 transition-colors">
                                {lesson.type === 'Video' ? '▶' : lesson.type === 'Project' ? '💻' : lesson.type === 'Quiz' ? '❓' : '📄'}
                              </div>
                              <div>
                                <h5 className="font-semibold text-gray-200 group-hover:text-white transition-colors">{lesson.title}</h5>
                                <span className="text-xs text-gray-500 uppercase font-medium">{lesson.type}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <a 
                                href={lesson.youtubeUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(subject.name + ' ' + lesson.title + ' full course tutorial in hindi english')}`} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="flex items-center gap-1.5 px-3 py-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg text-sm font-medium transition-colors"
                              >
                                <PlayCircle size={16} /> Watch
                              </a>
                              <button 
                                className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg text-sm font-medium transition-colors"
                                onClick={() => alert(`Starting ${lesson.title}`)}
                              >
                                <BookOpen size={16} /> Start
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic">No lessons added to this module yet.</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
