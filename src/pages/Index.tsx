import { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import IntroAnimation from '@/components/IntroAnimation';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import About from '@/components/About';
import Contact from '@/components/Contact';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
        <div className="min-h-screen bg-background">
          <Navbar />
          <Hero />
          <Projects />
          <Skills />
          <About />
          <Contact />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Index;
