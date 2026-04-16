import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/mock';
import { Handshake, UserX, Shield, FileWarning } from 'lucide-react';

const Partners = () => {
  const { language } = useLanguage();
  const t = translations[language]?.partners || translations.en.partners;
  const isRTL = language === 'ar';

  const items = [
    { icon: Handshake, text: t.independent },
    { icon: UserX, text: t.noRepresent },
    { icon: Shield, text: t.noAuthority },
    { icon: FileWarning, text: t.liability }
  ];

  return (
    <section id="partners" className={`py-20 bg-surface-light ${isRTL ? 'rtl' : 'ltr'}`}>
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

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-border-light">
          <ul className="space-y-4">
            {items.map((item, index) => (
              <li
                key={index}
                className={`flex items-center gap-4 p-4 rounded-lg hover:bg-surface-light transition-colors ${isRTL ? 'flex-row-reverse text-right' : ''}`}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-primary-dark/10 rounded-full flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary-dark" />
                </div>
                <p className="text-text-body">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Partners;
