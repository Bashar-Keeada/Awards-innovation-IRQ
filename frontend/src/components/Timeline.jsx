import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, Clock } from 'lucide-react';

const Timeline = () => {
  const { language } = useLanguage();

  const content = {
    ar: {
      title: 'التواريخ المهمة',
      subtitle: 'جدول زمني لجائزة الإبداع 2025',
      events: [
        {
          date: '1 أبريل 2025',
          title: 'فتح باب الترشيحات',
          description: 'استقبال طلبات الترشيح',
          status: 'active'
        },
        {
          date: '25 أبريل 2025',
          title: 'تقييم لجنة التحكيم',
          description: 'مراجعة وتقييم جميع الترشيحات',
          status: 'upcoming'
        },
        {
          date: '22 مايو 2025',
          title: 'حفل التكريم',
          description: 'الإعلان عن الفائزين وتكريمهم',
          status: 'upcoming'
        }
      ]
    },
    sv: {
      title: 'Viktiga datum',
      subtitle: 'Tidslinje för Innovationspriset 2025',
      events: [
        {
          date: '1 april 2025',
          title: 'Nomineringar öppna',
          description: 'Skicka in nomineringar',
          status: 'active'
        },
        {
          date: '25 april 2025',
          title: 'Jurygranskning',
          description: 'Granskning och utvärdering av alla nomineringar',
          status: 'upcoming'
        },
        {
          date: '22 maj 2025',
          title: 'Prisceremoni',
          description: 'Prisutdelningen',
          status: 'upcoming'
        }
      ]
    },
    en: {
      title: 'Important Dates',
      subtitle: 'Timeline for Innovation Award 2025',
      events: [
        {
          date: 'April 1, 2025',
          title: 'Nominations Open',
          description: 'Submit nominations',
          status: 'active'
        },
        {
          date: 'April 25, 2025',
          title: 'Jury Review',
          description: 'Review and evaluation of all nominations',
          status: 'upcoming'
        },
        {
          date: 'May 22, 2025',
          title: 'Award Ceremony',
          description: 'Announcement and honoring of winners',
          status: 'upcoming'
        }
      ]
    }
  };

  const t = content[language];

  return (
    <section className="py-20 md:py-28 bg-bg-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary-blue/10 flex items-center justify-center">
            <Calendar className="w-7 h-7 text-primary-blue" />
          </div>
          <h2 className={`text-3xl md:text-4xl font-bold text-text-dark mb-4 ${
            language === 'ar' ? 'font-arabic' : ''
          }`}>
            {t.title}
          </h2>
          <p className="text-lg text-text-muted">{t.subtitle}</p>
        </div>

        <div className="relative">
          {/* Timeline line - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-accent-gold via-primary-blue to-accent-green rounded-full" />
          
          {/* Mobile timeline line */}
          <div className="md:hidden absolute left-6 top-0 h-full w-1 bg-gradient-to-b from-accent-gold via-primary-blue to-accent-green rounded-full" />

          <div className="space-y-8 md:space-y-12">
            {t.events.map((event, index) => (
              <div 
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-row`}
              >
                {/* Mobile: dot on left */}
                <div className="md:hidden absolute left-6 transform -translate-x-1/2 z-10">
                  <div className={`w-5 h-5 rounded-full border-4 ${
                    event.status === 'active'
                      ? 'bg-accent-gold border-white shadow-lg shadow-accent-gold/50'
                      : 'bg-white border-primary-blue/30'
                  }`} />
                </div>

                {/* Mobile content */}
                <div className="md:hidden w-full pl-12 pr-4">
                  <div className={`bg-white rounded-xl p-4 shadow-sm border ${
                    event.status === 'active' 
                      ? 'border-accent-gold shadow-accent-gold/20' 
                      : 'border-border-light'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className={`w-4 h-4 ${
                        event.status === 'active' ? 'text-accent-gold' : 'text-text-muted'
                      }`} />
                      <span className={`text-sm font-medium ${
                        event.status === 'active' ? 'text-accent-gold' : 'text-text-muted'
                      }`}>
                        {event.date}
                      </span>
                    </div>
                    <h3 className={`text-base font-semibold text-text-dark mb-1 ${
                      language === 'ar' ? 'font-arabic' : ''
                    }`}>
                      {event.title}
                    </h3>
                    <p className="text-sm text-text-muted">{event.description}</p>
                  </div>
                </div>

                {/* Desktop content */}
                <div className={`hidden md:block w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className={`bg-white rounded-xl p-6 shadow-sm border ${
                    event.status === 'active' 
                      ? 'border-accent-gold shadow-accent-gold/20' 
                      : 'border-border-light'
                  } hover:shadow-md transition-shadow`}>
                    <div className={`flex items-center gap-2 mb-2 ${
                      index % 2 === 0 ? 'justify-end' : 'justify-start'
                    }`}>
                      <Clock className={`w-4 h-4 ${
                        event.status === 'active' ? 'text-accent-gold' : 'text-text-muted'
                      }`} />
                      <span className={`text-sm font-medium ${
                        event.status === 'active' ? 'text-accent-gold' : 'text-text-muted'
                      }`}>
                        {event.date}
                      </span>
                    </div>
                    <h3 className={`text-lg font-semibold text-text-dark mb-1 ${
                      language === 'ar' ? 'font-arabic' : ''
                    }`}>
                      {event.title}
                    </h3>
                    <p className="text-sm text-text-muted">{event.description}</p>
                  </div>
                </div>

                {/* Desktop center dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`w-6 h-6 rounded-full border-4 ${
                    event.status === 'active'
                      ? 'bg-accent-gold border-white shadow-lg shadow-accent-gold/50'
                      : 'bg-white border-primary-blue/30'
                  }`} />
                </div>

                {/* Desktop empty space for alternating layout */}
                <div className="hidden md:block w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
