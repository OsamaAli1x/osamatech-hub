import { Sparkles, Zap, Shield, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function HeroSection() {
  const { t } = useLanguage();

  const features = [
    { icon: Zap, textAr: 'تفعيل فوري', textEn: 'Instant Activation' },
    { icon: Shield, textAr: 'ضمان كامل', textEn: 'Full Guarantee' },
    { icon: Star, textAr: 'دعم 24/7', textEn: '24/7 Support' },
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 start-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl animate-float" />
        <div className="absolute bottom-20 end-20 h-48 w-48 rounded-full bg-service-purple/20 blur-3xl animate-float delay-200" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            <span>{t('أكثر من 100 خدمة رقمية', 'Over 100 Digital Services')}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            <span className="block">{t('سوق الخدمات الرقمية', 'Digital Services')}</span>
            <span className="block mt-2 gradient-text">
              {t('أسامة تك', 'Marketplace')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            {t(
              'اكتشف عالمًا من الخدمات الرقمية المميزة - برامج، اشتراكات، دورات تعليمية، وأكثر',
              'Discover a world of premium digital services - software, subscriptions, courses, and more'
            )}
          </p>

          {/* Features */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-xl bg-card/80 px-4 py-2 border border-border"
              >
                <feature.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {t(feature.textAr, feature.textEn)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
