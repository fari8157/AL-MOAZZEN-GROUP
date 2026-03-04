import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Facebook, Instagram, Twitter, Mail, Phone, MapPin,
    MessageSquare, Send, ArrowRight, Globe
} from 'lucide-react';

const Footer = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    const footerSections = {
        services: [
            "Economy Umrah Packages",
            "Premium Umrah Packages",
            "VIP & Private Services",
            "Umrah Visa Processing",
            "Hotel & Transport Arrangements"
        ],
        links: [
            { label: t('nav.about'), path: "/about" },
            { label: "Our Packages", path: "/packages" },
            { label: t('nav.faq'), path: "/faq" },
            { label: "Blog (SEO)", path: "/blog" },
            { label: "Privacy Policy", path: "/privacy" },
            { label: "Terms & Conditions", path: "/terms" }
        ]
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1,
                ease: "easeOut"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <footer className="relative bg-footer-bg text-white pt-24 pb-12 overflow-hidden">
            {/* Islamic Pattern Background Overlay */}
            <div className="absolute inset-0 bg-islamic-pattern opacity-5 pointer-events-none" />

            {/* Decorative Top Border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-premium to-transparent" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

                    {/* Column 1: Brand Identity */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <Link to="/" className="inline-block group">
                            <div className="flex items-center gap-4">
                                <div className="bg-white/95 p-2 rounded-xl border border-gold-premium/30 group-hover:shadow-[0_0_20px_rgba(200,162,77,0.3)] transition-all duration-300">
                                    <img
                                        src="/logo.jpeg"
                                        alt="AL-MOAZZEN GROUP"
                                        className="h-14 w-auto object-contain"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold tracking-wider text-white">
                                        AL-MOAZZEN <span className="text-gold-premium">GROUP</span>
                                    </h2>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                                        Spirituality & Excellence
                                    </p>
                                </div>
                            </div>
                        </Link>

                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            Delivering spiritually enriching and professionally managed Umrah journeys from the heart of Jeddah.
                        </p>

                        <div className="flex items-center gap-4">
                            {[
                                { icon: <Facebook size={18} />, label: "Facebook" },
                                { icon: <Instagram size={18} />, label: "Instagram" },
                                { icon: <Twitter size={18} />, label: "Twitter" },
                                { icon: <MessageSquare size={18} />, label: "WhatsApp" }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gold-premium hover:border-gold-premium transition-all duration-500 hover:scale-110"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Column 2: Our Services */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-lg font-bold mb-6 text-white relative inline-block">
                            Our Services
                            <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gold-premium" />
                        </h4>
                        <ul className="space-y-4">
                            {footerSections.services.map((service, idx) => (
                                <li key={idx}>
                                    <Link to="/services" className="footer-link-premium group">
                                        <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-gold-premium" />
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Column 3: Quick Links */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-lg font-bold mb-6 text-white relative inline-block">
                            Quick Links
                            <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gold-premium" />
                        </h4>
                        <ul className="space-y-4">
                            {footerSections.links.map((link, idx) => (
                                <li key={idx}>
                                    <Link to={link.path} className="footer-link-premium">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Column 4: Contact & Newsletter */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <div>
                            <h4 className="text-lg font-bold mb-6 text-gold-premium">Contact Information</h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 group">
                                    <MapPin size={18} className="text-gold-premium mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                                    <span className="text-gray-400 text-sm leading-relaxed">
                                        King Abdullah Road, Jeddah,<br />Saudi Arabia
                                    </span>
                                </li>
                                <li className="flex items-center gap-3 group">
                                    <Phone size={18} className="text-gold-premium shrink-0 group-hover:rotate-12 transition-transform" />
                                    <span className="text-gray-400 text-sm group-hover:text-white transition-colors">+966 50 123 4567</span>
                                </li>
                                <li className="flex items-center gap-3 group">
                                    <Mail size={18} className="text-gold-premium shrink-0 group-hover:animate-pulse transition-transform" />
                                    <span className="text-gray-400 text-sm group-hover:text-white transition-colors">info@almoazzengroup.sa</span>
                                </li>
                            </ul>
                        </div>

                        <div className="pt-4">
                            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-4">Available 24/7 for Assistance</p>
                            <a
                                href="#"
                                className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-gold-premium text-gold-premium hover:bg-gold-premium hover:text-white transition-all duration-500 group"
                            >
                                <MessageSquare size={16} />
                                <span className="text-sm font-semibold">WhatsApp Support</span>
                            </a>
                        </div>
                    </motion.div>
                </div>


                {/* Copyright Section */}
                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} <span className="text-gray-300">AL-MOAZZEN GROUP</span>. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="w-1 h-1 bg-gold-premium rounded-full" />
                        Designed with Excellence in Saudi Arabia
                    </div>
                    {/* Subtle Kaaba Watermark at bottom right */}
                    <div className="absolute bottom-4 right-4 opacity-[0.03] pointer-events-none grayscale hidden lg:block select-none">
                        <img
                            src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=400&auto=format&fit=crop"
                            alt="Kaaba Silhouette"
                            className="w-48 h-auto"
                        />
                    </div>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;
