/*
 * GE Pilot BOM — Internal Operations Document
 * Design: Flat, text-forward, document-like
 * No gradients, no emoji, no colorful banners
 * Monochrome base with single left-border accent per phase
 */

import { useState, useCallback } from 'react';
import { Link } from 'wouter';
import { phases, stats, type Phase, type Artifact, type PhaseSection } from '@/data/bomData';

// ─── Phase config — single accent color per phase, everything else neutral ───
const phaseConfig = {
  phase1: { border: 'border-l-[#1A73E8]', dot: 'bg-[#1A73E8]', text: 'text-[#1A73E8]', activeBg: 'bg-[#1A73E8]', tag: 'bg-[#E8F0FE] text-[#1A73E8]' },
  phase2: { border: 'border-l-[#188038]', dot: 'bg-[#188038]', text: 'text-[#188038]', activeBg: 'bg-[#188038]', tag: 'bg-[#E6F4EA] text-[#188038]' },
  phase3: { border: 'border-l-[#B45309]', dot: 'bg-[#B45309]', text: 'text-[#B45309]', activeBg: 'bg-[#B45309]', tag: 'bg-[#FEF3C7] text-[#B45309]' },
};

// ─── Badge — minimal, text-only labels ───────────────────────────────────────
const badgeLabel: Record<string, string> = {
  process: 'Process',
  checklist: 'Checklist',
  template: 'Template',
  document: 'Document',
  deck: 'Deck',
  playbook: 'Playbook',
};

// ─── Owner tag colors — muted, not loud ──────────────────────────────────────
const ownerColor: Record<string, string> = {
  AE: 'bg-slate-100 text-slate-600',
  FDE: 'bg-slate-100 text-slate-600',
  SA: 'bg-slate-100 text-slate-600',
  CSM: 'bg-slate-100 text-slate-600',
  Presales: 'bg-slate-100 text-slate-600',
  Exec: 'bg-slate-100 text-slate-600',
};

const calloutBorder: Record<string, string> = {
  blue: 'border-l-[#1A73E8] bg-[#F8FBFF]',
  amber: 'border-l-amber-500 bg-amber-50',
  green: 'border-l-[#188038] bg-[#F6FBF7]',
  red: 'border-l-red-500 bg-red-50',
  purple: 'border-l-violet-500 bg-violet-50',
};

const tierBorder = ['border-l-[#1A73E8]', 'border-l-[#188038]', 'border-l-amber-500'];
const tierLabel = ['text-[#1A73E8]', 'text-[#188038]', 'text-amber-700'];

// ─── Artifact Card ────────────────────────────────────────────────────────────
function ArtifactCard({ artifact, cfg }: { artifact: Artifact; cfg: typeof phaseConfig.phase1 }) {
  const [expanded, setExpanded] = useState(false);
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const toggleCheck = useCallback((idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setChecked(prev => ({ ...prev, [idx]: !prev[idx] }));
  }, []);

  const { content } = artifact;

  return (
    <div
      className={`bg-white border border-slate-200 border-l-4 ${artifact.isNew ? 'border-l-red-500' : cfg.border} cursor-pointer hover:border-slate-300 transition-colors duration-150`}
      onClick={() => setExpanded(e => !e)}
    >
      <div className="px-4 py-3.5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono-label text-slate-400 uppercase tracking-wide">
                {badgeLabel[artifact.badge]}
              </span>
              {artifact.isNew && (
                <span className="text-[10px] font-mono-label font-semibold px-1.5 py-0.5 bg-red-50 text-red-600 border border-red-200">
                  NEW
                </span>
              )}
            </div>
            <h3 className="text-[14px] font-semibold text-slate-800 leading-snug">{artifact.title}</h3>
            <p className="text-[13px] text-slate-500 mt-1 leading-relaxed">{artifact.description}</p>
          </div>
          <button
            className="flex-shrink-0 text-[12px] text-slate-400 hover:text-slate-600 transition-colors mt-0.5 whitespace-nowrap"
            onClick={e => { e.stopPropagation(); setExpanded(v => !v); }}
          >
            {expanded ? '− hide' : '+ show'}
          </button>
        </div>

        {/* Expanded content */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-slate-100" onClick={e => e.stopPropagation()}>
            {content.sectionLabel && (
              <div className="text-[11px] font-mono-label text-slate-400 uppercase tracking-wide mb-3">{content.sectionLabel}</div>
            )}

            {/* Checklist */}
            {content.checkItems && (
              <ul className="space-y-2 mb-4">
                {content.checkItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <button
                      onClick={e => toggleCheck(idx, e)}
                      className={`mt-0.5 flex-shrink-0 w-4 h-4 border transition-colors duration-100 flex items-center justify-center ${
                        checked[idx] ? 'bg-slate-700 border-slate-700' : 'border-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {checked[idx] && (
                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                          <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                    <span className={`flex-1 text-[13px] leading-relaxed ${checked[idx] ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                      {item.bold && <strong className="font-semibold text-slate-800">{item.bold} </strong>}
                      {item.text}
                    </span>
                    {item.owner && (
                      <span className={`flex-shrink-0 text-[11px] font-mono-label px-1.5 py-0.5 ${ownerColor[item.owner]}`}>
                        {item.owner}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {/* Metric rows */}
            {content.metricRows && (
              <div className="mb-4">
                {content.metricRows.map((row, idx) => (
                  <div key={idx} className={`flex items-center justify-between py-2 px-3 text-[13px] ${idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'} border-b border-slate-100`}>
                    <span className="text-slate-700">{row.name}</span>
                    <span className="font-mono-label text-[12px] text-slate-600 font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Timeline */}
            {content.timelineItems && (
              <div className="space-y-3 mb-4">
                {content.timelineItems.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex-shrink-0 text-[11px] font-mono-label text-slate-400 w-14 pt-0.5">{item.time}</div>
                    <div className="flex-1 border-l border-slate-200 pl-3">
                      <div className="text-[13px] text-slate-700 leading-relaxed">{item.content}</div>
                      {item.tag && <div className="text-[11px] text-slate-400 mt-0.5">{item.tag}</div>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tier blocks */}
            {content.tierBlocks && (
              <div className="space-y-3 mb-4">
                {content.tierBlocks.map((tier, tIdx) => (
                  <div key={tIdx} className={`border-l-4 pl-3 py-2 ${tierBorder[tIdx]}`}>
                    <div className={`text-[11px] font-mono-label uppercase tracking-wide mb-2 font-semibold ${tierLabel[tIdx]}`}>{tier.label}</div>
                    <ul className="space-y-1.5">
                      {tier.items.map((item, iIdx) => {
                        const checkKey = tIdx * 100 + iIdx + 1000;
                        return (
                          <li key={iIdx} className="flex items-start gap-2 text-[13px]">
                            <button
                              onClick={e => toggleCheck(checkKey, e)}
                              className={`mt-0.5 flex-shrink-0 w-4 h-4 border transition-colors duration-100 flex items-center justify-center ${
                                checked[checkKey] ? 'bg-slate-700 border-slate-700' : 'border-slate-300 hover:border-slate-500'
                              }`}
                            >
                              {checked[checkKey] && (
                                <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                                  <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                            </button>
                            <span className={`flex-1 ${checked[checkKey] ? 'line-through text-slate-400' : 'text-slate-700'}`}>{item.text}</span>
                            {item.owner && (
                              <span className={`flex-shrink-0 text-[11px] font-mono-label px-1.5 py-0.5 ${ownerColor[item.owner]}`}>
                                {item.owner}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Rubric table */}
            {content.rubricRows && (
              <div className="mb-4 border border-slate-200">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="text-left px-3 py-2 font-semibold text-slate-600 font-normal">Dimension</th>
                      <th className="text-center px-3 py-2 font-semibold text-slate-600 font-normal">Gemini</th>
                      <th className="text-center px-3 py-2 font-semibold text-slate-600 font-normal">Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.rubricRows.map((row, idx) => (
                      <tr key={idx} className={`border-b border-slate-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                        <td className="px-3 py-2 text-slate-700">{row.dimension}</td>
                        <td className="px-3 py-2 text-center">
                          <span className={row.geminiClass === 'win' ? 'text-[#188038] font-medium' : 'text-slate-500'}>
                            {row.gemini}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-center text-slate-400">{row.weight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Callouts */}
            {content.callout && (
              <div className={`border-l-4 px-3 py-2.5 text-[12px] leading-relaxed mb-2 ${calloutBorder[content.callout.type]}`}>
                <strong className="text-slate-700">{content.callout.label}: </strong>
                <span className="text-slate-600">{content.callout.text}</span>
              </div>
            )}
            {content.extraCallout && (
              <div className={`border-l-4 px-3 py-2.5 text-[12px] leading-relaxed ${calloutBorder[content.extraCallout.type]}`}>
                <strong className="text-slate-700">{content.extraCallout.label}: </strong>
                <span className="text-slate-600">{content.extraCallout.text}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Phase Section ────────────────────────────────────────────────────────────
function PhaseSectionBlock({ section, cfg }: { section: PhaseSection; cfg: typeof phaseConfig.phase1 }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2.5 mb-3">
        <div className={`h-2 w-2 ${cfg.dot}`} />
        <span className="text-[11px] font-mono-label text-slate-500 uppercase tracking-widest">
          {section.title}
        </span>
        {section.isNew && (
          <span className="text-[10px] font-mono-label font-semibold px-1.5 py-0.5 bg-red-50 text-red-600 border border-red-200">
            NEW
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {section.artifacts.map(artifact => (
          <ArtifactCard key={artifact.id} artifact={artifact} cfg={cfg} />
        ))}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [activePhaseIdx, setActivePhaseIdx] = useState(0);
  const activePhase: Phase = phases[activePhaseIdx];
  const cfg = phaseConfig[activePhase.color];
  const phaseCounts = phases.map(p => p.sections.reduce((sum, s) => sum + s.artifacts.length, 0));

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ── Header ── */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-semibold text-slate-800">Gemini Enterprise</span>
            <span className="text-slate-300">/</span>
            <span className="text-[13px] text-slate-500">Pilot Program — Bill of Materials</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[12px] text-slate-400">
            <span><strong className="text-slate-600">{stats.totalArtifacts}</strong> artifacts</span>
            <span><strong className="text-slate-600">{stats.pilotDuration}</strong> duration</span>
            <span>Conversion gate: <strong className="text-slate-600">{stats.conversionGate}</strong></span>
            <span className="text-slate-300">|</span>
            <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span className="text-slate-300">|</span>
            <Link href="/executive" className="text-[12px] text-[#1A73E8] hover:underline font-medium">Executive View</Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-[1400px] mx-auto w-full">
        {/* ── Sidebar ── */}
        <aside className="w-52 flex-shrink-0 bg-[#F7F7F7] border-r border-slate-200 sticky top-12 h-[calc(100vh-48px)] overflow-y-auto py-5 px-3">
          <div className="text-[10px] font-mono-label text-slate-400 uppercase tracking-widest px-2 mb-2">Phases</div>
          <nav className="space-y-0.5 mb-6">
            {phases.map((phase, idx) => {
              const c = phaseConfig[phase.color];
              const isActive = idx === activePhaseIdx;
              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePhaseIdx(idx)}
                  className={`w-full text-left px-3 py-2.5 transition-colors duration-100 border-l-2 ${
                    isActive
                      ? `bg-white border-l-2 ${c.border} text-slate-800`
                      : 'border-transparent text-slate-500 hover:bg-white hover:text-slate-700'
                  }`}
                >
                  <div className="text-[13px] font-medium leading-none mb-0.5">{phase.label}</div>
                  <div className="text-[11px] font-mono-label text-slate-400">{phaseCounts[idx]} artifacts</div>
                </button>
              );
            })}
          </nav>

          <div className="px-2 mb-5">
            <div className="text-[10px] font-mono-label text-slate-400 uppercase tracking-widest mb-2">Owner</div>
            <div className="space-y-1">
              {['AE', 'FDE', 'SA', 'CSM', 'Presales', 'Exec'].map(owner => (
                <div key={owner} className="flex items-center gap-2">
                  <span className="text-[11px] font-mono-label text-slate-500">{owner}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-2">
            <div className="text-[10px] font-mono-label text-slate-400 uppercase tracking-widest mb-2">Types</div>
            <div className="space-y-1">
              {Object.keys(badgeLabel).map(badge => (
                <div key={badge} className="text-[11px] font-mono-label text-slate-500 capitalize">{badge}</div>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 min-w-0 px-8 py-6">
          {/* Phase header — flat, text-only */}
          <div className="mb-6 pb-4 border-b border-slate-200">
            <div className="flex items-baseline justify-between">
              <div>
                <h1 className="text-[18px] font-semibold text-slate-800">{activePhase.title}</h1>
                <p className="text-[13px] text-slate-500 mt-1 max-w-2xl">{activePhase.description}</p>
                {activePhase.audienceNote && (
                  <p className="text-[12px] text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 mt-2 max-w-2xl">
                    <span className="font-semibold">Audience: </span>{activePhase.audienceNote}
                  </p>
                )}
              </div>
              <div className="flex gap-1 ml-6">
                {phases.map((phase, idx) => (
                  <button
                    key={phase.id}
                    onClick={() => setActivePhaseIdx(idx)}
                    className={`px-3 py-1.5 text-[12px] border transition-colors duration-100 ${
                      idx === activePhaseIdx
                        ? 'bg-slate-800 text-white border-slate-800'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-700'
                    }`}
                  >
                    {phase.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sections */}
          {activePhase.sections.map(section => (
            <PhaseSectionBlock key={section.id} section={section} cfg={cfg} />
          ))}
        </main>
      </div>
    </div>
  );
}
