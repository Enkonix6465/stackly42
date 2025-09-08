import React, { useRef, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { 
  FaUsers, 
  FaRocket, 
  FaShieldAlt, 
  FaCogs, 
  FaRobot,
  FaCalendarCheck, 
  FaBuilding, 
  FaTasks, 
  FaAward,
  FaArrowRight,
  FaCheck,
  FaStar,
  FaGlobe,
  FaBriefcase,
  FaPalette,
  FaUtensils,
  FaLock,
  FaTrophy,
  FaServer,
  FaCloud,
  FaTools,
  FaQuoteLeft,
  FaCloudUploadAlt,
} from 'react-icons/fa';
import { useLanguage } from "../context.jsx/LanguageContext";

// Centralized language translations including Hebrew
const translations = {
  en: {
    pageTitle: "ForStackly - Professional Business Solutions",
    hero: {
      title: "Your Trusted Partner in IT Excellence",
      paragraph: "From innovative cloud migration to robust cybersecurity solutions, we provide expert IT services that drive your business forward. Partner with us to unlock seamless technology integration and operational excellence.",
      button: "Reach Out Today",
      videoSrc: "images/videoss1.mp4"
    },
    threeColCenter: {
      leftAlt: "Modern workspace",
      rightAlt: "Team workspace",
      centerTitle: "If you can dream it, we can build it.",
      centerParagraph: "We adopt a uniquely personalized approach to each project to deliver stunning results of optimal function. Renowned for our technical understanding and crafted collaboration, our portfolio of IT solutions transforms your business."
    },
    servicesSection: {
      heading: "Comprehensive IT Solutions",
      paragraph: "From custom software development to cloud integration and cybersecurity, we provide end-to-end IT services that empower your business to innovate, scale, and remain secure in a rapidly evolving digital landscape.",
      list: [
        "Custom Software Development",
        "Cloud Infrastructure & Migration",
        "Cybersecurity & Compliance",
        "IT Consulting & Strategy",
        "Managed IT Services",
        "Data Analytics & AI Solutions"
      ],
      button: "Explore All Services",
      imgAlt: "Team collaboration"
    },
    featuresHeading: "Empowering Your IT Success",
    featuresSub: "Innovative, secure, and scalable IT services tailored to power your business.",
    features: [
      {
        icon: FaCloud,
        title: "Scalable Cloud Migration",
        description: "Effortlessly transition your infrastructure and applications to the cloud, ensuring scalability, security, and continuous availability.",
        color: "#1E90FF",
      },
      {
        icon: FaShieldAlt,
        title: "Advanced Cybersecurity",
        description: "Protect your data with 24/7 monitoring, threat detection, and compliance services tailored to your business needs.",
        color: "#FF4500",
      },
      {
        icon: FaRobot,
        title: "Intelligent Automation",
        description: "Leverage artificial intelligence and process automation to streamline operations, enhance accuracy, and innovation across your workflows.",
        color: "#32CD32",
      },
      {
        icon: FaCogs,
        title: "Software Development",
        description: "Tailored software solutions designed to seamlessly integrate with your business processes and supporting long-term digital growth.",
        color: "#F4A261",
      },
      {
        icon: FaRocket,
        title: "Rapid Deployment",
        description: "Accelerate project delivery while minimizing downtime through agile methodologies and experienced teams dedicated to quality results.",
        color: "#9B51E0",
      },
      {
        icon: FaPalette,
        title: "Innovative UI/UX Design",
        description: "Protect your data with 24/7 monitoring, threat detection, and compliance services designed for your business environment.",
        color: "#6565EA",
      }
    ],
    stats: [
      { number: 120, suffix: "+", label: "Projects Completed", icon: FaTasks },
      { number: 80, suffix: "+", label: "Happy Clients", icon: FaUsers },
      { number: 5, suffix: "+", label: "Years Experience", icon: FaBriefcase },
      { number: 15, suffix: "+", label: "Countries Served", icon: FaGlobe },
    ],
    testimonialsHeading: "What Our Clients Say",
    testimonials: [
      {
        id: 1,
        name: "Rajesh Kumar",
        role: "CTO, FinTech Corp",
        feedback: "Their IT consulting transformed our infrastructure. Server downtime reduced by 80%, and our team now works with greater efficiency.",
        avatar: "images/it4.jpg",
      },
      {
        id: 2,
        name: "Sarah Williams",
        role: "Product Manager, EduTech Solutions",
        feedback: "The cloud migration service was seamless. Security and scalability improved drastically, saving us both time and costs.",
        avatar: "images/it3.jpg",
      },
      {
        id: 3,
        name: "Amit Verma",
        role: "Founder, HealthPlus",
        feedback: "Their cybersecurity team is top-notch. We now feel fully confident in protecting our patient data across all systems.",
        avatar: "images/it5.jpg",
      }
    ],
    ctaHeading: "Ready to Transform Your Business?",
    ctaParagraph: "Get started today with a free consultation and discover how we can help you achieve your goals.",
    ctaStart: "Start Your Journey",
    ctaLearn: "Learn More About Us"
  },
  ar: {
    pageTitle: "ForStackly - حلول الأعمال المهنية",
    hero: {
      title: "شريكك الموثوق في تميز تقنية المعلومات",
      paragraph: "من ترحيل السحابة المبتكر إلى حلول الأمن السيبراني القوية، نقدم خدمات تقنية المعلومات المتخصصة التي تدفع أعمالك للأمام. تعاون معنا لتحقيق تكامل تقني سلس وتميز تشغيلي.",
      button: "تواصل معنا اليوم",
      videoSrc: "images/videoss1.mp4"
    },
    threeColCenter: {
      leftAlt: "مساحة عمل حديثة",
      rightAlt: "مساحة عمل الفريق",
      centerTitle: "إذا كنت تستطيع أن تحلم بها، يمكننا تنفيذها.",
      centerParagraph: "نتبع نهجاً خاصاً وفريداً في كل مشروع لنحقق نتائج مذهلة. نحن مشهورون بفهمنا التقني وتعاوننا المصمم خصيصاً، كما أن مجموعة حلولنا التقنية تحول أعمالك."
    },
    servicesSection: {
      heading: "حلول تقنية المعلومات الشاملة",
      paragraph: "من تطوير البرمجيات المخصصة إلى تكامل السحابة والأمن السيبراني، نقدم خدمات تقنية للمعلومات شاملة تمكن أعمالك من الابتكار والتوسع والبقاء آمنة في بيئة رقمية متغيرة بسرعة.",
      list: [
        "تطوير البرمجيات المخصصة",
        "البنية التحتية السحابية والترحيل",
        "الأمن السيبراني والامتثال",
        "استشارات تقنية المعلومات والاستراتيجية",
        "إدارة خدمات تقنية المعلومات",
        "تحليل البيانات وحلول الذكاء الاصطناعي"
      ],
      button: "اكتشف جميع الخدمات",
      imgAlt: "تعاون الفريق"
    },
    featuresHeading: "تمكين نجاح تقنية المعلومات لديك",
    featuresSub: "خدمات تقنية معلومات مبتكرة وآمنة وقابلة للتوسع مصممة لأعمالك.",
    features: [
      {
        icon: FaCloud,
        title: "ترحيل سحابي قابل للتوسع",
        description: "انقل البنية التحتية والتطبيقات الخاصة بك إلى السحابة بسهولة وتأكد من قابلية التوسع والأمان وتوفر مستمر.",
        color: "#1E90FF",
      },
      {
        icon: FaShieldAlt,
        title: "أمن سيبراني متقدم",
        description: "احمِ بياناتك من خلال مراقبة 24/7 وكشف التهديدات والخدمات الامتثالية المصممة خصيصًا لاحتياجات عملك.",
        color: "#FF4500",
      },
      {
        icon: FaRobot,
        title: "أتمتة ذكية",
        description: "استخدم الذكاء الاصطناعي والأتمتة في العمليات لتحسين الكفاءة والدقة وتحفيز الابتكار في سير العمل.",
        color: "#32CD32",
      },
      {
        icon: FaCogs,
        title: "تطوير البرمجيات",
        description: "حلول برمجية مخصصة مصممة لتتكامل بسلاسة مع عمليات أعمالك ودعم النمو الرقمي طويل المدى.",
        color: "#F4A261",
      },
      {
        icon: FaRocket,
        title: "نشر سريع",
        description: "تسريع تسليم المشاريع مع تقليل فترة التوقف من خلال منهجيات رشيقة وفرق متخصصة في النتائج عالية الجودة.",
        color: "#9B51E0",
      },
      {
        icon: FaPalette,
        title: "تصميم واجهات مبتكر",
        description: "احمِ بياناتك من خلال مراقبة واستكشاف التهديدات بشكل دائم وخدمات امتثالية مصممة لبيئة أعمالك.",
        color: "#6565EA",
      }
    ],
    stats: [
      { number: 120, suffix: "+", label: "مشاريع مكتملة", icon: FaTasks },
      { number: 80, suffix: "+", label: "عملاء سعداء", icon: FaUsers },
      { number: 5, suffix: "+", label: "سنوات الخبرة", icon: FaBriefcase },
      { number: 15, suffix: "+", label: "دول تم خدمتها", icon: FaGlobe },
    ],
    testimonialsHeading: "ماذا يقول عملاؤنا",
    testimonials: [
      {
        id: 1,
        name: "ראג’ש קומאר",
        role: "CTO, חברת FinTech",
        feedback: "הייעוץ הטכנולוגי שלהם שדרג לנו את התשתית. זמני ההשבתה ירדו ב־80%, והצוות עובד ביעילות רבה יותר.",
        avatar: "images/it4.jpg",
      },
      {
        id: 2,
        name: "שרה וויליאמס",
        role: "מנהל מוצר, EduTech Solutions",
        feedback: "שירות ההגירה לענן היה חלק. האבטחה והיכולת להתרחב השתפרו בצורה משמעותית וחסכו לנו זמן ועלויות.",
        avatar: "images/it3.jpg",
      },
      {
        id: 3,
        name: "אמיט ורמה",
        role: "מייסד HealthPlus",
        feedback: "צוות הסייבר שלהם ברמה גבוהה. אנחנו מרגישים בטוחים לגמרי בהגנה על הנתונים של המטופלים בכל המערכות.",
        avatar: "images/it5.jpg",
      }
    ],
    ctaHeading: "מוכן להצעיד את העסק שלך קדימה?",
    ctaParagraph: "התחל עכשיו עם ייעוץ חינם וגלֵה איך אנחנו יכולים לעזור לך להשיג את המטרות שלך.",
    ctaStart: "התחל את המסע שלך",
    ctaLearn: "למידע נוסף עלינו"
  },
  he: {
    pageTitle: "ForStackly - פתרונות עסקיים מקצועיים",
    hero: {
      title: "השותף המהימן שלך למצוינות IT",
      paragraph: "מעבר ענן חדשני ועד פתרונות סייבר מאובטחים — אנו מספקים שירותי IT מקצועיים שמקדמים את העסק שלך. שתף איתנו פעולה ופתח אינטגרציה טכנולוגית חלקה ומצוינות תפעולית.",
      button: "צור קשר עכשיו",
      videoSrc: "images/videoss1.mp4"
    },
    threeColCenter: {
      leftAlt: "סביבת עבודה מודרנית",
      rightAlt: "צוות מקצועי",
      centerTitle: "אם אפשר לחלום את זה — נוכל לבנות את זה.",
      centerParagraph: "אנו נוקטים גישה אישית לכל פרויקט כדי להשיג תוצאות יוצאות דופן ופונקציונליות מיטבית. בזכות ההבנה הטכנית והעבודה המשותפת, פתרונות ה־IT שלנו משנים עסקים."
    },
    servicesSection: {
      heading: "פתרונות IT מקיפים",
      paragraph: "פיתוח תוכנה מותאם, אינטגרציה עננית ואבטחת מידע — אנו מספקים שירותי IT מקצה לקצה שמאפשרים לעסק שלך לחדש, להתרחב ולהישאר מוגן בסביבה דיגיטלית מתפתחת.",
      list: [
        "פיתוח תוכנה מותאם אישית",
        "תשתית ענן & הגירה",
        "אבטחת מידע ועמידה בתקנים",
        "ייעוץ IT ואסטרטגיה",
        "שירותי IT מנוהלים",
        "ניתוח נתונים ופתרונות AI"
      ],
      button: "לכל השירותים",
      imgAlt: "שיתוף פעולה צוותי"
    },
    featuresHeading: "מעצימים את הצלחת ה־IT שלך",
    featuresSub: "שירותי IT חדשניים, מאובטחים וקלים להתרחבות, שמותאמים להצלחת העסק שלך.",
    features: [
      {
        icon: FaCloud,
        title: "הגירה לענן בקנה מידה רחב",
        description: "מעבר קל של מערכות ותשתיות לעולם הענן, לקבלת גמישות, אבטחה וזמינות מתמשכת.",
        color: "#1E90FF",
      },
      {
        icon: FaShieldAlt,
        title: "אבטחת סייבר מתקדמת",
        description: "הגנה על הנתונים שלך עם ניטור 24/7, זיהוי איומים ושירותי עמידה לתקנים, בהתאמה אישית.",
        color: "#FF4500",
      },
      {
        icon: FaRobot,
        title: "אוטומציה חכמה",
        description: "שימוש בבינה מלאכותית ואוטומציה בתהליכים לשיפור יעילות, דיוק וחדשנות בעבודה.",
        color: "#32CD32",
      },
      {
        icon: FaCogs,
        title: "פיתוח תוכנה",
        description: "פתרונות תוכנה ייחודיים שמשתלבים בקלות עם תהליכים ומקדמים צמיחה דיגיטלית ארוכת טווח.",
        color: "#F4A261",
      },
      {
        icon: FaRocket,
        title: "הטמעה מהירה",
        description: "האצת מסירת פרויקטים במינימום השבתות — בזכות שיטות אג'יליות וצוותים מקצועיים.",
        color: "#9B51E0",
      },
      {
        icon: FaPalette,
        title: "עיצוב ממשק חדשני",
        description: "הגנה על המידע שלך בזכות ניטור, זיהוי איומים ושירותי התאמה לסביבת העסק שלך.",
        color: "#6565EA",
      }
    ],
    stats: [
      { number: 120, suffix: "+", label: "פרויקטים שהושלמו", icon: FaTasks },
      { number: 80, suffix: "+", label: "לקוחות מרוצים", icon: FaUsers },
      { number: 5, suffix: "+", label: "שנות ניסיון", icon: FaBriefcase },
      { number: 15, suffix: "+", label: "מדינות בהם פעלנו", icon: FaGlobe },
    ],
    testimonialsHeading: "מה אומרים הלקוחות שלנו",
    testimonials: [
      {
        id: 1,
        name: "רָאגֵש קומאר",
        role: "CTO, FinTech Corp",
        feedback: "הייעוץ הטכנולוגי שלהם שדרג לנו את התשתית. זמני ההשבתה ירדו ב־80%, והצוות עובד ביעילות רבה יותר.",
        avatar: "images/it4.jpg",
      },
      {
        id: 2,
        name: "שרה וויליאמס",
        role: "מנהלת מוצר, EduTech Solutions",
        feedback: "שירות ההגירה לענן היה חלק. האבטחה והיכולת להתרחב השתפרו משמעותית, וחסכו לנו זמן ועלויות.",
        avatar: "images/it3.jpg",
      },
      {
        id: 3,
        name: "אמִית וֶרמָה",
        role: "מייסד, HealthPlus",
        feedback: "צוות הסייבר שלהם ברמה הגבוהה ביותר. אנו בטוחים לחלוטין בהגנה על המידע של המטופלים בכל המערכות.",
        avatar: "images/it5.jpg",
      }
    ],
    ctaHeading: "מוכן לשדרג את העסק שלך?",
    ctaParagraph: "התחיל היום עם ייעוץ חינם וגלֵה איך נוכל לעזור לך להגיע ליעדים שלך.",
    ctaStart: "התחל את הדרך שלך",
    ctaLearn: "למידע נוסף עלינו"
  }
};

const FeatureCard = ({ Icon, title, description, color, delay, learnText }) => (
  <motion.div
    className="rounded-2xl p-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 cursor-pointer transition-shadow transition-transform min-h-[390px]"
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    viewport={{ once: true }}
    whileHover={{
      scale: 1.045,
      boxShadow: `0 8px 32px 0 ${color}40, 0 4px 24px 0 rgba(0,0,0,0.16)`
    }}
  >
    <div className="bg-[var(--card-bg)] text-[var(--text-color)] rounded-[1rem] p-10 shadow-lg flex flex-col items-center text-center min-h-[386px]">
      <motion.div
        className="rounded-full w-24 h-24 flex items-center justify-center mb-7 text-white filter drop-shadow-lg"
        style={{ backgroundColor: color }}
        whileHover={{ scale: 1.15, filter: "drop-shadow(0 0 15px currentColor)" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Icon size={32} />
      </motion.div>
      <h3 className="text-2xl font-extrabold mb-5">{title}</h3>
      <p className="text-lg text-[var(--text-muted)] mb-8 leading-relaxed flex-grow">{description}</p>
      <Link to="/services" className="text-[var(--primary-color)] font-semibold inline-flex items-center gap-2 transition-colors hover:text-[var(--accent-color)] hover:translate-x-3">
        {learnText} <FaArrowRight />
      </Link>
    </div>
  </motion.div>
);

const Home1 = () => {
  const { language } = useLanguage() || { language: "en" };
  const t = translations[language] || translations.en;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    document.title = t.pageTitle;
    document.documentElement.dir = ["ar", "he"].includes(language) ? "rtl" : "ltr";
  }, [language, t.pageTitle]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % t.testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [t.testimonials.length]);

  const handlePrev = () => setIndex((prev) => (prev - 1 + t.testimonials.length) % t.testimonials.length);
  const handleNext = () => setIndex((prev) => (prev + 1) % t.testimonials.length);

  // Choose "Learn More" translation
  const learnTexts = { en: "Learn More", ar: "تعرف على المزيد", he: "למידע נוסף" };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <video autoPlay muted loop playsInline className="hero-bg-video">
          <source src={t.hero.videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title animate-slide-in">{t.hero.title}</h1>
            <p className="hero-paragraph animate-fade-up">{t.hero.paragraph}</p>
            <Link to="/contact" className="hero-button animate-fade-up-delayed">
              {t.hero.button}
            </Link>
          </div>
        </div>
      </section>
      {/* Three Column Section */}
      <style>{`
        @keyframes float-card {
          0% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0); }
        }
        .animate-float-card {
          animation: float-card 3.5s ease-in-out infinite;
        }
      `}</style>
      <section className="w-full py-16 md:py-24 bg-[var(--bg-color)] flex items-center justify-center transition-colors duration-300">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 px-4">
          {/* Left Floating Image */}
          <div className="w-full md:flex-1 flex justify-center mb-8 md:mb-0">
            <div className="bg-[var(--sidebar-bg)] rounded-2xl shadow-[0_10px_40px_rgba(30,64,175,0.18),0_1.5px_6px_rgba(0,0,0,0.17)] p-2 transition-transform duration-500 hover:-translate-y-4 hover:scale-105 relative animate-float-card">
              <img
                src="images/it1.jpg"
                alt={t.threeColCenter.leftAlt}
                className="rounded-2xl object-cover w-full max-w-xs h-40 md:w-[260px] md:h-[180px] shadow-md"
              />
            </div>
          </div>
          {/* Center Card */}
          <div className="w-full md:max-w-md flex flex-col items-center justify-center px-5 py-8 md:px-9 md:py-12 bg-[var(--card-bg)] rounded-2xl shadow-2xl text-center mx-0 md:mx-4 mb-8 md:mb-0">
            <span className="inline-block w-3 h-3 rotate-45 bg-[var(--primary-color)] mb-5"></span>
            <h2 className="text-xl md:text-2xl font-semibold text-[var(--heading-color)] mb-6">
              {t.threeColCenter.centerTitle}
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed text-justify">
              {t.threeColCenter.centerParagraph}
            </p>
          </div>
          {/* Right Floating Image */}
          <div className="w-full md:flex-1 flex justify-center">
            <div className="bg-[var(--sidebar-bg)] rounded-2xl shadow-[0_10px_40px_rgba(30,64,175,0.18),0_1.5px_6px_rgba(0,0,0,0.17)] p-2 transition-transform duration-500 hover:-translate-y-4 hover:scale-105 relative animate-float-card">
              <img
                src="images/it2.jpg"
                alt={t.threeColCenter.rightAlt}
                className="rounded-2xl object-cover w-full max-w-xs h-40 md:w-[260px] md:h-[180px] shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="section-preview">
        <div className="container">
          <div className="grid-2">
            <motion.div
              className="services"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2>{t.servicesSection.heading}</h2>
              <p>{t.servicesSection.paragraph}</p>
              <ul className="section-list">
                {t.servicesSection.list.map((text, i) => (
                  <li key={i}>
                    <FaCheck /> {text}
                  </li>
                ))}
              </ul>
              <div className="section-btn-container">
                <Link to="/services" className="btn">
                  {t.servicesSection.button}
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="services-visual"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="section-image">
                <img src="images/freelancer2.jpg" alt={t.servicesSection.imgAlt}/>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="bg-[var(--sidebar-bg)] py-16 lg:py-20">
        <div className="max-w-screen-xl mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-extrabold tracking-wide mb-5 text-[var(--heading-color)]">
              {t.featuresHeading}
            </h2>
            <p className="text-lg font-medium leading-relaxed text-[var(--text-muted)] max-w-xl mx-auto">
              {t.featuresSub}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {t.features.map(({ icon, title, description, color }, index) => (
              <FeatureCard
                key={title}
                Icon={icon}
                title={title}
                description={description}
                color={color}
                delay={index * 0.15}
                learnText={learnTexts[language] || learnTexts.en}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section
        ref={ref}
        className="bg-gradient-to-br from-indigo-700 via-blue-600 to-blue-500 text-white py-20 min-h-[380px] flex items-center"
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {t.stats.map(({ number, suffix, label, icon: Icon }, idx) => (
              <motion.div
                key={label}
                className="bg-white bg-opacity-10 rounded-full py-10 flex flex-col items-center justify-center shadow-lg hover:scale-105 hover:bg-opacity-20 transition duration-300 cursor-pointer"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                whileHover={{ scale: 1.08, boxShadow: "0 12px 25px rgba(255, 255, 255, 0.6)" }}
              >
                <Icon className="text-6xl mb-6 drop-shadow-md" />
                <h3 className="text-5xl font-extrabold leading-none">
                  {inView ? (
                    <CountUp start={0} end={number} duration={2.5} separator="," />
                  ) : (
                    0
                  )}
                  {suffix}
                </h3>
                <p className="mt-2 text-xl font-semibold tracking-wide">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <div className="w-full max-w-3xl mx-auto text-center py-10 px-4">
        <h2
          className="text-3xl font-bold mb-6"
          style={{ color: "var(--primary-color)" }}
        >
          {t.testimonialsHeading}
        </h2>
        <div
          className="relative rounded-2xl p-8 shadow-lg"
          style={{
            background: "var(--card-bg)",
            color: "var(--text-color)"
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={t.testimonials[index].id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={t.testimonials[index].avatar}
                alt={t.testimonials[index].name}
                className="w-20 h-20 rounded-full mx-auto mb-4 border-4"
                style={{
                  borderColor: "var(--primary-color)"
                }}
              />
              <p
                className="text-lg italic mb-4"
                style={{ color: "var(--text-color)" }}
              >
                “{t.testimonials[index].feedback}”
              </p>
              <h3
                className="mt-4 font-bold text-xl"
                style={{ color: "var(--text-color)" }}
              >
                {t.testimonials[index].name}
              </h3>
              <p
                className="text-base"
                style={{ color: "var(--text-muted)" }}
              >
                {t.testimonials[index].role}
              </p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between mt-8 px-2">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M14 17L9 12L14 7" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M8 17L13 12L8 7" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
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
              <p>
                {t.ctaParagraph}
              </p>
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

        {/*features-section */}


        {/* About Me Section */}

        .aboutme-section {
          padding: 60px 0;
          background: #142133;
          color: #f3f6fb;
          font-family: 'Segoe UI',Arial,sans-serif;
        }
        .aboutme-container {
          max-width: 1050px;
          margin: 0 auto;
          padding: 0 22px;
        }
        .aboutme-heading {
          text-align: center;
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 18px;
          letter-spacing: 1px;
        }
        .aboutme-intro {
          max-width: 780px;
          margin: 0 auto 48px;
          color: #d1dae2;
          line-height: 1.7;
          font-size: 1.23rem;
          text-align: center;
        }
        .aboutme-grid {
          display: flex;
          gap: 62px;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }
        .aboutme-photo-col {
          flex: 1 1 340px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 260px;
        }
        .aboutme-glow {
          width: 340px;
          height: 340px;
          background: #16202e;
          border-radius: 50%;
  display: flex;
  align-items: center;
}

{/*stats section*/}



{/* Services Section */}




/* Section heading */

.section-preview {
  padding: 70px 0;
}
.section-preview .services h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary-heading-color);
  text-align: left; /* Keep heading left-aligned */
}

/* Paragraph text */
.section-preview .services p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: var(--secondary-text-color);
  text-align: justify; /* ✅ Text justified */
}

/* List container */
.section-preview .section-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
}

/* List items */
.section-preview .section-list li {
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: var(--primary-text-color);
  width: calc(50% - 1rem);
  text-align: left; /* Keep list items aligned left */
}

/* Icon inside list item */
.section-preview .section-list li svg {
  color: var(--accent-color);
  margin-right: 0.5rem;
  flex-shrink: 0;
}

/* Responsive full width list items on small screens */
@media (max-width: 576px) {
  .section-preview .section-list li {
    width: 100%;
    text-align: left;
  }
}

/* Button container */
.section-preview .section-btn-container {
  margin-top: 2rem;
  text-align: left;
}

/* Button style */
.section-preview .btn,
.section-preview .view-all-btn,
.section-preview .view-btn {
  background-color: var(--primary-color);
  color: var(--bg-color); /* adaptive text color */
  padding: 0.8rem 2rem;
  border-radius: 0px;
  text-decoration: none;
  font-weight: 600;
  border: none;
  transition:
    background-color 0.2s ease,
    transform 0.16s cubic-bezier(.19,1,.22,1),
    box-shadow 0.18s;
  display: inline-block;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.10);
  cursor: pointer;
}

/* Button hover and focus */
.section-preview .btn:hover,
.section-preview .view-all-btn:hover,
.section-preview .view-btn:hover,
.section-preview .btn:focus,
.section-preview .view-all-btn:focus,
.section-preview .view-btn:focus {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
  color: var(--bg-color);
  outline: none;
}

/* Visual container for image */
.section-preview .services-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Image wrapper */
.section-preview .section-image {
  width: 100%;
  max-width: 550px;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s ease;
}

/* Image hover effect */
.section-preview .section-image:hover {
  transform: scale(1.02);
}

/* Image itself */
.section-preview .section-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 12px;
}

/* ============= RESPONSIVE ============= */

/* Tablet (≤ 992px) */
@media (max-width: 992px) {
  .section-preview .services h2 {
    text-align: left; /* Keep heading left-aligned */
  }

  .section-preview .services p {
    text-align: justify; /* Maintain justified text */
    margin-left: auto;
    margin-right: auto;
  }

  .section-preview .section-btn-container {
    text-align: left;
  }
}

/* Mobile (≤ 576px) */
@media (max-width: 576px) {
  .section-preview .services h2 {
    font-size: 1.6rem;
    text-align: left; /* Heading left-aligned */
  }

  .section-preview .services p {
    font-size: 1rem;
    line-height: 1.6;
    text-align: justify; /* Maintain justified text */
  }

  .section-preview .section-btn-container {
    text-align: left;
  }

  .section-preview .section-list li {
    width: 100%;
    text-align: left;
  }
}


{/* Testimonials Section */}

    
{/* cta section */}

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
  .btn-primary, .btn-outline, .btn-large {
  display: inline-flex;           /* Ensures horizontal layout! */
  align-items: center;            /* Vertically centers content */
  justify-content: center;        /* Centers content horizontally */
  gap: 8px;                       /* Space between text and icon */
}

.btn-primary svg {
  font-size: 1.3rem;
  vertical-align: middle;
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


        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
            .services-content h2 {
          font-size: 0.9rem;
          margin-bottom: 20px;
          margin-left: -20px;
        }

        .services-content p {
          font-size: 0.9rem;
          line-height: 1.6;
          text-align: justify;
          margin-bottom: 30px;
          color: var(--text-color);
        }

          .hero-text h1 {
            font-size: 2.5rem;
          }
            .section-header h2 {
          font-size: 1.9rem;
          margin-bottom: 15px;
        }
          .cta-content h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color:#fff;
}

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .hero-buttons,
          .cta-buttons {
            justify-content: center;
          }

          .services-content {
            text-align: center;
            margin-bottom: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home1;
