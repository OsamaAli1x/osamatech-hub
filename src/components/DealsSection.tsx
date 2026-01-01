import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Product, categories } from '@/data/services';
import { Button } from '@/components/ui/button';
import { Clock, ShoppingCart, Star, ChevronLeft, ChevronRight, Flame } from 'lucide-react';

export function DealsSection() {
  const { t, dir } = useLanguage();
  const { addToCart, isInCart } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Get products with deals (originalPrice > price)
  const deals = categories
    .flatMap(cat => cat.products)
    .filter(p => p.originalPrice && p.originalPrice > p.price)
    .slice(0, 8);

  // Countdown timer - ends in 6 hours
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 5, minutes: 59, seconds: 59 }; // Reset
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (deals.length === 0) return null;

  return (
    <section className="py-6 bg-gradient-to-r from-destructive/5 via-destructive/10 to-destructive/5 border-y border-destructive/20">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-destructive/10">
              <Flame className="h-6 w-6 text-destructive animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                {t('عروض اليوم', "Today's Deals")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t('خصومات تصل إلى 70%', 'Up to 70% off')}
              </p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-2 bg-card rounded-xl px-4 py-2 border border-border">
            <Clock className="h-4 w-4 text-destructive" />
            <span className="text-sm text-muted-foreground">{t('ينتهي خلال', 'Ends in')}</span>
            <div className="flex items-center gap-1 font-mono font-bold text-foreground">
              <span className="bg-destructive/10 text-destructive px-2 py-1 rounded-md">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-destructive">:</span>
              <span className="bg-destructive/10 text-destructive px-2 py-1 rounded-md">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-destructive">:</span>
              <span className="bg-destructive/10 text-destructive px-2 py-1 rounded-md">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Deals Carousel */}
        <div className="relative group">
          {/* Navigation Buttons */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute -start-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex"
            onClick={() => scroll(dir === 'rtl' ? 'right' : 'left')}
          >
            {dir === 'rtl' ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
          
          <Button
            variant="secondary"
            size="icon"
            className="absolute -end-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex"
            onClick={() => scroll(dir === 'rtl' ? 'left' : 'right')}
          >
            {dir === 'rtl' ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </Button>

          {/* Products */}
          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
          >
            {deals.map((product, idx) => {
              const Icon = product.icon;
              const discount = Math.round((1 - product.price / (product.originalPrice || product.price)) * 100);
              const inCart = isInCart(product.id);
              
              return (
                <div
                  key={product.id}
                  className="shrink-0 w-[200px] sm:w-[220px] bg-card rounded-xl border border-border overflow-hidden snap-start animate-fade-in hover:shadow-lg transition-shadow"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {/* Discount Badge */}
                  <div className="relative">
                    <span className="absolute top-2 start-2 z-10 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-md">
                      -{discount}%
                    </span>
                    <div className="aspect-[4/3] bg-secondary/30 flex items-center justify-center p-6">
                      <Icon className="h-12 w-12 text-primary" strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="p-3 space-y-2">
                    <h3 className="font-medium text-sm line-clamp-2 min-h-[2.5rem]">
                      {t(product.nameAr, product.nameEn)}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-service-gold fill-service-gold" />
                      <span className="text-xs text-muted-foreground">{product.rating}</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-foreground">${product.price}</span>
                      <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                    </div>

                    <Button 
                      size="sm" 
                      className={`w-full rounded-lg gap-1.5 ${inCart ? 'bg-accent text-accent-foreground' : ''}`}
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      {inCart ? t('في السلة', 'In Cart') : t('أضف للسلة', 'Add to Cart')}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
