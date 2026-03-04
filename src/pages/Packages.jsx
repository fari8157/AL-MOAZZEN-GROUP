import React from 'react';
import { Section, Button } from '../components/ui';
import { Hotel, Plane, Calendar, User } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Packages = () => {
    const packages = [
        {
            name: "Economy Umrah",
            price: "$1,200",
            duration: "10 Days",
            hotel: "3 Star Hotel (600m from Haram)",
            includes: ["Visa", "Economy Flight", "Shared Transport"]
        },
        {
            name: "Premium Umrah",
            price: "$2,500",
            duration: "14 Days",
            hotel: "4 Star Hotel (300m from Haram)",
            includes: ["Visa", "Economy Plus Flight", "Private Transport", "Ziyarat"]
        },
        {
            name: "VIP Royal Umrah",
            price: "$4,800",
            duration: "10 Days",
            hotel: "5 Star Luxury (Clock Tower)",
            includes: ["Visa", "Business Class", "Luxury Private SUV", "Private Guide"]
        }
    ];

    return (
        <div className="pt-10">
            <Section title="Our Umrah Packages" subtitle="Select a package that fits your needs and budget. All packages include standard services.">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {packages.map((pkg, i) => (
                        <div key={i} className={`relative p-8 rounded-3xl border ${i === 1 ? 'border-primary-500 shadow-xl bg-white scale-105 z-10' : 'border-gray-200 bg-white'}`}>
                            {i === 1 && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                    Most Popular
                                </div>
                            )}
                            <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                            <div className="text-primary-500 text-3xl font-bold mb-6">{pkg.price} <span className="text-sm text-gray-400 font-normal">/ person</span></div>

                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center text-sm text-gray-600">
                                    <Calendar size={18} className="mr-3 text-primary-500" />
                                    {pkg.duration}
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <Hotel size={18} className="mr-3 text-primary-500" />
                                    {pkg.hotel}
                                </li>
                                {pkg.includes.map((inc, j) => (
                                    <li key={j} className="flex items-center text-sm text-gray-600">
                                        <Plane size={18} className="mr-3 text-primary-500" />
                                        {inc}
                                    </li>
                                ))}
                            </ul>

                            <Button variant={i === 1 ? 'primary' : 'outline'} className="w-full py-4 text-lg">
                                Book Inquiry
                            </Button>
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
};

export default Packages;
