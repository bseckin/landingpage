import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import ProblemGrid from './components/ProblemGrid';
import Services from './components/Services';
import About from './components/About';
import Process from './components/Process';
import Footer from './components/Footer';
import CaseStudyGrid from './components/CaseStudyGrid';
import Admin from './routes/Admin';
import CaseStudy from './routes/CaseStudy';


function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black">
      <Hero />
      <ProblemGrid />
      <Services />
      <CaseStudyGrid />
      <About />
      <Process />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/case-study/:id" element={<CaseStudy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
