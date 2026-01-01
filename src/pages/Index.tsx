import { useState, useMemo } from 'react';
import { categories, getAllProducts, searchProducts, getFeaturedProducts, Product } from '@/data/services';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/contexts/CartContext';
import { Sun, Moon, Languages, Search, Star, X, MessageCircle, ShoppingCart, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';

// Components
import { CartSheet } from '@/components/CartSheet';
import { DealsSection } from '@/components/DealsSection';
import { CategoryScroller } from '@/components/CategoryScroller';
import { ProductCard } from '@/components/ProductCard';

// Import images
import heroBanner from '@/assets/hero-banner.jpg';

const Index = () => {
  const { t, language, setLanguage, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { addToCart, getItemCount, isInCart } = useCart();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

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
  const cartCount = getItemCount();

  const handleWhatsAppOrder = (product: Product) => {
    const message = encodeURIComponent(
      `مرحباً، أرغب في طلب: ${product.nameAr}\nالسعر: $${product.price}`
    );
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
  };

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      {/* Header */}
      <header className="sticky top-0 z-50 glass">
        <div className="container py-3">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-md">
                أ
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-foreground leading-tight">{t('أسامة تك', 'Osama Tech')}</h1>
                <p className="text-[11px] text-muted-foreground">{t('خدمات رقمية موثوقة', 'Trusted Digital Services')}</p>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('ابحث...', 'Search...')}
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setSelectedCategory(null); }}
                  className="ps-10 pe-9 h-10 bg-secondary/50 border-0 rounded-xl focus-ring text-sm"
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
                className="h-9 w-9 rounded-lg hidden sm:flex"
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
              
              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCartOpen(true)}
                className="h-9 w-9 rounded-lg relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount > 9 ? '9+' : cartCount}</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Scroller with Navigation Buttons */}
      <CategoryScroller 
        selectedCategory={selectedCategory} 
        onSelectCategory={handleCategorySelect} 
      />

      <main className="pb-24">
        {/* Hero Section */}
        <section className="relative h-36 sm:h-48 md:h-56 overflow-hidden">
          <img 
            src={heroBanner} 
            alt="Osama Tech Digital Services" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 start-0 end-0 p-4 sm:p-6">
            <div className="container">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground text-shadow">
                {t('سوق الخدمات الرقمية', 'Digital Services Marketplace')}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {t('أكثر من 100 خدمة رقمية احترافية', 'Over 100 professional digital services')}
              </p>
            </div>
          </div>
        </section>

        {/* Deals Section with Countdown */}
        <DealsSection />

        {/* Category Banner */}
        {selectedCategoryData && (
          <section className="py-4">
            <div className="container">
              <div className="relative h-24 sm:h-32 md:h-40 rounded-2xl overflow-hidden">
                <img 
                  src={selectedCategoryData.image} 
                  alt={t(selectedCategoryData.nameAr, selectedCategoryData.nameEn)} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
                <div className="absolute bottom-3 sm:bottom-4 start-4 end-4">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground text-shadow">
                    {t(selectedCategoryData.nameAr, selectedCategoryData.nameEn)}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    {selectedCategoryData.products.length} {t('منتج', 'products')}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Products Section */}
        <section className="py-5">
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

            {/* Products Grid - Improved for Mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-4">
              {displayedProducts.map((product, idx) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onQuickView={setSelectedProduct}
                  index={idx}
                />
              ))}
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
              <div className="aspect-[16/10] bg-gradient-to-br from-secondary/50 to-secondary/20 flex items-center justify-center relative">
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
                    className={`flex-1 h-12 text-base font-medium rounded-xl gap-2 ${isInCart(selectedProduct.id) ? 'bg-accent hover:bg-accent/90' : ''}`}
                    onClick={() => { addToCart(selectedProduct); }}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {isInCart(selectedProduct.id) ? t('في السلة', 'In Cart') : t('أضف للسلة', 'Add to Cart')}
                  </Button>
                  <Button 
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-xl shrink-0"
                    onClick={() => handleWhatsAppOrder(selectedProduct)}
                  >
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Cart Sheet */}
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />

      {/* Floating Buttons */}
      <div className="fixed bottom-6 start-4 end-4 z-40 flex justify-between items-end pointer-events-none">
        {/* Contact Button */}
        <Link to="/contact" className="pointer-events-auto">
          <button className="floating-btn bg-accent text-accent-foreground">
            <Phone className="h-6 w-6" />
          </button>
        </Link>

        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/1234567890" 
          target="_blank" 
          rel="noopener noreferrer"
          className="pointer-events-auto"
        >
          <button className="floating-btn bg-service-green text-white">
            <MessageCircle className="h-6 w-6" />
          </button>
        </a>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-6 bg-card/50">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                أ
              </div>
              <span className="font-bold text-foreground">{t('أسامة تك', 'Osama Tech')}</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('تواصل معنا', 'Contact Us')}
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('© 2025 أسامة تك', '© 2025 Osama Tech')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
