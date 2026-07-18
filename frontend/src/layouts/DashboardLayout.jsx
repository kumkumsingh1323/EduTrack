import { useContext } from 'react';
import { Outlet, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { 
  BookOpen, 
  LayoutDashboard, 
  Search, 
  Trophy, 
  Bookmark, 
  Briefcase, 
  FileText, 
  LogOut 
} from 'lucide-react';

export default function DashboardLayout() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Browse Paths', path: '/paths', icon: BookOpen },
    { name: 'Placement Roles', path: '/placements', icon: Briefcase },
    { name: 'Company Prep', path: '/companies', icon: Trophy },
    { name: 'Internships', path: '/internships', icon: Search },
    { name: 'Certifications', path: '/certifications', icon: Bookmark },
    { name: 'Career Tools', path: '/tools', icon: FileText },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-800">
          <Link to="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">EduTrack</span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
              return (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-600/10 text-blue-400 font-medium' 
                        : 'text-gray-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-blue-500' : 'text-gray-500'} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile Summary */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-sm truncate">{user.name}</p>
              <div className="flex gap-2 text-xs text-gray-400">
                <span className="flex items-center gap-1 text-orange-400"><Trophy size={12}/> {user.xp} XP</span>
                <span className="flex items-center gap-1 text-green-400">🔥 {user.streak} Days</span>
              </div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-gray-300 hover:bg-slate-800 hover:text-white transition-colors text-sm"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-slate-950 relative">
        {/* Dynamic Page Content */}
        <div className="p-8 pb-24">
          <Outlet />
        </div>
      </main>

    </div>
  );
}
