import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaCode, FaLaptopCode, FaMobileAlt, FaServer, FaDatabase, FaPalette, FaCheck, FaArrowRight
} from 'react-icons/fa';
import { useLanguage } from "../context.jsx/LanguageContext";

const translations = {
  en: {
    pageTitle: "Zero Trust Cybersecurity Solutions",
    heroTitle: "Zero Trust Cybersecurity Solutions",
    heroParagraph: "Implementing strict access controls and continuous verification to protect your digital assets with a proactive Zero Trust security framework.",
    heroButton: "Contact Us",
    benefitsSection: "Benefits of Our Zero Trust Cybersecurity Solutions",
    benefitCards: [
      {
        title: "Continuous Verification",
        short: "Constantly authenticate users and devices at every access point.",
        long: "Ensures trust is never implicit but continuously evaluated."
      },
      {
        title: "Microsegmentation",
        short: "Segment networks and workloads to hinder threat movement.",
        long: "Minimizes the attack surface within your infrastructure."
      },
      {
        title: "Adaptive Access Control",
        short: "Adjust user permissions dynamically based on risk factors.",
        long: "Provides fine-grained access for optimal security."
      },
      {
        title: "Real-time Threat Detection",
        short: "Continuous monitoring to swiftly identify and mitigate threats.",
        long: "Ensures your environment is always secure."
      },
      {
        title: "Least Privilege Enforcement",
        short: "Grant minimal necessary access to reduce risk exposure.",
        long: "Limits insider threats and access vulnerabilities."
      },
      {
        title: "24/7 Managed Security Support",
        short: "Expert assistance around the clock to keep your systems safe.",
        long: "Immediate response and continuous maintenance."
      }
    ],
    whyHeading: "Why Choose Zero Trust Cybersecurity?",
    whyParagraph: "Implement a modern security framework that continuously verifies and protects every access request across your network.",
    whyBenefits: [
      "Continuous authentication of users and devices",
      "Microsegmentation to isolate network zones",
      "Adaptive access controls based on risk",
      "Real-time threat detection and response",
      "Least privilege enforcement across systems"
    ],
    whyButton: "Get Started",
    galleryTitle: "Cloud Infrastructure Portfolio",
    gallerySubtitle: "Showcase of websites we have developed across industries.",
    costHeading: "Estimate Your Cloud Costs",
    costSub: "Use our interactive tool to get a transparent and immediate estimate for your cloud infrastructure needs.",
    sliderRisk: "Risk Access Level (%)",
    sliderAuth: "Authentication (%)",
    sliderStorage: "Incident Storage (GB)",
    costLabel: "Estimated Monthly Security Budget",
    costBtn: "Contact Us for a Custom Quote",
    ctaHeading: "Ready to Launch Your Website?",
    ctaParagraph: "Contact us today to kickstart your project and create a stunning online presence.",
    ctaStart: "Start Your Project",
    ctaLearn: "Learn More About Us"
  },
  ar: {
    pageTitle: "حلول الأمان السيبراني Zero Trust",
    heroTitle: "حلول الأمان الصارم (Zero Trust)",
    heroParagraph: "تطبيق ضوابط وصول صارمة والتحقق المستمر لحماية أصولك الرقمية مع إطار أمان استباقي.",
    heroButton: "اتصل بنا",
    benefitsSection: "مزايا حلول الأمن السيبراني الصارم",
    benefitCards: [
      {
        title: "تحقق مستمر",
        short: "التحقق المتواصل من المستخدمين والأجهزة في كل نقطة وصول.",
        long: "يضمن أن الثقة ليست ضمنية بل يتم تقييمها باستمرار."
      },
      {
        title: "تقسيم دقيق (التجزئة)",
        short: "تقسيم الشبكة والأعمال يعرقل حركة التهديدات الداخلية.",
        long: "يقلل سطح الهجوم في البنية التحتية الخاصة بك."
      },
      {
        title: "ضبط وصول متكيف",
        short: "تعديل إذن المستخدم ديناميكيًا وفق عوامل المخاطر.",
        long: "توفر تحكمًا دقيقًا للوصول وتحسين الأمان."
      },
      {
        title: "كشف التهديدات في الوقت الحقيقي",
        short: "مراقبة دائمة للكشف والاستجابة للتهديدات بسرعة.",
        long: "يضمن بيئة آمنة بشكل دائم."
      },
      {
        title: "أقل امتيازات",
        short: "تزويد المستخدمين بأقل صلاحية لازمة لتقليل المخاطر.",
        long: "يقلل من التهديدات الداخلية والثغرات."
      },
      {
        title: "دعم أمني مدار 24/7",
        short: "مساعدة خبيرة على مدار الساعة لحماية أنظمتك.",
        long: "استجابة فورية وصيانة مستمرة."
      }
    ],
    whyHeading: "لماذا تختار أمن Zero Trust؟",
    whyParagraph: "قم بتنفيذ إطار أمان حديث يتحقق ويُصادق على كل طلب وصول عبر الشبكة.",
    whyBenefits: [
      "مصادقة متواصلة للمستخدمين والأجهزة",
      "تقسيم دقيق لعزل المناطق الشبكية",
      "ضبط وصول متكيف حسب مستوى المخاطر",
      "كشف واستجابة للتهديدات في الوقت الحقيقي",
      "فرض امتيازات محدودة عبر الأنظمة"
    ],
    whyButton: "ابدأ الآن",
    galleryTitle: "معرض الأعمال للبنية السحابية",
    gallerySubtitle: "استعراض مواقع ويب تم تطويرها في مختلف القطاعات.",
    costHeading: "تقدير تكلفة الأمان الشهري",
    costSub: "استخدم أداتنا التفاعلية للحصول على تقدير فوري وشفاف لتكلفة البنية السحابية.",
    sliderRisk: "معدل خطورة الوصول (%)",
    sliderAuth: "معدل المصادقة (%)",
    sliderStorage: "تخزين الحوادث (GB)",
    costLabel: "ميزانية الأمان الشهرية التقديرية",
    costBtn: "اتصل بنا للحصول على عرض مخصص",
    ctaHeading: "جاهز لإطلاق موقعك الإلكتروني؟",
    ctaParagraph: "تواصل معنا اليوم للبدء في مشروعك وبناء حضور قوي على الإنترنت.",
    ctaStart: "ابدأ مشروعك",
    ctaLearn: "اعرف المزيد عنا"
  },
  he: {
    pageTitle: "פתרונות אבטחת מידע Zero Trust",
    heroTitle: "פתרונות אבטחת מידע Zero Trust",
    heroParagraph: "הטמעה של בקרת גישה קפדנית ואימות רציף להגנה מיטבית על נכסי הארגון במסגרת אבטחת מידע מודרנית.",
    heroButton: "צור קשר",
    benefitsSection: "היתרונות המובילים של פתרונות Zero Trust",
    benefitCards: [
      {
        title: "אימות מתמיד",
        short: "אימות רציף של משתמשים ומכשירים בכל נקודת גישה.",
        long: "האמון אינו מובן מאליו — אלא מאומת בכל פעולה."
      },
      {
        title: "מיקרוסגמנטציה",
        short: "חלוקת רשת ומשימות לחסימת תנועה זדונית.",
        long: "הפחתת שטח התקיפה במערכות."
      },
      {
        title: "ניהול הרשאות דינאמי",
        short: "התאמת הרשאות משתמשים בזמן אמת לפי רמת סיכון.",
        long: "שליטה מפורטת ומדויקת לשיפור האבטחה."
      },
      {
        title: "זיהוי איומים בזמן אמת",
        short: "ניטור קבוע לזיהוי וטיפול מהיר באיומים.",
        long: "המערכת שלך מאובטחת בכל עת."
      },
      {
        title: "הגבלת גישה מינימלית",
        short: "מתן הרשאות מינימליות להפחתת סיכונים.",
        long: "צמצום סיכוני פנים וחולשות גישה."
      },
      {
        title: "תמיכה מנוהלת 24/7",
        short: "סיוע מקצועי בכל שעות היממה.",
        long: "מענה מידי ותחזוקה מתמשכת."
      }
    ],
    whyHeading: "למה לבחור אבטחת מידע Zero Trust?",
    whyParagraph: "אבטחת מידע חדשנית המוודאת כל בקשת גישה – בכל שלב ובכל מערכת.",
    whyBenefits: [
      "אימות מתמיד של משתמשים ומכשירים",
      "מיקרוסגמנטציה להפרדה בין אזורי רשת",
      "ניהול גמיש של הרשאות בהתאם לסיכון",
      "ניטור איומים וזיהוי בזמן אמת",
      "הגבלת הרשאות מינימלית בכל המערכות"
    ],
    whyButton: "להתחלה",
    galleryTitle: "פורטפוליו ענן",
    gallerySubtitle: "תצוגת אתרים שפותחו למגוון לקוחות.",
    costHeading: "הערכת תקציב חודשי לאבטחה",
    costSub: "השתמשו בכלי שלנו להערכת עלויות האבטחה והרשת בענן.",
    sliderRisk: "רמת סיכון גישה (%)",
    sliderAuth: "אחוז אימות משתמשים",
    sliderStorage: "אחסון אירועים (GB)",
    costLabel: "תקציב אבטחה חודשי משוער",
    costBtn: "צור קשר להצעת מחיר מותאמת",
    ctaHeading: "מוכנים להקים אתר חדש?",
    ctaParagraph: "פנו אלינו וניצור יחד נוכחות דיגיטלית בטוחה לעסק.",
    ctaStart: "התחל פרויקט",
    ctaLearn: "מידע נוסף"
  }
};

const Service1 = () => {
  const { language } = useLanguage() || { language: "en" };
  const t = translations[language] || translations.en;
  const isRTL = language === "ar" || language === "he";
  const navigate = useNavigate();

  useEffect(() => {
    document.title = t.pageTitle;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [language, t.pageTitle, isRTL]);

  // Cost sliders
  const [vcpu, setVcpu] = useState(8);
  const [ram, setRam] = useState(16);
  const [storage, setStorage] = useState(500);
  const [totalCost, setTotalCost] = useState(0);

  const VCPU_COST = 0.05;
  const RAM_COST = 0.02;
  const STORAGE_COST = 0.0001;

  useEffect(() => {
    const cost = vcpu * VCPU_COST + ram * RAM_COST + storage * STORAGE_COST;
    setTotalCost(cost);
  }, [vcpu, ram, storage]);

  const handleGetQuote = () => {
    navigate("/contact");
  };

  return (
    <div className="service-page" dir={isRTL ? "rtl" : "ltr"}>
      <div className="home-page">
        {/* Hero Section */}
        <section className="hero-section">
          <video autoPlay muted loop playsInline className="hero-bg-video">
            <source src="images/services4.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="hero-overlay">
            <div className="hero-content">
              <h1 className="hero-title animate-slide-in">{t.heroTitle}</h1>
              <p className="hero-paragraph animate-fade-up">{t.heroParagraph}</p>
              <Link to="/contact" className="hero-button animate-fade-up-delayed">{t.heroButton}</Link>
            </div>
          </div>
        </section>

        {/* Benefits Cards */}
        <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-inner my-12 text-gray-800 dark:text-gray-200" style={{ backgroundColor: "var(--bg-color)" }}>
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">{t.benefitsSection}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {t.benefitCards.map((card, i) => (
              <div
                key={i}
                className={
                  "group p-8 rounded-2xl shadow-lg transition-transform duration-300 transform cursor-pointer " +
                  (i === 0
                    ? "bg-gradient-to-br from-indigo-500 to-blue-600"
                    : i === 1
                    ? "bg-gradient-to-br from-green-500 to-teal-600"
                    : i === 2
                    ? "bg-gradient-to-br from-red-500 to-pink-600"
                    : i === 3
                    ? "bg-gradient-to-br from-purple-500 to-indigo-600"
                    : i === 4
                    ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                    : "bg-gradient-to-br from-cyan-500 to-sky-600")
                }
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white mb-6 transform group-hover:scale-110 transition-transform">
                  {/* For SVG icon use any visual or fallback */}
                  <span style={{ fontSize: 30 }}>{i + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{card.title}</h3>
                <p className="text-gray-200 transition-opacity duration-300 group-hover:opacity-0">{card.short}</p>
                <p className="text-gray-200 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-300 ease-in-out">{card.long}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="section benefits-section">
          <div className="container">
            <div className="grid-2">
              <motion.div
                className="benefits-content"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2>{t.whyHeading}</h2>
                <p>{t.whyParagraph}</p>
                <div className="benefits-list">
                  {t.whyBenefits.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      className="benefit-item"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <FaCheck className="check-icon" />
                      <span>{benefit}</span>
                    </motion.div>
                  ))}
                </div>
                <Link to="/contact" className="btn btn-primary">
                  {t.whyButton} <FaArrowRight />
                </Link>
              </motion.div>
              <motion.div
                className="benefits-visual"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="benefits-image">
                  <img src="images/it49.jpg" alt="Zero Trust Cybersecurity Visual" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="section gallery-wrapper">
          <div className="container">
            <motion.div
              className="gallery-header"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="gallery-title">{t.galleryTitle}</h2>
              <p className="gallery-subtitle">{t.gallerySubtitle}</p>
            </motion.div>
            <div className="gallery-container">
              {/* First Row */}
              <div className="gallery-row">
                <div className="gallery-big">
                  <img src="images/it38.jpg" alt="Cloud infrastructure overview" />
                </div>
                <div className="gallery-grid">
                  <img src="images/it39.jpg" alt="Server management" />
                  <img src="images/it40.jpg" alt="Cloud security" />
                  <img src="images/it41.jpg" alt="Server management" />
                  <img src="images/it42.jpg" alt="Cloud security" />
                </div>
              </div>
              {/* Second Row */}
              <div className="gallery-row reverse">
                <div className="gallery-big">
                  <img src="images/it48.jpg" alt="Global network map" />
                </div>
                <div className="gallery-grid">
                  <img src="images/it43.jpg" alt="Compliance and Governance" />
                  <img src="images/it44.jpg" alt="Custom cloud solutions" />
                  <img src="images/it45.jpg" alt="Server management" />
                  <img src="images/it46.jpg" alt="Cloud security" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Monthly Cost Section */}
        <main className="container mx-auto px-4 md:px-8">
          <section className="py-16 md:py-4 bg-[var(--bg-color)] rounded-xl shadow-2xl my-12 text-[var(--text-color)] transition-colors duration-300" style={{ boxShadow: "var(--shadow)" }}>
            <h2 className="text-center text-3xl md:text-4xl font-bold mb-4">{t.costHeading}</h2>
            <p className="text-center text-lg text-[var(--text-muted)] max-w-2xl mx-auto mb-12">{t.costSub}</p>
            <div className="max-w-4xl mx-auto p-8 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-[#1a202c] dark:to-[#2d3748] shadow-xl transition-colors duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="group bg-[var(--card-bg)] dark:bg-[#2d3748] p-6 rounded-xl shadow-lg hover:shadow-[var(--shadow-hover)] transition-all duration-300">
                  <label htmlFor="vcpu-slider" className="block text-xl font-semibold mb-2" style={{ color: "#fff" }}>
                    {t.sliderRisk}
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      id="vcpu-slider"
                      min="1"
                      max="64"
                      value={vcpu}
                      onChange={(e) => setVcpu(Number(e.target.value))}
                      className="w-full h-2 bg-[var(--input-bg)] rounded-lg appearance-none cursor-pointer"
                      style={{ boxShadow: "var(--shadow)", transition: "all 0.2s ease-in-out" }}
                    />
                    <span className="w-16 text-center text-xl font-bold" style={{ color: "#fff" }}>
                      {vcpu}
                    </span>
                  </div>
                </div>
                <div className="group bg-[var(--card-bg)] dark:bg-[#2d3748] p-6 rounded-xl shadow-lg hover:shadow-[var(--shadow-hover)] transition-all duration-300">
                  <label htmlFor="ram-slider" className="block text-xl font-semibold mb-2" style={{ color: "#fff" }}>
                    {t.sliderAuth}
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      id="ram-slider"
                      min="1"
                      max="100"
                      value={ram}
                      onChange={(e) => setRam(Number(e.target.value))}
                      className="w-full h-2 bg-[var(--input-bg)] rounded-lg appearance-none cursor-pointer"
                      style={{ boxShadow: "var(--shadow)", transition: "all 0.2s ease-in-out" }}
                    />
                    <span className="w-16 text-center text-xl font-bold" style={{ color: "#fff" }}>
                      {ram}%
                    </span>
                  </div>
                </div>
                <div className="group bg-[var(--card-bg)] dark:bg-[#2d3748] p-6 rounded-xl shadow-lg hover:shadow-[var(--shadow-hover)] transition-all duration-300">
                  <label htmlFor="storage-slider" className="block text-xl font-semibold mb-2" style={{ color: "#fff" }}>
                    {t.sliderStorage}
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      id="storage-slider"
                      min="10"
                      max="2000"
                      value={storage}
                      onChange={(e) => setStorage(Number(e.target.value))}
                      className="w-full h-2 bg-[var(--input-bg)] rounded-lg appearance-none cursor-pointer"
                      style={{ boxShadow: "var(--shadow)", transition: "all 0.2s ease-in-out" }}
                    />
                    <span className="w-16 text-center text-xl font-bold" style={{ color: "#fff" }}>
                      {storage}
                    </span>
                  </div>
                </div>
              </div>
              {/* Cost Display */}
              <div className="mt-12 text-center">
                <p className="text-3xl font-light mb-2" style={{ color: "#fff" }}>{t.costLabel}</p>
                <p className="text-5xl md:text-6xl font-extrabold tracking-tight" style={{ color: "#fff" }}>${totalCost.toFixed(2)}</p>
                <button
                  onClick={handleGetQuote}
                  className="mt-8 inline-block bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
                >
                  {t.costBtn}
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-overlay">
            <div className="container">
              <motion.div
                className="cta-content text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2>{t.ctaHeading}</h2>
                <p>{t.ctaParagraph}</p>
                <div className="cta-buttons">
                  <Link to="/contact" className="btn btn-primary btn-large">
                    {t.ctaStart} <FaArrowRight />
                  </Link>
                  <Link to="/about" className="btn btn-outline btn-large">
                    {t.ctaLearn}
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
   


              

        <style jsx>{`
          .home-page {
            padding-top: 80px;
          }

        .hero-section {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-bg-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    z-index: -1;
  }

  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;   /* ensures vertical centering inside overlay */
    text-align: center;
    color: #fff;
    max-width: 800px;
    z-index: 2;
    gap: 28px; /* space between title, text, and button */
  }

  .hero-title {
    color: #fff; /* ✅ force white text so it’s visible on dark video background in light mode */
    font-size: 2.8rem;
    font-weight: bold;
    line-height: 1.1;
    margin-bottom: 0;
    opacity: 0;
    animation: slideIn 1s ease-out forwards 0.5s;
  }


  .hero-paragraph {
    font-size: 1.25rem;
    margin: 0;
    opacity: 0;
    animation: fadeUp 1s ease-out forwards 1s;
  }

  .hero-button {
    margin-top: 0;
    padding: 14px 36px;
    font-size: 1.1rem;
    font-weight: 600;
    color: #fff;
    background-color: #224DB7;
    border-radius: 10px;
    text-decoration: none;
    border: none;
    transition: background-color 0.3s, transform 0.3s;
    opacity: 0;
    animation: fadeUp 1s ease-out forwards 1.5s;
  }

  .hero-button:hover {
    background-color: #000;
    transform: scale(1.05);
  }

  /* Responsive adjustments */
  @media (max-width: 700px) {
    .hero-content {
      max-width: 95vw;
      padding: 0 10px;
      gap: 18px;
    }
    .hero-title {
      font-size: 2rem;
    }
    .hero-paragraph {
      font-size: 1rem;
    }
    .hero-button {
      font-size: 1rem;
    }
  }

  /* Animations */
  @keyframes slideIn {
    0% { opacity: 0; transform: translateY(-20px);}
    100% { opacity: 1; transform: translateY(0);}
  }
  @keyframes fadeUp {
    0% { opacity: 0; transform: translateY(20px);}
    100% { opacity: 1; transform: translateY(0);}
  }

          .hero-text h1 {
            font-size: 3.5rem;
            font-weight: 800;
            line-height: 1.2;
            margin-bottom: 20px;
            color: white;
          }

          .gradient-text {
            background: linear-gradient(45deg, #ffd700, #ff6b6b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .hero-text p {
            font-size: 1.2rem;
            line-height: 1.6;
            margin-bottom: 30px;
            opacity: 0.9;
          }

          .hero-buttons {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
          }

          .hero-visual {
            position: relative;
          }

          .hero-image {
            position: relative;
            border-radius: 20px;
            overflow: hidden;
            border-radius: 200px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          }

          .hero-image img {
            width: 100%;
            height: 400px;
            object-fit: cover;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          

          .card-icon {
            font-size: 2rem;
            color: var(--primary-color);
          }

          .card-content h4 {
            color: var(--heading-color);
            margin: 0 0 5px 0;
            font-size: 1rem;
          }

          .card-content p {
            color: var(--text-muted);
            margin: 0;
            font-size: 0.9rem;
          }

  .features-section {
    background: var(--sidebar-bg);
    padding: 80px 0;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin-top: 60px;
  }
    .feature-card {
    background: var(--card-bg, #111);
    border: 1px solid rgba(0, 123, 255, 0.4);
    border-radius: 16px;
    padding: 32px 24px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;   /* Center horizontally */
    justify-content: flex-start; /* Keep content top-aligned */
  }

  .feature-card.premium-card {
    position: relative;
    background: rgba(20, 20, 20, 0.9);
    padding: 40px 30px;
    border-radius: 20px;
    text-align: center;
    overflow: hidden;
    color: #fff;
    z-index: 1;
  }

  .feature-card.premium-card::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 2px;
    background: linear-gradient(270deg, #4f9fff, #a855f7, #4f9fff);
    background-size: 600% 600%;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: borderMove 6s linear infinite;
    z-index: -1;
  }

  @keyframes borderMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .feature-icon {
    font-size: 3rem;
    color: #4f9fff;
    margin-bottom: 20px;
  }

  .feature-card h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: #fff;
  }

  .feature-card p {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #bbb;
  }

  .btn-learn {
    margin-top: 40px;
  }
  .btn-learn-wrapper {
    display: flex;
    justify-content: center;  /* horizontal center */
    align-items: center;      /* vertical center */
    width: 100%;
    margin-top: 20px;         /* optional spacing */
  }

  .btn-learn {
    background: linear-gradient(90deg, #3b82f6, #a855f7);
    color: #fff;
    padding: 12px 28px;
    border: none;
    border-radius: 9999px;  /* pill shape */
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;               /* spacing between text & arrow */
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .btn-learn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }



          .benefits-section {
            background: var(--bg-color);
          }

          .benefits-content h2 {
            font-size: 2.5rem;
            color: var(--heading-color);
            margin-bottom: 20px;
          }

          .benefits-content p {
    font-size: 1.02rem;
    color: var(--text-color);
    line-height: 1.6;
    margin-bottom: 30px;
    text-align: justify;                /* Justified paragraph */
    letter-spacing: 0.1px;              /* Slight letter spacing for professionalism */
  }


          .benefits-list {
            margin-bottom: 40px;
          }

          .benefit-item {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 20px;
            font-size: 1rem;
            color: var(--text-color);
          }

        .check-icon {
    color: var(--accent-color, #28a745);
    font-size: 1.15rem;                 /* Slightly larger for visibility */
    background: var(--accent-bg, #e0f7e9); /* Soft green for light mode */
    padding: 8px;
    border-radius: 50%;
    box-shadow: 0 0 6px var(--accent-color, #28a745); /* Glow/silhouette effect */
    transition: background 0.3s, color 0.3s;
  }

    /* Light theme (optional, if you use a root variable) */
    :root {
    --accent-color: #111;     /* Black for icon color */
    --accent-bg: #eaeaea;     /* Light grey for background dot */
  }


  /* Dark theme (assuming body.dark is toggled for dark mode) */
  body.dark .check-icon {
    color: #5cffb1;                          /* Bright green for dark */
    background: rgba(40,167,69,0.22);        /* Slightly brighter dot */
    box-shadow: 0 0 8px #5cffb1;
  }


          .benefits-image {
            border-radius: 50px;
            overflow: hidden;
            box-shadow: var(--shadow);
          }

          .benefits-image img {
            width: 100%;
            height: 570px;
            object-fit: cover;
            border-radius: 50px;
          }

          .gallery-wrapper {
    background: var(--sidebar-bg); /* Uses sidebar background for both themes */
    padding: 80px 40px;
    font-family: "Segoe UI", sans-serif;
    transition: background-color 0.3s ease; /* Smooth transition on theme change */
  }


  .gallery-header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 60px;
  }

  .gallery-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--heading-color);
    margin-bottom: 15px;
  }

  .gallery-subtitle {
    font-size: 1.1rem;
    color: var(--text-muted);
    line-height: 1.6;
  }


  .gallery-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .gallery-row {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: stretch;
  }

  .gallery-row.reverse {
    flex-direction: row-reverse;
  }

  .gallery-big img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    border-radius: 16px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    flex: 1;
  }

  .gallery-grid img {
    width: 100%;
    height: 240px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0,0,0,0.08);
    transition: transform 0.3s ease;
  }

  .gallery-grid img:hover {
    transform: scale(1.03);
  }

  /* Responsive */
  @media (max-width: 992px) {
    .gallery-row,
    .gallery-row.reverse {
      flex-direction: column;
    }
    .gallery-big img {
      height: 350px;
    }
    .gallery-grid img {
      height: 180px;
    }
  }


          .cta-section {
  position: relative;
  background: url('/images/it64.jpg') center/cover no-repeat fixed; /* fixed background */
  padding: 0 0;
  color: white;
}

  .cta-overlay {
    background-color: rgba(0, 0, 0, 0.5); /* Dark overlay for readability */
    padding: 100px 0;
  }

  .cta-content {
    max-width: 700px;
    margin: auto;
    color:#fff;
  }

  .cta-content h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color:#fff;
  }

  .cta-content p {
    font-size: 1.2rem;
    margin-bottom: 30px;
  }

  .cta-buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
  }

  .btn {
    padding: 12px 25px;
    border-radius: 5px;
    font-weight: bold;
    text-decoration: none;
    transition: 0.3s;
  }

  .btn-primary {
    background: #ff6600;
    color: white;
  }

  .btn-primary:hover {
    background: #e65c00;
  }

  .btn-outline {
    border: 2px solid white;
    color: white;
  }

  .btn-outline:hover {
    background: white;
    color: black;
  }


  .btn {
    padding: 12px 25px;
    border-radius: 5px;
    font-weight: bold;
    text-decoration: none;
    transition: 0.3s;
  }

  .btn-primary {
    background: #224DB7;
    color: white;
  }

  .btn-primary:hover {
    background: #224DB7;
  }

  .btn-outline {
    border: 2px solid white;
    color: white;
  }

  .btn-outline:hover {
    background: white;
    color: black;
  }
  .btn-primary, .btn-outline, .btn-large {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .btn-primary svg {
    font-size: 1.3rem;
    vertical-align: middle;
  }



          .faq-section {
            background: var(--sidebar-bg);
            padding: 0 0;
            padding-bottom: 40px;
            margin-top:-40px;
          }

          .faq-list {
            max-width: 800px;
            margin: 60px auto 0;
          }

          .faq-item {
            background: var(--card-bg);
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 20px;
            box-shadow: var(--shadow);
            border: 1px solid var(--border-color);
          }

          .faq-item h4 {
            color: var(--heading-color);
            font-size: 1.2rem;
            margin-bottom: 15px;
          }

          .faq-item p {
            color: var(--text-color);
            line-height: 1.6;
            margin: 0;
          }

        src/pages/Home2.jsx

            .hero-text h1 {
              font-size: 2.5rem;
            }

            .process-step {
              flex-direction: column;
              text-align: center;
            }

            .step-number {
              width: auto;
            }

            .testimonials-grid {
              grid-template-columns: 1fr;
            }
          }
            .gallery-row {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: stretch;
  margin-bottom: 40px; /* Adds space between rows */
}
.gallery-row.reverse {
  flex-direction: row-reverse;
  padding-top: 20px; /* Adds top padding for reverse rows */
}

        `}</style>
        </div>
      </div>
    );
  };

  export default Service1;
