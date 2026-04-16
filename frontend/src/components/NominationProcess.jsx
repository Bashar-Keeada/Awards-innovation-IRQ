import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ClipboardList, Users, Trophy, Sparkles } from 'lucide-react';

const NominationProcess = () => {
  const { language } = useLanguage();

  const content = {
    ar: {
      title: 'كيف تعمل عملية الترشيح؟',
      subtitle: 'خطوات بسيطة للمشاركة في جائزة الإبداع',
      steps: [
        {
          number: '01',
          title: 'قدّم ترشيحك',
          description: 'املأ استمارة الترشيح بالمعلومات المطلوبة عن المرشّح وإنجازاته'
        },
        {
          number: '02',
          title: 'مراجعة لجنة التحكيم',
          description: 'تقوم لجنة التحكيم المستقلة بمراجعة وتقييم جميع الترشيحات'
        },
        {
          number: '03',
          title: 'اختيار الفائزين',
          description: 'يتم اختيار الفائزين بناءً على معايير التميز والإبداع والأثر المجتمعي'
        },
        {
          number: '04',
          title: 'حفل التكريم',
          description: 'يُكرّم الفائزون في حفل رسمي بحضور سعادة السفير والشخصيات البارزة'
        }
      ]
    },
    sv: {
      title: 'Hur fungerar nomineringsprocessen?',
      subtitle: 'Enkla steg för att delta i Innovationspriset',
      steps: [
        {
          number: '01',
          title: 'Skicka din nominering',
          description: 'Fyll i nomineringsformuläret med information om den nominerade och deras prestationer'
        },
        {
          number: '02',
          title: 'Jurygranskning',
          description: 'Den oberoende jurykommittén granskar och utvärderar alla nomineringar'
        },
        {
          number: '03',
          title: 'Urval av vinnare',
          description: 'Vinnare väljs baserat på kriterier för excellens, kreativitet och samhällspåverkan'
        },
        {
          number: '04',
          title: 'Prisceremoni',
          description: 'Vinnarna hedras vid en officiell ceremoni med ambassadören och framstående gäster'
        }
      ]
    },
    en: {
      title: 'How Does the Nomination Process Work?',
      subtitle: 'Simple steps to participate in the Innovation Award',
      steps: [
        {
          number: '01',
          title: 'Submit Your Nomination',
          description: 'Fill out the nomination form with information about the nominee and their achievements'
        },
        {
          number: '02',
          title: 'Jury Review',
          description: 'The independent jury committee reviews and evaluates all nominations'
        },
        {
          number: '03',
          title: 'Winner Selection',
          description: 'Winners are selected based on criteria of excellence, creativity, and societal impact'
        },
        {
          number: '04',
          title: 'Award Ceremony',
          description: 'Winners are honored at an official ceremony with the Ambassador and distinguished guests'
        }
      ]
    }
  };

  const icons = [ClipboardList, Users, Trophy, Sparkles];
  const t = content[language];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-bg-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold text-text-dark mb-4 ${
            language === 'ar' ? 'font-arabic' : ''
          }`}>
            {t.title}
          </h2>
          <p className="text-lg text-text-muted">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {t.steps.map((step, index) => {
            const Icon = icons[index];
            return (
              <div 
                key={index}
                className="relative group"
              >
                {/* Connector line - only on large screens */}
                {index < t.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-accent-gold to-accent-gold/30" />
                )}
                
                <div className="relative bg-white rounded-xl p-5 md:p-6 shadow-sm border border-border-light hover:shadow-lg hover:border-accent-gold/30 transition-all duration-300 group-hover:-translate-y-1">
                  {/* Step number */}
                  <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 w-7 h-7 md:w-8 md:h-8 bg-accent-gold text-primary-dark rounded-full flex items-center justify-center text-xs md:text-sm font-bold">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 mt-3 md:mt-4 rounded-full bg-gradient-to-br from-primary-blue/10 to-accent-gold/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary-blue" />
                  </div>
                  
                  {/* Content */}
                  <h3 className={`text-base md:text-lg font-semibold text-text-dark mb-2 text-center ${
                    language === 'ar' ? 'font-arabic' : ''
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-xs md:text-sm text-text-muted text-center ${
                    language === 'ar' ? 'leading-relaxed' : ''
                  }`}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NominationProcess;
