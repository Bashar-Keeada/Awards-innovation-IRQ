import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { 
  Trophy, 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  FileText, 
  Link as LinkIcon, 
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const NominationForm = () => {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  
  const [formData, setFormData] = useState({
    nomineeName: '',
    nomineeNameArabic: '',
    location: '',
    email: '',
    phone: '',
    achievementDescription: '',
    linksOrMedia: '',
    nominatorName: '',
    nominatorEmail: ''
  });

  const labels = {
    ar: {
      title: 'استمارة الترشيح',
      subtitle: 'رشّح نفسك أو شخصاً تراه أهلاً لهذا التكريم',
      badge: 'نموذج الترشيح',
      nomineeSection: 'معلومات المرشّح',
      nomineeName: 'الاسم الكامل للمرشّح (بالسويدية)',
      nomineeNameArabic: 'الاسم الكامل للمرشّح (بالعربية)',
      location: 'مكان الإقامة في السويد (المدينة أو الكومون)',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      achievementDescription: 'وصف الإنجاز والتكريم (حتى 500 كلمة)',
      achievementPlaceholder: 'يرجى وصف الإنجاز بالتفصيل، مع ذكر الجهة السويدية التي منحت التكريم...',
      linksOrMedia: 'روابط أو مرفقات',
      linksPlaceholder: 'أضف روابط لمقالات، صور، أو أي وثائق داعمة...',
      nominatorSection: 'معلومات مقدّم الترشيح',
      nominatorName: 'اسم مقدّم الترشيح',
      nominatorEmail: 'البريد الإلكتروني لمقدّم الترشيح',
      submit: 'إرسال الترشيح',
      submitting: 'جارٍ الإرسال...',
      successTitle: 'تم إرسال الترشيح بنجاح!',
      successMessage: 'شكراً لمشاركتكم. سيتم مراجعة الترشيح من قبل لجنة التحكيم.',
      errorTitle: 'حدث خطأ',
      errorMessage: 'يرجى المحاولة مرة أخرى لاحقاً.',
      newNomination: 'ترشيح جديد',
      required: '(مطلوب)',
      optional: ''
    },
    sv: {
      title: 'Nomineringsformulär',
      subtitle: 'Nominera dig själv eller någon du anser värdig detta erkännande',
      badge: 'Nomineringsformulär',
      nomineeSection: 'Information om den nominerade',
      nomineeName: 'Fullständigt namn (på svenska)',
      nomineeNameArabic: 'Fullständigt namn (på arabiska)',
      location: 'Bostadsort i Sverige (stad eller kommun)',
      email: 'E-postadress',
      phone: 'Telefonnummer',
      achievementDescription: 'Beskrivning av motivering och erkännande (max 500 ord)',
      achievementPlaceholder: 'Beskriv varför personen förtjänar att få utmärkelsen. Ange gärna från vilken svensk stiftelse, myndighet, organisation eller förening personen har mottagit sitt diplom eller utmärkelse.',
      linksOrMedia: 'Länkar eller bilagor',
      linksPlaceholder: 'Lägg till länkar till artiklar, bilder eller andra stödjande dokument...',
      nominatorSection: 'Information om den som nominerar',
      nominatorName: 'Ditt namn',
      nominatorEmail: 'Din e-postadress',
      submit: 'Skicka nominering',
      submitting: 'Skickar...',
      successTitle: 'Nomineringen har skickats!',
      successMessage: 'Tack för ditt deltagande. Nomineringen kommer att granskas av jurykommittén.',
      errorTitle: 'Ett fel uppstod',
      errorMessage: 'Vänligen försök igen senare.',
      newNomination: 'Ny nominering',
      required: '(obligatorisk)',
      optional: ''
    },
    en: {
      title: 'Nomination Form',
      subtitle: 'Nominate yourself or someone you consider worthy of this recognition',
      badge: 'Nomination Form',
      nomineeSection: 'Nominee Information',
      nomineeName: 'Full name (in Swedish)',
      nomineeNameArabic: 'Full name (in Arabic)',
      location: 'Location in Sweden (city or municipality)',
      email: 'Email address',
      phone: 'Phone number',
      achievementDescription: 'Description of achievement and recognition (max 500 words)',
      achievementPlaceholder: 'Please describe the achievement in detail, including which Swedish institution granted the recognition...',
      linksOrMedia: 'Links or attachments',
      linksPlaceholder: 'Add links to articles, images, or any supporting documents...',
      nominatorSection: 'Nominator Information',
      nominatorName: 'Your name',
      nominatorEmail: 'Your email address',
      submit: 'Submit Nomination',
      submitting: 'Submitting...',
      successTitle: 'Nomination submitted successfully!',
      successMessage: 'Thank you for your participation. The nomination will be reviewed by the jury committee.',
      errorTitle: 'An error occurred',
      errorMessage: 'Please try again later.',
      newNomination: 'New Nomination',
      required: '(required)',
      optional: ''
    }
  };

  const t = labels[language];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/nominations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          nomineeName: '',
          nomineeNameArabic: '',
          location: '',
          email: '',
          phone: '',
          achievementDescription: '',
          linksOrMedia: '',
          nominatorName: '',
          nominatorEmail: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitStatus(null);
  };

  if (submitStatus === 'success') {
    return (
      <section id="nomination-form" className="py-20 md:py-28 bg-bg-section">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg border border-border-light shadow-sm p-8 md:p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-green/10 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-accent-green" />
            </div>
            <h2 className="text-2xl font-bold text-text-dark mb-4">{t.successTitle}</h2>
            <p className="text-text-body mb-8">{t.successMessage}</p>
            <Button onClick={resetForm} className="bg-primary-blue hover:bg-primary-dark">
              {t.newNomination}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="nomination-form" className="py-20 md:py-28 bg-bg-section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge
            variant="secondary"
            className="mb-4 px-4 py-2 text-sm font-medium bg-primary-blue/10 text-primary-blue border-none"
          >
            <Trophy className="w-4 h-4 mr-2 inline" />
            {t.badge}
          </Badge>
          <h2 className={`text-3xl md:text-4xl font-bold text-text-dark mb-4 ${
            language === 'ar' ? 'font-arabic' : ''
          }`}>
            {t.title}
          </h2>
          <p className="text-lg text-text-muted">{t.subtitle}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-border-light shadow-sm p-6 md:p-8">
          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-800">{t.errorTitle}</p>
                <p className="text-sm text-red-600">{t.errorMessage}</p>
              </div>
            </div>
          )}

          {/* Nominee Section */}
          <div className="mb-8">
            <h3 className={`text-lg font-semibold text-text-dark mb-6 pb-2 border-b border-border-light flex items-center gap-2 ${
              language === 'ar' ? 'flex-row-reverse' : ''
            }`}>
              <User className="w-5 h-5 text-primary-blue" />
              {t.nomineeSection}
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nomineeName" className="flex items-center gap-1">
                  {t.nomineeName}
                  <span className="text-xs text-text-muted">{t.required}</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input
                    id="nomineeName"
                    name="nomineeName"
                    value={formData.nomineeName}
                    onChange={handleChange}
                    required
                    className="pl-10"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nomineeNameArabic" className="flex items-center gap-1">
                  {t.nomineeNameArabic}
                  <span className="text-xs text-text-muted">{t.required}</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input
                    id="nomineeNameArabic"
                    name="nomineeNameArabic"
                    value={formData.nomineeNameArabic}
                    onChange={handleChange}
                    required
                    className="pl-10"
                    dir="rtl"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="location" className="flex items-center gap-1">
                {t.location}
                <span className="text-xs text-text-muted">{t.required}</span>
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-1">
                  {t.email}
                  <span className="text-xs text-text-muted">{t.required}</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-10"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-1">
                  {t.phone}
                  <span className="text-xs text-text-muted">{t.required}</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="pl-10"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="achievementDescription" className="flex items-center gap-1">
                {t.achievementDescription}
                <span className="text-xs text-text-muted">{t.required}</span>
              </Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                <Textarea
                  id="achievementDescription"
                  name="achievementDescription"
                  value={formData.achievementDescription}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="pl-10 min-h-[150px]"
                  placeholder={t.achievementPlaceholder}
                />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="linksOrMedia" className="flex items-center gap-1">
                {t.linksOrMedia}
                <span className="text-xs text-text-muted">{t.required}</span>
              </Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                <Textarea
                  id="linksOrMedia"
                  name="linksOrMedia"
                  value={formData.linksOrMedia}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="pl-10"
                  placeholder={t.linksPlaceholder}
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          {/* Nominator Section */}
          <div className="mb-8">
            <h3 className={`text-lg font-semibold text-text-dark mb-6 pb-2 border-b border-border-light flex items-center gap-2 ${
              language === 'ar' ? 'flex-row-reverse' : ''
            }`}>
              <Send className="w-5 h-5 text-accent-green" />
              {t.nominatorSection}
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nominatorName" className="flex items-center gap-1">
                  {t.nominatorName}
                  <span className="text-xs text-text-muted">{t.required}</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input
                    id="nominatorName"
                    name="nominatorName"
                    value={formData.nominatorName}
                    onChange={handleChange}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nominatorEmail" className="flex items-center gap-1">
                  {t.nominatorEmail}
                  <span className="text-xs text-text-muted">{t.required}</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input
                    id="nominatorEmail"
                    name="nominatorEmail"
                    type="email"
                    value={formData.nominatorEmail}
                    onChange={handleChange}
                    required
                    className="pl-10"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 text-lg font-semibold bg-primary-blue hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                {t.submitting}
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                {t.submit}
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default NominationForm;
