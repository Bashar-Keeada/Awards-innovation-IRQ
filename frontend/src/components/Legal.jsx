import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/mock';
import { Copyright, Settings, Stamp, Ban } from 'lucide-react';

const Legal = () => {
  const { language } = useLanguage();
  const t = translations[language]?.legal || translations.en.legal;
  const isRTL = language === 'ar';

  const items = [
    { icon: Copyright, text: t.ip },
    { icon: Settings, text: t.operational },
    { icon: Stamp, text: t.symbols },
    { icon: Ban, text: t.nonPolitical }
  ];

  return (
    <section id="legal" className={`py-20 bg-primary-dark ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 ${isRTL ? 'text-right' : 'text-left'} md:text-center`}>
          <span className="inline-block px-4 py-2 bg-accent-gold/20 text-accent-gold rounded-full text-sm font-medium mb-4">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-6 bg-white/10 backdrop-blur rounded-xl border border-white/20 hover:bg-white/15 transition-colors ${isRTL ? 'flex-row-reverse text-right' : ''}`}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-accent-gold/20 rounded-lg flex items-center justify-center">
                <item.icon className="w-6 h-6 text-accent-gold" />
              </div>
              <p className="text-white/90 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Legal;
