import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Mail, Settings } from 'lucide-react';

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const awardLogo = "https://customer-assets.emergentagent.com/job_iraqicreative/artifacts/pbmg11t9_image.png";

  const partnerText = {
    ar: 'بالتعاون مع',
    sv: 'I samarbete med',
    en: 'In collaboration with'
  };

  return (
    <footer className="bg-gradient-to-b from-primary-dark to-black text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Embassy Info */}
          <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className="flex items-center gap-3 mb-4 justify-start">
              <img 
                src={awardLogo} 
                alt="Iraq Entrepreneur Awards Sweden" 
                className="h-20 w-auto object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-accent-gold">{t.footer.embassy}</h3>
            <div className="flex items-center gap-2 text-white/70">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{t.footer.location}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <h3 className="text-lg font-semibold mb-4 text-accent-gold">
              {language === 'ar' ? 'روابط سريعة' : language === 'sv' ? 'Snabblänkar' : 'Quick Links'}
            </h3>
            <ul className="space-y-2 text-white/70">
              <li>
                <a href="#about" className="hover:text-accent-gold transition-colors">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#eligibility" className="hover:text-accent-gold transition-colors">
                  {t.nav.nominate}
                </a>
              </li>
              <li>
                <a href="mailto:info@keeada.org" className="hover:text-accent-gold transition-colors">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <h3 className="text-lg font-semibold mb-4 text-accent-gold">
              {language === 'ar' ? 'تواصل معنا' : language === 'sv' ? 'Kontakta oss' : 'Contact Us'}
            </h3>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-accent-gold" />
                <span>info@keeada.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Flags decoration */}
        <div className="flex justify-center gap-4 mb-6">
          <span className="text-2xl">🇮🇶</span>
          <span className="text-accent-gold">★</span>
          <span className="text-2xl">🇸🇪</span>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {currentYear} {t.footer.embassy}. {t.footer.rights}
            </p>
            
            {/* Collaboration Partner */}
            <div className="flex items-center gap-3">
              <span className="text-white/50 text-sm">{partnerText[language]}</span>
              <img 
                src="https://customer-assets.emergentagent.com/job_iraqicreative/artifacts/1zs0ccph_keeada%20logo%20Icon%20white.png" 
                alt="Keeada Foundation" 
                className="h-6 w-auto opacity-60 hover:opacity-80 transition-opacity"
              />
              <span className="text-white/50 text-sm">Keeada Foundation</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-white/60 text-sm">
                IEIA 2025
              </span>
              {/* Admin Link */}
              <a 
                href="/admin" 
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                title={language === 'ar' ? 'لوحة الإدارة' : language === 'sv' ? 'Admin' : 'Admin Panel'}
              >
                <Settings className="w-4 h-4 text-white/60 hover:text-white transition-colors" />
              </a>
            </div>
          </div>
          
          {/* Official Tagline */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <p className="text-white/50 text-xs italic">
              {t.footer.tagline || "An Official Award of the Embassy of the Republic of Iraq – Organized with Professional Integrity by Keeada"}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
