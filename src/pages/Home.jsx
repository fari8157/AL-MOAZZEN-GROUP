import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Plane, Hotel, FileText, CheckCircle2, ShieldCheck, Headphones, Compass, MapPin, ClipboardList, BedDouble } from 'lucide-react';
import { Button, Section } from '../components/ui';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className="overflow-hidden">
            <Helmet>
                <title>AL-MOAZZEN GROUP | Premium Umrah Travel Agency Jeddah</title>
                <meta name="description" content="Experience a sacred and comfortable Umrah journey with AL-MOAZZEN GROUP. Premium packages from the heart of Jeddah, Saudi Arabia." />
            </Helmet>

            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center pt-20">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-spiritual-beige via-spiritual-beige/80 to-transparent z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070&auto=format&fit=crop"
                        alt="Makkah"
                        className="w-full h-full object-cover opacity-60"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-2xl"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-600 text-sm font-semibold mb-6">
                            AL-MOAZZEN GROUP Official Agency in Jeddah
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-[1.1]">
                            {t('hero.title')}
                        </h1>
                        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                            {t('hero.subtitle')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="px-8 py-4 text-lg">
                                {t('hero.cta')}
                                <ArrowRight className="ms-2 rtl:rotate-180" size={20} />
                            </Button>
                            <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                                {t('nav.services')}
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us Section - Luxury Redesign */}
            <section className="relative py-24 bg-ivory overflow-hidden">
                {/* Islamic Pattern Background Overlay */}
                <div className="absolute inset-0 bg-islamic-pattern opacity-5 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-emerald-deep mb-4"
                        >
                            Why Choose AL-MOAZZEN GROUP?
                        </motion.h2>
                        <div className="gold-divider" />
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-600 max-w-3xl mx-auto text-lg"
                        >
                            Delivering a spiritually enriching and seamlessly managed Umrah experience with excellence, care, and dedication.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Plane className="text-gold-soft" size={32} />,
                                title: "Seamless Travel Management",
                                desc: "From flight booking to ground transportation, every detail is carefully arranged to ensure a smooth and stress-free journey."
                            },
                            {
                                icon: <Hotel className="text-gold-soft" size={32} />,
                                title: "Premium Accommodation Near Al-Haram",
                                desc: "Stay in carefully selected hotels within close proximity to Masjid Al-Haram for maximum comfort and convenience."
                            },
                            {
                                icon: <Compass className="text-gold-soft" size={32} />,
                                title: "Expert Religious Guidance",
                                desc: "Experienced guides assist you through every ritual of Umrah, ensuring clarity, confidence, and spiritual fulfillment."
                            },
                            {
                                icon: <Headphones className="text-gold-soft" size={32} />,
                                title: "Dedicated 24/7 Support",
                                desc: "Our support team remains available throughout your journey to provide assistance whenever needed."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="group relative p-8 glass-card-premium hover:-translate-y-2 shimmer bg-white/60 border-t-4 border-t-gold-soft rounded-xl shadow-lg"
                            >
                                <div className="mb-6 p-4 bg-emerald-deep/5 rounded-2xl inline-block group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-emerald-deep mb-4 leading-tight group-hover:text-gold-soft transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                                <div className="absolute inset-0 border border-gold-soft/0 group-hover:border-gold-soft/30 rounded-xl transition-all duration-300" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Your Umrah Journey Section - Premium Timeline */}
            <section className="relative py-32 text-white overflow-hidden">
                {/* Background Image with Clearer Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070&auto=format&fit=crop"
                        alt="Holy Kaaba"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold mb-4"
                        >
                            Your Umrah Journey – Step by Step
                        </motion.h2>
                        <div className="h-1 w-24 bg-gold-soft mx-auto my-6" />
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-emerald-100/70 max-w-2xl mx-auto text-lg"
                        >
                            A carefully guided process designed to let you focus entirely on your worship.
                        </motion.p>
                    </div>

                    {/* Timeline Desktop */}
                    <div className="hidden lg:block relative">
                        {/* Connecting Line */}
                        <div className="" />

                        <div className="grid grid-cols-4 gap-4 relative">
                            {[
                                { number: "01", icon: <ClipboardList />, title: "Select Your Package", desc: "Choose from our thoughtfully designed Umrah packages tailored to your comfort and schedule." },
                                { number: "02", icon: <FileText />, title: "Visa & Documentation Processing", desc: "We handle all necessary documentation and visa procedures efficiently and professionally." },
                                { number: "03", icon: <MapPin />, title: "Arrival & Hospitality in Jeddah", desc: "Enjoy VIP reception, smooth transfers, and comfortable hotel check-in near the Haram." },
                                { number: "04", icon: <CheckCircle2 />, title: "Perform Umrah with Guidance", desc: "Complete your sacred rituals with the support of knowledgeable guides for a spiritually fulfilling experience." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    className="relative flex flex-col items-center text-center px-4"
                                >
                                    <div className="w-16 h-16 rounded-full bg-emerald-900 border-2 border-gold-soft flex items-center justify-center text-gold-soft mb-8 relative z-20 group hover:shadow-[0_0_20px_rgba(198,167,94,0.4)] transition-all duration-300">
                                        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gold-soft text-emerald-deep text-xs font-bold flex items-center justify-center border-2 border-emerald-900">
                                            {item.number}
                                        </div>
                                        <div className="group-hover:scale-110 transition-transform duration-300">
                                            {React.cloneElement(item.icon, { size: 28 })}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-gold-soft leading-tight">{item.title}</h3>
                                    <p className="text-emerald-100/60 text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Timeline Mobile */}
                    <div className="lg:hidden space-y-12 relative px-4">
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gold-soft/20" />

                        {[
                            { number: "01", icon: <ClipboardList />, title: "Select Your Package", desc: "Choose from our thoughtfully designed Umrah packages tailored to your comfort and schedule." },
                            { number: "02", icon: <FileText />, title: "Visa & Documentation Processing", desc: "We handle all documentation and visa procedures efficiently and professionally." },
                            { number: "03", icon: <MapPin />, title: "Arrival & Hospitality in Jeddah", desc: "Enjoy VIP reception, smooth transfers, and comfortable hotel check-in near the Haram." },
                            { number: "04", icon: <CheckCircle2 />, title: "Perform Umrah with Guidance", desc: "Complete your sacred rituals with the support of knowledgeable guides for a spiritually fulfilling experience." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative flex items-start space-x-6 rtl:space-x-reverse"
                            >
                                <div className="w-12 h-12 shrink-0 rounded-full bg-emerald-900 border-2 border-gold-soft flex items-center justify-center text-gold-soft relative z-10">
                                    {React.cloneElement(item.icon, { size: 20 })}
                                </div>
                                <div className="pt-2">
                                    <span className="text-gold-soft/80 text-xs font-bold mb-1 block">Step {item.number}</span>
                                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                    <p className="text-emerald-100/60 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
