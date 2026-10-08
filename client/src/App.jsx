import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GenerateMissionPage from './pages/GenerateMissionPage';
import MissionPage from './pages/MissionPage';
import MissionCompletePage from './pages/MissionCompletePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeMission, setActiveMission] = useState(null);
  const [sessionSummary, setSessionSummary] = useState(null);

  // Scroll to top on page switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'generate':
        return (
          <GenerateMissionPage
            onNavigate={setCurrentPage}
            onMissionGenerated={setActiveMission}
          />
        );
      case 'mission':
        return (
          <MissionPage
            onNavigate={setCurrentPage}
            mission={activeMission}
            onMissionFinished={setSessionSummary}
          />
        );
      case 'complete':
        return (
          <MissionCompletePage
            onNavigate={setCurrentPage}
            sessionSummary={sessionSummary}
          />
        );
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f5] text-[#1d2520] selection:bg-[#c8e2d2] selection:text-[#132a1c]">
      {/* Top Navigation */}
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Main Content Area */}
      <div className="flex-1">
        {renderCurrentPage()}
      </div>

      {/* Persistent Nature Footer */}
      <Footer />
    </div>
  );
}
