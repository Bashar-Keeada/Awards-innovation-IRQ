import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Building2, Calendar, Trophy, ArrowDown } from 'lucide-react';

const Hero = () => {
  const { t, language } = useLanguage();

  const awardLogo = "https://customer-assets.emergentagent.com/job_iraqicreative/artifacts/pbmg11t9_image.png";

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToNominationForm = () => {
    const element = document.getElementById('nomination-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-dark via-primary-dark/95 to-primary-blue pt-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 text-center">
        {/* Award Logo */}
        <div className="mb-6 md:mb-8">
          <img 
            src={awardLogo} 
            alt="Iraq Entrepreneur Awards Sweden" 
            className="h-28 sm:h-36 md:h-44 lg:h-52 w-auto mx-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* Badge */}
        <Badge
          variant="secondary"
          className="mb-4 md:mb-6 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium bg-accent-gold/20 text-accent-gold border border-accent-gold/30"
        >
          <Trophy className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2 inline" />
          {t.hero.badge}
        </Badge>

        {/* Main Title */}
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg px-2 ${
            language === 'ar' ? 'font-arabic' : ''
          }`}
        >
          {t.hero.title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-accent-gold font-medium mb-3 md:mb-4 px-2">
          {t.hero.subtitle}
        </p>

        {/* Intro Text */}
        <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto mb-8 md:mb-10 px-4">
          {t.hero.intro}
        </p>

        {/* Info Icons */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-6 lg:gap-10 mb-8 md:mb-12 px-4">
          <div className="flex items-center justify-center gap-2 text-white/80">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-accent-gold/20 flex items-center justify-center">
              <Building2 className="w-4 h-4 md:w-5 md:h-5 text-accent-gold" />
            </div>
            <span className="text-sm font-medium">{t.hero.embassy}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-white/80">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-accent-green/30 flex items-center justify-center">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-accent-green" />
            </div>
            <span className="text-sm font-medium">{t.hero.nominations || t.hero.organized}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-white/80">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-accent-gold/20 flex items-center justify-center">
              <Trophy className="w-4 h-4 md:w-5 md:h-5 text-accent-gold" />
            </div>
            <span className="text-sm font-medium">{t.hero.annual}</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-12 md:mb-16 px-4">
          <Button
            onClick={scrollToNominationForm}
            className="px-6 md:px-8 py-5 md:py-6 text-base md:text-lg font-semibold bg-accent-gold hover:bg-accent-gold/90 text-primary-dark transition-colors"
          >
            {t.hero.nominateBtn}
          </Button>
          <Button
            variant="outline"
            onClick={scrollToAbout}
            className="px-6 md:px-8 py-5 md:py-6 text-base md:text-lg font-semibold border-2 border-white/50 text-white hover:bg-white/10"
          >
            {t.hero.learnMoreBtn}
          </Button>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToAbout}
          className="animate-bounce text-white/60 hover:text-accent-gold transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
