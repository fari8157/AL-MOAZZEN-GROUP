import React from 'react';
import { Section } from '../components/ui';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="pt-10">
            <Section className="bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">AL-MOAZZEN GROUP: Serving Pilgrims Since 2010</h1>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            Based in Jeddah, AL-MOAZZEN GROUP is at the gateway of the two Holy Cities. Our mission is to facilitate a seamless, spiritual, and comfortable Umrah experience for every pilgrim.
                        </p>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            We understand the profound significance of this journey. That's why we combine local expertise with international hospitality standards to serve our clients from around the globe.
                        </p>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <div className="text-3xl font-bold text-primary-500 mb-1">20k+</div>
                                <div className="text-sm text-gray-500 uppercase tracking-wider">Pilgrims Served</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary-500 mb-1">16+</div>
                                <div className="text-sm text-gray-500 uppercase tracking-wider">Years Experience</div>
                            </div>
                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <img
                            src="/about-us.jpg"
                            alt="Pilgrims performing Umrah at the Kaaba"
                            className="rounded-2xl shadow-2xl relative z-10 aspect-[4/3] object-cover"
                        />
                        <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-primary-100 rounded-2xl z-0" />
                    </motion.div>
                </div>
            </Section>

            <Section dark className="bg-spiritual-charcoal">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                        <p className="text-gray-400">To provide accessible, high-quality Umrah services that prioritize the spiritual peace of our guests.</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                        <p className="text-gray-400">To be the most trusted name in spiritual travel, known for our integrity and excellence in service.</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Our Values</h3>
                        <p className="text-gray-400">Honesty, spiritual respect, and unwavering commitment to pilgrim comfort and safety.</p>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default About;
