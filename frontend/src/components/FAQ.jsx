import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from './ui/accordion';
import { HelpCircle } from 'lucide-react';

const FAQ = () => {
  const { language } = useLanguage();

  const content = {
    ar: {
      title: 'الأسئلة الشائعة',
      subtitle: 'إجابات على أكثر الأسئلة شيوعاً حول الجائزة',
      questions: [
        {
          q: 'من يمكنه الترشّح للجائزة؟',
          a: 'يمكن لأي شخص من أصول عراقية ومقيم في السويد الترشّح، بشرط أن يكون قد حصل على تكريم من جهة سويدية رسمية. الجائزة متاحة لجميع الفئات العمرية.'
        },
        {
          q: 'هل يمكنني ترشيح شخص آخر؟',
          a: 'نعم، يمكنك ترشيح نفسك أو ترشيح شخص آخر ترى أنه يستحق هذا التكريم. يجب تعبئة معلومات المرشّح ومعلومات مقدّم الترشيح.'
        },
        {
          q: 'ما هي المجالات التي تشملها الجائزة؟',
          a: 'تشمل الجائزة جميع المجالات بما في ذلك العلوم، الفنون، الأعمال، الخدمة المجتمعية، الرياضة، والابتكار. أي إنجاز متميز حظي بتقدير سويدي رسمي مؤهل.'
        },
        {
          q: 'كيف يتم اختيار الفائزين؟',
          a: 'تقوم لجنة تحكيم مستقلة مكونة من شخصيات عراقية بارزة بمراجعة جميع الترشيحات. يتم الاختيار بناءً على معايير التميز والإبداع والأثر الإيجابي في المجتمع.'
        },
        {
          q: 'ما هي الجائزة التي يحصل عليها الفائزون؟',
          a: 'يحصل الفائزون على شهادة تكريم رسمية من سعادة السفير العراقي في السويد، بالإضافة إلى التكريم في حفل رسمي بحضور شخصيات بارزة.'
        },
        {
          q: 'متى يُعلن عن الفائزين؟',
          a: 'سيتم الإعلان عن الفائزين في حفل رسمي. تابعونا للحصول على تفاصيل الموعد والمكان.'
        }
      ]
    },
    sv: {
      title: 'Vanliga frågor',
      subtitle: 'Svar på de vanligaste frågorna om priset',
      questions: [
        {
          q: 'Vem kan nomineras till priset?',
          a: 'Alla med irakiskt ursprung som bor i Sverige kan nomineras, förutsatt att de har fått erkännande från en officiell svensk institution. Priset är öppet för alla åldersgrupper.'
        },
        {
          q: 'Kan jag nominera någon annan?',
          a: 'Ja, du kan nominera dig själv eller någon annan som du anser förtjänar detta erkännande. Både den nominerades och nominatörens information måste fyllas i.'
        },
        {
          q: 'Vilka områden täcker priset?',
          a: 'Priset täcker alla områden inklusive vetenskap, konst, näringsliv, samhällstjänst, sport och innovation. Alla enastående prestationer som har fått officiellt svenskt erkännande är kvalificerade.'
        },
        {
          q: 'Hur väljs vinnarna ut?',
          a: 'En oberoende jurykommitté bestående av framstående irakiska profiler granskar alla nomineringar. Urvalet baseras på kriterier för excellens, kreativitet och positiv samhällspåverkan.'
        },
        {
          q: 'Vad får vinnarna?',
          a: 'Vinnarna får ett officiellt erkännande från Hans Excellens, Iraks ambassadör i Sverige, samt hedras vid en officiell ceremoni med framstående gäster.'
        },
        {
          q: 'När tillkännages vinnarna?',
          a: 'Vinnarna tillkännages vid en officiell ceremoni. Följ oss för detaljer om datum och plats.'
        }
      ]
    },
    en: {
      title: 'Frequently Asked Questions',
      subtitle: 'Answers to the most common questions about the award',
      questions: [
        {
          q: 'Who can be nominated for the award?',
          a: 'Anyone of Iraqi origin residing in Sweden can be nominated, provided they have received recognition from an official Swedish institution. The award is open to all age groups.'
        },
        {
          q: 'Can I nominate someone else?',
          a: 'Yes, you can nominate yourself or someone else you consider worthy of this recognition. Both the nominee\'s and nominator\'s information must be filled in.'
        },
        {
          q: 'What fields does the award cover?',
          a: 'The award covers all fields including science, arts, business, community service, sports, and innovation. Any outstanding achievement that has received official Swedish recognition is eligible.'
        },
        {
          q: 'How are winners selected?',
          a: 'An independent jury committee consisting of prominent Iraqi figures reviews all nominations. Selection is based on criteria of excellence, creativity, and positive societal impact.'
        },
        {
          q: 'What do winners receive?',
          a: 'Winners receive an official certificate of recognition from His Excellency, the Iraqi Ambassador to Sweden, and are honored at an official ceremony with distinguished guests.'
        },
        {
          q: 'When are winners announced?',
          a: 'Winners will be announced at an official ceremony. Follow us for details on the date and venue.'
        }
      ]
    }
  };

  const t = content[language];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent-gold/20 flex items-center justify-center">
            <HelpCircle className="w-7 h-7 text-accent-gold" />
          </div>
          <h2 className={`text-3xl md:text-4xl font-bold text-text-dark mb-4 ${
            language === 'ar' ? 'font-arabic' : ''
          }`}>
            {t.title}
          </h2>
          <p className="text-lg text-text-muted">{t.subtitle}</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3 md:space-y-4">
          {t.questions.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-bg-section border border-border-light rounded-lg px-4 md:px-6 data-[state=open]:border-accent-gold/50 transition-colors"
            >
              <AccordionTrigger className={`text-left hover:no-underline py-4 md:py-5 ${
                language === 'ar' ? 'text-right font-arabic' : ''
              }`}>
                <span className="font-semibold text-text-dark text-sm md:text-base pr-2">{item.q}</span>
              </AccordionTrigger>
              <AccordionContent className={`pb-4 md:pb-5 text-text-body leading-relaxed text-sm md:text-base ${
                language === 'ar' ? 'text-right' : ''
              }`}>
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
