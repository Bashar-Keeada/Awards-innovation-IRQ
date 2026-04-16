import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, Users } from 'lucide-react';

const Recognition = () => {
  const { t, language } = useLanguage();

  return (
    <section id="recognition" className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Ambassador Recognition Box */}
          <div className="bg-bg-light rounded-lg border border-border-light shadow-sm p-6 md:p-8">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-lg bg-primary-blue flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className={`text-xl font-bold text-text-dark mb-2 ${
                  language === 'ar' ? 'text-right' : 'text-left'
                }`}>
                  {t.ambassador.title}
                </h3>
                {t.ambassador.subtitle && (
                  <p className={`text-sm text-text-muted mb-4 italic ${
                    language === 'ar' ? 'text-right' : 'text-left'
                  }`}>
                    {t.ambassador.subtitle}
                  </p>
                )}
                <p className={`text-text-body leading-relaxed ${
                  language === 'ar' ? 'text-right' : 'text-left'
                }`}>
                  {t.ambassador.text}
                </p>
                {t.ambassador.textSecondary && (
                  <p className={`text-text-muted text-sm mt-3 italic ${
                    language === 'ar' ? 'text-right' : 'text-left'
                  }`}>
                    {t.ambassador.textSecondary}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Jury Committee Box */}
          <div className="bg-gradient-to-br from-bg-light to-white rounded-lg border-l-4 border-accent-green shadow-sm p-6 md:p-8">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-lg bg-accent-green flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className={`text-xl font-bold text-text-dark mb-2 ${
                  language === 'ar' ? 'text-right' : 'text-left'
                }`}>
                  {t.jury.title}
                </h3>
                {t.jury.subtitle && (
                  <p className={`text-sm text-text-muted mb-4 italic ${
                    language === 'ar' ? 'text-right' : 'text-left'
                  }`}>
                    {t.jury.subtitle}
                  </p>
                )}
                <p className={`text-text-body leading-relaxed ${
                  language === 'ar' ? 'text-right' : 'text-left'
                }`}>
                  {t.jury.text}
                </p>
                {t.jury.textSecondary && (
                  <p className={`text-text-muted text-sm mt-3 italic ${
                    language === 'ar' ? 'text-right' : 'text-left'
                  }`}>
                    {t.jury.textSecondary}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recognition;
