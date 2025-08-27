import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import Matches from './components/Matches';
import Profile from './components/Profile';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import FloatingElements from './components/FloatingElements';
import './styles/animations.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    if (!hasCompletedOnboarding && location.pathname === '/') {
      navigate('/onboarding');
    }
  }, [navigate, location.pathname]);

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <CustomCursor />
      <FloatingElements />
      
      {location.pathname !== '/onboarding' && (
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}
      
      <Routes>
        <Route path="/onboarding" element={<Onboarding onComplete={handleOnboardingComplete} />} />
        <Route path="/" element={
          <>
            <Hero />
            <Footer />
          </>
        } />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;