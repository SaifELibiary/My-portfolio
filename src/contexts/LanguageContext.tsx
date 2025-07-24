import { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isLoading: boolean;
}

const translations = {
  en: {
    // Navigation
    home: 'Home',
    projects: 'Projects',
    skills: 'Skills',
    about: 'About',
    contact: 'Contact',
    
    // Hero Section
    welcome: 'Welcome to my portfolio',
    meanDeveloper: 'MEAN Stack Developer',
    reactDeveloper: 'React Developer',
    
    // About Section
    aboutTitle: 'About Me',
    bio: "I'm Saif Elibiary, a MEAN Stack Developer with a passion for building clean, scalable full-stack applications using React.",
    email: 'saifelibiary896@gmail.com',
    
    // Projects Section
    projectsTitle: 'My Projects',
    liveDemo: 'Live Demo',
    githubRepo: 'GitHub Repo',
    
    // Skills Section
    skillsTitle: 'Technical Skills',
    
    // Contact Section
    contactTitle: 'Get In Touch',
    name: 'Name',
    message: 'Message',
    sendMessage: 'Send Message',
    
    // Common
    loading: 'Loading...',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    projects: 'المشاريع',
    skills: 'المهارات',
    about: 'حولي',
    contact: 'تواصل',
    
    // Hero Section
    welcome: 'مرحباً بك في موقعي الشخصي',
    meanDeveloper: 'مطور MEAN Stack',
    reactDeveloper: 'مطور React',
    
    // About Section
    aboutTitle: 'حولي',
    bio: 'أنا سيف الإبياري، مطور MEAN Stack شغوف ببناء تطبيقات ويب نظيفة وقابلة للتطوير باستخدام React.',
    email: 'saifelibiary896@gmail.com',
    
    // Projects Section
    projectsTitle: 'مشاريعي',
    liveDemo: 'معاينة مباشرة',
    githubRepo: 'مستودع GitHub',
    
    // Skills Section
    skillsTitle: 'المهارات التقنية',
    
    // Contact Section
    contactTitle: 'تواصل معي',
    name: 'الاسم',
    message: 'الرسالة',
    sendMessage: 'إرسال رسالة',
    
    // Common
    loading: 'جارٍ التحميل...',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(false);

  const toggleLanguage = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLanguage(prevLang => prevLang === 'en' ? 'ar' : 'en');
      document.documentElement.dir = language === 'en' ? 'rtl' : 'ltr';
      setIsLoading(false);
    }, 300);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}