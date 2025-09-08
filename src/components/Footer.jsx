import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaTwitter, FaFacebook, FaPinterest } from "react-icons/fa";
import { useLanguage } from "../context.jsx/LanguageContext";

const logo = "images/logo.png";

const translations = {
  en: {
    companyTitle: "Online Training Platform",
    companyDesc: "Empowering learners worldwide with interactive courses and expert instructors.",
    quickLinksTitle: "Quick Links",
    quickLinks: [
      { to: "/", label: "Home" },
      { to: "/about", label: "About Us" },
      { to: "/services", label: "Services" },
      { to: "/blog", label: "Blog" },
      { to: "/contact", label: "Contact Us" },
    ],
    servicesTitle: "Services",
    servicesLinks: [
      { to: "/service1", label: "Cloud Infrastructure" },
      { to: "/service2", label: "Zero Trust Cybersecurity" },
      { to: "/service3", label: "AI-Powered Automation" },
      { to: "/service4", label: "Data Science & Analytics" },
      { to: "/service5", label: "Cloud-Native Application" },
      { to: "/service6", label: "Remote IT Services" },
    ],
    contactTitle: "Get In Touch",
    phone: "+1 (555) 123-4567",
    email: "support@forstackly.com",
    location: "United States",
    hours: "Mon - Fri: 9am - 6pm",
    startJourney: "Start Your Journey",
    copyright: "© 2025 Finance & Accounting Company. All rights reserved.",
    privacyPolicy: "Privacy Policy",
    termsService: "Terms of Service",
    cookiePolicy: "Cookie Policy",
  },
  ar: {
    companyTitle: "منصة تدريب عبر الإنترنت",
    companyDesc: "تمكين المتعلمين في جميع أنحاء العالم مع الدورات التفاعلية والمدربين الخبراء.",
    quickLinksTitle: "روابط سريعة",
    quickLinks: [
      { to: "/", label: "الرئيسية" },
      { to: "/about", label: "معلومات عنا" },
      { to: "/services", label: "خدمات" },
      { to: "/blog", label: "المدونة" },
      { to: "/contact", label: "اتصل بنا" },
    ],
    servicesTitle: "الخدمات",
    servicesLinks:[
    { to: "/service1", label: "البنية التحتية السحابية" },
    { to: "/service2", label: "أمن السيبراني بثقة صفرية" },
    { to: "/service3", label: "الأتمتة المدعومة بالذكاء الاصطناعي" },
    { to: "/service4", label: "علوم البيانات والتحليلات" },
    { to: "/service5", label: "التطبيقات السحابية الأصلية" },
    { to: "/service6", label: "خدمات تكنولوجيا المعلومات عن بُعد" },
  ],

    contactTitle: "اتصل بنا",
    phone: "+1 (555) 123-4567",
    email: "support@forstackly.com",
    location: "الولايات المتحدة",
    hours: "الاثنين - الجمعة: 9 صباحاً - 6 مساءً",
    startJourney: "ابدأ رحلتك",
    copyright: "© 2025 شركة المحاسبة والمالية. جميع الحقوق محفوظة.",
    privacyPolicy: "سياسة الخصوصية",
    termsService: "شروط الخدمة",
    cookiePolicy: "سياسة ملفات تعريف الارتباط",
  },
  he: {
    companyTitle: "פלטפורמת הדרכה מקוונת",
    companyDesc: "העצמת לומדים בכל העולם עם קורסים אינטראקטיביים ומדריכים מומחים.",
    quickLinksTitle: "קישורים מהירים",
    quickLinks: [
      { to: "/", label: "בית" },
      { to: "/about", label: "אודות" },
      { to: "/services", label: "שירותים" },
      { to: "/blog", label: "בלוג" },
      { to: "/contact", label: "צור קשר" },
    ],
    servicesTitle: "שירותים",
    servicesLinks: [
    { to: "/service1", label: "תשתית ענן" },
    { to: "/service2", label: "אבטחת סייבר ללא אמון" },
    { to: "/service3", label: "אוטומציה מונעת בינה מלאכותית" },
    { to: "/service4", label: "מדעי הנתונים ואנליטיקה" },
    { to: "/service5", label: "יישומים נטולי ענן" },
    { to: "/service6", label: "שירותי IT מרחוק" },
  ],
    contactTitle: "צור קשר",
    phone: "+1 (555) 123-4567",
    email: "support@forstackly.com",
    location: "ארצות הברית",
    hours: "שני - שישי: 9:00 - 18:00",
    startJourney: "התחל את המסע שלך",
    copyright: "© 2025 חברת פיננסים וחשבונאות. כל הזכויות שמורות.",
    privacyPolicy: "מדיניות פרטיות",
    termsService: "תנאי שירות",
    cookiePolicy: "מדיניות עוגיות",
  },
};

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    const handleThemeChange = () => setTheme(localStorage.getItem("theme") || "light");
    window.addEventListener("theme-changed", handleThemeChange);
    window.addEventListener("storage", handleThemeChange);
    return () => {
      window.removeEventListener("theme-changed", handleThemeChange);
      window.removeEventListener("storage", handleThemeChange);
    };
  }, []);

  return (
    <footer
      className="bg-[var(--card-bg)] text-[var(--text-color)] transition-colors duration-300"
      style={{ borderTop: "1px solid var(--border-color)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir={language === "ar" || language === "he" ? "rtl" : "ltr"}>
        <div className="grid grid-cols-1 min-[768px]:grid-cols-4 gap-16 justify-between">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img src={logo} alt="STACKLY" className="h-8 w-auto" />
            </div>
            <h3 className="text-[var(--primary-color)] font-semibold text-lg">{t.companyTitle}</h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed">{t.companyDesc}</p>
            <div className="flex space-x-3 pt-2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[var(--sidebar-bg)] border border-[var(--border-color)] flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors duration-200">
                <FaLinkedin className="w-5 h-5 text-[var(--primary-color)] hover:text-white transition-colors duration-200" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[var(--sidebar-bg)] border border-[var(--border-color)] flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors duration-200">
                <FaTwitter className="w-5 h-5 text-[var(--primary-color)] hover:text-white transition-colors duration-200" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[var(--sidebar-bg)] border border-[var(--border-color)] flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors duration-200">
                <FaFacebook className="w-5 h-5 text-[var(--primary-color)] hover:text-white transition-colors duration-200" />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[var(--sidebar-bg)] border border-[var(--border-color)] flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors duration-200">
                <FaPinterest className="w-5 h-5 text-[var(--primary-color)] hover:text-white transition-colors duration-200" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-[var(--primary-color)] font-semibold text-lg">{t.quickLinksTitle}</h3>
            <ul>
              {t.quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-[var(--muted)] hover:text-[var(--hover-color)] transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-[var(--primary-color)] font-semibold text-lg">{t.servicesTitle}</h3>
            <ul>
              {t.servicesLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-[var(--muted)] hover:text-[var(--hover-color)] transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-[var(--primary-color)] font-semibold text-lg">{t.contactTitle}</h3>
            <div>
              <div className="flex items-center space-x-3">
                <span>{t.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>{t.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>{t.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>{t.hours}</span>
              </div>
            </div>
            <Link to="/contact" className="block bg-[var(--primary-color)] text-white py-3 rounded-lg text-center hover:bg-[var(--hover-color)] transition-colors duration-200">
              {t.startJourney}
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t" style={{ borderColor: "var(--border-color)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" dir={language === "ar" || language === "he" ? "rtl" : "ltr"}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-[var(--muted)] text-sm">{t.copyright}</div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-[var(--muted)] hover:text-[var(--hover-color)] transition-colors duration-200">{t.privacyPolicy}</a>
              <a href="#" className="text-[var(--muted)] hover:text-[var(--hover-color)] transition-colors duration-200">{t.termsService}</a>
              <a href="#" className="text-[var(--muted)] hover:text-[var(--hover-color)] transition-colors duration-200">{t.cookiePolicy}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
