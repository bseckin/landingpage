import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import ProblemGrid from './components/ProblemGrid';
import BridgeSection from './components/BridgeSection';
import Services from './components/Services';
import About from './components/About';
import Process from './components/Process';
import Footer from './components/Footer';
import CaseStudyGrid from './components/CaseStudyGrid';
import Admin from './routes/Admin';
import CaseStudy from './routes/CaseStudy';
import { LanguageProvider } from './context/LanguageContext';
import LanguageToggle from './components/LanguageToggle';
import LegalPage from './pages/LegalPage';


function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen min-h-dvh bg-slate-50 text-slate-900 selection:bg-primary selection:text-white">
              <LanguageToggle />
              <Hero />
              <ProblemGrid />
              <BridgeSection />
              <Services />
              <CaseStudyGrid />
              <About />
              <Process />
              <Footer />
            </div>
          } />
          <Route path="/admin" element={<Admin />} />
          <Route path="/case-study/:id" element={<CaseStudy />} />
          <Route path="/impressum" element={<LegalPage type="impressum" />} />
          <Route path="/datenschutz" element={<LegalPage type="datenschutz" />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
