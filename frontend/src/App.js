import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Statistics from './components/Statistics';
import About from './components/About';
import Ownership from './components/Ownership';
import Organizer from './components/Organizer';
import Governance from './components/Governance';
import Partners from './components/Partners';
import Legal from './components/Legal';
import NonPolitical from './components/NonPolitical';
import Categories from './components/Categories';
import Eligibility from './components/Eligibility';
import Timeline from './components/Timeline';
import NominationForm from './components/NominationForm';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NominationDetail from './pages/NominationDetail';
import InternalDocument from './pages/InternalDocument';

// Landing Page Component
const LandingPage = () => (
  <LanguageProvider>
    <Header />
    <main>
      <Hero />
      <Statistics />
      <About />
      <Ownership />
      <Organizer />
      <Governance />
      <Categories />
      <Eligibility />
      <Partners />
      <Legal />
      <NonPolitical />
      <Timeline />
      <NominationForm />
      <FAQ />
      <CallToAction />
    </main>
    <Footer />
  </LanguageProvider>
);

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/nomination/:id" element={<NominationDetail />} />
            <Route path="/admin/internal-document" element={<InternalDocument />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
