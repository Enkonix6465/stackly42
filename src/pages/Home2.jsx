import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  FaCogs, FaProjectDiagram, FaHeadset, FaRocket, FaUsers, FaAward,
  FaChartLine, FaArrowRight,FaCheckCircle, FaPlay
} from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useLanguage } from "../context.jsx/LanguageContext";

// --- Centralized full-section i18n translations ---
const translations = {
  en: {
    pageTitle: "Home Alternative - ForStackly Business Solutions",
    hero: {
      title: "Transforming Technology to Power Your Success",
      paragraph: "We specialize in scalable technology services that streamline your operations, enhance security, and empower digital transformation. Partner with us to unlock your IT potential and accelerate success.",
      button: "Reach Out Today",
    },
    servicesSection: {
      heading: "Our IT Services",
      button: "View All Services",
      items: [
        { serviceId: 1, title: "Cloud Solutions", desc: "Seamless migration, deployment, and management of secure cloud environments.", img: "images/it6.jpg" },
        { serviceId: 2, title: "Cybersecurity", desc: "Advanced security measures to protect your data, networks, and applications.", img: "images/it7.jpg" },
        { serviceId: 3, title: "IT Consulting", desc: "Expert guidance to optimize your IT infrastructure and align it with business goals.", img: "images/it8.jpg" },
        { serviceId: 4, title: "AI & Automation", desc: "Leverage AI-driven insights and automate workflows for smarter operations.", img: "images/it9.jpg" },
        { serviceId: 5, title: "Managed IT Support", desc: "Proactive monitoring, troubleshooting, and 24/7 support for smooth operations.", img: "images/it10.jpg" },
        { serviceId: 6, title: "Software Development", desc: "Custom software solutions to build scalable and efficient applications tailored to your needs.", img: "images/it11.jpg" }
      ]
    },
    featured: {
      heading: "Experience The Power of IT Innovation",
      paragraph: "From seamless cloud migration to 24/7 tech support, we deliver cutting-edge IT services that drive efficiency, scalability, and business growth.",
      features: [
        { strong: "Cloud Transformation", desc: "Secure and scalable cloud solutions tailored for your business." },
        { strong: "Cybersecurity", desc: "Advanced protection against threats with proactive monitoring." },
        { strong: "Managed IT Support", desc: "24/7 support to keep your systems running smoothly." },
      ]
    },
    consulting: {
      leftCards: [
        { icon: FaCogs, title: "Idea Generation", desc: "Innovative IT solutions crafted to accelerate business growth." },
        { icon: FaProjectDiagram, title: "System Design", desc: "Tailored architecture and development for scalable IT systems." },
        { icon: FaHeadset, title: "24/7 Support", desc: "Round-the-clock IT support to keep your business running smoothly." },
        { icon: FaChartLine, title: "Sales Growth", desc: "Data-driven IT strategies that maximize ROI and market reach." }
      ],
      heading: "The Fastest Way To Achieve ",
      colored: "Technology Consulting",
      desc: "For growing businesses seeking reliable partners, we deliver innovative consulting strategies to boost efficiency, ensure cybersecurity, and accelerate transformation. Collaborate with experts to create scalable, future-proof digital solutions.",
      knowMore: "Know More"
    },
    eventsSection: {
      titleMain: "Explore Our",
      titleSub: "Services",
      selectCat: "Select Service Category",
      selectIndustry: "Select Industry / Business Type",
      selectLoc: "Select Location / Region",
      categories: [
        "Cloud Solutions", "Cybersecurity", "AI & Automation",
        "Software Development", "IT Consulting", "Managed IT Support"
      ],
      industries: [
        "Healthcare", "Finance", "Education",
        "Retail & E-commerce", "Manufacturing", "Startups / SMBs"
      ],
      locations: [
        "Global", "USA", "Europe", "Asia-Pacific", "Middle East"
      ],
      noResults: "No matching services found. Try adjusting your filters.",
      loadMore: "Load More",
      items: [
        {
          img: "images/it13.jpg",
          title: "Strategic Cloud Adoption Masterclass",
          cat: "Cloud Solutions", industry: "Finance", location: "Global",
          desc: "Transform your IT landscape with enterprise-grade cloud adoption strategies optimizing security, governance, and scalability."
        },
        {
          img: "images/it14.jpg",
          title: "Next-Gen Cyber Defense Workshop",
          cat: "Cybersecurity", industry: "Healthcare", location: "USA",
          desc: "Learn to implement proactive threat hunting and AI-powered defense systems to safeguard critical digital assets."
        },
        {
          img: "images/it15.jpg",
          title: "AI-Driven Process Automation Summit",
          cat: "AI & Automation", industry: "Manufacturing", location: "Europe",
          desc: "Unlock business efficiency by integrating intelligent automation workflows using leading AI frameworks."
        },
        {
          img: "images/it16.jpg",
          title: "DataOps: Revolutionizing Data Lifecycle Management",
          cat: "Software Development", industry: "Startups / SMBs", location: "Asia-Pacific",
          desc: "Gain hands-on experience designing scalable data pipelines and real-time analytics for data-driven enterprise decisions."
        },
        {
          img: "images/it17.jpg",
          title: "Progressive Frontend Architectures Workshop",
          cat: "IT Consulting", industry: "Retail & E-commerce", location: "Middle East",
          desc: "Master advanced frontend patterns and optimize user experiences with modern SPA frameworks and tooling."
        },
        {
          img: "images/it18.jpg",
          title: "DevSecOps Integration Bootcamp",
          cat: "Managed IT Support", industry: "Finance", location: "Europe",
          desc: "Embed security into your CI/CD pipelines for rapid, risk-aware software releases aligned with compliance standards."
        }
      ]
    },
    statsSection: [
      { num: "500+", text: "Projects Completed", icon: FaRocket },
      { num: "200+", text: "Happy Clients", icon: FaUsers },
      { num: "50+", text: "Awards Won", icon: FaAward },
      { num: "99%", text: "Success Rate", icon: FaChartLine }
    ],
    graph: {
      heading: "Driving Growth with IT Solutions",
      desc: "Our IT services deliver measurable outcomes: higher uptime, faster deployments, happier customers, and real cost savings. Explore how our solutions fuel business performance."
    },
    finalData: [
      { name: "Cloud Uptime", value: 99 },
      { name: "Customer Satisfaction", value: 95 },
      { name: "Faster Deployments", value: 85 },
      { name: "Cost Savings", value: 75 },
    ],
    videos: [
      {
        thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
        src: "images/video1.mp4",
        alt: "IT Services Video 1",
      },
      {
        thumbnail: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=400&q=80",
        src: "images/video2.mp4",
        alt: "IT Services Video 2",
      }
    ],
    cta: {
      h2: "Ready to Transform Your Business?",
      p: "Get started today with a free consultation and discover how we can help you achieve your goals.",
      btn1: "Start Your Journey",
      btn2: "Learn More About Us"
    }
  },
  ar: {
    pageTitle: "الرئيسية - فورستاكلي أعمال وتقنية",
    hero: {
      title: "نحو تحول رقمي متكامل يدعم نجاحك",
      paragraph: "نقدم خدمات تقنية قابلة للتوسع تعزز التشغيل والأمان والتحول الرقمي. تعاون معنا لفتح إمكانيات تقنية المعلومات وتسريع تقدم أعمالك.",
      button: "تواصل اليوم",
    },
    servicesSection: {
      heading: "خدمات تقنية المعلومات",
      button: "عرض جميع الخدمات",
      items: [
        { serviceId: 1, title: "حلول السحابة", desc: "نقل ونشر وإدارة بيئات السحابة بأمان.", img: "images/it6.jpg" },
        { serviceId: 2, title: "الأمن السيبراني", desc: "إجراءات أمنية متقدمة لحماية البيانات والشبكات.", img: "images/it7.jpg" },
        { serviceId: 3, title: "استشارات تقنية", desc: "توجيه فني لتحسين بنية تقنية المعلومات.", img: "images/it8.jpg" },
        { serviceId: 4, title: "ذكاء صناعي وأتمتة", desc: "تحليل وأتمتة ذكية للتشغيل الأمثل.", img: "images/it9.jpg" },
        { serviceId: 5, title: "دعم فني مدار", desc: "مراقبة وصيانة على مدار الساعة لضمان الاستمرارية.", img: "images/it10.jpg" },
        { serviceId: 6, title: "تطوير برمجيات", desc: "تصميم برمجيات مرنة تلبي احتياجاتك بنجاح.", img: "images/it11.jpg" }
      ]
    },
    featured: {
      heading: "اكتشف قوة ابتكار التقنية",
      paragraph: "من ترحيل سحابي سلس حتى الدعم الفني الدائم، نقدم حلول تقنية حديثة تدعم النمو والكفاءة.",
      features: [
        { strong: "تحول سحابي", desc: "حلول مخصصة آمنة وقابلة للتوسع." },
        { strong: "أمن سيبراني", desc: "توفر حماية متقدمة ومراقبة مستمرة للتهديدات." },
        { strong: "دعم فني مدار", desc: "دعم فني دائم لضمان استمرار عمل الأنظمة." },
      ]
    },
    consulting: {
      leftCards: [
        { icon: FaCogs, title: "توليد الأفكار", desc: "حلول تقنية مبتكرة لتعزيز نمو الأعمال." },
        { icon: FaProjectDiagram, title: "تصميم الأنظمة", desc: "بنية تطورية للتوسع وتحقيق الأهداف." },
        { icon: FaHeadset, title: "دعم فني دائم", desc: "دعم على مدار الساعة لراحة الأعمال." },
        { icon: FaChartLine, title: "نمو المبيعات", desc: "تحليلات تحقق أعلى عائد واستهداف." }
      ],
      heading: "أسرع طريق لتحقيق ",
      colored: "استشارات تقنية",
      desc: "للشركات الطموحة نقدم استشارات تقنية ترفع الكفاءة وتسرع التحول الرقمي. تعاون مع الخبراء لبناء حلول مستقبلية آمنة.",
      knowMore: "اعرف المزيد"
    },
    eventsSection: {
      titleMain: "اكتشف",
      titleSub: "خدماتنا",
      selectCat: "اختر نوع الخدمة",
      selectIndustry: "اختر الصناعة",
      selectLoc: "اختر الموقع",
      categories: [
        "حلول السحابة", "الأمن السيبراني", "ذكاء صناعي وأتمتة",
        "تطوير برمجيات", "استشارات تقنية", "دعم فني مدار"
      ],
      industries: [
        "صحة", "مالية", "تعليم", "تجارة الكترونية", "تصنيع", "شركات ناشئة"
      ],
      locations: [
        "عالمي", "أمريكا", "أوروبا", "آسيا", "الشرق الأوسط"
      ],
      noResults: "لا توجد نتائج مطابقة. حاول تغيير الفلاتر.",
      loadMore: "إظهار المزيد",
      items: [
        { img: "images/it13.jpg", title: "ندوة استراتيجيات السحابة", cat: "حلول السحابة", industry: "مالية", location: "عالمي", desc: "استراتيجيات انتقال إلى السحابة آمنة وفعالة." },
        { img: "images/it14.jpg", title: "ورشة دفاع سيبراني", cat: "الأمن السيبراني", industry: "صحة", location: "أمريكا", desc: "تعلم طرق الحماية الحديثة ضد التهديدات الرقمية." },
        { img: "images/it15.jpg", title: "قمة أتمتة العمليات الذكية", cat: "ذكاء صناعي وأتمتة", industry: "تصنيع", location: "أوروبا", desc: "كفاءات وتكاملات ذكاء صناعي متقدمة." },
        { img: "images/it16.jpg", title: "إدارة بيانات حديثة", cat: "تطوير برمجيات", industry: "شركات ناشئة", location: "آسيا", desc: "تصميم خطوط بيانات وتحليلات متقدمة." },
        { img: "images/it17.jpg", title: "تطوير الواجهات الحديثة", cat: "استشارات تقنية", industry: "تجارة الكترونية", location: "الشرق الأوسط", desc: "تقنيات واجهات وتجارب متطورة." },
        { img: "images/it18.jpg", title: "معسكر DevSecOps", cat: "دعم فني مدار", industry: "مالية", location: "أوروبا", desc: "دمج الأمان في خطوط النشر بسرعة وفعالية." }
      ]
    },
    statsSection: [
      { num: "500+", text: "مشروعات مكتملة", icon: FaRocket },
      { num: "200+", text: "عملاء سعداء", icon: FaUsers },
      { num: "50+", text: "جوائز", icon: FaAward },
      { num: "99%", text: "نسبة النجاح", icon: FaChartLine }
    ],
    graph: {
      heading: "نمو من خلال حلول تقنية المعلومات",
      desc: "خدماتنا تحقق نتائج ملموسة: توافر أعلى، نشر أسرع، عملاء أكثر رضاً وتوفير بالتكاليف."
    },
    finalData: [
      { name: "استقرار السحابة", value: 99 },
      { name: "رضا العملاء", value: 95 },
      { name: "سرعة النشر", value: 85 },
      { name: "التوفير", value: 75 },
    ],
    videos: [
      {
        thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
        src: "images/video1.mp4",
        alt: "فيديو 1 للخدمات التقنية",
      },
      {
        thumbnail: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=400&q=80",
        src: "images/video2.mp4",
        alt: "فيديو 2 للخدمات التقنية",
      }
    ],
    cta: {
      h2: "جاهز لتحويل أعمالك؟",
      p: "ابدأ باستشارة مجانية واكتشف كيف نحقق طموحاتك.",
      btn1: "ابدأ رحلتك",
      btn2: "اعرف المزيد عنا"
    }
  },
  he: {
    pageTitle: "דף הבית - פורסטקליי לעסקים",
    hero: {
      title: "הופכים טכנולוגיה להצלחה שלך",
      paragraph: "אנו מתמחים בשירותי טכנולוגיה גמישים שמייעלים תהליכים, מגבירים אבטחה ומקדמים את מעבר העסק לדיגיטל.",
      button: "צור קשר עכשיו",
    },
    servicesSection: {
      heading: "שירותי IT שלנו",
      button: "הצג את כל השירותים",
      items: [
        { serviceId: 1, title: "פתרונות ענן", desc: "הגירה, הטמעה וניהול סביבת ענן מאובטחת.", img: "images/it6.jpg" },
        { serviceId: 2, title: "אבטחת סייבר", desc: "הגנות מתקדמות על נתונים, רשתות ואפליקציות.", img: "images/it7.jpg" },
        { serviceId: 3, title: "ייעוץ IT", desc: "הכוונה ושיפור תשתית IT לשיפור יעדי העסק.", img: "images/it8.jpg" },
        { serviceId: 4, title: "בינה מלאכותית ואוטומציה", desc: "תובנות ואוטומציה מבוססות AI לתפעול חכם.", img: "images/it9.jpg" },
        { serviceId: 5, title: "תמיכה מנוהלת ב-IT", desc: "ניטור ותחזוקה שוטפים לפעילות חלקה.", img: "images/it10.jpg" },
        { serviceId: 6, title: "פיתוח תוכנה", desc: "פיתוח אפליקציות גמישות ויעילות מותאמות צורך.", img: "images/it11.jpg" }
      ]
    },
    featured: {
      heading: "חווה את עוצמת החדשנות הטכנולוגית",
      paragraph: "החל מהגירת ענן חלקה ועד תמיכה טכנית 24/7, אנו מציעים שירותי IT מתקדמים לקידום העסק.",
      features: [
        { strong: "טרנספורמציית ענן", desc: "פתרונות ענן בטוחים ומותאמים לעסק." },
        { strong: "אבטחת סייבר", desc: "הגנה מקיפה ואקטיבית על העסק." },
        { strong: "תמיכה מנוהלת", desc: "תמיכה סביב השעון למערכות יציבות." },
      ]
    },
    consulting: {
      leftCards: [
        { icon: FaCogs, title: "פיתוח רעיונות", desc: "פתרונות חדשניים להגברת צמיחה עסקית." },
        { icon: FaProjectDiagram, title: "תכנון מערכות", desc: "פיתוח תשתית ותהליכים מותאמים ומתרחבים." },
        { icon: FaHeadset, title: "תמיכה 24/7", desc: "תמיכה מתמדת לשימוש שוטף וללא תקלות." },
        { icon: FaChartLine, title: "צמיחה במכירות", desc: "אסטרטגיות דיגיטליות להגדלת החזר כספי וצמיחה." }
      ],
      heading: "הדרך המהירה ל-",
      colored: "ייעוץ טכנולוגי",
      desc: "לעסקים מתפתחים אנו מספקים ייעוץ שיקדם יעילות, אבטחה וצמיחה דיגיטלית. שתף פעולה עם המומחים לפתרונות לעתיד.",
      knowMore: "למידע נוסף"
    },
    eventsSection: {
      titleMain: "גלה את",
      titleSub: "השירותים",
      selectCat: "בחר סוג שירות",
      selectIndustry: "בחר תחום עיסוק",
      selectLoc: "בחר אזור",
      categories: [
        "פתרונות ענן", "אבטחת סייבר", "בינה מלאכותית ואוטומציה",
        "פיתוח תוכנה", "ייעוץ IT", "תמיכה מנוהלת ב-IT"
      ],
      industries: [
        "בריאות", "פיננסים", "חינוך", "קמעונאות וסחר", "תעשייה", "סטארטאפים"
      ],
      locations: [
        "גלובלי", "ארה\"ב", "אירופה", "אסיה-פסיפיק", "המזרח התיכון"
      ],
      noResults: "לא נמצאו שירותים מתאימים. נסה לשנות הגדרות.",
      loadMore: "הצג עוד",
      items: [
        { img: "images/it13.jpg", title: "מאסטרקלאס לאימוץ ענן אסטרטגי", cat: "פתרונות ענן", industry: "פיננסים", location: "גלובלי", desc: "אימוץ יכולות ענן ואבטחה מתקדמת לעסק." },
        { img: "images/it14.jpg", title: "סדנת הגנה קיברנטית חדשה", cat: "אבטחת סייבר", industry: "בריאות", location: "ארה\"ב", desc: "הגנה וניהול מתקדם במשאבי מידע דיגיטלי." },
        { img: "images/it15.jpg", title: "סבב אוטומציה מבוסס AI", cat: "בינה מלאכותית ואוטומציה", industry: "תעשייה", location: "אירופה", desc: "ייעול עבודה ובינה עסקית באמצעות אוטומציה." },
        { img: "images/it16.jpg", title: "ניהול מחזור חיים של דאטה", cat: "פיתוח תוכנה", industry: "סטארטאפים", location: "אסיה-פסיפיק", desc: "תפעול קווים חכמים לחלוקה וניתוח בזמן אמת לעסק." },
        { img: "images/it17.jpg", title: "סדנת ארכיטקטורת פרונטנד מתקדמת", cat: "ייעוץ IT", industry: "קמעונאות וסחר", location: "המזרח התיכון", desc: "שיפור חוויית משתמש ובניית ממשקים חכמים." },
        { img: "images/it18.jpg", title: "Bootcamp DevSecOps", cat: "תמיכה מנוהלת ב-IT", industry: "פיננסים", location: "אירופה", desc: "הטמעת אבטחה בתהליכי פיתוח לשחרור מהיר ומאובטח." }
      ]
    },
    statsSection: [
      { num: "500+", text: "פרויקטים שהושלמו", icon: FaRocket },
      { num: "200+", text: "לקוחות מרוצים", icon: FaUsers },
      { num: "50+", text: "פרסים", icon: FaAward },
      { num: "99%", text: "שיעור הצלחה", icon: FaChartLine }
    ],
    graph: {
      heading: "צמיחה בעסק עם פתרונות IT",
      desc: "השירותים שלנו מביאים זמינות גבוהה, פריסה מהירה ולקוחות מרוצים. בוא לראות איך פתרונות אלו דוחפים את העסק קדימה."
    },
    finalData: [
      { name: "זמינות ענן", value: 99 },
      { name: "שביעות רצון", value: 95 },
      { name: "הטמעות מהירות", value: 85 },
      { name: "חיסכון", value: 75 },
    ],
    videos: [
      {
        thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
        src: "images/video1.mp4",
        alt: "סרטון שירותי IT 1",
      },
      {
        thumbnail: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=400&q=80",
        src: "images/video2.mp4",
        alt: "סרטון שירותי IT 2",
      }
    ],
    cta: {
      h2: "מוכן לשדרג את העסק שלך?",
      p: "התחל בייעוץ חינם וגלה כיצד לעזור לעסק שלך להגיע להצלחה.",
      btn1: "התחל מסע",
      btn2: "למידע נוסף עלינו"
    }
  }
};

// --- COMPONENT START ---
const Home2 = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  // Section data driven by translations
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [chartData, setChartData] = useState(t.finalData.map(item => ({ ...item, value: 0 })));
  const [playingIndex, setPlayingIndex] = useState(null);
  const [selectedServiceCategory, setSelectedServiceCategory] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    document.title = t.pageTitle;
    setChartData(t.finalData.map(item => ({ ...item, value: 0 })));
  }, [t.pageTitle, t.finalData]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setChartData(t.finalData);
      t.finalData.forEach((item, i) => {
        let start = 0;
        const end = item.value;
        const step = Math.ceil(end / 40);
        const interval = setInterval(() => {
          start += step;
          if (start >= end) {
            start = end;
            clearInterval(interval);
          }
          setCounts(prev => {
            const copy = [...prev];
            copy[i] = start;
            return copy;
          });
        }, 40);
      });
    }, 400);
    return () => clearTimeout(timeout);
  }, [t.finalData]);

  // Filter events using selected filters and translations
  const filteredEvents = t.eventsSection.items.filter(evt => {
    const matchC = selectedServiceCategory ? evt.cat === selectedServiceCategory : false;
    const matchI = selectedIndustry ? evt.industry === selectedIndustry : false;
    const matchL = selectedLocation ? evt.location === selectedLocation : false;
    if (!selectedServiceCategory && !selectedIndustry && !selectedLocation) return true;
    return matchC || matchI || matchL;
  });
  const visibleEvents = filteredEvents.slice(0, visibleCount);

  const handleLoadMore = () => {
    if (visibleCount >= filteredEvents.length) {
      alert(t.eventsSection.noResults);
      return;
    }
    setVisibleCount(prev => Math.min(prev + 3, filteredEvents.length));
  };

  return (
    <div className="home2-page">
      {/* Hero */}
      <section className="hero-section">
        <video autoPlay muted loop playsInline className="hero-bg-video">
          <source src="images/videoss2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title animate-slide-in">{t.hero.title}</h1>
            <p className="hero-paragraph animate-fade-up">{t.hero.paragraph}</p>
            <Link to="/contact" className="hero-button animate-fade-up-delayed">{t.hero.button}</Link>
          </div>
        </div>
      </section>

      {/* IT Services */}
      <section className="py-16 px-6 min-h-screen" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold" style={{ color: "var(--heading-color)" }}>{t.servicesSection.heading}</h2>
            <Link to="/services" className="text-sm px-6 py-2 rounded-full font-medium">{t.servicesSection.button}</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.servicesSection.items.map(service => (
              <div key={service.serviceId} className="relative rounded-3xl overflow-hidden shadow-lg group transition" style={{ boxShadow: "var(--shadow)", backgroundColor: "var(--card-bg)" }}>
                <img src={service.img} alt={service.title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)" }} aria-hidden="true" />
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: "white" }}>{service.title}</h3>
                  <p className="text-sm" style={{ color: "white" }}>{service.desc}</p>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <Link to="/services" aria-label={`Explore ${service.title}`} className="bg-black p-2 rounded-full flex items-center justify-center"><ArrowUpRight className="h-5 w-5" style={{ color: "white" }} /></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features/Video */}
      <section className="bg-[var(--bg-color)] py-16 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 text-[var(--text-color)]">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold leading-snug text-[var(--heading-color)]">{t.featured.heading}</h2>
          <p className="text-[var(--text-muted)]">{t.featured.paragraph}</p>
          <ul className="space-y-4">
            {t.featured.features.map((item, idx) => (
              <li className="flex items-start gap-3" key={idx}>
                <FaCheckCircle className="text-[var(--primary-color)] mt-1 flex-shrink-0" />
                <span><strong>{item.strong}</strong> – {item.desc}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:w-1/2 relative rounded-2xl overflow-hidden shadow-xl" style={{ boxShadow: "var(--shadow)" }}>
          <img src="images/it12.jpg" alt="IT Services Main" className="w-full h-[400px] object-cover rounded-2xl" />
          <div className="absolute bottom-4 left-4 flex gap-4">
            {t.videos.map((video, idx) => (
              <div key={idx} className="relative w-40 h-24 rounded-lg overflow-hidden shadow-lg" style={{ boxShadow: "var(--shadow-light)" }}>
                {playingIndex === idx ? (
                  <video src={video.src} className="w-full h-full object-cover" controls autoPlay onEnded={() => setPlayingIndex(null)} />
                ) : (
                  <>
                    <img src={video.thumbnail} alt={video.alt} className="w-full h-full object-cover cursor-pointer" onClick={() => setPlayingIndex(idx)} />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer" onClick={() => setPlayingIndex(idx)}>
                      <FaPlay className="text-white text-lg" />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consulting */}
<section>
  <div
    className="flex flex-col md:flex-col lg:flex-row items-center justify-between py-16 px-4 sm:px-8 md:px-12 gap-12"
    style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
  >
    {/* Cards Grid */}
    <div className="w-full lg:w-1/2 order-1 md:order-1 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 mb-8 lg:mb-0">
      {t.consulting.leftCards.map(({ icon: Icon, title, desc }, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 1 : -1 }}
          whileTap={{ scale: 0.97 }}
          className="p-6 rounded-xl cursor-pointer transition-shadow text-center sm:text-left h-full flex flex-col"
          style={{ backgroundColor: "var(--card-bg)", boxShadow: "var(--shadow)" }}
        >
          <Icon
            className="mx-auto sm:mx-0 mb-4"
            style={{
              color: "var(--primary-color)",
              fontSize: "1.875rem",
              animation: "bounce 2s infinite",
            }}
          />
          <h4
            className="mb-2 font-semibold text-lg"
            style={{ color: "var(--heading-color)" }}
          >
            {title}
          </h4>
          <p
            className="text-sm"
            style={{
              color: "var(--text-muted)",
              textAlign: "justify",
            }}
          >
            {desc}
          </p>
        </motion.div>
      ))}
    </div>

    {/* Text Content */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 text-center lg:text-left order-2 md:order-2 lg:order-2"
      style={{ color: "var(--text-color)" }}
    >
      <h2
        className="text-3xl font-bold"
        style={{ color: "var(--heading-color)" }}
      >
        {t.consulting.heading}
        <span style={{ color: "var(--primary-color)" }}>{t.consulting.colored}</span>
      </h2>
      <p
        style={{
          color: "var(--text-muted)",
          textAlign: "justify",
        }}
      >
        {t.consulting.desc}
      </p>
      <Link
        to="/about"
        className="inline-block bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition transform motion-safe:hover:scale-105 motion-safe:active:scale-95 mx-auto lg:mx-0"
      >
        {t.consulting.knowMore}
      </Link>
    </motion.div>
  </div>
</section>



      {/* Events + Filters */}
      <section className="upcoming-events-section" style={{ width: '100%', background: 'var(--primary-color)', padding: '36px 0', color: 'var(--text-primary)' }}>
        <div className="upcoming-events-container" style={{
          maxWidth: '1400px', margin: '0 auto', padding: '0 20px', display: 'flex',
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '36px', flexWrap: 'wrap'
        }}>
          <div className="upcoming-events-title" style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap'
          }}>
            <span className="events-main-title" style={{ fontSize: '2.2rem', fontWeight: 700, color: '#fff', letterSpacing: '0.5px' }}>{t.eventsSection.titleMain}</span>
            <span className="events-highlight-title" style={{ fontSize: '2.2rem', fontWeight: 700, color: '#fff', marginLeft: 7 }}>{t.eventsSection.titleSub}</span>
          </div>
          <div className="filter-card" style={{ position: 'relative', minWidth: 240, background: '#1e293b', borderRadius: 16, padding: 12 }}>
            <select className="filter-select" aria-label={t.eventsSection.selectCat} value={selectedServiceCategory} onChange={e => setSelectedServiceCategory(e.target.value)}
              style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', fontWeight: 600, fontSize: '1.15rem', textAlign: 'center', paddingRight: '32px' }}>
              <option value="">{t.eventsSection.selectCat}</option>
              {t.eventsSection.categories.map((cat, idx) => <option key={cat}>{cat}</option>)}
            </select>
            <span style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', fontSize: '1.5rem', color: '#fff', pointerEvents: 'none' }}>▼</span>
          </div>
          <div className="filter-card" style={{ position: 'relative', minWidth: 240, background: '#1e293b', borderRadius: 16, padding: 12 }}>
            <select className="filter-select" aria-label={t.eventsSection.selectIndustry} value={selectedIndustry} onChange={e => setSelectedIndustry(e.target.value)}
              style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', fontWeight: 600, fontSize: '1.15rem', textAlign: 'center', paddingRight: '32px' }}>
              <option value="">{t.eventsSection.selectIndustry}</option>
              {t.eventsSection.industries.map((ind, idx) => <option key={ind}>{ind}</option>)}
            </select>
            <span style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', fontSize: '1.5rem', color: '#fff', pointerEvents: 'none' }}>▼</span>
          </div>
          <div className="filter-card" style={{ position: 'relative', minWidth: 240, background: '#1e293b', borderRadius: 16, padding: 12 }}>
            <select className="filter-select" aria-label={t.eventsSection.selectLoc} value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)}
              style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', fontWeight: 600, fontSize: '1.15rem', textAlign: 'center', paddingRight: '32px' }}>
              <option value="">{t.eventsSection.selectLoc}</option>
              {t.eventsSection.locations.map((loc, idx) => <option key={loc}>{loc}</option>)}
            </select>
            <span style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', fontSize: '1.5rem', color: '#fff', pointerEvents: 'none' }}>▼</span>
          </div>
        </div>
      </section>
      <section className="event-section">
        <div className="event-grid">
          {visibleEvents.length > 0 ? (
            visibleEvents.map((event, idx) => (
              <div className="event-card" key={idx}>
                <img src={event.img} alt={event.title} className="event-img" />
                <div className="event-content">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.desc}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-events">
              <img src="images/no-results.jpg" alt="No Results" className="no-results-img" />
              <p>{t.eventsSection.noResults}</p>
            </div>
          )}
        </div>
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <button onClick={handleLoadMore} className="load-more-btn">{t.eventsSection.loadMore}</button>
        </div>
      </section>

      {/* Stats + Graph */}
      <section className="py-16 px-6" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50, scale: 0.9 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.9 }}>
            <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--heading-color)" }}>{t.graph.heading}</h2>
            <p className="mb-6" style={{ color: "var(--text-muted)" }}>{t.graph.desc}</p>
            <ul className="space-y-4">
              {t.finalData.map((item, i) => (
                <motion.li key={i} className="flex items-center gap-3 group" whileHover={{ scale: 1.05 }}>
                  <span className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: "var(--primary-color)" }}></span>
                  <span style={{ color: "var(--text-muted)" }} className="font-medium">{counts[i]}% {item.name}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div className="p-6 rounded-2xl shadow-lg"
            style={{ backgroundColor: "var(--card-bg)", boxShadow: "var(--shadow)" }}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.9 }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" stroke="var(--heading-color)" />
                <YAxis stroke="var(--heading-color)" />
                <Tooltip contentStyle={{
                  backgroundColor: "var(--card-bg)",
                  color: "var(--text-color)",
                  borderRadius: 8,
                  fontWeight: 500,
                }} />
                <Bar dataKey="value" fill="var(--primary-color)" radius={[6, 6, 0, 0]} animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-overlay">
          <div className="container">
            <motion.div className="cta-content text-center" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h2>{t.cta.h2}</h2>
              <p>{t.cta.p}</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary btn-large">{t.cta.btn1} <FaRocket /></Link>
                <Link to="/about" className="btn btn-outline btn-large">{t.cta.btn2}</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
  


      <style jsx>{`
        .home2-page {
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


{/* orbit */}


{/*service styles*/}

{/*Filter section*/}

:root {
  --bg-primary: #f5f7fa;
  --bg-card: #ffffff;
  --text-primary: #1a1a1a;
  --text-accent: #224DB7;
  --border-color: #d1d5db;
  --shadow-color: rgba(0, 0, 0, 0.08);
}

[data-theme="dark"] {
  --bg-primary: #0e1a34;
  --bg-card: #111827;
  --text-primary: #f5f5f5;
  --text-accent: #3b82f6;
  --border-color: #374151;
  --shadow-color: rgba(255, 255, 255, 0.08);
}

.upcoming-events-section {
  width: 100%;
  background: var(--primary-color);
  padding: 20px 0;
  color: var(--text-primary);
  transition: all 0.3s ease-in-out;
}

.upcoming-events-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
}

.upcoming-events-title {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
}

.events-main-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
}

.events-highlight-title {
  font-size: 2rem;
  font-weight: 700;
  color: #000;
}

.events-filters {
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
}

.filter-card {
  background: var(--bg-card);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 8px var(--shadow-color);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 180px;
  padding: 4px 14px;
  transition: box-shadow 0.25s, border-color 0.3s;
}

.filter-card:hover {
  border-color: var(--border-color);
  box-shadow: 0 4px 12px var(--shadow-color);
}

.filter-select {
  width: 100%;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  appearance: none;
  padding: 10px 36px 10px 12px;
  border-radius: 6px;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3csvg fill='%23aaa' height='14' viewBox='0 0 24 24' width='14' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 14px;
}

.filter-select option {
  background: var(--bg-primary);
  color: var(--text-primary);
}

@media (max-width: 990px) {
  .upcoming-events-container {
    flex-direction: column;
    align-items: flex-start;
  }
  .events-filters {
    margin-top: 18px;
    gap: 16px;
  }
   .filter-select:focus {
  outline: none;
  border: none;
  box-shadow: none;
}
  
  .filter-card {
    min-width: 100%;
  }
    
}/* === Theme Variables === */
:root {
  --bg: #111;
  --text: #f9f9f9;
}

body.light {
  --bg: #f9f9f9;
  --text: #111;
}

/* === Event Section === */
/* === Event Section === */
.event-section {
  padding: 60px 20px;
  background: var(--bg);
  transition: background 0.4s ease, color 0.4s ease;
}

/* === Grid Layout === */
.event-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* === Card Layout === */
.event-card {
  background: var(--card-bg);
  color: var(--text-color);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  transition: transform 0.3s ease, background 0.4s ease, color 0.4s ease;
}

.event-card:hover {
  transform: translateY(-5px);
}

/* === Image === */
.event-img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
}

/* === Content === */
.event-content {
  padding: 16px;
}

.event-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.event-date {
  font-size: 14px;
  font-weight: 500;
  color: var(--accent-color);
  margin-bottom: 6px;
}

.event-location {
  font-size: 14px;
  color: var(--muted-text);
}

/* === Badges === */
.badge {
  display: inline-block;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 8px;
  margin-bottom: 10px;
}

.badge.free {
  background: #0072ff;
  color: #fff;
}

.badge.paid {
  background: #ff5722;
  color: #fff;
}

/* === Light & Dark Theme === */
body.light {
  --bg: #f9f9f9;
  --card-bg: #fff;
  --text-color: #111;
  --accent-color: #0072ff;
  --muted-text: #555;
}

body.dark {
  --bg: #121212;
  --card-bg: #1e1e1e;
  --text-color: #f1f1f1;
  --accent-color: #00c6ff;
  --muted-text: #aaa;
}

.load-more-btn {
  background: #007bff;           /* Primary blue */
  color: #fff;                   /* White text */
  padding: 12px 28px;
  border: none;
  border-radius: 30px;           /* Rounded pill look */
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(0, 123, 255, 0.3);
  transition: all 0.3s ease;
}

.load-more-btn:hover {
  background: #0056b3;           /* Darker blue */
  transform: translateY(-2px);   /* Lift on hover */
  box-shadow: 0 8px 20px rgba(0, 86, 179, 0.4);
}

.load-more-btn:active {
  transform: translateY(0);      /* Reset on click */
  box-shadow: 0 4px 12px rgba(0, 86, 179, 0.3);
}

@media (max-width: 600px) {
  /* Layout changes: stack items vertically */
  .event-grid {
    grid-template-columns: 1fr !important;  /* single column */
    gap: 12px;
  }
  
  /* Smaller card heights */
  .event-card {
    max-height: 350px;  /* shorter height for mobile */
  }
  
  /* Smaller images */
  .event-img {
    height: 180px;
  }
  
  /* Adjust text spacing */
  .event-content {
    padding: 12px;
  }
  
  .event-title {
    font-size: 1.1rem;
  }
  
  .event-date,
  .event-location {
    font-size: 0.9rem;
  }
  
  /* Buttons and badges resize */
  .badge {
    font-size: 10px;
    padding: 3px 8px;
  }
  
  /* Adjust load more button for smaller screens */
  .load-more-btn {
    width: 100%;
    padding: 14px 0;
    font-size: 1rem;
  }
}

@media (max-width: 990px) {
  /* 2 columns instead of 3 on tablets */
  .event-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  /* Slightly smaller images */
  .event-img {
    height: 210px;
  }
  
  /* Text size tweaks */
  .event-title {
    font-size: 1.2rem;
  }
  
  .event-date,
  .event-location {
    font-size: 1rem;
  }
  
  /* Responsive adjustments to badge size */
  .badge {
    font-size: 11px;
    padding: 3px 9px;
  }
  
  /* Load more button size adjustment */
  .load-more-btn {
    padding: 12px 28px;
    font-size: 1rem;
    max-width: 250px;
    margin: 0 auto;
  }
  
  /* Flex direction for filters on smaller widths */
  .upcoming-events-container {
    flex-direction: column;
  }
  
  .events-filters {
    gap: 12px;
    margin-top: 20px;
  }
  
  .filter-card {
    width: 100%; /* full width filters on tablet */
  }
}




/* Icon style */
.feature-icon {
  width: 80px;
  height: 80px;
  background: rgba(255 255 255 / 0.25);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  font-size: 2.4rem;
  color: white;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.4);
}

/* Headings & paragraphs */
.feature-card h3 {
  font-size: 1.7rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: white;
}

.feature-card p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: white;
  user-select: none;
}
  .features-section {
  position: relative;
  overflow: hidden; /* Important so bubbles don’t overflow */
  padding-bottom: 50px; /* Keep your existing padding */
  background: var(--card-bg);
}

.bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* So bubbles don’t block clicks */
  overflow: hidden;
  z-index: 0; /* Behind content */
}

.bubble {
  position: absolute;
  bottom: -100px;
  background-color: rgba(34, 77, 183, 0.15); /* Soft blue bubble */
  border-radius: 50%;
  opacity: 0.7;
  animation-name: bubbleRise;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.bubble:nth-child(odd) {
  background-color: rgba(255, 255, 255, 0.08); /* subtle white bubbles */
}

/* Different bubble sizes and horizontal positions for randomness */
.bubble:nth-child(n) {
  width: 30px;
  height: 30px;
  left: 10%;
  animation-duration: 10s;
  animation-delay: 0s;
}
.bubble:nth-child(2n) {
  width: 45px;
  height: 45px;
  left: 30%;
  animation-duration: 12s;
  animation-delay: 1.5s;
}
.bubble:nth-child(3n) {
  width: 20px;
  height: 20px;
  left: 50%;
  animation-duration: 8s;
  animation-delay: 3s;
}
.bubble:nth-child(4n) {
  width: 35px;
  height: 35px;
  left: 65%;
  animation-duration: 11s;
  animation-delay: 2.5s;
}
.bubble:nth-child(5n) {
  width: 40px;
  height: 40px;
  left: 80%;
  animation-duration: 9s;
  animation-delay: 1s;
}

/* Animate bubbles rising */
@keyframes bubbleRise {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.7;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(-120vh) scale(1.2);
    opacity: 0;
  }
}

{/*pie chart*/}




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

      `}</style>
    </div>
  );
};

export default Home2;
