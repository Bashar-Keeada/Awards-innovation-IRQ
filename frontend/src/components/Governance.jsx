import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/mock';
import { Building, Briefcase, Users, UserCheck } from 'lucide-react';

const Governance = () => {
  const { language } = useLanguage();
  const t = translations[language]?.governance || translations.en.governance;
  const isRTL = language === 'ar';

  const structure = [
    { 
      icon: Building, 
      title: t.owner, 
      description: t.ownerDesc,
      color: 'bg-primary-dark text-white'
    },
    { 
      icon: Briefcase, 
      title: t.organizingBody, 
      description: t.organizingBodyDesc,
      color: 'bg-accent-gold text-primary-dark'
    },
    { 
      icon: Users, 
      title: t.jury, 
      description: t.juryDesc,
      color: 'bg-primary-dark/80 text-white'
    },
    { 
      icon: UserCheck, 
      title: t.advisory, 
      description: t.advisoryDesc,
      color: 'bg-accent-gold/80 text-primary-dark'
    }
  ];

  return (
    <section id="governance" className={`py-20 bg-white ${isRTL ? 'rtl' : 'ltr'}`}>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {structure.map((item, index) => (
            <div
              key={index}
              className="bg-surface-light rounded-xl border border-border-light overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className={`${item.color} p-4 flex items-center justify-center`}>
                <item.icon className="w-8 h-8" />
              </div>
              <div className={`p-5 ${isRTL ? 'text-right' : 'text-left'}`}>
                <h3 className="font-bold text-primary-dark mb-2">{item.title}</h3>
                <p className="text-sm text-text-muted">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Governance;
