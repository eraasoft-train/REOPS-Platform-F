'use client';

import { useState, useSyncExternalStore } from 'react';
import { useWorkspace } from '@/components/workspace/workspace-context';
import { type Language, tx, cx } from '@/lib/workspace/config';
import { PageTitle } from '@/components/workspace/primitives';
import { BriefcaseBusiness, Building2, CalendarDays, CheckCircle2, Globe2 } from 'lucide-react';

type WeekStart = 'Monday' | 'Sunday' | 'Saturday';
const WEEK_START_KEY = 'fieldwise-week-start';
const WEEK_START_EVENT = 'reops-week-start';

function subscribeWeekStart(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(WEEK_START_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(WEEK_START_EVENT, onChange);
  };
}
function getWeekStartSnapshot(): WeekStart {
  try {
    const saved = localStorage.getItem(WEEK_START_KEY);
    return saved === 'Sunday' || saved === 'Saturday' ? saved : 'Monday';
  } catch { return 'Monday'; }
}

function SettingsPage({ language, setLanguage, branchCount }: { language: Language; setLanguage: (language: Language) => void; branchCount: number }) {
  const [saved, setSaved] = useState(false);
  // SSR-safe: the server renders 'Monday'; stored value syncs after hydration.
  const weekStart = useSyncExternalStore(subscribeWeekStart, getWeekStartSnapshot, () => 'Monday' as const);
  const toggleLanguage = (next: Language) => { setLanguage(next); setSaved(true); window.setTimeout(() => setSaved(false), 2200); };
  const updateWeekStart = (next: WeekStart) => {
    try { localStorage.setItem(WEEK_START_KEY, next); } catch { /* preferences are optional */ }
    window.dispatchEvent(new Event(WEEK_START_EVENT));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };
  return <>
    <PageTitle eyebrow="YOUR WORKSPACE" title="Settings" subtitle="Make ReOps Manager work the way your team does." language={language} />
    <div className="grid gap-5">
      <div className="space-y-5">
        <section className="rounded-xl border border-border bg-card">
          <div className="border-b border-border px-5 py-4"><h2 className="text-[13px] font-bold">Workspace preferences</h2><p className="mt-1 text-[10px] text-muted-foreground">Set up the shared workspace for your locations.</p></div>
          <div className="divide-y divide-border/70">
            <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-5"><div className="flex items-center gap-3"><div className="grid size-9 place-items-center rounded-lg bg-brand-soft text-brand"><Globe2 size={16} /></div><div><div className="text-[11px] font-semibold">{tx('Display language', language)}</div><div className="mt-1 text-[10px] text-muted-foreground">{tx('Arabic automatically switches the workspace to right-to-left.', language)}</div></div></div><div className="flex rounded-lg border border-border p-1"><button onClick={() => toggleLanguage('en')} data-testid="button-set-english" className={cx('rounded-md px-3 py-1.5 text-[10px] font-semibold', language === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted')}>English</button><button onClick={() => toggleLanguage('ar')} data-testid="button-set-arabic" className={cx('rounded-md px-3 py-1.5 text-[10px] font-semibold', language === 'ar' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted')}>العربية</button></div></div>
             <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-5"><div className="flex items-center gap-3"><div className="grid size-9 place-items-center rounded-lg bg-azure-soft text-brand"><Building2 size={16} /></div><div><div className="text-[11px] font-semibold">Organization</div><div className="mt-1 text-[10px] text-muted-foreground">Northstar Collective · {branchCount} active branches</div></div></div><span className="rounded-full bg-brand-soft px-2.5 py-1 text-[9px] font-semibold text-brand">Active workspace</span></div>
             <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-5"><div className="flex items-center gap-3"><div className="grid size-9 place-items-center rounded-lg bg-blue-soft text-primary"><CalendarDays size={16} /></div><div><div className="text-[11px] font-semibold">{tx('Week starts on', language)}</div><div className="mt-1 text-[10px] text-muted-foreground">{tx('Choose the first day of the week.', language)}</div></div></div><select aria-label="First day of the week" value={weekStart} onChange={event => updateWeekStart(event.target.value as typeof weekStart)} className="h-9 rounded-lg border border-border bg-background px-3 text-[10px]"><option>Monday</option><option>Sunday</option><option>Saturday</option></select></div>
          </div>
           {saved && <div role="status" className="border-t border-border bg-success-soft px-5 py-2.5 text-[10px] font-semibold text-success-ink"><CheckCircle2 size={13} className="me-1 inline" />{tx('Preference saved', language)}</div>}
        </section>
        <section className="rounded-xl border border-border bg-card p-5"><div className="flex items-center gap-3"><div className="grid size-9 place-items-center rounded-lg bg-muted text-muted-foreground"><BriefcaseBusiness size={16} /></div><div><h2 className="text-[12px] font-bold">{tx('Your workspace, at a glance', language)}</h2><p className="mt-1 text-[10px] text-muted-foreground">{tx('A shared operating view for managers coordinating teams, process, and performance.', language)}</p></div></div></section>
      </div>
    </div>
  </>;
}

export function SettingsView() {
  const { language, setLanguage, branchCount } = useWorkspace();
  return <SettingsPage language={language} setLanguage={setLanguage} branchCount={branchCount} />;
}
