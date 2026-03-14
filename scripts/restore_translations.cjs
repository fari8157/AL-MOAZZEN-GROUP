const fs = require('fs');
const path = require('path');

const enPath = path.join(process.cwd(), 'src/i18n/en.json');
const arPath = path.join(process.cwd(), 'src/i18n/ar.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const arData = JSON.parse(fs.readFileSync(arPath, 'utf8'));

// ===== COMPONENT-SPECIFIC NAMESPACES =====
enData.packages = {
    badges: {
        mostPopular: 'Most Popular',
        bestValue: 'Best Value',
        exclusive: 'Exclusive'
    },
    names: {
        silver: 'Silver Serenity',
        gold: 'Golden Grace',
        royal: 'Royal Devotion'
    },
    features: {
        silver: ['Economy Class Flights', '3-Star Hotel Near Haram', 'Visa Processing', 'Airport Transfers', '24/7 Support'],
        gold: ['Business Class Flights', '5-Star Makkah Hotel', 'Fast-Track Visa', 'Private Transfers', 'Tour Guide', '24/7 VIP Support'],
        royal: ['First Class Flights', 'Luxury Hilton / Fairmont', 'VIP Visa Service', 'Limousine Service', 'Private Scholar Guide', 'Zamzam Package', 'Gourmet Meals']
    }
};

enData.stats = {
    satisfaction: 'Satisfaction Rate',
    support: 'Support Always'
};

// ===== HOME NAMESPACE =====
enData.home = enData.home || {};
enData.home.hero = {
    label: 'Al-Moazzen Group — Jeddah, Saudi Arabia',
    titleStart: 'Begin Your',
    titleEnd: 'Umrah Journey',
    arabicLine: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْك',
    subtitle: 'Experience the blessed pilgrimage with peace and comfort. Al-Moazzen Group handles every detail so you can focus on devotion and your spiritual journey.',
    planBtn: 'Plan My Umrah',
    viewBtn: 'View Packages',
    scroll: 'Scroll',
    cyclingWords: ['Sacred', 'Blessed', 'Divine', 'Spiritual', 'Holy']
};
enData.home.whyChoose = {
    badge: 'Why Choose Al-Moazzen Group',
    titleStart: 'Your Trusted Partner',
    titleEnd: 'For a Blessed Umrah Journey',
    subtitle: 'With years of experience serving thousands of pilgrims, we ensure every step of your Umrah journey is smooth, comfortable, and spiritually fulfilling.',
    card1: { title: 'Easy Travel Arrangements', desc: 'We handle flights, visa processing, and transport so your Umrah journey begins with complete peace of mind.' },
    card2: { title: 'Premium Hotel Accommodation', desc: 'Stay in carefully selected hotels near the Haram, ensuring comfort, convenience, and spiritual focus.' },
    card3: { title: 'Trusted & Reliable Service', desc: 'With years of experience guiding pilgrims, we provide a safe, transparent, and well-organized Umrah experience.' },
    card4: { title: '24/7 Pilgrim Support', desc: 'Our dedicated support team is available around the clock to assist you throughout your journey.' }
};
enData.home.umrahJourney = {
    badge: 'Your Sacred Journey',
    titleStart: 'Your Umrah Journey',
    titleEnd: 'Step by Step',
    subtitle: 'From planning your travel to completing your blessed pilgrimage, our team ensures every step of your Umrah journey is smooth, organized, and spiritually fulfilling.',
    stepLabel: 'Step',
    step1: { title: 'Choose Your Package', desc: 'Select the Umrah package that best suits your travel needs, dates, and preferences.' },
    step2: { title: 'Visa & Documentation', desc: 'We assist you with Umrah visa processing and all necessary travel documentation.' },
    step3: { title: 'Travel & Accommodation', desc: 'Enjoy comfortable flights and carefully selected hotels close to the Haram.' },
    step4: { title: 'Complete Your Umrah', desc: 'Perform your sacred pilgrimage with peace of mind and full support from our team.' }
};
enData.home.testimonials = {
    badge: 'Pilgrim Stories',
    title: 'Words from Our Blessed Pilgrims',
    reviews: [
        { name: 'Ahmed M.', role: 'Guest', review: 'An incredibly well-organized trip. The team handled everything flawlessly.' },
        { name: 'Fatima K.', role: 'Guest', review: 'Their 24/7 support made me feel very safe. Highly recommend Al-Moazzen.' },
        { name: 'Zayed A.', role: 'Guest', review: 'The hotel proximity to the Haram was excellent. Truly a royal experience.' }
    ]
};
enData.home.packages = {
    label: 'Curated Packages',
    titleStart: 'Choose Your Sacred',
    titleEnd: 'Pilgrimage Experience',
    currency: 'SAR',
    perPerson: '/ person',
    days: 'Days',
    bookBtn: 'Book This Package'
};

// ... (Rest of About, Services, FAQ, Contact as before)
enData.about = enData.about || {};
enData.about.hero = {
    badge: 'ESTABLISHED 2008',
    titleStart: 'Champions of the',
    titleEnd: 'Sacred Journey',
    subtitle: 'Serving pilgrims from Jeddah to the Holy Land with unwavering devotion and elite hospitality for over 15 years.'
};
enData.about.who = {
    badge: 'Traditional Values • Modern Service',
    title: 'A Legacy of Sacred Hospitality',
    desc1: 'Founded in the heart of Jeddah, Al-Moazzen Group was born from a singular vision: to treat every pilgrim as a guest of Allah, deserving of the most dignified and seamless travel experience.',
    desc2: 'Our name — Al-Moazzen — means "the one who calls to prayer." It is a name we wear with honour, reminding us daily of our sacred responsibility to those who answer that call and journey to Makkah and Madinah.',
    bullets: [
        'Fully licensed by the Saudi Ministry of Haj & Umrah',
        'Dedicated multilingual support in 12+ languages',
        'Partnerships with top 5-star hotels near Haram',
        'Seamless visa processing with 99% approval rate'
    ]
};
enData.about.foundation = {
    badge: 'Our Foundation',
    titleStart: 'Mission, Vision &',
    titleEnd: 'Core Values',
    cards: [
        { icon: '🕋', label: 'Our Mission', title: 'Serve Every Pilgrim', desc: 'To provide every Muslim with a spiritually enriching, safe, and seamless Umrah experience — regardless of budget or background.' },
        { icon: '🌙', label: 'Our Vision', title: 'Global Devotion', desc: 'To become the gold standard of spiritual travel, bridging the distance between the ummah and the Holy Sanctuaries with elite care.' },
        { icon: '📜', label: 'Our Values', title: 'Amanah & Ihsan', desc: 'We operate on trust (Amanah) and strive for excellence (Ihsan) in every detail of your journey, from visa to final Tawaf.' }
    ]
};
enData.about.stats = {
    pilgrimsLabel: 'Pilgrims Served',
    experienceLabel: 'Years History',
    languagesLabel: 'Languages Spoken',
    satisfactionLabel: 'Success Rate'
};
enData.about.cta = {
    title: 'Ready to Answer the Call?',
    subtitle: 'Join thousands of blessed pilgrims who have entrusted their sacred journey to Al-Moazzen Group. Let us handle the details while you focus on devotion.',
    primaryBtn: 'Explore Packages',
    secondaryBtn: 'Contact Us'
};

enData.services = enData.services || {};
enData.services.hero = {
    badge: '✦ Our Services ✦',
    titleStart: 'Elevating Your',
    titleEnd: 'Sacred Experience',
    subtitle: 'Beyond travel arrangements, we provide a foundation of peace, spiritual guidance, and premium hospitality for your pilgrimage.'
};
enData.services.core = { title: 'Comprehensive Pilgrimage Support' };
enData.services.list = [
    { icon: '🛡️', title: 'Visa Processing', desc: 'Swift and reliable Umrah visa handling with a near-perfect approval rate for pilgrims worldwide.' },
    { icon: '📍', title: 'Elite Transport', desc: 'Private air-conditioned fleet ranging from luxury sedans to spiritual group coaches with professional drivers.' },
    { icon: '🧭', title: 'Spiritual Guides', desc: 'Knowledgeable multilingual Mutawwifs to guide you through every ritual of your Umrah with proper Sunnah.' },
    { icon: '🕒', title: '24/7 Assistance', desc: 'Our dedicated on-ground team in Jeddah, Makkah, and Madinah is always just a call away for any need.' },
    { icon: '☕', title: 'Premium Dining', desc: 'Carefully curated Halal dining options, from traditional local cuisine to international gourmet buffets.' },
    { icon: '⭐', title: 'Special Ziyarat', desc: 'Guided historical tours to sacred sites in Al-Madinah and Al-Makkah with profound historical insights.' }
];

enData.packagesPage = enData.packagesPage || {};
enData.packagesPage.hero = {
    badge: '✦ Curated Packages ✦',
    titleStart: 'Journeys For',
    titleEnd: 'Every Pilgrim',
    subtitle: 'From essential economy options to royal VIP experiences, find the perfect package for your spiritual journey to the Holy Land.'
};
enData.packagesPage.list = [
    { tier: 'Silver', name: 'Economy Serenity', price: 'SAR 4,500', hotelMakkah: '3-Star near Haram', hotelMadinah: '3-Star near Nabawi', features: ['Makkah-Madinah Bus', 'Visa Processing', 'Shared Ziyarat', 'Standard Ihram', '24/7 Group Support'] },
    { tier: 'Gold', name: 'Premium Grace', price: 'SAR 8,200', popular: true, hotelMakkah: '5-Star Swissôtel', hotelMadinah: '5-Star Pullman', features: ['Private Sedan Transfer', 'Fast-track Visa', 'Private Ziyarat', 'Full Board Buffet', 'Premium Ihram Kit'] },
    { tier: 'Platinum', name: 'Royal Devotion', price: 'SAR 15,500', hotelMakkah: 'Fairmont / Raffles', hotelMadinah: 'Oberoi Madinah', features: ['VIP Airport Meet & Greet', 'Luxury SUV 24/7', 'Private Scholar Guide', 'Personal Chef Access', 'Zamzam Delivery'] }
];

enData.faqPage = enData.faqPage || {};
enData.faqPage.faqs = [
    { question: 'What documents are required for an Umrah visa?', answer: 'You typically need a valid passport (at least 6 months validity), proof of vaccination (if applicable), and a completed application.' },
    { question: 'Can women perform Umrah without a Mahram?', answer: 'Yes, according to recent updates, women can perform Umrah without a Mahram.' }
];

// ARABIC VERSION (Copy EN structure then override specific keys)
arData.packages = JSON.parse(JSON.stringify(enData.packages));
arData.stats = JSON.parse(JSON.stringify(enData.stats));
arData.home = JSON.parse(JSON.stringify(enData.home));
arData.about = JSON.parse(JSON.stringify(enData.about));
arData.services = JSON.parse(JSON.stringify(enData.services));
arData.packagesPage = JSON.parse(JSON.stringify(enData.packagesPage));
arData.faqPage = JSON.parse(JSON.stringify(enData.faqPage));

// ARABIC OVERRIDES
arData.home.hero.titleStart = 'عش تجربة';
arData.home.hero.titleEnd = 'رحلة العمرة';
arData.home.hero.label = 'مجموعة المؤذن — جدة، المملكة العربية السعودية';
arData.home.hero.subtitle = 'عش تجربة الحج المباركة براحة وطمأنينة. مجموعة المؤذن تتولى كل التفاصيل حتى تتفرغ للعبادة ورحلتك الروحانية.';

fs.writeFileSync(enPath, JSON.stringify(enData, null, 4));
fs.writeFileSync(arPath, JSON.stringify(arData, null, 4));
console.log('Restored all translation keys including top-level namespaces');
