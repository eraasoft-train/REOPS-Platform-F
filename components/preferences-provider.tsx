'use client';

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore, type ReactNode } from 'react';
import type { Language } from '@/lib/workspace/config';

const THEME_KEY = 'fieldwise-theme';
const LANGUAGE_KEY = 'fieldwise-language';

type Preferences = {
  dark: boolean;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (language: Language) => void;
};

const PreferencesContext = createContext<Preferences | null>(null);

const LANGUAGE_EVENT = 'reops-language';

function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
}
function getThemeSnapshot() {
  return document.documentElement.classList.contains('dark');
}
function subscribeLanguage(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(LANGUAGE_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(LANGUAGE_EVENT, onChange);
  };
}
function getLanguageSnapshot(): Language {
  try {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    return saved === 'en' || saved === 'ar' ? saved : 'ar';
  } catch { return 'ar'; }
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  // Hydration-safe external stores: the server renders from getServerSnapshot,
  // the client re-syncs after hydration without mismatches (no read-during-render,
  // no setState-in-effect).
  const dark = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => false);
  const language = useSyncExternalStore(subscribeLanguage, getLanguageSnapshot, () => 'ar' as Language);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const toggleTheme = useCallback(() => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    document.documentElement.style.colorScheme = next ? 'dark' : 'light';
    try { localStorage.setItem(THEME_KEY, next ? 'dark' : 'light'); } catch { /* optional preference */ }
  }, []);

  const setLanguage = useCallback((next: Language) => {
    try { localStorage.setItem(LANGUAGE_KEY, next); } catch { /* optional preference */ }
    window.dispatchEvent(new Event(LANGUAGE_EVENT));
  }, []);

  return <PreferencesContext.Provider value={{ dark, toggleTheme, language, setLanguage }}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error('usePreferences must be used inside PreferencesProvider');
  return context;
}

export const themeInitScript = `(function(){try{var s=localStorage.getItem('${THEME_KEY}');var d=s?s==='dark':false;var e=document.documentElement;e.classList.toggle('dark',d);e.style.colorScheme=d?'dark':'light';}catch(_){}})();`;
