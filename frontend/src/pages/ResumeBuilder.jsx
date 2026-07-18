import { useState } from 'react';
import { FileText, Download, Plus, Trash2 } from 'lucide-react';

export default function ResumeBuilder() {
  const [resume, setResume] = useState({
    name: '', email: '', phone: '', linkedin: '', github: '',
    summary: '',
    education: [{ degree: '', college: '', year: '', gpa: '' }],
    skills: '',
    experience: [{ title: '', company: '', duration: '', description: '' }],
    projects: [{ name: '', tech: '', description: '' }],
    certifications: ''
  });
  const [showPreview, setShowPreview] = useState(false);

  const update = (field, value) => setResume(prev => ({ ...prev, [field]: value }));
  const updateArray = (field, index, key, value) => {
    setResume(prev => {
      const arr = [...prev[field]];
      arr[index] = { ...arr[index], [key]: value };
      return { ...prev, [field]: arr };
    });
  };
  const addItem = (field, template) => setResume(prev => ({ ...prev, [field]: [...prev[field], template] }));
  const removeItem = (field, index) => setResume(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html><head><title>${resume.name} - Resume</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Arial, sans-serif; }
        body { padding: 40px; color: #1a1a1a; max-width: 800px; margin: 0 auto; }
        h1 { font-size: 28px; margin-bottom: 4px; }
        .contact { font-size: 13px; color: #555; margin-bottom: 20px; }
        .contact a { color: #2563eb; text-decoration: none; }
        h2 { font-size: 15px; text-transform: uppercase; color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin: 18px 0 10px; letter-spacing: 1px; }
        .item { margin-bottom: 12px; }
        .item-header { display: flex; justify-content: space-between; align-items: baseline; }
        .item-title { font-weight: 700; font-size: 14px; }
        .item-sub { font-size: 13px; color: #555; }
        .item-desc { font-size: 13px; color: #333; margin-top: 4px; line-height: 1.5; }
        .skills { font-size: 13px; line-height: 1.8; }
        .skill-tag { background: #eff6ff; color: #2563eb; padding: 2px 10px; border-radius: 4px; display: inline-block; margin: 2px 4px 2px 0; font-size: 12px; }
      </style></head><body>
        <h1>${resume.name}</h1>
        <div class="contact">
          ${resume.email} ${resume.phone ? ' | ' + resume.phone : ''}
          ${resume.linkedin ? ' | <a href="https://linkedin.com/in/' + resume.linkedin + '">LinkedIn</a>' : ''}
          ${resume.github ? ' | <a href="https://github.com/' + resume.github + '">GitHub</a>' : ''}
        </div>
        ${resume.summary ? '<h2>Summary</h2><p class="item-desc">' + resume.summary + '</p>' : ''}
        <h2>Education</h2>
        ${resume.education.map(e => `<div class="item"><div class="item-header"><span class="item-title">${e.degree}</span><span class="item-sub">${e.year}</span></div><div class="item-sub">${e.college} ${e.gpa ? '| GPA: ' + e.gpa : ''}</div></div>`).join('')}
        ${resume.skills ? '<h2>Technical Skills</h2><div class="skills">' + resume.skills.split(',').map(s => '<span class="skill-tag">' + s.trim() + '</span>').join('') + '</div>' : ''}
        ${resume.experience.some(e => e.title) ? '<h2>Experience</h2>' + resume.experience.filter(e => e.title).map(e => `<div class="item"><div class="item-header"><span class="item-title">${e.title} at ${e.company}</span><span class="item-sub">${e.duration}</span></div><p class="item-desc">${e.description}</p></div>`).join('') : ''}
        <h2>Projects</h2>
        ${resume.projects.filter(p => p.name).map(p => `<div class="item"><div class="item-header"><span class="item-title">${p.name}</span><span class="item-sub">${p.tech}</span></div><p class="item-desc">${p.description}</p></div>`).join('')}
        ${resume.certifications ? '<h2>Certifications</h2><p class="item-desc">' + resume.certifications + '</p>' : ''}
      </body></html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 border-b border-slate-800 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent flex items-center gap-3">
            <FileText /> ATS Resume Builder
          </h1>
          <p className="text-gray-400 mt-2">Create a professional, ATS-friendly resume in minutes.</p>
        </div>
        <button onClick={handlePrint} className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium">
          <Download size={18} /> Download PDF
        </button>
      </div>

      <div className="space-y-6">
        {/* Personal Info */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="font-bold text-lg mb-4 text-white">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Full Name" value={resume.name} onChange={e => update('name', e.target.value)} className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500" />
            <input placeholder="Email" value={resume.email} onChange={e => update('email', e.target.value)} className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500" />
            <input placeholder="Phone" value={resume.phone} onChange={e => update('phone', e.target.value)} className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500" />
            <input placeholder="LinkedIn Username" value={resume.linkedin} onChange={e => update('linkedin', e.target.value)} className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500" />
            <input placeholder="GitHub Username" value={resume.github} onChange={e => update('github', e.target.value)} className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500" />
          </div>
          <textarea placeholder="Professional Summary (2-3 lines)" value={resume.summary} onChange={e => update('summary', e.target.value)} rows={3} className="mt-4 w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500" />
        </div>

        {/* Education */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg text-white">Education</h2>
            <button onClick={() => addItem('education', { degree: '', college: '', year: '', gpa: '' })} className="text-sm text-blue-400 flex items-center gap-1 hover:text-blue-300"><Plus size={16} /> Add</button>
          </div>
          {resume.education.map((edu, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3 items-center">
              <input placeholder="Degree (B.Tech CSE)" value={edu.degree} onChange={e => updateArray('education', i, 'degree', e.target.value)} className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" />
              <input placeholder="College Name" value={edu.college} onChange={e => updateArray('education', i, 'college', e.target.value)} className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" />
              <input placeholder="Year (2021-2025)" value={edu.year} onChange={e => updateArray('education', i, 'year', e.target.value)} className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" />
              <div className="flex gap-2">
                <input placeholder="GPA" value={edu.gpa} onChange={e => updateArray('education', i, 'gpa', e.target.value)} className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" />
                {resume.education.length > 1 && <button onClick={() => removeItem('education', i)} className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>}
              </div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="font-bold text-lg mb-4 text-white">Technical Skills</h2>
          <input placeholder="Java, Python, React, Node.js, MongoDB, SQL, Git, Docker..." value={resume.skills} onChange={e => update('skills', e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500" />
          <p className="text-xs text-gray-500 mt-2">Separate skills with commas. ATS systems scan for these keywords.</p>
        </div>

        {/* Projects */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg text-white">Projects</h2>
            <button onClick={() => addItem('projects', { name: '', tech: '', description: '' })} className="text-sm text-blue-400 flex items-center gap-1 hover:text-blue-300"><Plus size={16} /> Add</button>
          </div>
          {resume.projects.map((proj, i) => (
            <div key={i} className="mb-4 p-4 bg-slate-950 rounded-lg border border-slate-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                <input placeholder="Project Name" value={proj.name} onChange={e => updateArray('projects', i, 'name', e.target.value)} className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" />
                <div className="flex gap-2">
                  <input placeholder="Tech Stack" value={proj.tech} onChange={e => updateArray('projects', i, 'tech', e.target.value)} className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" />
                  {resume.projects.length > 1 && <button onClick={() => removeItem('projects', i)} className="text-red-400"><Trash2 size={16} /></button>}
                </div>
              </div>
              <textarea placeholder="Brief description of what you built..." value={proj.description} onChange={e => updateArray('projects', i, 'description', e.target.value)} rows={2} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" />
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="font-bold text-lg mb-4 text-white">Certifications</h2>
          <textarea placeholder="• AWS Solutions Architect - Amazon (2024)&#10;• Google Data Analytics - Coursera (2024)&#10;• NPTEL Java Programming - IIT Kharagpur (2023)" value={resume.certifications} onChange={e => update('certifications', e.target.value)} rows={4} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500" />
        </div>
      </div>
    </div>
  );
}
