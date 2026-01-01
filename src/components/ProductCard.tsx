import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/data/services';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Check, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  index: number;
}

export function ProductCard({ product, onQuickView, index }: ProductCardProps) {
  const { t } = useLanguage();
  const { addToCart, isInCart } = useCart();
  const Icon = product.icon;
  const inCart = isInCart(product.id);

  return (
    <div
      className="product-card group cursor-pointer animate-slide-up"
      style={{ animationDelay: `${Math.min(index * 40, 200)}ms` }}
    >
      {/* Badge */}
      {product.badge && (
        <span className={`absolute top-2 start-2 z-10 ${
          product.badge === 'bestseller' ? 'badge-bestseller' :
          product.badge === 'deal' ? 'badge-deal' : 'badge-new'
        }`}>
          {product.badge === 'bestseller' 
            ? t('الأفضل', 'Best') 
            : product.badge === 'deal' 
              ? t('عرض', 'Deal') 
              : t('جديد', 'New')
          }
        </span>
      )}

      {/* Quick View Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
        className="absolute top-2 end-2 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-background"
      >
        <Eye className="h-4 w-4 text-foreground" />
      </button>

      {/* Image/Icon */}
      <div 
        className="aspect-square bg-gradient-to-br from-secondary/50 to-secondary/20 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden"
        onClick={() => onQuickView(product)}
      >
        <Icon 
          className="h-10 w-10 sm:h-14 sm:w-14 text-primary transition-all duration-300 group-hover:scale-110" 
          strokeWidth={1.5} 
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 space-y-2">
        <h3 
          className="font-medium text-sm line-clamp-2 min-h-[2.5rem] text-foreground group-hover:text-primary transition-colors cursor-pointer"
          onClick={() => onQuickView(product)}
        >
          {t(product.nameAr, product.nameEn)}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center">
            <Star className="h-3.5 w-3.5 text-service-gold fill-service-gold" />
          </div>
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviews > 1000 ? `${(product.reviews/1000).toFixed(1)}k` : product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="price-current text-base sm:text-lg">${product.price}</span>
          {product.originalPrice && (
            <>
              <span className="price-old text-xs">${product.originalPrice}</span>
              <span className="price-discount text-[10px]">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            </>
          )}
        </div>

        {/* Add to Cart */}
        <Button 
          size="sm" 
          className={`w-full h-9 rounded-lg gap-1.5 text-xs sm:text-sm transition-all ${
            inCart 
              ? 'bg-accent text-accent-foreground hover:bg-accent/90' 
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
        >
          {inCart ? (
            <>
              <Check className="h-4 w-4" />
              {t('في السلة', 'In Cart')}
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              {t('أضف للسلة', 'Add')}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
