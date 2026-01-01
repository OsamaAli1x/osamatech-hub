import { Sun, Moon, Languages } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-border/50">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow">
            <span className="text-xl font-bold">أ</span>
            <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-service-teal animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">
              {t('أسامة تك', 'Osama Tech')}
            </h1>
            <p className="text-xs text-muted-foreground">
              {t('سوق الخدمات الرقمية', 'Digital Services Marketplace')}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            className="h-9 w-9 rounded-lg hover:bg-accent"
          >
            <Languages className="h-5 w-5" />
            <span className="sr-only">Toggle language</span>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9 rounded-lg hover:bg-accent"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-service-yellow transition-transform hover:rotate-45" />
            ) : (
              <Moon className="h-5 w-5 text-primary transition-transform hover:-rotate-12" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
