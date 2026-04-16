import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Badge } from './ui/badge';
import { 
  Lightbulb, 
  Palette, 
  HeartHandshake, 
  GraduationCap, 
  Briefcase, 
  Medal 
} from 'lucide-react';

const Categories = () => {
  const { language } = useLanguage();

  const content = {
    ar: {
      title: 'مجالات الجائزة',
      subtitle: 'نحتفي بالتميز في جميع المجالات',
      categories: [
        {
          icon: GraduationCap,
          title: 'العلوم والأكاديميا',
          description: 'البحث العلمي، الاكتشافات، والإنجازات الأكاديمية'
        },
        {
          icon: Palette,
          title: 'الفنون والثقافة',
          description: 'الموسيقى، الأدب، الفنون البصرية، والتراث الثقافي'
        },
        {
          icon: Briefcase,
          title: 'ريادة الأعمال',
          description: 'الابتكار في الأعمال والمشاريع الناجحة'
        },
        {
          icon: HeartHandshake,
          title: 'الخدمة المجتمعية',
          description: 'العمل التطوعي والمبادرات الإنسانية'
        },
        {
          icon: Medal,
          title: 'الرياضة',
          description: 'الإنجازات الرياضية والتميز في المسابقات'
        },
        {
          icon: Lightbulb,
          title: 'الابتكار والتقنية',
          description: 'الاختراعات والحلول التقنية المبتكرة'
        }
      ]
    },
    sv: {
      title: 'Priskategorier',
      subtitle: 'Vi firar excellens inom alla områden',
      categories: [
        {
          icon: GraduationCap,
          title: 'Vetenskap & Akademi',
          description: 'Forskning, upptäckter och akademiska prestationer'
        },
        {
          icon: Palette,
          title: 'Konst & Kultur',
          description: 'Musik, litteratur, visuell konst och kulturarv'
        },
        {
          icon: Briefcase,
          title: 'Entreprenörskap',
          description: 'Affärsinnovation och framgångsrika företag'
        },
        {
          icon: HeartHandshake,
          title: 'Samhällstjänst',
          description: 'Volontärarbete och humanitära initiativ'
        },
        {
          icon: Medal,
          title: 'Sport',
          description: 'Idrottsprestationer och tävlingsexcellens'
        },
        {
          icon: Lightbulb,
          title: 'Innovation & Teknik',
          description: 'Uppfinningar och innovativa tekniska lösningar'
        }
      ]
    },
    en: {
      title: 'Award Categories',
      subtitle: 'We celebrate excellence across all fields',
      categories: [
        {
          icon: GraduationCap,
          title: 'Science & Academia',
          description: 'Research, discoveries, and academic achievements'
        },
        {
          icon: Palette,
          title: 'Arts & Culture',
          description: 'Music, literature, visual arts, and cultural heritage'
        },
        {
          icon: Briefcase,
          title: 'Entrepreneurship',
          description: 'Business innovation and successful ventures'
        },
        {
          icon: HeartHandshake,
          title: 'Community Service',
          description: 'Volunteer work and humanitarian initiatives'
        },
        {
          icon: Medal,
          title: 'Sports',
          description: 'Athletic achievements and competition excellence'
        },
        {
          icon: Lightbulb,
          title: 'Innovation & Technology',
          description: 'Inventions and innovative technical solutions'
        }
      ]
    }
  };

  const t = content[language];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent-green/10 text-accent-green border-none">
            <Medal className="w-4 h-4 mr-2" />
            {language === 'ar' ? 'فئات متعددة' : language === 'sv' ? 'Flera kategorier' : 'Multiple Categories'}
          </Badge>
          <h2 className={`text-3xl md:text-4xl font-bold text-text-dark mb-4 ${
            language === 'ar' ? 'font-arabic' : ''
          }`}>
            {t.title}
          </h2>
          <p className="text-lg text-text-muted">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div 
                key={index}
                className="group bg-bg-section rounded-xl p-6 border border-border-light hover:border-accent-gold/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-primary-blue/10 to-accent-gold/10 flex items-center justify-center group-hover:from-primary-blue/20 group-hover:to-accent-gold/20 transition-colors">
                  <Icon className="w-7 h-7 text-primary-blue" />
                </div>
                <h3 className={`text-lg font-semibold text-text-dark mb-2 ${
                  language === 'ar' ? 'font-arabic' : ''
                }`}>
                  {category.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {category.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
