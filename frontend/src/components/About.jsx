import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Badge } from './ui/badge';
import { Trophy, Star } from 'lucide-react';

const About = () => {
  const { t, language } = useLanguage();

  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="text-center mb-8">
          <Badge
            variant="secondary"
            className="px-4 py-2 text-sm font-medium bg-accent-gold/15 text-accent-gold border-none"
          >
            <Trophy className="w-4 h-4 mr-2 inline" />
            {t.about.badge}
          </Badge>
        </div>

        {/* Title */}
        <h2
          className={`text-3xl md:text-4xl font-bold text-text-dark text-center mb-4 ${
            language === 'ar' ? 'font-arabic' : ''
          }`}
        >
          {t.about.title}
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-text-muted text-center mb-12">
          {t.about.subtitle}
        </p>

        {/* Main Text */}
        <div className="prose prose-lg max-w-none mb-10">
          <p className={`text-text-body leading-relaxed text-lg ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            {t.about.mainText}
          </p>
        </div>

        {/* Highlight Box */}
        <div className="relative bg-gradient-to-r from-primary-blue/5 to-primary-blue/10 rounded-lg p-6 md:p-8 mb-10 border-l-4 border-primary-blue">
          <div className="absolute top-4 right-4">
            <Star className="w-6 h-6 text-primary-blue/30" />
          </div>
          <p className={`text-text-dark font-medium text-lg leading-relaxed ${language === 'ar' ? 'text-right pr-2' : 'text-left pl-2'}`}>
            {t.about.highlight}
          </p>
        </div>

        {/* Goal Text */}
        <div className="prose prose-lg max-w-none">
          <p className={`text-text-body leading-relaxed text-lg ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            {t.about.goal}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
