import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, languageConfig } from '../data/mock';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar');

  const t = translations[language];
  const config = languageConfig[language];

  useEffect(() => {
    document.documentElement.dir = config.dir;
    document.documentElement.lang = language;
  }, [language, config.dir]);

  const switchLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, t, config, switchLanguage, languageConfig }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
