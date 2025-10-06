// Page Router - Simple client-side routing
class PageRouter {
    constructor() {
        this.currentPage = 'home';
        this.pages = {
            home: {
                title: 'Home - AI Innovations',
                component: 'home'
            },
            'product-details': {
                title: 'Product Details - AI Innovations',
                component: 'product-details'
            },
            faq: {
                title: 'FAQ - AI Innovations', 
                component: 'faq'
            },
            vision: {
                title: 'Our Vision - AI Innovations',
                component: 'our-vision'
            }
        };
        
        this.init();
    }

    init() {
        // Listen for navigation clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-page]');
            if (link) {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.navigateTo(page);
            }
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            const page = e.state?.page || 'home';
            this.navigateTo(page, false);
        });

        // Load initial page
        const urlPage = this.getPageFromUrl();
        this.navigateTo(urlPage, false);
    }

    getPageFromUrl() {
        const hash = window.location.hash.substring(1);
        return hash || 'home';
    }

    async navigateTo(page, pushState = true) {
        if (!this.pages[page]) {
            console.warn(`Page "${page}" not found, redirecting to home`);
            page = 'home';
        }

        // Update browser history
        if (pushState) {
            const url = page === 'home' ? '/' : `#${page}`;
            history.pushState({ page }, '', url);
        }

        // Update page title
        document.title = this.pages[page].title;

        // Update current page
        this.currentPage = page;

        // Update navigation active states
        this.updateNavigation();

        // Load page content
        await this.loadPageContent(page);
    }

    updateNavigation() {
        // Update navigation active states
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const page = link.getAttribute('data-page') || link.getAttribute('href')?.substring(1);
            if (page === this.currentPage) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }

    async loadPageContent(page) {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;

        // Show loading state
        mainContent.innerHTML = `
            <div class="d-flex justify-content-center align-items-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;

        try {
            // Load page-specific content based on the page
            switch (page) {
                case 'home':
                    await this.loadHomePage();
                    break;
                case 'product-details':
                    await this.loadProductDetails();
                    break;
                case 'faq':
                    await this.loadFAQPage();
                    break;
                case 'vision':
                    await this.loadVisionPage();
                    break;
                default:
                    await this.loadHomePage();
            }
        } catch (error) {
            console.error('Error loading page:', error);
            mainContent.innerHTML = `
                <div class="alert alert-danger text-center">
                    <h4>Error Loading Page</h4>
                    <p>Sorry, there was an error loading the content. Please try again.</p>
                    <button class="btn btn-primary" onclick="location.reload()">Reload Page</button>
                </div>
            `;
        }
    }

    async loadHomePage() {
        const mainContent = document.getElementById('main-content');
        
        // Load the home page content (existing content)
        mainContent.innerHTML = `
            <h1 name="header">My AI driven Website</h1>
            <div class="container py-5">
              <h2 class="mb-4">Welcome to Your New Website</h2>
              <!-- Swiper -->
              <div class="swiper">
                <div class="swiper-wrapper">
                  <div class="swiper-slide fs-48">Slide 1</div>
                  <div class="swiper-slide fs-48">Slide 2</div>
                  <div class="swiper-slide fs-48">Slide 3</div>
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div>
            </div>

            <!-- About Us Section -->
            <div class="container py-5" id="about">
              <div class="row justify-content-center">
                <div class="col-lg-8">
                  <div class="card shadow mb-4">
                    <div class="card-body">
                      <h2 class="mb-3 pt-4">About Us</h2>
                      <p class="fs-5 mb-3">
                        <strong>AI Innovations Ltd.</strong> is a leading technology company dedicated to delivering cutting-edge AI solutions for businesses and individuals. Our mission is to make artificial intelligence accessible, reliable, and impactful for everyone.
                      </p>
                      <p class="mb-3">
                        Founded in 2020, our team of passionate engineers, designers, and strategists has helped hundreds of clients transform their operations with smart automation, predictive analytics, and intelligent products. We believe in innovation, transparency, and customer success.
                      </p>
                      <ul class="list-unstyled mb-0">
                        <li><strong>Our Values:</strong> Innovation, Integrity, Excellence</li>
                        <li><strong>Our Vision:</strong> Empowering the world with AI</li>
                        <li><strong>Contact:</strong> info@ai-innovations.com</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Devices Section -->
            <div class="container py-5" id="device">
              <h2 class="mb-4 pt-4">Devices</h2>
              <div class="swiper device-swiper">
                <div class="swiper-wrapper" id="device-cards-container">
                  <!-- Device cards will be loaded here -->
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div>
            </div>

            <!-- Tabs Section Container -->
            <div id="tabs-container"></div>

            <!-- Contact Form Container -->
            <div id="contact-container"></div>
        `;

        // Load existing components for home page
        const { loadDeviceCards, loadTabsSection, loadContactForm } = await import('./component-loader.js');
        
        // Load device cards
        await loadDeviceCards('device-cards-container');
        
        // Load tabs section
        await loadTabsSection('tabs-container');
        
        // Load contact form
        await loadContactForm('contact-container');
        
        // Re-initialize Swipers
        if (typeof window !== 'undefined') {
            const mainModule = await import('../main.js');
            mainModule.initSwipers();
        }
    }

    async loadProductDetails() {
        const { loadComponent } = await import('./component-loader.js');
        
        const productData = {
            pageId: 'product-details',
            productName: 'AI Smart Device Pro',
            mainImage: 'https://via.placeholder.com/600x400/e00800/ffffff?text=AI+Smart+Device+Pro',
            thumbnails: [
                'https://via.placeholder.com/150x100/333/ffffff?text=View+1',
                'https://via.placeholder.com/150x100/333/ffffff?text=View+2', 
                'https://via.placeholder.com/150x100/333/ffffff?text=View+3',
                'https://via.placeholder.com/150x100/333/ffffff?text=View+4'
            ],
            rating: 4,
            reviewCount: 127,
            originalPrice: 299.99,
            discountPrice: 249.99,
            description: 'The AI Smart Device Pro combines cutting-edge artificial intelligence with sleek design to deliver an unparalleled user experience. Perfect for both professionals and enthusiasts.',
            features: [
                'Advanced AI Processing Unit',
                'Voice Recognition & Control',
                '4K Ultra HD Display',
                'Wireless Connectivity (WiFi 6)',
                'Cloud Integration & Sync',
                'Energy Efficient Design',
                '24/7 Support & Updates'
            ],
            specifications: [
                { name: 'Processor', value: 'AI Neural Chip 3.0' },
                { name: 'Memory', value: '8GB DDR5' },
                { name: 'Storage', value: '256GB SSD' },
                { name: 'Display', value: '10.5" 4K Retina' },
                { name: 'Battery', value: '12 hours usage' },
                { name: 'Weight', value: '1.2 lbs' },
                { name: 'Dimensions', value: '10" x 7" x 0.5"' }
            ],
            reviews: [
                {
                    name: 'John Smith',
                    rating: 5,
                    comment: 'Absolutely amazing device! The AI features work flawlessly and the build quality is top-notch.',
                    date: 'October 1, 2025'
                },
                {
                    name: 'Sarah Johnson',
                    rating: 4,
                    comment: 'Great value for money. Setup was easy and performance is excellent.',
                    date: 'September 28, 2025'
                },
                {
                    name: 'Mike Chen',
                    rating: 5,
                    comment: 'Best purchase I\'ve made this year. Highly recommend to anyone looking for AI technology.',
                    date: 'September 25, 2025'
                }
            ],
            warrantyPeriod: '2-year'
        };

        await loadComponent('product-details', productData, 'main-content');
    }

    async loadFAQPage() {
        const { loadComponent } = await import('./component-loader.js');
        
        const faqData = {
            pageId: 'faq',
            title: 'Frequently Asked Questions',
            subtitle: 'Find answers to common questions about our products and services',
            categories: [
                { id: 'products', name: 'Products' },
                { id: 'shipping', name: 'Shipping' },
                { id: 'support', name: 'Support' },
                { id: 'account', name: 'Account' }
            ],
            faqs: [
                {
                    category: 'products',
                    question: 'What AI technologies do your devices use?',
                    answer: 'Our devices utilize advanced machine learning algorithms, neural networks, and natural language processing to provide intelligent responses and automation capabilities.',
                    helpful: true
                },
                {
                    category: 'products', 
                    question: 'Are your devices compatible with smart home systems?',
                    answer: 'Yes, our devices are compatible with major smart home platforms including Google Home, Amazon Alexa, and Apple HomeKit.',
                    helpful: true
                },
                {
                    category: 'shipping',
                    question: 'What are your shipping options?',
                    answer: 'We offer standard shipping (3-5 business days) for $5.99 and express shipping (1-2 business days) for $12.99. Free shipping is available on orders over $100.',
                    helpful: true
                },
                {
                    category: 'shipping',
                    question: 'Do you ship internationally?',
                    answer: 'Currently, we ship to the United States, Canada, and select European countries. International shipping rates and delivery times vary by location.',
                    helpful: true
                },
                {
                    category: 'support',
                    question: 'What warranty do you provide?',
                    answer: 'All our products come with a 2-year limited warranty covering manufacturing defects and hardware failures under normal use conditions.',
                    helpful: true
                },
                {
                    category: 'support',
                    question: 'How can I get technical support?',
                    answer: 'You can reach our technical support team 24/7 through live chat, email at support@ai-innovations.com, or phone at 1-800-AI-HELP.',
                    helpful: true
                },
                {
                    category: 'account',
                    question: 'How do I create an account?',
                    answer: 'You can create an account by clicking the "Sign Up" button in the top navigation and filling out the registration form with your email and password.',
                    helpful: true
                },
                {
                    category: 'account',
                    question: 'Can I change my password?',
                    answer: 'Yes, you can change your password by going to Account Settings and clicking on "Change Password". You\'ll need to enter your current password and choose a new one.',
                    helpful: true
                }
            ]
        };

        await loadComponent('faq', faqData, 'main-content');
    }

    async loadVisionPage() {
        const { loadComponent } = await import('./component-loader.js');
        
        const visionData = {
            pageId: 'vision',
            title: 'Our Vision',
            subtitle: 'Shaping the future through innovation and artificial intelligence',
            visionStatement: 'To create a world where artificial intelligence enhances human potential, drives innovation, and makes technology accessible to everyone, everywhere.',
            missionStatement: 'We are committed to developing cutting-edge AI solutions that solve real-world problems and empower individuals and businesses to achieve more than they ever thought possible.',
            missionPoints: [
                'Develop user-friendly AI technologies',
                'Promote ethical and responsible AI practices', 
                'Make AI accessible to businesses of all sizes',
                'Foster innovation through continuous research'
            ],
            coreValues: [
                {
                    name: 'Innovation',
                    description: 'We continuously push the boundaries of what\'s possible with AI technology.'
                },
                {
                    name: 'Integrity',
                    description: 'We operate with transparency and ethical standards in all our practices.'
                },
                {
                    name: 'Excellence',
                    description: 'We strive for the highest quality in every product and service we deliver.'
                },
                {
                    name: 'Accessibility',
                    description: 'We believe powerful AI tools should be available to everyone, not just tech giants.'
                }
            ],
            futureGoals: [
                {
                    icon: 'fas fa-globe',
                    title: 'Global Expansion',
                    description: 'Expand our AI solutions to serve customers in 50+ countries worldwide.',
                    timeline: '2026'
                },
                {
                    icon: 'fas fa-brain',
                    title: 'Advanced AI Research',
                    description: 'Develop next-generation AI algorithms that can understand and respond like humans.',
                    timeline: '2027'
                },
                {
                    icon: 'fas fa-leaf',
                    title: 'Sustainable Tech',
                    description: 'Create carbon-neutral AI computing solutions for environmental sustainability.',
                    timeline: '2028'
                }
            ],
            impactStats: [
                { value: '500K+', label: 'Users Worldwide' },
                { value: '1,200+', label: 'Businesses Served' },
                { value: '50+', label: 'Countries Reached' },
                { value: '99.9%', label: 'Uptime Achieved' }
            ],
            leadership: [
                {
                    name: 'Sarah Chen',
                    position: 'CEO & Founder',
                    photo: 'https://via.placeholder.com/80x80/333/ffffff?text=SC',
                    bio: 'Former Google AI researcher with 15+ years in machine learning and business strategy.',
                    socialLinks: [
                        { icon: 'fab fa-linkedin', url: '#' },
                        { icon: 'fab fa-twitter', url: '#' }
                    ]
                },
                {
                    name: 'David Park',
                    position: 'CTO',
                    photo: 'https://via.placeholder.com/80x80/333/ffffff?text=DP',
                    bio: 'AI architect and former Microsoft engineer specializing in neural networks and deep learning.',
                    socialLinks: [
                        { icon: 'fab fa-linkedin', url: '#' },
                        { icon: 'fab fa-github', url: '#' }
                    ]
                },
                {
                    name: 'Maria Rodriguez',
                    position: 'VP of Product',
                    photo: 'https://via.placeholder.com/80x80/333/ffffff?text=MR',
                    bio: 'Product strategist with expertise in AI user experience and customer-centric design.',
                    socialLinks: [
                        { icon: 'fab fa-linkedin', url: '#' },
                        { icon: 'fab fa-twitter', url: '#' }
                    ]
                }
            ]
        };

        await loadComponent('our-vision', visionData, 'main-content');
    }
}

export { PageRouter };