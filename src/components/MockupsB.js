import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Clock, X, Check, Phone, Bike, Download, TrendingUp, Calendar } from 'lucide-react';
import { useI18n } from '../i18n';
import { Counter } from './MockupsA';

/* ------------------ COURIER MOCKUP ------------------ */
export const CourierMockup = () => {
  const { t } = useI18n();
  const [phase, setPhase] = useState(0); // 0 idle, 1 incoming, 2 accepting, 3 accepted
  useEffect(() => {
    const id = setInterval(() => {
      setPhase((p) => (p + 1) % 4);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div data-testid="mockup-courier" className="relative w-[300px] mx-auto shrink-0">
      {/* Phone frame */}
      <div className="relative w-[300px] rounded-[44px] bg-[#111827] p-3 shadow-[0_30px_80px_rgba(17,24,39,0.25)]">
        <div className="rounded-[34px] overflow-hidden bg-white w-full h-[600px] relative">
          {/* Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 h-6 w-24 rounded-full bg-black z-30" />

          {/* Top bar */}
          <div className="pt-8 px-5 pb-3 flex items-center justify-between">
            <div className="text-[11px] font-bold font-mono">9:41</div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-[#34C759]" />
              <span className="text-[10px] font-bold text-gray-600">{t.mockups.courierOnline}</span>
            </div>
          </div>

          {/* Map BG */}
          <div className="absolute inset-0 top-14 bg-[#eef2ff] overflow-hidden">
            <svg viewBox="0 0 300 500" className="w-full h-full opacity-90">
              <defs>
                <pattern id="gridc" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#dbeafe" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="300" height="500" fill="url(#gridc)" />
              {/* Roads */}
              <path d="M0,120 C80,110 180,160 300,140" stroke="#c7d2fe" strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.6" />
              <path d="M60,0 C70,120 40,230 90,380 L110,500" stroke="#c7d2fe" strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.6" />
              <path d="M200,0 C190,100 240,220 220,360 L240,500" stroke="#c7d2fe" strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.5" />
              {/* Route */}
              <path d="M150,360 Q130,260 180,180 T240,80" stroke="#ff7652" strokeWidth="3" fill="none" strokeLinecap="round" className="dash-move" />
            </svg>
            {/* Courier marker */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              className="absolute left-[46%] top-[52%]"
            >
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-[#ff7652] text-white flex items-center justify-center border-[3px] border-white shadow-lg animate-pin-pulse-orange">
                  <Bike size={16} strokeWidth={2.5} />
                </div>
              </div>
            </motion.div>
            {/* Destination */}
            <div className="absolute right-[16%] top-[14%]">
              <div className="h-8 w-8 rounded-full bg-[#4A6CF7] text-white flex items-center justify-center border-2 border-white shadow-lg animate-pin-pulse">
                <MapPin size={14} strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* Bottom incoming card */}
          <AnimatePresence mode="wait">
            {(phase === 1 || phase === 2) && (
              <motion.div
                key="incoming"
                initial={{ y: 320, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 400, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className="absolute left-3 right-3 bottom-4 rounded-[26px] bg-white p-4 shadow-[0_20px_40px_rgba(17,24,39,0.15)] border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff7652] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff7652]" />
                    </span>
                    <span className="text-[11px] font-bold text-[#ff7652] uppercase tracking-wider">{t.mockups.courierNew}</span>
                  </div>
                  <div className="text-[11px] font-mono font-bold text-gray-500">#4821</div>
                </div>
                <div className="mt-2 font-display text-[22px] font-semibold leading-tight">
                  Warszawa, Marszałkowska 82
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-gray-50 rounded-xl p-2">
                    <div className="text-[10px] text-gray-500 font-semibold">{t.mockups.courierDistance}</div>
                    <div className="text-[13px] font-bold mt-0.5">3.4 km</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-2">
                    <div className="text-[10px] text-gray-500 font-semibold">{t.mockups.courierEta}</div>
                    <div className="text-[13px] font-bold mt-0.5">12 min</div>
                  </div>
                  <div className="bg-[#ffe4dd] rounded-xl p-2">
                    <div className="text-[10px] text-[#ff7652] font-semibold">{t.mockups.courierEarn}</div>
                    <div className="text-[13px] font-extrabold mt-0.5 text-[#ff7652]">24 zł</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button data-testid="courier-reject-btn" className="h-11 w-11 shrink-0 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500">
                    <X size={18} strokeWidth={2.5} />
                  </button>
                  <motion.button
                    data-testid="courier-accept-btn"
                    animate={phase === 2 ? { scale: [1, 0.96, 1.02, 1] } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex-1 h-11 rounded-2xl bg-[#111827] text-white font-bold text-[13px] flex items-center justify-center gap-2"
                  >
                    <Check size={16} strokeWidth={3} />
                    {t.mockups.courierTake}
                  </motion.button>
                </div>
              </motion.div>
            )}
            {phase === 3 && (
              <motion.div
                key="accepted"
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 200, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className="absolute left-3 right-3 bottom-4 rounded-[26px] bg-[#111827] p-4 text-white shadow-[0_20px_40px_rgba(17,24,39,0.35)]"
              >
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-full bg-[#34C759] flex items-center justify-center">
                    <Navigation size={16} strokeWidth={2.8} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] opacity-70 font-semibold">#4821 · {t.mockups.courierEta}</div>
                    <div className="text-[15px] font-display font-semibold leading-tight">12 min · 3.4 km</div>
                  </div>
                  <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone size={14} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

/* ------------------ MAP MOCKUP ------------------ */
export const MapMockup = () => {
  const { t } = useI18n();
  const pins = [
    { x: 22, y: 32, kind: 'free', id: '4810', time: '4m', late: false },
    { x: 58, y: 24, kind: 'mine', id: '4821', time: '12m' },
    { x: 78, y: 48, kind: 'others', id: '—' },
    { x: 38, y: 62, kind: 'free', id: '4812', time: '7m' },
    { x: 68, y: 72, kind: 'mine', id: '4819', time: '21m', late: true },
    { x: 18, y: 78, kind: 'others', id: '—' },
    { x: 88, y: 22, kind: 'others', id: '—' },
    { x: 48, y: 44, kind: 'free', id: '4815', time: '9m' },
  ];

  return (
    <div data-testid="mockup-map" className="relative w-full rounded-[26px] overflow-hidden border border-gray-200 bg-[#e8eefe] shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
      {/* Map */}
      <div className="relative h-[520px]">
        <svg viewBox="0 0 800 520" className="absolute inset-0 w-full h-full">
          <defs>
            <pattern id="gridm" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#c7d2fe" strokeWidth="0.8" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="800" height="520" fill="url(#gridm)" />
          {/* Road shapes */}
          <path d="M0,180 C200,160 400,220 800,190" stroke="#fff" strokeWidth="22" fill="none" strokeLinecap="round" />
          <path d="M0,180 C200,160 400,220 800,190" stroke="#c7d2fe" strokeWidth="2" fill="none" strokeDasharray="10 8" />

          <path d="M140,0 C160,180 120,340 180,520" stroke="#fff" strokeWidth="18" fill="none" strokeLinecap="round" />
          <path d="M500,0 C480,180 540,360 510,520" stroke="#fff" strokeWidth="18" fill="none" strokeLinecap="round" />
          <path d="M0,380 C250,360 550,420 800,400" stroke="#fff" strokeWidth="18" fill="none" strokeLinecap="round" />

          {/* Parks */}
          <rect x="230" y="280" width="150" height="90" rx="18" fill="#dcfce7" />
          <rect x="600" y="60" width="120" height="80" rx="16" fill="#dcfce7" />
          {/* Water */}
          <path d="M0,440 C200,460 500,430 800,460 L800,520 L0,520 Z" fill="#bfdbfe" opacity="0.7" />
        </svg>

        {/* Pins */}
        {pins.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, type: 'spring', stiffness: 300, damping: 20 }}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex flex-col items-center">
              {p.time && (
                <div className={`map-label mb-1 ${p.late ? 'bg-red-50 border-red-200 text-red-600' : ''}`}>
                  #{p.id} · {p.time}{p.late && ' ⚠'}
                </div>
              )}
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center border-[3px] border-white shadow-md
                ${p.kind === 'free' ? 'bg-[#4A6CF7] animate-pin-pulse' : ''}
                ${p.kind === 'mine' ? 'bg-[#ff7652]' : ''}
                ${p.kind === 'others' ? 'bg-gray-400' : ''}
                ${p.late ? 'animate-pin-pulse-red bg-[#ef4444]' : ''}
                `}
              >
                <MapPin size={16} color="white" strokeWidth={2.6} fill="white" />
              </div>
            </div>
          </motion.div>
        ))}

        {/* Legend */}
        <div className="absolute left-4 bottom-4 rounded-2xl bg-white/95 backdrop-blur border border-gray-200 shadow-lg p-3 flex items-center gap-4 text-[11px] font-bold">
          <div className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-[#4A6CF7]" />{t.mockups.mapFree}</div>
          <div className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-[#ff7652]" />{t.mockups.mapMine}</div>
          <div className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-gray-400" />{t.mockups.mapOthers}</div>
          <div className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-[#ef4444]" />{t.mockups.mapLate}</div>
        </div>

        {/* Top floating stats */}
        <div className="absolute right-4 top-4 rounded-2xl bg-white/95 backdrop-blur border border-gray-200 shadow-lg p-3 w-[180px]">
          <div className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Live</div>
          <div className="mt-1 grid grid-cols-2 gap-2">
            <div>
              <div className="font-display text-[22px] font-semibold leading-none"><Counter to={8} /></div>
              <div className="text-[10px] text-gray-500 font-semibold">active</div>
            </div>
            <div>
              <div className="font-display text-[22px] font-semibold leading-none text-[#34C759]"><Counter to={24} /></div>
              <div className="text-[10px] text-gray-500 font-semibold">done</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------ REPORTS MOCKUP ------------------ */
export const ReportsMockup = () => {
  const { t } = useI18n();
  const [period, setPeriod] = useState('week');
  const data = {
    today: [12, 19, 15, 22, 28, 24, 32, 38, 34, 42, 48, 45],
    week: [45, 58, 52, 68, 74, 65, 82, 95, 88, 102, 115, 108],
    month: [220, 285, 260, 320, 360, 330, 420, 480, 455, 520, 580, 558],
  }[period];
  const W = 720, H = 220;
  const max = Math.max(...data);
  const step = W / (data.length - 1);
  const points = data.map((v, i) => [i * step, H - (v / max) * (H - 30) - 15]);
  const path = points.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
  const area = `${path} L${W},${H} L0,${H} Z`;

  return (
    <div data-testid="mockup-reports" className="w-full rounded-[26px] bg-white border border-gray-200 shadow-[0_20px_60px_rgba(17,24,39,0.08)] overflow-hidden">
      <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-[#ffe4dd] text-[#ff7652] flex items-center justify-center">
            <TrendingUp size={18} strokeWidth={2.4} />
          </div>
          <div>
            <div className="font-display font-semibold text-[16px]">{t.mockups.reportsTitle}</div>
            <div className="text-[11px] text-gray-500 font-semibold">{t.mockups.reportsPeriod}: {t.mockups.ownerFilter[period]}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-xl p-1">
            {['today', 'week', 'month'].map((f) => (
              <button key={f} data-testid={`reports-period-${f}`} onClick={() => setPeriod(f)} className={`text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all ${period === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>
                {t.mockups.ownerFilter[f]}
              </button>
            ))}
          </div>
          <button data-testid="reports-export-btn" className="flex items-center gap-1.5 bg-[#111827] text-white text-[11px] font-bold px-3 py-2 rounded-xl">
            <Download size={14} strokeWidth={2.5} />
            {t.mockups.reportsExport}
          </button>
        </div>
      </div>

      <div className="p-5 grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-gradient-to-br from-[#ff7652] to-[#ff5a30] text-white p-4">
          <div className="text-[10px] font-bold uppercase opacity-80 tracking-wider">{t.mockups.reportsRevenue}</div>
          <div className="font-display text-[28px] font-semibold mt-1"><Counter key={`rev-${period}`} to={{today:4820, week:28740, month:124980}[period]} suffix=" zł" /></div>
          <div className="text-[11px] opacity-90 mt-1">▲ +12.4%</div>
        </div>
        <div className="rounded-2xl bg-white border border-gray-100 p-4">
          <div className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">{t.mockups.reportsOrders}</div>
          <div className="font-display text-[28px] font-semibold mt-1"><Counter key={`ord-${period}`} to={{today:68, week:412, month:1874}[period]} /></div>
          <div className="text-[11px] text-[#ff7652] font-bold mt-1">▲ +22%</div>
        </div>
        <div className="rounded-2xl bg-white border border-gray-100 p-4">
          <div className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">{t.mockups.reportsAvg}</div>
          <div className="font-display text-[28px] font-semibold mt-1"><Counter key={`avg-${period}`} to={{today:70.9, week:69.7, month:66.7}[period]} suffix=" zł" /></div>
          <div className="text-[11px] text-[#4A6CF7] font-bold mt-1">▲ +3.2%</div>
        </div>
      </div>

      <div className="px-5 pb-5">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[220px]">
          <defs>
            <linearGradient id="repArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ff7652" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ff7652" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((p) => <line key={p} x1="0" x2={W} y1={H * p} y2={H * p} className="chart-grid-line" />)}
          <motion.path key={`rarea-${period}`} d={area} fill="url(#repArea)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} />
          <motion.path
            key={`rpath-${period}`}
            d={path}
            fill="none"
            stroke="#ff7652"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
          {points.map((p, i) => (
            <motion.circle key={`${period}-${i}`} cx={p[0]} cy={p[1]} r="4" fill="#fff" stroke="#ff7652" strokeWidth="2.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.04 }} />
          ))}
          {/* Month labels */}
          {['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22'].map((l, i) => (
            <text key={i} x={i * step} y={H - 2} textAnchor="middle" className="text-[9px]" fill="#9ca3af" style={{ fontSize: 9, fontFamily: 'JetBrains Mono', fontWeight: 700 }}>{l}</text>
          ))}
        </svg>
      </div>
    </div>
  );
};

/* ------------------ SCHEDULE MOCKUP ------------------ */
export const ScheduleMockup = () => {
  const { t } = useI18n();
  const couriers = [
    { name: 'Max K.', shifts: [1, 1, 1, 0, 1, 1, 0] },
    { name: 'Anna W.', shifts: [1, 0, 1, 1, 1, 0, 1] },
    { name: 'Piotr S.', shifts: [0, 1, 1, 1, 0, 1, 1] },
    { name: 'Olena D.', shifts: [1, 1, 0, 1, 1, 1, 1] },
  ];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div data-testid="mockup-schedule" className="w-full rounded-[26px] bg-white border border-gray-200 shadow-[0_20px_60px_rgba(17,24,39,0.08)] overflow-hidden">
      <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-[#4A6CF7]/10 text-[#4A6CF7] flex items-center justify-center">
            <Calendar size={18} strokeWidth={2.4} />
          </div>
          <div className="font-display font-semibold text-[16px]">{t.mockups.schedTitle}</div>
        </div>
        <button className="flex items-center gap-1.5 bg-[#ff7652] text-white text-[11px] font-bold px-3 py-2 rounded-xl">
          + {t.mockups.schedAdd}
        </button>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-[120px_repeat(7,1fr)] gap-1 text-[10px] font-bold text-gray-400 uppercase mb-2">
          <div />
          {days.map((d) => <div key={d} className="text-center py-2">{d}</div>)}
        </div>
        {couriers.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="grid grid-cols-[120px_repeat(7,1fr)] gap-1 items-center mb-1"
          >
            <div className="flex items-center gap-2 pr-2">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white ${['bg-[#ff7652]','bg-[#4A6CF7]','bg-[#34C759]','bg-[#FFB020]'][i]}`}>
                {c.name.split(' ')[0][0]}{c.name.split(' ')[1][0]}
              </div>
              <div className="text-[13px] font-bold truncate">{c.name}</div>
            </div>
            {c.shifts.map((s, k) => (
              <motion.div
                key={k}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + k * 0.05 }}
                className={`h-11 rounded-xl flex items-center justify-center text-[10px] font-bold ${s ? 'bg-[#ffe4dd] text-[#ff7652] border border-[#ff7652]/20' : 'bg-gray-50 text-gray-300 border border-gray-100'}`}
              >
                {s ? '10-22' : '—'}
              </motion.div>
            ))}
          </motion.div>
        ))}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-[#f9f9fb] border border-gray-100 p-3">
            <div className="text-[10px] font-bold uppercase text-gray-400">Hours</div>
            <div className="font-display text-[20px] font-semibold mt-0.5"><Counter to={186} /> h</div>
          </div>
          <div className="rounded-2xl bg-[#f9f9fb] border border-gray-100 p-3">
            <div className="text-[10px] font-bold uppercase text-gray-400">Payout</div>
            <div className="font-display text-[20px] font-semibold mt-0.5"><Counter to={4650} suffix=" zł" /></div>
          </div>
          <div className="rounded-2xl bg-[#f9f9fb] border border-gray-100 p-3">
            <div className="text-[10px] font-bold uppercase text-gray-400">Per km</div>
            <div className="font-display text-[20px] font-semibold mt-0.5">1.20 zł</div>
          </div>
        </div>
      </div>
    </div>
  );
};
