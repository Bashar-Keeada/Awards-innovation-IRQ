import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, FileText, Download, Globe, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

const InternalDocument = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeLanguage, setActiveLanguage] = useState('both');

  // Set meta tags to prevent indexing
  useEffect(() => {
    // Add noindex meta tag
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex, nofollow';
    document.head.appendChild(metaRobots);

    // Update page title
    document.title = 'Internal Document - Restricted Access';

    return () => {
      // Cleanup meta tag on unmount
      document.head.removeChild(metaRobots);
    };
  }, []);

  // Redirect if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
          <Lock className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Restricted</h1>
          <p className="text-gray-600 mb-6">This document is for authorized personnel only.</p>
          <Button onClick={() => navigate('/admin')} className="bg-primary-dark hover:bg-primary-dark/90">
            Login to Access
          </Button>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Control Bar - Hidden in print */}
      <div className="bg-primary-dark text-white py-4 px-6 print:hidden sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/admin/dashboard')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-2 text-red-300">
              <Lock className="w-4 h-4" />
              <span className="text-sm font-medium">INTERNAL DOCUMENT – RESTRICTED ACCESS</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setActiveLanguage('ar')}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  activeLanguage === 'ar' ? 'bg-white text-primary-dark' : 'text-white hover:bg-white/10'
                }`}
              >
                العربية
              </button>
              <button
                onClick={() => setActiveLanguage('en')}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  activeLanguage === 'en' ? 'bg-white text-primary-dark' : 'text-white hover:bg-white/10'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setActiveLanguage('both')}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  activeLanguage === 'both' ? 'bg-white text-primary-dark' : 'text-white hover:bg-white/10'
                }`}
              >
                Both
              </button>
            </div>
            <Button onClick={handlePrint} className="bg-accent-gold text-primary-dark hover:bg-accent-gold/90">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Document Content */}
      <div className="max-w-5xl mx-auto py-8 px-4 print:py-0 print:px-0 print:max-w-none">
        
        {/* Security Notice - Hidden in print */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 print:hidden">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-red-600" />
            <div>
              <p className="font-semibold text-red-800">Internal Strategic Document – Not for Public Access</p>
              <p className="text-sm text-red-600">This document is restricted to authorized embassy and administrative personnel only. External sharing is prohibited.</p>
            </div>
          </div>
        </div>

        {/* Arabic Version */}
        {(activeLanguage === 'ar' || activeLanguage === 'both') && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8 print:shadow-none print:rounded-none print:mb-0 print:p-12" dir="rtl">
            
            {/* Arabic Header */}
            <div className="text-center border-b-2 border-primary-dark pb-6 mb-8">
              <p className="text-sm text-gray-500 mb-2">وثيقة استراتيجية داخلية – للاستخدام الرسمي فقط</p>
              <h1 className="text-2xl font-bold text-primary-dark mb-2">سفارة جمهورية العراق</h1>
              <p className="text-lg text-gray-600 mb-4">مملكة السويد – ستوكهولم</p>
              <div className="w-20 h-0.5 bg-accent-gold mx-auto mb-4"></div>
              <h2 className="text-xl font-bold text-primary-dark">جائزة التميز والابتكار الدولية</h2>
              <p className="text-gray-600 mt-2">مبادرة رسمية من سفارة جمهورية العراق</p>
            </div>

            {/* Section 1: Vision */}
            <section className="mb-8">
              <h3 className="text-lg font-bold text-primary-dark mb-4 pb-2 border-b border-gray-200">
                أولاً: الرؤية والمنطلق الاستراتيجي
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify mb-4">
                تنطلق جائزة التميز والابتكار الدولية من رؤية استراتيجية تهدف إلى تعزيز مكانة العراق على الصعيد الدولي من خلال تسليط الضوء على النماذج الناجحة من أبناء الجالية العراقية في مملكة السويد. وتسعى هذه المبادرة إلى بناء جسور اقتصادية ومعرفية بين العراق والسويد، وتعزيز الروابط بين رواد الأعمال العراقيين في المهجر ووطنهم الأم.
              </p>
              <p className="text-gray-700 leading-relaxed text-justify">
                تمثل الجائزة تجسيداً للدبلوماسية الاقتصادية والثقافية، حيث تعمل على إبراز الصورة الإيجابية للعراق من خلال إنجازات مواطنيه الذين حققوا نجاحات متميزة في بيئة تنافسية عالمية، مع الحفاظ على هويتهم الوطنية واعتزازهم بجذورهم العراقية.
              </p>
            </section>

            {/* Section 2: Objectives */}
            <section className="mb-8">
              <h3 className="text-lg font-bold text-primary-dark mb-4 pb-2 border-b border-gray-200">
                ثانياً: أهداف الجائزة
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-accent-gold font-bold">١.</span>
                  <span>تكريم رواد الأعمال العراقيين المقيمين في السويد ممن يجسّدون قيم ريادة الأعمال المسؤولة والابتكار والاستدامة.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-gold font-bold">٢.</span>
                  <span>تعزيز الصورة الإيجابية للعراق دولياً من خلال إبراز نماذج ناجحة من أبناء الجالية.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-gold font-bold">٣.</span>
                  <span>تشجيع رواد الأعمال العراقيين على البقاء على تواصل مع وطنهم الأم والمساهمة في تنميته.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-gold font-bold">٤.</span>
                  <span>بناء جسور اقتصادية ومعرفية بين العراق والسويد من خلال شبكة من رواد الأعمال الناجحين.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-gold font-bold">٥.</span>
                  <span>إلهام الجيل الجديد من العراقيين للسعي نحو التميز مع الحفاظ على هويتهم الوطنية.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-gold font-bold">٦.</span>
                  <span>تحفيز الاستثمار والتعاون الاقتصادي بين رواد الأعمال في المهجر والقطاعات الاقتصادية في العراق.</span>
                </li>
              </ul>
            </section>

            {/* Section 3: Target Audience */}
            <section className="mb-8">
              <h3 className="text-lg font-bold text-primary-dark mb-4 pb-2 border-b border-gray-200">
                ثالثاً: الفئة المستهدفة
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify mb-4">
                تستهدف الجائزة رواد الأعمال العراقيين المقيمين في مملكة السويد والذين تتوفر فيهم المعايير التالية:
              </p>
              <ul className="space-y-2 text-gray-700 mr-4">
                <li>• أن يكون من أصول عراقية ومقيماً بشكل قانوني في السويد</li>
                <li>• أن يكون قد حقق نجاحاً مهنياً موثقاً في مجال ريادة الأعمال</li>
                <li>• أن تتسم أعماله بالابتكار والاستدامة والمسؤولية الاجتماعية</li>
                <li>• أن يحافظ على اعتزازه بهويته العراقية ويسهم في تعزيز صورة العراق إيجابياً</li>
                <li>• أن يكون حاصلاً على اعتراف أو تكريم من جهات سويدية رسمية أو معتمدة</li>
              </ul>
            </section>

            {/* Section 4: Categories */}
            <section className="mb-8">
              <h3 className="text-lg font-bold text-primary-dark mb-4 pb-2 border-b border-gray-200">
                رابعاً: فئات الجائزة
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-primary-dark mb-2">الابتكار والتقنية</h4>
                  <p className="text-sm text-gray-600">للمتميزين في مجالات التقنية والحلول الرقمية والذكاء الاصطناعي</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-primary-dark mb-2">الاستدامة والبيئة</h4>
                  <p className="text-sm text-gray-600">للمشاريع التي تسهم في التنمية المستدامة وحماية البيئة</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-primary-dark mb-2">المسؤولية الاجتماعية</h4>
                  <p className="text-sm text-gray-600">للمبادرات ذات الأثر الاجتماعي الإيجابي في المجتمع</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-primary-dark mb-2">القيادة الأخلاقية</h4>
                  <p className="text-sm text-gray-600">لرواد الأعمال الذين يجسّدون القيم الأخلاقية في ممارساتهم</p>
                </div>
              </div>
            </section>

            {/* Section 5: Expected Impact */}
            <section className="mb-8">
              <h3 className="text-lg font-bold text-primary-dark mb-4 pb-2 border-b border-gray-200">
                خامساً: الأثر المتوقع على المستوى الوطني والدولي
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">على المستوى الوطني:</h4>
                  <ul className="space-y-1 text-gray-700 mr-4">
                    <li>• تعزيز الانتماء الوطني لدى أبناء الجالية العراقية في الخارج</li>
                    <li>• فتح قنوات للاستثمار ونقل الخبرات إلى العراق</li>
                    <li>• بناء شبكة من السفراء غير الرسميين للعراق في المحافل الدولية</li>
                    <li>• تحفيز الكفاءات العراقية للمساهمة في مسيرة التنمية الوطنية</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">على المستوى الدولي:</h4>
                  <ul className="space-y-1 text-gray-700 mr-4">
                    <li>• تحسين الصورة الدولية للعراق من خلال قصص النجاح الحقيقية</li>
                    <li>• تعزيز العلاقات الثنائية بين العراق والسويد</li>
                    <li>• إبراز الإسهامات العراقية في الاقتصاد والمجتمع السويدي</li>
                    <li>• ترسيخ مكانة العراق كدولة منفتحة على التعاون الدولي</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6: Strategic Importance */}
            <section className="mb-8">
              <h3 className="text-lg font-bold text-primary-dark mb-4 pb-2 border-b border-gray-200">
                سادساً: الأهمية الاستراتيجية للعراق
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify mb-4">
                تكتسب هذه المبادرة أهمية استراتيجية بالغة للعراق من عدة جوانب:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-accent-gold font-bold">•</span>
                  <span><strong>الدبلوماسية الناعمة:</strong> توظيف نجاحات أبناء الجالية في تعزيز صورة العراق دولياً بعيداً عن الخطاب السياسي التقليدي.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-gold font-bold">•</span>
                  <span><strong>الجسور الاقتصادية:</strong> تحويل الكفاءات العراقية في الخارج إلى شركاء فاعلين في مسيرة التنمية الاقتصادية.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-gold font-bold">•</span>
                  <span><strong>نقل المعرفة:</strong> الاستفادة من الخبرات والتقنيات التي اكتسبها العراقيون في بيئات عمل متقدمة.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-gold font-bold">•</span>
                  <span><strong>الهوية الوطنية:</strong> ترسيخ الارتباط الوجداني والعملي بين أبناء المهجر ووطنهم الأم.</span>
                </li>
              </ul>
            </section>

            {/* Section 7: Sustainability */}
            <section className="mb-8">
              <h3 className="text-lg font-bold text-primary-dark mb-4 pb-2 border-b border-gray-200">
                سابعاً: الاستدامة ورؤية التوسع المستقبلي
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify mb-4">
                تم تصميم هذه المبادرة لتكون مستدامة وقابلة للتوسع على المستوى الدولي:
              </p>
              <ul className="space-y-2 text-gray-700 mr-4">
                <li>• إقامة الجائزة سنوياً بشكل منتظم لترسيخها كتقليد مؤسسي</li>
                <li>• إمكانية توسيع نطاق الجائزة لتشمل دولاً أخرى تتواجد فيها جاليات عراقية كبيرة</li>
                <li>• بناء قاعدة بيانات للكفاءات العراقية في الخارج</li>
                <li>• تأسيس شبكة من الفائزين السابقين للمساهمة في تطوير المبادرة</li>
                <li>• السعي للحصول على اعتراف رسمي من الجهات الحكومية العراقية المختصة</li>
              </ul>
            </section>

            {/* Section 8: Conclusion */}
            <section className="mb-8 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-primary-dark mb-4">
                ثامناً: الخلاصة الاستراتيجية
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                تمثل جائزة التميز والابتكار الدولية مبادرة استراتيجية رائدة تهدف إلى توظيف طاقات وإنجازات أبناء الجالية العراقية في الخارج لخدمة المصالح الوطنية العليا للعراق. ومن خلال هذه المبادرة، تسعى سفارة جمهورية العراق في ستوكهولم إلى بناء نموذج يمكن تكراره في سفارات أخرى، ليشكل منظومة متكاملة من الجسور التي تربط العراق بأبنائه المتميزين في مختلف أنحاء العالم.
              </p>
            </section>

            {/* Arabic Footer */}
            <div className="text-center pt-6 border-t-2 border-primary-dark">
              <p className="text-primary-dark font-bold">جائزة رسمية من سفارة جمهورية العراق</p>
              <p className="text-gray-600 text-sm mt-1">تنظيم مؤسسي بنزاهة من كيادا</p>
            </div>

            {/* Page Break for Print */}
            <div className="print:break-after-page"></div>
          </div>
        )}

        {/* English Version */}
        {(activeLanguage === 'en' || activeLanguage === 'both') && (
          <div className="bg-white rounded-lg shadow-lg p-8 print:shadow-none print:rounded-none print:p-12" dir="ltr">
            
            {/* English Header */}
            <div className="text-center border-b-2 border-primary-dark pb-6 mb-8">
              <p className="text-sm text-gray-500 mb-2">Internal Strategic Document – For Official Use Only</p>
              <h1 className="text-2xl font-bold text-primary-dark mb-2">Embassy of the Republic of Iraq</h1>
              <p className="text-lg text-gray-600 mb-4">Kingdom of Sweden – Stockholm</p>
              <div className="w-20 h-0.5 bg-accent-gold mx-auto mb-4"></div>
              <h2 className="text-xl font-bold text-primary-dark">International Excellence and Innovation Award</h2>
              <p className="text-gray-600 mt-2">An Official Embassy Initiative</p>
            </div>

            {/* Section 1: Vision */}
            <section className="mb-8">
              <h3 className="text-lg font-bold text-primary-dark mb-4 pb-2 border-b border-gray-200">
                I. Vision and Strategic Rationale
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify mb-4">
                The International Excellence and Innovation Award emerges from a strategic vision aimed at enhancing Iraq's standing on the international stage by highlighting successful models among the Iraqi diaspora in the Kingdom of Sweden. This initiative seeks to build economic and knowledge bridges between Iraq and Sweden, strengthening the bonds between Iraqi entrepreneurs abroad and their homeland.
              </p>
              <p className="text-gray-700 leading-relaxed text-justify">
                The Award represents an embodiment of economic and cultural diplomacy, working to project a positive image of Iraq through the achievements of its citizens who have attained distinguished success in a competitive global environment while maintaining their national identity and pride in their Iraqi heritage.
              </p>
            </section>

            {/* Section 2: Objectives */}
            <section className="mb-8">
              <h3 className="text-lg font-bold text-primary-dark mb-4 pb-2 border-b border-gray-200">
                II. Objectives of the Award
              </h3>
              <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                <li className="pl-2">To honor Iraqi entrepreneurs residing in Sweden who embody the values of responsible entrepreneurship, innovation, and sustainability.</li>
                <li className="pl-2">To enhance Iraq's positive international image by showcasing successful members of the diaspora community.</li>
                <li className="pl-2">To encourage Iraqi entrepreneurs to maintain connection with their homeland and contribute to its development.</li>
                <li className="pl-2">To build economic and knowledge bridges between Iraq and Sweden through a network of successful entrepreneurs.</li>
                <li className="pl-2">To inspire the new generation of Iraqis to pursue excellence while preserving their national identity.</li>
                <li className="pl-2">To stimulate investment and economic cooperation between diaspora entrepreneurs and economic sectors in Iraq.</li>
              </ol>
            </section>

            {/* Section 3: Target Audience */}
            <section className="mb-8">
              <h3 className="text-lg font-bold text-primary-dark mb-4 pb-2 border-b border-gray-200">
                III. Target Audience
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify mb-4">
                The Award targets Iraqi entrepreneurs residing in the Kingdom of Sweden who meet the following criteria:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li>• Must be of Iraqi origin and legally residing in Sweden</li>
                <li>• Must have achieved documented professional success in entrepreneurship</li>
                <li>• Their work must be characterized by innovation, sustainability, and social responsibility</li>
                <li>• Must maintain pride in their Iraqi identity and contribute to enhancing Iraq's positive image</li>
                <li>• Must have received recognition or honors from official or accredited Swedish institutions</li>
              </ul>
            </section>

            {/* Section 4: Categories */}
            <section className="mb-8">
              <h3 className="text-lg font-bold text-primary-dark mb-4 pb-2 border-b border-gray-200">
                IV. Award Categories
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-primary-dark mb-2">Innovation and Technology</h4>
                  <p className="text-sm text-gray-600">For those excelling in technology, digital solutions, and artificial intelligence</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-primary-dark mb-2">Sustainability and Environment</h4>
                  <p className="text-sm text-gray-600">For projects contributing to sustainable development and environmental protection</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-primary-dark mb-2">Social Responsibility</h4>
                  <p className="text-sm text-gray-600">For initiatives with positive social impact on the community</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-primary-dark mb-2">Ethical Leadership</h4>
                  <p className="text-sm text-gray-600">For entrepreneurs who embody ethical values in their practices</p>
                </div>
              </div>
            </section>

            {/* Section 5: Expected Impact */}
            <section className="mb-8">
              <h3 className="text-lg font-bold text-primary-dark mb-4 pb-2 border-b border-gray-200">
                V. Expected National and International Impact
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">At the National Level:</h4>
                  <ul className="space-y-1 text-gray-700 ml-4">
                    <li>• Strengthening national belonging among Iraqi diaspora members abroad</li>
                    <li>• Opening channels for investment and knowledge transfer to Iraq</li>
                    <li>• Building a network of unofficial ambassadors for Iraq in international forums</li>
                    <li>• Motivating Iraqi talents to contribute to the national development journey</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">At the International Level:</h4>
                  <ul className="space-y-1 text-gray-700 ml-4">
                    <li>• Improving Iraq's international image through authentic success stories</li>
                    <li>• Strengthening bilateral relations between Iraq and Sweden</li>
                    <li>• Highlighting Iraqi contributions to the Swedish economy and society</li>
                    <li>• Establishing Iraq's position as a nation open to international cooperation</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6: Strategic Importance */}
            <section className="mb-8">
              <h3 className="text-lg font-bold text-primary-dark mb-4 pb-2 border-b border-gray-200">
                VI. Strategic Importance for Iraq
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify mb-4">
                This initiative holds significant strategic importance for Iraq from multiple perspectives:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-accent-gold font-bold">•</span>
                  <span><strong>Soft Diplomacy:</strong> Leveraging diaspora success stories to enhance Iraq's image internationally, beyond traditional political discourse.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-gold font-bold">•</span>
                  <span><strong>Economic Bridges:</strong> Transforming Iraqi talents abroad into active partners in the economic development journey.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-gold font-bold">•</span>
                  <span><strong>Knowledge Transfer:</strong> Benefiting from the expertise and technologies acquired by Iraqis in advanced work environments.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-gold font-bold">•</span>
                  <span><strong>National Identity:</strong> Strengthening the emotional and practical connection between diaspora members and their homeland.</span>
                </li>
              </ul>
            </section>

            {/* Section 7: Sustainability */}
            <section className="mb-8">
              <h3 className="text-lg font-bold text-primary-dark mb-4 pb-2 border-b border-gray-200">
                VII. Long-term Sustainability and Expansion Vision
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify mb-4">
                This initiative has been designed to be sustainable and scalable at the international level:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li>• Annual establishment of the Award to consolidate it as an institutional tradition</li>
                <li>• Potential expansion of the Award's scope to include other countries with significant Iraqi communities</li>
                <li>• Building a database of Iraqi talents abroad</li>
                <li>• Establishing a network of past winners to contribute to the initiative's development</li>
                <li>• Seeking official recognition from competent Iraqi governmental authorities</li>
              </ul>
            </section>

            {/* Section 8: Conclusion */}
            <section className="mb-8 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-primary-dark mb-4">
                VIII. Concluding Strategic Statement
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                The International Excellence and Innovation Award represents a pioneering strategic initiative aimed at harnessing the energies and achievements of Iraqi diaspora members to serve Iraq's supreme national interests. Through this initiative, the Embassy of the Republic of Iraq in Stockholm seeks to build a model that can be replicated in other embassies, forming an integrated system of bridges connecting Iraq with its distinguished citizens across the globe.
              </p>
            </section>

            {/* English Footer */}
            <div className="text-center pt-6 border-t-2 border-primary-dark">
              <p className="text-primary-dark font-bold">An Official Award of the Embassy of the Republic of Iraq</p>
              <p className="text-gray-600 text-sm mt-1">Organized with Professional Integrity by Keeada</p>
            </div>
          </div>
        )}

      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:break-after-page {
            break-after: page;
          }
        }
      `}</style>
    </div>
  );
};

export default InternalDocument;
