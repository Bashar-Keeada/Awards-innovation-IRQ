import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, Users, Calendar, Globe } from 'lucide-react';

const Statistics = () => {
  const { language } = useLanguage();

  const content = {
    ar: {
      stats: [
        { icon: Award, value: '2025', label: 'أول جائزة رسمية' },
        { icon: Users, value: '∞', label: 'جميع الأعمار مرحب بها' },
        { icon: Globe, value: '🇮🇶 🇸🇪', label: 'جسر بين الثقافات' },
        { icon: Calendar, value: 'سنوي', label: 'تقليد مستمر' }
      ]
    },
    sv: {
      stats: [
        { icon: Award, value: '2025', label: 'Första officiella priset' },
        { icon: Users, value: '∞', label: 'Alla åldrar välkomna' },
        { icon: Globe, value: '🇮🇶 🇸🇪', label: 'Bro mellan kulturer' },
        { icon: Calendar, value: 'Årligt', label: 'Pågående tradition' }
      ]
    },
    en: {
      stats: [
        { icon: Award, value: '2025', label: 'First Official Award' },
        { icon: Users, value: '∞', label: 'All Ages Welcome' },
        { icon: Globe, value: '🇮🇶 🇸🇪', label: 'Bridge Between Cultures' },
        { icon: Calendar, value: 'Annual', label: 'Ongoing Tradition' }
      ]
    }
  };

  const t = content[language];

  return (
    <section className="py-12 md:py-16 bg-primary-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {t.stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-full bg-accent-gold/20 flex items-center justify-center group-hover:bg-accent-gold/30 transition-colors">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-accent-gold" />
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-white/70 px-2">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
