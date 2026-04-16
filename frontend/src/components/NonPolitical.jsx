import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/mock';
import { Briefcase, XCircle, Award } from 'lucide-react';

const NonPolitical = () => {
  const { language } = useLanguage();
  const t = translations[language]?.nonPolitical || translations.en.nonPolitical;
  const isRTL = language === 'ar';

  const items = [
    { icon: Briefcase, text: t.professional },
    { icon: XCircle, text: t.noAgenda },
    { icon: Award, text: t.ethical }
  ];

  return (
    <section id="non-political" className={`py-20 bg-white ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 ${isRTL ? 'text-right' : 'text-left'} md:text-center`}>
          <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-text-muted max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex-1 flex flex-col items-center text-center p-6 bg-surface-light rounded-xl border border-border-light`}
            >
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <item.icon className="w-7 h-7 text-green-700" />
              </div>
              <p className="text-text-body">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NonPolitical;
