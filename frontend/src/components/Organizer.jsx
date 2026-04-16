import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/mock';
import { Settings, ClipboardList, Users, AlertCircle } from 'lucide-react';

const Organizer = () => {
  const { language } = useLanguage();
  const t = translations[language]?.organizer || translations.en.organizer;
  const isRTL = language === 'ar';

  const items = [
    { icon: ClipboardList, text: t.mandate },
    { icon: Settings, text: t.responsibilities },
    { icon: Users, text: t.framework },
    { icon: AlertCircle, text: t.limitation }
  ];

  return (
    <section id="organizer" className={`py-20 bg-surface-light ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 ${isRTL ? 'text-right' : 'text-left'} md:text-center`}>
          <span className="inline-block px-4 py-2 bg-accent-gold/20 text-primary-dark rounded-full text-sm font-medium mb-4">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-accent-gold font-semibold">
            {t.subtitle}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-border-light">
          <div className="space-y-6">
            {items.map((item, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 pb-6 ${index < items.length - 1 ? 'border-b border-border-light' : ''} ${isRTL ? 'flex-row-reverse text-right' : ''}`}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-accent-gold/20 rounded-full flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-accent-gold" />
                </div>
                <p className="text-text-body leading-relaxed flex-1">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Organizer;
