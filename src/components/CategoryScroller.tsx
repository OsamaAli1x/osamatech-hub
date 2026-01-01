import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { categories } from '@/data/services';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface CategoryScrollerProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function CategoryScroller({ selectedCategory, onSelectCategory }: CategoryScrollerProps) {
  const { t, dir } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-4 border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-16 z-40">
      <div className="container">
        <div className="relative group">
          {/* Navigation Buttons */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute -start-1 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
            onClick={() => scroll(dir === 'rtl' ? 'right' : 'left')}
          >
            {dir === 'rtl' ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="secondary"
            size="icon"
            className="absolute -end-1 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
            onClick={() => scroll(dir === 'rtl' ? 'left' : 'right')}
          >
            {dir === 'rtl' ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>

          {/* Categories */}
          <div 
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide px-1 py-1"
          >
            {/* Best Sellers */}
            <button
              onClick={() => onSelectCategory(null)}
              className={`category-btn shrink-0 flex items-center gap-2 ${!selectedCategory ? 'active' : ''}`}
            >
              <Sparkles className="h-4 w-4" />
              <span>{t('الأكثر مبيعاً', 'Best Sellers')}</span>
            </button>

            {/* Category Buttons */}
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`category-btn shrink-0 flex items-center gap-2 ${selectedCategory === cat.id ? 'active' : ''}`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="whitespace-nowrap">{t(cat.nameAr, cat.nameEn)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
