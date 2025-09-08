import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context.jsx/LanguageContext';

const mainHeadingColors = [
  "#007bff", // Blue
  "#e67e22", // Orange
  "#16a085", // Teal
  "#8e44ad", // Purple
];

const blogImage = "images/it60.jpg";

const translations = {
  en: {
    pageTitle: "Essential Cybersecurity Practices for IT Teams",
    main: {
      title: "Essential Cybersecurity Practices for IT Teams",
      author: "Linda Yang",
      date: "February 28, 2025",
      readTime: "8 min read",
      tags: ["Cybersecurity", "IT Teams"],
      imageAlt: "Essential Cybersecurity Practices",
      intro: "As cyber threats evolve, IT teams play a vital role in protecting organizational assets. Implementing essential cybersecurity practices ensures robust defenses against attacks, safeguards sensitive data, and supports business resilience.",
      assessHeading: "Assess and Understand Threats",
      assess: "Begin by evaluating current vulnerabilities and threat landscapes. Understanding your specific risks helps prioritize security focus areas.",
      controlsHeading: "Deploy Key Security Controls",
      controls: [
        "Utilize firewalls, endpoint protection, and intrusion detection systems.",
        "Enforce patch management and software updates promptly.",
        "Employ strong authentication methods including multi-factor authentication.",
        "Perform regular backups and validate recovery procedures."
      ],
      trainHeading: "Educate and Empower Your Team",
      train: "Continuous training is crucial to help staff recognize phishing, manage data securely, and comply with policies to reduce human error risks.",
      governanceHeading: "Establish Governance and Compliance",
      governance: "Maintain awareness of regulatory requirements and develop clear cybersecurity policies to guide IT security practices and audits.",
      summary: "With these fundamental cybersecurity practices, IT teams can build a strong defense framework to protect digital assets and support the organization's long-term success.",
      backToBlog: "← Back to Blog"
    }
  },
  ar: {
    pageTitle: "أفضل ممارسات الأمن السيبراني لفرق IT",
    main: {
      title: "أفضل ممارسات الأمن السيبراني لفرق IT",
      author: "ليندا يانغ",
      date: "28 فبراير 2025",
      readTime: "8 دقائق قراءة",
      tags: ["أمن سيبراني", "فرق IT"],
      imageAlt: "أفضل ممارسات الأمن السيبراني",
      intro: "مع تطور التهديدات السيبرانية، تلعب فرق IT دورًا مهمًا في حماية أصول المؤسسات. تنفيذ أساسيات الأمن السيبراني يضمن الدفاعات القوية، حماية البيانات الحساسة ودعم استمرارية الأعمال.",
      assessHeading: "تقييم وفهم التهديدات",
      assess: "ابدأ بتقييم نقاط الضعف الحالية والمشهد التهديدي. فهم المخاطر يساعد في تحديد أولويات الأمن.",
      controlsHeading: "تطبيق الضوابط الأمنية الأساسية",
      controls: [
        "استخدم الجدران النارية وحماية الطرفيات وأنظمة كشف التسلل.",
        "تطبيق إدارة التحديثات والترقيات بسرعة.",
        "تفعيل وسائل مصادقة قوية مثل المصادقة الثنائية.",
        "إجراء نسخ احتياطية دورية والتحقق من إجراءات الاسترداد."
      ],
      trainHeading: "تدريب وتمكين الفريق",
      train: "التدريب المستمر ضروري لمساعدة الموظفين على اكتشاف الاحتيال الإلكتروني وإدارة البيانات بشكل آمن والالتزام بالسياسات لتقليل الأخطاء البشرية.",
      governanceHeading: "حوكمة وامتثال أمن المعلومات",
      governance: "الوعي بالمتطلبات التنظيمية ووضع سياسات أمن سيبراني واضحة يوجه إجراءات وأدلة الأمن.",
      summary: "مع تلك الممارسات الأساسية، تُمكن فرق IT من تأسيس بنية دفاعية قوية تحمي أصول المنظمة وتدعم نجاحها المستقبلي.",
      backToBlog: "← العودة للمدونة"
    }
  },
  he: {
    pageTitle: "שיטות אבטחת סייבר עיקריות לצוותי IT",
    main: {
      title: "שיטות אבטחת סייבר עיקריות לצוותי IT",
      author: "לינדה יאנג",
      date: "28 פברואר 2025",
      readTime: "8 דקות קריאה",
      tags: ["אבטחת סייבר", "צוותי IT"],
      imageAlt: "שיטות אבטחת סייבר עיקריות",
      intro: "האיומים הדיגיטליים מתפתחים וצוותי IT נושאים באחריות מרכזית להגנת ארגונים. יישום יסודות הסייבר מבטיח הגנה נגד התקפות, שמירה על נתונים ויציבות עסקית.",
      assessHeading: "הערכת והבנת איומים",
      assess: "התחילו בהערכת פרצות קיימות ונוף האיומים. הכרה בסיכונים תסייע להעדפת תחומי אבטחה.",
      controlsHeading: "הטמעת כלים והגנות מרכזיות",
      controls: [
        "השתמשו בחומת אש, הגנת נקודות קצה ומערכות לזיהוי חדירות.",
        "הקפידו על עדכונים וניהול גרסאות מתמיד.",
        "יישמו אמצעי אימות חזקים כולל אימות דו-שלבי.",
        "בצעו גיבויים שוטפים ובדקו הליך שחזור."
      ],
      trainHeading: "הדרכה והעצמת עובדים",
      train: "הדרכה מתמדת חיונית—הזיהוי של פישינג, ניהול נתונים בטוח וציות למדיניות מורידים סיכון אנושי.",
      governanceHeading: "הסדרה וציות ברמות IT",
      governance: "היו ערים לרגולציה, וכתבו מדיניות סייבר ברורה שתגבש תהליכים וביקורות פנימיות.",
      summary: "באמצעות יסודות אלה, ניתן לבנות מערך הגנה אפקטיבי לצוותי IT ולהבטיח הגנה וניהול מוצלח בטווח הארוך.",
      backToBlog: "← חזרה לבלוג"
    }
  }
};

const Blog1 = () => {
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
                  background: i === 0 ? "var(--primary-color)" : "#e74c3c",
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
              marginBottom: "20px",
              fontWeight: "700"
            }}
          >
            {main.assessHeading}
          </h2>
          <p>
            {main.assess}
          </p>

          <h2
            style={{
              fontSize: "1.8rem",
              color: mainHeadingColors[1],
              marginTop: "35px",
              marginBottom: "20px",
              fontWeight: "700"
            }}
          >
            {main.controlsHeading}
          </h2>
          <ul style={{ paddingLeft: isRTL ? "0" : "23px", paddingRight: isRTL ? "23px" : "0", marginBottom: "25px" }}>
            {main.controls.map((control, idx) => (
              <li style={{ marginBottom: "11px" }} key={idx}>
                {control}
              </li>
            ))}
          </ul>

          <h2
            style={{
              fontSize: "1.8rem",
              color: mainHeadingColors[2],
              marginTop: "35px",
              marginBottom: "20px",
              fontWeight: "700"
            }}
          >
            {main.trainHeading}
          </h2>
          <p>
            {main.train}
          </p>

          <h2
            style={{
              fontSize: "1.8rem",
              color: mainHeadingColors[3],
              marginTop: "35px",
              marginBottom: "20px",
              fontWeight: "700"
            }}
          >
            {main.governanceHeading}
          </h2>
          <p>
            {main.governance}
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

export default Blog1;
