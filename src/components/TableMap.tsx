import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────
export type TableStatus = 'available' | 'occupied' | 'selected';
export type TableZone   = 'window' | 'center' | 'private' | 'bar';
type Facing = 'up' | 'down' | 'left' | 'right';

export interface TableData {
  id: string;
  label: string;
  seats: number;
  shape: 'round' | 'rect';
  zone: TableZone;
  status: TableStatus;
  cx: number; cy: number;
  r?: number; w?: number; h?: number;
}

// ── Zone colours ───────────────────────────────────────────────────────────────
const ZONE_META: Record<TableZone, { label: string; color: string }> = {
  window:  { label: 'Window',  color: '#60a5fa' },
  center:  { label: 'Centre',  color: '#c084fc' },
  private: { label: 'Private', color: '#fbbf24' },
  bar:     { label: 'Bar',     color: '#34d399' },
};

// ── Floor-plan data ────────────────────────────────────────────────────────────
const INITIAL_TABLES: TableData[] = [
  // Window (top band)
  { id:'W1', label:'W1', seats:2, shape:'round', zone:'window', status:'available', cx:90,  cy:84,  r:22 },
  { id:'W2', label:'W2', seats:2, shape:'round', zone:'window', status:'occupied',  cx:210, cy:84,  r:22 },
  { id:'W3', label:'W3', seats:4, shape:'rect',  zone:'window', status:'available', cx:360, cy:84,  w:112, h:46 },
  { id:'W4', label:'W4', seats:2, shape:'round', zone:'window', status:'available', cx:492, cy:84,  r:22 },
  { id:'W5', label:'W5', seats:2, shape:'round', zone:'window', status:'occupied',  cx:590, cy:84,  r:22 },
  // Centre (two rows)
  { id:'C1', label:'C1', seats:4, shape:'round', zone:'center', status:'available', cx:100, cy:230, r:34 },
  { id:'C2', label:'C2', seats:6, shape:'rect',  zone:'center', status:'occupied',  cx:290, cy:230, w:155, h:58 },
  { id:'C3', label:'C3', seats:4, shape:'round', zone:'center', status:'available', cx:482, cy:230, r:34 },
  { id:'C4', label:'C4', seats:4, shape:'round', zone:'center', status:'available', cx:600, cy:230, r:34 },
  { id:'C5', label:'C5', seats:6, shape:'rect',  zone:'center', status:'available', cx:100, cy:368, w:140, h:58 },
  { id:'C6', label:'C6', seats:4, shape:'round', zone:'center', status:'occupied',  cx:298, cy:368, r:34 },
  { id:'C7', label:'C7', seats:4, shape:'round', zone:'center', status:'available', cx:452, cy:368, r:34 },
  { id:'C8', label:'C8', seats:4, shape:'rect',  zone:'center', status:'available', cx:600, cy:368, w:110, h:50 },
  // Private booths (right column)
  { id:'P1', label:'P1', seats:2, shape:'rect', zone:'private', status:'available', cx:734, cy:110, w:52, h:66 },
  { id:'P2', label:'P2', seats:4, shape:'rect', zone:'private', status:'occupied',  cx:734, cy:250, w:52, h:90 },
  { id:'P3', label:'P3', seats:4, shape:'rect', zone:'private', status:'available', cx:734, cy:388, w:52, h:90 },
  // Bar (bottom band)
  { id:'B1', label:'B1', seats:2, shape:'round', zone:'bar', status:'available', cx:100, cy:448, r:18 },
  { id:'B2', label:'B2', seats:2, shape:'round', zone:'bar', status:'available', cx:210, cy:448, r:18 },
  { id:'B3', label:'B3', seats:2, shape:'round', zone:'bar', status:'occupied',  cx:320, cy:448, r:18 },
  { id:'B4', label:'B4', seats:2, shape:'round', zone:'bar', status:'available', cx:430, cy:448, r:18 },
  { id:'B5', label:'B5', seats:2, shape:'round', zone:'bar', status:'available', cx:540, cy:448, r:18 },
];

// ── Chair physics ──────────────────────────────────────────────────────────────
const CHAIR_GAP = 15; // px from table edge to chair centre
const CW = 13;        // chair width
const SH = 10;        // seat height
const BH = 4;         // backrest height

function facingFromAngle(deg: number): Facing {
  const a = ((deg % 360) + 360) % 360;
  if (a < 45 || a >= 315) return 'left';
  if (a < 135) return 'up';
  if (a < 225) return 'right';
  return 'down';
}

// ── Chair SVG ──────────────────────────────────────────────────────────────────
const Chair = ({ cx, cy, facing, color }: { cx:number; cy:number; facing:Facing; color:string }) => {
  const rot: Record<Facing,number> = { up:0, down:180, left:270, right:90 };
  return (
    <g transform={`translate(${cx},${cy}) rotate(${rot[facing]})`}>
      {/* Seat body */}
      <rect x={-CW/2} y={-SH/2} width={CW} height={SH} rx={2.5} fill={color} fillOpacity={0.38} />
      {/* Seat highlight */}
      <rect x={-CW/2+2} y={-SH/2+2} width={CW-4} height={SH*0.45} rx={1.5} fill="white" fillOpacity={0.05} />
      {/* Backrest */}
      <rect x={-CW/2+1} y={SH/2} width={CW-2} height={BH} rx={1.5} fill={color} fillOpacity={0.88} />
      {/* Backrest top highlight */}
      <rect x={-CW/2+2} y={SH/2} width={CW-4} height={1.5} rx={0.5} fill="white" fillOpacity={0.08} />
    </g>
  );
};

// ── Single table + chairs ──────────────────────────────────────────────────────
const TableNode = ({ table, onSelect }: { table:TableData; onSelect:(t:TableData)=>void }) => {
  const isOccupied = table.status === 'occupied';
  const isSelected = table.status === 'selected';
  const isAvailable = table.status === 'available';

  const zoneMeta = ZONE_META[table.zone];
  const color = isSelected ? '#22c55e' : isOccupied ? '#ef4444' : zoneMeta.color;

  // Build chair positions
  const chairs: { cx:number; cy:number; facing:Facing }[] = [];

  if (table.shape === 'round' && table.r) {
    for (let i = 0; i < table.seats; i++) {
      const deg = (i / table.seats) * 360 - 90;
      const rad = (deg * Math.PI) / 180;
      chairs.push({
        cx: table.cx + (table.r + CHAIR_GAP) * Math.cos(rad),
        cy: table.cy + (table.r + CHAIR_GAP) * Math.sin(rad),
        facing: facingFromAngle(deg),
      });
    }
  } else if (table.shape === 'rect' && table.w && table.h) {
    const { w, h, cx, cy } = table as Required<TableData>;
    const top = Math.floor(table.seats / 2);
    const bot = table.seats - top;
    for (let i = 0; i < top; i++)
      chairs.push({ cx: cx - w/2 + w/(top+1)*(i+1), cy: cy - h/2 - CHAIR_GAP, facing:'down' });
    for (let i = 0; i < bot; i++)
      chairs.push({ cx: cx - w/2 + w/(bot+1)*(i+1), cy: cy + h/2 + CHAIR_GAP, facing:'up' });
  }

  const pulseAnim = isAvailable
    ? <animate attributeName="fill-opacity" values="0.04;0.18;0.04" dur="2.8s" repeatCount="indefinite" />
    : null;

  const spinAnim = (from: string) => (
    // @ts-ignore – SMIL animateTransform is valid SVG
    <animateTransform attributeName="transform" type="rotate"
      from={from} to={from.replace('0 ', '360 ')} dur="7s" repeatCount="indefinite" />
  );

  return (
    <g onClick={() => !isOccupied && onSelect(table)}
       style={{ cursor: isOccupied ? 'not-allowed' : 'pointer' }}>

      {/* Chairs */}
      {chairs.map((c, i) => <Chair key={i} {...c} color={color} />)}

      {table.shape === 'round' && table.r ? (() => {
        const r = table.r;
        return (
          <>
            {/* Outer ambient glow – pulses when available */}
            <circle cx={table.cx} cy={table.cy} r={r+11} fill={color} fillOpacity={0.07}>
              {pulseAnim}
            </circle>
            {/* Table surface */}
            <circle cx={table.cx} cy={table.cy} r={r} fill={`${color}12`}
              stroke={color} strokeWidth={isSelected ? 2 : 1.5} />
            {/* Wood grain rings */}
            <circle cx={table.cx} cy={table.cy} r={r-6}  fill="none" stroke={`${color}28`} strokeWidth={0.8} />
            <circle cx={table.cx} cy={table.cy} r={r-13} fill="none" stroke={`${color}18`} strokeWidth={0.8} />
            {/* Centre dot */}
            <circle cx={table.cx} cy={table.cy} r={3} fill={color} fillOpacity={0.55} />
            {/* Spinning selection ring */}
            {isSelected && (
              <circle cx={table.cx} cy={table.cy} r={r+16}
                fill="none" stroke={color} strokeWidth={1.5} strokeDasharray="5 3" opacity={0.85}>
                {spinAnim(`0 ${table.cx} ${table.cy}`)}
              </circle>
            )}
            {/* Second outer pulse ring when selected */}
            {isSelected && (
              <circle cx={table.cx} cy={table.cy} r={r+22}
                fill="none" stroke={color} strokeWidth={0.8} strokeDasharray="2 6" opacity={0.4}>
                {spinAnim(`0 ${table.cx} ${table.cy}`)}
              </circle>
            )}
          </>
        );
      })() : table.w && table.h ? (() => {
        const { w, h, cx, cy } = table as Required<TableData>;
        return (
          <>
            {/* Ambient glow */}
            <rect x={cx-w/2-11} y={cy-h/2-11} width={w+22} height={h+22} rx={13}
              fill={color} fillOpacity={0.07}>
              {pulseAnim}
            </rect>
            {/* Table surface */}
            <rect x={cx-w/2} y={cy-h/2} width={w} height={h} rx={7}
              fill={`${color}12`} stroke={color} strokeWidth={isSelected ? 2 : 1.5} />
            {/* Wood grain */}
            <rect x={cx-w/2+5} y={cy-h/2+5} width={w-10} height={h-10} rx={5}
              fill="none" stroke={`${color}25`} strokeWidth={0.8} />
            <rect x={cx-w/2+10} y={cy-h/2+10} width={w-20} height={h-20} rx={3}
              fill="none" stroke={`${color}12`} strokeWidth={0.8} />
            {/* Selection ring */}
            {isSelected && (
              <rect x={cx-w/2-16} y={cy-h/2-16} width={w+32} height={h+32} rx={13}
                fill="none" stroke={color} strokeWidth={1.5} strokeDasharray="5 3" opacity={0.85}>
                {spinAnim(`0 ${cx} ${cy}`)}
              </rect>
            )}
          </>
        );
      })() : null}

      {/* Label */}
      <text x={table.cx} y={table.cy - 2.5}
        textAnchor="middle" fill={color}
        fontSize={8.5} fontWeight="700" fontFamily="'Courier New', monospace" letterSpacing={0.8}>
        {table.label}
      </text>
      <text x={table.cx} y={table.cy + 7.5}
        textAnchor="middle" fill={`${color}80`}
        fontSize={7.5} fontFamily="'Courier New', monospace">
        {table.seats}p
      </text>
      {isOccupied && (
        <text x={table.cx} y={table.cy + 17}
          textAnchor="middle" fill={color}
          fontSize={6} fontFamily="monospace" opacity={0.55}>
          FULL
        </text>
      )}
    </g>
  );
};

// ── Main component ─────────────────────────────────────────────────────────────
interface TableMapProps {
  onSelect: (table: TableData | null) => void;
  selectedTableId: string | null;
}

const SVG_W = 800;
const SVG_H = 510;

const TableMap = ({ onSelect }: TableMapProps) => {
  const [tables, setTables] = useState<TableData[]>(INITIAL_TABLES);

  const handleSelect = (clicked: TableData) => {
    setTables(prev => prev.map(t => {
      if (t.id === clicked.id) {
        const next: TableStatus = t.status === 'selected' ? 'available' : 'selected';
        onSelect(next === 'selected' ? { ...t, status: 'selected' } : null);
        return { ...t, status: next };
      }
      if (t.status === 'selected') return { ...t, status: 'available' };
      return t;
    }));
  };

  const selected  = tables.find(t => t.status === 'selected');
  const available = tables.filter(t => t.status === 'available').length;
  const occupied  = tables.filter(t => t.status === 'occupied').length;

  return (
    <div className="space-y-5">

      {/* ── Legend ──────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          {(Object.entries(ZONE_META) as [TableZone, typeof ZONE_META['window']][]).map(([zone, meta]) => (
            <span key={zone}
              className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase"
              style={{ color: `${meta.color}88` }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: meta.color }} />
              {meta.label}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <span className="text-[10px] font-bold tracking-widest uppercase text-green-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400" />{available} free
          </span>
          <span className="text-[10px] font-bold tracking-widest uppercase text-red-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400" />{occupied} taken
          </span>
        </div>
      </div>

      {/* ── Selection Banner ─────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {selected ? (
          <motion.div key="sel"
            initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
            className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-2xl px-5 py-3">
            <CheckCircle2 size={16} className="text-green-400 shrink-0" />
            <p className="text-green-400 text-[10px] font-bold tracking-widest uppercase">
              Table {selected.label} reserved · {selected.seats} seats · {ZONE_META[selected.zone].label} zone
            </p>
          </motion.div>
        ) : (
          <motion.div key="prompt"
            initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
            className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
            <XCircle size={16} className="text-white/20 shrink-0" />
            <p className="text-white/25 text-[10px] font-bold tracking-widest uppercase">
              Tap a glowing table to reserve your spot
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SVG Floor Plan ───────────────────────────────────────────────── */}
      <div className="w-full overflow-x-auto rounded-3xl border border-white/[0.06]" style={{ background:'#060608' }}>
        <div className="min-w-[560px]">
          <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ display:'block' }}>
            <defs>
              {/* Subtle tile floor */}
              <pattern id="fp-tile" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <rect width="28" height="28" fill="#06060a" />
                <rect width="14" height="14" fill="#07070b" />
                <rect x="14" y="14" width="14" height="14" fill="#07070b" />
              </pattern>

              {/* Radial spotlight for centre */}
              <radialGradient id="spotlight" cx="50%" cy="48%" r="55%">
                <stop offset="0%"   stopColor="#a855f7" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0"    />
              </radialGradient>

              {/* Window glow gradient */}
              <linearGradient id="win-glow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0"   />
              </linearGradient>

              {/* Bar glow gradient */}
              <linearGradient id="bar-glow" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%"   stopColor="#34d399" stopOpacity="0.09" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0"    />
              </linearGradient>

              {/* Private zone gradient */}
              <linearGradient id="priv-glow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#fbbf24" stopOpacity="0" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.06" />
              </linearGradient>

              {/* Soft shadow filter */}
              <filter id="f-sm" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* ── Floor ── */}
            <rect width={SVG_W} height={SVG_H} fill="url(#fp-tile)" />
            <rect width={SVG_W} height={SVG_H} fill="url(#spotlight)" />

            {/* ── Zone colour washes ── */}
            {/* Window band */}
            <rect x={0} y={0} width={680} height={145} fill="url(#win-glow)" />
            {/* Bar band */}
            <rect x={0} y={390} width={680} height={SVG_H-390} fill="url(#bar-glow)" />
            {/* Private column */}
            <rect x={690} y={0} width={SVG_W-690} height={SVG_H} fill="url(#priv-glow)" />

            {/* ── Outer room walls ── */}
            <rect x={3} y={3} width={SVG_W-6} height={SVG_H-6} rx={14}
              fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={1.5} />

            {/* ── Window frames (top wall) ── */}
            <rect x={3} y={3} width={680} height={14}
              fill="rgba(96,165,250,0.06)" />
            {[90,210,360,492,590].map((wx, i) => (
              <g key={`wf-${i}`}>
                {/* Arch window */}
                <rect x={wx-28} y={3} width={56} height={13} rx={0}
                  fill="rgba(96,165,250,0.08)" />
                <line x1={wx} y1={3} x2={wx} y2={16}
                  stroke="rgba(96,165,250,0.25)" strokeWidth={0.6} />
                <line x1={wx-28} y1={9} x2={wx+28} y2={9}
                  stroke="rgba(96,165,250,0.15)" strokeWidth={0.6} />
                {/* Window sill drop shadow */}
                <line x1={wx-30} y1={16} x2={wx+30} y2={16}
                  stroke="rgba(96,165,250,0.10)" strokeWidth={1} />
              </g>
            ))}
            {/* Full window-zone bottom divider */}
            <line x1={3} y1={145} x2={680} y2={145}
              stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
            <text x={340} y={11} textAnchor="middle"
              fill="rgba(96,165,250,0.35)" fontSize={6.5}
              fontFamily="monospace" letterSpacing={4} fontWeight="700">
              WINDOW SEATS
            </text>

            {/* ── Private zone column ── */}
            <rect x={690} y={16} width={SVG_W-700} height={SVG_H-35} rx={6}
              fill="rgba(245,158,11,0.02)" stroke="rgba(245,158,11,0.07)" strokeWidth={1} />
            <line x1={690} y1={16} x2={690} y2={SVG_H-16}
              stroke="rgba(245,158,11,0.12)" strokeWidth={1} strokeDasharray="4 3" />
            <text x={734} y={26} textAnchor="middle"
              fill="rgba(251,191,36,0.35)" fontSize={6}
              fontFamily="monospace" letterSpacing={2} fontWeight="700">
              PRIVATE
            </text>

            {/* Private zone booth dividers */}
            {[178, 318].map((y, i) => (
              <line key={`bd-${i}`}
                x1={698} y1={y} x2={SVG_W-12} y2={y}
                stroke="rgba(245,158,11,0.1)" strokeWidth={1} strokeDasharray="3 4" />
            ))}

            {/* ── Bar counter ── */}
            <rect x={16} y={482} width={642} height={22} rx={6}
              fill="rgba(16,185,129,0.07)" stroke="rgba(52,211,153,0.18)" strokeWidth={1} />
            {/* Counter detail lines */}
            <line x1={20} y1={492} x2={654} y2={492}
              stroke="rgba(52,211,153,0.06)" strokeWidth={0.5} />
            <text x={334} y={496.5} textAnchor="middle"
              fill="rgba(52,211,153,0.32)" fontSize={6.5}
              fontFamily="monospace" letterSpacing={5} fontWeight="700">
              B A R   C O U N T E R
            </text>
            {/* Bar zone top divider */}
            <line x1={3} y1={415} x2={680} y2={415}
              stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
            <text x={55} y={421.5}
              fill="rgba(52,211,153,0.25)" fontSize={6}
              fontFamily="monospace" letterSpacing={3} fontWeight="700">
              BAR
            </text>

            {/* ── Entrance ── */}
            <g>
              {/* Door gap in bottom wall */}
              <rect x={330} y={SVG_H-6} width={120} height={6} fill="#060608" />
              <line x1={330} y1={SVG_H-6} x2={330} y2={SVG_H}
                stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} />
              <line x1={450} y1={SVG_H-6} x2={450} y2={SVG_H}
                stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} />
              {/* Entrance label */}
              <rect x={348} y={SVG_H-20} width={84} height={12} rx={3}
                fill="rgba(255,255,255,0.03)" />
              <text x={390} y={SVG_H-12} textAnchor="middle"
                fill="rgba(255,255,255,0.2)" fontSize={6}
                fontFamily="monospace" letterSpacing={3}>
                ENTRANCE
              </text>
              {/* Direction arrows */}
              <path d={`M 382 ${SVG_H-25} L 378 ${SVG_H-20} L 390 ${SVG_H-20} L 402 ${SVG_H-20} L 398 ${SVG_H-25}`}
                fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={1} strokeLinejoin="round" />
            </g>

            {/* ── Corner plants ── */}
            {([[28, 162], [652, 162]] as [number,number][]).map(([px, py], i) => (
              <g key={`pl-${i}`}>
                {/* Pot */}
                <ellipse cx={px} cy={py+8} rx={9} ry={4} fill="rgba(180,120,60,0.12)" stroke="rgba(180,120,60,0.18)" strokeWidth={0.8} />
                {/* Soil */}
                <ellipse cx={px} cy={py+5} rx={8} ry={3.5} fill="rgba(80,50,20,0.15)" />
                {/* Stem */}
                <line x1={px} y1={py+4} x2={px} y2={py-8}
                  stroke="rgba(52,211,153,0.3)" strokeWidth={1.5} strokeLinecap="round" />
                {/* Leaves */}
                <path d={`M ${px} ${py-2} Q ${px-9} ${py-8} ${px-6} ${py-14}`}
                  fill="none" stroke="rgba(52,211,153,0.35)" strokeWidth={1.5} strokeLinecap="round" />
                <path d={`M ${px} ${py-4} Q ${px+9} ${py-10} ${px+5} ${py-15}`}
                  fill="none" stroke="rgba(52,211,153,0.3)" strokeWidth={1.5} strokeLinecap="round" />
                <path d={`M ${px} ${py-6} Q ${px-6} ${py-14} ${px-2} ${py-18}`}
                  fill="none" stroke="rgba(52,211,153,0.25)" strokeWidth={1.2} strokeLinecap="round" />
              </g>
            ))}

            {/* ── Subtle centre cross-aisle lines ── */}
            <line x1={3} y1={300} x2={680} y2={300}
              stroke="rgba(255,255,255,0.025)" strokeWidth={1} strokeDasharray="6 12" />
            <line x1={340} y1={145} x2={340} y2={415}
              stroke="rgba(255,255,255,0.02)" strokeWidth={1} strokeDasharray="6 12" />

            {/* ── Tables ── */}
            {tables.map(table => (
              <TableNode key={table.id} table={table} onSelect={handleSelect} />
            ))}

          </svg>
        </div>
      </div>

      {/* ── Status key ── */}
      <div className="flex items-center justify-center gap-8 text-[9px] font-bold tracking-widest uppercase">
        <span className="flex items-center gap-1.5 text-white/25">
          <span className="w-3 h-3 rounded-sm border border-purple-400/40 bg-purple-400/10" />Available
        </span>
        <span className="flex items-center gap-1.5 text-white/25">
          <span className="w-3 h-3 rounded-sm border border-red-400/40 bg-red-400/10" />Occupied
        </span>
        <span className="flex items-center gap-1.5 text-green-400/60">
          <span className="w-3 h-3 rounded-sm border border-green-400/60 bg-green-400/15" />Your Table
        </span>
      </div>
    </div>
  );
};

export default TableMap;
