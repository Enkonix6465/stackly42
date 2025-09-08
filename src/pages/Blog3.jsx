import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context.jsx/LanguageContext';

const mainHeadingColors = [
  "#007bff", // Blue
  "#e67e22", // Orange
  "#16a085", // Teal
  "#8e44ad", // Purple
];

const blogImage = "images/it61.jpg";

const translations = {
  en: {
    pageTitle: "Harnessing Cloud Solutions for IT Efficiency",
    main: {
      title: "Harnessing Cloud Solutions for IT Efficiency",
      author: "Neil Roberts",
      date: "February 20, 2025",
      readTime: "9 min read",
      tags: ["Cloud Computing", "IT Efficiency"],
      imageAlt: "Harnessing Cloud Solutions",
      intro: "Cloud solutions are revolutionizing IT by delivering scalable, flexible infrastructure and managed services that boost operational efficiency and business agility.",
      infraHeading: "Modernizing Infrastructure with Cloud",
      infra: "Migrating to cloud platforms allows organizations to reduce reliance on legacy hardware, optimize server usage, and adapt capacity on demand, all while improving cost control and performance.",
      agilityHeading: "Enhancing Agility and Collaboration",
      agility: "Cloud-based tools enable real-time collaboration, seamless software updates, and remote workforce enablement, transforming IT from a support role to a driver of business innovation.",
      automationHeading: "Smart Automation and Cost Savings",
      automation: "Automation via the cloud streamlines routine IT processes and resource provisioning. Pay-as-you-go models and automated scaling help reduce wasted spend and maximize efficiency.",
      aheadHeading: "Looking Ahead",
      ahead: "Embracing cloud solutions positions IT teams to lead the way in resilience, scalability, and continuous improvement. The future belongs to businesses that harness cloud to drive efficiency and adapt quickly to change.",
      backToBlog: "← Back to Blog",
    }
  },
  ar: {
    pageTitle: "الاستفادة من حلول السحابة لكفاءة IT",
    main: {
      title: "الاستفادة من حلول السحابة لكفاءة IT",
      author: "نيل روبرتس",
      date: "20 فبراير 2025",
      readTime: "9 دقائق قراءة",
      tags: ["حوسبة سحابية", "كفاءة IT"],
      imageAlt: "حلول سحابية",
      intro: "تحول الحلول السحابية مجال تقنية المعلومات عبر توفير بنية تحتية مرنة وقابلة للتوسع وخدمات مُدارة تعزز الأداء التشغيلي ومرونة الأعمال.",
      infraHeading: "تحديث البنية التحتية عبر السحابة",
      infra: "سيساعد الانتقال إلى السحابة على تقليل الاعتماد على الهاردوير، تحسين استخدام الخوادم وتكييف السعة حسب الحاجة مع ضبط التكاليف والأداء.",
      agilityHeading: "تعزيز المرونة والتعاون",
      agility: "الأدوات السحابية تُمكن التعاون الفوري، التحديثات السلسة، ودعم فرق العمل عن بُعد، لتصبح IT عنصرًا مبتكرًا وليس فقط داعمًا.",
      automationHeading: "أتمتة ذكية وتوفير التكاليف",
      automation: "الأتمتة السحابية تُبسط المهام الروتينية والموارد. الدفع مقابل الاستخدام والتوسعة التلقائية يخفض الهدر المالي ويزيد الكفاءة.",
      aheadHeading: "نظرة مستقبلية",
      ahead: "اعتماد السحابة يضع فرق IT في الريادة—للقابلية، المرونة، والتحسين المستمر. المستقبل لمن يستفيد من السحابة لتحقيق الكفاءة والتكيف مع التغيير.",
      backToBlog: "← العودة للمدونة"
    }
  },
  he: {
    pageTitle: "פתרונות ענן ליעילות IT",
    main: {
      title: "פתרונות ענן ליעילות IT",
      author: "ניל רוברטס",
      date: "20 בפברואר 2025",
      readTime: "9 דקות קריאה",
      tags: ["מחשוב ענן", "יעילות IT"],
      imageAlt: "פתרונות ענן",
      intro: "פתרונות ענן משנים את עולם ה־IT – מספקים תשתית גמישה, מתרחבת ושירותים מנוהלים שמקדמים יעילות וגמישות עסקית.",
      infraHeading: "חדשנות בתשתיות ענן",
      infra: "מעבר לפלטפורמות ענן מפחית תלות בחומרה ישנה, ממקסם שימוש בשרתים ומאפשר התאמה דינמית וצמצום עלויות.",
      agilityHeading: "זריזות ושיתוף פעולה משודרגים",
      agility: "כלי ענן מאפשרים שיתוף חי בזמן-אמת, עדכונים שוטפים ותמיכה בעבודה היברידית – IT הופך למנוע חדשנות.",
      automationHeading: "אוטומציה וחיסכון בעלויות",
      automation: "אוטומציה בענן מצמצמת עבודה ידנית ומייעלת משאבים. מודל תשלום לפי שימוש והתרחבות אוטומטית מצמצמים בזבוז.",
      aheadHeading: "המבט קדימה",
      ahead: "אימוץ הענן מאפשר ל־IT להוביל בגמישות, עמידות ושיפור מתמיד. היתרון העתידי לעסקים שממנפים ענן לחדשנות מהירה.",
      backToBlog: "← חזרה לבלוג"
    }
  }
};

const Blog3 = () => {
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
              fontWeight: 700
            }}
          >
            {main.infraHeading}
          </h2>
          <p>
            {main.infra}
          </p>

          <h2
            style={{
              fontSize: "1.8rem",
              color: mainHeadingColors[1],
              marginTop: "35px",
              marginBottom: "20px",
              fontWeight: 700
            }}
          >
            {main.agilityHeading}
          </h2>
          <p>
            {main.agility}
          </p>

          <h2
            style={{
              fontSize: "1.8rem",
              color: mainHeadingColors[2],
              marginTop: "35px",
              marginBottom: "20px",
              fontWeight: 700
            }}
          >
            {main.automationHeading}
          </h2>
          <p>
            {main.automation}
          </p>

          <h2
            style={{
              fontSize: "1.8rem",
              color: mainHeadingColors[3],
              marginTop: "35px",
              marginBottom: "20px",
              fontWeight: 700
            }}
          >
            {main.aheadHeading}
          </h2>
          <p>
            {main.ahead}
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

export default Blog3;
