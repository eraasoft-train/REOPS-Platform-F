/**
 * ReOps Manager - Centralized Color Tokens
 *
 * Single source of truth for all colors. Components use Tailwind classes
 * (e.g. `bg-primary`, `text-brand`) or `resolveAccent()` for inline styles
 * instead of hardcoded hex values.
 *
 * Palette sourced from https://reops.io (extracted from its CSS/JS bundles
 * and logo): white canvas, navy ink, royal-blue actions, azure highlights.
 * The old vivid-orange accent was removed; reops.io's blue system is used
 * throughout (blue pill CTAs, azure highlights, navy panels).
 *
 *   white canvas ...... #ffffff ......... background / card
 *   navy ink .......... #201c44 ......... foreground / brand-ink / headlines
 *   dark navy ......... #101828 ......... sidebar / dark sections
 *   royal blue ........ #155dfc ......... primary / brand (buttons, links)
 *   deep blue ......... #1447e6 ......... brand-strong (filled panels)
 *   azure ............. #2998ff ......... chart-1 / highlights
 *   bright blue ....... #3b82f6 ......... primary in dark mode
 *   azure ............. #2998ff ......... azure / accent (reops signature highlight blue)
 *   bright azure ...... #4dacff ......... azure / accent in dark mode
 *   azure soft ........ #dbeeff ......... azure-soft tint
 *   success green ..... #22c55e / #16a34a  status-positive
 *   amber ............. #f59e0b / #b45309  status-warning
 *   red ............... #ef4444 / #dc2626  status-danger / destructive
 *   violet ............ #8b5cf6 ......... chart-4 / headline gradient
 *   slate ............. #f3f4f6 / #e2e8f0  muted / borders
 *   pale blue ......... #ebf3fe ......... secondary surfaces (reops blue wash)
 *
 * All colors are defined in app/globals.css as HSL custom properties.
 */

export const colorTokens = {
  // Base semantic colors (automatically adapt to light/dark mode)
  background: 'var(--color-background)',
  foreground: 'var(--color-foreground)',
  border: 'var(--color-border)',
  input: 'var(--color-input)',
  ring: 'var(--color-ring)',

  // Card surfaces
  card: 'var(--color-card)',
  'card-foreground': 'var(--color-card-foreground)',
  'card-border': 'var(--color-card-border)',

  // Popover surfaces
  popover: 'var(--color-popover)',
  'popover-foreground': 'var(--color-popover-foreground)',
  'popover-border': 'var(--color-popover-border)',

  // Primary brand actions
  primary: 'var(--color-primary)',
  'primary-foreground': 'var(--color-primary-foreground)',
  'primary-border': 'var(--color-primary-border)',

  // Secondary actions
  secondary: 'var(--color-secondary)',
  'secondary-foreground': 'var(--color-secondary-foreground)',
  'secondary-border': 'var(--color-secondary-border)',

  // Muted/neutral
  muted: 'var(--color-muted)',
  'muted-foreground': 'var(--color-muted-foreground)',
  'muted-border': 'var(--color-muted-border)',

  // Accent (azure highlight)
  accent: 'var(--color-accent)',
  'accent-foreground': 'var(--color-accent-foreground)',
  'accent-border': 'var(--color-accent-border)',

  // Destructive actions
  destructive: 'var(--color-destructive)',
  'destructive-foreground': 'var(--color-destructive-foreground)',
  'destructive-border': 'var(--color-destructive-border)',

  // ReOps Brand Palette (royal blue + azure)
  brand: 'var(--color-brand)',
  'brand-strong': 'var(--color-brand-strong)',
  'brand-soft': 'var(--color-brand-soft)',
  'brand-ink': 'var(--color-brand-ink)',

  azure: 'var(--color-azure)',
  'azure-soft': 'var(--color-azure-soft)',

  // Supporting semantic colors
  'blue-soft': 'var(--color-blue-soft)',
  'success-soft': 'var(--color-success-soft)',
  'success-ink': 'var(--color-success-ink)',

  // Status colors (for badges, indicators, progress)
  'status-positive': 'var(--color-status-positive)',
  'status-positive-soft': 'var(--color-status-positive-soft)',
  'status-warning': 'var(--color-status-warning)',
  'status-warning-soft': 'var(--color-status-warning-soft)',
  'status-danger': 'var(--color-status-danger)',
  'status-danger-soft': 'var(--color-status-danger-soft)',

  // Chart colors
  'chart-1': 'var(--color-chart-1)',
  'chart-2': 'var(--color-chart-2)',
  'chart-3': 'var(--color-chart-3)',
  'chart-4': 'var(--color-chart-4)',
  'chart-5': 'var(--color-chart-5)',

  // Sidebar colors
  sidebar: 'var(--color-sidebar)',
  'sidebar-foreground': 'var(--color-sidebar-foreground)',
  'sidebar-border': 'var(--color-sidebar-border)',
  'sidebar-primary': 'var(--color-sidebar-primary)',
  'sidebar-primary-foreground': 'var(--color-sidebar-primary-foreground)',
  'sidebar-primary-border': 'var(--color-sidebar-primary-border)',
  'sidebar-accent': 'var(--color-sidebar-accent)',
  'sidebar-accent-foreground': 'var(--color-sidebar-accent-foreground)',
  'sidebar-accent-border': 'var(--color-sidebar-accent-border)',
  'sidebar-ring': 'var(--color-sidebar-ring)',
} as const;

/**
 * Tailwind class names for each semantic color role.
 * Use these in className instead of arbitrary values.
 */
export const twColors = {
  // Base
  background: 'bg-background',
  foreground: 'text-foreground',
  border: 'border-border',
  input: 'bg-input',
  ring: 'focus:ring-ring',

  // Card
  card: 'bg-card',
  'card-foreground': 'text-card-foreground',
  'card-border': 'border-card-border',

  // Popover
  popover: 'bg-popover',
  'popover-foreground': 'text-popover-foreground',
  'popover-border': 'border-popover-border',

  // Primary
  primary: 'bg-primary',
  'primary-foreground': 'text-primary-foreground',
  'primary-border': 'border-primary-border',
  'primary-hover': 'hover:bg-primary/90',
  'primary-ring': 'focus:ring-primary',

  // Secondary
  secondary: 'bg-secondary',
  'secondary-foreground': 'text-secondary-foreground',
  'secondary-border': 'border-secondary-border',
  'secondary-hover': 'hover:bg-secondary/80',

  // Muted
  muted: 'bg-muted',
  'muted-foreground': 'text-muted-foreground',
  'muted-border': 'border-muted-border',

  // Accent (azure)
  accent: 'bg-accent',
  'accent-foreground': 'text-accent-foreground',
  'accent-border': 'border-accent-border',
  'accent-hover': 'hover:bg-accent/90',

  // Destructive
  destructive: 'bg-destructive',
  'destructive-foreground': 'text-destructive-foreground',
  'destructive-border': 'border-destructive-border',
  'destructive-hover': 'hover:bg-destructive/90',

  // Brand (royal blue)
  brand: 'bg-brand',
  'brand-strong': 'bg-brand-strong',
  'brand-soft': 'bg-brand-soft',
  'brand-ink': 'text-brand-ink',
  'brand-border': 'border-brand',

  // Azure (highlight blue)
  azure: 'bg-azure',
  'azure-soft': 'bg-azure-soft',
  'azure-border': 'border-azure',

  // Supporting
  'blue-soft': 'bg-blue-soft',
  'success-soft': 'bg-success-soft',
  'success-ink': 'text-success-ink',

  // Status
  'status-positive': 'bg-status-positive',
  'status-positive-soft': 'bg-status-positive-soft',
  'status-positive-text': 'text-status-positive',
  'status-warning': 'bg-status-warning',
  'status-warning-soft': 'bg-status-warning-soft',
  'status-warning-text': 'text-status-warning',
  'status-danger': 'bg-status-danger',
  'status-danger-soft': 'bg-status-danger-soft',
  'status-danger-text': 'text-status-danger',

  // Chart
  'chart-1': 'bg-chart-1',
  'chart-2': 'bg-chart-2',
  'chart-3': 'bg-chart-3',
  'chart-4': 'bg-chart-4',
  'chart-5': 'bg-chart-5',

  // Sidebar
  sidebar: 'bg-sidebar',
  'sidebar-foreground': 'text-sidebar-foreground',
  'sidebar-border': 'border-sidebar-border',
  'sidebar-primary': 'bg-sidebar-primary',
  'sidebar-primary-foreground': 'text-sidebar-primary-foreground',
  'sidebar-accent': 'bg-sidebar-accent',
  'sidebar-accent-foreground': 'text-sidebar-accent-foreground',
} as const;

/**
 * Resolve a token key (e.g. "azure", "status-positive", "chart-3") to a CSS color value.
 * Falls back to the raw string so legacy hex values keep working during migration.
 */
export function resolveAccent(value: string): string {
  if (!value) return 'var(--color-primary)';
  const v = value.trim();
  if (v.startsWith('var(') || v.startsWith('hsl(') || v.startsWith('#') || v.startsWith('rgb')) return v;
  if ((colorTokens as Record<string, string>)[v]) return `var(--color-${v})`;
  return v;
}

/** Centralized accent value for `style={{ color / backgroundColor }}` usage. */
export function accentVar(value: string): string {
  return resolveAccent(value);
}

/**
 * Activity / avatar palette — replaces the old hardcoded
 * ['#e9eee7', '#f6ead5', ...] arrays. Each entry is a soft bg + ink text pair.
 */
export const activityTones = [
  { bg: 'bg-brand-soft', text: 'text-brand' },
  { bg: 'bg-azure-soft', text: 'text-brand' },
  { bg: 'bg-status-danger-soft', text: 'text-status-danger' },
  { bg: 'bg-blue-soft', text: 'text-primary' },
  { bg: 'bg-muted', text: 'text-muted-foreground' },
] as const;

/** Progress-bar tones for KPI / branch indicators (replaces ['#507d69', ...]). */
export const meterTones = [
  'var(--color-primary)',
  'var(--color-brand)',
  'var(--color-chart-3)',
  'var(--color-status-danger)',
] as const;

/**
 * Status tone mapping - returns Tailwind classes for a given status string.
 * Use this instead of hardcoding status colors.
 */
export function getStatusToneClasses(status: string): string {
  const value = status.toLowerCase();
  if (value.includes('complete') || value.includes('active') || value.includes('approved') || value.includes('on track')) {
    return 'bg-status-positive-soft text-status-positive';
  }
  if (value.includes('progress') || value.includes('review') || value.includes('pending') || value.includes('scheduled')) {
    return 'bg-status-warning-soft text-status-warning';
  }
  if (value.includes('block') || value.includes('urgent') || value.includes('overdue') || value.includes('declined')) {
    return 'bg-status-danger-soft text-status-danger';
  }
  return 'bg-muted text-muted-foreground';
}

/**
 * Priority tone mapping
 */
export function getPriorityToneClasses(priority: string): string {
  const value = priority.toLowerCase();
  if (value === 'high') {
    return 'bg-status-danger-soft text-status-danger';
  }
  if (value === 'low') {
    return 'bg-muted text-muted-foreground';
  }
  return 'bg-status-warning-soft text-status-warning';
}

/**
 * Kind/Category color mapping for consistent icon backgrounds
 * Returns an object with background and text color classes
 */
export function getKindColors(kind: string): { bg: string; text: string; iconBg: string } {
  switch (kind.toLowerCase()) {
    case 'task':
      return { bg: 'bg-brand-soft', text: 'text-brand', iconBg: 'bg-brand-soft text-brand' };
    case 'employee':
      return { bg: 'bg-status-positive-soft', text: 'text-status-positive', iconBg: 'bg-status-positive-soft text-status-positive' };
    case 'branch':
      return { bg: 'bg-azure-soft', text: 'text-brand', iconBg: 'bg-azure-soft text-brand' };
    case 'request':
      return { bg: 'bg-blue-soft', text: 'text-primary', iconBg: 'bg-blue-soft text-primary' };
    case 'training':
      return { bg: 'bg-blue-soft', text: 'text-primary', iconBg: 'bg-blue-soft text-primary' };
    case 'kpi':
      return { bg: 'bg-brand-soft', text: 'text-brand', iconBg: 'bg-brand-soft text-brand' };
    case 'sop':
      return { bg: 'bg-brand-soft', text: 'text-brand', iconBg: 'bg-brand-soft text-brand' };
    case 'checklist':
      return { bg: 'bg-brand-soft', text: 'text-brand', iconBg: 'bg-brand-soft text-brand' };
    default:
      return { bg: 'bg-muted', text: 'text-muted-foreground', iconBg: 'bg-muted text-muted-foreground' };
  }
}

/**
 * Semantic color roles for common UI patterns
 * Use these to ensure consistency across components
 */
export const semanticColors = {
  // Interactive elements
  button: {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-border bg-card text-foreground hover:bg-muted',
    subtle: 'text-muted-foreground hover:bg-muted hover:text-foreground',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    brand: 'bg-brand text-primary-foreground hover:bg-brand-strong',
    azure: 'bg-azure text-brand-ink hover:bg-azure/80',
  },
  // Input states
  input: {
    default: 'bg-background border-border',
    focus: 'focus:border-primary/60 focus:ring-2 focus:ring-primary/10',
    error: 'border-status-danger focus:border-status-danger focus:ring-status-danger/10',
  },
  // Card elevations
  card: {
    default: 'bg-card border border-border/90',
    elevated: 'bg-card border border-border/90 shadow-[0_2px_8px_rgba(35,51,54,.025)]',
    interactive: 'bg-card border border-border/90 transition-colors hover:bg-background/80',
  },
  // Badge variants
  badge: {
    default: 'bg-muted text-muted-foreground',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-status-positive-soft text-status-positive',
    warning: 'bg-status-warning-soft text-status-warning',
    danger: 'bg-status-danger-soft text-status-danger',
    brand: 'bg-brand-soft text-brand',
    azure: 'bg-azure-soft text-brand',
  },
  // Icon backgrounds
  icon: {
    brand: 'bg-brand-soft text-brand',
    azure: 'bg-azure-soft text-brand',
    positive: 'bg-status-positive-soft text-status-positive',
    warning: 'bg-status-warning-soft text-status-warning',
    danger: 'bg-status-danger-soft text-status-danger',
    primary: 'bg-primary/10 text-primary',
    muted: 'bg-muted text-muted-foreground',
  },
} as const;

export type ColorTokenKey = keyof typeof colorTokens;
export type TwColorKey = keyof typeof twColors;