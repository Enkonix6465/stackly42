import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context.jsx/LanguageContext';

const mainHeadingColors = [
  "#007bff", // Blue
  "#e67e22", // Orange
  "#16a085", // Teal
  "#8e44ad", // Purple
];

const blogImage = "images/it59.jpg";

const translations = {
  en: {
    pageTitle: "Driving Business Growth with Managed IT Services",
    main: {
      title: "Driving Business Growth with Managed IT Services",
      author: "Alex Johnson",
      date: "March 10, 2025",
      readTime: "7 min read",
      tags: ["IT Services", "Business Growth"],
      imageAlt: "Managed IT Services",
      intro: "Managed IT services have become critical for businesses seeking to optimize operations, reduce costs, and maintain reliable technology infrastructure. By outsourcing IT functions to trusted providers, organizations can focus more on core business growth.",
      advantagesHeading: "Key Advantages of Managed IT",
      advantages: [
        {
          label: "Operational Efficiency:",
          desc: "Experienced IT teams handle maintenance, monitoring, and troubleshooting proactively."
        },
        {
          label: "Cost Control:",
          desc: "Fixed pricing models reduce unexpected expenses and capital investments."
        },
        {
          label: "Access to Expertise:",
          desc: "Leverage a wide range of IT skills without hiring in-house specialists."
        },
        {
          label: "Scalability:",
          desc: "Easily scale IT support and infrastructure in response to business demands."
        }
      ],
      transformationHeading: "Driving Business Transformation",
      transformation: "Managed IT enables organizations to streamline workflows, adopt new technologies quickly, and innovate business processes thereby strengthening overall competitive advantage and growth trajectory.",
      challengesHeading: "Overcoming IT Challenges",
      challenges: "Challenges such as changing IT environments, cybersecurity threats, and skill shortages require strategic management. Partnering with managed IT experts ensures compliance, security, and continuous improvement.",
      forwardHeading: "The Path Forward",
      forward1: "The future of business growth hinges on smart IT strategies. By embracing managed IT as a catalyst, companies position themselves for agility, resilience, and innovation in a rapidly evolving digital landscape.",
      forward2: "Investing in managed IT services is not just about technology—it’s a strategic business decision for sustained success.",
      backToBlog: "← Back to Blog"
    }
  },
  ar: {
    pageTitle: "تعزيز نمو الأعمال مع خدمات IT المُدارة",
    main: {
      title: "تعزيز نمو الأعمال مع خدمات IT المُدارة",
      author: "أليكس جونسون",
      date: "10 مارس 2025",
      readTime: "7 دقائق قراءة",
      tags: ["خدمات IT", "نمو الأعمال"],
      imageAlt: "خدمات IT مُدارة",
      intro: "أصبحت خدمات تكنولوجيا المعلومات المُدارة حاسمة للشركات الراغبة في تحسين العمليات، تقليل التكاليف، والحفاظ على بنية تقنية موثوقة. من خلال الاستعانة بمزودي IT موثوقين، يمكن للمؤسسة التركيز على تنمية أعمالها الأساسية.",
      advantagesHeading: "المزايا الرئيسية لخدمات IT المُدارة",
      advantages: [
        {
          label: "فعالية التشغيل:",
          desc: "تتكفل فرق IT المحترفة بالصيانة والمراقبة والحلول بشكل استباقي."
        },
        {
          label: "ضبط التكاليف:",
          desc: "أسعار ثابتة تقلل النفقات المفاجئة والاستثمارات الرأسمالية."
        },
        {
          label: "الوصول للخبرة:",
          desc: "استفد من مجموعة واسعة من مهارات IT دون الحاجة لتوظيف مختصين داخلياً."
        },
        {
          label: "قابلية التوسع:",
          desc: "وسع خدمات الدعم والبنية حسب متطلبات العمل بسهولة."
        }
      ],
      transformationHeading: "قيادة التحول المؤسسي",
      transformation: "تساعد خدمات IT المُدارة المؤسسات على تبسيط سير العمل، واعتماد تقنيات جديدة بسرعة، وابتكار العمليات بما يعزز التنافسية والنمو.",
      challengesHeading: "تحديات الـIT والحلول",
      challenges: "تحديات تغير بيئات IT والتهديدات السيبرانية ونقص المهارات تتطلب إدارة استراتيجية. من خلال شريك مختص تضمن الامتثال والأمان والتحسين الدوري.",
      forwardHeading: "الطريق للأمام",
      forward1: "يعتمد مستقبل نمو الأعمال على استراتيجيات IT ذكية. الاستفادة من الخدمات المُدارة تضع الشركات في موقع تنافسي مرن ومبتكر في العالم الرقمي.",
      forward2: "الاستثمار بخدمات IT مُدارة ليس فقط تكنولوجيا—بل قرار جوهري لاستدامة النجاح.",
      backToBlog: "← العودة للمدونة"
    }
  },
  he: {
    pageTitle: "צמיחה עסקית עם שירותי IT מנוהלים",
    main: {
      title: "צמיחה עסקית עם שירותי IT מנוהלים",
      author: "אלכס ג'ונסון",
      date: "10 מרץ 2025",
      readTime: "7 דקות קריאה",
      tags: ["שירותי IT", "צמיחה עסקית"],
      imageAlt: "שירותי IT מנוהלים",
      intro: "שירותי IT מנוהלים חיוניים לעסקים שרוצים לייעל תהליכים, לחסוך עלויות ולשמור על תשתיות טכנולוגיות אמינות. מיקור חוץ של תחום ה־IT מאפשר לעסק להתמקד בצמיחתו.",
      advantagesHeading: "יתרונות מרכזיים של IT מנוהל",
      advantages: [
        {
          label: "יעילות תפעולית:",
          desc: "צוותים מיומנים אחראים על תחזוקה, ניטור וטיפול יזום בתקלות."
        },
        {
          label: "בקרה תקציבית:",
          desc: "מנוי קבוע מפחית הפתעות והוצאות הון גבוהות."
        },
        {
          label: "נגישות למומחיות:",
          desc: "גיוס כלל המיומנויות הנדרשות ל־IT – ללא צורך בגיוס פנימי."
        },
        {
          label: "יכולת גידול:",
          desc: "הרחב שירותי IT ותשתית בקלות בהתאם לצמיחת העסק."
        }
      ],
      transformationHeading: "שינוי עסקי באמצעות IT מנוהל",
      transformation: "שירותי IT מנוהלים מאפשרים לייעל עבודה, לאמץ טכנולוגיות במהירות ולחדש תהליכים עסקיים—וכך מתחזקת התחרותיות הצמיחה.",
      challengesHeading: "התמודדות עם אתגרי IT",
      challenges: "סביבה מתחלפת, איומי סייבר וחוסר במומחיות מצריכים ניהול חכם. עבודה עם מומחי IT מנוהל מבטיחה תאימות, אבטחה ושיפור מתמיד.",
      forwardHeading: "הדרך קדימה",
      forward1: "עתיד הצמיחה העסקית תלוי ב־IT חכם. שילוב שירותי IT מנוהלים מקנה גמישות, עמידות וחדשנות בעולם דיגיטלי משתנה.",
      forward2: "השקעה ב־IT מנוהל – לא רק טכנולוגיה אלא בחירה עסקית לחוסן מתמשך.",
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
              lineHeight: "1.2",
            }}
          >
            {main.title}
          </h1>
          <div
            style={{
              width: "100%",
              borderRadius: "15px",
              overflow: "hidden",
              marginBottom: "20px",
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
                background: "#eaeaea",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
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
                  background: i === 0 ? "var(--primary-color)" : "#16a085",
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
              fontWeight: 700,
            }}
          >
            {main.advantagesHeading}
          </h2>
          <ul style={{ paddingLeft: isRTL ? "0" : "23px", paddingRight: isRTL ? "23px" : "0", marginBottom: "25px" }}>
            {main.advantages.map((adv, i) => (
              <li style={{ marginBottom: "11px" }} key={i}>
                <b>{adv.label}</b> {adv.desc}
              </li>
            ))}
          </ul>

          <h2
            style={{
              fontSize: "1.8rem",
              color: mainHeadingColors[1],
              marginTop: "35px",
              marginBottom: "20px",
              fontWeight: 700,
            }}
          >
            {main.transformationHeading}
          </h2>
          <p style={{ marginBottom: "25px" }}>
            {main.transformation}
          </p>

          <h2
            style={{
              fontSize: "1.8rem",
              color: mainHeadingColors[2],
              marginTop: "35px",
              marginBottom: "20px",
              fontWeight: 700,
            }}
          >
            {main.challengesHeading}
          </h2>
          <p style={{ marginBottom: "25px" }}>
            {main.challenges}
          </p>

          <h2
            style={{
              fontSize: "1.8rem",
              color: mainHeadingColors[3],
              marginTop: "35px",
              marginBottom: "20px",
              fontWeight: 700,
            }}
          >
            {main.forwardHeading}
          </h2>
          <p style={{ marginBottom: "25px" }}>
            {main.forward1}
          </p>
          <p>
            {main.forward2}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            marginTop: "40px",
            textAlign: "center",
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
              transition: "all 0.3s ease",
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
