import { useState, useMemo } from 'react';
import { categories, getAllProducts, searchProducts, getFeaturedProducts, Product } from '@/data/services';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Languages, Search, Star, X, MessageCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Import images
import heroBanner from '@/assets/hero-banner.jpg';

const Index = () => {
  const { t, language, setLanguage, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const displayedProducts = useMemo(() => {
    if (searchQuery) {
      return searchProducts(searchQuery, language);
    }
    if (selectedCategory) {
      const category = categories.find(c => c.id === selectedCategory);
      return category?.products || [];
    }
    return getFeaturedProducts();
  }, [searchQuery, selectedCategory, language]);

  const selectedCategoryData = categories.find(c => c.id === selectedCategory);

  const handleWhatsAppOrder = (product: Product) => {
    const message = encodeURIComponent(
      `مرحباً، أرغب في طلب: ${product.nameAr}\nالسعر: $${product.price}`
    );
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      {/* Header */}
      <header className="sticky top-0 z-50 glass">
        <div className="container py-3">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-md">
                أ
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-foreground leading-tight">{t('أسامة تك', 'Osama Tech')}</h1>
                <p className="text-[11px] text-muted-foreground">{t('خدمات رقمية موثوقة', 'Trusted Digital Services')}</p>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-lg mx-auto">
              <div className="relative">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('ابحث عن المنتجات...', 'Search products...')}
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setSelectedCategory(null); }}
                  className="ps-10 h-10 bg-secondary/50 border-0 rounded-xl focus-ring"
                />
                {searchQuery && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute end-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-lg" 
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="h-9 w-9 rounded-lg"
              >
                <Languages className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-9 w-9 rounded-lg"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="pb-8">
        {/* Hero Section */}
        <section className="relative h-44 sm:h-56 md:h-64 overflow-hidden">
          <img 
            src={heroBanner} 
            alt="Osama Tech Digital Services" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 start-0 end-0 p-4 sm:p-6">
            <div className="container">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-shadow">
                {t('سوق الخدمات الرقمية', 'Digital Services Marketplace')}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                {t('أكثر من 100 خدمة رقمية احترافية', 'Over 100 professional digital services')}
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-4 border-b border-border/50">
          <div className="container">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}
                className={`category-btn shrink-0 ${!selectedCategory ? 'active' : ''}`}
              >
                {t('الأكثر مبيعاً', 'Best Sellers')}
              </button>
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.id); setSearchQuery(''); }}
                    className={`category-btn shrink-0 flex items-center gap-2 ${selectedCategory === cat.id ? 'active' : ''}`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{t(cat.nameAr, cat.nameEn)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Category Banner */}
        {selectedCategoryData && (
          <section className="py-4">
            <div className="container">
              <div className="relative h-28 sm:h-36 md:h-44 rounded-2xl overflow-hidden">
                <img 
                  src={selectedCategoryData.image} 
                  alt={t(selectedCategoryData.nameAr, selectedCategoryData.nameEn)} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
                <div className="absolute bottom-4 start-4 end-4 flex items-end justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground text-shadow">
                      {t(selectedCategoryData.nameAr, selectedCategoryData.nameEn)}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {selectedCategoryData.products.length} {t('منتج', 'products')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Products Section */}
        <section className="py-6">
          <div className="container">
            {/* Section Header */}
            <div className="section-header">
              <h2 className="section-title">
                {searchQuery 
                  ? t('نتائج البحث', 'Search Results') 
                  : selectedCategory 
                    ? t(selectedCategoryData?.nameAr || '', selectedCategoryData?.nameEn || '') 
                    : t('الأكثر مبيعاً', 'Best Sellers')
                }
                <span className="text-sm font-normal text-muted-foreground ms-2">
                  ({displayedProducts.length})
                </span>
              </h2>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {displayedProducts.map((product, idx) => {
                const Icon = product.icon;
                return (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="product-card cursor-pointer animate-slide-up"
                    style={{ animationDelay: `${Math.min(idx * 50, 300)}ms` }}
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

                    {/* Image/Icon */}
                    <div className="aspect-square bg-secondary/30 flex items-center justify-center p-6 relative overflow-hidden group">
                      <Icon 
                        className="h-14 w-14 sm:h-16 sm:w-16 text-primary transition-transform duration-300 group-hover:scale-110" 
                        strokeWidth={1.5} 
                      />
                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-4">
                      <h3 className="font-medium text-sm line-clamp-2 min-h-[2.5rem] text-foreground">
                        {t(product.nameAr, product.nameEn)}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="rating-stars">
                          <Star />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {product.rating} ({product.reviews.toLocaleString()})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="mt-2.5 flex items-center gap-2 flex-wrap">
                        <span className="price-current">${product.price}</span>
                        {product.originalPrice && (
                          <>
                            <span className="price-old">${product.originalPrice}</span>
                            <span className="price-discount">
                              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {displayedProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-lg">
                  {t('لا توجد نتائج', 'No results found')}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('جرب البحث بكلمات مختلفة', 'Try searching with different keywords')}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Product Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-md p-0 overflow-hidden">
          {selectedProduct && (
            <>
              {/* Product Image */}
              <div className="aspect-video bg-secondary/30 flex items-center justify-center relative">
                <selectedProduct.icon className="h-20 w-20 text-primary" strokeWidth={1.5} />
                {selectedProduct.badge && (
                  <span className={`absolute top-3 start-3 ${
                    selectedProduct.badge === 'bestseller' ? 'badge-bestseller' :
                    selectedProduct.badge === 'deal' ? 'badge-deal' : 'badge-new'
                  }`}>
                    {selectedProduct.badge === 'bestseller' 
                      ? t('الأفضل مبيعاً', 'Best Seller') 
                      : selectedProduct.badge === 'deal' 
                        ? t('عرض خاص', 'Special Deal') 
                        : t('جديد', 'New')
                    }
                  </span>
                )}
              </div>

              <div className="p-5 space-y-4">
                <DialogHeader className="space-y-1.5 p-0">
                  <DialogTitle className="text-xl">
                    {t(selectedProduct.nameAr, selectedProduct.nameEn)}
                  </DialogTitle>
                </DialogHeader>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(selectedProduct.descriptionAr, selectedProduct.descriptionEn)}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={i < Math.floor(selectedProduct.rating) ? '' : 'opacity-30'} />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{selectedProduct.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({selectedProduct.reviews.toLocaleString()} {t('تقييم', 'reviews')})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 py-2">
                  <span className="text-3xl font-bold text-foreground">${selectedProduct.price}</span>
                  {selectedProduct.originalPrice && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        ${selectedProduct.originalPrice}
                      </span>
                      <span className="price-discount text-sm">
                        {t('وفر', 'Save')} {Math.round((1 - selectedProduct.price / selectedProduct.originalPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Button 
                    className="flex-1 h-12 text-base font-medium rounded-xl"
                    onClick={() => handleWhatsAppOrder(selectedProduct)}
                  >
                    <MessageCircle className="h-5 w-5 me-2" />
                    {t('اطلب عبر واتساب', 'Order via WhatsApp')}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card/50">
        <div className="container text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              أ
            </div>
            <span className="font-bold text-foreground">{t('أسامة تك', 'Osama Tech')}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {t('© 2025 أسامة تك - جميع الحقوق محفوظة', '© 2025 Osama Tech - All rights reserved')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;