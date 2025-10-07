// Language and Direction Switcher Utility
class LanguageSwitcher {
    constructor() {
        this.currentLang = document.documentElement.lang || 'en';
        this.currentDir = document.documentElement.dir || 'ltr';
        this.init();
    }

    init() {
        // Add language switcher to navigation if needed
        this.addLanguageSwitcher();
        
        // Listen for language changes
        this.setupEventListeners();
    }

    addLanguageSwitcher() {
        // This can be called to add a language switcher to the navigation
        const navContainer = document.getElementById('navigation-container');
        if (navContainer) {
            // You can add language switcher buttons here when needed
        }
    }

    setupEventListeners() {
        // Listen for language switch events
        document.addEventListener('languageSwitch', (e) => {
            this.switchLanguage(e.detail.lang, e.detail.dir);
        });
    }

    switchLanguage(lang, dir = 'ltr') {
        // Update HTML attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = dir;
        
        // Update meta tags
        const langMeta = document.querySelector('meta[name="language"]');
        const dirMeta = document.querySelector('meta[name="direction"]');
        
        if (langMeta) langMeta.content = lang;
        if (dirMeta) dirMeta.content = dir;
        
        // Update page title based on language
        this.updatePageTitle(lang);
        
        // Store preference
        localStorage.setItem('preferredLanguage', lang);
        localStorage.setItem('preferredDirection', dir);
        
        // Trigger page reload or content update
        this.updateContent(lang, dir);
    }

    updatePageTitle(lang) {
        const titles = {
            'en': 'AI Innovations - Advanced AI Solutions',
            'ar': 'الابتكارات الذكية - حلول الذكاء الاصطناعي المتقدمة'
        };
        
        document.title = titles[lang] || titles['en'];
    }

    updateContent(lang, dir) {
        // This method can be extended to update content dynamically
        // For now, it can trigger a page refresh or content reload
        
        // Update any existing text content
        this.updateStaticText(lang);
        
        // Dispatch custom event for components to listen to
        const event = new CustomEvent('languageChanged', {
            detail: { lang, dir }
        });
        document.dispatchEvent(event);
    }

    updateStaticText(lang) {
        // Sample translations for common elements
        const translations = {
            'en': {
                'home': 'Home',
                'products': 'Products',
                'faq': 'FAQ',
                'vision': 'Our Vision',
                'contact': 'Contact Us',
                'about': 'About Us'
            },
            'ar': {
                'home': 'الرئيسية',
                'products': 'المنتجات',
                'faq': 'الأسئلة الشائعة',
                'vision': 'رؤيتنا',
                'contact': 'اتصل بنا',
                'about': 'من نحن'
            }
        };

        // Update navigation text if elements exist
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const key = link.textContent.toLowerCase().trim();
            if (translations[lang] && translations[lang][key]) {
                link.textContent = translations[lang][key];
            }
        });
    }

    // Utility methods for RTL/LTR detection
    isRTL() {
        return document.documentElement.dir === 'rtl';
    }

    getCurrentLanguage() {
        return document.documentElement.lang;
    }

    // Load saved preferences
    loadSavedPreferences() {
        const savedLang = localStorage.getItem('preferredLanguage');
        const savedDir = localStorage.getItem('preferredDirection');
        
        if (savedLang && savedDir) {
            this.switchLanguage(savedLang, savedDir);
        }
    }

    // Create language switcher button
    createLanguageSwitcherButton() {
        const button = document.createElement('button');
        button.className = 'btn btn-outline-light btn-sm ms-2';
        button.innerHTML = `<i class="fas fa-globe me-1"></i>${this.currentLang.toUpperCase()}`;
        
        button.addEventListener('click', () => {
            // Toggle between English and Arabic
            const newLang = this.currentLang === 'en' ? 'ar' : 'en';
            const newDir = newLang === 'ar' ? 'rtl' : 'ltr';
            this.switchLanguage(newLang, newDir);
        });
        
        return button;
    }
}

// Initialize language switcher when DOM is loaded
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        window.languageSwitcher = new LanguageSwitcher();
        
        // Load saved preferences
        window.languageSwitcher.loadSavedPreferences();
    });
}

export { LanguageSwitcher };

//window.languageSwitcher.switchLanguage('ar', 'rtl');