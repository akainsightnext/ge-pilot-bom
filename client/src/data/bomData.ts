// =============================================================
// GE Pilot BOM — Complete Artifact Data
// Design: Google Workspace Command Dashboard
// 3 phases, 40 artifacts, 4-week pilot structure
// =============================================================

export type BadgeType = 'process' | 'checklist' | 'template' | 'document' | 'deck' | 'playbook';
export type OwnerTag = 'AE' | 'FDE' | 'SA' | 'CSM' | 'Presales' | 'Exec';
export type CalloutType = 'blue' | 'amber' | 'green' | 'red' | 'purple';

export interface CheckItem {
  text: string;
  owner?: OwnerTag;
  bold?: string; // bold prefix before text
}

export interface MetricRow {
  name: string;
  value: string;
}

export interface TimelineItem {
  time: string;
  content: string;
  tag?: string;
}

export interface TierBlock {
  label: string;
  tier: 1 | 2 | 3;
  items: CheckItem[];
}

export interface RubricRow {
  dimension: string;
  gemini: string;
  geminiClass: 'win' | 'neutral';
  weight: string;
}

export interface Callout {
  type: CalloutType;
  label: string;
  text: string;
}

export interface ArtifactContent {
  sectionLabel?: string;
  checkItems?: CheckItem[];
  metricRows?: MetricRow[];
  timelineItems?: TimelineItem[];
  tierBlocks?: TierBlock[];
  rubricRows?: RubricRow[];
  callout?: Callout;
  extraCallout?: Callout;
  slideItems?: string[];
}

export interface Artifact {
  id: string;
  badge: BadgeType;
  title: string;
  isNew?: boolean;
  description: string;
  content: ArtifactContent;
}

export interface PhaseSection {
  id: string;
  title: string;
  isNew?: boolean;
  artifacts: Artifact[];
}

export interface Phase {
  id: number;
  label: string;
  icon: string;
  title: string;
  description: string;
  audienceNote?: string;
  color: 'phase1' | 'phase2' | 'phase3';
  sections: PhaseSection[];
}

export const phases: Phase[] = [
  {
    id: 1,
    label: 'Pre-Sales',
    icon: '🎯',
    title: 'Phase 1 — Pre-Sales & Pilot Design',
    description: 'Everything needed before the pilot kicks off. Qualify deep, align on success, set the delivery team up to win.',
    color: 'phase1',
    sections: [
      {
        id: 'discovery',
        title: 'Discovery & Qualification',
        artifacts: [
          {
            id: 'discovery-interview',
            badge: 'process',
            title: 'Discovery Interview Framework',
            description: 'Structured 60-min interview guide to surface business pain, map stakeholders, and identify pilot use cases with ROI potential.',
            content: {
              sectionLabel: 'Key Questions',
              checkItems: [
                { text: 'What is the single biggest productivity drain for your team today?', owner: 'AE' },
                { text: 'What tools are you currently using for knowledge search and AI assistance?', owner: 'Presales' },
                { text: 'Are you evaluating or currently using any competing AI productivity or enterprise search tools?', owner: 'Presales' },
                { text: 'Who owns the budget decision and what does their approval process look like?', owner: 'AE' },
                { text: 'What does success look like to you in 4 weeks?', owner: 'AE' },
                { text: 'What data sources do your teams rely on most? (Drive, Salesforce, Jira, Slack, etc.)', owner: 'Presales' },
              ],
            },
          },
          {
            id: 'qualification-scorecard',
            badge: 'checklist',
            title: 'Pilot Qualification Scorecard',
            description: 'Go / no-go scoring model. Must meet threshold before committing FDE resources and pilot agreement.',
            content: {
              sectionLabel: 'Qualification Gates',
              checkItems: [
                { text: 'Executive sponsor identified and engaged', owner: 'AE' },
                { text: 'Champion identified with clear career motivation', owner: 'FDE' },
                { text: 'Budget path confirmed (existing line item or new allocation)', owner: 'AE' },
                { text: 'IT / Security pre-cleared (no known blockers)', owner: 'SA' },
                { text: 'Competitive situation understood (any incumbent or competing tools in evaluation)', owner: 'Presales' },
                { text: 'At least 2 high-impact use cases identified', owner: 'Presales' },
                { text: 'Pilot cohort size and timeline agreed', owner: 'SA' },
              ],
            },
          },
        ],
      },
      {
        id: 'value-engineering',
        title: 'Value Engineering',
        artifacts: [
          {
            id: 'value-baseline',
            badge: 'template',
            title: 'Business Value Baseline Document',
            description: "Quantifies the client's current-state cost structure to establish the ROI denominator before pilot begins.",
            content: {
              sectionLabel: 'Baseline Metrics to Capture',
              checkItems: [
                { text: 'Average time spent per week on information search (by role)', owner: 'Presales' },
                { text: 'Average time to draft key document types (proposals, reports, emails)', owner: 'Presales' },
                { text: 'Meeting follow-up and action item tracking time per week', owner: 'FDE' },
                { text: 'Loaded hourly rate for pilot cohort (for ROI calculation)', owner: 'AE' },
                { text: 'Current tool spend on any competing AI or productivity tools being displaced', owner: 'AE' },
              ],
              callout: {
                type: 'blue',
                label: 'Note',
                text: "Never accept a customer's stated baseline at face value. Run a structured 30-min session to measure it together — the act of measuring creates shared ownership of the ROI story.",
              },
            },
          },
          {
            id: 'success-criteria',
            badge: 'document',
            title: 'Pilot Success Criteria Agreement',
            description: 'Co-signed document defining what "success" means. Pre-commits the client to evaluation criteria the vendor is confident hitting.',
            content: {
              sectionLabel: 'Required Elements',
              checkItems: [
                { text: '3 primary KPIs with baseline, target, and measurement method', owner: 'AE' },
                { text: '2 secondary KPIs (qualitative: NPS, champion satisfaction)', owner: 'CSM' },
                { text: 'Pilot scope: departments, use cases, user count', owner: 'SA' },
                { text: 'Pilot timeline with 4-week milestone dates', owner: 'SA' },
                { text: 'Client obligations (data access, IT admin, user participation)', owner: 'FDE' },
                { text: 'Google obligations (FDE availability, support SLAs)', owner: 'AE' },
                { text: 'Out-of-bounds clause: queries about data not connected to the platform are excluded from accuracy evaluation', owner: 'Presales' },
                { text: 'Sign-off: champion + economic buyer + IT lead', owner: 'Exec' },
              ],
            },
          },
          {
            id: 'control-influence',
            badge: 'process',
            title: 'Control vs. Influence Criteria Framework',
            isNew: true,
            description: 'Ensures success criteria are realistic and achievable. Prevents the pilot from failing on metrics the delivery team cannot control.',
            content: {
              sectionLabel: 'Three-Tier Criteria Structure',
              tierBlocks: [
                {
                  label: 'Tier 1 · Technical & Security (Full Control)',
                  tier: 1,
                  items: [
                    { text: 'All defined datastores indexed with zero permission violations', owner: 'SA' },
                    { text: 'SSO, DLP, and admin controls verified end-to-end', owner: 'SA' },
                    { text: 'Custom connectors deployed and returning results within agreed latency', owner: 'Presales' },
                  ],
                },
                {
                  label: 'Tier 2 · Golden Dataset Performance (High Control)',
                  tier: 2,
                  items: [
                    { text: '≥85% of curated multi-system queries return accurate, grounded results', owner: 'Presales' },
                    { text: 'Cross-system queries outperform any competing tool in side-by-side test', owner: 'Presales' },
                  ],
                },
                {
                  label: 'Tier 3 · User Sentiment (Influence Only)',
                  tier: 3,
                  items: [
                    { text: 'Majority of active testers report improvement over current workflow', owner: 'FDE' },
                    { text: 'At least 2 power users identified who would advocate internally', owner: 'FDE' },
                  ],
                },
              ],
              callout: {
                type: 'red',
                label: 'Rule',
                text: 'Never commit to an absolute accuracy number without a baseline. If the customer says "95% accuracy," ask: "What is your accuracy today?" Pivot to relative improvement: "Better than your current process in a side-by-side test."',
              },
              extraCallout: {
                type: 'amber',
                label: 'KPI Guidance',
                text: 'KPIs must be specific enough to be measurable but not so specific that they set up for failure. Avoid committing to productivity gains (e.g., "98% productivity improvement") during pre-sales before a baseline exists. Instead, anchor to time saved, average hourly rate, and estimated annual usage frequency — these can be calculated into an annualized ROI per department once the pilot begins.',
              },
            },
          },
          {
            id: 'use-case-matrix',
            badge: 'template',
            title: 'Use Case Prioritization Matrix',
            description: 'Ranks candidate pilot use cases by business impact × implementation feasibility to select the highest-probability starting point.',
            content: {
              sectionLabel: 'Scoring Dimensions',
              checkItems: [
                { text: 'Business impact score (1–5): time saved, revenue influenced, risk reduced', owner: 'AE' },
                { text: 'Implementation feasibility score (1–5): data available, connectors ready, user adoption likelihood', owner: 'SA' },
                { text: 'Champion enthusiasm score (1–5): does the champion personally care about this use case?', owner: 'FDE' },
                { text: 'Competitive differentiation score (1–5): does Gemini uniquely excel here?', owner: 'Presales' },
                { text: 'Select top 2 use cases for pilot scope. Document rationale for exclusions.', owner: 'Presales' },
              ],
            },
          },
          {
            id: 'stakeholder-mapping',
            badge: 'process',
            title: 'Stakeholder Mapping & Engagement Plan',
            description: 'Identifies every person who touches the buy decision and prescribes a tailored engagement strategy per archetype.',
            content: {
              sectionLabel: 'Stakeholder Archetypes',
              checkItems: [
                { text: 'Economic Buyer: focus on ROI, risk, and strategic alignment. AE owns.', owner: 'AE' },
                { text: 'Champion: focus on career narrative and personal productivity wins. FDE owns.', owner: 'FDE' },
                { text: 'IT / Security: focus on compliance, DLP, and admin controls. SA owns.', owner: 'SA' },
                { text: 'End Users: focus on ease of use and immediate time savings. FDE owns.', owner: 'FDE' },
                { text: 'Procurement / Legal: focus on contract terms and vendor risk. AE + CSM own.', owner: 'AE' },
                { text: 'Detractor / Skeptic: identify early, engage directly, do not ignore.', owner: 'FDE' },
              ],
            },
          },
          {
            id: 'competitive-rubric',
            badge: 'template',
            title: 'Competitive Evaluation Rubric',
            isNew: true,
            description: 'Structured scorecard for competitive bake-offs against any incumbent AI productivity or enterprise search tool. Engineered to highlight Gemini\'s native advantages. Must be agreed with the customer before UAT begins.',
            content: {
              sectionLabel: 'Evaluation Dimensions',
              rubricRows: [
                { dimension: 'Native Google Workspace integration (no new app)', gemini: 'Strong', geminiClass: 'win', weight: 'High' },
                { dimension: 'Multi-system connector depth (Salesforce, Jira, DevRev, etc.)', gemini: 'Strong', geminiClass: 'win', weight: 'High' },
                { dimension: 'Cross-system query capability (single prompt, multiple sources)', gemini: 'Strong', geminiClass: 'win', weight: 'High' },
                { dimension: 'Custom AI agent / Gem creation', gemini: 'Strong', geminiClass: 'win', weight: 'High' },
                { dimension: 'Data residency & Google DLP compliance', gemini: 'Strong', geminiClass: 'win', weight: 'High' },
                { dimension: 'Ease of user adoption (no new app to install)', gemini: 'Strong', geminiClass: 'win', weight: 'Medium' },
                { dimension: 'Total cost of ownership vs. standalone tools', gemini: 'Favorable', geminiClass: 'win', weight: 'Medium' },
                { dimension: 'Standalone search UI (outside Workspace)', gemini: 'Neutral', geminiClass: 'neutral', weight: 'Low' },
              ],
              callout: {
                type: 'red',
                label: 'Critical',
                text: 'Present this rubric to the customer before UAT begins — not after. Getting agreement on evaluation dimensions upfront means the final scorecard reflects criteria where Gemini is strong. Do not let the customer or a competing vendor define the rubric unilaterally.',
              },
            },
          },
        ],
      },
      {
        id: 'no-code-library',
        title: 'No-Code Agent Library',
        isNew: true,
        artifacts: [
          {
            id: 'no-code-agent-library',
            badge: 'template',
            title: 'No-Code Agent Library',
            isNew: true,
            description: 'A curated library of ready-to-deploy Gemini agent use cases organized by department cohort. Bridges the gap between training and practical implementation — makes AI use cases tangible and drives conversion by showing immediate ROI.',
            content: {
              sectionLabel: 'Library Structure',
              checkItems: [
                { text: 'Organize use cases by department cohort: Marketing, IT, HR, Sales, Finance, Legal, Operations', owner: 'SA' },
                { text: 'Include 10 use cases per cohort minimum — each with a one-sentence description and the Gemini feature it uses', owner: 'SA' },
                { text: 'For each use case: estimate time saved per task (minutes), average hourly rate for that role, and estimated annual usage frequency', owner: 'Presales' },
                { text: 'Calculate annualized ROI per use case: (time saved × hourly rate × annual frequency ÷ 60)', owner: 'Presales' },
                { text: 'Roll up to a department-level ROI total and an org-wide projection at full deployment', owner: 'AE' },
                { text: 'Present the library during the discovery session — not after kickoff. Let the customer self-select the use cases most relevant to their pain points.', owner: 'AE' },
                { text: 'Update the library after each pilot with new use cases discovered during delivery', owner: 'FDE' },
              ],
              metricRows: [
                { name: 'Use cases per cohort', value: '10 minimum' },
                { name: 'ROI formula', value: 'Time saved (min) × Hourly rate × Annual frequency ÷ 60' },
                { name: 'Cohorts covered', value: 'Marketing, IT, HR, Sales, Finance, Legal, Operations' },
                { name: 'Presentation timing', value: 'Discovery session — before pilot design' },
              ],
              callout: {
                type: 'green',
                label: 'Why this works',
                text: 'Showing a customer a concrete list of 10 use cases for their specific department — each with an estimated ROI — generates more excitement and accelerates conversion than any abstract capability demo. It answers the question every economic buyer has: "What will my team actually do with this?"',
              },
            },
          },
        ],
      },
      {
        id: 'delivery-readiness',
        title: 'Delivery Readiness',
        artifacts: [
          {
            id: 'technical-readiness',
            badge: 'checklist',
            title: 'Technical Pre-Pilot Readiness Checklist',
            description: 'All technical gates that must be cleared before kickoff. No pilot launch until green across the board.',
            content: {
              sectionLabel: 'Technical Gates',
              checkItems: [
                { text: 'Google Workspace licenses provisioned for pilot cohort', owner: 'SA' },
                { text: 'Gemini Enterprise add-on enabled in Admin Console', owner: 'SA' },
                { text: 'Data sources identified and access credentials secured', owner: 'SA' },
                { text: 'Connector build plan approved and timeline confirmed', owner: 'Presales' },
                { text: 'DLP policies reviewed and approved by IT Security', owner: 'SA' },
                { text: 'Admin Console audit log access confirmed', owner: 'SA' },
                { text: 'Pilot cohort user list finalized and onboarded', owner: 'FDE' },
                { text: 'Golden Dataset queries drafted and ready for UAT', owner: 'Presales' },
              ],
            },
          },
          {
            id: 'kickoff-deck',
            badge: 'deck',
            title: 'Pilot Kickoff Deck',
            description: 'Executive-facing presentation for the pilot kickoff meeting. Sets expectations, aligns on the journey, and builds psychological commitment.',
            content: {
              sectionLabel: 'Slide Structure',
              checkItems: [
                { text: 'The Gemini Enterprise value thesis (3 pillars)' },
                { text: 'Pilot scope, use cases, and user cohort' },
                { text: 'Success criteria recap (from signed document)' },
                { text: 'Evaluation rubric: how we will measure success together' },
                { text: '4-week timeline with milestones' },
                { text: 'Roles & responsibilities (client + Google)' },
                { text: 'How we\'ll measure and report progress' },
                { text: 'Q&A + immediate next actions with owners & dates' },
              ],
            },
          },
          {
            id: 'fde-plan',
            badge: 'template',
            title: 'FDE Engagement Plan',
            description: "FDE's personal roadmap for the 4-week pilot. Covers time allocation, champion development, and quick win targeting.",
            content: {
              sectionLabel: '4-Week FDE Cadence',
              timelineItems: [
                { time: 'Week 1', content: 'Embed with champion. Map real workflows. Identify quick win. Stand up 1st use case.', tag: 'Goal: First "aha moment" by end of Week 1' },
                { time: 'Week 2', content: 'Drive activation breadth. Daily office hours. Identify power users. Begin custom Gems if appropriate.', tag: 'Goal: 60% DAU of pilot cohort' },
                { time: 'Week 3', content: 'Deepen 2nd use case. Collect usage data. Begin compiling value stories. Flag at-risk users. Run Golden Dataset evaluation.', tag: 'Goal: 2 documented win stories + Golden Dataset complete' },
                { time: 'Week 4', content: 'Finalize Value Realization Report. Prep conversion readiness handback. Deliver executive readout.', tag: 'Goal: Conversion readiness confirmed' },
              ],
            },
          },
          {
            id: 'internal-handoff',
            badge: 'playbook',
            title: 'Internal Handoff Playbook (Sales → Delivery)',
            description: 'Structured knowledge transfer from AE/SA to FDE/CSM. Ensures nothing discovered in pre-sales is lost at handoff.',
            content: {
              sectionLabel: 'Handoff Checklist',
              checkItems: [
                { text: 'Account background: industry, size, competitive context', owner: 'AE' },
                { text: 'Stakeholder map walk-through (personalities, sensitivities)', owner: 'AE' },
                { text: 'Top 3 reasons they\'re doing this pilot', owner: 'AE' },
                { text: 'Known risks, objections, and political landmines', owner: 'AE' },
                { text: 'Competitive situation: is any competing AI tool actively in play?', owner: 'Presales' },
                { text: 'Technical environment deep-dive + connector build plan', owner: 'SA' },
                { text: 'Agreed success criteria & KPI baseline data', owner: 'SA' },
                { text: 'Golden Dataset scope: which queries will be used for UAT evaluation', owner: 'Presales' },
                { text: 'Competitive tools in evaluation documented and shared with delivery team', owner: 'Presales' },
                { text: "FDE briefed on champion's career goals & communication style", owner: 'FDE' },
                { text: 'RACI confirmed and next contact dates set', owner: 'CSM' },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Delivery',
    icon: '⚙️',
    title: 'Phase 2 — Delivery Engagement',
    description: 'The 4-week pilot execution. Structured weekly checkpoints, real-time course correction, and organic value story generation.',
    color: 'phase2',
    sections: [
      {
        id: 'activation',
        title: 'Activation & Quick Wins (Week 1)',
        artifacts: [
          {
            id: 'day1-playbook',
            badge: 'playbook',
            title: 'Day-1 Activation Playbook',
            description: "FDE's hour-by-hour guide for the first day on-site. Designed to produce visible, shareable output before the client leaves for the day.",
            content: {
              sectionLabel: 'Day 1 Agenda',
              timelineItems: [
                { time: '9–10am', content: 'Champion 1:1: map their #1 workflow pain point. Identify the first Gemini use case to demo.' },
                { time: '10–11am', content: 'Live demo with champion using their actual data. Capture the "aha moment" on screen.' },
                { time: '11am–12pm', content: 'Quick win: build first custom Gem or configure first connector for champion\'s use case.' },
                { time: '1–3pm', content: 'Cohort onboarding session: walk all pilot users through Gemini basics. Assign homework.' },
                { time: '3–4pm', content: 'Admin Console setup: confirm all users active, audit log running, DLP policies live.' },
                { time: '4–5pm', content: 'Day 1 recap with champion: what worked, what to improve, set Week 1 goals.' },
              ],
              callout: {
                type: 'amber',
                label: 'Rule',
                text: 'Leave Day 1 with at least one screenshot or output the champion can share with their manager. Visible early wins create internal momentum before the pilot officially starts.',
              },
            },
          },
          {
            id: 'weekly-value-log',
            badge: 'template',
            title: 'Weekly Value Log',
            description: 'FDE-maintained living document. Captures every quantifiable win, user story, and product moment. This is the raw material for the conversion deck.',
            content: {
              sectionLabel: 'Entry Format (one per win)',
              checkItems: [
                { text: 'Date, use case, Gemini feature used' },
                { text: 'User name / role (anonymize for deck)' },
                { text: 'Time saved (estimated, in minutes)' },
                { text: 'Quality outcome (decision made faster, error caught, etc.)' },
                { text: 'User quote (verbatim, with permission)' },
                { text: 'Screenshot or artifact (attach to log)' },
                { text: 'KPI this maps to (from success criteria doc)' },
              ],
              callout: {
                type: 'blue',
                label: 'Cadence',
                text: 'FDE fills out 3–5 entries per week minimum. CSM reviews every Friday and flags entries strong enough for the conversion deck.',
              },
            },
          },

          {
            id: 'success-metrics-tracker',
            badge: 'template',
            title: 'Success Metrics Tracker',
            isNew: true,
            description: 'Live KPI scorecard updated weekly throughout the 4-week pilot. Gives the full team a single source of truth on progress toward the pre-agreed success criteria.',
            content: {
              sectionLabel: 'Tracker Structure',
              checkItems: [
                { text: 'Pull KPI list directly from the signed Pilot Success Criteria Agreement — do not redefine metrics here', owner: 'SA' },
                { text: 'For each KPI: record Baseline (Week 0), Week 1 actual, Week 2 actual, Week 3 actual, Week 4 final, and Target', owner: 'FDE' },
                { text: 'Add a RAG status per KPI each week: Green (on track), Amber (at risk), Red (off track)', owner: 'FDE' },
                { text: 'Include a one-line commentary per KPI explaining the trend or any blockers', owner: 'FDE' },
                { text: 'Share the tracker with the customer champion at each weekly checkpoint — not just internally', owner: 'FDE' },
                { text: 'If any KPI turns Red, trigger the Red Account Recovery Playbook within 24 hours', owner: 'CSM' },
              ],
              metricRows: [
                { name: 'KPI 1 (Primary)', value: 'Baseline → Week 1 → Week 2 → Week 3 → Week 4 | Target' },
                { name: 'KPI 2 (Primary)', value: 'Baseline → Week 1 → Week 2 → Week 3 → Week 4 | Target' },
                { name: 'KPI 3 (Primary)', value: 'Baseline → Week 1 → Week 2 → Week 3 → Week 4 | Target' },
                { name: 'KPI 4 (Secondary — Qualitative)', value: 'NPS or champion satisfaction score' },
                { name: 'KPI 5 (Secondary — Qualitative)', value: 'Power user identification (target: ≥2)' },
              ],
              callout: {
                type: 'blue',
                label: 'Key principle',
                text: 'The tracker is a shared document — not an internal report. When the customer champion sees their own KPIs moving in the right direction week over week, they become the internal advocate for conversion. Transparency builds trust and accelerates the close.',
              },
            },
          },
          {
            id: 'gem-design',
            badge: 'template',
            title: 'Custom Gem Design Worksheet',
            description: "FDE-led session guide for designing custom Gemini Gems around the client's specific workflows. Produces a deployable Gem spec.",
            content: {
              sectionLabel: 'Gem Design Session Outputs',
              checkItems: [
                { text: 'Workflow name and department owner' },
                { text: 'Current state: how task is done today (step-by-step)' },
                { text: 'Gem persona, tone, and output format requirements' },
                { text: 'Relevant Drive documents / data sources to ground the Gem' },
                { text: '3–5 example prompts the Gem should handle well' },
                { text: 'Success test: what does a "great" response look like?' },
                { text: 'Deployment plan: who gets access, how it\'s shared' },
              ],
              callout: {
                type: 'amber',
                label: 'Switching cost note',
                text: 'Custom Gems are the highest-value entanglement artifact. Every Gem built = institutional knowledge encoded in the platform that leaves with any cancellation.',
              },
            },
          },
        ],
      },
      {
        id: 'golden-dataset',
        title: 'Golden Dataset & Competitive Testing (Weeks 1–3)',
        isNew: true,
        artifacts: [
          {
            id: 'golden-dataset',
            badge: 'template',
            title: 'Golden Dataset & UAT Test Plan',
            isNew: true,
            description: "Curated set of real-world, multi-system queries covering every pre-agreed connector. Designed to validate each integration and guide UAT toward Gemini's highest-confidence scenarios.",
            content: {
              sectionLabel: 'Dataset Construction Rules',
              checkItems: [
                { text: 'Every pre-agreed connector must have at least 3 representative test queries in the dataset', owner: 'SA' },
                { text: 'Confirm all pre-agreed connectors are indexed and returning results before UAT begins', owner: 'SA' },
                { text: 'Include at least 5 cross-connector queries that span 2 or more connected data sources', owner: 'SA' },
                { text: 'Each query has a pre-verified "ground truth" answer sourced from the connected system', owner: 'FDE' },
                { text: 'Queries are sourced from real customer workflows — not synthetic or generic', owner: 'FDE' },
                { text: 'Dataset reviewed and approved by customer champion before UAT begins', owner: 'FDE' },
                { text: 'Any connector not yet indexed is explicitly flagged and excluded from UAT scope — document the gap', owner: 'SA' },
                { text: 'Out-of-scope queries (data not connected to any agreed connector) explicitly excluded and documented', owner: 'SA' },
              ],
              callout: {
                type: 'purple',
                label: 'Coverage principle',
                text: "Every pre-agreed connector must be represented in the Golden Dataset. A connector that is not tested is a connector the customer will not trust. Gaps in connector coverage = gaps in the conversion story.",
              },
            },
          },
          {
            id: 'connector-demo',
            badge: 'process',
            title: 'Custom Connector Demo & Value Narrative',
            isNew: true,
            description: 'Structured demo of enterprise connectors (Salesforce, Jira, DevRev, etc.) to technical and business stakeholders. Proves extensibility beyond off-the-shelf tools.',
            content: {
              sectionLabel: 'Demo Checklist',
              checkItems: [
                { text: "Identify 2–3 connectors most relevant to the customer's tech stack", owner: 'SA' },
                { text: "Build a working demo using customer's actual data sources (not sandbox data)", owner: 'SA' },
                { text: 'Demo a cross-system query that is impossible in the competing tool without significant custom integration', owner: 'SA' },
                { text: 'Quantify the switching cost: "This connector took X days to build. Rebuilding this in another platform would take Y months."', owner: 'FDE' },
                { text: 'Present connector roadmap: what additional integrations are available post-conversion', owner: 'SA' },
              ],
              callout: {
                type: 'amber',
                label: 'Timing',
                text: 'Run this demo at the Week 2 Checkpoint — not at kickoff. By Week 2, the customer has seen basic Gemini value. The connector demo elevates the conversation from "AI assistant" to "enterprise intelligence platform."',
              },
            },
          },
        ],
      },
      {
        id: 'checkpoints',
        title: 'Weekly Checkpoint Process (Weeks 2 & 3)',
        artifacts: [
          {
            id: 'week2-checkpoint',
            badge: 'process',
            title: 'Week 2 Checkpoint Review',
            description: 'Mid-pilot review with champion and delivery team. Validates trajectory and authorizes scope expansion or scope reset.',
            content: {
              sectionLabel: 'Agenda (45 min)',
              timelineItems: [
                { time: '5 min', content: 'Usage snapshot: DAU, feature breadth, NPS vs. baseline' },
                { time: '15 min', content: 'Top 3 wins: FDE presents value log highlights with data + quotes' },
                { time: '10 min', content: 'KPI progress vs. success criteria: on track / at-risk / needs pivot' },
                { time: '10 min', content: "Custom Connector Demo: show what we've built, tease what's next" },
                { time: '5 min', content: 'Weeks 3–4 plan: confirmed use case #2, new user additions, Gem builds' },
              ],
              callout: {
                type: 'amber',
                label: 'Course correction trigger',
                text: 'If NPS <30 OR DAU <30% OR 0 value log entries → escalate to red account protocol immediately.',
              },
            },
          },
          {
            id: 'week3-checkpoint',
            badge: 'process',
            title: 'Week 3 Executive Checkpoint',
            description: 'Broader stakeholder review at the end of Week 3. Loops in economic buyer before the final conversion meeting. Plants the conversion narrative seed.',
            content: {
              sectionLabel: 'Who Attends',
              checkItems: [
                { text: 'Client side: Economic buyer, champion, IT lead, 1–2 power users' },
                { text: 'Google side: AE, FDE, SA, CSM' },
              ],
              timelineItems: [
                { time: '10 min', content: 'Progress vs. success criteria (visual scorecard)' },
                { time: '15 min', content: 'Top 3 value stories (champion presents their own story)' },
                { time: '10 min', content: 'Custom connector and Gem showcase' },
                { time: '10 min', content: 'What\'s coming in Week 4 (conversion presentation preview)' },
                { time: '5 min', content: 'Week 4 plan + intro of conversion process timeline' },
              ],
              callout: {
                type: 'green',
                label: 'Objective',
                text: 'Leave this meeting with the economic buyer saying "I\'m looking forward to the final presentation." That sentence = conversion is on track.',
              },
            },
          },
          {
            id: 'red-account',
            badge: 'playbook',
            title: 'Red Account Recovery Playbook',
            description: 'Triggered when pilot signals go negative. Prevents a failing pilot from becoming a lost deal.',
            content: {
              sectionLabel: 'Trigger Conditions (any one = red)',
              checkItems: [
                { text: 'DAU drops below 20% for 3+ consecutive days' },
                { text: 'Champion goes silent (>2 days no response — given the compressed timeline)' },
                { text: 'Economic buyer expresses doubt to AE' },
                { text: '0 value log entries in 5+ days' },
                { text: 'IT / Security blocker unresolved for 3+ days' },
              ],
              callout: {
                type: 'red',
                label: 'Response Protocol',
                text: 'Escalate to Sales Manager + FDE Manager within 24 hours. Schedule emergency champion call within 48 hours. Do not wait for the next scheduled checkpoint.',
              },
            },
          },
          {
            id: 'status-report',
            badge: 'template',
            title: 'Weekly Pilot Status Report',
            description: 'Sent to all stakeholders at the end of each week. Keeps the pilot visible internally and reinforces momentum. 1-pager max.',
            content: {
              sectionLabel: 'Report Sections',
              checkItems: [
                { text: 'Period summary: 2-sentence headline of what happened' },
                { text: 'KPI scorecard: current vs. target for each metric' },
                { text: 'Top win of the week (with data or quote)' },
                { text: 'At-risk items and mitigation actions' },
                { text: 'Next week priorities and owner assignments' },
                { text: 'Upcoming milestones and dates' },
              ],
            },
          },
        ],
      },
      {
        id: 'value-story',
        title: 'Value Story Development (Weeks 3–4)',
        artifacts: [
          {
            id: 'value-report',
            badge: 'document',
            title: 'Value Realization Report',
            description: 'The primary deliverable of the 4-week pilot. Translates all value log data into a compelling business case for production investment.',
            content: {
              sectionLabel: 'Report Structure',
              checkItems: [
                { text: 'Executive Summary: 3 bullet ROI proof points (quantified)', owner: 'AE' },
                { text: 'Methodology: how we measured, what data we used', owner: 'SA' },
                { text: 'KPI Scorecard: baseline vs. pilot result vs. projected at-scale', owner: 'FDE' },
                { text: '3 User Stories: executive, IC, and IT-ops perspectives', owner: 'FDE' },
                { text: 'What We Built: Gems, connectors, custom workflows inventory', owner: 'SA' },
                { text: 'Golden Dataset Results: accuracy rates, cross-system query performance', owner: 'Presales' },
                { text: 'Year 1 Projection: extrapolated value at full org deployment', owner: 'AE' },
              ],
              callout: {
                type: 'blue',
                label: 'Authorship',
                text: 'FDE writes Sections 3–6 (technical). Presales writes the Golden Dataset section. AE writes Sections 1–2 and 7 (commercial). CSM coordinates. Target: draft complete by end of Week 3.',
              },
            },
          },
          {
            id: 'conversion-handback',
            badge: 'checklist',
            title: 'Conversion Readiness Handback (Delivery → Sales)',
            description: 'Delivery team formally signals readiness to convert at end of Week 4 and hands the value story back to sales. Mirror of the pre-sales handoff.',
            content: {
              sectionLabel: 'Readiness Gates (all must be green)',
              checkItems: [
                { text: 'Value Realization Report draft complete', owner: 'FDE' },
                { text: 'At least 2 of 3 primary KPIs met or exceeded', owner: 'CSM' },
                { text: 'Golden Dataset evaluation complete and results documented', owner: 'Presales' },
                { text: 'Champion confirmed as internal advocate', owner: 'FDE' },
                { text: 'Economic buyer briefed by AE — sentiment positive', owner: 'AE' },
                { text: 'ROI number calculated and defensible', owner: 'SA' },
                { text: 'Conversion presentation date confirmed with client', owner: 'AE' },
                { text: 'Commercial proposal draft reviewed by delivery team', owner: 'AE' },
                { text: 'Post-sale transition plan drafted (CS handoff doc)', owner: 'CSM' },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: 'Conversion',
    icon: '🏆',
    title: 'Phase 3 — Conversion',
    description: 'Sales and solutions re-engage with delivery to present the value story and close. The pilot momentum becomes the commercial argument.',
    color: 'phase3',
    sections: [
      {
        id: 'pre-conversion',
        title: 'Pre-Conversion Alignment (Week 4)',
        artifacts: [
          {
            id: 'war-room',
            badge: 'process',
            title: 'Internal Conversion War Room',
            description: '60-min internal-only meeting before the conversion presentation. Full team aligns on narrative, commercial position, and objection response.',
            content: {
              sectionLabel: 'Agenda',
              timelineItems: [
                { time: '10 min', content: 'FDE debrief: honest account health, champion confidence level, known objections' },
                { time: '10 min', content: 'Value story alignment: which 3 wins lead the narrative? Agree on the ROI number.' },
                { time: '10 min', content: 'Stakeholder strategy: who\'s in the room, what does each person need to hear?' },
                { time: '15 min', content: 'Objection drilling: AE presents likely objections, team drills responses' },
                { time: '10 min', content: 'Commercial strategy: pricing, packaging, urgency lever, escalation path' },
                { time: '5 min', content: 'Roles during presentation: who speaks when, who handles technical questions' },
              ],
            },
          },
          {
            id: 'objection-playbook',
            badge: 'playbook',
            title: 'Objection Response Playbook',
            description: 'Pre-built responses to the 9 most common conversion objections. Every team member should have this internalized before the meeting.',
            content: {
              sectionLabel: 'Top Objections & Response Frames',
              checkItems: [
                { bold: '"It\'s too expensive."', text: '— Reframe to cost of inaction. The baseline doc has the number.' },
                { bold: '"We need more time."', text: '— What specifically needs to be resolved? Offer conditional LOI.' },
                { bold: '"We\'re evaluating competitors."', text: '— Redirect to the switching cost of what we built together (Gems, connectors, custom workflows). Ask: "What would it take to rebuild this in another platform?"' },
                { bold: '"[Competitor] does this too."', text: '— Pull the Golden Dataset results. Show the cross-system queries the competitor cannot replicate without custom integration work.' },
                { bold: '"Security / legal needs to review."', text: '— Have the compliance deck ready. SA joins legal call.' },
                { bold: '"Users don\'t love it yet."', text: '— Pull specific power user stories. Offer extended FDE post-sale.' },
                { bold: '"Budget is frozen."', text: '— Map to existing line item. Offer multi-year structure for front-loaded savings.' },
                { bold: '"We want more users first."', text: '— This is a buying signal. Offer land-and-expand structure.' },
                { bold: '"The ROI isn\'t convincing."', text: '— Which KPI is weak? Offer to re-run with client\'s own data.' },
              ],
            },
          },
          {
            id: 'champion-prebrief',
            badge: 'template',
            title: 'Champion Pre-Brief Agenda',
            description: '30-min FDE-to-champion call held 48 hours before the Week 4 conversion presentation. Champion goes in armed and aligned.',
            content: {
              sectionLabel: 'Topics to Cover',
              checkItems: [
                { text: 'Walk champion through the full conversion deck in advance', owner: 'FDE' },
                { text: "Confirm they're comfortable presenting their user story slide", owner: 'FDE' },
                { text: 'Identify who in the room might push back and why', owner: 'FDE' },
                { text: 'Agree on how champion will handle objections raised to them', owner: 'AE' },
                { text: "Discuss champion's career narrative — frame signing as their win", owner: 'AE' },
                { text: "Confirm economic buyer's current sentiment (champion's read)", owner: 'AE' },
              ],
              callout: {
                type: 'green',
                label: 'Key principle',
                text: "The champion presenting their own user story is 10× more persuasive than the vendor presenting it for them.",
              },
            },
          },
          {
            id: 'conversion-deck',
            badge: 'deck',
            title: 'Conversion Presentation Deck',
            description: 'The closing deck. Built from the Value Realization Report. Makes signing feel like the obvious next step.',
            content: {
              sectionLabel: 'Slide Architecture',
              checkItems: [
                { bold: 'Slide 1:', text: '"What we set out to do" — original pain and success criteria' },
                { bold: 'Slide 2:', text: '"What we actually achieved" — KPI scorecard vs. baseline' },
                { bold: 'Slide 3:', text: '"The value we created" — hours saved, $ recovered, quality impact' },
                { bold: 'Slides 4–6:', text: '3 user stories (executive / IC / IT-ops)' },
                { bold: 'Slide 7:', text: '"What we built together" — Gems, connectors, custom workflows' },
                { bold: 'Slide 8:', text: '"How we compare" — Golden Dataset results vs. current process and any tools evaluated' },
                { bold: 'Slide 9:', text: '"What Year 1 looks like" — expansion roadmap' },
                { bold: 'Slide 10:', text: 'Proposed commercial structure (pricing, terms, start date)' },
                { bold: 'Slide 11:', text: '"What happens if we don\'t move forward" — cost of inaction' },
                { bold: 'Slide 12:', text: 'Next step: sign by [date], get [specific incentive]' },
              ],
              callout: {
                type: 'green',
                label: 'Presentation rule',
                text: 'AE presents Slides 1–3 and 9–12. FDE presents Slides 4–7. Presales presents Slide 8. Champion presents their own story on one of Slides 4–6. Never let one person present the whole deck.',
              },
            },
          },
        ],
      },
      {
        id: 'close',
        title: 'Conversion Execution & Close (End of Week 4)',
        artifacts: [
          {
            id: 'urgency-framework',
            badge: 'process',
            title: 'Urgency & Incentive Framework',
            description: "Structured approach to creating legitimate time pressure without artificial tactics. Urgency must be real — tied to the client's own business calendar.",
            content: {
              sectionLabel: 'Legitimate Urgency Levers',
              checkItems: [
                { text: 'Budget cycle: "Your Q2 budget closes in 3 weeks. Signing now locks this year\'s pricing."', owner: 'AE' },
                { text: 'Competitive: "Other organizations in your industry are already deploying this. Here\'s what they\'re doing."', owner: 'AE' },
                { text: 'Momentum: "Your pilot cohort is already productive. Every week without production = [X hours] of productivity left on the table."', owner: 'FDE' },
                { text: 'Incentive: limited-time pricing, extended FDE support, or additional connector builds for early commitment', owner: 'AE' },
              ],
              callout: {
                type: 'red',
                label: 'Rule',
                text: 'Never manufacture urgency. If no real urgency exists, create it by quantifying the cost of delay using the baseline document.',
              },
            },
          },
          {
            id: 'commercial-proposal',
            badge: 'document',
            title: 'Commercial Proposal & Rollout Plan',
            description: 'The production commercial proposal. Developed in parallel during delivery — not after. Includes phased org-wide rollout roadmap.',
            content: {
              sectionLabel: 'Proposal Components',
              checkItems: [
                { text: 'Proposed license structure (seats, tiers, add-ons)', owner: 'AE' },
                { text: 'Pricing with volume discount if applicable', owner: 'AE' },
                { text: 'Phase 1 rollout: expand from pilot cohort to department', owner: 'SA' },
                { text: 'Phase 2 rollout: full org deployment timeline', owner: 'SA' },
                { text: 'Post-sale FDE / CSM support model', owner: 'CSM' },
                { text: 'Additional connector builds included in Year 1', owner: 'SA' },
                { text: 'Current tool spend being displaced (any competing AI or productivity tools)', owner: 'AE' },
                { text: 'Net new cost vs. status quo (show the delta, not just the price)', owner: 'AE' },
              ],
            },
          },
        ],
      },
      {
        id: 'post-conversion',
        title: 'Post-Conversion & Learning',
        artifacts: [
          {
            id: 'post-mortem',
            badge: 'template',
            title: 'Pilot Post-Mortem Template',
            isNew: true,
            description: 'Internal retrospective completed within 5 days of pilot close (win or loss). Feeds learnings back into the next pilot.',
            content: {
              sectionLabel: 'Post-Mortem Questions',
              checkItems: [
                { text: 'What was the single biggest factor in the outcome (positive or negative)?', owner: 'FDE' },
                { text: 'Which success criteria were hardest to hit? Why?', owner: 'SA' },
                { text: 'Which artifacts from the BOM were most valuable? Which were unused?', owner: 'FDE' },
                { text: 'What would we do differently in the first week?', owner: 'FDE' },
                { text: 'What competitive intelligence did we learn?', owner: 'AE' },
                { text: 'Competitive dynamics: how did any competing tool factor into the decision?', owner: 'AE' },
                { text: 'What should be added to or removed from the BOM for the next pilot?', owner: 'CSM' },
              ],
              callout: {
                type: 'blue',
                label: 'Process',
                text: 'Post-mortem findings are shared with the full presales and delivery team within 2 weeks. Patterns across 3+ pilots trigger a BOM update.',
              },
            },
          },
          {
            id: 'graceful-exit',
            badge: 'playbook',
            title: 'Graceful Exit Playbook (If No Conversion)',
            description: 'Structured approach for pilots that do not convert. Preserves the relationship and sets up future re-engagement.',
            content: {
              sectionLabel: 'Exit Protocol',
              checkItems: [
                { text: 'AE schedules post-mortem call within 5 days: "help us understand what we can do better"' },
                { text: 'Document the real objection (rarely the stated one)' },
                { text: 'Leave all pilot artifacts (Gems, templates, connectors) accessible to champion — do not remove' },
                { text: 'Set a nurture cadence: biweekly product updates, relevant customer stories' },
                { text: 'Identify future trigger event: budget cycle, new initiative, leadership change' },
                { text: 'Champion relationship stays with FDE — maintain informally' },
                { text: 'Re-engagement plan set with a specific date (typically 4–6 weeks out)' },
              ],
              callout: {
                type: 'amber',
                label: 'Principle',
                text: 'A "no" at Week 4 is a "not yet." The relationship capital built by FDE is the most durable asset. Protect it at all costs.',
              },
            },
          },
        ],
      },
    ],
  },
];

export const stats = {
  totalArtifacts: 43,
  pilotDuration: '4 wks',
  pilotDurationSub: 'with weekly checkpoints',
  keyRoles: 6,
  keyRolesSub: 'AE · FDE · SA · CSM · Presales · Exec',
  conversionGate: 'Week 4',
  conversionGateSub: 'go / no-go decision',
};
