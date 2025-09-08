import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaCalendar,
  FaUser,
  FaTag,
  FaClock,
  FaArrowRight,
  FaThumbsUp,
  FaShare,
  FaComment,
} from 'react-icons/fa';
import { useLanguage } from "../context.jsx/LanguageContext";

const translations = {
  en: {
    pageTitle: "Blog - ForStackly IT Solutions",
    heroTitle: "Blog",
    heroParagraph: "Welcome to ForStackly’s IT blog—a curated hub of insights, innovation, and expert advice tailored for modern businesses embracing technology.",
    heroButton: "Reach Out Today",
    featured: "Featured",
    postsSection: {
      latest: "Latest Articles",
      category: "{category} Articles",
      found: "{count} articles found"
    },
    meta: {
      author: "By",
      date: "Last viewed",
      readTime: "min read"
    },
    actions: {
      readMore: "Read More",
      like: "Like",
      comment: "Comment",
      share: "Share",
      post: "Post"
    },
    spotlight: {
      title: "In The Spotlight",
      subtitle: "Handpicked Articles",
      description: "A curated selection of our top IT services insights, updates, and expert advice. Click any title below to explore how our solutions empower your business."
    },
    ctaHeading: "Ready to Transform Your Business?",
    ctaParagraph: "Get started today with a free consultation and discover how we can help you achieve your goals.",
    ctaStart: "Start Your Journey",
    ctaLearn: "Learn More About Us"
  },
  ar: {
    pageTitle: "المدونة - حلول فورستاكلي لتقنية المعلومات",
    heroTitle: "مدونة",
    heroParagraph: "مرحبًا بك في مدونة التقنية الخاصة بنا—مصدر للخبرات، الابتكار والنصائح المتخصصة للأعمال الحديثة.",
    heroButton: "تواصل معنا اليوم",
    featured: "مميز",
    postsSection: {
      latest: "أحدث المقالات",
      category: "مقالات {category}",
      found: "تم العثور على {count} مقالة"
    },
    meta: {
      author: "بقلم",
      date: "آخر مشاهدة",
      readTime: "دقائق قراءة"
    },
    actions: {
      readMore: "اقرأ المزيد",
      like: "إعجاب",
      comment: "تعليق",
      share: "مشاركة",
      post: "نشر"
    },
    spotlight: {
      title: "الأبرز",
      subtitle: "مقالات مختارة",
      description: "مجموعة مختارة من أهم تحديثات خدمات تقنية المعلومات ونصائح الخبراء لدينا. انقر على أي عنوان لاستكشاف كيف تعزز حلولنا أعمالك."
    },
    ctaHeading: "جاهز لتطوير أعمالك؟",
    ctaParagraph: "ابدأ اليوم باستشارة مجانية واكتشف كيف يمكننا مساعدتك في تحقيق أهدافك.",
    ctaStart: "ابدأ رحلتك",
    ctaLearn: "تعرف أكثر علينا"
  },
  he: {
    pageTitle: "בלוג - פתרונות פורסטאקלי IT",
    heroTitle: "בלוג",
    heroParagraph: "ברוך הבא לבלוג שלנו—מרכז תוכן, חדשנות, והמלצות מקצועיות לעסקים בעידן הדיגיטלי.",
    heroButton: "צור קשר עכשיו",
    featured: "מומלץ",
    postsSection: {
      latest: "המאמרים האחרונים",
      category: "מאמרים ב־{category}",
      found: "נמצאו {count} מאמרים"
    },
    meta: {
      author: "מאת",
      date: "נצפה לאחרונה",
      readTime: "דקות קריאה"
    },
    actions: {
      readMore: "קרא עוד",
      like: "אהבתי",
      comment: "תגובה",
      share: "שתף",
      post: "שלח"
    },
    spotlight: {
      title: "באור הזרקורים",
      subtitle: "כתבות נבחרות",
      description: "מבחר מהמאמרים המובילים והטיפים המקצועיים שלנו—לחץ על כותרת כדי לראות איך השירותים שלנו מקדמים את העסק שלך."
    },
    ctaHeading: "מוכן לשדרג את העסק?",
    ctaParagraph: "התחל עוד היום עם ייעוץ חינם וגלה איך נוכל להגשים את מטרותיך.",
    ctaStart: "התחל את המסע",
    ctaLearn: "למידע נוסף"
  }
};

function formatDate(dateString, language) {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (language === "ar")
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
  if (language === "he")
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getBlogReadInfo(postId, defaultReadTime, defaultDate) {
  try {
    const stats = JSON.parse(localStorage.getItem('blogInteractions') || '{}');
    const post = stats[postId] || {};
    return {
      lastViewed: post.lastViewed,
      readTime: post.readTime || defaultReadTime,
      date: defaultDate
    };
  } catch {
    return { lastViewed: null, readTime: defaultReadTime, date: defaultDate };
  }
}

const blogPosts = [
  {
    id: 1,
    title: {
      en: 'Driving Business Growth with Managed IT Services',
      ar: 'تعزيز نمو الأعمال من خلال خدمات IT مُدارة',
      he: 'צמיחה עסקית עם שירותי IT מנוהלים'
    },
    excerpt: {
      en: 'Learn how managed IT services optimize your operations, reduce costs, and ensure reliable business continuity.',
      ar: 'تعرّف كيف تعزز خدمات IT المُدارة عملياتك، تقلل التكاليف وتضمن استمرارية العمل.',
      he: 'כיצד שירותי IT מנוהלים מייעלים תפעול, חוסכים כסף ומבטיחים המשכיות עסקית.'
    },
    author: { en: 'Alex Johnson', ar: 'أليكس جونسون', he: 'אלכס ג\'ונסון' },
    date: '2025-03-10',
    readTime: 7,
    category: { en: 'IT Services', ar: 'خدمات IT', he: 'שירותי IT' },
    image: 'images/it54.jpg',
    featured: true,
  },
  {
    id: 2,
    title: {
      en: 'Essential Cybersecurity Practices for IT Teams',
      ar: 'أفضل ممارسات الأمن السيبراني لفرق IT',
      he: 'שיטות אבטחת סייבר עיקריות לצוותי IT'
    },
    excerpt: {
      en: 'Protect your organization with best-in-class cybersecurity strategies designed for modern IT environments.',
      ar: 'حَمِ مؤسستك بأحدث استراتيجيات الأمن السيبراني المصممة لبيئة IT حديثة.',
      he: 'הגנו על הארגון עם אסטרטגיות אבטחת סייבר מתקדמות לסביבה מודרנית.'
    },
    author: { en: 'Linda Yang', ar: 'ليندا يانغ', he: 'לינדה יאנג' },
    date: '2025-02-28',
    readTime: 8,
    category: { en: 'Cybersecurity', ar: 'أمن سيبراني', he: 'אבטחת סייבר' },
    image: 'images/it55.jpg',
    featured: false,
  },
  {
    id: 3,
    title: {
      en: 'Harnessing Cloud Solutions for IT Efficiency',
      ar: 'الاستفادة من حلول السحابة لكفاءة IT',
      he: 'פתרונות ענן ליעילות IT'
    },
    excerpt: {
      en: 'Explore how cloud technologies streamline IT infrastructure and empower scalable service delivery.',
      ar: 'اكتشف كيف تبسط تقنيات السحابة بنية IT وتُمكّن تقديم الخدمات بسرعة ومرونة.',
      he: 'כך ענן מפשט IT ומאפשר אספקת שירותים גמישה ויעילה.'
    },
    author: { en: 'Neil Roberts', ar: 'نيل روبرتس', he: 'ניל רוברטס' },
    date: '2025-02-20',
    readTime: 9,
    category: { en: 'Cloud Computing', ar: 'حوسبة سحابية', he: 'מחשוב ענן' },
    image: 'images/it56.jpg',
    featured: false,
  },
  {
    id: 4,
    title: {
      en: 'Optimizing IT Operations with DevOps Culture',
      ar: 'تحسين عمليات IT مع ثقافة DevOps',
      he: 'שיפור תפעול IT עם תרבות DevOps'
    },
    excerpt: {
      en: 'Discover how DevOps practices accelerate deployment cycles, improve collaboration, and increase IT agility.',
      ar: 'اكتشف كيف تسرع DevOps النشر، تعزز التعاون وتزيد من مرونة IT.',
      he: 'איך DevOps מאיץ הטמעה, משפר שיתוף פעולה ומגביר גמישות IT.'
    },
    author: { en: 'Maxine Patel', ar: 'ماكسين باتيل', he: 'מקסין פאטל' },
    date: '2025-02-15',
    readTime: 6,
    category: { en: 'DevOps', ar: 'DevOps', he: 'DevOps' },
    image: 'images/it57.jpg',
    featured: true,
  },
  {
    id: 5,
    title: {
      en: 'Future-Proofing Networks for IT Resilience',
      ar: 'شبكات مرنة لمستقبل IT',
      he: 'רשתות עמידות לעתיד IT'
    },
    excerpt: {
      en: 'Stay ahead with leading-edge networking solutions that enhance security, speed, and reliability.',
      ar: 'ابق متقدماً بحلول شبكات متطورة تعزز الأمان والسرعة والموثوقية.',
      he: 'השאר מוביל עם פתרונות רשת חזקים לאבטחה, מהירות ואמינות.'
    },
    author: { en: 'Sarah Mitchell', ar: 'سارة ميتشل', he: 'שרה מיטשל' },
    date: '2025-03-05',
    readTime: 7,
    category: { en: 'Networking', ar: 'شبكات', he: 'רשתות' },
    image: 'images/it58.jpg',
    featured: false,
  }
];

const posts = [
  {
    category: {
      en: "IT Infrastructure",
      ar: "البنية التحتية لتقنية المعلومات",
      he: "תשתיות IT"
    },
    title: {
      en: "Maximizing Uptime with Reliable IT Infrastructure",
      ar: "زيادة وقت العمل عبر بنية IT موثوقة",
      he: "מקסום זמן פעילות עם תשתית IT אמינה"
    },
    author: { en: "Alex Johnson", ar: "أليكس جونسون", he: "אלכס ג'ונסון" },
    readTime: {
      en: "8 min read",
      ar: "8 دقائق قراءة",
      he: "8 דקות קריאה"
    },
    url: "#post-1",
  },
  {
    category: {
      en: "Cybersecurity",
      ar: "أمن سيبراني",
      he: "אבטחת סייבר"
    },
    title: {
      en: "Best Practices to Safeguard Your Network",
      ar: "أفضل ممارسات حماية الشبكة",
      he: "שיטות המיגון הטובות ביותר לרשת שלך"
    },
    author: { en: "Samantha Lee", ar: "سامانثا لي", he: "סמנתה לי" },
    readTime: {
      en: "6 min read",
      ar: "6 دقائق قراءة",
      he: "6 דקות קריאה"
    },
    url: "#post-2",
  },
  {
    category: {
      en: "Cloud Computing",
      ar: "حوسبة سحابية",
      he: "מחשוב ענן"
    },
    title: {
      en: "How Cloud Solutions Enhance Business Agility",
      ar: "دور السحابة بمرونة الأعمال",
      he: "איך פתרונות ענן משפרים גמישות עסקית"
    },
    author: { en: "Michael Chen", ar: "مايكل تشين", he: "מייקל צ'ן" },
    readTime: {
      en: "5 min read",
      ar: "5 دقائق قراءة",
      he: "5 דקות קריאה"
    },
    url: "#post-3",
  },
  {
    category: {
      en: "Managed IT Services",
      ar: "خدمات IT مُدارة",
      he: "שירותי IT מנוהלים"
    },
    title: {
      en: "Benefits of Outsourcing IT for SMEs",
      ar: "فوائد الاستعانة بمصادر خارجية لتقنية المعلومات للشركات الصغيرة والمتوسطة",
      he: "יתרונות מיקור חוץ IT לעסקים קטנים"
    },
    author: { en: "Maria Garcia", ar: "ماريا غارسيا", he: "מריה גרסיה" },
    readTime: {
      en: "10 min read",
      ar: "10 دقائق قراءة",
      he: "10 דקות קריאה"
    },
    url: "#post-4",
  },
];

function getInitialInteractions() {
  let stored = {};
  try { stored = JSON.parse(localStorage.getItem('blogInteractions') || '{}'); } catch {}
  const obj = {};
  blogPosts.forEach(post => {
    obj[post.id] = {
      likes: stored[post.id]?.likes || 0,
      comments: stored[post.id]?.comments || 0,
      shares: stored[post.id]?.shares || 0,
      showCommentInput: false,
      lastViewed: stored[post.id]?.lastViewed || null
    };
  });
  return obj;
}

function saveInteractions(data) {
  localStorage.setItem('blogInteractions', JSON.stringify(data));
}

const Blog = () => {
  const { language } = useLanguage() || { language: "en" };
  const t = translations[language] || translations.en;
  const isRTL = language === "ar" || language === "he";
  const [selectedCategory] = useState('all');
  const [searchTerm] = useState('');
  const [postInteractions, setPostInteractions] = useState(getInitialInteractions());
  const [featuredPost, setFeaturedPost] = useState(null);

  useEffect(() => {
    document.title = t.pageTitle;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [language, t.pageTitle, isRTL]);

  useEffect(() => {
    const maxLikes = Math.max(...Object.values(postInteractions).map(x => x.likes), 0);
    let candidates = blogPosts.filter(p => postInteractions[p.id]?.likes === maxLikes);
    if (candidates.length === 1) {
      setFeaturedPost(candidates[0]);
    } else {
      let newestPost = candidates[0];
      let newestDate = postInteractions[newestPost.id]?.lastViewed ? new Date(postInteractions[newestPost.id].lastViewed) : new Date(newestPost.date);
      candidates.forEach(p => {
        let viewed = postInteractions[p.id]?.lastViewed ? new Date(postInteractions[p.id].lastViewed) : new Date(p.date);
        if (viewed > newestDate) {
          newestPost = p;
          newestDate = viewed;
        }
      });
      setFeaturedPost(newestPost);
    }
  }, [postInteractions]);

  useEffect(() => {
    saveInteractions(postInteractions);
  }, [postInteractions]);

  const filteredPosts = blogPosts.filter(post =>
    post.id !== featuredPost?.id
  );

  const updateInteraction = (postId, field, increment = 1) => {
    setPostInteractions(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        [field]: (prev[postId][field] || 0) + increment,
        lastViewed: new Date().toISOString()
      }
    }));
  };

  const handleLike = postId => updateInteraction(postId, 'likes');
  const handleShare = postId => updateInteraction(postId, 'shares');
  const toggleCommentInput = postId => setPostInteractions(prev => ({
    ...prev,
    [postId]: {
      ...prev[postId],
      showCommentInput: !prev[postId].showCommentInput
    }
  }));
  const handleCommentSubmit = (postId, e) => {
    e.preventDefault();
    updateInteraction(postId, 'comments');
    setPostInteractions(prev => ({
      ...prev,
      [postId]: { ...prev[postId], showCommentInput: false }
    }));
  };

  // Spotlight section
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadeState, setFadeState] = useState("fade-in");
  const timeoutRef = useRef(null);
  useEffect(() => () => clearTimeout(timeoutRef.current), []);
  const onSelectPost = (index) => {
    if (index === activeIndex) return;
    setFadeState("fade-out");
    timeoutRef.current = setTimeout(() => {
      setActiveIndex(index);
      setFadeState("fade-in");
    }, 400);
  };
  const activePost = posts[activeIndex];

  return (
    <div className="blog-page" dir={isRTL ? "rtl" : "ltr"}>
      <section className="hero-section">
        <video autoPlay muted loop playsInline className="hero-bg-video">
          <source src="/images/blog.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">{t.heroTitle}</h1>
            <p className="hero-paragraph">{t.heroParagraph}</p>
            <Link to="/contact" className="hero-button">{t.heroButton}</Link>
          </div>
        </div>
      </section>
      <div className="blog-main container">
        <div className="blog-grid">
          <motion.main className="blog-content" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            {/* Featured Post */}
            {featuredPost && (
              <motion.article className="featured-post" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <div className="featured-badge">{t.featured}</div>
                <div className="post-image">
                  <img src={featuredPost.image} alt={featuredPost.title[language]} />
                  <div className="post-overlay">
                    <div className="post-category">{featuredPost.category[language]}</div>
                  </div>
                </div>
                <div className="post-content">
                  {(() => {
                    const info = getBlogReadInfo(featuredPost.id, featuredPost.readTime, featuredPost.date);
                    return (
                      <div className="post-meta">
                        <span className="post-author"><FaUser /> {t.meta.author} {featuredPost.author[language]}</span>
                        <span className="post-date"><FaCalendar /> {t.meta.date}: {info.lastViewed ? formatDate(info.lastViewed, language) : formatDate(info.date, language)}</span>
                        <span className="post-read-time"><FaClock /> {info.readTime} {t.meta.readTime}</span>
                      </div>
                    );
                  })()}
                  <h2>{featuredPost.title[language]}</h2>
                  <p>{featuredPost.excerpt[language]}</p>
                  <div className="post-actions">
                    <Link to={`/blog${featuredPost.id}`} className="btn btn-primary">
                      {t.actions.readMore} <FaArrowRight />
                    </Link>
                    <div className="post-buttons">
                      <button className="action-btn" onClick={() => handleLike(featuredPost.id)}>
                        <FaThumbsUp /> {postInteractions[featuredPost.id]?.likes || 0}
                      </button>
                      <button className="action-btn" onClick={() => toggleCommentInput(featuredPost.id)}>
                        <FaComment /> {postInteractions[featuredPost.id]?.comments || 0}
                      </button>
                      <button className="action-btn" onClick={() => handleShare(featuredPost.id)}>
                        <FaShare /> {postInteractions[featuredPost.id]?.shares || 0}
                      </button>
                    </div>
                    {postInteractions[featuredPost.id]?.showCommentInput && (
                      <form onSubmit={e => handleCommentSubmit(featuredPost.id, e)} className="comment-form">
                        <input type="text" placeholder={t.actions.comment} required className="comment-input" />
                        <button type="submit" className="btn btn-primary btn-small">{t.actions.post}</button>
                      </form>
                    )}
                  </div>
                </div>
              </motion.article>
            )}
            {/* Posts */}
            <div className="posts-section">
              <div className="section-header">
                <h2>
                  {selectedCategory === 'all'
                    ? t.postsSection.latest
                    : t.postsSection.category.replace('{category}', selectedCategory)}
                </h2>
                <p>
                  {t.postsSection.found.replace('{count}', filteredPosts.length)}
                </p>
              </div>
              <div className="posts-grid">
                {filteredPosts.map((post, idx) => {
                  const interaction = postInteractions[post.id];
                  const info = getBlogReadInfo(post.id, post.readTime, post.date);
                  return (
                    <motion.article key={post.id} className="post-card" initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: idx * 0.1 }}
                      viewport={{ once: true }} whileHover={{ y: -10 }}>
                      <div className="post-image">
                        <img src={post.image} alt={post.title[language]} />
                        <div className="post-overlay">
                          <div className="post-category"><FaTag /> {post.category[language]}</div>
                        </div>
                      </div>
                      <div className="post-content">
                        <div className="post-meta">
                          <span className="post-author"><FaUser /> {t.meta.author} {post.author[language]}</span>
                          <span className="post-date"><FaCalendar /> {t.meta.date}: {info.lastViewed ? formatDate(info.lastViewed, language) : formatDate(info.date, language)}</span>
                          <span className="post-read-time"><FaClock /> {info.readTime} {t.meta.readTime}</span>
                        </div>
                        <h3>{post.title[language]}</h3>
                        <p>{post.excerpt[language]}</p>
                        <div className="post-actions">
                          <Link to={`/blog${post.id}`} className="read-more btn btn-primary">
                            {t.actions.readMore} <FaArrowRight />
                          </Link>
                          <div className="post-buttons">
                            <button className="action-btn" onClick={() => handleLike(post.id)} title={t.actions.like}>
                              <FaThumbsUp /> {interaction?.likes || 0}
                            </button>
                            <button className="action-btn" onClick={() => toggleCommentInput(post.id)} title={t.actions.comment}>
                              <FaComment /> {interaction?.comments || 0}
                            </button>
                            <button className="action-btn" onClick={() => handleShare(post.id)} title={t.actions.share}>
                              <FaShare /> {interaction?.shares || 0}
                            </button>
                          </div>
                        </div>
                        {interaction?.showCommentInput && (
                          <form onSubmit={(e) => handleCommentSubmit(post.id, e)} className="comment-form">
                            <input type="text" placeholder={t.actions.comment} required className="comment-input" />
                            <button type="submit" className="btn btn-primary btn-small">{t.actions.post}</button>
                          </form>
                        )}
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </motion.main>
        </div>
      </div>
      <section className="spotlight-section">
        <div className="spotlight-container">
          <div className="spotlight-header">
            <h2 className="spotlight-title">{t.spotlight.title}</h2>
            <p className="spotlight-subtitle">{t.spotlight.subtitle}</p>
            <p className="spotlight-description">{t.spotlight.description}</p>
          </div>
          <div className="spotlight-content-wrapper">
            <div id="spotlight-content" className={`spotlight-content ${fadeState === "fade-in" ? "fade-in" : "fade-out"}`}>
              <p className="spotlight-category">{activePost.category[language]}</p>
              <h3 className="spotlight-post-title">
                <a href={activePost.url} className="spotlight-post-link">
                  {activePost.title[language]}
                </a>
              </h3>
              <div className="spotlight-post-meta">
                <span>{t.meta.author} {activePost.author[language]}</span>
                <span className="bullet">•</span>
                <span>{activePost.readTime[language]}</span>
              </div>
            </div>
            <nav id="spotlight-nav" className="spotlight-nav">
              {posts.map((post, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`spotlight-tab ${idx === activeIndex ? "active" : ""}`}
                  onClick={() => onSelectPost(idx)}
                >
                  {post.title[language]}
                </button>
              ))}
            </nav>
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

/* BLOG MAIN CONTAINER */
.blog-main {
  background: var(--bg-color, #181818);
  padding: 80px 0;
  width: 100%;
}

/* FLEX CONTAINER, centers the blog content */
.blog-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* CONTENT SECTION: centers and constrains width */
.blog-content {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 24px 40px 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

/* FEATURED POST */
.featured-post {
  background: var(--card-bg, #222);
  border-radius: 18px;
  box-shadow: 0 6px 30px rgba(40,40,40,0.08);
  border: 1px solid var(--border-color, #323232);
  margin-bottom: 30px;
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  position: relative;
}

.featured-post .post-image {
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
  background: #232323;
  display: flex;
  align-items: flex-end;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
}

.featured-post .post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.featured-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background: #ff6600;
  color: #fff;
  font-weight: 700;
  padding: 6px 22px;
  border-radius: 16px;
  font-size: 1rem;
  z-index: 2;
  letter-spacing: 0.02em;
}

.featured-post .post-category {
  position: absolute;
  left: 20px;
  bottom: 20px;
  background: #2563eb;
  color: white;
  padding: 8px 20px;
  border-radius: 23px;
  font-size: 1.03em;
  font-weight: 500;
  z-index: 2;
}

.featured-post .post-content {
  padding: 30px 28px 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.featured-post .post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  margin-bottom: 14px;
  font-size: 1.05em;
  color: var(--text-muted, #bbb);
}

.featured-post .post-meta span {
  display: flex;
  align-items: center;
  gap: 7px;
}

.featured-post h2 {
  color: var(--heading-color, #fff);
  font-size: 2.1rem;
  margin: 0 0 8px 0;
  font-weight: 800;
  line-height: 1.17;
  word-break: break-word;
}

.featured-post p {
  color: var(--text-color, #ccc);
  margin-bottom: 10px;
  line-height: 1.6;
  font-size: 1.14rem;
}

.featured-post .post-actions {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* POSTS GRID - centered and even padding */
.posts-section {
  width: 100%;
}

.section-header {
  margin-bottom: 37px;
  text-align: left;
}

.section-header h2 {
  font-size: 1.7rem;
  font-weight: 800;
  color: var(--heading-color, #fff);
  margin-bottom: 7px;
}

.section-header p {
  color: var(--text-muted, #bbb);
  font-size: 1em;
}

.posts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  width: 100%;
}

@media (max-width: 900px) {
  .posts-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

/* BLOG CARDS */
.post-card {
  background: var(--card-bg, #232323);
  border-radius: 16px;
  box-shadow: 0 3px 14px rgba(40,40,40,0.07);
  border: 1px solid var(--border-color, #232323);
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: box-shadow 0.14s;
}

.post-card .post-image {
  width: 100%;
  height: 175px;
  position: relative;
  background: #232323;
  display: flex;
  align-items: flex-end;
}

.post-card .post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  display: block;
}

.post-card .post-overlay {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding-left: 16px;
  padding-bottom: 10px;
  background: linear-gradient(to top, rgba(30,30,30,0.79) 38%, transparent 86%);
  box-sizing: border-box;
}
  

.post-card .post-category {
  background: #2563eb;
  color: #fff;
  display: inline-flex;
  align-items: center;
  gap: 7px;         /* Icon and text spacing */
  font-size: 1em;
  font-weight: 500;
  padding: 5px 16px; /* LESS padding: compact look */
  border-radius: 999px; /* Fully rounded pill shape */
  box-shadow: 0 2px 9px rgba(0,0,0,0.15);
  min-height: 28px; /* Ensures a small pill even with icon */
  line-height: 1;
}

/* Make the SVG icon align with the text perfectly */
.post-card .post-category svg {
  font-size: 1.08em;
  margin-right: 4px;
  vertical-align: middle;
}


.post-card .post-content {
  padding: 22px 17px 20px 17px;
  gap: 6px;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}

.post-card .post-meta {
  gap: 16px;
  margin-bottom: 11px;
  color: var(--text-muted, #bbb);
  font-size: 1em;
  display: flex;
  flex-wrap: wrap;
}

.post-card .post-meta span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.post-card h3 {
  color: var(--heading-color, #fff);
  font-size: 1.18rem;
  line-height: 1.22;
  margin: 0 0 6px 0;
  font-weight: 700;
  word-break: break-word;
}

.post-card p {
  color: var(--text-color, #bbb);
  font-size: 1.01em;
  margin: 0 0 12px 0;
  line-height: 1.56;
}

/* Actions & Buttons */
.post-actions,
.post-buttons {
  display: flex;
  gap: 10px;
  align-items: center;
}

.post-actions {
  margin-top: 10px;
  justify-content: space-between;
}

.read-more {
  color: var(--primary-color, #2563eb);
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s, transform 0.2s;
}

.read-more:hover {
  color: #183b78;
  transform: translateX(3px);
}

.action-btn {
  border: 2px solid var(--border-color, #353535);
  border-radius: 50%;
  background: transparent;
  color: var(--text-muted, #bbb);
  width: 37px;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.09em;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}

.action-btn:hover {
  border-color: var(--primary-color, #2563eb);
  color: var(--primary-color, #2563eb);
  background: rgba(34, 77, 183, 0.07);
}

/* COMMENT FORM */
.comment-form {
  margin-top: 7px;
  display: flex;
  gap: 8px;
  align-items: center;
}

.comment-input {
  flex: 1;
  padding: 10px 12px;
  border-radius: 9px;
  border: 1.5px solid var(--border-color, #353535);
  font-size: 1rem;
  background: var(--input-bg, #191919);
  color: var(--text-color, #ddd);
  outline: none;
}

.comment-input:focus {
  border-color: var(--primary-color, #2563eb);
}

.btn-small {
  padding: 8px 18px;
  font-size: 0.95rem;
  border-radius: 17px;
  font-weight: 700;
  background: var(--primary-color, #2563eb);
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-small:hover {
  background: #183b78;
}

/* Responsive styles */
@media (max-width: 700px) {
  .blog-content, .featured-post .post-content {
    padding: 10px !important;
  }
  .featured-post .post-image {
    height: 180px;
  }
  .posts-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}

/* =========================
   Knowledge Hub Section
   ========================= */
.knowledge-hub {
  margin: 0 auto;
  max-width: 1200px;
  text-align: center;
  padding: 40px 20px;
}

.knowledge-title {
  font-size: 2.6rem;
  font-weight: 900;
  margin-bottom: 12px;
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.knowledge-subtitle {
  font-size: 1.1rem;
  color: var(--text-muted);
  margin-bottom: 50px;
}

/* ==== FLEX LAYOUT FOR DYNAMIC CENTERED CARDS ==== */
.knowledge-grid {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  flex-wrap: wrap;
  margin-top: 40px;
}

.knowledge-card {
  position: relative;
  border-radius: 22px;
  padding: 50px 30px 40px;
  background: rgba(255, 255, 255, 0.06);
  border: 2px solid transparent;
  background-clip: padding-box;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
  overflow: hidden;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  width: 350px;
  min-height: 280px;
}

.knowledge-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 22px;
  padding: 2px;
  background: linear-gradient(135deg, #6a11cb, #2575fc, #ff7eb3);
  background-size: 300% 300%;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  animation: borderShift 6s linear infinite;
}

@keyframes borderShift {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

.knowledge-card:hover {
  transform: translateY(-12px) scale(1.04);
  box-shadow: 0 20px 40px rgba(0,0,0,0.35);
}

/* ==== ICON STYLES ==== */
.icon-badge {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #fff;
  margin: 0 auto 20px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  position: relative;
  z-index: 2;
}

.knowledge-stat {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 12px;
  background: linear-gradient(90deg, #ff7eb3, #ff758c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.knowledge-text {
  font-size: 1rem;
  color: var(--text-color);
  line-height: 1.5;
}

/* ==== MOTION EFFECTS FOR DYNAMIC CARDS ==== */
.knowledge-card.left {
  animation: bubbleLeft 5s ease-in-out infinite;
}

.knowledge-card.center {
  animation: pulseCenter 5s ease-in-out infinite;
  z-index: 2;
}

.knowledge-card.right {
  animation: bubbleRight 5s ease-in-out infinite;
}

@keyframes bubbleLeft {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(25px); }
}

@keyframes bubbleRight {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-25px); }
}

@keyframes pulseCenter {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}


{/*spotlight section styles */}

:root {
  /* Light theme colors */
  --background-color: #f9fafb;
  --text-color-primary: #111827;
  --text-color-secondary: #6b7280; /* Gray 500 */
  --color-indigo-primary: #6366f1;
  --color-indigo-hover: #4f46e5;
  --nav-background: #f3f4f6;
  --nav-border: #e5e7eb;
  --tab-active-background: #4f46e5;
  --tab-active-color: #ffffff;
  --box-shadow: rgba(0, 0, 0, 0.05);
}

[data-theme="dark"] {
  /* Dark theme colors */
  --background-color: #121212;
  --text-color-primary: #e0e0e0;
  --text-color-secondary: #9ca3af;
  --color-indigo-primary: #818cf8;
  --color-indigo-hover: #6366f1;
  --nav-background: #1f2937;
  --nav-border: #374151;
  --tab-active-background: #6366f1;
  --tab-active-color: #e0e0e0;
  --box-shadow: rgba(0, 0, 0, 0.5);
}

/* Use variables in your styles */

.spotlight-section {
  padding: 4rem 1rem;
  background-color: var(--background-color);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Inter', sans-serif;
  color: var(--text-color-primary);
}

.spotlight-container {
  max-width: 48rem;
  width: 100%;
  padding: 0 1rem;
}

.spotlight-header {
  text-align: center;
  margin-bottom: 3rem;
}

.spotlight-title {
  font-weight: 600;
  color: var(--color-indigo-primary);
  text-transform: uppercase;
  font-size: 1rem;
  letter-spacing: 0.05em;
}

.spotlight-subtitle {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-color-primary);
  margin-top: 0.5rem;
}

.spotlight-description {
  font-size: 1.125rem;
  color: var(--text-color-secondary);
  margin-top: 1rem;
}

.spotlight-content-wrapper {
  background: var(--background-color);
  border-radius: 1rem;
  box-shadow: 0 4px 20px var(--box-shadow);
  overflow: hidden;
}

.spotlight-content {
  padding: 2rem;
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
}

.spotlight-content.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.spotlight-content.fade-out {
  opacity: 0;
  transform: translateY(0.5rem);
}

.spotlight-category {
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-indigo-primary);
  font-size: 0.875rem;
  letter-spacing: 0.05em;
}

.spotlight-post-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin-top: 1rem;
  color: var(--text-color-primary);
}

.spotlight-post-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s;
}

.spotlight-post-link:hover {
  color: var(--color-indigo-hover);
}

.spotlight-post-meta {
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: var(--text-color-secondary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bullet {
  font-weight: 900;
}

.spotlight-nav {
  background-color: var(--nav-background);
  border-top: 1px solid var(--nav-border);
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(8rem,1fr));
  gap: 0.75rem;
  padding: 1rem;
}

.spotlight-tab {
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  color: var(--text-color-primary);
  transition: background-color 0.3s, color 0.3s;
}

.spotlight-tab:hover {
  background-color: var(--nav-border);
}

.spotlight-tab.active {
  background-color: var(--tab-active-background);
  color: var(--tab-active-color);
}


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

export default Blog;
