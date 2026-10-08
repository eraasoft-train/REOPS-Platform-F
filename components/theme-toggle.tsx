'use client';

import { type MouseEvent } from 'react';
import { Moon, Sun } from 'lucide-react';
import { usePreferences } from '@/components/preferences-provider';

type TransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

/**
 * Shared theme toggle — the same Sun/Moon icon button in the workspace shell
 * and on the marketing home page. Single source so both surfaces stay in sync.
 *
 * Modern switch animation: a circular wipe expanding from the click point
 * (View Transitions API, GPU-composited clip-path, ~450ms). Falls back to an
 * instant switch where unsupported or when reduced motion is preferred.
 */
export function ThemeToggleButton({ label }: { label: string }) {
  const { dark, toggleTheme } = usePreferences();
  const onToggle = (event: MouseEvent<HTMLButtonElement>) => {
    const doc = document as TransitionDocument;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!doc.startViewTransition || reduceMotion) {
      toggleTheme();
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX || rect.left + rect.width / 2;
    const y = event.clientY || rect.top + rect.height / 2;
    const transition = doc.startViewTransition(() => {
      toggleTheme();
    });
    transition.ready
      .then(() => {
        const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
          { duration: 450, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)', pseudoElement: '::view-transition-new(root)' },
        );
      })
      .catch(() => {
        /* Transition skipped — the theme already switched. */
      });
  };
  return <button type="button" onClick={onToggle} aria-label={label} aria-pressed={dark} data-testid="button-theme-toggle" className="grid size-9 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{dark ? <Sun size={16} /> : <Moon size={16} />}</button>;
}
