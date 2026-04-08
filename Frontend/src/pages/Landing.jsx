
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import bg from "../assets/background.jpeg";

// ─── Doctor images — put these in src/assets/ ───────────────────────────
// sharma.png  |  mehta.png  |  rao.png  |  iyer.jpg
// hospital.jpg  (for About section)
// blog1.jpg  blog2.jpg  blog3.jpg  (for Health Blogs)
import sharmaImg  from "../assets/sharma.png";
import mehtaImg   from "../assets/mehta.png";
import raoImg     from "../assets/rao.png";
import iyerImg    from "../assets/iyer.png";
import hospitalImg from "../assets/hospital.jpg";
import blog1Img   from "../assets/blog1.png";
import blog2Img   from "../assets/blog2.png";
import blog3Img   from "../assets/blog3.png";

// ─── SVG Icons ──────────────────────────────────────────────────────────
const Icon = {
  stethoscope: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 6.5a4 4 0 0 0 8 0V4a.5.5 0 0 0-.5-.5h-7A.5.5 0 0 0 4.5 4v2.5z"/><path d="M8.5 10.5v2a5.5 5.5 0 0 0 11 0v-1"/><circle cx="19.5" cy="11" r="1.5"/></svg>,
  calendar:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  hospital:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="16" rx="1"/><path d="M12 10v6M9 13h6"/><path d="M6 6V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/></svg>,
  users:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="4"/><path d="M1 21v-2a7 7 0 0 1 14 0v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75M23 21v-2a4 4 0 0 0-3-3.87"/></svg>,
  shield:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  clock:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  arrow:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  heart:       <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  star:        <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  phone:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  mail:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  menu:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  close:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  blog:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
};

// ─── Data ────────────────────────────────────────────────────────────────
const doctors = [
  { name: "Dr. Priya Sharma", specialty: "Cardiologist",  exp: "18 yrs", img: sharmaImg },
  { name: "Dr. Arjun Mehta",  specialty: "Neurologist",   exp: "14 yrs", img: mehtaImg  },
  { name: "Dr. Sneha Rao",    specialty: "Orthopedist",   exp: "12 yrs", img: raoImg    },
  { name: "Dr. Vikram Iyer",  specialty: "Oncologist",    exp: "20 yrs", img: iyerImg   },
];

const stats = [
  { val: "4 JCI &", sub: "33 NABH Accredited Hospitals" },
  { val: "33+",     sub: "Healthcare Facilities"         },
  { val: "6,000+",  sub: "Operational Beds"              },
  { val: "17,900+", sub: "Healthcare Professionals"      },
];

const specialities = [
  { icon: "🫀", label: "Cardiology",       color: "#fff0f0" },
  { icon: "🧠", label: "Neurology",        color: "#f3f0ff" },
  { icon: "🦴", label: "Orthopedics",      color: "#fff8f0" },
  { icon: "🔬", label: "Oncology",         color: "#f0fff4" },
  { icon: "👁️", label: "Ophthalmology",    color: "#f0f8ff" },
  { icon: "🫁", label: "Pulmonology",      color: "#fff0fb" },
  { icon: "🧒", label: "Pediatrics",       color: "#fffbf0" },
  { icon: "🩺", label: "General Medicine", color: "#f0fdff" },
];

const blogs = [
  {
    img: blog1Img,
    tag: "Heart Health",
    title: "Heart attack, stroke risk can double from irregular bedtimes, sleeping less than 8 hours",
    desc: "Simple lifestyle changes — from diet tweaks to 20-minute walks — that cardiologists swear by for long-term heart health.",
    author: "Dr. Priya Sharma",
    date: "Apr 3, 2026",
    url: "https://www.medicalnewstoday.com/articles/heart-attack-stroke-risk-double-irregular-bedtimes-sleeping-less-than-8-hours",
  },
  {
    img: blog2Img,
    tag: "Nutrition",
    title: "Could vitamin D in midlife protect your brain from early Alzheimer’s?",
    desc: "A long-term study suggests that vitamin D levels in your 30s and 40s could influence early brain changes linked to Alzheimer’s, years before symptoms appear. ",
    author: "Dr. Arjun Mehta",
    date: "Mar 28, 2026",
    url: "https://www.news-medical.net/news/20260407/Could-vitamin-D-in-midlife-protect-your-brain-from-early-Alzheimere28099s.aspx",
  },
  {
    img: blog3Img,
    tag: "Wellness",
    title: "5 timeless habits for better health",
    desc: "Adopting a healthier way of life moves us beyond quick fixes and fads.",
    author: "Dr. Sneha Rao",
    date: "Mar 20, 2026",
    url: "https://www.health.harvard.edu/blog/5-timeless-habits-for-better-health-202509243106",
  },
];

// ─── Component ───────────────────────────────────────────────────────────
export default function Landing() {
  const navigate   = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const statsRef   = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ══════════════════════ STYLES ══════════════════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --teal:   #0d9488;
          --teal2:  #14b8a6;
          --teal3:  #ccfbf1;
          --navy:   #0f2d40;
          --navy2:  #1e4060;
          --gold:   #f59e0b;
          --gray:   #64748b;
          --light:  #f1f5f9;
          --white:  #ffffff;
        }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background: #f8fffd; color: var(--navy); overflow-x: hidden; }
        h1,h2,h3 { font-family: 'Playfair Display', serif; }

        /* ── SHARED ── */
        .section-label { font-size: .75rem; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; color: var(--teal); margin-bottom: 10px; display: block; }
        .section-title { font-size: clamp(1.8rem, 3vw, 2.5rem); color: var(--navy); margin-bottom: 14px; line-height: 1.2; }
        .section-sub   { font-size: .95rem; color: var(--gray); max-width: 520px; margin: 0 auto 48px; line-height: 1.75; text-align: center; }
        .centered      { text-align: center; }
        .about-accent  { display: inline-block; width: 42px; height: 4px; background: var(--teal); border-radius: 2px; margin-bottom: 16px; }

        .btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 26px; border-radius: 50px; font-family: 'DM Sans'; font-size: .9rem; font-weight: 600; cursor: pointer; border: none; transition: all .25s; }
        .btn.btn-primary { background: linear-gradient(135deg, var(--teal), var(--teal2)); color: #fff; box-shadow: 0 4px 16px rgba(13,148,136,.33); }
        .btn.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(13,148,136,.44); }
        .btn.btn-outline { border: 2px solid var(--teal); color: var(--teal); background: transparent; }
        .btn.btn-outline:hover { background: var(--teal); color: #fff; }

        /* ── NAV ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 5%; height: 66px;
          transition: background .3s, box-shadow .3s;
        }
        .nav.scrolled { background: rgba(255,255,255,.96); box-shadow: 0 2px 20px rgba(13,148,136,.12); backdrop-filter: blur(8px); }
        .nav-logo { display: flex; align-items: center; gap: 10px; cursor: pointer; text-decoration: none; }
        .nav-logo-icon { width: 36px; height: 36px; background: var(--teal); border-radius: 10px; display: grid; place-items: center; font-size: 18px; }
        .nav-logo-text { font-family: 'Playfair Display', serif; font-size: 1.25rem; font-weight: 700; color: var(--navy); }
        .nav-logo-text span { color: var(--teal); }
        .nav-links { display: flex; gap: 28px; list-style: none; }
        .nav-links a { font-size: .88rem; font-weight: 500; color: var(--navy); cursor: pointer; transition: color .2s; }
        .nav-links a:hover { color: var(--teal); }
        .hamburger { display: none; background: none; border: none; cursor: pointer; color: var(--navy); }
        .hamburger svg { width: 24px; height: 24px; }

        /* ── MOBILE MENU ── */
        .mobile-menu { position: fixed; inset: 0; z-index: 200; background: white; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 28px; transform: translateX(100%); transition: transform .3s; }
        .mobile-menu.open { transform: translateX(0); }
        .mobile-menu a { font-family: 'Playfair Display', serif; font-size: 1.6rem; color: var(--navy); cursor: pointer; }

        /* ── HERO ── */
        .hero {
          min-height: 100vh;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          padding: 100px 5% 60px;
          position: relative;
          overflow: hidden;
        }
        /* dark overlay so text is always readable */
        .hero::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(
            to right,
            rgba(10, 30, 50, 0.72) 0%,
            rgba(10, 30, 50, 0.45) 55%,
            rgba(10, 30, 50, 0.10) 100%
          );
        }
        .hero-content {
          position: relative; z-index: 2;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(204,251,241,.18); border: 1px solid rgba(204,251,241,.4);
          color: #ccfbf1; padding: 6px 16px; border-radius: 50px;
          font-size: .76rem; font-weight: 600; letter-spacing: .5px; margin-bottom: 20px;
        }
        .hero-badge::before { content: '●'; font-size: 7px; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }

        .hero h1 { font-size: clamp(2.2rem, 4.5vw, 3.6rem); line-height: 1.1; color: #fff; margin-bottom: 16px; }
        .hero h1 em { color: #5eead4; font-style: normal; }
        .hero p { font-size: 1rem; color: rgba(255,255,255,.82); line-height: 1.75; max-width: 440px; margin-bottom: 32px; }
        .hero-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 44px; }
        .hero-stats { display: flex; gap: 28px; flex-wrap: wrap; }
        .hero-stat strong { display: block; font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #5eead4; }
        .hero-stat span { font-size: .76rem; color: rgba(255,255,255,.65); }

        /* right column — smaller, fixed-size image with floating cards */
        .hero-visual {
          position: relative; z-index: 2;
          display: flex; justify-content: center; align-items: center;
        }
        .hero-img-wrap {
          width: 340px; height: 420px;
          border-radius: 24px; overflow: hidden;
          box-shadow: 0 24px 64px rgba(0,0,0,.35);
          flex-shrink: 0;
        }
        .hero-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .hero-img-placeholder { width:100%; height:100%; background: linear-gradient(135deg,#99f6e4,#0d9488); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; color:white; font-size:.82rem; }

        .hero-card {
          position: absolute; bottom: -16px; left: -20px;
          background: white; border-radius: 14px; padding: 12px 16px;
          box-shadow: 0 8px 28px rgba(0,0,0,.14);
          display: flex; align-items: center; gap: 10px;
          animation: floatY 4s ease-in-out infinite;
        }
        .hero-card2 {
          position: absolute; top: -12px; right: -20px;
          background: var(--navy); color: white; border-radius: 14px; padding: 12px 16px;
          box-shadow: 0 8px 28px rgba(0,0,0,.22);
          animation: floatY 4s ease-in-out infinite reverse;
        }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .icon-circle { width: 34px; height: 34px; border-radius: 50%; background: var(--teal3); display: grid; place-items: center; color: var(--teal); }
        .icon-circle svg { width: 16px; height: 16px; }
        .hero-card strong { display: block; font-size: .8rem; color: var(--navy); font-weight: 600; }
        .hero-card span   { font-size: .7rem; color: var(--gray); }
        .hero-card2 .num  { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; }
        .hero-card2 .lbl  { font-size: .68rem; opacity: .7; margin-top: 2px; }

        /* ── STATS ── */
        .stats-section { background: var(--navy); padding: 56px 5%; display: grid; grid-template-columns: repeat(4,1fr); }
        .stat-box { text-align: center; padding: 0 10px; border-right: 1px solid rgba(255,255,255,.08); }
        .stat-box:last-child { border: none; }
        .stat-val { font-family: 'Playfair Display', serif; font-size: 2.2rem; color: #5eead4; display: block; }
        .stat-sub { font-size: .78rem; color: rgba(255,255,255,.55); margin-top: 5px; line-height: 1.4; }

        /* ── ABOUT ── */
        .about-section { padding: 96px 5%; display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
        .about-img-wrap { border-radius: 22px; overflow: hidden; box-shadow: 0 20px 56px rgba(13,148,136,.15); aspect-ratio: 4/3; }
        .about-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .about-img-placeholder { width:100%; height:100%; background: linear-gradient(135deg,#e0fdf4,#99f6e4); display:flex; align-items:center; justify-content:center; flex-direction:column; gap:10px; color:var(--teal); font-size:.85rem; }
        .about-img-placeholder svg { width: 60px; height: 60px; opacity: .5; }
        .about-section p { font-size: .93rem; color: var(--gray); line-height: 1.8; margin-bottom: 14px; }
        .vm-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 13px; margin-top: 22px; }
        .vm-card { background: var(--light); border-radius: 13px; padding: 18px; border-left: 4px solid var(--teal); }
        .vm-card h4 { font-family: 'Playfair Display', serif; font-size: .9rem; color: var(--teal); margin-bottom: 7px; }
        .vm-card p  { font-size: .8rem; color: var(--gray); line-height: 1.6; margin: 0; }

        /* ── SPECIALITIES ── */
        .spec-section { background: var(--light); padding: 90px 5%; text-align: center; }
        .spec-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 20px; max-width: 960px; margin: 0 auto;
        }
        .spec-card {
          background: white; border-radius: 20px; padding: 36px 20px 28px;
          box-shadow: 0 4px 20px rgba(13,148,136,.08);
          cursor: default;           /* not clickable — no navigation */
          transition: transform .25s, box-shadow .25s;
          display: flex; flex-direction: column; align-items: center; gap: 14px;
        }
        .spec-card:hover { transform: translateY(-6px); box-shadow: 0 14px 36px rgba(13,148,136,.16); }
        .spec-icon-wrap {
          width: 72px; height: 72px; border-radius: 20px;
          display: flex; align-items: center; justify-content: center;
          font-size: 2rem;
        }
        .spec-card h3 { font-family: 'Playfair Display', serif; font-size: 1rem; color: var(--navy); }
        .spec-card p  { font-size: .78rem; color: var(--gray); line-height: 1.55; margin: 0; }

        /* ── DOCTORS ── */
        .doctors-section { padding: 90px 5%; text-align: center; }
        .doctors-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 22px; margin-top: 48px; }
        .doc-card { background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(13,148,136,.08); transition: all .3s; cursor: pointer; text-align: left; }
        .doc-card:hover { transform: translateY(-8px); box-shadow: 0 18px 44px rgba(13,148,136,.18); }
        .doc-img { aspect-ratio: 3/4; overflow: hidden; background: linear-gradient(135deg,var(--teal3),#99f6e4); }
        .doc-img img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
        .doc-img-placeholder { width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; color:var(--teal); font-size:.78rem; }
        .doc-img-placeholder svg { width:44px; height:44px; opacity:.55; }
        .doc-info { padding: 16px; }
        .doc-info h3 { font-family: 'Playfair Display', serif; font-size: .95rem; margin-bottom: 4px; }
        .doc-specialty { font-size: .76rem; color: var(--teal); font-weight: 600; margin-bottom: 9px; }
        .doc-meta { display: flex; justify-content: space-between; align-items: center; }
        .doc-exp  { font-size: .74rem; color: var(--gray); display: flex; align-items: center; gap: 4px; }
        .doc-exp svg { width: 12px; height: 12px; }
        .doc-stars { color: var(--gold); display: flex; gap: 2px; }
        .doc-stars svg { width: 11px; height: 11px; }

        /* ── WHY US ── */
        .why-section { background: linear-gradient(135deg, var(--navy) 0%, var(--navy2) 100%); padding: 90px 5%; color: white; text-align: center; }
        .why-section .section-title { color: white; }
        .why-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 22px; margin-top: 48px; }
        .why-card { background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.1); border-radius: 18px; padding: 32px 24px; transition: background .2s; }
        .why-card:hover { background: rgba(255,255,255,.12); }
        .why-icon { width: 48px; height: 48px; border-radius: 13px; background: var(--teal); display: grid; place-items: center; margin: 0 auto 18px; }
        .why-icon svg { width: 22px; height: 22px; color: white; }
        .why-card h3 { font-family: 'Playfair Display', serif; font-size: 1rem; margin-bottom: 10px; }
        .why-card p  { font-size: .83rem; opacity: .72; line-height: 1.65; }

        /* ── HEALTH BLOGS ── */
        .blogs-section { padding: 90px 5%; background: var(--light); text-align: center; }
        .blogs-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 26px; margin-top: 48px; text-align: left; }
        .blog-card {
          background: white; border-radius: 20px; overflow: hidden;
          box-shadow: 0 4px 20px rgba(13,148,136,.08);
          transition: transform .3s, box-shadow .3s;
          display: flex; flex-direction: column;
          cursor: pointer; text-decoration: none; color: inherit;
        }
        .blog-card:hover { transform: translateY(-7px); box-shadow: 0 18px 44px rgba(13,148,136,.18); }
        .blog-img { height: 200px; overflow: hidden; position: relative; }
        .blog-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s; }
        .blog-card:hover .blog-img img { transform: scale(1.05); }
        .blog-img-placeholder { width:100%; height:100%; background: linear-gradient(135deg,#e0fdf4,#5eead4); display:flex; align-items:center; justify-content:center; font-size:3rem; }
        .blog-tag { position: absolute; top: 14px; left: 14px; background: var(--teal); color: white; font-size: .7rem; font-weight: 600; padding: 4px 12px; border-radius: 50px; letter-spacing: .5px; }
        .blog-body { padding: 22px; flex: 1; display: flex; flex-direction: column; }
        .blog-body h3 { font-family: 'Playfair Display', serif; font-size: 1.05rem; color: var(--navy); margin-bottom: 10px; line-height: 1.35; }
        .blog-body p  { font-size: .82rem; color: var(--gray); line-height: 1.65; flex: 1; margin-bottom: 18px; }
        .blog-meta { display: flex; justify-content: space-between; font-size: .74rem; color: var(--gray); padding-top: 14px; border-top: 1px solid var(--light); }
        .blog-read { display: inline-flex; align-items: center; gap: 5px; font-size: .8rem; font-weight: 600; color: var(--teal); margin-top: 4px; }
        .blog-read svg { width: 13px; height: 13px; }

        /* ── CONTACT ── */
        .contact-section { padding: 90px 5%; display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: start; }
        .contact-section p { color: var(--gray); line-height: 1.75; font-size: .93rem; margin-bottom: 26px; }
        .contact-items { display: flex; flex-direction: column; gap: 15px; }
        .contact-item { display: flex; align-items: center; gap: 13px; }
        .c-icon { width: 40px; height: 40px; border-radius: 11px; background: var(--teal3); display: grid; place-items: center; color: var(--teal); flex-shrink: 0; }
        .c-icon svg { width: 18px; height: 18px; }
        .contact-item strong { display: block; font-size: .86rem; color: var(--navy); font-weight: 600; }
        .contact-item span   { font-size: .8rem; color: var(--gray); }
        .contact-form { display: flex; flex-direction: column; gap: 13px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 13px; }
        .form-group { display: flex; flex-direction: column; gap: 5px; }
        .form-group label { font-size: .78rem; font-weight: 600; color: var(--navy); }
        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 11px 13px; border: 2px solid #e2e8f0; border-radius: 11px;
          font-family: 'DM Sans'; font-size: .86rem; color: var(--navy);
          background: white; outline: none; transition: border .2s;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus { border-color: var(--teal); }
        .form-group textarea { resize: vertical; min-height: 90px; }

        /* ── FOOTER ── */
        footer { background: var(--navy); color: rgba(255,255,255,.5); padding: 52px 5% 26px; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 32px; margin-bottom: 36px; }
        .footer-brand p { font-size: .82rem; line-height: 1.7; max-width: 230px; margin-top: 13px; }
        .footer-logo { color: white !important; font-family: 'Playfair Display', serif !important; }
        .footer-col h4 { color: white; font-family: 'Playfair Display', serif; font-size: .92rem; margin-bottom: 13px; }
        .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .footer-col ul li a { font-size: .82rem; color: rgba(255,255,255,.48); cursor: pointer; transition: color .2s; }
        .footer-col ul li a:hover { color: #5eead4; }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,.08); padding-top: 20px; display: flex; justify-content: space-between; font-size: .76rem; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .doctors-grid { grid-template-columns: repeat(2,1fr); }
          .stats-section { grid-template-columns: repeat(2,1fr); }
          .stat-box { border-right: none; border-bottom: 1px solid rgba(255,255,255,.08); padding: 18px 0; }
          .blogs-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hamburger { display: block; }
          .hero { grid-template-columns: 1fr; padding-top: 96px; }
          .hero-visual { display: none; }
          .about-section { grid-template-columns: 1fr; }
          .spec-grid { grid-template-columns: repeat(2,1fr); }
          .why-grid { grid-template-columns: 1fr; }
          .blogs-grid { grid-template-columns: 1fr; }
          .contact-section { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .footer-bottom { flex-direction: column; gap: 7px; text-align: center; }
          .vm-cards { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ══ NAV ══════════════════════════════════════════════════════════ */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <a className="nav-logo" onClick={() => scrollTo("hero")}>
          <div className="nav-logo-icon">🏥</div>
          <span className="nav-logo-text">Medi<span>Care</span></span>
        </a>
        <ul className="nav-links">
          {[["About Us","about"],["Our Doctors","doctors"],["Specialities","specialities"],["Health Blogs","blogs"],["Contact","contact"]].map(([label,id]) => (
            <li key={id}><a onClick={() => scrollTo(id)}>{label}</a></li>
          ))}
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(true)}>{Icon.menu}</button>
      </nav>

      {/* ══ MOBILE MENU ══════════════════════════════════════════════════ */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button style={{position:"absolute",top:24,right:24,background:"none",border:"none",cursor:"pointer"}} onClick={() => setMenuOpen(false)}>{Icon.close}</button>
        {[["About Us","about"],["Our Doctors","doctors"],["Specialities","specialities"],["Health Blogs","blogs"],["Contact","contact"]].map(([label,id]) => (
          <a key={id} onClick={() => scrollTo(id)}>{label}</a>
        ))}
        <button className="btn btn-primary" onClick={() => { setMenuOpen(false); navigate("/loginselector"); }}>Login / Register</button>
      </div>

      {/* ══ HERO ══════════════════════════════════════════════════════════
          Background image from your existing ../assets/background.jpeg
          Dark gradient overlay makes text fully readable — no circle     */}
      <section
        id="hero"
        className="hero"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="hero-content">
          <div className="hero-badge">Trusted Healthcare Network</div>
          <h1>Healthcare for <em>Good.</em><br />Today. Tomorrow.<br />Always.</h1>
          <p>Access world-class medical care from India's leading specialists. Book appointments, manage records, and get the care you deserve — all in one place.</p>
          <div className="hero-btns">
            {/* Get Started → LoginSelector (role choice page) */}
            <button className="btn btn-primary" onClick={() => navigate("/loginselector")}>
              Get Started {Icon.arrow}
            </button>
            <button className="btn btn-outline" style={{color:"white",borderColor:"rgba(255,255,255,.6)"}} onClick={() => scrollTo("about")}>
              Learn More
            </button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><strong>33+</strong><span>Facilities</span></div>
            <div className="hero-stat"><strong>6,000+</strong><span>Beds</span></div>
            <div className="hero-stat"><strong>17,900+</strong><span>Specialists</span></div>
          </div>
        </div>

        {/* Smaller portrait-style image panel — won't distort bg */}
        <div className="hero-visual">
         
          
          
          <div className="hero-card2">
            <div className="num">4.9★</div>
            <div className="lbl">Patient Rating</div>
          </div>
        </div>
      </section>

      {/* ══ STATS ════════════════════════════════════════════════════════ */}
      <div ref={statsRef} className="stats-section">
        {stats.map((s, i) => (
          <div key={i} className="stat-box">
            <span className="stat-val">{s.val}</span>
            <span className="stat-sub">{s.sub}</span>
          </div>
        ))}
      </div>

      {/* ══ ABOUT ════════════════════════════════════════════════════════ */}
      <section id="about" className="about-section">
        <div className="about-img-wrap">
          {/* Uses ../assets/hospital.jpg imported at top */}
          <img src={hospitalImg} alt="About MediCare" onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }} />
          <div className="about-img-placeholder" style={{display:"none"}}>
            {Icon.hospital}<span>hospital.jpg missing from assets/</span>
          </div>
        </div>
        <div>
          <div className="about-accent" />
          <span className="section-label">About Us</span>
          <h2 className="section-title">A Legacy of<br />Clinical Excellence</h2>
          <p>MediCare is a leading integrated healthcare delivery platform in India. Our verticals primarily comprise hospitals, diagnostics, and day-care specialty facilities operating across 12 states.</p>
          <p>Our network comprises over 6,000 operational beds, 400 diagnostics labs, and a team of 17,900+ healthcare professionals committed to your well-being.</p>
          <div className="vm-cards">
            <div className="vm-card">
              <h4>🎯 Vision</h4>
              <p>To create a world-class integrated healthcare delivery system combining finest medical skills with compassionate care.</p>
            </div>
            <div className="vm-card">
              <h4>🌐 Mission</h4>
              <p>To be a globally respected healthcare organisation known for Clinical Excellence and Distinctive Patient Care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SPECIALITIES — proper cards, no navigation on click ══════════ */}
      <section id="specialities" className="spec-section">
        <span className="section-label">Medical Expertise</span>
        <h2 className="section-title">Our Specialities</h2>
        <p className="section-sub">From complex surgeries to routine check-ups, we cover every dimension of your health.</p>
        <div className="spec-grid">
          {specialities.map((s, i) => (
            <div key={i} className="spec-card">
              <div className="spec-icon-wrap" style={{ background: s.color }}>
                <span style={{ fontSize: "2rem" }}>{s.icon}</span>
              </div>
              <h3>{s.label}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ══ DOCTORS — click → /loginselector (login first) ═══════════════ */}
      <section id="doctors" className="doctors-section">
        <span className="section-label">Meet the Experts</span>
        <h2 className="section-title">Our Doctors</h2>
        <p className="section-sub">Our panel of specialists brings decades of experience and genuine compassion to every consultation.</p>
        <div className="doctors-grid">
          {doctors.map((d, i) => (
            <div key={i} className="doc-card" onClick={() => navigate("/loginselector")}>
              <div className="doc-img">
                {/* Images imported from ../assets/ at the top */}
                <img src={d.img} alt={d.name} onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }} />
                <div className="doc-img-placeholder" style={{display:"none"}}>
                  {Icon.users}<span>{d.name.split(" ")[1].toLowerCase()}.png missing</span>
                </div>
              </div>
              <div className="doc-info">
                <h3>{d.name}</h3>
                <div className="doc-specialty">{d.specialty}</div>
                <div className="doc-meta">
                  <span className="doc-exp">{Icon.clock} {d.exp} exp</span>
                  <span className="doc-stars">{[1,2,3,4,5].map(n => <span key={n}>{Icon.star}</span>)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop:44}}>
          <button className="btn btn-primary" onClick={() => navigate("/loginselector")}>
            Book an Appointment {Icon.arrow}
          </button>
        </div>
      </section>

      {/* ══ WHY US ═══════════════════════════════════════════════════════ */}
      <section className="why-section">
        <h2 className="section-title">Why Patients Trust Us</h2>
        <div className="why-grid">
          {[
            { icon: Icon.shield,      title: "JCI & NABH Accredited",   desc: "Our hospitals meet the highest national and international standards for patient safety and quality care." },
            { icon: Icon.stethoscope, title: "Expert Specialists",       desc: "Access over 17,900 experienced doctors and specialists across all major medical disciplines." },
            { icon: Icon.clock,       title: "24/7 Care",                desc: "Round-the-clock emergency services and appointment booking, because health doesn't follow a schedule." },
            { icon: Icon.heart,       title: "Patient-First Approach",   desc: "Every decision is driven by compassion, dignity, and what's best for your long-term health." },
            { icon: Icon.hospital,    title: "State-of-Art Facilities",  desc: "33 healthcare facilities equipped with the latest medical technology across 12 states of India." },
            { icon: Icon.calendar,    title: "Easy Appointments",        desc: "Book, reschedule, or cancel appointments seamlessly through our digital platform." },
          ].map((w, i) => (
            <div key={i} className="why-card">
              <div className="why-icon">{w.icon}</div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ HEALTH BLOGS — click opens the article URL ═══════════════════ */}
      <section id="blogs" className="blogs-section">
        <span className="section-label">Health Blogs</span>
        <h2 className="section-title">Stay Informed, Stay Healthy</h2>
        <p className="section-sub">Expert-written articles on wellness, prevention, and living your healthiest life.</p>
        <div className="blogs-grid">
          {blogs.map((b, i) => (
            <a
              key={i}
              className="blog-card"
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="blog-img">
                {/* Images imported from ../assets/ at the top */}
                <img src={b.img} alt={b.title} onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }} />
                <div className="blog-img-placeholder" style={{display:"none"}}>📰</div>
                <span className="blog-tag">{b.tag}</span>
              </div>
              <div className="blog-body">
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
                <div className="blog-meta">
                  <span>✍️ {b.author}</span>
                  <span>{b.date}</span>
                </div>
                <span className="blog-read">Read Article {Icon.arrow}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ══ CONTACT ══════════════════════════════════════════════════════ */}
      <section id="contact" className="contact-section">
        <div>
          <div className="about-accent" />
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">Contact Us</h2>
          <p>Have questions or need assistance? Our team is always ready to help you with anything healthcare-related.</p>
          <div className="contact-items">
            <div className="contact-item">
              <div className="c-icon">{Icon.phone}</div>
              <div><strong>Emergency Helpline</strong><span>1800-XXX-XXXX (Toll Free)</span></div>
            </div>
            <div className="contact-item">
              <div className="c-icon">{Icon.mail}</div>
              <div><strong>Email Support</strong><span>care@medicare.in</span></div>
            </div>
            <div className="contact-item">
              <div className="c-icon">{Icon.hospital}</div>
              <div><strong>Head Office</strong><span>Sector 62, Noida, Uttar Pradesh – 201301</span></div>
            </div>
          </div>
        </div>
        <div className="contact-form">
          <div className="form-row">
            <div className="form-group"><label>Full Name</label><input placeholder="Dr. / Mr. / Ms." /></div>
            <div className="form-group"><label>Phone</label><input placeholder="+91 XXXXX XXXXX" /></div>
          </div>
          <div className="form-group"><label>Email</label><input type="email" placeholder="you@example.com" /></div>
          <div className="form-group">
            <label>Department</label>
            <select>
              <option>Select a speciality</option>
              {specialities.map(s => <option key={s.label}>{s.label}</option>)}
            </select>
          </div>
          <div className="form-group"><label>Message</label><textarea placeholder="Describe your query or concern…" /></div>
          <button className="btn btn-primary" style={{alignSelf:"flex-start",padding:"13px 30px"}}>
            Send Message {Icon.arrow}
          </button>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════ */}
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo">
              <div className="nav-logo-icon">🏥</div>
              <span className="footer-logo" style={{fontSize:"1.15rem",fontWeight:700}}>MediCare HMS</span>
            </div>
            <p>Delivering world-class integrated healthcare with compassion, excellence and innovation across India.</p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a onClick={() => scrollTo("about")}>About Us</a></li>
              <li><a onClick={() => scrollTo("doctors")}>Our Doctors</a></li>
              <li><a onClick={() => scrollTo("specialities")}>Specialities</a></li>
              <li><a onClick={() => scrollTo("blogs")}>Health Blogs</a></li>
              <li><a onClick={() => scrollTo("contact")}>Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>For Patients</h4>
            <ul>
              <li><a onClick={() => navigate("/register")}>Register</a></li>
              <li><a onClick={() => navigate("/loginselector")}>Book Appointment</a></li>
              <li><a onClick={() => navigate("/lpatient-dashboard")}>Patient Dashboard</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>For Doctors</h4>
            <ul>
              <li><a onClick={() => navigate("/loginselector")}>Doctor Login</a></li>
              <li><a onClick={() => navigate("/loginselector")}>Doctor Dashboard</a></li>
              <li><a onClick={() => navigate("/loginselector")}>Appointments</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 MediCare HMS. All rights reserved.</span>
          <span>Built for better healthcare</span>
        </div>
      </footer>
    </>
  );
}