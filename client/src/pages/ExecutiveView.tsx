/**
 * GE Pilot BOM — Executive View
 * Design: Flat, document-like — consistent with the practitioner BOM
 * Purpose: High-level summary of playbook status, areas of concern, and conversion probability
 * Audience: Sales leadership, account executives, executive sponsors
 */

import { useState, useCallback } from 'react';
import { Link } from 'wouter';
import { phases } from '@/data/bomData';

// ─── Types ────────────────────────────────────────────────────────────────────
type RagStatus = 'green' | 'amber' | 'red' | 'grey';

interface PhaseStatus {
  phaseLabel: string;
  phaseColor: string;
  borderColor: string;
  totalItems: number;
  completedItems: number;
  status: RagStatus;
  keyArtifacts: { name: string; critical: boolean }[];
}

interface ConcernItem {
  phase: string;
  artifact: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  owner: string;
}

// ─── Config ───────────────────────────────────────────────────────────────────
const phaseColorMap: Record<string, { border: string; bg: string; text: string; dot: string }> = {
  phase1: { border: 'border-l-[#1A73E8]', bg: 'bg-[#E8F0FE]', text: 'text-[#1A73E8]', dot: 'bg-[#1A73E8]' },
  phase2: { border: 'border-l-[#188038]', bg: 'bg-[#E6F4EA]', text: 'text-[#188038]', dot: 'bg-[#188038]' },
  phase3: { border: 'border-l-[#B45309]', bg: 'bg-[#FEF3C7]', text: 'text-[#B45309]', dot: 'bg-[#B45309]' },
};

const ragConfig: Record<RagStatus, { label: string; bg: string; text: string; border: string; dot: string }> = {
  green:  { label: 'On Track',    bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200',  dot: 'bg-green-500' },
  amber:  { label: 'At Risk',     bg: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-200',  dot: 'bg-amber-500' },
  red:    { label: 'Off Track',   bg: 'bg-red-50',    text: 'text-red-700',    border: 'border-red-200',    dot: 'bg-red-500' },
  grey:   { label: 'Not Started', bg: 'bg-slate-50',  text: 'text-slate-500',  border: 'border-slate-200',  dot: 'bg-slate-300' },
};

const severityConfig = {
  high:   { label: 'High',   bg: 'bg-red-50',    text: 'text-red-700',   border: 'border-red-200' },
  medium: { label: 'Medium', bg: 'bg-amber-50',  text: 'text-amber-700', border: 'border-amber-200' },
  low:    { label: 'Low',    bg: 'bg-slate-50',  text: 'text-slate-500', border: 'border-slate-200' },
};

// ─── Concern definitions — critical gates that drive conversion probability ───
const concernItems: ConcernItem[] = [
  {
    phase: 'Pre-Sales',
    artifact: 'Pilot Success Criteria Agreement',
    description: 'No co-signed success criteria document means the pilot has no objective conversion trigger. The close decision stays subjective.',
    severity: 'high',
    owner: 'AE',
  },
  {
    phase: 'Pre-Sales',
    artifact: 'Business Value Baseline Document',
    description: 'Without a measured baseline, the ROI story at Week 4 will be anecdotal. Economic buyers require a before/after comparison.',
    severity: 'high',
    owner: 'SA',
  },
  {
    phase: 'Pre-Sales',
    artifact: 'Executive Sponsor Identified',
    description: 'Pilots without an identified economic buyer rarely convert. Champion enthusiasm alone does not close deals.',
    severity: 'high',
    owner: 'AE',
  },
  {
    phase: 'Pre-Sales',
    artifact: 'No-Code Agent Library',
    description: 'Presenting tangible, department-specific use cases with ROI estimates before kickoff significantly increases stakeholder buy-in.',
    severity: 'medium',
    owner: 'SA',
  },
  {
    phase: 'Delivery',
    artifact: 'Golden Dataset & UAT Test Plan',
    description: 'If UAT is not guided by a curated dataset covering all pre-agreed connectors, test results will be inconsistent and hard to defend.',
    severity: 'high',
    owner: 'SA',
  },
  {
    phase: 'Delivery',
    artifact: 'Success Metrics Tracker',
    description: 'KPI tracking must be shared with the customer champion weekly. Surprises at the Week 4 readout kill conversions.',
    severity: 'high',
    owner: 'FDE',
  },
  {
    phase: 'Delivery',
    artifact: 'Commercial Proposal',
    description: 'Commercial proposal must be developed in parallel with delivery — not after. A cold commercial conversation at Week 4 adds 2–4 weeks of delay.',
    severity: 'medium',
    owner: 'AE',
  },
  {
    phase: 'Delivery',
    artifact: 'Week 3 Executive Checkpoint',
    description: 'The economic buyer must be in the room at Week 3. If they first see the value story at the final presentation, conversion probability drops significantly.',
    severity: 'medium',
    owner: 'AE',
  },
  {
    phase: 'Conversion',
    artifact: 'Internal Conversion War Room',
    description: 'Teams that skip the internal alignment session before the final presentation are more likely to be caught off-guard by objections.',
    severity: 'medium',
    owner: 'AE',
  },
  {
    phase: 'Conversion',
    artifact: 'Champion Pre-Brief',
    description: 'Champion must be briefed 48 hours before the final presentation. An unprepared champion weakens the internal advocacy story.',
    severity: 'low',
    owner: 'FDE',
  },
];

// ─── Conversion probability model ─────────────────────────────────────────────
// Weighted scoring: each gate has a weight. Score = sum of completed gate weights / total weight.
const conversionGates = [
  { label: 'Success criteria co-signed',           weight: 20, phase: 'Pre-Sales' },
  { label: 'Economic buyer identified',             weight: 15, phase: 'Pre-Sales' },
  { label: 'Baseline document completed',           weight: 10, phase: 'Pre-Sales' },
  { label: 'No-Code Agent Library presented',       weight: 5,  phase: 'Pre-Sales' },
  { label: 'All connectors indexed before UAT',     weight: 10, phase: 'Delivery' },
  { label: 'Golden Dataset evaluation complete',    weight: 10, phase: 'Delivery' },
  { label: 'KPI tracker shared with champion',      weight: 10, phase: 'Delivery' },
  { label: 'Commercial proposal drafted',           weight: 5,  phase: 'Delivery' },
  { label: 'Week 3 exec checkpoint held',           weight: 5,  phase: 'Delivery' },
  { label: '≥2 of 3 primary KPIs met',              weight: 5,  phase: 'Delivery' },
  { label: 'Value Realization Report complete',     weight: 5,  phase: 'Conversion' },
  { label: 'Internal war room completed',           weight: 3,  phase: 'Conversion' },
  { label: 'Champion pre-briefed',                  weight: 2,  phase: 'Conversion' },
  { label: 'Urgency lever identified',              weight: 2,  phase: 'Conversion' },
];

// ─── Phase summary builder ────────────────────────────────────────────────────
function buildPhaseStatuses(checkedGates: Record<number, boolean>): PhaseStatus[] {
  return phases.map(phase => {
    const totalItems = phase.sections.reduce((sum, s) => sum + s.artifacts.length, 0);
    const phaseGates = conversionGates.filter(g => g.phase === phase.label);
    const completedGates = phaseGates.filter((_, i) => {
      const globalIdx = conversionGates.findIndex(g => g.label === phaseGates[i].label);
      return checkedGates[globalIdx];
    }).length;
    const completionPct = phaseGates.length > 0 ? completedGates / phaseGates.length : 0;

    let status: RagStatus = 'grey';
    if (completionPct === 0) status = 'grey';
    else if (completionPct >= 0.8) status = 'green';
    else if (completionPct >= 0.4) status = 'amber';
    else status = 'red';

    const keyArtifacts = phase.sections
      .flatMap(s => s.artifacts)
      .slice(0, 4)
      .map(a => ({ name: a.title, critical: a.isNew === true || a.badge === 'document' || a.badge === 'checklist' }));

    const c = phaseColorMap[phase.color];
    return {
      phaseLabel: phase.label,
      phaseColor: phase.color,
      borderColor: c.border,
      totalItems,
      completedItems: Math.round(completionPct * totalItems),
      status,
      keyArtifacts,
    };
  });
}

// ─── Conversion probability calculator ───────────────────────────────────────
function calcConversionProbability(checkedGates: Record<number, boolean>): number {
  const totalWeight = conversionGates.reduce((sum, g) => sum + g.weight, 0);
  const earnedWeight = conversionGates.reduce((sum, g, i) => sum + (checkedGates[i] ? g.weight : 0), 0);
  // Base probability: 15% (even with nothing done, there's some chance)
  // Max probability: 90% (no process guarantees 100%)
  return Math.round(15 + (earnedWeight / totalWeight) * 75);
}

function getProbabilityLabel(prob: number): { label: string; color: string; bg: string } {
  if (prob >= 75) return { label: 'High',   color: 'text-green-700',  bg: 'bg-green-50' };
  if (prob >= 50) return { label: 'Medium', color: 'text-amber-700',  bg: 'bg-amber-50' };
  return             { label: 'Low',    color: 'text-red-700',    bg: 'bg-red-50' };
}

// ─── Executive View Component ─────────────────────────────────────────────────
export default function ExecutiveView() {
  const [checkedGates, setCheckedGates] = useState<Record<number, boolean>>({});
  const [customerName, setCustomerName] = useState('');
  const [currentWeek, setCurrentWeek] = useState<number>(1);

  const toggleGate = useCallback((idx: number) => {
    setCheckedGates(prev => ({ ...prev, [idx]: !prev[idx] }));
  }, []);

  const phaseStatuses = buildPhaseStatuses(checkedGates);
  const conversionProb = calcConversionProbability(checkedGates);
  const probMeta = getProbabilityLabel(conversionProb);
  const completedCount = Object.values(checkedGates).filter(Boolean).length;
  const totalGates = conversionGates.length;

  const highConcerns = concernItems.filter(c => c.severity === 'high');
  const medConcerns  = concernItems.filter(c => c.severity === 'medium');

  return (
    <div className="min-h-screen bg-white">
      {/* ── Top nav bar ── */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-8 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-semibold text-slate-800">Gemini Enterprise</span>
            <span className="text-slate-300">/</span>
            <span className="text-[13px] text-slate-500">Pilot Program — Bill of Materials</span>
            <span className="text-slate-300">/</span>
            <span className="text-[13px] text-slate-800 font-medium">Executive View</span>
          </div>
          <Link href="/" className="text-[12px] text-[#1A73E8] hover:underline">← Back to Full BOM</Link>
        </div>
      </header>

      {/* ── Page Header ── */}
      <div className="border-b border-slate-200 px-8 py-5">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-[17px] font-semibold text-slate-800">Executive Summary View</h1>
              <p className="text-[13px] text-slate-500 mt-0.5">
                Conversion readiness snapshot across all pilot phases. For leadership and account executives.
              </p>
            </div>
            {/* Customer + Week fields */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono-label text-slate-400 uppercase tracking-widest">Customer</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder="e.g. Sysdig"
                  className="text-[12px] border border-slate-200 px-2 py-1 w-36 text-slate-700 focus:outline-none focus:border-slate-400"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono-label text-slate-400 uppercase tracking-widest">Week</label>
                <select
                  value={currentWeek}
                  onChange={e => setCurrentWeek(Number(e.target.value))}
                  className="text-[12px] border border-slate-200 px-2 py-1 w-24 text-slate-700 focus:outline-none focus:border-slate-400"
                >
                  {[1, 2, 3, 4].map(w => (
                    <option key={w} value={w}>Week {w}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {customerName && (
            <div className="mt-2 text-[12px] text-slate-500 font-mono-label">
              {customerName} · Week {currentWeek} of 4 · {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-6 space-y-8">

        {/* ── Conversion Probability Score ── */}
        <div className="border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[11px] font-mono-label text-slate-400 uppercase tracking-widest mb-1">Conversion Success Probability</div>
              <p className="text-[12px] text-slate-500">Based on {completedCount} of {totalGates} critical conversion gates completed.</p>
            </div>
            <div className={`text-right px-4 py-2 ${probMeta.bg}`}>
              <div className={`text-[28px] font-bold ${probMeta.color} leading-none`}>{conversionProb}%</div>
              <div className={`text-[11px] font-mono-label ${probMeta.color} mt-0.5`}>{probMeta.label} Probability</div>
            </div>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-slate-100 h-1.5 mb-4">
            <div
              className={`h-1.5 transition-all duration-300 ${conversionProb >= 75 ? 'bg-green-500' : conversionProb >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
              style={{ width: `${conversionProb}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">
            Score is calculated from weighted conversion gates. Each gate reflects a critical action that research and field experience show directly impacts pilot-to-production conversion rates.
          </p>
        </div>

        {/* ── Phase Status Cards ── */}
        <div>
          <div className="text-[11px] font-mono-label text-slate-400 uppercase tracking-widest mb-3">Phase Status</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {phaseStatuses.map(ps => {
              const rag = ragConfig[ps.status];
              const c = phaseColorMap[ps.phaseColor];
              return (
                <div key={ps.phaseLabel} className={`border-l-2 ${ps.borderColor} border border-slate-200 p-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[12px] font-semibold ${c.text}`}>{ps.phaseLabel}</span>
                    <span className={`text-[10px] font-mono-label px-2 py-0.5 border ${rag.bg} ${rag.text} ${rag.border}`}>
                      {rag.label}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mb-3">{ps.totalItems} artifacts</div>
                  {/* Mini artifact list */}
                  <div className="space-y-1">
                    {ps.keyArtifacts.map(a => (
                      <div key={a.name} className="flex items-center gap-1.5">
                        <div className={`w-1 h-1 flex-shrink-0 ${a.critical ? c.dot : 'bg-slate-300'}`} />
                        <span className="text-[11px] text-slate-500 truncate">{a.name}</span>
                        {a.critical && <span className="text-[9px] text-slate-400 font-mono-label flex-shrink-0">critical</span>}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Conversion Gate Checklist ── */}
        <div>
          <div className="text-[11px] font-mono-label text-slate-400 uppercase tracking-widest mb-3">
            Conversion Gate Checklist — {completedCount}/{totalGates} complete
          </div>
          <div className="border border-slate-200 divide-y divide-slate-100">
            {['Pre-Sales', 'Delivery', 'Conversion'].map(phaseName => {
              const gatesForPhase = conversionGates.map((g, i) => ({ ...g, idx: i })).filter(g => g.phase === phaseName);
              const phaseObj = phases.find(p => p.label === phaseName);
              const c = phaseObj ? phaseColorMap[phaseObj.color] : phaseColorMap.phase1;
              return (
                <div key={phaseName}>
                  <div className={`px-4 py-2 text-[10px] font-mono-label uppercase tracking-widest ${c.text} ${c.bg}`}>
                    {phaseName}
                  </div>
                  {gatesForPhase.map(gate => (
                    <div
                      key={gate.idx}
                      onClick={() => toggleGate(gate.idx)}
                      className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      <div className={`w-3.5 h-3.5 flex-shrink-0 border transition-colors ${checkedGates[gate.idx] ? 'bg-slate-800 border-slate-800' : 'border-slate-300'} flex items-center justify-center`}>
                        {checkedGates[gate.idx] && (
                          <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 10 10">
                            <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span className={`text-[12px] flex-1 ${checkedGates[gate.idx] ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                        {gate.label}
                      </span>
                      <span className="text-[10px] font-mono-label text-slate-400 flex-shrink-0">
                        {gate.weight}pts
                      </span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Areas of Concern ── */}
        <div>
          <div className="text-[11px] font-mono-label text-slate-400 uppercase tracking-widest mb-3">Areas of Concern</div>

          {/* High severity */}
          {highConcerns.length > 0 && (
            <div className="mb-4">
              <div className="text-[10px] font-mono-label text-red-600 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-red-500" />
                High — Conversion Blockers
              </div>
              <div className="space-y-2">
                {highConcerns.map((c, i) => (
                  <div key={i} className="border-l-2 border-l-red-400 border border-red-100 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[12px] font-medium text-slate-700">{c.artifact}</div>
                        <div className="text-[11px] text-slate-400 font-mono-label mb-1">{c.phase} · Owner: {c.owner}</div>
                        <p className="text-[12px] text-slate-600">{c.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Medium severity */}
          {medConcerns.length > 0 && (
            <div>
              <div className="text-[10px] font-mono-label text-amber-600 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-amber-500" />
                Medium — Watch Items
              </div>
              <div className="space-y-2">
                {medConcerns.map((c, i) => (
                  <div key={i} className="border-l-2 border-l-amber-400 border border-amber-100 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[12px] font-medium text-slate-700">{c.artifact}</div>
                        <div className="text-[11px] text-slate-400 font-mono-label mb-1">{c.phase} · Owner: {c.owner}</div>
                        <p className="text-[12px] text-slate-600">{c.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Footer note ── */}
        <div className="border-t border-slate-200 pt-4">
          <p className="text-[11px] text-slate-400">
            This view is for internal use only. Conversion probability is a directional indicator based on process completion — not a guarantee. For the full practitioner checklist, use the main BOM view.
          </p>
        </div>

      </div>
    </div>
  );
}
