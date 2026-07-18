import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';
import AIChatWidget from './components/AIChatWidget';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PathsPage from './pages/PathsPage';
import PlacementsHub from './pages/PlacementsHub';
import CompanyHub from './pages/CompanyHub';
import InternshipsPage from './pages/InternshipsPage';
import CertificationsPage from './pages/CertificationsPage';
import CareerToolsPage from './pages/CareerToolsPage';
import ResumeBuilder from './pages/ResumeBuilder';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/paths" element={<PathsPage />} />
            <Route path="/placements" element={<PlacementsHub />} />
            <Route path="/companies" element={<CompanyHub />} />
            <Route path="/internships" element={<InternshipsPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/tools" element={<CareerToolsPage />} />
            <Route path="/resume" element={<ResumeBuilder />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        <AIChatWidget />
      </Router>
    </AuthProvider>
  );
}

export default App;
