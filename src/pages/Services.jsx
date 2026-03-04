import React from 'react';
import { Section } from '../components/ui';
import { ShieldCheck, Map, Clock, Users, Heart } from 'lucide-react';

const Services = () => {
    const services = [
        {
            icon: <ShieldCheck size={32} />,
            title: "Visa Processing",
            desc: "Comprehensive visa assistance for pilgrims worldwide with fast turnaround times."
        },
        {
            icon: <Map size={32} />,
            title: "Guided Tours",
            desc: "Ziyarat tours in Makkah and Madinah with knowledgeable multilingual guides."
        },
        {
            icon: <Users size={32} />,
            title: "Group Packages",
            desc: "Coordinated travel for families and large groups with dedicated support staff."
        },
        {
            icon: <Clock size={32} />,
            title: "24/7 Support",
            desc: "In-country support team available around the clock to assist with any needs."
        }
    ];

    return (
        <div className="pt-10">
            <Section title="Our Specialized Services" subtitle="Beyond packages, we provide everything needed for a complete spiritual journey.">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((item, i) => (
                        <div key={i} className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="mb-6 text-primary-500 group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section className="bg-primary-50">
                <div className="max-w-4xl mx-auto text-center">
                    <Heart className="mx-auto text-primary-500 mb-6" size={48} fill="currentColor" />
                    <h2 className="text-3xl font-bold mb-6">Customized VIP Experiences</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                        Looking for something tailored to your specific needs? We offer private transportation, luxury suite bookings, and personalized guidance for individuals and VIP groups.
                    </p>
                    <button className="btn btn-primary px-8">Inquire Now</button>
                </div>
            </Section>
        </div>
    );
};

export default Services;
