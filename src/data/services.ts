import type { LucideIcon } from 'lucide-react';
import { 
  Package, Mail, GraduationCap, BookOpen, Cloud, Shield, 
  Bot, Play, Wrench, Lock, Users, Gamepad2, Crown, FileText, 
  Globe, Palette, Camera, Music, Video, Database,
  Code, ShoppingCart, CreditCard, Headphones,
  Laptop, Monitor, Server, Wifi, Download, Settings,
  Heart, Star, Zap, Target, Briefcase, Building,
  Calendar, Bell, Search, Layers,
  Grid, Edit, Check,
  AlertCircle, HelpCircle,
  RefreshCw,
  Award, Gift,
  TrendingUp, BarChart, HardDrive,
  Printer, Image, Film, Volume2,
} from 'lucide-react';

// Import product images
import softwareImg from '@/assets/products/software.jpg';
import streamingImg from '@/assets/products/streaming.jpg';
import aiToolsImg from '@/assets/products/ai-tools.jpg';
import vpnImg from '@/assets/products/vpn.jpg';
import coursesImg from '@/assets/products/courses.jpg';
import cloudStorageImg from '@/assets/products/cloud-storage.jpg';
import gamingImg from '@/assets/products/gaming.jpg';
import googleAccountsImg from '@/assets/products/google-accounts.jpg';
import booksImg from '@/assets/products/books.jpg';
import securityImg from '@/assets/products/security.jpg';
import socialMediaImg from '@/assets/products/social-media.jpg';
import techServicesImg from '@/assets/products/tech-services.jpg';
import vipImg from '@/assets/products/vip.jpg';
import filesImg from '@/assets/products/files.jpg';
import webServicesImg from '@/assets/products/web-services.jpg';

export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: LucideIcon;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: 'bestseller' | 'deal' | 'new';
  inStock: boolean;
}

export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: LucideIcon;
  image: string;
  color: string;
  products: Product[];
}

export const categories: Category[] = [
  {
    id: 'software',
    nameAr: 'البرامج والتفعيلات',
    nameEn: 'Software & Activations',
    icon: Package,
    image: softwareImg,
    color: 'blue',
    products: [
      { id: 's1', nameAr: 'ويندوز 11 برو', nameEn: 'Windows 11 Pro', descriptionAr: 'تفعيل أصلي مدى الحياة مع ضمان كامل', descriptionEn: 'Lifetime original activation with full guarantee', icon: Monitor, category: 'software', price: 49, originalPrice: 199, rating: 4.8, reviews: 2341, badge: 'bestseller', inStock: true },
      { id: 's2', nameAr: 'مايكروسوفت أوفيس 365', nameEn: 'Microsoft Office 365', descriptionAr: 'اشتراك سنوي كامل لجميع التطبيقات', descriptionEn: 'Full yearly subscription for all apps', icon: FileText, category: 'software', price: 79, originalPrice: 149, rating: 4.9, reviews: 1823, badge: 'deal', inStock: true },
      { id: 's3', nameAr: 'أدوبي كريتيف كلاود', nameEn: 'Adobe Creative Cloud', descriptionAr: 'جميع تطبيقات أدوبي الإبداعية', descriptionEn: 'All Adobe creative apps', icon: Palette, category: 'software', price: 129, originalPrice: 599, rating: 4.7, reviews: 956, badge: 'deal', inStock: true },
      { id: 's4', nameAr: 'كاسبرسكي انتي فايروس', nameEn: 'Kaspersky Antivirus', descriptionAr: 'حماية شاملة لمدة سنة كاملة', descriptionEn: 'Complete protection for one year', icon: Shield, category: 'software', price: 29, rating: 4.6, reviews: 567, inStock: true },
      { id: 's5', nameAr: 'فوتوشوب 2024', nameEn: 'Photoshop 2024', descriptionAr: 'نسخة كاملة مع تفعيل دائم', descriptionEn: 'Full version with permanent activation', icon: Image, category: 'software', price: 59, originalPrice: 299, rating: 4.8, reviews: 1245, inStock: true },
      { id: 's6', nameAr: 'بريميير برو 2024', nameEn: 'Premiere Pro 2024', descriptionAr: 'مونتاج احترافي بدون حدود', descriptionEn: 'Professional editing without limits', icon: Video, category: 'software', price: 69, originalPrice: 349, rating: 4.7, reviews: 834, inStock: true },
    ]
  },
  {
    id: 'streaming',
    nameAr: 'اشتراكات البث',
    nameEn: 'Streaming Subscriptions',
    icon: Play,
    image: streamingImg,
    color: 'red',
    products: [
      { id: 'str1', nameAr: 'نتفليكس بريميوم', nameEn: 'Netflix Premium', descriptionAr: '4K UHD بدون إعلانات - شهر كامل', descriptionEn: '4K UHD ad-free - full month', icon: Play, category: 'streaming', price: 15, rating: 4.9, reviews: 5234, badge: 'bestseller', inStock: true },
      { id: 'str2', nameAr: 'سبوتيفاي بريميوم', nameEn: 'Spotify Premium', descriptionAr: 'موسيقى غير محدودة بجودة عالية', descriptionEn: 'Unlimited high quality music', icon: Music, category: 'streaming', price: 9, rating: 4.8, reviews: 3456, badge: 'bestseller', inStock: true },
      { id: 'str3', nameAr: 'ديزني+ سنوي', nameEn: 'Disney+ Yearly', descriptionAr: 'اشتراك سنوي كامل محتوى عائلي', descriptionEn: 'Full year family content subscription', icon: Star, category: 'streaming', price: 89, originalPrice: 120, rating: 4.7, reviews: 1234, badge: 'deal', inStock: true },
      { id: 'str4', nameAr: 'أمازون برايم فيديو', nameEn: 'Amazon Prime Video', descriptionAr: 'أفلام ومسلسلات حصرية', descriptionEn: 'Exclusive movies and series', icon: Play, category: 'streaming', price: 12, rating: 4.6, reviews: 876, inStock: true },
      { id: 'str5', nameAr: 'يوتيوب بريميوم', nameEn: 'YouTube Premium', descriptionAr: 'بدون إعلانات + يوتيوب ميوزك', descriptionEn: 'Ad-free + YouTube Music', icon: Play, category: 'streaming', price: 11, rating: 4.8, reviews: 2345, inStock: true },
      { id: 'str6', nameAr: 'HBO ماكس', nameEn: 'HBO Max', descriptionAr: 'أفلام ومسلسلات HBO الحصرية', descriptionEn: 'Exclusive HBO movies and series', icon: Film, category: 'streaming', price: 14, rating: 4.5, reviews: 654, inStock: true },
    ]
  },
  {
    id: 'ai',
    nameAr: 'أدوات الذكاء الاصطناعي',
    nameEn: 'AI Tools',
    icon: Bot,
    image: aiToolsImg,
    color: 'teal',
    products: [
      { id: 'ai1', nameAr: 'ChatGPT Plus', nameEn: 'ChatGPT Plus', descriptionAr: 'GPT-4o بدون حدود - شهر كامل', descriptionEn: 'Unlimited GPT-4o - full month', icon: Bot, category: 'ai', price: 25, rating: 4.9, reviews: 4567, badge: 'bestseller', inStock: true },
      { id: 'ai2', nameAr: 'Midjourney Pro', nameEn: 'Midjourney Pro', descriptionAr: 'توليد صور فنية احترافية', descriptionEn: 'Professional AI art generation', icon: Image, category: 'ai', price: 35, rating: 4.8, reviews: 2134, badge: 'new', inStock: true },
      { id: 'ai3', nameAr: 'Claude Pro', nameEn: 'Claude Pro', descriptionAr: 'ذكاء اصطناعي متقدم من Anthropic', descriptionEn: 'Advanced AI from Anthropic', icon: Bot, category: 'ai', price: 25, rating: 4.7, reviews: 1456, inStock: true },
      { id: 'ai4', nameAr: 'Gemini Advanced', nameEn: 'Gemini Advanced', descriptionAr: 'أقوى نموذج من جوجل', descriptionEn: 'Google\'s most capable model', icon: Star, category: 'ai', price: 22, rating: 4.6, reviews: 987, badge: 'new', inStock: true },
      { id: 'ai5', nameAr: 'Copilot Pro', nameEn: 'Copilot Pro', descriptionAr: 'مساعد برمجة ذكي من مايكروسوفت', descriptionEn: 'Smart coding assistant from Microsoft', icon: Code, category: 'ai', price: 20, rating: 4.7, reviews: 1234, inStock: true },
      { id: 'ai6', nameAr: 'Perplexity Pro', nameEn: 'Perplexity Pro', descriptionAr: 'محرك بحث ذكي بالذكاء الاصطناعي', descriptionEn: 'AI-powered smart search engine', icon: Search, category: 'ai', price: 22, rating: 4.5, reviews: 654, inStock: true },
    ]
  },
  {
    id: 'vpn',
    nameAr: 'VPN والخصوصية',
    nameEn: 'VPN & Privacy',
    icon: Shield,
    image: vpnImg,
    color: 'green',
    products: [
      { id: 'v1', nameAr: 'NordVPN سنوي', nameEn: 'NordVPN Yearly', descriptionAr: 'أفضل VPN عالمياً - سنة كاملة', descriptionEn: 'World\'s best VPN - full year', icon: Shield, category: 'vpn', price: 49, originalPrice: 143, rating: 4.9, reviews: 3456, badge: 'bestseller', inStock: true },
      { id: 'v2', nameAr: 'ExpressVPN', nameEn: 'ExpressVPN', descriptionAr: 'سرعة فائقة وأمان مطلق', descriptionEn: 'Ultra-fast speed and absolute security', icon: Zap, category: 'vpn', price: 59, originalPrice: 155, rating: 4.8, reviews: 2345, inStock: true },
      { id: 'v3', nameAr: 'Surfshark', nameEn: 'Surfshark', descriptionAr: 'أجهزة غير محدودة - سنتين', descriptionEn: 'Unlimited devices - 2 years', icon: Wifi, category: 'vpn', price: 45, originalPrice: 125, rating: 4.7, reviews: 1876, badge: 'deal', inStock: true },
      { id: 'v4', nameAr: '1Password', nameEn: '1Password', descriptionAr: 'مدير كلمات مرور آمن', descriptionEn: 'Secure password manager', icon: Lock, category: 'vpn', price: 35, rating: 4.8, reviews: 1234, inStock: true },
      { id: 'v5', nameAr: 'ProtonVPN Plus', nameEn: 'ProtonVPN Plus', descriptionAr: 'خصوصية سويسرية مطلقة', descriptionEn: 'Absolute Swiss privacy', icon: Lock, category: 'vpn', price: 55, rating: 4.6, reviews: 876, inStock: true },
    ]
  },
  {
    id: 'courses',
    nameAr: 'الكورسات والدورات',
    nameEn: 'Courses & Training',
    icon: GraduationCap,
    image: coursesImg,
    color: 'indigo',
    products: [
      { id: 'c1', nameAr: 'Udemy Business', nameEn: 'Udemy Business', descriptionAr: 'وصول لآلاف الكورسات الاحترافية', descriptionEn: 'Access thousands of professional courses', icon: GraduationCap, category: 'courses', price: 19, rating: 4.8, reviews: 5678, badge: 'bestseller', inStock: true },
      { id: 'c2', nameAr: 'Coursera Plus', nameEn: 'Coursera Plus', descriptionAr: 'شهادات معتمدة من أفضل الجامعات', descriptionEn: 'Certificates from top universities', icon: Award, category: 'courses', price: 49, rating: 4.9, reviews: 3456, badge: 'bestseller', inStock: true },
      { id: 'c3', nameAr: 'LinkedIn Learning', nameEn: 'LinkedIn Learning', descriptionAr: 'تطوير مهني وشهادات لينكدإن', descriptionEn: 'Professional development & LinkedIn certificates', icon: Briefcase, category: 'courses', price: 29, rating: 4.7, reviews: 2134, inStock: true },
      { id: 'c4', nameAr: 'Skillshare Premium', nameEn: 'Skillshare Premium', descriptionAr: 'مهارات إبداعية وفنية', descriptionEn: 'Creative and artistic skills', icon: Palette, category: 'courses', price: 15, rating: 4.6, reviews: 1567, inStock: true },
      { id: 'c5', nameAr: 'MasterClass', nameEn: 'MasterClass', descriptionAr: 'تعلم من خبراء عالميين', descriptionEn: 'Learn from world experts', icon: Crown, category: 'courses', price: 89, originalPrice: 180, rating: 4.8, reviews: 987, badge: 'deal', inStock: true },
    ]
  },
  {
    id: 'storage',
    nameAr: 'التخزين السحابي',
    nameEn: 'Cloud Storage',
    icon: Cloud,
    image: cloudStorageImg,
    color: 'cyan',
    products: [
      { id: 'st1', nameAr: 'Google One 2TB', nameEn: 'Google One 2TB', descriptionAr: 'تخزين سحابي ضخم - سنة', descriptionEn: 'Huge cloud storage - yearly', icon: Cloud, category: 'storage', price: 99, rating: 4.9, reviews: 2345, badge: 'bestseller', inStock: true },
      { id: 'st2', nameAr: 'iCloud+ 2TB', nameEn: 'iCloud+ 2TB', descriptionAr: 'لأجهزة أبل - سنة كاملة', descriptionEn: 'For Apple devices - full year', icon: Cloud, category: 'storage', price: 109, rating: 4.8, reviews: 1876, inStock: true },
      { id: 'st3', nameAr: 'OneDrive 1TB', nameEn: 'OneDrive 1TB', descriptionAr: 'تكامل مع مايكروسوفت أوفيس', descriptionEn: 'Microsoft Office integration', icon: Cloud, category: 'storage', price: 69, rating: 4.7, reviews: 1234, inStock: true },
      { id: 'st4', nameAr: 'Dropbox Plus', nameEn: 'Dropbox Plus', descriptionAr: 'مشاركة ملفات سهلة وآمنة', descriptionEn: 'Easy and secure file sharing', icon: Download, category: 'storage', price: 79, rating: 4.6, reviews: 876, inStock: true },
    ]
  },
  {
    id: 'gaming',
    nameAr: 'الألعاب والترفيه',
    nameEn: 'Gaming & Entertainment',
    icon: Gamepad2,
    image: gamingImg,
    color: 'purple',
    products: [
      { id: 'g1', nameAr: 'Xbox Game Pass Ultimate', nameEn: 'Xbox Game Pass Ultimate', descriptionAr: 'مئات الألعاب + EA Play + Cloud', descriptionEn: 'Hundreds of games + EA Play + Cloud', icon: Gamepad2, category: 'gaming', price: 15, rating: 4.9, reviews: 6789, badge: 'bestseller', inStock: true },
      { id: 'g2', nameAr: 'PlayStation Plus Premium', nameEn: 'PlayStation Plus Premium', descriptionAr: 'لعب أونلاين + كتالوج ألعاب', descriptionEn: 'Online play + game catalog', icon: Gamepad2, category: 'gaming', price: 17, rating: 4.8, reviews: 4567, inStock: true },
      { id: 'g3', nameAr: 'Nintendo Switch Online', nameEn: 'Nintendo Switch Online', descriptionAr: 'ألعاب كلاسيكية + أونلاين', descriptionEn: 'Classic games + online', icon: Gamepad2, category: 'gaming', price: 19, rating: 4.7, reviews: 2345, inStock: true },
      { id: 'g4', nameAr: 'Steam Wallet $50', nameEn: 'Steam Wallet $50', descriptionAr: 'رصيد ستيم لشراء الألعاب', descriptionEn: 'Steam credit for buying games', icon: CreditCard, category: 'gaming', price: 52, rating: 4.9, reviews: 3456, badge: 'bestseller', inStock: true },
      { id: 'g5', nameAr: 'EA Play Pro', nameEn: 'EA Play Pro', descriptionAr: 'جميع ألعاب EA الجديدة', descriptionEn: 'All new EA games', icon: Gamepad2, category: 'gaming', price: 14, rating: 4.6, reviews: 1234, inStock: true },
    ]
  },
  {
    id: 'accounts',
    nameAr: 'حسابات جوجل',
    nameEn: 'Google Accounts',
    icon: Mail,
    image: googleAccountsImg,
    color: 'coral',
    products: [
      { id: 'a1', nameAr: 'إنشاء حساب جوجل', nameEn: 'Create Google Account', descriptionAr: 'حساب جديد مؤمن ومفعل', descriptionEn: 'New secured and activated account', icon: Mail, category: 'accounts', price: 5, rating: 4.8, reviews: 4567, badge: 'bestseller', inStock: true },
      { id: 'a2', nameAr: 'استرداد حساب جوجل', nameEn: 'Google Account Recovery', descriptionAr: 'استعادة الحساب المفقود أو المحظور', descriptionEn: 'Recover lost or banned account', icon: RefreshCw, category: 'accounts', price: 25, rating: 4.7, reviews: 1234, inStock: true },
      { id: 'a3', nameAr: 'تأمين حساب جوجل', nameEn: 'Secure Google Account', descriptionAr: 'حماية متقدمة ضد الاختراق', descriptionEn: 'Advanced protection against hacking', icon: Lock, category: 'accounts', price: 15, rating: 4.6, reviews: 876, inStock: true },
      { id: 'a4', nameAr: 'Google Workspace', nameEn: 'Google Workspace', descriptionAr: 'بريد احترافي للشركات', descriptionEn: 'Professional business email', icon: Briefcase, category: 'accounts', price: 12, rating: 4.9, reviews: 2345, inStock: true },
    ]
  },
  {
    id: 'books',
    nameAr: 'الكتب والمراجع',
    nameEn: 'Books & References',
    icon: BookOpen,
    image: booksImg,
    color: 'orange',
    products: [
      { id: 'b1', nameAr: 'Kindle Unlimited', nameEn: 'Kindle Unlimited', descriptionAr: 'ملايين الكتب الإلكترونية', descriptionEn: 'Millions of ebooks', icon: BookOpen, category: 'books', price: 11, rating: 4.8, reviews: 3456, badge: 'bestseller', inStock: true },
      { id: 'b2', nameAr: 'Audible Premium', nameEn: 'Audible Premium', descriptionAr: 'كتب صوتية غير محدودة', descriptionEn: 'Unlimited audiobooks', icon: Headphones, category: 'books', price: 15, rating: 4.7, reviews: 2134, inStock: true },
      { id: 'b3', nameAr: 'Scribd Premium', nameEn: 'Scribd Premium', descriptionAr: 'كتب ومجلات ووثائق', descriptionEn: 'Books, magazines and documents', icon: FileText, category: 'books', price: 12, rating: 4.6, reviews: 1567, inStock: true },
      { id: 'b4', nameAr: 'Blinkist Premium', nameEn: 'Blinkist Premium', descriptionAr: 'ملخصات كتب في 15 دقيقة', descriptionEn: 'Book summaries in 15 minutes', icon: Zap, category: 'books', price: 9, rating: 4.5, reviews: 987, badge: 'new', inStock: true },
    ]
  },
  {
    id: 'security',
    nameAr: 'الأمن السيبراني',
    nameEn: 'Cyber Security',
    icon: Lock,
    image: securityImg,
    color: 'purple',
    products: [
      { id: 'sec1', nameAr: 'فحص أمني شامل', nameEn: 'Complete Security Scan', descriptionAr: 'كشف الثغرات والتهديدات', descriptionEn: 'Detect vulnerabilities and threats', icon: Search, category: 'security', price: 49, rating: 4.9, reviews: 876, badge: 'bestseller', inStock: true },
      { id: 'sec2', nameAr: 'إزالة الفيروسات', nameEn: 'Virus Removal', descriptionAr: 'تنظيف شامل وحماية كاملة', descriptionEn: 'Complete cleanup and protection', icon: Shield, category: 'security', price: 35, rating: 4.8, reviews: 654, inStock: true },
      { id: 'sec3', nameAr: 'تأمين الحسابات', nameEn: 'Account Security', descriptionAr: 'حماية متقدمة لجميع حساباتك', descriptionEn: 'Advanced protection for all accounts', icon: Lock, category: 'security', price: 29, rating: 4.7, reviews: 543, inStock: true },
    ]
  },
  {
    id: 'social',
    nameAr: 'السوشيال ميديا',
    nameEn: 'Social Media',
    icon: Users,
    image: socialMediaImg,
    color: 'pink',
    products: [
      { id: 'so1', nameAr: 'توثيق انستغرام', nameEn: 'Instagram Verification', descriptionAr: 'العلامة الزرقاء الرسمية', descriptionEn: 'Official blue badge', icon: Check, category: 'social', price: 199, rating: 4.6, reviews: 234, badge: 'new', inStock: true },
      { id: 'so2', nameAr: 'استرداد حساب انستغرام', nameEn: 'Instagram Account Recovery', descriptionAr: 'استعادة الحساب المحظور', descriptionEn: 'Recover banned account', icon: RefreshCw, category: 'social', price: 49, rating: 4.7, reviews: 567, inStock: true },
      { id: 'so3', nameAr: 'إدارة حسابات', nameEn: 'Account Management', descriptionAr: 'محتوى احترافي شهري', descriptionEn: 'Monthly professional content', icon: Grid, category: 'social', price: 99, rating: 4.5, reviews: 345, inStock: true },
    ]
  },
  {
    id: 'tech',
    nameAr: 'خدمات تقنية',
    nameEn: 'Technical Services',
    icon: Wrench,
    image: techServicesImg,
    color: 'yellow',
    products: [
      { id: 't1', nameAr: 'صيانة الكمبيوتر', nameEn: 'PC Maintenance', descriptionAr: 'إصلاح وتسريع عن بعد', descriptionEn: 'Remote repair and optimization', icon: Laptop, category: 'tech', price: 25, rating: 4.8, reviews: 1234, badge: 'bestseller', inStock: true },
      { id: 't2', nameAr: 'تثبيت البرامج', nameEn: 'Software Installation', descriptionAr: 'إعداد كامل لجهازك', descriptionEn: 'Complete setup for your device', icon: Download, category: 'tech', price: 15, rating: 4.7, reviews: 876, inStock: true },
      { id: 't3', nameAr: 'استعادة البيانات', nameEn: 'Data Recovery', descriptionAr: 'استرجاع الملفات المحذوفة', descriptionEn: 'Recover deleted files', icon: RefreshCw, category: 'tech', price: 45, rating: 4.9, reviews: 654, inStock: true },
      { id: 't4', nameAr: 'استشارات تقنية', nameEn: 'Tech Consulting', descriptionAr: 'نصائح الخبراء لمشاكلك', descriptionEn: 'Expert advice for your problems', icon: HelpCircle, category: 'tech', price: 19, rating: 4.6, reviews: 432, inStock: true },
    ]
  },
  {
    id: 'vip',
    nameAr: 'باقات VIP',
    nameEn: 'VIP Packages',
    icon: Crown,
    image: vipImg,
    color: 'gold',
    products: [
      { id: 'vip1', nameAr: 'باقة المطور الشاملة', nameEn: 'Complete Developer Package', descriptionAr: 'كل أدوات المطور في باقة واحدة', descriptionEn: 'All developer tools in one package', icon: Code, category: 'vip', price: 299, originalPrice: 599, rating: 4.9, reviews: 456, badge: 'deal', inStock: true },
      { id: 'vip2', nameAr: 'باقة المصمم المحترف', nameEn: 'Pro Designer Package', descriptionAr: 'أدوبي + فيجما + كانفا برو', descriptionEn: 'Adobe + Figma + Canva Pro', icon: Palette, category: 'vip', price: 199, originalPrice: 450, rating: 4.8, reviews: 345, badge: 'deal', inStock: true },
      { id: 'vip3', nameAr: 'باقة الترفيه الشاملة', nameEn: 'Complete Entertainment', descriptionAr: 'نتفليكس + سبوتيفاي + ديزني+', descriptionEn: 'Netflix + Spotify + Disney+', icon: Play, category: 'vip', price: 35, originalPrice: 50, rating: 4.9, reviews: 1234, badge: 'bestseller', inStock: true },
    ]
  },
  {
    id: 'files',
    nameAr: 'ملفات وموارد',
    nameEn: 'Files & Resources',
    icon: FileText,
    image: filesImg,
    color: 'lime',
    products: [
      { id: 'f1', nameAr: 'قوالب بوربوينت احترافية', nameEn: 'Pro PowerPoint Templates', descriptionAr: '+500 قالب احترافي', descriptionEn: '500+ professional templates', icon: FileText, category: 'files', price: 19, rating: 4.7, reviews: 876, badge: 'bestseller', inStock: true },
      { id: 'f2', nameAr: 'خطوط عربية مميزة', nameEn: 'Premium Arabic Fonts', descriptionAr: '+200 خط عربي فريد', descriptionEn: '200+ unique Arabic fonts', icon: Palette, category: 'files', price: 15, rating: 4.6, reviews: 543, inStock: true },
      { id: 'f3', nameAr: 'أيقونات ورموز SVG', nameEn: 'SVG Icons Pack', descriptionAr: '+10,000 أيقونة متجهة', descriptionEn: '10,000+ vector icons', icon: Star, category: 'files', price: 25, rating: 4.8, reviews: 432, inStock: true },
    ]
  },
  {
    id: 'web',
    nameAr: 'خدمات ويب',
    nameEn: 'Web Services',
    icon: Globe,
    image: webServicesImg,
    color: 'teal',
    products: [
      { id: 'w1', nameAr: 'دومين + استضافة سنوية', nameEn: 'Domain + Yearly Hosting', descriptionAr: 'نطاق .com + استضافة سريعة', descriptionEn: '.com domain + fast hosting', icon: Globe, category: 'web', price: 49, rating: 4.8, reviews: 1234, badge: 'bestseller', inStock: true },
      { id: 'w2', nameAr: 'تصميم موقع احترافي', nameEn: 'Professional Website Design', descriptionAr: 'تصميم عصري متجاوب', descriptionEn: 'Modern responsive design', icon: Palette, category: 'web', price: 199, rating: 4.9, reviews: 567, inStock: true },
      { id: 'w3', nameAr: 'متجر إلكتروني كامل', nameEn: 'Complete E-commerce Store', descriptionAr: 'متجر جاهز للبيع مباشرة', descriptionEn: 'Store ready to sell immediately', icon: ShoppingCart, category: 'web', price: 299, rating: 4.7, reviews: 345, badge: 'new', inStock: true },
      { id: 'w4', nameAr: 'شهادة SSL', nameEn: 'SSL Certificate', descriptionAr: 'تأمين موقعك بـ HTTPS', descriptionEn: 'Secure your site with HTTPS', icon: Lock, category: 'web', price: 29, rating: 4.6, reviews: 234, inStock: true },
    ]
  },
];

export const getAllProducts = (): Product[] => {
  return categories.flatMap(cat => cat.products);
};

export const getFeaturedProducts = (): Product[] => {
  const all = getAllProducts();
  return all.filter(p => p.badge === 'bestseller' || p.badge === 'deal').slice(0, 8);
};

export const getDeals = (): Product[] => {
  return getAllProducts().filter(p => p.originalPrice && p.originalPrice > p.price);
};

export const searchProducts = (query: string, language: 'ar' | 'en'): Product[] => {
  const allProducts = getAllProducts();
  const lowerQuery = query.toLowerCase();
  
  return allProducts.filter(product => {
    const name = language === 'ar' ? product.nameAr : product.nameEn;
    const description = language === 'ar' ? product.descriptionAr : product.descriptionEn;
    return name.toLowerCase().includes(lowerQuery) || description.toLowerCase().includes(lowerQuery);
  });
};

export const getCategoryImage = (categoryId: string): string => {
  const category = categories.find(c => c.id === categoryId);
  return category?.image || '';
};
