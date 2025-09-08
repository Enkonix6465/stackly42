  import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import {
  FaEye,
  FaBullseye,
  FaCogs,
  FaCloud,
  FaRobot,
  FaShieldAlt,
  FaHeadset,
  FaProjectDiagram,
  FaSearch,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaArrowRight,
} from "react-icons/fa";
import { useLanguage } from "../context.jsx/LanguageContext";

// CENTRALIZED TRANSLATIONS (ENGLISH, ARABIC, HEBREW)
const translations = {
  en: {
    pageTitle: "About Us - DreamNest Real Estate",
    hero: {
      title: "About Us",
      paragraph:
        "We are dedicated to empowering businesses through innovative technology solutions, expert IT consulting, and seamless digital transformation.",
      button: "Reach Out Today",
      videoSrc: "images/video3.mp4",
    },
    missionVision: {
      heading: "Our Mission & Vision",
      paragraph:
        "Driving digital transformation with innovation, expertise, and a relentless focus on client success.",
      imageAlt: "Team collaboration",
    },
    statsData: [
      {
        value: 98,
        suffix: "%",
        text: "Client retention rate built on trust and reliability.",
      },
      {
        value: 50,
        suffix: "+",
        text: "Industries served across healthcare, finance, and more.",
      },
      {
        value: 15,
        suffix: "+ Years",
        text: "Proven expertise in delivering scalable IT solutions.",
      },
      {
        value: 24,
        suffix: "/7",
        text: "Global support ensuring business continuity anytime.",
      },
    ],
    whatWeDo: {
      heading: "What We Do",
      paragraph:
        "Our client-centric methodology ensures every IT solution is designed to adapt, scale, and empower your business.",
      steps: [
        {
          id: 1,
          title: "Discovery",
          desc: "We dive deep into your business needs, assessing current systems and identifying opportunities for innovation.",
        },
        {
          id: 2,
          title: "Strategy",
          desc: "Our experts will create a client-centric roadmap and align IT solutions carefully with your long-term business goals.",
        },
        {
          id: 3,
          title: "Implementation",
          desc: "From cloud to custom apps, we deploy scalable solutions with precision, agility, and reliable expertise.",
        },
        {
          id: 4,
          title: "Support",
          desc: "We provide comprehensive monitoring, troubleshooting, and proactive support to ensure seamless system performance.",
        },
      ],
    },
    itServicesSection: {
      heading: "Boost Your Brand with Our Expertise",
      cards: [
        {
          id: 1,
          title: "Cloud Infrastructure",
          desc: "Robust cloud solutions: deployment, migration, security, and ongoing management for scalable IT growth.",
          img: "images/services11.jpg",
          link: "/services",
        },
        {
          id: 2,
          title: "Cybersecurity",
          desc: "Comprehensive protection: threat detection, compliance, backups, and incident response for business resilience.",
          img: "images/services12.jpg",
          link: "/services",
        },
        {
          id: 3,
          title: "Managed IT Support",
          desc: "24/7 monitoring, troubleshooting, and end-user support ensuring systems run smoothly and securely every day.",
          img: "images/services13.jpg",
          link: "/services",
        },
      ],
    },
    coreValues: {
      heading: "My Core Values",
      subheading: "The principles guiding my freelance journey",
      values: [
        {
          title: "Cloud Infrastructure",
          description:
            "Providing scalable cloud deployment, migration, and management for reliable IT environments.",
          icon: FaCloud,
        },
        {
          title: "Cybersecurity",
          description:
            "Implementing advanced threat detection, compliance, and data protection strategies.",
          icon: FaShieldAlt,
        },
        {
          title: "AI & Automation",
          description:
            "Leveraging artificial intelligence and automation to enhance efficiency and minimize errors.",
          icon: FaRobot,
        },
        {
          title: "Custom IT Solutions",
          description:
            "Designing bespoke software and infrastructure tailored to unique business needs.",
          icon: FaCogs,
        },
      ],
    },
    leadership: {
      heading: "Leadership",
      subheading: "Innovation driven by dedicated leaders",
      team: [
        {
          name: "Aarav Sharma",
          role: "Cloud Solutions Architect",
          bio: "Designs and implements scalable, secure cloud infrastructure for enterprise clients worldwide.",
          image: "images/it24.jpg",
          social: {
            linkedin: "https://www.linkedin.com/in/aarav-sharma/",
            twitter: "https://twitter.com/aaravsharma",
            github: "https://github.com/aaravsharma",
          },
        },
        {
          name: "Priya Mehta",
          role: "UI/UX Designer",
          bio: "Creates intuitive, user-centered interfaces optimized for seamless digital experiences.",
          image: "images/it23.jpg",
          social: {
            linkedin: "https://www.linkedin.com/in/priya-mehta/",
            twitter: "https://twitter.com/priyamehta",
            github: "https://github.com/priyamehta",
          },
        },
        {
          name: "Rahul Verma",
          role: "Cybersecurity Consultant",
          bio: "Expert in threat detection, risk assessment, and cybersecurity strategy for startups and enterprises.",
          image: "images/it25.jpg",
          social: {
            linkedin: "https://www.linkedin.com/in/rahul-verma/",
            twitter: "https://twitter.com/rahulverma",
            github: "https://github.com/rahulverma",
          },
        },
        {
          name: "Ananya Iyer",
          role: "Digital Marketing Specialist",
          bio: "Specializes in SEO, content marketing, and growth strategies for tech companies.",
          image: "images/it22.jpg",
          social: {
            linkedin: "https://www.linkedin.com/in/ananya-iyer/",
            twitter: "https://twitter.com/ananya_iyer",
            github: "https://github.com/ananya-iyer",
          },
        },
      ],
    },
    journey: {
      heading: "Our Journey",
      subheading: "Key milestones in our growth",
      milestones: [
        {
          year: "2018",
          event: "Company Founding",
          description:
            "Founded with a vision to provide innovative IT consulting and cloud solutions to businesses.",
        },
        {
          year: "2020",
          event: "First Large-Scale Cloud Deployment",
          description:
            "Successfully delivered a multi-region cloud infrastructure project for a leading enterprise client.",
        },
        {
          year: "2022",
          event: "Advanced Cybersecurity Services Launched",
          description:
            "Introduced comprehensive cybersecurity offerings, including threat intelligence and risk management.",
        },
        {
          year: "2024",
          event: "AI & Automation Services Expansion",
          description:
            "Integrated AI-powered automation tools enhancing client efficiency and reducing operational costs.",
        },
        {
          year: "2025",
          event: "Global Growth and Strategic Partnerships",
          description:
            "Expanded global footprint with key partnerships driving digital transformation across industries.",
        },
      ],
    },
    cta: {
      heading: "Ready to Transform Your Business?",
      paragraph:
        "Get started today with a free consultation and discover how we can help you achieve your goals.",
      btnStart: "Start Your Journey",
      btnLearnMore: "Learn More About Us",
    },
  },
  ar: {
    pageTitle: "معلومات عنا - دريم نيست العقارية",
    hero: {
      title: "من نحن",
      paragraph:
        "نكرس جهودنا لتمكين الشركات من خلال حلول تكنولوجية مبتكرة، استشارات تقنية متخصصة، وتحول رقمي سلس.",
      button: "تواصل معنا اليوم",
      videoSrc: "images/video3.mp4",
    },
    missionVision: {
      heading: "مهمتنا ورؤيتنا",
      paragraph:
        "نقود التحول الرقمي من خلال الابتكار والخبرة وتركيز لا يتزعزع على نجاح العملاء.",
      imageAlt: "تعاون الفريق",
    },
    statsData: [
      { value: 98, suffix: "%", text: "معدل الاحتفاظ بالعملاء مبني على الثقة والاعتمادية." },
      { value: 50, suffix: "+", text: "خدمة صناعات متعددة مثل الرعاية الصحية والمالية وغيرها." },
      { value: 15, suffix: "+ سنوات", text: "خبرة مثبتة في تقديم حلول تقنية معلومات قابلة للتوسع." },
      { value: 24, suffix: "/7", text: "دعم عالمي يضمن استمرارية الأعمال في أي وقت." },
    ],
    whatWeDo: {
      heading: "ماذا نفعل",
      paragraph:
        "تضمن منهجيتنا المرتكزة على العميل تصميم حلول تقنية قابلة للتكيف، التوسع، وتمكين عملك.",
      steps: [
        { id: 1, title: "استكشاف", desc: "نغوص في احتياجات عملك، نقوم بتقييم الأنظمة الحالية وتحديد فرص الابتكار." },
        { id: 2, title: "استراتيجية", desc: "يضع خبراؤنا خارطة طريق تركز على العميل وتربط حلول تقنية المعلومات بأهداف عملك على المدى الطويل." },
        { id: 3, title: "تنفيذ", desc: "نشر حلول قابلة للتوسع بكفاءة ودقة وخبرة موثوقة، من السحابة إلى التطبيقات المخصصة." },
        { id: 4, title: "دعم", desc: "نوفر المراقبة الشاملة، واستكشاف الأخطاء، والدعم الاستباقي لضمان أداء سلس للنظام." }
      ]
    },
    itServicesSection: {
      heading: "عزز علامتك التجارية بخبرتنا",
      cards: [
        { id: 1, title: "البنية التحتية السحابية", desc: "حلول سحابية قوية: النشر، الترحيل، الأمان، والإدارة المستمرة لنمو IT قابل للتوسع.", img: "images/services11.jpg", link: "/services" },
        { id: 2, title: "الأمن السيبراني", desc: "حماية شاملة: الكشف عن التهديدات، الامتثال، النسخ الاحتياطية، والاستجابة للحوادث لتعزيز صمود الأعمال.", img: "images/services12.jpg", link: "/services" },
        { id: 3, title: "دعم IT المدار", desc: "مراقبة مستمرة، استكشاف الأخطاء، ودعم المستخدم النهائي لضمان عمل الأنظمة بسلاسة وأمان كل يوم.", img: "images/services13.jpg", link: "/services" }
      ]
    },
    coreValues: {
      heading: "قيمتي الأساسية",
      subheading: "المبادئ التي توجه رحلتي المهنية الحرة",
      values: [
        { title: "البنية التحتية السحابية", description: "تقديم نشر سحابي قابل للتوسع، ترحيل، وإدارة لبيئات IT موثوقة.", icon: FaCloud },
        { title: "الأمن السيبراني", description: "تطبيق استراتيجيات متقدمة للكشف عن التهديدات، الامتثال، وحماية البيانات.", icon: FaShieldAlt },
        { title: "الذكاء الاصطناعي والأتمتة", description: "استخدام الذكاء الاصطناعي والأتمتة لتعزيز الكفاءة وتقليل الأخطاء.", icon: FaRobot },
        { title: "حلول IT مخصصة", description: "تصميم برامج وبنية تحتية تناسب احتياجات العمل الفريدة.", icon: FaCogs }
      ]
    },
    leadership: {
      heading: "القيادة",
      subheading: "الابتكار بقيادة قادة مكرسين",
      team: [
        { name: "آراف شارما", role: "مهندس حلول سحابية", bio: "يصمم وينفذ بنية تحتية سحابية آمنة وقابلة للتوسع للعملاء حول العالم.", image: "images/it24.jpg", social: { linkedin: "https://www.linkedin.com/in/aarav-sharma/", twitter: "https://twitter.com/aaravsharma", github: "https://github.com/aaravsharma", } },
        { name: "بريا ميهتا", role: "مصمم UI/UX", bio: "يخلق واجهات سهلة الاستخدام ومصممة لتجارب رقمية سلسة.", image: "images/it23.jpg", social: { linkedin: "https://www.linkedin.com/in/priya-mehta/", twitter: "https://twitter.com/priyamehta", github: "https://github.com/priyamehta", } },
        { name: "راهول فيرما", role: "مستشار أمن سيبراني", bio: "خبير في اكتشاف التهديدات، تقييم المخاطر، واستراتيجيات الأمن للشركات الناشئة والمؤسسات.", image: "images/it25.jpg", social: { linkedin: "https://www.linkedin.com/in/rahul-verma/", twitter: "https://twitter.com/rahulverma", github: "https://github.com/rahulverma", } },
        { name: "أنانيا آير", role: "متخصص تسويق رقمي", bio: "متخصص في SEO، التسويق بالمحتوى، واستراتيجيات النمو لشركات التكنولوجيا.", image: "images/it22.jpg", social: { linkedin: "https://www.linkedin.com/in/ananya-iyer/", twitter: "https://twitter.com/ananya_iyer", github: "https://github.com/ananya-iyer", } }
      ]
    },
    journey: {
      heading: "رحلتنا",
      subheading: "المعالم الرئيسية لنمونا",
      milestones: [
        { year: "2018", event: "تأسيس الشركة", description: "تأسست بهدف تقديم استشارات IT وحلول سحابية مبتكرة للأعمال." },
        { year: "2020", event: "أول نشر سحابي واسع النطاق", description: "تنفيذ ناجح لبنية سحابية متعددة المناطق لعميل مؤسسي رائد." },
        { year: "2022", event: "إطلاق خدمات الأمن السيبراني المتقدمة", description: "تقديم مجموعة شاملة من خدمات الأمن تتضمن معلومات التهديد وإدارة المخاطر." },
        { year: "2024", event: "توسع خدمات الذكاء الاصطناعي والأتمتة", description: "دمج أدوات أتمتة مدعومة بالذكاء الصناعي لتحسين كفاءة العملاء وتقليل التكاليف التشغيلية." },
        { year: "2025", event: "النمو العالمي والشراكات الاستراتيجية", description: "توسيع بصمة الأسواق العالمية بشراكات رئيسية لتعزيز التحول الرقمي عبر الصناعات." }
      ]
    },
    cta: {
      heading: "هل أنت مستعد لتحويل أعمالك؟",
      paragraph:
        "ابدأ اليوم مع استشارة مجانية واكتشف كيف يمكننا مساعدتك في تحقيق أهدافك.",
      btnStart: "ابدأ رحلتك",
      btnLearnMore: "تعرف علينا أكثر",
    },
  },
  he: {
    pageTitle: "אודותינו - DreamNest נדל״ן",
    hero: {
      title: "אודותינו",
      paragraph:
        "אנחנו מחויבים להעצים עסקים עם פתרונות טכנולוגיים חדשניים, ייעוץ IT מקצועי וטרנספורמציה דיגיטלית חלקה.",
      button: "צרו קשר עוד היום",
      videoSrc: "images/video3.mp4",
    },
    missionVision: {
      heading: "המשימה והחזון שלנו",
      paragraph:
        "מובילים טרנספורמציה דיגיטלית באמצעות חדשנות, מומחיות ומיקוד בלתי פוסק בהצלחת הלקוח.",
      imageAlt: "שיתוף פעולה צוותי",
    },
    statsData: [
      { value: 98, suffix: "%", text: "שימור לקוחות מבוסס אמון ואמינות." },
      { value: 50, suffix: "+", text: "שירות ענפים מגוונים כגון בריאות, פיננסים ועוד." },
      { value: 15, suffix: "+ שנים", text: "ניסיון מוכח במתן פתרונות IT סקלאביליים." },
      { value: 24, suffix: "/7", text: "תמיכה גלובלית להבטחת המשכיות עסקית בכל עת." },
    ],
    whatWeDo: {
      heading: "מה אנחנו עושים",
      paragraph:
        "שיטת העבודה שלנו מתמקדת בלקוח ומבטיחה שכל פתרון IT מותאם, מתפתח ומעצים את העסק שלך.",
      steps: [
        { id: 1, title: "גילוי", desc: "אנחנו חודרים לעומק צורכי העסק שלך, מעריכים מערכות נוכחיות ומאתרים הזדמנויות לחדשנות." },
        { id: 2, title: "אסטרטגיה", desc: "המומחים שלנו ייצרו מפת דרכים ממוקדת לקוח ויתאימו פתרונות IT במדויק עם יעדי העסק שלך בטווח הארוך." },
        { id: 3, title: "יישום", desc: "מעניקים פתרונות סקלאביליים עם דיוק, גמישות ומומחיות אמינה - מהענן ועד אפליקציות מותאמות." },
        { id: 4, title: "תמיכה", desc: "מעניקים ניטור, פתרון תקלות ותמיכה פרואקטיבית להבטחת ביצוע מערכת חלק." }
      ]
    },
    itServicesSection: {
      heading: "חזק את המותג שלך עם המומחיות שלנו",
      cards: [
        { id: 1, title: "תשתית ענן", desc: "פתרונות ענן איתנים: פריסה, הגירה, אבטחה וניהול שוטף לצמיחה טכנולוגית.", img: "images/services11.jpg", link: "/services" },
        { id: 2, title: "אבטחת סייבר", desc: "הגנה מקיפה: זיהוי איומים, תאימות, גיבויים ותגובה לאירועים לחוסן עסקי.", img: "images/services12.jpg", link: "/services" },
        { id: 3, title: "תמיכה IT מנוהלת", desc: "ניטור 24/7, פתרון תקלות ותמיכה למשתמש הקצה לשמירה על ביצועים חלקים ובטוחים.", img: "images/services13.jpg", link: "/services" }
      ]
    },
    coreValues: {
      heading: "הערכים שלי",
      subheading: "העקרונות שמנחים את מסע הפרילנס שלי",
      values: [
        { title: "תשתית ענן", description: "מתן פריסה, הגירה וניהול בענן בצורה סקלאבילית לסביבת IT אמינה.", icon: FaCloud },
        { title: "אבטחת סייבר", description: "יישום אסטרטגיות גלויות איומים מתקדמות וניהול תאימות והגנת מידע.", icon: FaShieldAlt },
        { title: "בינה מלאכותית ואוטומציה", description: "מנף אינטיליגנציה מלאכותית ואוטומציה לשיפור יעילות וצמצום טעויות.", icon: FaRobot },
        { title: "פתרונות IT מותאמים", description: "עיצוב תוכנות ותשתיות בהתאמה אישית לצרכי עסק ייחודיים.", icon: FaCogs }
      ]
    },
    leadership: {
      heading: "מנהיגות",
      subheading: "חדשנות תחת הנהגה מסורה",
      team: [
        { name: "אראב שרמה", role: "אדריכל פתרונות ענן", bio: "מעצב ומיישם תשתיות ענן סקלאביליות ובטוחות ללקוחות ארגוניים ברחבי העולם.", image: "images/it24.jpg", social: { linkedin: "https://www.linkedin.com/in/aarav-sharma/", twitter: "https://twitter.com/aaravsharma", github: "https://github.com/aaravsharma", } },
        { name: "פריה מטה", role: "מעצב UI/UX", bio: "יוצר ממשקים אינטואיטיביים למקסום חוויית המשתמש הדיגיטלית.", image: "images/it23.jpg", social: { linkedin: "https://www.linkedin.com/in/priya-mehta/", twitter: "https://twitter.com/priyamehta", github: "https://github.com/priyamehta", } },
        { name: "רחול ורמה", role: "יועץ אבטחת סייבר", bio: "מומחה בזיהוי איומים, הערכת סיכונים ואסטרטגיות אבטחה לעסקים וסטארטאפים.", image: "images/it25.jpg", social: { linkedin: "https://www.linkedin.com/in/rahul-verma/", twitter: "https://twitter.com/rahulverma", github: "https://github.com/rahulverma", } },
        { name: "אנניה אייר", role: "מומחית שיווק דיגיטלי", bio: "מומחית ב-SEO, שיווק תוכן ואסטרטגיות צמיחה לחברות טכנולוגיה.", image: "images/it22.jpg", social: { linkedin: "https://www.linkedin.com/in/ananya-iyer/", twitter: "https://twitter.com/ananya_iyer", github: "https://github.com/ananya-iyer", } }
      ]
    },
    journey: {
      heading: "המסע שלנו",
      subheading: "אבני דרך מרכזיות בצמיחת החברה",
      milestones: [
        { year: "2018", event: "הקמת החברה", description: "הוקמה במטרה לספק ייעוץ IT ופתרונות ענן חדשניים לעסקים." },
        { year: "2020", event: "פרויקט ענן רחב היקף ראשון", description: "סיפקנו תשתית ענן באזורים רבים עבור לקוח מוביל." },
        { year: "2022", event: "השקת שירותי אבטחת מידע מתקדמים", description: "הצגנו פתרונות אבטחה הכוללים מודיעין איומים וניהול סיכונים." },
        { year: "2024", event: "הרחבת שירותי AI ואוטומציה", description: "שילוב כלי אוטומציה מבוססי בינה מלאכותית לשיפור היעילות והפחתת עלויות." },
        { year: "2025", event: "התרחבות גלובלית ושיתופי פעולה אסטרטגיים", description: "הרחבנו את הפעילות העולמית בשיתופי פעולה מרכזיים לקידום טרנספורמציה דיגיטלית." }
      ]
    },
    cta: {
      heading: "מוכן לשדרג את העסק שלך?",
      paragraph: "התחל היום עם ייעוץ חינם וגלֵה כיצד נוכל לסייע לך להגיע ליעדיך.",
      btnStart: "התחל את המסע",
      btnLearnMore: "למידע נוסף עלינו",
    },
  }
};

// --- Custom Hook for stat animation ---
const useCounter = (target, duration = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const stepTime = Math.max(10, Math.floor(duration / target));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
};



const AboutUs = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });
  const marqueeRef = useRef(null);

  const [activeStep, setActiveStep] = useState(0);
  const [highlighted, setHighlighted] = useState(1);
  const [openIndex, setOpenIndex] = useState(-1);

  // Use hooks for each stat count at the top level (fixes rules of hooks error)
  const count0 = useCounter(t.statsData[0].value);
  const count1 = useCounter(t.statsData[1].value);
  const count2 = useCounter(t.statsData[2].value);
  const count3 = useCounter(t.statsData[3].value);
  const counts = [count0, count1, count2, count3];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % t.whatWeDo.steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [t.whatWeDo.steps.length]);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    const handleMouseEnter = () => (marquee.style.animationPlayState = "paused");
    const handleMouseLeave = () => (marquee.style.animationPlayState = "running");
    marquee.addEventListener("mouseenter", handleMouseEnter);
    marquee.addEventListener("mouseleave", handleMouseLeave);
    const observer = new IntersectionObserver(
      ([entry]) => {
        marquee.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
      },
      { threshold: 0.1 }
    );
    observer.observe(marquee);
    return () => {
      marquee.removeEventListener("mouseenter", handleMouseEnter);
      marquee.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.title = t.pageTitle;
  }, [t.pageTitle]);

  const items = [...t.coreValues.values, ...t.coreValues.values];

  const handleMouseEnter = idx => setHighlighted(idx);
  const handleMouseLeave = () => setHighlighted(1);

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

      {/* Mission & Vision */}
      <section className="w-full py-10 md:py-12 bg-[var(--bg-color)] flex items-center justify-center transition-colors duration-300">
        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-7 md:gap-10 px-2 md:px-4 items-stretch">
          <div className="flex w-full h-full">
            <img
              src="images/services32.jpg"
              alt={t.missionVision.imageAlt}
              className="object-cover w-full h-full rounded-2xl shadow-lg bg-[var(--sidebar-bg)]"
            />
          </div>
          <div className="w-full flex flex-col h-full justify-start">
            <motion.h2
              className="text-xl md:text-2xl font-bold text-[var(--heading-color)] text-center md:text-left mb-3"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {t.missionVision.heading}
            </motion.h2>
            <motion.p
              className="mb-5 text-sm md:text-base text-[var(--text-muted)] max-w-xl text-center md:text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {t.missionVision.paragraph}
            </motion.p>
            <div className="flex flex-col gap-4 h-full justify-between">
              {t.statsData.map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="w-full bg-[var(--card-bg)] rounded-2xl shadow-lg flex items-center gap-4 px-4 py-4"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 + 0.4, duration: 0.5 }}
                >
                  <span className="text-lg md:text-2xl font-extrabold text-[var(--primary-color)] min-w-[52px] md:min-w-[72px] select-none">
                    {counts[idx]}
                    {stat.suffix}
                  </span>
                  <span className="text-[var(--text-color)] text-sm md:text-base">{stat.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Steps */}
      <section className="py-20 bg-gradient-to-r from-[var(--bg-color)] to-[var(--input-bg)] transition-colors duration-500">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-[var(--heading-color)] mb-4"
          >
            {t.whatWeDo.heading}
          </motion.h2>
          <p className="text-lg text-[var(--text-muted)] mb-16 text-justify">{t.whatWeDo.paragraph}</p>
          <div className="relative flex flex-col md:flex-row md:justify-between items-center">
            {t.whatWeDo.steps.map((step, idx) => (
              <motion.div
                key={step.id}
                className={`relative flex flex-col items-center text-center max-w-sm mb-10 md:mb-0 cursor-pointer transition-all duration-500 ${
                  activeStep === idx ? "scale-110 text-[var(--primary-color)]" : "opacity-70"
                }`}
                onMouseEnter={() => setActiveStep(idx)}
              >
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl bg-[var(--card-bg)] mb-4"
                  animate={{
                    scale: activeStep === idx ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ repeat: activeStep === idx ? Infinity : 0, duration: 1.5 }}
                >
                  {(() => {
                    switch (step.id) {
                      case 1:
                        return <FaSearch className="text-3xl text-[var(--primary-color)]" />;
                      case 2:
                        return <FaProjectDiagram className="text-3xl text-[var(--primary-color)]" />;
                      case 3:
                        return <FaCogs className="text-3xl text-[var(--primary-color)]" />;
                      case 4:
                        return <FaHeadset className="text-3xl text-[var(--primary-color)]" />;
                      default:
                        return null;
                    }
                  })()}
                </motion.div>
                <h3
                  className={`text-xl font-semibold ${
                    activeStep === idx ? "text-[var(--primary-color)]" : "text-[var(--heading-color)]"
                  }`}
                >
                  {step.title}
                </h3>
                <p className="text-[var(--text-muted)] mt-2 max-w-[16rem] text-justify">{step.desc}</p>
                {idx < t.whatWeDo.steps.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute top-8 left-full w-24 h-1 bg-[var(--primary-color)] bg-opacity-20"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeStep >= idx ? 1 : 0 }}
                    transition={{ duration: 0.8 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IT Services Cards */}
      <section className="py-16 bg-[var(--input-bg)]">
        <div className="max-w-7xl mx-auto px-4 md:px-0">
          <div className="mb-10 flex flex-col items-center justify-center">
            <h2 className="font-bold text-center text-[var(--heading-color)] leading-tight text-3xl md:text-4xl whitespace-nowrap">
              {t.itServicesSection.heading}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.itServicesSection.cards.map((card, idx) => (
              <div
                key={card.id}
                className={`rounded-xl shadow-lg overflow-hidden flex flex-col cursor-pointer transition-all duration-300 ${
                  highlighted === idx
                    ? "border-4 border-[var(--primary-color)] bg-blue-100"
                    : "border border-[var(--card-bg)] bg-[var(--sidebar-bg)]"
                }`}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
              >
                {idx === 1 ? (
                  <>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <h3
                        className={`text-lg font-bold ${
                          highlighted === idx ? "text-[var(--primary-color)]" : "text-[var(--heading-color)]"
                        } mb-3`}
                      >
                        {card.title}
                      </h3>
                      <p
                        className={`text-sm mb-7 ${highlighted === idx ? "" : "text-[var(--text-color)]"}`}
                        style={highlighted === idx ? { color: "#222" } : {}}
                      >
                        {card.desc}
                      </p>
                      <Link
                        to={card.link}
                        className={`mt-auto font-semibold text-sm inline-block ${
                          highlighted === idx ? "text-[var(--primary-color)] hover:underline" : "text-[var(--primary-color)]"
                        }`}
                      >
                        Learn more &rarr;
                      </Link>
                    </div>
                    <div className="aspect-video bg-gray-100">
                      <img src={card.img} alt={card.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="aspect-video bg-gray-100">
                      <img src={card.img} alt={card.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <h3
                        className={`text-lg font-bold ${
                          highlighted === idx ? "text-[var(--primary-color)]" : "text-[var(--heading-color)]"
                        } mb-3`}
                      >
                        {card.title}
                      </h3>
                      <p
                        className={`text-sm mb-7 ${highlighted === idx ? "" : "text-[var(--text-color)]"}`}
                        style={highlighted === idx ? { color: "#222" } : {}}
                      >
                        {card.desc}
                      </p>
                      <Link
                        to={card.link}
                        className={`mt-auto font-semibold text-sm inline-block ${
                          highlighted === idx ? "text-[var(--primary-color)] hover:underline" : "text-[var(--primary-color)]"
                        }`}
                      >
                        Learn more &rarr;
                      </Link>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="values-section full-width">
        <div className="sectionss-header text-center">
          <h2>{t.coreValues.heading}</h2>
          <p>{t.coreValues.subheading}</p>
        </div>
        <div className="values-marquee-outer">
          <div className="values-marquee-inner" ref={marqueeRef}>
            {[...t.coreValues.values, ...t.coreValues.values].map((value, idx) => (
              <div className="value-card" key={idx}>
                <value.icon className="value-icon" />
                <h4>{value.title}</h4>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="section team-section full-width">
        <div className="sections-header text-center">
          <h2>{t.leadership.heading}</h2>
          <p>{t.leadership.subheading}</p>
        </div>
        <div className="team-grid">
          {t.leadership.team.map((member, index) => (
            <div
              className="team-card leader-card"
              key={index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            >
              <div className="team-image leader-image">
                <img src={member.image} alt={member.name} />
                <div className={"leader-overlay" + (openIndex === index ? " open" : "")}>
                  <div className="leader-overlay-content">
                    <h4>{member.name}</h4>
                    <span className="team-role">{member.role}</span>
                    <p className="team-bio">{member.bio}</p>
                    <div className="team-social">
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <FaLinkedin />
                      </a>
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <FaTwitter />
                      </a>
                      <a href={member.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <FaGithub />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Journey Section */}
       {/*
      <section className="py-20 bg-[var(--bg-color)] rounded-3xl shadow-lg border-2 border-transparent bg-origin-border bg-clip-padding bg-clip-border relative max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-[var(--heading-color)]">{t.journey.heading}</h2>
          <p className="text-lg text-[var(--text-muted)] mt-2">{t.journey.subheading}</p>
        </motion.div>
        <div className="relative w-full before:absolute before:top-5 before:bottom-0 before:left-1/2 before:-ml-1 before:w-1 before:rounded before:bg-[var(--secondary-color)] dark:before:bg-[var(--secondary-color)]">
          {t.journey.milestones.map((milestone, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={index}
                className={`relative w-1/2 px-8 py-6 box-border ${isLeft ? "left-0 text-right" : "left-1/2 text-left"}`}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="inline-block max-w-lg rounded-2xl bg-[var(--card-bg)] p-8 shadow-md border-2 border-[var(--primary-color)] relative z-10 transition-colors duration-300">
                  <div className="absolute top-7 right-8">
                    <span className="bg-[var(--primary-color)] text-white font-bold px-6 py-2 rounded-full text-lg select-none">{milestone.year}</span>
                  </div>
                  <h4 className="text-[var(--heading-color)] font-extrabold text-xl mb-3 mt-12">{milestone.event}</h4>
                  <p className="text-[var(--text-muted)] leading-relaxed text-base">{milestone.description}</p>
                </div>
                <span
                  className={`absolute top-6 w-7 h-7 rounded-full border-4 border-[var(--primary-color)] bg-[var(--accent-color)] shadow-md ${
                    isLeft ? "right-0 -mr-5" : "left-0 -ml-5"
                  }`}
                />
              </motion.div>
            );
          })}
        </div>
      </section>

      */}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-overlay">
          <div className="container">
            <motion.div className="cta-content text-center" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <h2>{t.cta.heading}</h2>
              <p>{t.cta.paragraph}</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary btn-large">
                  {t.cta.btnStart} <FaArrowRight />
                </Link>
                <Link to="/about" className="btn btn-outline btn-large">
                  {t.cta.btnLearnMore}
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

        {/*about freelancer*/}




          /* ===== Values Section (Theme-Based) ===== */
.values-section {
  background: var(--card-bg);
  padding: 80px 24px;
  overflow: hidden;
}

.section-header h2 {
  margin: 0 0 6px;
  font-size: 2rem;
  color: var(--heading-color);
}

.section-header p {
  color: var(--text-color);
  margin: 0 0 24px;
}

/* Marquee container */
.values-marquee-outer {
  width: 100vw;
  overflow: hidden;
  margin: 0 -32px;
  padding: 10px 0;
  position: relative;
}
.values-marquee-inner {
  display: flex;
  gap: 32px;
  animation: marquee-scroll 32s linear infinite;
  will-change: transform;
}
@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.values-marquee-inner:hover {
  animation-play-state: paused;
}

/* Value card styling */
.value-card {
  flex: 0 0 340px;
  background: var(--card-bg);
  padding: 32px 22px;
  border-radius: 18px;
  text-align: center;
  box-shadow: var(--shadow);
  border: 2.5px solid transparent;
  background-clip: padding-box;
  margin-bottom: 10px;
  min-height: 240px;
  transition: 
    transform 0.28s cubic-bezier(.45,.03,.44,1.01), 
    box-shadow .28s, 
    border .38s;
  position: relative;
}
.value-card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-10px) scale(1.038);
  border: 2.5px solid var(--primary-color);
  z-index: 2;
}
.value-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.8rem;
  color: var(--primary-color);
  margin-bottom: 16px;
  width: 100%;
  height: 48px;
}
.value-card h4 {
  font-size: 1.22rem;
  color: var(--heading-color);
  margin-bottom: 8px;
  margin-top: 0;
  font-weight: bold;
}
.value-card p {
  color: var(--text-color);
  margin: 0;
  font-size: 1.1rem;
}

/* SCROLLBAR for Marquee */
.values-marquee-outer::-webkit-scrollbar,
.values-marquee-inner::-webkit-scrollbar {
  height: 8px;
  background: var(--card-bg);
}
.values-marquee-inner::-webkit-scrollbar-thumb {
  background: var(--primary-color);
  border-radius: 6px;
}
.values-marquee-inner::-webkit-scrollbar-thumb:hover {
  background: var(--secondary-color);
}

/* Responsive: shrink card width and icon size */
@media (max-width: 700px) {
  .aboutit-section { padding: 0; width: 100vw; margin: 0; }
  .aboutit-grid { padding: 0; gap: 12px; width: 100vw; margin: 0; }
  .hero-section, .hero-overlay, .hero-content { width: 100vw !important; margin: 0 !important; padding-right: 0 !important; box-sizing: border-box; }
  .hero-title, .hero-paragraph, .hero-button { margin-right: 0 !important; }
  .section-header h2 { font-size: 1.18rem;}
}


          /* ===== Team ===== */
/* ===================== TEAM SECTION ===================== */
.team-section {
  background: var(--sidebar-bg, #f7f8f9);
  padding: 40px 0;
  margin-top: -70px;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 30px;
}

.leader-card {
  background: none;
  box-shadow: none;
  border: none;
  padding: 0;
  position: relative;
  cursor: pointer;
}

.leader-image {
  position: relative;
  width: 100%;
  height: 330px;
  overflow: hidden;
  border-radius: 18px;
  box-shadow: var(--shadow);
  transition: box-shadow 0.25s;
}

.leader-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
  border-radius: 18px;
  filter: brightness(0.97);
  transition: filter 0.28s;
}

.leader-card:hover .leader-image,
.leader-card:active .leader-image {
  box-shadow: var(--shadow-hover);
}

.leader-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(15,24,32,0.92), rgba(31,41,51,0.95), rgba(0,120,240,0.65));
  color: #fff;
  border-radius: 18px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.38s cubic-bezier(.81,-0.02,.18,1.04);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}

.leader-overlay.open {
  opacity: 1;
  pointer-events: auto;
  transition: opacity 0.25s cubic-bezier(.85,.03,.45,.96);
}

.leader-overlay-content {
  text-align: center;
  padding: 0 15px;
}

.leader-overlay h4 {
  color: #fff;
  font-size: 1.25rem;
  margin: 0 0 7px 0;
  font-weight: 700;
}

.leader-overlay .team-role {
  color: #fff;
  font-size: 1.05rem;
  font-weight: 500;
  margin-bottom: 6px;
  display: block;
}

.leader-overlay .team-bio {
  color: #fff;
  font-size: 0.98rem;
  margin: 7px 0 21px 0;
  line-height: 1.6;
}

.team-social {
  display: flex;
  justify-content: center;
  gap: 13px;
  margin-top: 10px;
}

.team-social a {
  color: #fff;
  background: rgba(0, 0, 0, 0.18);
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.26rem;
  transition: background 0.18s, color 0.18s;
}

.team-social a:hover {
  background: var(--primary-color, #0b5e2b);
  color: #fff;
}

/* ========== TABLET (≤1024px) ========== */
@media (max-width: 1024px) {
  .team-section {
    padding: 30px 0;
  }

  .team-grid {
    gap: 20px;
  }

  .leader-image {
    height: 280px;
  }

  .leader-overlay h4 {
    font-size: 1.15rem;
  }

  .leader-overlay .team-role {
    font-size: 1rem;
  }

  .leader-overlay .team-bio {
    font-size: 0.95rem;
  }
}

/* ========== MOBILE (≤768px) ========== */
@media (max-width: 768px) {
  .team-section {
    padding: 20px 0;
  }

  .team-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .leader-image {
    height: 250px;
    border-radius: 14px;
  }

  .leader-overlay-content {
    padding: 0 10px;
  }

  .leader-overlay h4 {
    font-size: 1.1rem;
  }

  .leader-overlay .team-role {
    font-size: 0.95rem;
  }

  .leader-overlay .team-bio {
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .team-social a {
    width: 34px;
    height: 34px;
    font-size: 1.1rem;
  }
}

/* ========== SMALL MOBILE (≤480px) ========== */
@media (max-width: 480px) {
  .leader-image {
    height: 220px;
  }

  .leader-overlay h4 {
    font-size: 1rem;
  }

  .leader-overlay .team-role {
    font-size: 0.88rem;
  }

  .leader-overlay .team-bio {
    font-size: 0.85rem;
  }

  .team-social a {
    width: 30px;
    height: 30px;
    font-size: 1rem;
  }
}


        /* ===== Timeline ===== */

        

{/* CTA Section */}
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
        `}</style>
      </div>
    );
  };

  export default AboutUs;
