import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import { ArrowUpRight } from 'lucide-react';

const CallToAction = () => {
  const { t, language } = useLanguage();

  const scrollToNominationForm = () => {
    const element = document.getElementById('nomination-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="cta" className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h2
          className={`text-3xl md:text-4xl font-bold text-text-dark mb-4 ${
            language === 'ar' ? 'font-arabic' : ''
          }`}
        >
          {t.cta.title}
        </h2>

        {/* Subtitle */}
        {t.cta.subtitle && (
          <p className="text-lg text-text-muted mb-6 italic">
            {t.cta.subtitle}
          </p>
        )}

        {/* Text */}
        <p className="text-lg text-text-body mb-4">
          {t.cta.text}
        </p>
        {t.cta.textSecondary && (
          <p className="text-text-muted mb-10 italic">
            {t.cta.textSecondary}
          </p>
        )}

        {/* CTA Button */}
        <Button
          size="lg"
          onClick={scrollToNominationForm}
          className="px-10 py-7 text-xl font-bold bg-primary-blue hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          {t.cta.button}
          <ArrowUpRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
