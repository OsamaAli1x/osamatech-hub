import { useState, useMemo } from 'react';
import { categories, getAllProducts, searchProducts, getFeaturedProducts, Product } from '@/data/services';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Languages, Search, Star, ShoppingCart, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="container flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">أ</div>
            <span className="font-bold text-foreground hidden sm:block">{t('أسامة تك', 'Osama Tech')}</span>
          </div>

          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('ابحث عن منتج...', 'Search products...')}
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setSelectedCategory(null); }}
                className="ps-10 h-10 bg-secondary border-0"
              />
              {searchQuery && (
                <Button variant="ghost" size="icon" className="absolute end-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setSearchQuery('')}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')} className="h-9 w-9">
              <Languages className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative h-48 md:h-64 overflow-hidden">
          <img src={heroBanner} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-4 start-4 end-4">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t('سوق الخدمات الرقمية', 'Digital Services Marketplace')}</h1>
            <p className="text-sm text-muted-foreground mt-1">{t('أكثر من 100 خدمة رقمية مميزة', 'Over 100 premium digital services')}</p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-4 border-b border-border">
          <div className="container">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <Button
                variant={!selectedCategory ? "default" : "secondary"}
                size="sm"
                onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}
                className="shrink-0"
              >
                {t('الأكثر مبيعاً', 'Best Sellers')}
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "secondary"}
                  size="sm"
                  onClick={() => { setSelectedCategory(cat.id); setSearchQuery(''); }}
                  className="shrink-0"
                >
                  <cat.icon className="h-4 w-4 me-1" />
                  {t(cat.nameAr, cat.nameEn)}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Category Image */}
        {selectedCategoryData && (
          <section className="py-4">
            <div className="container">
              <div className="relative h-32 md:h-40 rounded-xl overflow-hidden">
                <img src={selectedCategoryData.image} alt={t(selectedCategoryData.nameAr, selectedCategoryData.nameEn)} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <h2 className="absolute bottom-4 start-4 text-xl font-bold">{t(selectedCategoryData.nameAr, selectedCategoryData.nameEn)}</h2>
              </div>
            </div>
          </section>
        )}

        {/* Products Grid */}
        <section className="py-6">
          <div className="container">
            <h2 className="text-lg font-bold mb-4">
              {searchQuery ? t('نتائج البحث', 'Search Results') : selectedCategory ? t(selectedCategoryData?.nameAr || '', selectedCategoryData?.nameEn || '') : t('الأكثر مبيعاً', 'Best Sellers')}
              <span className="text-sm font-normal text-muted-foreground ms-2">({displayedProducts.length})</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {displayedProducts.map((product, idx) => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="product-card cursor-pointer animate-fade-up"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {product.badge && (
                    <span className={`absolute top-2 start-2 text-xs font-bold px-2 py-0.5 rounded z-10 ${product.badge === 'bestseller' ? 'bg-primary text-primary-foreground' : product.badge === 'deal' ? 'bg-destructive text-destructive-foreground' : 'bg-accent text-accent-foreground'}`}>
                      {product.badge === 'bestseller' ? t('الأكثر مبيعاً', 'Best Seller') : product.badge === 'deal' ? t('عرض', 'Deal') : t('جديد', 'New')}
                    </span>
                  )}
                  <div className="aspect-square bg-secondary/50 flex items-center justify-center p-4">
                    <product.icon className="h-12 w-12 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm line-clamp-2 h-10">{t(product.nameAr, product.nameEn)}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <span className="text-xs text-muted-foreground">{product.rating} ({product.reviews})</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-lg font-bold text-foreground">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {displayedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t('لا توجد نتائج', 'No results found')}</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Product Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-md">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>{t(selectedProduct.nameAr, selectedProduct.nameEn)}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                  <selectedProduct.icon className="h-16 w-16 text-primary" strokeWidth={1.5} />
                </div>
                <p className="text-muted-foreground">{t(selectedProduct.descriptionAr, selectedProduct.descriptionEn)}</p>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span>{selectedProduct.rating}</span>
                  <span className="text-muted-foreground">({selectedProduct.reviews} {t('تقييم', 'reviews')})</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold">${selectedProduct.price}</span>
                  {selectedProduct.originalPrice && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">${selectedProduct.originalPrice}</span>
                      <span className="text-sm font-bold text-destructive">-{Math.round((1 - selectedProduct.price / selectedProduct.originalPrice) * 100)}%</span>
                    </>
                  )}
                </div>
                <Button className="w-full" size="lg">
                  <ShoppingCart className="h-5 w-5 me-2" />
                  {t('اطلب الآن', 'Order Now')}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t border-border py-6 bg-card">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">{t('© 2025 أسامة تك - جميع الحقوق محفوظة', '© 2025 Osama Tech - All rights reserved')}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
