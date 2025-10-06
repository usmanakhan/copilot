// filepath: d:\learning\copilot\src\components\component-loader.js
import Handlebars from 'handlebars';

// Register Handlebars helpers
Handlebars.registerHelper('eq', function(a, b) {
  return a === b;
});

// Generic component loader that can load any template with data
export async function loadComponent(templateName, data = {}, targetElementId = null) {
  try {
    const templatePath = `./templates/${templateName}.hbs`;
    const response = await fetch(templatePath);
    const templateSource = await response.text();
    const template = Handlebars.compile(templateSource);
    const html = template(data);
    
    if (targetElementId) {
      const targetElement = document.getElementById(targetElementId);
      if (targetElement) {
        targetElement.innerHTML = html;
      }
    }
    
    return html;
  } catch (error) {
    console.error('Error loading component:', error);
    throw error;
  }
}

// Legacy function for backward compatibility
export async function loadComponentFromPath(templatePath, targetElementId, data = {}) {
  try {
    const response = await fetch(templatePath);
    const templateSource = await response.text();
    const template = Handlebars.compile(templateSource);
    const html = template(data);
    
    const targetElement = document.getElementById(targetElementId);
    if (targetElement) {
      targetElement.innerHTML = html;
    }
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

export async function loadNavigation() {
  const navData = {
    brandName: "AI Innovations",
    navItems: [
      { href: "#", label: "Home", active: true, datePage: "home" },
      { href: "#product-details", label: "Products", active: false, datePage: "product-details" },
      { href: "#faq", label: "FAQ", active: false, datePage: "faq" },
      { href: "#vision", label: "Our Vision", active: false, datePage: "vision" }
    ]
  };
  await loadComponentFromPath('./templates/navigation.hbs', 'navigation-container', navData);
}

export async function loadDeviceCards(containerId) {
  const devices = [
    {
      name: "Smart Device 1",
      image: "https://via.placeholder.com/300x180?text=Device+1",
      features: ["Feature A", "Feature B", "Feature C"],
      detailsLink: "#",
      buyLink: "#",
      limitedOffer: true
    },
    {
      name: "Smart Device 2",
      image: "https://via.placeholder.com/300x180?text=Device+2",
      features: ["Feature A", "Feature B", "Feature C"],
      detailsLink: "#",
      buyLink: "#",
      limitedOffer: false
    },
    {
      name: "Smart Device 3",
      image: "https://via.placeholder.com/300x180?text=Device+3",
      features: ["Feature A", "Feature B", "Feature C"],
      detailsLink: "#",
      buyLink: "#",
      limitedOffer: false
    },
    {
      name: "Smart Device 4",
      image: "https://via.placeholder.com/300x180?text=Device+4",
      features: ["Feature A", "Feature B", "Feature C"],
      detailsLink: "#",
      buyLink: "#",
      limitedOffer: false
    },
    {
      name: "Smart Device 5",
      image: "https://via.placeholder.com/300x180?text=Device+5",
      features: ["Feature A", "Feature B", "Feature C"],
      detailsLink: "#",
      buyLink: "#",
      limitedOffer: false
    },
    {
      name: "Smart Device 6",
      image: "https://via.placeholder.com/300x180?text=Device+6",
      features: ["Feature A", "Feature B", "Feature C"],
      detailsLink: "#",
      buyLink: "#",
      limitedOffer: false
    }
  ];
  
  const container = document.getElementById(containerId);
  if (!container) return;
  
  let html = '';
  for (const device of devices) {
    const response = await fetch('./templates/device-card.hbs');
    const templateSource = await response.text();
    const template = Handlebars.compile(templateSource);
    html += template(device);
  }
  
  container.innerHTML = html;
}

export async function loadTabsSection(containerId) {
  const tabsData = {
    sectionId: "info-tabs",
    title: "More Information",
    tabsId: "infoTabs",
    tabs: [
      {
        id: "tab1",
        title: "Overview",
        active: true,
        content: "<p>This is a sample overview tab. Here you can provide a summary of your product or service, its purpose, and key benefits.</p>"
      },
      {
        id: "tab2",
        title: "Features",
        active: false,
        content: "<ul><li>Feature One: Fast and reliable performance</li><li>Feature Two: Easy integration with existing systems</li><li>Feature Three: 24/7 customer support</li></ul>"
      },
      {
        id: "tab3",
        title: "Pricing",
        active: false,
        content: "<p>Choose from flexible pricing plans to suit your needs. Contact us for a custom quote or more details.</p>"
      }
    ]
  };
  await loadComponentFromPath('./templates/tabs-section.hbs', containerId, tabsData);
}

export async function loadContactForm(containerId) {
  const formData = {
    title: "Contact Us",
    action: "/action_page.php",
    submitText: "Submit",
    fields: [
      {
        type: "text",
        id: "fname",
        name: "fname",
        label: "First name",
        value: "John"
      },
      {
        type: "text",
        id: "lname",
        name: "lname",
        label: "Last name",
        value: "Doe",
        for: "lname"
      },
      {
        type: "email",
        id: "email",
        name: "email",
        label: "Email",
        required: true,
        for: "email"
      },
      {
        type: "textarea",
        id: "message",
        name: "message",
        label: "Message",
        required: true,
        for: "message",
        rows: 4
      }
    ]
  };
  await loadComponentFromPath('./templates/contact-form.hbs', containerId, formData);
}

export async function loadFooter(containerId = 'footer-container') {
  const footerData = {
    companyName: "AI Innovations Ltd.",
    companyDescription: "Leading the future with cutting-edge artificial intelligence solutions for businesses and individuals worldwide.",
    currentYear: new Date().getFullYear(),
    address: "123 Innovation Drive, Tech City, TC 12345",
    phone: "+1 (555) 123-4567",
    email: "info@ai-innovations.com",
    socialLinks: [
      { icon: "fab fa-facebook", url: "https://facebook.com" },
      { icon: "fab fa-twitter", url: "https://twitter.com" },
      { icon: "fab fa-linkedin", url: "https://linkedin.com" },
      { icon: "fab fa-instagram", url: "https://instagram.com" }
    ],
    quickLinks: [
      { name: "Home", url: "#home" },
      { name: "About Us", url: "#about" },
      { name: "Services", url: "#services" },
      { name: "Contact", url: "#contact" }
    ],
    productLinks: [
      { name: "AI Smart Device", url: "#product-details" },
      { name: "AI Software Suite", url: "#products" },
      { name: "Consulting Services", url: "#services" },
      { name: "Enterprise Solutions", url: "#enterprise" }
    ]
  };
  
  await loadComponent('footer', footerData, containerId);
}