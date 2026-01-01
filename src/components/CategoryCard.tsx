import { LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  nameAr: string;
  nameEn: string;
  icon: LucideIcon;
  color: string;
  serviceCount: number;
  isSelected: boolean;
  onClick: () => void;
}

const colorClasses: Record<string, string> = {
  blue: 'icon-blue',
  coral: 'icon-coral',
  purple: 'icon-purple',
  orange: 'icon-orange',
  green: 'icon-green',
  teal: 'icon-teal',
  pink: 'icon-pink',
  yellow: 'icon-yellow',
  indigo: 'icon-indigo',
  red: 'icon-red',
  cyan: 'icon-cyan',
  lime: 'icon-lime',
};

export function CategoryCard({
  nameAr,
  nameEn,
  icon: Icon,
  color,
  serviceCount,
  isSelected,
  onClick,
}: CategoryCardProps) {
  const { t } = useLanguage();

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative flex flex-col items-center gap-3 rounded-2xl p-6 transition-all duration-300',
        'bg-card border-2 hover:border-primary/50',
        'hover:shadow-lg hover:-translate-y-1',
        isSelected 
          ? 'border-primary shadow-glow scale-[1.02]' 
          : 'border-border'
      )}
    >
      {/* Icon Container */}
      <div
        className={cn(
          'flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300',
          'group-hover:scale-110 group-hover:rotate-3',
          colorClasses[color]
        )}
      >
        <Icon className="h-8 w-8 text-white" strokeWidth={1.5} />
      </div>

      {/* Name */}
      <h3 className="text-center font-semibold text-foreground line-clamp-1">
        {t(nameAr, nameEn)}
      </h3>

      {/* Service Count Badge */}
      <span className="text-xs text-muted-foreground">
        {serviceCount} {t('خدمة', 'services')}
      </span>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute -top-1 -end-1 h-4 w-4 rounded-full bg-primary shadow-glow">
          <div className="h-full w-full rounded-full bg-primary animate-ping opacity-75" />
        </div>
      )}
    </button>
  );
}
