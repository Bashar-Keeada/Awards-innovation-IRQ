import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/mock';
import { Building2, Shield, Scale, FileCheck } from 'lucide-react';

const Ownership = () => {
  const { language } = useLanguage();
  const t = translations[language]?.ownership || translations.en.ownership;
  const isRTL = language === 'ar';

  const items = [
    { icon: Building2, text: t.owner },
    { icon: Shield, text: t.authority },
    { icon: Scale, text: t.direction },
    { icon: FileCheck, text: t.declaration }
  ];

  return (
    <section id="ownership" className={`py-20 bg-white ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 ${isRTL ? 'text-right' : 'text-left'} md:text-center`}>
          <span className="inline-block px-4 py-2 bg-primary-dark/10 text-primary-dark rounded-full text-sm font-medium mb-4">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-text-muted max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-6 bg-surface-light rounded-xl border border-border-light hover:shadow-md transition-shadow ${isRTL ? 'flex-row-reverse text-right' : ''}`}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-primary-dark/10 rounded-lg flex items-center justify-center">
                <item.icon className="w-6 h-6 text-primary-dark" />
              </div>
              <p className="text-text-body leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ownership;
