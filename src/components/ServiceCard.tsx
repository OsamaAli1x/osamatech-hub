import { LucideIcon, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: LucideIcon;
  color: string;
  delay?: number;
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

export function ServiceCard({
  nameAr,
  nameEn,
  descriptionAr,
  descriptionEn,
  icon: Icon,
  color,
  delay = 0,
}: ServiceCardProps) {
  const { t, dir } = useLanguage();

  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-2xl p-5 transition-all duration-300',
        'bg-card border border-border hover:border-primary/30',
        'hover:shadow-lg hover:-translate-y-1',
        'animate-scale-in opacity-0'
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {/* Icon */}
      <div
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300',
          'group-hover:scale-110',
          colorClasses[color]
        )}
      >
        <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
      </div>

      {/* Content */}
      <div className="mt-4 flex-1">
        <h4 className="font-semibold text-foreground line-clamp-1">
          {t(nameAr, nameEn)}
        </h4>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {t(descriptionAr, descriptionEn)}
        </p>
      </div>

      {/* Action */}
      <Button
        variant="ghost"
        size="sm"
        className="mt-4 w-full justify-between text-primary hover:text-primary hover:bg-primary/10"
      >
        <span>{t('اطلب الآن', 'Order Now')}</span>
        {dir === 'rtl' ? (
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        ) : (
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        )}
      </Button>

      {/* Hover glow effect */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}
