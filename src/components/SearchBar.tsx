import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  value: string;
}

export function SearchBar({ onSearch, value }: SearchBarProps) {
  const { t } = useLanguage();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div 
      className={`relative max-w-2xl mx-auto transition-all duration-300 ${
        isFocused ? 'scale-[1.02]' : ''
      }`}
    >
      <div className={`relative flex items-center rounded-2xl bg-card border-2 transition-all duration-300 ${
        isFocused 
          ? 'border-primary shadow-glow' 
          : 'border-border hover:border-primary/50'
      }`}>
        <Search className="absolute start-4 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder={t('ابحث عن خدمة...', 'Search for a service...')}
          value={value}
          onChange={(e) => onSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="h-14 border-0 bg-transparent ps-12 pe-12 text-base focus-visible:ring-0 placeholder:text-muted-foreground"
        />
        {value && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSearch('')}
            className="absolute end-2 h-8 w-8 rounded-full hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {/* Decorative glow */}
      <div className={`absolute inset-0 -z-10 rounded-2xl bg-primary/20 blur-xl transition-opacity duration-300 ${
        isFocused ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
}
