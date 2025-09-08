import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context.jsx/LanguageContext';

const mainHeadingColors = [
  "#1abc9c", // Turquoise
  "#e67e22", // Orange
  "#3498db", // Blue
  "#9b59b6", // Purple
];

const blogImage = "images/it62.jpg";

const translations = {
  en: {
    pageTitle: "Optimizing IT Operations with DevOps Culture",
    main: {
      title: "Optimizing IT Operations with DevOps Culture",
      author: "Max Patel",
      date: "February 15, 2025",
      readTime: "6 min read",
      tags: ["DevOps", "Agile"],
      imageAlt: "DevOps Culture",
      intro: "DevOps culture fosters continuous integration and delivery, improving efficiency, collaboration, and software quality across IT operations.",
      cyclesHeading: "Accelerated Development Cycles",
      cycles: "Automation of build, test, and deployment processes enables faster releases and rapid response to market needs.",
      collabHeading: "Collaborative Workflows",
      collab: "Shared responsibility and open communication break down silos, leading to more effective and aligned IT teams.",
      stabilityHeading: "Enhanced Stability and Reliability",
      stability: "Continuous monitoring and quick feedback loops reduce system downtime and improve software quality.",
      alignHeading: "Business and IT Alignment",
      align: "DevOps practice ensures IT initiatives closely support strategic business goals and customer satisfaction.",
      summary: "Embracing DevOps culture is essential for organizations wanting agility, innovation, and resilience in today’s fast-paced technology environment.",
      backToBlog: "← Back to Blog",
    }
  },
  ar: {
    pageTitle: "تحسين عمليات IT عبر ثقافة DevOps",
    main: {
      title: "تحسين عمليات IT عبر ثقافة DevOps",
      author: "ماكس باتيل",
      date: "15 فبراير 2025",
      readTime: "6 دقائق قراءة",
      tags: ["ديفوبس", "أجايل"],
      imageAlt: "ثقافة ديفوبس",
      intro: "ثقافة DevOps تعزز الدمج والتسليم المستمر، وترفع كفاءة التعاون وجودة البرمجيات في عمليات تقنية المعلومات.",
      cyclesHeading: "دورات تطوير أسرع",
      cycles: "أتمتة البناء، الاختبار، ونشر العمليات تتيح إصدارات أسرع واستجابة أسرع لاحتياجات السوق.",
      collabHeading: "تعاون فعال",
      collab: "المسؤولية المشتركة والتواصل المفتوح تزيل الحواجز وتخلق فرق IT متناغمة وأكثر فاعلية.",
      stabilityHeading: "استقرار وموثوقية عالية",
      stability: "الرصد المستمر وردود الفعل السريعة تقلل ساعات التوقف وتزيد جودة البرمجيات.",
      alignHeading: "مواءمة الأعمال وتقنية المعلومات",
      align: "ممارسات DevOps تضمن دعم جهود IT لأهداف الأعمال ورضا العملاء.",
      summary: "تبني ثقافة DevOps ضروري للمؤسسات التي تسعى للرشاقة والابتكار والقدرة على الصمود في بيئة تقنية متسارعة.",
      backToBlog: "← العودة للمدونة",
    }
  },
  he: {
    pageTitle: "ייעול תפעול IT עם תרבות DevOps",
    main: {
      title: "ייעול תפעול IT עם תרבות DevOps",
      author: "מקס פאטל",
      date: "15 פברואר 2025",
      readTime: "6 דקות קריאה",
      tags: ["DevOps", "אג'ייל"],
      imageAlt: "תרבות דב-אופס",
      intro: "תרבות DevOps מקדמת אינטגרציה ומסירה מתמדת, לשיפור היעילות, שיתופי הפעולה ואיכות התוכנה בעולמות ה־IT.",
      cyclesHeading: "מחזורי פיתוח מואצים",
      cycles: "אוטומציה בתהליכי בנייה, בדיקות והפצה מזרזת שחרורים ותגובה לצורכי השוק.",
      collabHeading: "עבודה שיתופית",
      collab: "אחריות משותפת ותקשורת פתוחה מבטלות סילום ומובילות לצוותי IT יעילים יותר.",
      stabilityHeading: "יציבות ואמינות משופרת",
      stability: "ניטור רציף ומשוב מהיר מפחיתים תקלות ומעלים את איכות התוכנה.",
      alignHeading: "יישור עסק ו־IT",
      align: "תרבות DevOps מבטיחה שכל יוזמת IT תומכת ביעדים עסקיים ובשביעות רצון לקוחות.",
      summary: "אימוץ תרבות DevOps חיוני לארגון שרוצה גמישות, חדשנות וחוסן בעידן טכנולוגי מהיר.",
      backToBlog: "← חזרה לבלוג",
    }
  }
};

const Blog4 = () => {
  const { language } = useLanguage() || { language: "en" };
  const t = translations[language] || translations.en;
  const isRTL = language === "ar" || language === "he";
  useEffect(() => {
    document.title = t.pageTitle;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [language, t.pageTitle, isRTL]);

  const main = t.main;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        padding: "120px 20px 60px",
        background: "var(--bg-color)",
        minHeight: "100vh",
        color: "var(--text-color)",
        direction: isRTL ? "rtl" : "ltr"
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <motion.header
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginBottom: "40px" }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "var(--heading-color)",
              marginBottom: "20px",
              lineHeight: "1.2"
            }}
          >
            {main.title}
          </h1>
          <div
            style={{
              width: "100%",
              borderRadius: "15px",
              overflow: "hidden",
              marginBottom: "20px"
            }}
          >
            <img
              src={blogImage}
              alt={main.imageAlt}
              style={{
                width: "100%",
                height: "230px",
                objectFit: "cover",
                display: "block",
                borderRadius: "12px",
                background: "#eaeaea"
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              fontSize: "0.95rem",
              color: "var(--secondary-color)",
              marginBottom: "14px",
              flexDirection: isRTL ? "row-reverse" : "row"
            }}
          >
            <span>{main.author}</span>
            <span>•</span>
            <span>{main.date}</span>
            <span>•</span>
            <span>{main.readTime}</span>
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "4px",
              flexDirection: isRTL ? "row-reverse" : "row"
            }}
          >
            {main.tags.map((tag, i) => (
              <span
                key={i}
                style={{
                  background: i === 0 ? "var(--primary-color)" : "#e67e22",
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "0.85rem"
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.header>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            background: "var(--card-bg)",
            borderRadius: "12px",
            padding: isRTL ? "40px 36px 40px 40px" : "40px",
            boxShadow: "var(--shadow)",
            lineHeight: "1.8",
            textAlign: isRTL ? "right" : "left"
          }}
        >
          <p style={{ marginBottom: "25px", fontSize: "1.1rem" }}>
            {main.intro}
          </p>
          <h2
            style={{
              fontSize: "1.8rem",
              color: mainHeadingColors[0],
              marginTop: "35px",
              marginBottom: "20px"
            }}
          >
            {main.cyclesHeading}
          </h2>
          <p>
            {main.cycles}
          </p>
          <h2
            style={{
              fontSize: "1.8rem",
              color: mainHeadingColors[1],
              marginTop: "35px",
              marginBottom: "20px"
            }}
          >
            {main.collabHeading}
          </h2>
          <p>
            {main.collab}
          </p>
          <h2
            style={{
              fontSize: "1.8rem",
              color: mainHeadingColors[2],
              marginTop: "35px",
              marginBottom: "20px"
            }}
          >
            {main.stabilityHeading}
          </h2>
          <p>
            {main.stability}
          </p>
          <h2
            style={{
              fontSize: "1.8rem",
              color: mainHeadingColors[3],
              marginTop: "35px",
              marginBottom: "20px"
            }}
          >
            {main.alignHeading}
          </h2>
          <p>
            {main.align}
          </p>
          <p>
            {main.summary}
          </p>
        </motion.div>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            marginTop: "40px",
            textAlign: "center"
          }}
        >
          <a
            href="/blog"
            style={{
              display: "inline-block",
              background: "var(--primary-color)",
              color: "white",
              padding: "12px 30px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              transition: "all 0.3s ease"
            }}
          >
            {main.backToBlog}
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Blog4;
