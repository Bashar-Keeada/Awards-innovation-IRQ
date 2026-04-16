import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Check } from 'lucide-react';

const Eligibility = () => {
  const { t, language } = useLanguage();

  return (
    <section id="eligibility" className="py-20 md:py-28 bg-bg-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2
          className={`text-3xl md:text-4xl font-bold text-text-dark text-center mb-12 ${
            language === 'ar' ? 'font-arabic' : ''
          }`}
        >
          {t.eligibility.title}
        </h2>

        {/* Criteria List */}
        <div className="bg-white rounded-lg border border-border-light shadow-sm p-6 md:p-8">
          <ul className="space-y-6">
            {t.eligibility.criteria.map((criterion, index) => (
              <li key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-accent-green/10 flex items-center justify-center">
                    <Check className="w-5 h-5 text-accent-green" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className={`text-text-dark font-medium text-lg leading-relaxed ${
                    language === 'ar' ? 'text-right' : 'text-left'
                  }`}>
                    {criterion.ar}
                  </p>
                  {criterion.secondary && (
                    <p className={`text-text-muted text-sm mt-1 italic ${
                      language === 'ar' ? 'text-right' : 'text-left'
                    }`}>
                      {criterion.secondary}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Eligibility;
