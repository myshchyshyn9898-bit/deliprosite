import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Globe, ArrowRight, ChevronDown, Check, Zap, MapPin, BarChart3,
  Bike, FileSpreadsheet, Calendar, UserCheck, Sparkles, MessageCircle,
  Mail, Star,
} from 'lucide-react';
import { useI18n, LanguageProvider, translations } from './i18n';
import { ManagerMockup, OwnerMockup, Counter } from './components/MockupsA';
import { CourierMockup, MapMockup, ReportsMockup, ScheduleMockup } from './components/MockupsB';
import logoImg from './assets/logo.png';

/* ----------------------------- NAV ----------------------------- */
const Navbar = () => {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#f9f9fb]/75 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <a href="#top" data-testid="nav-logo" className="flex items-center gap-2">
          <div
            className="h-10 w-10 rounded-xl bg-black bg-no-repeat shadow-[0_6px_18px_rgba(17,24,39,0.25)]"
            style={{ backgroundImage: `url(${logoImg})`, backgroundSize: '180% auto', backgroundPosition: 'center 30%' }}
            aria-label="DeliPro"
          />
          <div className="font-display text-[20px] font-semibold tracking-tight">
            <span className="text-[#ff7652]">Deli</span><span>Pro</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-[13px] font-semibold text-gray-700">
          <a href="#features" className="hover:text-[#ff7652] transition-colors">{t.nav.features}</a>
          <a href="#showcase" className="hover:text-[#ff7652] transition-colors">{t.nav.showcase}</a>
          <a href="#pricing" className="hover:text-[#ff7652] transition-colors">{t.nav.pricing}</a>
          <a href="#reviews" className="hover:text-[#ff7652] transition-colors">{t.nav.reviews}</a>
          <a href="#faq" className="hover:text-[#ff7652] transition-colors">{t.nav.faq}</a>
        </nav>

        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <div className="relative">
            <button
              data-testid="lang-switcher"
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 h-9 text-[12px] font-bold hover:border-[#ff7652]/50 transition-colors"
            >
              <Globe size={14} strokeWidth={2.5} />
              <span>{translations[lang].flag} {translations[lang].code}</span>
              <ChevronDown size={12} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-11 w-44 rounded-2xl bg-white border border-gray-200 shadow-[0_20px_40px_rgba(0,0,0,0.08)] overflow-hidden"
                >
                  {Object.keys(translations).map((code) => (
                    <button
                      key={code}
                      data-testid={`lang-option-${code}`}
                      onClick={() => { setLang(code); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-[13px] font-bold flex items-center gap-2 hover:bg-[#ffe4dd] transition-colors ${lang === code ? 'text-[#ff7652]' : 'text-gray-700'}`}
                    >
                      <span>{translations[code].flag}</span>
                      <span>{translations[code].code === 'UK' ? 'Українська' : translations[code].code === 'EN' ? 'English' : translations[code].code === 'PL' ? 'Polski' : 'Русский'}</span>
                      {lang === code && <Check size={14} className="ml-auto" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="https://t.me/"
            target="_blank"
            rel="noreferrer"
            data-testid="nav-cta"
            className="hidden md:inline-flex items-center gap-1.5 rounded-xl bg-[#111827] text-white px-4 h-9 text-[12px] font-bold hover:bg-[#ff7652] transition-colors"
          >
            {t.nav.start}
            <ArrowRight size={13} strokeWidth={2.8} />
          </a>
        </div>
      </div>
    </header>
  );
};

/* ----------------------------- HERO ----------------------------- */
const Hero = () => {
  const { t } = useI18n();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -140]);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden pt-10 md:pt-20 pb-16 md:pb-28">
      {/* Blobs */}
      <div className="blob w-[480px] h-[480px] bg-[#ff7652]/50 -top-20 -left-40" />
      <div className="blob w-[420px] h-[420px] bg-[#ffb020]/30 top-40 -right-20" />
      <div className="absolute inset-0 grain pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Text */}
        <div className="lg:col-span-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 px-3 py-1.5 text-[12px] font-bold text-gray-700 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34C759] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34C759]" />
            </span>
            {t.hero.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-[48px] md:text-[72px] leading-[0.95] font-semibold tracking-tight mt-6"
          >
            {t.hero.title1}<br />
            <span className="relative inline-block">
              <span className="relative z-10 text-[#ff7652]">{t.hero.title2}</span>
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewBox="0 0 320 24"
                className="absolute -bottom-2 left-0 w-full h-4 text-[#ff7652]/40"
                fill="none"
                preserveAspectRatio="none"
              >
                <motion.path d="M2 18 Q80 4 160 12 T318 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </motion.svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 text-[17px] md:text-[18px] leading-relaxed text-gray-600 max-w-[540px]"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a href="#showcase" data-testid="hero-cta-primary" className="group inline-flex items-center gap-2 rounded-2xl bg-[#111827] text-white px-6 h-14 text-[15px] font-bold shadow-[0_20px_40px_rgba(17,24,39,0.25)] hover:bg-[#ff7652] transition-colors">
              <MessageCircle size={18} strokeWidth={2.5} />
              {t.hero.ctaPrimary}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" strokeWidth={2.8} />
            </a>
            <a href="#showcase" data-testid="hero-cta-secondary" className="inline-flex items-center gap-2 rounded-2xl bg-white border border-gray-200 text-gray-900 px-5 h-14 text-[15px] font-bold hover:border-[#ff7652]/50 transition-colors">
              {t.hero.ctaSecondary}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-semibold text-gray-500"
          >
            {[t.hero.tag1, t.hero.tag2, t.hero.tag3].map((tag) => (
              <div key={tag} className="flex items-center gap-1.5">
                <Check size={14} strokeWidth={3} className="text-[#34C759]" />{tag}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Visual stack */}
        <div className="lg:col-span-6 relative min-h-[520px] lg:min-h-[640px]">
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, y: 40, rotate: 1 }}
            animate={{ opacity: 1, y: 0, rotate: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <OwnerMockup />
          </motion.div>
          {/* Floating courier card (mini overlay) */}
          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -left-4 sm:-left-8 bottom-0 lg:-bottom-10 w-[240px] animate-floaty z-20"
          >
            <div className="rounded-[26px] bg-white border border-gray-100 shadow-[0_30px_60px_rgba(17,24,39,0.15)] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff7652] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff7652]" />
                  </span>
                  <span className="text-[10px] font-bold text-[#ff7652] uppercase tracking-wider">{t.mockups.courierNew}</span>
                </div>
                <div className="text-[10px] font-mono font-bold text-gray-400">#4821</div>
              </div>
              <div className="mt-2 font-display text-[15px] font-semibold leading-tight">
                Marszałkowska 82
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1 text-gray-500 font-bold">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 2 L4 10 L6 14 L8 12 L10 14 L12 12 L14 14 L16 12 L18 14 L20 10 Z"/></svg>
                  3.4 km
                </div>
                <div className="text-[11px] font-extrabold text-[#ff7652]">24 zł</div>
              </div>
              <div className="mt-3 h-8 rounded-xl bg-[#111827] text-white flex items-center justify-center gap-1 text-[11px] font-bold">
                <Check size={12} strokeWidth={3} />
                {t.mockups.courierTake}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* --------------------- TRUST STATS --------------------- */
const TrustStrip = () => {
  const { t } = useI18n();
  const stats = [
    { v: 184000, label: t.trust.orders, suffix: '+' },
    { v: 420, label: t.trust.clients, suffix: '+' },
    { v: 38, label: t.trust.cities },
    { v: 97, label: t.trust.ontime, suffix: '%' },
  ];
  return (
    <section className="relative py-12 border-y border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center md:text-left"
          >
            <div className="font-display text-[40px] md:text-[52px] font-semibold leading-none text-[#111827]">
              <Counter to={s.v} duration={2} suffix={s.suffix || ''} />
            </div>
            <div className="text-[13px] md:text-[14px] font-semibold text-gray-500 mt-2">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

/* --------------------- FEATURES GRID --------------------- */
const Features = () => {
  const { t } = useI18n();
  const icons = [UserCheck, BarChart3, Bike, MapPin, FileSpreadsheet, Calendar];
  return (
    <section id="features" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#ff7652]">
            <Sparkles size={14} />{t.features.eyebrow}
          </div>
          <h2 className="font-display text-[36px] md:text-[52px] leading-[1.05] font-semibold tracking-tight mt-3">
            {t.features.title}
          </h2>
          <p className="mt-4 text-[16px] md:text-[17px] text-gray-600">{t.features.subtitle}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.features.list.map((f, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-3xl bg-white border border-gray-200 p-6 overflow-hidden hover:border-[#ff7652]/40 transition-colors"
              >
                <div className="h-12 w-12 rounded-2xl bg-[#ffe4dd] text-[#ff7652] flex items-center justify-center mb-4 group-hover:bg-[#ff7652] group-hover:text-white transition-all">
                  <Icon size={20} strokeWidth={2.4} />
                </div>
                <h3 className="font-display text-[20px] font-semibold tracking-tight">{f.t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-gray-600">{f.d}</p>
                <div className="absolute -right-10 -bottom-10 w-36 h-36 rounded-full bg-[#ff7652]/0 group-hover:bg-[#ff7652]/5 transition-colors" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* --------------------- SHOWCASE TABS --------------------- */
const Showcase = () => {
  const { t } = useI18n();
  const tabs = [
    { id: 'manager', label: t.showcase.tabs.manager, icon: UserCheck, c: <ManagerShowcase /> },
    { id: 'owner', label: t.showcase.tabs.owner, icon: BarChart3, c: <OwnerMockup /> },
    { id: 'courier', label: t.showcase.tabs.courier, icon: Bike, c: <CourierShowcase /> },
    { id: 'map', label: t.showcase.tabs.map, icon: MapPin, c: <MapMockup /> },
    { id: 'reports', label: t.showcase.tabs.reports, icon: FileSpreadsheet, c: <ReportsMockup /> },
    { id: 'schedule', label: t.showcase.tabs.schedule, icon: Calendar, c: <ScheduleMockup /> },
  ];
  const [active, setActive] = useState('owner');
  const activeTab = tabs.find((x) => x.id === active);

  return (
    <section id="showcase" className="relative py-20 md:py-28 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#ff7652]">
            <Zap size={14} />{t.showcase.eyebrow}
          </div>
          <h2 className="font-display text-[36px] md:text-[52px] leading-[1.05] font-semibold tracking-tight mt-3">
            {t.showcase.title}
          </h2>
          <p className="mt-4 text-[16px] md:text-[17px] text-gray-600">{t.showcase.subtitle}</p>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap gap-2" data-testid="showcase-tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                data-testid={`showcase-tab-${tab.id}`}
                onClick={() => setActive(tab.id)}
                className={`relative flex items-center gap-2 rounded-2xl px-4 h-11 text-[13px] font-bold transition-all ${isActive ? 'text-white' : 'text-gray-700 bg-white border border-gray-200 hover:border-[#ff7652]/40'}`}
              >
                {isActive && (
                  <motion.div layoutId="active-tab" className="absolute inset-0 rounded-2xl bg-[#111827]" transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />
                )}
                <span className="relative flex items-center gap-2">
                  <Icon size={15} strokeWidth={2.4} />
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="mt-10 relative rounded-[32px] bg-[#f4f4f6] border border-gray-200 p-5 md:p-10 overflow-hidden">
          <div className="blob w-[420px] h-[420px] bg-[#ff7652]/30 -top-40 -right-20" />
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center"
              >
                {activeTab.c}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

/* Manager & Courier wrappers for showcase (centered with context) */
const ManagerShowcase = () => (
  <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8">
    <div className="shrink-0"><ManagerMockup /></div>
    <div className="max-w-sm">
      <MockupBullets items={[
        'Клієнт → адреса з автопошуком',
        'Призначення кур\'єра одним кліком',
        'Готівка або термінал',
        'Миттєва відправка в Telegram',
      ]} />
    </div>
  </div>
);
const CourierShowcase = () => (
  <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 py-4">
    <div className="shrink-0 flex-none w-[300px]"><CourierMockup /></div>
    <div className="max-w-sm">
      <MockupBullets items={[
        'Push-сповіщення в Telegram',
        'Маршрут у навігаторі одним кліком',
        'Прозорий розрахунок винагороди',
        'Онлайн-статус та смена',
      ]} />
    </div>
  </div>
);
const MockupBullets = ({ items }) => (
  <ul className="space-y-3">
    {items.map((i, k) => (
      <motion.li
        key={k}
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: k * 0.1 }}
        className="flex items-start gap-3 rounded-2xl bg-white border border-gray-200 p-3"
      >
        <div className="h-6 w-6 rounded-lg bg-[#34C759]/15 text-[#34C759] flex items-center justify-center shrink-0 mt-0.5">
          <Check size={14} strokeWidth={3} />
        </div>
        <span className="text-[14px] font-semibold text-gray-800">{i}</span>
      </motion.li>
    ))}
  </ul>
);

/* --------------------- PRICING --------------------- */
const Pricing = () => {
  const { t } = useI18n();
  const [yearly, setYearly] = useState(false);
  return (
    <section id="pricing" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#ff7652]">
            <Sparkles size={14} />{t.pricing.eyebrow}
          </div>
          <h2 className="font-display text-[36px] md:text-[52px] leading-[1.05] font-semibold tracking-tight mt-3">{t.pricing.title}</h2>
          <p className="mt-4 text-[16px] md:text-[17px] text-gray-600">{t.pricing.subtitle}</p>

          <div className="mt-8 inline-flex items-center gap-1 bg-white border border-gray-200 rounded-2xl p-1">
            <button data-testid="price-monthly" onClick={() => setYearly(false)} className={`px-4 h-10 rounded-xl text-[13px] font-bold transition-all ${!yearly ? 'bg-[#111827] text-white' : 'text-gray-600'}`}>{t.pricing.monthly}</button>
            <button data-testid="price-yearly" onClick={() => setYearly(true)} className={`px-4 h-10 rounded-xl text-[13px] font-bold transition-all ${yearly ? 'bg-[#111827] text-white' : 'text-gray-600'}`}>{t.pricing.yearly}</button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.pricing.plans.map((p, i) => {
            const isPopular = !!p.popular;
            const price = yearly ? Math.round(parseInt(p.price) * 0.8) : parseInt(p.price);
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`relative rounded-3xl p-7 ${isPopular ? 'bg-[#111827] text-white shadow-[0_30px_60px_rgba(17,24,39,0.25)] md:-mt-4' : 'bg-white border border-gray-200'}`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-7 bg-[#ff7652] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                    {p.popular}
                  </div>
                )}
                <div className={`font-display text-[22px] font-semibold ${isPopular ? 'text-white' : ''}`}>{p.name}</div>
                <div className={`mt-1 text-[13px] ${isPopular ? 'text-gray-400' : 'text-gray-500'} font-semibold`}>{p.desc}</div>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className={`font-display text-[56px] leading-none font-semibold ${isPopular ? 'text-white' : ''}`}>${price}</span>
                  <span className={`text-[14px] font-semibold ${isPopular ? 'text-gray-400' : 'text-gray-500'}`}>{t.pricing.perMonth}</span>
                </div>
                <a href="#cta" data-testid={`price-cta-${p.name.toLowerCase()}`} className={`mt-6 w-full inline-flex items-center justify-center gap-2 rounded-2xl h-12 text-[14px] font-bold transition-colors ${isPopular ? 'bg-[#ff7652] text-white hover:bg-[#e65c38]' : 'bg-[#111827] text-white hover:bg-[#ff7652]'}`}>
                  {p.cta}<ArrowRight size={14} strokeWidth={2.8} />
                </a>
                <ul className={`mt-6 space-y-3 text-[13px] ${isPopular ? 'text-gray-200' : 'text-gray-700'} font-semibold`}>
                  {p.features.map((f, k) => (
                    <li key={k} className="flex items-start gap-2">
                      <Check size={14} strokeWidth={3} className={isPopular ? 'text-[#ff7652] mt-1' : 'text-[#34C759] mt-1'} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* --------------------- TESTIMONIALS --------------------- */
const Testimonials = () => {
  const { t } = useI18n();
  return (
    <section id="reviews" className="relative py-20 md:py-28 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#ff7652]">
            <Star size={14} />{t.testimonials.eyebrow}
          </div>
          <h2 className="font-display text-[36px] md:text-[52px] leading-[1.05] font-semibold tracking-tight mt-3">{t.testimonials.title}</h2>
        </div>
        <div className="mt-12 columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {t.testimonials.items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="break-inside-avoid rounded-3xl bg-[#f9f9fb] border border-gray-200 p-6"
            >
              <div className="flex gap-0.5 mb-3">
                {[0, 1, 2, 3, 4].map((s) => <Star key={s} size={14} className="text-[#FFB020]" fill="#FFB020" />)}
              </div>
              <p className="text-[15px] leading-relaxed text-gray-800">"{it.q}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#ff7652] to-[#ff5a30] text-white flex items-center justify-center font-black text-[13px]">
                  {it.n.split(' ')[0][0]}{it.n.split(' ')[1] && it.n.split(' ')[1][0]}
                </div>
                <div>
                  <div className="text-[13px] font-bold">{it.n}</div>
                  <div className="text-[11px] text-gray-500 font-semibold">{it.r}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --------------------- FAQ --------------------- */
const FAQ = () => {
  const { t } = useI18n();
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <h2 className="font-display text-[36px] md:text-[52px] leading-[1.05] font-semibold tracking-tight text-center">{t.faq.title}</h2>
        <div className="mt-10 space-y-3">
          {t.faq.items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl bg-white border border-gray-200 overflow-hidden"
            >
              <button data-testid={`faq-item-${i}`} onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
                <span className="font-display text-[17px] font-semibold">{it.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <ChevronDown size={16} />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-[14px] text-gray-600 leading-relaxed">{it.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --------------------- FINAL CTA --------------------- */
const FinalCTA = () => {
  const { t } = useI18n();
  return (
    <section id="cta" className="relative py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <div className="relative rounded-[40px] bg-[#111827] text-white p-10 md:p-20 overflow-hidden">
          <div className="blob w-[500px] h-[500px] bg-[#ff7652]/50 -top-40 -left-40" />
          <div className="blob w-[400px] h-[400px] bg-[#ffb020]/30 -bottom-40 -right-40" />
          <div className="absolute inset-0 grain pointer-events-none" />
          <div className="relative text-center max-w-2xl mx-auto">
            <h2 className="font-display text-[36px] md:text-[64px] leading-[1.02] font-semibold tracking-tight">{t.cta.title}</h2>
            <p className="mt-4 text-[16px] md:text-[18px] text-gray-300">{t.cta.subtitle}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="https://t.me/" data-testid="cta-primary" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-[#ff7652] text-white px-6 h-14 text-[15px] font-bold shadow-[0_20px_40px_rgba(255,118,82,0.45)] hover:bg-[#e65c38] transition-colors">
                <MessageCircle size={18} strokeWidth={2.5} />
                {t.cta.button}
              </a>
              <a href="mailto:hello@delipro.app" data-testid="cta-secondary" className="inline-flex items-center gap-2 rounded-2xl bg-white/10 text-white border border-white/20 px-5 h-14 text-[15px] font-bold hover:bg-white/20 transition-colors">
                <Mail size={18} strokeWidth={2.5} />
                {t.cta.secondary}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* --------------------- FOOTER --------------------- */
const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="relative border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div
              className="h-10 w-10 rounded-xl bg-black bg-no-repeat"
              style={{ backgroundImage: `url(${logoImg})`, backgroundSize: '180% auto', backgroundPosition: 'center 30%' }}
              aria-label="DeliPro"
            />
            <div className="font-display text-[20px] font-semibold">
              <span className="text-[#ff7652]">Deli</span><span>Pro</span>
            </div>
          </div>
          <p className="mt-3 text-[14px] text-gray-600 max-w-sm">{t.footer.tagline}</p>
        </div>
        <div>
          <div className="text-[11px] font-black uppercase tracking-wider text-gray-400 mb-3">{t.footer.product}</div>
          <ul className="space-y-2 text-[14px] font-semibold text-gray-700">
            <li><a href="#features">Features</a></li>
            <li><a href="#showcase">Showcase</a></li>
            <li><a href="#pricing">Pricing</a></li>
          </ul>
        </div>
        <div>
          <div className="text-[11px] font-black uppercase tracking-wider text-gray-400 mb-3">{t.footer.contact}</div>
          <ul className="space-y-2 text-[14px] font-semibold text-gray-700">
            <li><a href="mailto:hello@delipro.app">hello@delipro.app</a></li>
            <li><a href="https://t.me/">Telegram</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-5 md:px-8 mt-10 pt-6 border-t border-gray-200 text-[12px] font-semibold text-gray-400 flex justify-between">
        <span>© {new Date().getFullYear()} DeliPro</span>
        <span>{t.footer.rights}</span>
      </div>
    </footer>
  );
};

/* --------------------- APP --------------------- */
const Landing = () => {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Features />
        <Showcase />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <Landing />
    </LanguageProvider>
  );
}

export default App;
