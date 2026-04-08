import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── SVG Icons ───────────────────────────────────────────────────────────────
const Icon = {
  dashboard:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  calendar:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  records:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  pill:         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 20.5 20.5 10.5a4.95 4.95 0 0 0-7-7L3.5 13.5a4.95 4.95 0 0 0 7 7z"/><line x1="8.5" y1="15.5" x2="15.5" y2="8.5"/></svg>,
  user:         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/></svg>,
  bell:         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  heart:        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  activity:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  droplet:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
  thermometer:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>,
  clock:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  check:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  arrow:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  logout:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  stethoscope:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 6.5a4 4 0 0 0 8 0V4a.5.5 0 0 0-.5-.5h-7A.5.5 0 0 0 4.5 4v2.5z"/><path d="M8.5 10.5v2a5.5 5.5 0 0 0 11 0v-1"/><circle cx="19.5" cy="11" r="1.5"/></svg>,
  star:         <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  plus:         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  download:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  menu:         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  close:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  edit:         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
};

// ─── Mock Data ───────────────────────────────────────────────────────────────
const appointments = [
  { id: 1, doctor: "Dr. Arjun Mehta",    specialty: "Cardiologist",   date: "Apr 12, 2026", time: "10:30 AM", status: "upcoming",  avatar: "AM" },
  { id: 2, doctor: "Dr. Priya Sharma",   specialty: "Neurologist",    date: "Apr 18, 2026", time: "02:00 PM", status: "upcoming",  avatar: "PS" },
  { id: 3, doctor: "Dr. Sneha Rao",      specialty: "Orthopedist",    date: "Mar 28, 2026", time: "11:00 AM", status: "completed", avatar: "SR" },
  { id: 4, doctor: "Dr. Vikram Iyer",    specialty: "Oncologist",     date: "Mar 10, 2026", time: "09:15 AM", status: "completed", avatar: "VI" },
  { id: 5, doctor: "Dr. Kavya Nair",     specialty: "Dermatologist",  date: "Feb 22, 2026", time: "03:30 PM", status: "cancelled", avatar: "KN" },
];

const records = [
  { id: 1, title: "Complete Blood Count (CBC)",    date: "Mar 28, 2026", doctor: "Dr. Sneha Rao",   type: "Lab Report",   status: "Normal" },
  { id: 2, title: "Chest X-Ray",                   date: "Mar 10, 2026", doctor: "Dr. Vikram Iyer", type: "Radiology",    status: "Normal" },
  { id: 3, title: "ECG Report",                    date: "Jan 15, 2026", doctor: "Dr. Arjun Mehta", type: "Cardiology",   status: "Reviewed" },
  { id: 4, title: "MRI Brain Scan",                date: "Dec 02, 2025", doctor: "Dr. Priya Sharma", type: "Neurology",   status: "Normal" },
];

const prescriptions = [
  { id: 1, medicine: "Atorvastatin 10mg",  dosage: "1 tablet daily",      doctor: "Dr. Arjun Mehta",  date: "Mar 10, 2026", refills: 2, status: "active"   },
  { id: 2, medicine: "Metformin 500mg",    dosage: "2 tablets after meals",doctor: "Dr. Sneha Rao",    date: "Mar 28, 2026", refills: 3, status: "active"   },
  { id: 3, medicine: "Amlodipine 5mg",     dosage: "1 tablet at night",    doctor: "Dr. Arjun Mehta",  date: "Jan 15, 2026", refills: 0, status: "expired"  },
  { id: 4, medicine: "Vitamin D3 60K IU",  dosage: "1 weekly",             doctor: "Dr. Priya Sharma", date: "Dec 02, 2025", refills: 1, status: "active"   },
];

const vitals = [
  { label: "Heart Rate",   value: "72",  unit: "bpm",   icon: Icon.heart,       color: "#fee2e2", iconColor: "#ef4444", trend: "▲ 2" },
  { label: "Blood Pressure",value: "118/78", unit: "mmHg", icon: Icon.activity, color: "#e0f2fe", iconColor: "#0284c7", trend: "● Stable" },
  { label: "Blood Glucose",value: "96",  unit: "mg/dL", icon: Icon.droplet,     color: "#fef9c3", iconColor: "#ca8a04", trend: "▼ 4" },
  { label: "Temperature",  value: "98.4",unit: "°F",    icon: Icon.thermometer, color: "#f0fdf4", iconColor: "#16a34a", trend: "● Normal" },
];

// ─── Nav items ────────────────────────────────────────────────────────────────
const navItems = [
  { id: "overview",      label: "Overview",      icon: Icon.dashboard   },
  { id: "appointments",  label: "Appointments",  icon: Icon.calendar    },
  { id: "records",       label: "Medical Records",icon: Icon.records    },
  { id: "prescriptions", label: "Prescriptions", icon: Icon.pill        },
  { id: "profile",       label: "My Profile",    icon: Icon.user        },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function PatientDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --teal:   #0d9488;
          --teal2:  #14b8a6;
          --teal3:  #ccfbf1;
          --teal4:  #f0fdfa;
          --navy:   #0f2d40;
          --navy2:  #1e4060;
          --gold:   #f59e0b;
          --gray:   #64748b;
          --light:  #f1f5f9;
          --white:  #ffffff;
          --sidebar-w: 260px;
        }

        body { font-family: 'DM Sans', sans-serif; background: #f0fdf9; color: var(--navy); overflow-x: hidden; }
        h1,h2,h3,h4 { font-family: 'Playfair Display', serif; }

        /* ── LAYOUT ── */
        .pd-layout { display: flex; min-height: 100vh; }

        /* ── SIDEBAR ── */
        .pd-sidebar {
          width: var(--sidebar-w); background: var(--navy);
          display: flex; flex-direction: column;
          position: fixed; top: 0; left: 0; height: 100vh;
          z-index: 200; transition: transform .3s;
        }
        .pd-sidebar-logo {
          display: flex; align-items: center; gap: 10px;
          padding: 24px 22px 20px; border-bottom: 1px solid rgba(255,255,255,.08);
          cursor: pointer;
        }
        .pd-logo-icon { width: 36px; height: 36px; background: var(--teal); border-radius: 10px; display: grid; place-items: center; font-size: 18px; flex-shrink: 0; }
        .pd-logo-text { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; color: white; }
        .pd-logo-text span { color: #5eead4; }

        .pd-patient-card {
          margin: 18px 16px; background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.1); border-radius: 16px; padding: 16px;
          display: flex; align-items: center; gap: 12px;
        }
        .pd-avatar {
          width: 46px; height: 46px; border-radius: 50%;
          background: linear-gradient(135deg, var(--teal), var(--teal2));
          display: grid; place-items: center; font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-weight: 700; color: white; flex-shrink: 0;
        }
        .pd-patient-info strong { display: block; font-size: .88rem; color: white; font-weight: 600; }
        .pd-patient-info span   { font-size: .72rem; color: rgba(255,255,255,.5); }
        .pd-patient-badge {
          display: inline-block; background: rgba(13,148,136,.35);
          border: 1px solid rgba(20,184,166,.4); color: #5eead4;
          font-size: .65rem; font-weight: 600; padding: 2px 8px;
          border-radius: 50px; margin-top: 4px; letter-spacing: .5px;
        }

        .pd-nav { flex: 1; padding: 10px 12px; overflow-y: auto; }
        .pd-nav-label { font-size: .65rem; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,.3); padding: 10px 10px 6px; }
        .pd-nav-item {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 12px; border-radius: 12px; cursor: pointer;
          transition: all .2s; color: rgba(255,255,255,.55); font-size: .875rem; font-weight: 500;
          margin-bottom: 2px;
        }
        .pd-nav-item svg { width: 18px; height: 18px; flex-shrink: 0; }
        .pd-nav-item:hover { background: rgba(255,255,255,.08); color: white; }
        .pd-nav-item.active { background: linear-gradient(135deg, var(--teal), var(--teal2)); color: white; box-shadow: 0 4px 16px rgba(13,148,136,.4); }

        .pd-sidebar-footer { padding: 16px 12px; border-top: 1px solid rgba(255,255,255,.08); }
        .pd-logout {
          display: flex; align-items: center; gap: 10px;
          padding: 11px 12px; border-radius: 12px; cursor: pointer;
          color: rgba(255,255,255,.45); font-size: .875rem; transition: all .2s;
        }
        .pd-logout svg { width: 18px; height: 18px; }
        .pd-logout:hover { color: #fca5a5; background: rgba(239,68,68,.1); }

        /* ── MAIN AREA ── */
        .pd-main { margin-left: var(--sidebar-w); flex: 1; display: flex; flex-direction: column; min-height: 100vh; }

        /* ── TOPBAR ── */
        .pd-topbar {
          background: white; padding: 0 32px; height: 68px;
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid #e8f5f3; position: sticky; top: 0; z-index: 100;
          box-shadow: 0 2px 12px rgba(13,148,136,.06);
        }
        .pd-topbar-left h2 { font-size: 1.15rem; color: var(--navy); }
        .pd-topbar-left p  { font-size: .78rem; color: var(--gray); margin-top: 1px; }
        .pd-topbar-right { display: flex; align-items: center; gap: 12px; }
        .pd-icon-btn {
          width: 38px; height: 38px; border-radius: 10px;
          background: var(--teal4); border: none; cursor: pointer;
          display: grid; place-items: center; color: var(--teal); transition: all .2s; position: relative;
        }
        .pd-icon-btn:hover { background: var(--teal3); }
        .pd-icon-btn svg { width: 17px; height: 17px; }
        .pd-notif-dot {
          position: absolute; top: 7px; right: 7px;
          width: 7px; height: 7px; background: #ef4444; border-radius: 50%;
          border: 1.5px solid white;
        }
        .pd-hamburger { display: none; }

        .pd-book-btn {
          display: inline-flex; align-items: center; gap: 7px;
          background: linear-gradient(135deg, var(--teal), var(--teal2));
          color: white; border: none; padding: 9px 18px; border-radius: 50px;
          font-family: 'DM Sans'; font-size: .82rem; font-weight: 600; cursor: pointer;
          box-shadow: 0 4px 14px rgba(13,148,136,.3); transition: all .25s;
        }
        .pd-book-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(13,148,136,.4); }
        .pd-book-btn svg { width: 15px; height: 15px; }

        /* ── CONTENT ── */
        .pd-content { padding: 30px 32px; flex: 1; }

        /* ── OVERVIEW CARDS ── */
        .pd-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-bottom: 28px; }
        .pd-stat-card {
          background: white; border-radius: 18px; padding: 20px 22px;
          box-shadow: 0 2px 16px rgba(13,148,136,.07);
          display: flex; align-items: center; gap: 16px;
          transition: transform .25s, box-shadow .25s;
        }
        .pd-stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(13,148,136,.12); }
        .pd-stat-icon { width: 48px; height: 48px; border-radius: 14px; display: grid; place-items: center; flex-shrink: 0; }
        .pd-stat-icon svg { width: 22px; height: 22px; }
        .pd-stat-val  { font-family: 'Playfair Display', serif; font-size: 1.55rem; font-weight: 700; color: var(--navy); line-height: 1; }
        .pd-stat-lbl  { font-size: .75rem; color: var(--gray); margin-top: 3px; }

        /* ── SECTION HEADER ── */
        .pd-section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
        .pd-section-header h3 { font-size: 1.15rem; color: var(--navy); }
        .pd-view-all { font-size: .8rem; font-weight: 600; color: var(--teal); cursor: pointer; display: inline-flex; align-items: center; gap: 4px; border: none; background: none; }
        .pd-view-all svg { width: 13px; height: 13px; }
        .pd-view-all:hover { text-decoration: underline; }

        /* ── TWO-COL GRID ── */
        .pd-two-col { display: grid; grid-template-columns: 1.5fr 1fr; gap: 22px; margin-bottom: 28px; }

        /* ── APPOINTMENT CARD ── */
        .pd-appt-list { display: flex; flex-direction: column; gap: 12px; }
        .pd-appt-card {
          background: white; border-radius: 16px; padding: 16px 18px;
          display: flex; align-items: center; gap: 14px;
          box-shadow: 0 2px 12px rgba(13,148,136,.06);
          transition: transform .2s, box-shadow .2s;
        }
        .pd-appt-card:hover { transform: translateX(4px); box-shadow: 0 6px 22px rgba(13,148,136,.11); }
        .pd-doc-avatar {
          width: 42px; height: 42px; border-radius: 50%;
          background: linear-gradient(135deg, var(--teal3), #a7f3d0);
          display: grid; place-items: center; font-weight: 700; font-size: .78rem;
          color: var(--teal); flex-shrink: 0; font-family: 'DM Sans';
        }
        .pd-appt-info { flex: 1; }
        .pd-appt-info strong { display: block; font-size: .88rem; color: var(--navy); font-weight: 600; }
        .pd-appt-info span   { font-size: .74rem; color: var(--teal); font-weight: 500; }
        .pd-appt-time { text-align: right; }
        .pd-appt-time .date { font-size: .78rem; font-weight: 600; color: var(--navy); display: block; }
        .pd-appt-time .time { font-size: .7rem; color: var(--gray); }
        .pd-badge {
          display: inline-block; padding: 3px 10px; border-radius: 50px;
          font-size: .67rem; font-weight: 700; letter-spacing: .3px; text-transform: uppercase;
        }
        .pd-badge.upcoming  { background: #dcfce7; color: #16a34a; }
        .pd-badge.completed { background: var(--teal3); color: var(--teal); }
        .pd-badge.cancelled { background: #fee2e2; color: #dc2626; }
        .pd-badge.active    { background: #dcfce7; color: #16a34a; }
        .pd-badge.expired   { background: var(--light); color: var(--gray); }

        /* ── VITALS CARD ── */
        .pd-vitals-card { background: white; border-radius: 20px; padding: 22px; box-shadow: 0 2px 16px rgba(13,148,136,.07); }
        .pd-vitals-list { display: flex; flex-direction: column; gap: 14px; margin-top: 14px; }
        .pd-vital-row {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 14px; border-radius: 13px; background: var(--light);
          transition: background .2s;
        }
        .pd-vital-row:hover { background: var(--teal4); }
        .pd-vital-icon { width: 36px; height: 36px; border-radius: 10px; display: grid; place-items: center; flex-shrink: 0; }
        .pd-vital-icon svg { width: 16px; height: 16px; }
        .pd-vital-info { flex: 1; }
        .pd-vital-label { font-size: .74rem; color: var(--gray); }
        .pd-vital-value { font-family: 'Playfair Display', serif; font-size: 1.05rem; color: var(--navy); font-weight: 700; }
        .pd-vital-unit  { font-size: .7rem; color: var(--gray); margin-left: 3px; font-family: 'DM Sans'; font-weight: 400; }
        .pd-vital-trend { font-size: .72rem; color: var(--gray); background: white; padding: 2px 8px; border-radius: 50px; }

        /* ── QUICK HEALTH TIPS ── */
        .pd-tips-card {
          background: linear-gradient(135deg, var(--navy), var(--navy2));
          border-radius: 20px; padding: 24px; box-shadow: 0 4px 20px rgba(15,45,64,.2);
        }
        .pd-tips-card h3 { color: white; font-size: 1.05rem; margin-bottom: 14px; }
        .pd-tip-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,.08);
        }
        .pd-tip-item:last-child { border-bottom: none; }
        .pd-tip-dot { width: 22px; height: 22px; border-radius: 50%; background: var(--teal); display: grid; place-items: center; flex-shrink: 0; margin-top: 1px; }
        .pd-tip-dot svg { width: 12px; height: 12px; color: white; }
        .pd-tip-text { font-size: .78rem; color: rgba(255,255,255,.72); line-height: 1.55; }

        /* ── RECORDS TABLE ── */
        .pd-table-card { background: white; border-radius: 20px; box-shadow: 0 2px 16px rgba(13,148,136,.07); overflow: hidden; }
        .pd-table { width: 100%; border-collapse: collapse; }
        .pd-table th { font-size: .72rem; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--gray); padding: 14px 20px; background: var(--light); text-align: left; }
        .pd-table td { padding: 15px 20px; border-top: 1px solid #f1f5f9; font-size: .84rem; color: var(--navy); }
        .pd-table tr:hover td { background: var(--teal4); }
        .pd-record-type { display: inline-block; padding: 3px 10px; border-radius: 50px; font-size: .68rem; font-weight: 600; background: #f3f0ff; color: #7c3aed; }
        .pd-record-status { display: inline-block; padding: 3px 10px; border-radius: 50px; font-size: .68rem; font-weight: 600; background: #dcfce7; color: #16a34a; }
        .pd-dl-btn {
          width: 30px; height: 30px; border-radius: 8px;
          background: var(--teal4); border: none; cursor: pointer;
          display: grid; place-items: center; color: var(--teal); transition: all .2s;
        }
        .pd-dl-btn:hover { background: var(--teal3); }
        .pd-dl-btn svg { width: 14px; height: 14px; }

        /* ── PRESCRIPTIONS ── */
        .pd-rx-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .pd-rx-card {
          background: white; border-radius: 18px; padding: 20px;
          box-shadow: 0 2px 14px rgba(13,148,136,.07);
          border-left: 4px solid transparent;
          transition: all .25s;
        }
        .pd-rx-card.active  { border-left-color: var(--teal); }
        .pd-rx-card.expired { border-left-color: #cbd5e1; }
        .pd-rx-card:hover { transform: translateY(-3px); box-shadow: 0 8px 26px rgba(13,148,136,.12); }
        .pd-rx-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
        .pd-rx-name { font-size: .95rem; font-weight: 600; color: var(--navy); }
        .pd-rx-dosage { font-size: .78rem; color: var(--gray); margin-top: 2px; }
        .pd-rx-meta { display: flex; gap: 14px; margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--light); }
        .pd-rx-meta-item label { display: block; font-size: .68rem; color: var(--gray); font-weight: 600; letter-spacing: .5px; text-transform: uppercase; }
        .pd-rx-meta-item span  { font-size: .8rem; color: var(--navy); font-weight: 600; }
        .pd-pill-icon { width: 38px; height: 38px; border-radius: 11px; background: var(--teal4); display: grid; place-items: center; color: var(--teal); }
        .pd-pill-icon svg { width: 18px; height: 18px; }

        /* ── PROFILE ── */
        .pd-profile-layout { display: grid; grid-template-columns: 1fr 2fr; gap: 24px; }
        .pd-profile-card { background: white; border-radius: 20px; padding: 28px; box-shadow: 0 2px 16px rgba(13,148,136,.07); text-align: center; }
        .pd-profile-avatar {
          width: 88px; height: 88px; border-radius: 50%;
          background: linear-gradient(135deg, var(--teal), var(--teal2));
          display: grid; place-items: center; font-family: 'Playfair Display', serif;
          font-size: 2rem; font-weight: 700; color: white; margin: 0 auto 16px;
          box-shadow: 0 6px 24px rgba(13,148,136,.3);
        }
        .pd-profile-name { font-size: 1.25rem; color: var(--navy); margin-bottom: 4px; }
        .pd-profile-id   { font-size: .78rem; color: var(--gray); }
        .pd-profile-stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: var(--light); border-radius: 14px; overflow: hidden; margin-top: 20px; }
        .pd-profile-stat { background: white; padding: 14px 10px; text-align: center; }
        .pd-profile-stat strong { display: block; font-family: 'Playfair Display', serif; font-size: 1.3rem; color: var(--teal); }
        .pd-profile-stat span   { font-size: .7rem; color: var(--gray); }

        .pd-info-card { background: white; border-radius: 20px; padding: 28px; box-shadow: 0 2px 16px rgba(13,148,136,.07); }
        .pd-info-section-title { font-size: 1rem; color: var(--navy); margin-bottom: 18px; padding-bottom: 12px; border-bottom: 2px solid var(--teal4); }
        .pd-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
        .pd-info-field label { display: block; font-size: .72rem; font-weight: 600; color: var(--gray); letter-spacing: .5px; text-transform: uppercase; margin-bottom: 5px; }
        .pd-info-field span  { font-size: .88rem; color: var(--navy); font-weight: 500; }
        .pd-edit-btn {
          display: inline-flex; align-items: center; gap: 7px;
          background: var(--teal4); color: var(--teal); border: 2px solid var(--teal3);
          padding: 9px 20px; border-radius: 50px; font-family: 'DM Sans';
          font-size: .83rem; font-weight: 600; cursor: pointer; transition: all .2s;
        }
        .pd-edit-btn:hover { background: var(--teal3); }
        .pd-edit-btn svg { width: 14px; height: 14px; }

        /* ── EMPTY STATES ── */
        .pd-empty { text-align: center; padding: 48px 20px; color: var(--gray); }
        .pd-empty .emoji { font-size: 2.5rem; margin-bottom: 12px; }

        /* ── MOBILE OVERLAY ── */
        .pd-sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(15,45,64,.5); z-index: 150; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .pd-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .pd-two-col { grid-template-columns: 1fr; }
          .pd-rx-grid { grid-template-columns: 1fr; }
          .pd-profile-layout { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .pd-sidebar { transform: translateX(-100%); }
          .pd-sidebar.open { transform: translateX(0); }
          .pd-sidebar-overlay.open { display: block; }
          .pd-main { margin-left: 0; }
          .pd-content { padding: 20px 16px; }
          .pd-topbar { padding: 0 16px; }
          .pd-hamburger { display: flex; }
          .pd-book-btn span { display: none; }
          .pd-stats-grid { grid-template-columns: 1fr 1fr; }
          .pd-table th:nth-child(3),
          .pd-table td:nth-child(3) { display: none; }
        }
        @media (max-width: 480px) {
          .pd-stats-grid { grid-template-columns: 1fr; }
          .pd-info-grid { grid-template-columns: 1fr; }
        }

        /* ── ANIMATIONS ── */
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .pd-content > * { animation: fadeInUp .35s ease both; }
        .pd-content > *:nth-child(2) { animation-delay: .06s; }
        .pd-content > *:nth-child(3) { animation-delay: .12s; }
        .pd-content > *:nth-child(4) { animation-delay: .18s; }
      `}</style>

      {/* ── Sidebar overlay (mobile) ── */}
      <div
        className={`pd-sidebar-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="pd-layout">
        {/* ════════════════ SIDEBAR ════════════════ */}
        <aside className={`pd-sidebar ${sidebarOpen ? "open" : ""}`}>
          {/* Logo */}
          <div className="pd-sidebar-logo" onClick={() => navigate("/")}>
            <div className="pd-logo-icon">🏥</div>
            <div className="pd-logo-text">Medi<span>Care</span></div>
          </div>

          {/* Patient card */}
          <div className="pd-patient-card">
            <div className="pd-avatar">RK</div>
            <div className="pd-patient-info">
              <strong>Rahul Kumar</strong>
              <span>PID: MH-204821</span>
              <div className="pd-patient-badge">VERIFIED</div>
            </div>
          </div>

          {/* Nav */}
          <nav className="pd-nav">
            <div className="pd-nav-label">Main Menu</div>
            {navItems.map(item => (
              <div
                key={item.id}
                className={`pd-nav-item ${activeTab === item.id ? "active" : ""}`}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              >
                {item.icon}
                {item.label}
              </div>
            ))}
          </nav>

          {/* Logout */}
          <div className="pd-sidebar-footer">
            <div className="pd-logout" onClick={() => navigate("/")}>
              {Icon.logout}
              Sign Out
            </div>
          </div>
        </aside>

        {/* ════════════════ MAIN ════════════════ */}
        <main className="pd-main">
          {/* ── Topbar ── */}
          <header className="pd-topbar">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button className="pd-icon-btn pd-hamburger" onClick={() => setSidebarOpen(true)}>
                {Icon.menu}
              </button>
              <div className="pd-topbar-left">
                <h2>{navItems.find(n => n.id === activeTab)?.label}</h2>
                <p>Wednesday, April 8, 2026 &nbsp;·&nbsp; Hello there, Rahul</p>
              </div>
            </div>
            <div className="pd-topbar-right">
              <button className="pd-icon-btn" style={{ position: "relative" }}>
                {Icon.bell}
                <span className="pd-notif-dot" />
              </button>
              <button className="pd-book-btn" onClick={() => setActiveTab("appointments")}>
                {Icon.plus}
                <span>Book Appointment</span>
              </button>
            </div>
          </header>

          {/* ── Content ── */}
          <div className="pd-content">

            {/* ════ OVERVIEW ════ */}
            {activeTab === "overview" && (
              <>
                {/* Stats */}
                <div className="pd-stats-grid">
                  {[
                    { label: "Total Appointments",  val: "12", icon: Icon.calendar, bg: "#e0f2fe", ic: "#0284c7" },
                    { label: "Upcoming",             val: "2",  icon: Icon.clock,    bg: "#dcfce7", ic: "#16a34a" },
                    { label: "Medical Records",      val: "4",  icon: Icon.records,  bg: "#ccfbf1", ic: "#0d9488" },
                    { label: "Active Prescriptions", val: "3",  icon: Icon.pill,     bg: "#fef9c3", ic: "#ca8a04" },
                  ].map((s, i) => (
                    <div className="pd-stat-card" key={i}>
                      <div className="pd-stat-icon" style={{ background: s.bg, color: s.ic }}>
                        {s.icon}
                      </div>
                      <div>
                        <div className="pd-stat-val">{s.val}</div>
                        <div className="pd-stat-lbl">{s.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Two column */}
                <div className="pd-two-col">
                  {/* Upcoming appointments */}
                  <div>
                    <div className="pd-section-header">
                      <h3>Upcoming Appointments</h3>
                      <button className="pd-view-all" onClick={() => setActiveTab("appointments")}>View all {Icon.arrow}</button>
                    </div>
                    <div className="pd-appt-list">
                      {appointments.filter(a => a.status === "upcoming").map(appt => (
                        <div className="pd-appt-card" key={appt.id}>
                          <div className="pd-doc-avatar">{appt.avatar}</div>
                          <div className="pd-appt-info">
                            <strong>{appt.doctor}</strong>
                            <span>{appt.specialty}</span>
                          </div>
                          <div className="pd-appt-time">
                            <span className="date">{appt.date}</span>
                            <span className="time">{appt.time}</span>
                          </div>
                          <span className={`pd-badge ${appt.status}`}>{appt.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vitals */}
                  <div className="pd-vitals-card">
                    <div className="pd-section-header" style={{ marginBottom: 0 }}>
                      <h3>My Vitals</h3>
                      <span style={{ fontSize: ".7rem", color: "var(--gray)" }}>Last updated today</span>
                    </div>
                    <div className="pd-vitals-list">
                      {vitals.map((v, i) => (
                        <div className="pd-vital-row" key={i}>
                          <div className="pd-vital-icon" style={{ background: v.color }}>
                            <div style={{ color: v.iconColor }}>{v.icon}</div>
                          </div>
                          <div className="pd-vital-info">
                            <div className="pd-vital-label">{v.label}</div>
                            <div>
                              <span className="pd-vital-value">{v.value}</span>
                              <span className="pd-vital-unit">{v.unit}</span>
                            </div>
                          </div>
                          <span className="pd-vital-trend">{v.trend}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tips + Recent Records */}
                <div className="pd-two-col">
                  <div>
                    <div className="pd-section-header">
                      <h3>Recent Records</h3>
                      <button className="pd-view-all" onClick={() => setActiveTab("records")}>View all {Icon.arrow}</button>
                    </div>
                    <div className="pd-table-card">
                      <table className="pd-table">
                        <thead>
                          <tr>
                            <th>Report</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {records.slice(0, 3).map(r => (
                            <tr key={r.id}>
                              <td>
                                <strong style={{ display: "block", fontSize: ".85rem" }}>{r.title}</strong>
                                <span style={{ fontSize: ".72rem", color: "var(--gray)" }}>{r.doctor}</span>
                              </td>
                              <td style={{ fontSize: ".8rem", color: "var(--gray)" }}>{r.date}</td>
                              <td><span className="pd-record-status">{r.status}</span></td>
                              <td><button className="pd-dl-btn">{Icon.download}</button></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="pd-tips-card">
                    <h3>Health Reminders</h3>
                    {[
                      "Take Atorvastatin 10mg before bed tonight.",
                      "Your follow-up with Dr. Mehta is on Apr 12 at 10:30 AM.",
                      "Annual health checkup is due in 3 weeks.",
                      "Drink at least 2.5 litres of water today.",
                    ].map((tip, i) => (
                      <div className="pd-tip-item" key={i}>
                        <div className="pd-tip-dot">{Icon.check}</div>
                        <p className="pd-tip-text">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ════ APPOINTMENTS ════ */}
            {activeTab === "appointments" && (
              <>
                <div className="pd-section-header">
                  <h3>All Appointments</h3>
                  <button className="pd-book-btn">
                    {Icon.plus} Book New Appointment
                  </button>
                </div>

                {/* Upcoming */}
                <p style={{ fontSize: ".8rem", fontWeight: 600, color: "var(--gray)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>Upcoming</p>
                <div className="pd-appt-list" style={{ marginBottom: 28 }}>
                  {appointments.filter(a => a.status === "upcoming").map(appt => (
                    <div className="pd-appt-card" key={appt.id} style={{ boxShadow: "0 3px 18px rgba(13,148,136,.1)" }}>
                      <div className="pd-doc-avatar">{appt.avatar}</div>
                      <div className="pd-appt-info">
                        <strong>{appt.doctor}</strong>
                        <span>{appt.specialty}</span>
                      </div>
                      <div className="pd-appt-time">
                        <span className="date">{appt.date}</span>
                        <span className="time">{appt.time}</span>
                      </div>
                      <span className={`pd-badge ${appt.status}`}>{appt.status}</span>
                      <button style={{ marginLeft: 8, padding: "7px 16px", borderRadius: 50, fontSize: ".75rem", fontWeight: 600, background: "#fee2e2", color: "#dc2626", border: "none", cursor: "pointer" }}>Cancel</button>
                    </div>
                  ))}
                </div>

                {/* Past */}
                <p style={{ fontSize: ".8rem", fontWeight: 600, color: "var(--gray)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>Past</p>
                <div className="pd-appt-list">
                  {appointments.filter(a => a.status !== "upcoming").map(appt => (
                    <div className="pd-appt-card" key={appt.id} style={{ opacity: .85 }}>
                      <div className="pd-doc-avatar">{appt.avatar}</div>
                      <div className="pd-appt-info">
                        <strong>{appt.doctor}</strong>
                        <span>{appt.specialty}</span>
                      </div>
                      <div className="pd-appt-time">
                        <span className="date">{appt.date}</span>
                        <span className="time">{appt.time}</span>
                      </div>
                      <span className={`pd-badge ${appt.status}`}>{appt.status}</span>
                      {appt.status === "completed" && (
                        <div style={{ display: "flex", gap: 2, marginLeft: 4 }}>
                          {[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= 4 ? "#f59e0b" : "#cbd5e1", fontSize: "11px" }}>★</span>)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ════ RECORDS ════ */}
            {activeTab === "records" && (
              <>
                <div className="pd-section-header">
                  <h3>Medical Records</h3>
                  <span style={{ fontSize: ".82rem", color: "var(--gray)" }}>4 records found</span>
                </div>
                <div className="pd-table-card">
                  <table className="pd-table">
                    <thead>
                      <tr>
                        <th>Report Name</th>
                        <th>Date</th>
                        <th>Doctor</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map(r => (
                        <tr key={r.id}>
                          <td><strong>{r.title}</strong></td>
                          <td style={{ color: "var(--gray)", fontSize: ".82rem" }}>{r.date}</td>
                          <td style={{ color: "var(--teal)", fontSize: ".82rem", fontWeight: 600 }}>{r.doctor}</td>
                          <td><span className="pd-record-type">{r.type}</span></td>
                          <td><span className="pd-record-status">{r.status}</span></td>
                          <td>
                            <button className="pd-dl-btn" title="Download">{Icon.download}</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* ════ PRESCRIPTIONS ════ */}
            {activeTab === "prescriptions" && (
              <>
                <div className="pd-section-header">
                  <h3>My Prescriptions</h3>
                  <span style={{ fontSize: ".82rem", color: "var(--gray)" }}>3 active · 1 expired</span>
                </div>
                <div className="pd-rx-grid">
                  {prescriptions.map(rx => (
                    <div className={`pd-rx-card ${rx.status}`} key={rx.id}>
                      <div className="pd-rx-header">
                        <div>
                          <div className="pd-rx-name">{rx.medicine}</div>
                          <div className="pd-rx-dosage">{rx.dosage}</div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                          <span className={`pd-badge ${rx.status}`}>{rx.status}</span>
                          <div className="pd-pill-icon">{Icon.pill}</div>
                        </div>
                      </div>
                      <div className="pd-rx-meta">
                        <div className="pd-rx-meta-item">
                          <label>Prescribed by</label>
                          <span>{rx.doctor}</span>
                        </div>
                        <div className="pd-rx-meta-item">
                          <label>Date</label>
                          <span>{rx.date}</span>
                        </div>
                        <div className="pd-rx-meta-item">
                          <label>Refills Left</label>
                          <span>{rx.refills}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ════ PROFILE ════ */}
            {activeTab === "profile" && (
              <div className="pd-profile-layout">
                {/* Left */}
                <div className="pd-profile-card">
                  <div className="pd-profile-avatar">RK</div>
                  <h3 className="pd-profile-name">Rahul Kumar</h3>
                  <p className="pd-profile-id">Patient ID: MH-204821</p>
                  <div style={{ display: "flex", justifyContent: "center", gap: 4, margin: "12px 0" }}>
                    {[1,2,3,4,5].map(s => <span key={s} style={{ color: "#f59e0b", fontSize: 14 }}>★</span>)}
                  </div>
                  <p style={{ fontSize: ".78rem", color: "var(--gray)", lineHeight: 1.6 }}>
                    Member since January 2024. Verified patient with complete health records.
                  </p>
                  <div className="pd-profile-stats">
                    <div className="pd-profile-stat"><strong>12</strong><span>Visits</span></div>
                    <div className="pd-profile-stat"><strong>4</strong><span>Records</span></div>
                    <div className="pd-profile-stat"><strong>3</strong><span>Rx</span></div>
                  </div>
                  <button className="pd-edit-btn" style={{ marginTop: 20, width: "100%", justifyContent: "center" }}>
                    {Icon.edit} Edit Photo
                  </button>
                </div>

                {/* Right */}
                <div className="pd-info-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                    <h3 className="pd-info-section-title" style={{ margin: 0 }}>Personal Information</h3>
                    <button className="pd-edit-btn">{Icon.edit} Edit Profile</button>
                  </div>
                  <div className="pd-info-grid">
                    {[
                      ["Full Name", "Rahul Kumar"],
                      ["Date of Birth", "August 14, 1990"],
                      ["Gender", "Male"],
                      ["Blood Group", "B+"],
                      ["Phone", "+91 98765 43210"],
                      ["Email", "rahul.kumar@gmail.com"],
                      ["Address", "Sector 22, Noida, UP"],
                      ["Emergency Contact", "+91 98765 00001"],
                    ].map(([label, val]) => (
                      <div className="pd-info-field" key={label}>
                        <label>{label}</label>
                        <span>{val}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="pd-info-section-title" style={{ marginTop: 8 }}>Medical Information</h3>
                  <div className="pd-info-grid">
                    {[
                      ["Height", "5'10\" (178 cm)"],
                      ["Weight", "72 kg"],
                      ["BMI", "22.7 (Normal)"],
                      ["Allergies", "Penicillin, Dust"],
                      ["Chronic Conditions", "Hypertension (mild)"],
                      ["Primary Doctor", "Dr. Arjun Mehta"],
                    ].map(([label, val]) => (
                      <div className="pd-info-field" key={label}>
                        <label>{label}</label>
                        <span>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </>
  );
}