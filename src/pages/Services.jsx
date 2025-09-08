import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaArrowRight } from 'react-icons/fa';
import { FiCode, FiLayout, FiTrendingUp } from 'react-icons/fi';
import { useLanguage } from "../context.jsx/LanguageContext";

const translations = {
  en: {
    hero: {
      title: "Our Services",
      paragraph: "We provide comprehensive IT solutions from strategy and consulting to implementation and support to empower your business with cutting-edge technology and seamless digital transformation.",
      button: "Reach Out Today",
      videoSrc: "images/videoss4.mp4"
    },
    expertSolutions: {
      heading: "Expert IT Solutions for Business",
      description: "I offer personalized IT and digital services designed to fit your unique needs—combining flexibility, creativity, and technical expertise. As a freelancer, I work directly with you to deliver practical, high-quality solutions that help your business grow.",
      servicesList: [
        "Cloud Migration & Management",
        "Cybersecurity & Risk Assessment",
        "Custom Software Development",
        "Data Analytics & AI Solutions",
        "24/7 IT Support & Monitoring",
        "DevOps Automation & Consulting",
        "Enterprise Network Architecture"
      ]
    },
    whatIOffer: {
      heading: "What I Offer",
      description: "Freelance digital services crafted to help you grow—flexible, creative, and tailored to your needs."
    },
    itServices: [
      {
        id: 1,
        title: "Cloud Infrastructure",
        color: "#1e90ff",
        image: "images/it26.jpg",
        description: "Upgrade legacy systems by migrating to scalable, secure cloud infrastructures.",
        features: [
          "Multi-cloud Deployment",
          "Automated Cloud Migration",
          "Cloud Cost Optimization"
        ],
        isNew: true
      },
      {
        id: 2,
        title: "Zero Trust Cybersecurity",
        color: "#008000",
        image: "images/it27.jpg",
        description: "Implement Zero Trust models to protect your data with real-time threat detection and strict access controls.",
        features: [
          "Continuous Authentication",
          "Micro-segmentation",
          "Real-time Threat Detection"
        ],
        isNew: true
      },
      {
        id: 3,
        title: "AI-Powered Automation",
        color: "#800080",
        image: "images/it28.jpg",
        description: "Automate repetitive tasks and enhance decision making with intelligent AI tools.",
        features: [
          "Intelligent Workflow Automation",
          "Natural Language Processing",
          "Predictive Analytics"
        ],
        isNew: true
      },
      {
        id: 4,
        title: "Data Science & Analytics",
        color: "#ff8c00",
        image: "images/it29.jpg",
        description: "Extract actionable insights with big data integration, custom machine learning models, and interactive dashboards.",
        features: [
          "Big Data Integration",
          "Custom ML Development",
          "Interactive Dashboards"
        ],
        isNew: true
      },
      {
        id: 5,
        title: "Cloud-Native Application",
        color: "#20b2aa",
        image: "images/it30.jpg",
        description: "Develop resilient and scalable cloud-native applications using microservices, containers, and CI/CD pipelines.",
        features: [
          "Microservices Architecture",
          "Kubernetes & Docker",
          "Continuous Integration/Delivery"
        ],
        isNew: true
      },
      {
        id: 6,
        title: "Remote IT Services",
        color: "#ff4500",
        image: "images/it31.jpg",
        description: "Deliver proactive 24/7 remote IT support and managed services to ensure smooth, secure business operations.",
        features: [
          "Helpdesk & Ticketing",
          "Network Monitoring & Alerts",
          "Regular Security Updates"
        ],
        isNew: true
      }
    ],
    portfolio: {
      heading: "My Portfolio",
      description: "A selection of freelance projects I’ve delivered for clients",
      categories: ["All", "Web Development", "Frontend", "App Development", "SEO", "Custom Software", "Web Design"]
    },
    portfolioItems: [
      { id: 1, title: "Online Store for Fashion Brand", category: "Web Development", image: "images/it32.jpg" },
      { id: 2, title: "Personal Portfolio for a Designer", category: "Frontend", image: "images/it33.jpg" },
      { id: 3, title: "Task Management App for Freelancers", category: "App Development", image: "images/it34.jpg" },
      { id: 4, title: "SEO Optimization for Travel Blog", category: "SEO", image: "images/it35.jpg" },
      { id: 5, title: "CRM System for Local Business", category: "Custom Software", image: "images/it36.jpg" },
      { id: 6, title: "Website Redesign for Startup", category: "Web Design", image: "images/it37.jpg" }
    ],
    solutionsFinder: {
      heading: "Find Your Perfect Solution",
      description: "Answer a few questions to get a personalized recommendation.",
      step1: "What is your main business challenge?",
      step2: "What is your business size?",
      steps: {
        1: [
          { value: "growth", label: "I need to grow my online presence." },
          { value: "efficiency", label: "I want to improve efficiency." },
          { value: "security", label: "I am concerned about data security." },
          { value: "support", label: "I need reliable support." }
        ],
        2: [
          { value: "small", label: "Small business (1-10 employees)" },
          { value: "medium", label: "Medium business (11-50 employees)" },
          { value: "large", label: "Large business (50+ employees)" }
        ]
      },
      back: "Back",
      recommendationTitle: "Your Recommended Solution",
      startOver: "Start Over",
      scheduleConsultation: "Schedule a Consultation",
      messages: {
        growthSmall: "We recommend our <strong>Web Development</strong> and <strong>Basic SEO</strong> services to help you build a strong online presence.",
        growthLarge: "We recommend a comprehensive strategy including <strong>Advanced SEO</strong>, <strong>Digital Marketing</strong>, and a custom <strong>E-commerce Solution</strong>.",
        efficiencySmall: "Our <strong>Cloud Migration & Setup</strong> service is perfect.",
        efficiencyLarge: "We recommend a full <strong>Custom Software Development</strong> project.",
        security: "Our <strong>Advanced Cybersecurity Suite</strong> protects your data.",
        support: "Our <strong>Managed IT Services</strong> and support packages are suited for you.",
        default: "Your personalized recommendation will appear here."
      }
    },
    pricing: {
      heading: "Our Pricing",
      description: "Simple, transparent pricing to fit any budget.",
      monthly: "Monthly",
      yearly: "Yearly",
      plans: {
        basic: {
          title: "Basic",
          description: "Perfect for small businesses starting out.",
          priceMonthly: 199,
          features: [
            "Custom Website Design",
            "Mobile Optimization",
            "Basic SEO",
            "24/7 Support"
          ],
          button: "Get Started"
        },
        pro: {
          title: "Pro",
          description: "Designed for growing businesses with advanced needs.",
          priceMonthly: 499,
          badge: "Recommended",
          features: [
            "Everything in Basic",
            "Advanced SEO & Analytics",
            "E-commerce Integration",
            "Priority Support"
          ],
          button: "Get Started"
        },
        enterprise: {
          title: "Enterprise",
          description: "For large-scale, customized solutions.",
          priceLabel: "Custom",
          features: [
            "Dedicated Project Manager",
            "Custom Development & Integrations",
            "Advanced Cybersecurity Suite",
            "Service Level Agreement (SLA)"
          ],
          button: "Contact Us"
        }
      }
    },
    cta: {
      heading: "Ready to Transform Your Business?",
      description: "Get started today with a free consultation and discover how we can help you achieve your goals.",
      startJourney: "Start Your Journey",
      learnMore: "Learn More About Us"
    }
  },
  ar: {
    hero: {
      title: "خدماتنا",
      paragraph: "نقدم حلولاً شاملة في تقنية المعلومات من الاستراتيجية إلى التنفيذ والدعم لتمكين عملك بأحدث التقنيات والتحول الرقمي السلس.",
      button: "تواصل معنا اليوم",
      videoSrc: "images/videoss4.mp4"
    },
    expertSolutions: {
      heading: "حلول تقنية متخصصة للأعمال",
      description: "أقدم خدمات تقنية رقمية مصممة خصيصًا لتلبية احتياجاتك الفريدة تجمع بين المرونة والإبداع والخبرة.",
      servicesList: [
        "الهجرة والإدارة السحابية",
        "تقييم وتحليل الأمن السيبراني",
        "تطوير برامج مخصصة",
        "تحليلات البيانات وحلول الذكاء الاصطناعي",
        "الدعم الفني والمراقبة 24/7",
        "أتمتة DevOps والاستشارات",
        "البنية التحتية للشبكات المؤسسية"
      ]
    },
    whatIOffer: {
      heading: "ماذا أقدم",
      description: "خدمات رقمية حرة ومرنة ومميزة لمساعدتك على النمو."
    },
    itServices: [
      {
        id: 1,
        title: "البنية التحتية السحابية",
        color: "#1e90ff",
        image: "images/it26.jpg",
        description: "تحديث الأنظمة القديمة من خلال الانتقال إلى بنى تحتية سحابية قابلة للتوسع وآمنة.",
        features: ["نشر سحابي متعدد", "ترحيل سحابي آلي", "تحسين تكاليف السحابة"],
        isNew: true
      },
      {
        id: 2,
        title: "أمن سيبراني بثقة صفرية",
        color: "#008000",
        image: "images/it27.jpg",
        description: "تنفيذ نموذج الثقة الصفرية لحماية بياناتك مع اكتشاف التهديدات والتحكم الصارم بالصلاحيات.",
        features: ["مصادقة مستمرة", "تجزئة دقيقة", "كشف تهديدات مباشر"],
        isNew: true
      },
      {
        id: 3,
        title: "أتمتة الذكاء الاصطناعي",
        color: "#800080",
        image: "images/it28.jpg",
        description: "أتمتة المهام المتكررة وتحسين اتخاذ القرار بأدوات ذكية.",
        features: ["تشغيل عمليات ذكية", "معالجة لغة طبيعية", "تحليلات تنبؤية"],
        isNew: true
      },
      {
        id: 4,
        title: "علم البيانات والتحليلات",
        color: "#ff8c00",
        image: "images/it29.jpg",
        description: "استخرج الرؤى من البيانات من خلال التكامل والنماذج والتحاليل.",
        features: ["تكامل بيانات ضخم", "نماذج تعلم آلي", "لوحات تحكم تفاعلية"],
        isNew: true
      },
      {
        id: 5,
        title: "تطبيقات سحابية",
        color: "#20b2aa",
        image: "images/it30.jpg",
        description: "تطوير تطبيقات مرنة وسريعة ضمن بنى خدمات مصغرة وعمليات تسليم مستمرة.",
        features: ["بنية خدمات مصغرة", "Kubernetes وDocker", "تكامل وتسليم مستمر"],
        isNew: true
      },
      {
        id: 6,
        title: "خدمات IT عن بعد",
        color: "#ff4500",
        image: "images/it31.jpg",
        description: "دعم وصيانة تقنية المعلومات عن بعد طوال اليوم لضمان استمرار العمل.",
        features: ["مكتب مساعدة وتذاكر", "مراقبة وتنبيهات الشبكة", "تحديثات أمن دورية"],
        isNew: true
      }
    ],
    portfolio: {
      heading: "أعمالي",
      description: "مجموعة من المشاريع التي أُنجزت للعملاء",
      categories: ["الكل", "تطوير الويب", "الواجهة الأمامية", "تطوير التطبيقات", "تحسين محركات البحث", "برمجيات مخصصة", "تصميم الويب"]
    },
    portfolioItems: [
      { id: 1, title: "متجر أزياء عبر الإنترنت", category: "تطوير الويب", image: "images/it32.jpg" },
      { id: 2, title: "محفظة شخصية لمصمم", category: "الواجهة الأمامية", image: "images/it33.jpg" },
      { id: 3, title: "تطبيق إدارة مهام للمستقلين", category: "تطوير التطبيقات", image: "images/it34.jpg" },
      { id: 4, title: "تحسين SEO لمدونة السفر", category: "تحسين محركات البحث", image: "images/it35.jpg" },
      { id: 5, title: "نظام CRM للأعمال المحلية", category: "برمجيات مخصصة", image: "images/it36.jpg" },
      { id: 6, title: "إعادة تصميم لموقع ناشئ", category: "تصميم الويب", image: "images/it37.jpg" }
    ],
    solutionsFinder: {
      heading: "ابحث عن الحل المثالي",
      description: "أجب على بعض الأسئلة لتحصل على توصية مخصصة.",
      step1: "ما هو التحدي الرئيسي في عملك؟",
      step2: "ما هو حجم عملك؟",
      steps: {
        1: [
          { value: "growth", label: "أحتاج لتنمية وجودي الرقمي." },
          { value: "efficiency", label: "أرغب بتحسين الكفاءة." },
          { value: "security", label: "أهتم بأمن البيانات." },
          { value: "support", label: "أحتاج لدعم موثوق." }
        ],
        2: [
          { value: "small", label: "صغير (1-10 موظفين)" },
          { value: "medium", label: "متوسط (11-50 موظف)" },
          { value: "large", label: "كبير (50+ موظف)" }
        ]
      },
      back: "رجوع",
      recommendationTitle: "توصيتك الشخصية",
      startOver: "ابدأ من جديد",
      scheduleConsultation: "جدولة استشارة",
      messages: {
        growthSmall: "ننصحك بتطوير المواقع وSEO الأساسي.",
        growthLarge: "ندعوك إلى استراتيجية شاملة تشمل SEO متقدم وتسويق رقمي متعدد.",
        efficiencySmall: "خدمة الهجرة والإعداد السحابي تناسبك.",
        efficiencyLarge: "ننصحكم بتطوير برمجيات حسب الطلب.",
        security: "مجموعة الأمن السيبراني المتقدمة تحمي بياناتك.",
        support: "الحزم المدارة للدعم الفني تلبي احتياجاتك.",
        default: "ستظهر هنا التوصية الشخصية."
      }
    },
    pricing: {
      heading: "الأسعار",
      description: "خطط أسعار واضحة تناسب كل الميزانيات.",
      monthly: "شهريًا",
      yearly: "سنويًا",
      plans: {
        basic: {
          title: "أساسي",
          description: "مثالي للشركات الناشئة.",
          priceMonthly: 199,
          features: [
            "تصميم موقع مخصص",
            "تحسين للجوال",
            "SEO أساسي",
            "دعم 24/7"
          ],
          button: "ابدأ الآن"
        },
        pro: {
          title: "متقدم",
          description: "مخصص للأعمال النامية.",
          priceMonthly: 499,
          badge: "موصى به",
          features: [
            "كل ما في الأساسي",
            "SEO وتحليلات متقدمة",
            "تكامل التجارة الإلكترونية",
            "دعم ذو أولوية"
          ],
          button: "ابدأ الآن"
        },
        enterprise: {
          title: "مؤسسات",
          description: "حلول مخصصة للمؤسسات.",
          priceLabel: "مُخصص",
          features: [
            "مدير مشروع مخصص",
            "تطوير وتكامل مخصص",
            "مجموعة أمان متقدمة",
            "اتفاقية مستوى الخدمة (SLA)"
          ],
          button: "تواصل معنا"
        }
      }
    },
    cta: {
      heading: "هل أنت مستعد لتحويل عملك؟",
      description: "ابدأ اليوم باستشارة مجانية واكتشف كيف يمكننا تحقيق أهدافك.",
      startJourney: "ابدأ رحلتك",
      learnMore: "تعرف أكثر"
    }
  }
};

const Services = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const isRTL = language === 'ar';

  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [choices, setChoices] = useState({});
  const [portfolioFilter, setPortfolioFilter] = useState("All");
  const [isYearly, setIsYearly] = useState(false);

  const monthlyPrices = [199, 499];
  const yearlyPrices = monthlyPrices.map(price => Math.round(price * 12 * 0.8));

  const portfolioItems = t.portfolioItems || [];
  const filteredItems = portfolioFilter === "All"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === portfolioFilter);

  const itServices = t.itServices;
  const servicesList = t.expertSolutions.servicesList;

  const handleToggleChange = () => setIsYearly(prev => !prev);

  const handleCardClick = (stepId, value) => {
    setChoices(prev => ({ ...prev, [stepId]: value }));
    setTimeout(() => setCurrentStep(currentStep < 3 ? currentStep + 1 : 4), 300);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleStartOver = () => {
    setChoices({});
    setCurrentStep(1);
    setTimeout(() => navigate('/contact'), 100);
  };

  const generateRecommendation = () => {
    const challenge = choices["step-1"];
    const size = choices["step-2"];
    if (!challenge || !size) return t.solutionsFinder.messages.default;
    if (challenge === "growth" && size === "small") return t.solutionsFinder.messages.growthSmall;
    if (challenge === "growth" && (size === "medium" || size === "large")) return t.solutionsFinder.messages.growthLarge;
    if (challenge === "efficiency" && size === "small") return t.solutionsFinder.messages.efficiencySmall;
    if (challenge === "efficiency" && (size === "medium" || size === "large")) return t.solutionsFinder.messages.efficiencyLarge;
    if (challenge === "security") return t.solutionsFinder.messages.security;
    if (challenge === "support") return t.solutionsFinder.messages.support;
    return t.solutionsFinder.messages.default;
  };

  const stepsData = t.solutionsFinder.steps;

  return (
    <div className="services-page" dir={isRTL ? "rtl" : "ltr"}>
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
            <Link to="/contact" className="hero-button animate-fade-up-delayed">{t.hero.button}</Link>
          </div>
        </div>
      </section>

      {/* Expert Solutions Section */}
      <section className="bg-[var(--bg-color)] text-[var(--text-color)] px-8 py-8 font-poppins transition-all duration-300">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.video
                key="service-video"
                src={t.hero.videoSrc}
                autoPlay
                loop
                muted
                controls
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="w-full h-[500px] rounded-2xl shadow-lg object-cover bg-[var(--card-bg)]"
              />
            </AnimatePresence>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center text-left"
          >
            <h2 className="text-[2.4rem] font-bold text-[var(--heading-color)] mb-5 leading-[1.1] transition-colors duration-300">
              {t.expertSolutions.heading}
            </h2>
            <p className="mb-6 leading-relaxed text-base text-[var(--text-color)] text-justify">
              {t.expertSolutions.description}
            </p>
            <ul className="list-none p-0 m-0">
              {servicesList.map((item, i) => (
                <motion.li
                  key={i}
                  whileHover={{ scale: 1.05, x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center mb-3 text-base text-[var(--text-color)]"
                >
                  <span className="inline-block w-[10px] h-[10px] rounded-full mr-3 bg-[var(--text-color)]"></span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* IT Services Grid */}
      <section className="section it-grid-section">
        <div className="container">
          <motion.div
            className="it-section-header align-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>{t.whatIOffer.heading}</h2>
            <p>{t.whatIOffer.description}</p>
          </motion.div>
          <div className="it-services-flex">
            {itServices.map((service, index) => (
              <motion.div
                key={service.id}
                className="it-service-tile"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="it-img-box">
                  <img src={service.image} alt={service.title} />
                  {service.isNew && (
                    <span className="it-badge-new">New!</span>
                  )}
                </div>
                <div className="it-card-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="it-feature-list">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="it-feature-row">
                        <FaCheck className="it-check" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to={`/service${service.id}`}
                    className="it-link"
                    style={{ color: service.color }}
                  >
                    Learn More <FaArrowRight />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="portfolio-section">
        <div className="portfolio-header text-center">
          <h2>{t.portfolio.heading}</h2>
          <p>{t.portfolio.description}</p>
        </div>
        <div className="portfolio-filters">
          {t.portfolio.categories.map(cat => (
            <button
              key={cat}
              className={portfolioFilter === cat ? "active" : ""}
              onClick={() => setPortfolioFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="portfolio-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="portfolio-card">
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.category}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Solutions Finder Section */}
  <section
  id="solutions-finder"
  className="py-20 bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300 font-inter"
  dir={isRTL ? 'rtl' : 'ltr'}
>
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--heading-color)]">
      {t.solutionsFinder.heading}
    </h2>
    <p className="text-lg mb-12 max-w-xl mx-auto text-[var(--text-muted)]">
      {t.solutionsFinder.description}
    </p>
    {/* Only show the intro image on steps 1/2 */}
    
    {[1, 2].map((stepNum) => (
      <div key={stepNum} style={{ display: stepNum === currentStep ? "block" : "none" }}>
        <h3 className="text-2xl font-semibold mb-6 text-[var(--heading-color)]">
          {stepNum === 1 ? t.solutionsFinder.step1 : t.solutionsFinder.step2}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stepsData[stepNum].map(({ value, label }) => {
            const selected = choices[`step-${stepNum}`] === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => handleCardClick(`step-${stepNum}`, value)}
                className={`
                  rounded-2xl flex flex-col items-center justify-center text-center w-full min-h-[148px] p-10 font-medium
                  border-2 shadow-md transition
                  ${
                    selected
                      ? "border-[var(--primary-color)] bg-[var(--sidebar-bg)] text-[var(--heading-color)] shadow-lg scale-105"
                      : "border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-color)]"
                  }
                `}
                style={{
                  boxShadow: "var(--card-shadow)",
                  cursor: "pointer",
                  borderRadius: 18,
                  transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s, background-color 0.3s"
                }}
              >
                <p className="text-lg font-medium">{label}</p>
              </button>
            );
          })}
        </div>
        {stepNum === 2 && (
          <div className="mt-8">
            <button
              id="back-btn"
              type="button"
              onClick={handleBack}
              className="px-6 py-3 bg-[var(--card-bg)] text-[var(--text-color)] rounded-lg hover:bg-[var(--sidebar-bg)] transition"
            >
              {t.solutionsFinder.back}
            </button>
          </div>
        )}
      </div>
    ))}
    {/* Only show the result image ONCE, above the recommendation, on step 3 */}
    {currentStep === 3 && (
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-[var(--heading-color)]">
          {t.solutionsFinder.recommendationTitle}
        </h3>
        
        <div className="bg-[var(--primary-color)] text-white p-8 rounded-xl shadow transition-all duration-300">
          <p id="solution-recommendation" className="text-xl font-medium"
            dangerouslySetInnerHTML={{ __html: generateRecommendation() }} />
          <Link
            to="/contact"
            className="inline-block mt-6 w-full px-4 py-3 bg-white text-[var(--primary-color)] rounded-lg text-center font-semibold hover:bg-gray-100 transition"
          >
            {t.solutionsFinder.scheduleConsultation}
          </Link>
        </div>
        <div className="mt-8">
          <button
            id="start-over-btn"
            type="button"
            onClick={handleStartOver}
            className="px-6 py-3 bg-[var(--card-bg)] text-[var(--text-color)] rounded-lg hover:bg-[var(--sidebar-bg)] transition"
          >
            {t.solutionsFinder.startOver}
          </button>
        </div>
      </div>
    )}
  </div>
</section>


      {/* Pricing Section */}
      <section id="pricing" className="bg-[var(--bg-color)] text-[var(--text-color)] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--heading-color)]">{t.pricing.heading}</h2>
          <p className="text-lg mb-12 max-w-2xl mx-auto text-[var(--text-muted)]">
            {t.pricing.description}
          </p>
          <div className="flex justify-center mb-12">
            <label className="relative inline-block w-36 h-10 cursor-pointer">
              <input
                type="checkbox"
                checked={isYearly}
                onChange={handleToggleChange}
                className="opacity-0 w-0 h-0"
              />
              <span className="absolute top-0 left-0 right-0 bottom-0 bg-[var(--sidebar-bg)] rounded-full flex items-center justify-around text-sm font-medium text-[var(--text-muted)] transition-colors duration-400">
                <span className={`${!isYearly ? 'text-[var(--heading-color)] font-semibold' : ''}`}>{t.pricing.monthly}</span>
                <span className={`${isYearly ? 'text-[var(--heading-color)] font-semibold' : ''}`}>{t.pricing.yearly}</span>
              </span>
              <span
                className={`absolute left-1 bottom-1 bg-[var(--card-bg)] w-[68px] h-[32px] rounded-full shadow-md transition-transform duration-400 ${
                  isYearly ? 'translate-x-[68px]' : ''
                }`}
              ></span>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(t.pricing.plans).map(([key, plan]) => (
              <div key={key} className={`p-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 ${key === 'pro' ? 'bg-[var(--primary-color)] text-[var(--card-bg)] border-4 border-[var(--secondary-color)] scale-105 relative' : 'bg-[var(--card-bg)] text-[var(--text-color)] border-2 border-transparent'}`}>
                {plan.badge && <span className="absolute top-0 right-0 mt-4 mr-4 bg-[var(--warning-color)] text-[var(--danger-color)] text-xs font-bold px-3 py-1 rounded-full uppercase">{plan.badge}</span>}
                <h3 className="text-2xl font-semibold mb-2">{plan.title}</h3>
                <p className={`${key === 'pro' ? 'text-black' : 'text-[var(--text-muted)]'} mb-6`}>{plan.description}</p>
                <div className="mb-6">
                  <span className={`${key === 'pro' ? 'text-white' : 'text-[var(--primary-color)]'} text-5xl font-extrabold`}>
                    {key === 'enterprise' ? plan.priceLabel : (isYearly ? yearlyPrices[key === 'basic' ? 0 : 1] : monthlyPrices[key === 'basic' ? 0 : 1])}
                  </span>
                  <span className={`${key === 'pro' ? 'text-black' : 'text-[var(--text-muted)]'} text-xl ml-2`}>/{isYearly ? 'yr' : 'mo'}</span>
                </div>
                <ul className={`mb-8 space-y-3 text-left ${key === 'pro' ? 'text-white' : 'text-[var(--text-color)]'}`}>
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center">
                      <FaCheck className="mr-2" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <a href="/contact" className={`inline-block w-full py-3 rounded-lg font-semibold ${key === 'pro' ? 'bg-[var(--card-bg)] text-[var(--primary-color)] hover:bg-[var(--sidebar-bg)]' : 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'} transition-colors duration-200`}>
                  {plan.button}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

    
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
                   <h2>Ready to Transform Your Business?</h2>
                   <p>
                     Get started today with a free consultation and discover how we can help you achieve your goals.
                   </p>
                   <div className="cta-buttons">
                     <Link to="/contact" className="btn btn-primary btn-large">
                       Start Your Journey <FaArrowRight />
                     </Link>
                     <Link to="/about" className="btn btn-outline btn-large">
                       Learn More About Us
                     </Link>
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


{/*what i offer section*/}

  .services-section {
    padding: 1rem; /* Reduce section padding for mobile */
  }

  .services-heading {
    font-size: 1.1rem; /* Slightly smaller heading for mobile */
    margin-bottom: 1.5rem; /* Reduce spacing below the heading */
  }

  .services-content {
    text-align: center;
    padding: 0 0.5rem; /* Add horizontal padding for readability */
  }

  .services-text {
    font-size: 0.95rem; /* Decrease paragraph font size */
    margin-bottom: 1rem; /* Decrease space below paragraph */
  }

  .services-item {
    font-size: 0.95rem; /* Decrease feature bullet font size */
    margin-bottom: 0.5rem; /* Reduce margin between items */
  }

  .services-image img {
    height: 240px; /* Reduce image height for mobile */
  }
}




{/* Portfolio Section */}
.portfolio-section {
  position: relative;
  padding: 80px 24px;
  background: var(--bg-color);
  color: var(--text-color);
  overflow: hidden;
  border-radius: 18px;
}

/* Dynamic subtle moving dot background */
.portfolio-section::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(circle at center,
    var(--primary-color) 2px,
    transparent 3px);
  background-size: 40px 40px;
  animation: moveDots 30s linear infinite;
  opacity: 0.15; /* Increased opacity for visibility */
}

@media (prefers-color-scheme: dark) {
  .portfolio-section::before {
    background: radial-gradient(circle at center,
      var(--accent-color) 3px,
      transparent 4px);
    opacity: 0.2; /* Slightly higher in dark mode */
  }
}

@keyframes moveDots {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 40px 40px;
  }
}

/* Header */
.portfolio-header {
  text-align: center;
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
}
.portfolio-header h2 {
  font-size: 2.6rem;
  font-weight: 800;
  margin-bottom: 8px;
  color: var(--heading-color);
}
.portfolio-header p {
  font-size: 1.1rem;
  color: var(--text-muted);
  margin: 0;
}

/* Filters */
.portfolio-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
}
.portfolio-filters button {
  background: var(--card-bg);
  color: var(--text-color);
  border: 1.8px solid var(--border-color);
  padding: 10px 24px;
  border-radius: 40px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
.portfolio-filters button:hover,
.portfolio-filters button.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

/* Portfolio Grid with responsive columns */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  position: relative;
  z-index: 1;
  justify-content: center; /* Center items if fewer than 3 */
}


@media (max-width: 1024px) {
  .portfolio-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columns tablet */
  }
}

@media (max-width: 600px) {
  .portfolio-grid {
    grid-template-columns: 1fr; /* 1 column mobile */
  }
}

/* Portfolio cards */
.portfolio-card {
  background: var(--card-bg);
  border-radius: 22px;
  box-shadow: var(--shadow);
  border: 3px solid transparent;
  background-image: linear-gradient(var(--bg-color), var(--bg-color)),
                    linear-gradient(135deg, var(--primary-color), var(--accent-color));
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.3s ease, border-image-source 0.3s ease;
  display: flex;
  flex-direction: column;
}

.portfolio-card:hover {
  box-shadow: var(--shadow-hover);
  border-image-slice: 1;
  border-image-source: linear-gradient(315deg, var(--primary-color), var(--accent-color));
  border-radius: 22px;
}

/* Image */
.portfolio-card img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 18px 18px 0 0;
  transition: transform 0.3s ease;
}

.portfolio-card:hover img {
  transform: scale(1.05);
}

/* Title and Category */
.portfolio-card h3 {
  font-size: 1.28rem;
  font-weight: 700;
  color: var(--heading-color);
  margin: 16px 16px 0 16px;
}

.portfolio-card p {
  font-size: 0.95rem;
  font-weight: 500;
  margin: 4px 16px 20px 16px;
  color: var(--text-muted);
}

/* Responsive font size for portfolio header */
@media (max-width: 768px) {
  .portfolio-header h2 {
    font-size: 1.9rem;
  }
  .portfolio-filters {
    gap: 10px;
  }
}



{/* IT services */}

    .it-grid-section {
  background: var(--bg-color);
  padding: 0 0;
}

.it-section-header.align-center {
  text-align: center;
  margin-bottom: 24px;
}
.it-section-header.align-center h2 {
  color: var(--heading-color);
  font-size: 2.3rem;
  font-weight: 800;
  margin-bottom: 8px;
}
.it-section-header.align-center p {
  color: var(--text-muted);
  font-size: 1.1rem;
}

.it-services-flex {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
  margin-top: 10px;
}

.it-service-tile {
  background: var(--card-bg);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  transition: all 0.3s cubic-bezier(.62,.02,.34,1.03);
  display: flex;
  flex-direction: column;
  position: relative;
}

.it-service-tile:hover {
  box-shadow: var(--shadow-hover);
}

.it-img-box {
  position: relative;
  height: 200px;
  overflow: hidden;
  border-radius: 15px 15px 0 0;
}
.it-img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s cubic-bezier(.62,.02,.34,1.03);
}
.it-service-tile:hover .it-img-box img {
  transform: scale(1.08);
}

.it-img-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.36);
  display: flex;
  align-items: center;
  justify-content: center;
}

.it-service-icon {
  font-size: 2.4rem;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.21));
}

.it-badge-new {
  position: absolute;
  top: 18px;
  right: 18px;
  background: rgba(255,21,21,0.09);
  color: #e60023;
  border: 1.5px solid #e60023;
  font-weight: 700;
  font-size: 1.07rem;
  padding: 7px 20px 6px 20px;
  border-radius: 1.7em;
  z-index: 2;
  box-shadow: 0 6px 26px 0 rgba(255,0,30,0.07);
  letter-spacing: 1px;
}

.it-card-content {
  padding: 30px 30px 20px 30px;
  background: var(--card-bg);
}
.it-card-content h3 {
  font-size: 1.32rem;
  color: var(--heading-color);
  font-weight: 800;
  margin-bottom: 14px;
}
.it-card-content p {
  color: var(--text-color);
  font-size: 1.07rem;
  line-height: 1.63;
  margin-bottom: 16px;
}
.it-feature-list {
  margin-bottom: 20px;
}
.it-feature-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 7px;
  font-size: 0.97rem;
  color: var(--text-color);
}
.it-check {
  color: var(--accent-color);
  font-size: 0.87rem;
}
.it-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.23s;
}
.it-link:hover {
  transform: translateX(7px);
}

/* Responsive */
@media (max-width: 768px) {
  .it-services-flex {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .it-card-content {
    padding: 20px 16px 18px 16px;
    text-align: left;
  }
  .it-section-header.align-center h2 {
    font-size: 1.6rem;
  }
}



{/*freelancer services */}



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

    

      `}</style>
    </div>
  );
};

export default Services;
