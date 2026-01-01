import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items, removeFromCart, updateQuantity, getTotal, clearCart, getItemCount } = useCart();
  const { t, dir } = useLanguage();

  const handleWhatsAppOrder = () => {
    const itemsList = items.map(item => 
      `• ${item.product.nameAr} (x${item.quantity}) - $${(item.product.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const message = encodeURIComponent(
      `🛒 طلب جديد من أسامة تك\n\n${itemsList}\n\n💰 المجموع: $${getTotal().toFixed(2)}`
    );
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
    clearCart();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={dir === 'rtl' ? 'left' : 'right'} className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-4 border-b border-border shrink-0">
          <SheetTitle className="flex items-center gap-2 text-lg">
            <ShoppingBag className="h-5 w-5 text-primary" />
            {t('سلة التسوق', 'Shopping Cart')}
            {getItemCount() > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                ({getItemCount()} {t('عناصر', 'items')})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-center">
              {t('سلة التسوق فارغة', 'Your cart is empty')}
            </p>
            <p className="text-sm text-muted-foreground text-center mt-1">
              {t('أضف منتجات للبدء', 'Add products to get started')}
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-3">
                {items.map((item) => {
                  const Icon = item.product.icon;
                  return (
                    <div key={item.product.id} className="flex gap-3 p-3 bg-secondary/30 rounded-xl animate-fade-in">
                      <div className="w-16 h-16 shrink-0 rounded-lg bg-secondary flex items-center justify-center">
                        <Icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-1">
                          {t(item.product.nameAr, item.product.nameEn)}
                        </h4>
                        <p className="text-primary font-bold text-sm mt-1">
                          ${item.product.price}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-lg"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-lg"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-lg text-destructive hover:bg-destructive/10 ms-auto"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            <div className="shrink-0 p-4 border-t border-border bg-card/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t('المجموع', 'Total')}</span>
                <span className="text-2xl font-bold text-foreground">${getTotal().toFixed(2)}</span>
              </div>
              
              <Button 
                className="w-full h-12 text-base font-medium rounded-xl gap-2"
                onClick={handleWhatsAppOrder}
              >
                <MessageCircle className="h-5 w-5" />
                {t('إتمام الطلب عبر واتساب', 'Complete Order via WhatsApp')}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full rounded-xl"
                onClick={() => { clearCart(); }}
              >
                <X className="h-4 w-4 me-2" />
                {t('إفراغ السلة', 'Clear Cart')}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
