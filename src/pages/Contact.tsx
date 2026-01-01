import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Sun, Moon, Languages, ArrowRight, ArrowLeft,
  Mail, Phone, MapPin, MessageCircle, Send, Clock, CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Contact = () => {
  const { t, language, setLanguage, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form data
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: t('خطأ', 'Error'),
        description: t('يرجى ملء جميع الحقول المطلوبة', 'Please fill in all required fields'),
        variant: 'destructive'
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate submission and open WhatsApp
    setTimeout(() => {
      const message = encodeURIComponent(
        `📨 رسالة جديدة من الموقع\n\n` +
        `👤 الاسم: ${formData.name}\n` +
        `📧 البريد: ${formData.email}\n` +
        `📋 الموضوع: ${formData.subject || 'استفسار عام'}\n\n` +
        `💬 الرسالة:\n${formData.message}`
      );
      window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
      
      toast({
        title: t('تم الإرسال بنجاح', 'Sent Successfully'),
        description: t('سيتم التواصل معك قريباً', 'We will contact you soon'),
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const BackArrow = dir === 'rtl' ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      {/* Header */}
      <header className="sticky top-0 z-50 glass">
        <div className="container py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                  <BackArrow className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-md">
                  أ
                </div>
                <div className="hidden sm:block">
                  <h1 className="font-bold text-foreground leading-tight">{t('أسامة تك', 'Osama Tech')}</h1>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')} className="h-9 w-9 rounded-lg">
                <Languages className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9 rounded-lg">
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="py-8">
        <div className="container max-w-5xl">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {t('تواصل معنا', 'Contact Us')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('نحن هنا لمساعدتك. أرسل رسالتك وسنرد في أقرب وقت.', "We're here to help. Send your message and we'll respond shortly.")}
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Contact Info */}
            <div className="md:col-span-2 space-y-4">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-bold text-lg mb-6 text-foreground">
                  {t('معلومات التواصل', 'Contact Information')}
                </h3>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MessageCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{t('واتساب', 'WhatsApp')}</h4>
                      <a 
                        href="https://wa.me/1234567890" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        +1 234 567 890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{t('البريد الإلكتروني', 'Email')}</h4>
                      <a href="mailto:support@osamatech.com" className="text-sm text-accent hover:underline">
                        support@osamatech.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-service-green/10 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-service-green" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{t('ساعات العمل', 'Working Hours')}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t('24/7 متاح دائماً', '24/7 Always Available')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-service-purple/10 flex items-center justify-center shrink-0">
                      <CheckCircle className="h-5 w-5 text-service-purple" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{t('الرد السريع', 'Quick Response')}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t('نرد خلال دقائق', 'We respond within minutes')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick WhatsApp Button */}
              <a 
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 p-4 rounded-xl bg-service-green text-white font-medium hover:bg-service-green/90 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                {t('محادثة مباشرة عبر واتساب', 'Direct Chat via WhatsApp')}
              </a>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3">
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 border border-border space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {t('الاسم', 'Name')} <span className="text-destructive">*</span>
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder={t('أدخل اسمك', 'Enter your name')}
                      className="h-11 rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {t('البريد الإلكتروني', 'Email')} <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder={t('أدخل بريدك الإلكتروني', 'Enter your email')}
                      className="h-11 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {t('الموضوع', 'Subject')}
                  </label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder={t('موضوع الرسالة', 'Message subject')}
                    className="h-11 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {t('الرسالة', 'Message')} <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder={t('اكتب رسالتك هنا...', 'Write your message here...')}
                    className="min-h-[140px] rounded-xl resize-none"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-xl text-base font-medium gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      {t('إرسال الرسالة', 'Send Message')}
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
