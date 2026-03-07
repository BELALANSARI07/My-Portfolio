import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import GithubIntegration from './components/GithubIntegration';
// Admin Components
import AdminLayout from './admin/AdminLayout';
import Login from './admin/Login';
import Dashboard from './admin/Dashboard';
import ProjectsManager from './admin/ProjectsManager';
import SkillsManager from './admin/SkillsManager';
import AboutManager from './admin/AboutManager';
import ResumeManager from './admin/ResumeManager';
import SocialLinksManager from './admin/SocialLinksManager';
import Messages from './admin/Messages';
import './App.css';

const Portfolio = () => (
  <>
    <Navbar />
    <main style={{ position: "relative", zIndex: 1 }}>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <GithubIntegration />
      <Experience />
      <Contact />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <div className="App">
        <ParticleBackground />
        <Routes>
          {/* Public Portfolio Route */}
          <Route path="/" element={<Portfolio />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<ProjectsManager />} />
            <Route path="skills" element={<SkillsManager />} />
            <Route path="about" element={<AboutManager />} />
            <Route path="resume" element={<ResumeManager />} />
            <Route path="socials" element={<SocialLinksManager />} />
            <Route path="messages" element={<Messages />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
