import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const { t, language, switchLanguage, languageConfig } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const awardLogo = "https://customer-assets.emergentagent.com/job_iraqicreative/artifacts/pbmg11t9_image.png";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-primary-dark shadow-lg' 
          : 'bg-primary-dark/95'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src={awardLogo} 
              alt="IEIA - International Excellence & Innovation Award" 
              className="h-12 md:h-14 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-accent-gold leading-tight">
                IEIA
              </p>
              <p className="text-xs text-white/70">
                {language === 'ar' ? 'جائزة التميز والابتكار' : language === 'sv' ? 'Excellence & Innovation' : 'Excellence & Innovation'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-white/80 hover:text-accent-gold transition-colors font-medium"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-white/80 hover:text-accent-gold transition-colors font-medium"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => scrollToSection('governance')}
              className="text-white/80 hover:text-accent-gold transition-colors font-medium"
            >
              {t.nav.governance || 'Governance'}
            </button>
            <button
              onClick={() => scrollToSection('eligibility')}
              className="text-white/80 hover:text-accent-gold transition-colors font-medium"
            >
              {t.nav.nominate}
            </button>
            <a
              href="mailto:info@keeada.org"
              className="text-white/80 hover:text-accent-gold transition-colors font-medium"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-white/20 rounded-md overflow-hidden">
              {Object.keys(languageConfig).map((lang) => (
                <button
                  key={lang}
                  onClick={() => switchLanguage(lang)}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    language === lang
                      ? 'bg-accent-gold text-primary-dark'
                      : 'bg-transparent text-white/70 hover:text-white'
                  }`}
                >
                  {languageConfig[lang].code}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:text-accent-gold hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-4 animate-in slide-in-from-top-2">
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => scrollToSection('hero')}
                className="px-4 py-3 text-white/80 hover:text-accent-gold hover:bg-white/5 rounded-md text-start font-medium"
              >
                {t.nav.home}
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="px-4 py-3 text-white/80 hover:text-accent-gold hover:bg-white/5 rounded-md text-start font-medium"
              >
                {t.nav.about}
              </button>
              <button
                onClick={() => scrollToSection('governance')}
                className="px-4 py-3 text-white/80 hover:text-accent-gold hover:bg-white/5 rounded-md text-start font-medium"
              >
                {t.nav.governance || 'Governance'}
              </button>
              <button
                onClick={() => scrollToSection('eligibility')}
                className="px-4 py-3 text-white/80 hover:text-accent-gold hover:bg-white/5 rounded-md text-start font-medium"
              >
                {t.nav.nominate}
              </button>
              <a
                href="mailto:info@keeada.org"
                className="px-4 py-3 text-white/80 hover:text-accent-gold hover:bg-white/5 rounded-md text-start font-medium block"
              >
                {t.nav.contact}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
