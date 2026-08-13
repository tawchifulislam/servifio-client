import {
  Wrench,
  Sparkles,
  BookOpen,
  Zap,
  Wind,
  PaintRoller,
  Truck,
  type LucideIcon,
} from 'lucide-react';

interface CategoryStyle {
  icon: LucideIcon;
  color: string;
}

export const categoryStyles: Record<string, CategoryStyle> = {
  Plumbing: { icon: Wrench, color: 'var(--accent)' },
  Tutoring: { icon: BookOpen, color: 'var(--secondary)' },
  Cleaning: { icon: Sparkles, color: 'var(--destructive)' },
  Electrical: { icon: Zap, color: 'var(--accent)' },
  'Appliance repair': { icon: Wind, color: 'var(--secondary)' },
  Painting: { icon: PaintRoller, color: 'var(--destructive)' },
  'Moving help': { icon: Truck, color: 'var(--accent)' },
};

export function getCategoryStyle(categoryName?: string): CategoryStyle {
  return (
    categoryStyles[categoryName ?? ''] ?? {
      icon: Wrench,
      color: 'var(--accent)',
    }
  );
}
