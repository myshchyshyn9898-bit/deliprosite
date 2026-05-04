import React, { useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import {
  User, Phone, MapPin, ShoppingBag, CreditCard, Banknote, Check, Bike,
} from 'lucide-react';
import { useI18n } from '../i18n';

/* Animated number counter */
export const Counter = ({ to = 100, duration = 1.4, prefix = '', suffix = '', className = '' }) => {
  const isFloat = !Number.isInteger(to);
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => {
    if (isFloat) return v.toFixed(1);
    return Math.round(v).toLocaleString();
  });
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [started, setStarted] = React.useState(false);
  useEffect(() => {
    // Start on intersection OR fallback on mount after 250ms so tab re-mounts always animate
    const tm = setTimeout(() => setStarted(true), 250);
    return () => clearTimeout(tm);
  }, []);
  useEffect(() => {
    if (inView || started) {
      mv.set(0);
      const ctrl = animate(mv, to, { duration, ease: [0.16, 1, 0.3, 1] });
      return () => ctrl.stop();
    }
  }, [inView, started, to, duration, mv]);
  return (
    <span ref={ref} className={className}>
      {prefix}<motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
};

/* ------------------ MANAGER MOCKUP ------------------ */
export const ManagerMockup = () => {
  const { t } = useI18n();
  const [step, setStep] = useState(0);
  useEffect(() => {
    const seq = [0, 1, 2, 3, 4, 5];
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % seq.length;
      setStep(seq[i]);
    }, 1100);
    return () => clearInterval(id);
  }, []);

  const Field = ({ idx, icon: Icon, label, value, highlight }) => {
    const active = step >= idx;
    return (
      <motion.div
        initial={false}
        animate={{ opacity: active ? 1 : 0.45, y: active ? 0 : 4 }}
        transition={{ duration: 0.4 }}
        className={`flex items-center gap-3 rounded-2xl border px-4 py-3 bg-white ${active ? 'border-[#ff7652]/40 shadow-[0_4px_20px_rgba(255,118,82,0.08)]' : 'border-gray-200'}`}
      >
        <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${active ? 'bg-[#ffe4dd] text-[#ff7652]' : 'bg-gray-100 text-gray-400'}`}>
          <Icon size={16} strokeWidth={2.4} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{label}</div>
          <div className="text-[14px] font-semibold text-gray-900 truncate">
            {active ? (
              <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}>
                {value}
              </motion.span>
            ) : (
              <span className="inline-block h-3 w-28 rounded bg-gray-100" />
            )}
          </div>
        </div>
        {highlight && active && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="h-6 w-6 rounded-full bg-[#34C759] text-white flex items-center justify-center">
            <Check size={14} strokeWidth={3} />
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <div data-testid="mockup-manager" className="relative w-full max-w-[420px] mx-auto">
      <div className="rounded-[28px] bg-white border border-gray-200 shadow-[0_20px_60px_rgba(17,24,39,0.08)] overflow-hidden">
        {/* Header */}
        <div className="px-5 pt-5 pb-4 bg-gradient-to-br from-[#ff7652] to-[#ff5a30] text-white">
          <div className="text-[11px] opacity-80 font-semibold uppercase tracking-wider">{t.mockups.mgrSub}</div>
          <div className="text-xl font-display font-semibold mt-1">{t.mockups.mgrTitle}</div>
          <div className="mt-3 flex items-center gap-2 text-[11px]">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step > i ? 'bg-white' : 'bg-white/30'}`} />
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="p-4 space-y-2.5 bg-[#f9f9fb]">
          <Field idx={1} icon={User} label={t.mockups.fClient} value="Oksana P." />
          <Field idx={2} icon={Phone} label={t.mockups.fPhone} value="+48 501 234 567" />
          <Field idx={3} icon={MapPin} label={t.mockups.fAddr} value="Warszawa, ul. Nowy Świat 12" />
          <div className="grid grid-cols-2 gap-2">
            <motion.div
              animate={{ opacity: step >= 4 ? 1 : 0.45 }}
              className={`rounded-2xl border p-3 flex items-center gap-2 ${step >= 4 ? 'border-[#ff7652] bg-white' : 'border-gray-200 bg-white'}`}
            >
              <Banknote size={14} className={step >= 4 ? 'text-[#ff7652]' : 'text-gray-400'} />
              <span className="text-[12px] font-bold">{t.mockups.cash}</span>
            </motion.div>
            <motion.div animate={{ opacity: step >= 4 ? 0.5 : 0.45 }} className="rounded-2xl border border-gray-200 p-3 flex items-center gap-2 bg-white">
              <CreditCard size={14} className="text-gray-400" />
              <span className="text-[12px] font-bold text-gray-500">{t.mockups.term}</span>
            </motion.div>
          </div>
          <Field idx={5} icon={Bike} label={t.mockups.fCourier} value="Max · 4.2 km" highlight />
          <motion.button
            data-testid="mockup-manager-submit"
            animate={{ scale: step >= 5 ? 1 : 0.98, opacity: step >= 5 ? 1 : 0.6 }}
            className="w-full mt-1 rounded-2xl bg-[#111827] text-white font-bold py-3.5 text-[14px] flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(17,24,39,0.25)]"
          >
            {t.mockups.fSubmit}
            <Check size={16} strokeWidth={3} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

/* ------------------ OWNER DASHBOARD MOCKUP ------------------ */
export const OwnerMockup = () => {
  const { t } = useI18n();
  const [filter, setFilter] = useState('today');

  // Chart data — changes based on filter
  const chartData = {
    today: [8, 14, 11, 18, 22, 19, 28, 32, 27, 35, 41, 38],
    week: [42, 55, 48, 68, 72, 61, 85, 92, 78, 99, 115, 108],
    month: [220, 280, 245, 310, 365, 330, 410, 468, 420, 520, 580, 560],
  };
  const data = chartData[filter];
  const max = Math.max(...data);
  const W = 560;
  const H = 160;
  const step = W / (data.length - 1);
  const points = data.map((v, i) => [i * step, H - (v / max) * (H - 20) - 10]);
  const path = points.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
  const area = `${path} L${W},${H} L0,${H} Z`;

  const total = { today: 4820, week: 28740, month: 124980 }[filter];
  const cash = { today: 2140, week: 11280, month: 52410 }[filter];
  const term = { today: 2680, week: 17460, month: 72570 }[filter];
  const orders = { today: 68, week: 412, month: 1874 }[filter];
  const avg = { today: 70.9, week: 69.7, month: 66.7 }[filter];
  const time = { today: '28m', week: '31m', month: '29m' }[filter];

  return (
    <div data-testid="mockup-owner" className="relative w-full">
      <div className="rounded-[26px] bg-white border border-gray-200 shadow-[0_20px_60px_rgba(17,24,39,0.08)] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100 bg-white">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#ff7652] to-[#ff5a30] text-white flex items-center justify-center font-black text-[11px]">DP</div>
            <div>
              <div className="font-display font-semibold text-[15px] leading-tight">{t.mockups.ownerTitle}</div>
              <div className="text-[10px] text-gray-400 font-semibold">{new Date().toLocaleDateString()}</div>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            {['today', 'week', 'month'].map((f) => (
              <button
                key={f}
                data-testid={`owner-filter-${f}`}
                onClick={() => setFilter(f)}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all ${filter === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
              >
                {t.mockups.ownerFilter[f]}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 grid grid-cols-12 gap-3 bg-[#f9f9fb]">
          {/* Big total card */}
          <motion.div
            key={`total-${filter}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-12 md:col-span-7 relative rounded-2xl p-5 overflow-hidden text-white bg-gradient-to-br from-[#ff7652] via-[#ff6a43] to-[#e65c38]"
          >
            <div className="text-[11px] font-semibold uppercase tracking-wider opacity-80">{t.mockups.ownerTotal}</div>
            <div className="mt-2 font-display text-[44px] leading-none font-semibold">
              <Counter key={filter} to={total} duration={1.2} suffix=" zł" />
            </div>
            <div className="mt-3 flex items-center gap-3 text-[11px] opacity-90">
              <span className="bg-white/15 rounded-lg px-2 py-1">▲ +12.4%</span>
              <span>vs. prev period</span>
            </div>
            <svg viewBox="0 0 100 30" className="absolute right-4 bottom-3 w-40 h-16 opacity-40" preserveAspectRatio="none">
              <path d="M0,20 Q25,5 50,15 T100,8" fill="none" stroke="white" strokeWidth="1.8" />
            </svg>
          </motion.div>

          {/* Avg + time */}
          <div className="col-span-12 md:col-span-5 grid grid-cols-2 gap-3">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="rounded-2xl bg-white border border-gray-100 p-4">
              <div className="h-7 w-7 rounded-lg bg-blue-50 text-[#4A6CF7] flex items-center justify-center mb-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v6m0 0v6m0-6h6m-6 0H6"/><circle cx="12" cy="18" r="3"/></svg>
              </div>
              <div className="font-display text-[22px] font-semibold"><Counter key={`avg-${filter}`} to={avg} duration={1} suffix=" zł" /></div>
              <div className="text-[11px] text-gray-500 font-semibold">{t.mockups.ownerAvg}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="rounded-2xl bg-white border border-gray-100 p-4">
              <div className="h-7 w-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
              </div>
              <div className="font-display text-[22px] font-semibold">{time}</div>
              <div className="text-[11px] text-gray-500 font-semibold">{t.mockups.ownerTime}</div>
            </motion.div>
          </div>

          {/* Chart */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="col-span-12 md:col-span-7 rounded-2xl bg-white border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div className="text-[12px] font-bold text-gray-700">{t.mockups.ownerChart}</div>
              <div className="flex items-center gap-2 text-[10px] font-semibold text-gray-400"><span className="h-2 w-2 rounded-full bg-[#ff7652]" /> {t.mockups.reportsRevenue}</div>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[160px] mt-2" preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ff7652" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#ff7652" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0.25, 0.5, 0.75].map((p) => (
                <line key={p} x1="0" x2={W} y1={H * p} y2={H * p} className="chart-grid-line" />
              ))}
              <motion.path key={`area-${filter}`} d={area} fill="url(#areaGrad)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} />
              <motion.path
                key={`line-${filter}`}
                d={path}
                fill="none"
                stroke="#ff7652"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              />
              {points.map((p, i) => (
                <motion.circle
                  key={`${filter}-${i}`}
                  cx={p[0]}
                  cy={p[1]}
                  r="3"
                  fill="#fff"
                  stroke="#ff7652"
                  strokeWidth="2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.04 }}
                />
              ))}
            </svg>
          </motion.div>

          {/* Heatmap card */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="col-span-12 md:col-span-5 rounded-2xl bg-white border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[12px] font-bold text-gray-700">{t.mockups.ownerHeat}</div>
                <div className="text-[10px] text-gray-400 font-semibold">{t.mockups.ownerHeatSub}</div>
              </div>
              <div className="h-7 w-7 rounded-lg bg-[#ffe4dd] text-[#ff7652] flex items-center justify-center">
                <MapPin size={14} />
              </div>
            </div>
            {/* Fake map with heatmap blobs */}
            <div className="relative mt-3 h-[130px] rounded-xl overflow-hidden border border-gray-100 bg-[#eef2ff]">
              <svg viewBox="0 0 300 130" className="absolute inset-0 w-full h-full">
                <defs>
                  <radialGradient id="heat1"><stop offset="0%" stopColor="#ef4444" stopOpacity="0.75" /><stop offset="100%" stopColor="#ef4444" stopOpacity="0" /></radialGradient>
                  <radialGradient id="heat2"><stop offset="0%" stopColor="#ff7652" stopOpacity="0.7" /><stop offset="100%" stopColor="#ff7652" stopOpacity="0" /></radialGradient>
                  <radialGradient id="heat3"><stop offset="0%" stopColor="#FFB020" stopOpacity="0.6" /><stop offset="100%" stopColor="#FFB020" stopOpacity="0" /></radialGradient>
                </defs>
                {/* Grid lines (streets) */}
                {[20, 50, 80, 110].map((y) => <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#dbeafe" strokeWidth="1" />)}
                {[40, 90, 140, 190, 240].map((x) => <line key={x} x1={x} x2={x} y1="0" y2="130" stroke="#dbeafe" strokeWidth="1" />)}
                <circle cx="80" cy="50" r="45" fill="url(#heat1)" />
                <circle cx="200" cy="80" r="50" fill="url(#heat2)" />
                <circle cx="250" cy="40" r="32" fill="url(#heat3)" />
                <circle cx="140" cy="95" r="28" fill="url(#heat2)" />
              </svg>
            </div>
            <div className="mt-2 flex items-center gap-2 text-[10px] font-semibold text-gray-400">
              <span>{t.mockups.ownerLow}</span>
              <div className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-blue-300 via-[#FFB020] to-[#ef4444]" />
              <span>{t.mockups.ownerHigh}</span>
            </div>
          </motion.div>

          {/* Small stat cards */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="col-span-6 md:col-span-4 rounded-2xl bg-white border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="h-7 w-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"><Banknote size={14} /></div>
              <span className="text-[10px] font-bold text-emerald-600">+8%</span>
            </div>
            <div className="font-display text-[22px] font-semibold"><Counter key={`cash-${filter}`} to={cash} suffix=" zł" /></div>
            <div className="text-[11px] text-gray-500 font-semibold">{t.mockups.cash}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }} className="col-span-6 md:col-span-4 rounded-2xl bg-white border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="h-7 w-7 rounded-lg bg-blue-50 text-[#4A6CF7] flex items-center justify-center"><CreditCard size={14} /></div>
              <span className="text-[10px] font-bold text-[#4A6CF7]">+15%</span>
            </div>
            <div className="font-display text-[22px] font-semibold"><Counter key={`term-${filter}`} to={term} suffix=" zł" /></div>
            <div className="text-[11px] text-gray-500 font-semibold">{t.mockups.term}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 }} className="col-span-12 md:col-span-4 rounded-2xl bg-white border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="h-7 w-7 rounded-lg bg-[#ffe4dd] text-[#ff7652] flex items-center justify-center"><ShoppingBag size={14} /></div>
              <span className="text-[10px] font-bold text-[#ff7652]">+22%</span>
            </div>
            <div className="font-display text-[22px] font-semibold"><Counter key={`orders-${filter}`} to={orders} /></div>
            <div className="text-[11px] text-gray-500 font-semibold">{t.mockups.ownerOrders}</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
