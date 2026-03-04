import React, { useState } from 'react';
import { Section, Button } from '../components/ui';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        package: 'Economy',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        // PLACEHOLDER for Google Apps Script Webhook
        // You would replace this URL with your actual deployed Webhook URL
        const WEBHOOK_URL = "#";

        try {
            // If no URL is provided, we simulate success for demo purposes
            if (WEBHOOK_URL === "#") {
                await new Promise(resolve => setTimeout(resolve, 1500));
                setStatus('success');
                return;
            }

            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData).toString()
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', package: 'Economy', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error("Form error:", error);
            setStatus('error');
        }
    };

    return (
        <div className="pt-10">
            <Section title="Get in Touch" subtitle="Have questions? Our team in Jeddah is ready to assist you in planning your spiritual journey.">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                        <div className="space-y-8">
                            <div className="flex items-start space-x-4 rtl:space-x-reverse">
                                <div className="p-3 bg-primary-100 text-primary-600 rounded-xl">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">Our Office</h4>
                                    <p className="text-gray-600">King Abdullah Road, Suite 402, Jeddah, KSA</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4 rtl:space-x-reverse">
                                <div className="p-3 bg-primary-100 text-primary-600 rounded-xl">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">Phone Number</h4>
                                    <p className="text-gray-600">+966 50 123 4567</p>
                                    <p className="text-gray-600">+966 12 987 6543</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4 rtl:space-x-reverse">
                                <div className="p-3 bg-primary-100 text-primary-600 rounded-xl">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">Email Address</h4>
                                    <p className="text-gray-600">info@umrahtravel.sa</p>
                                    <p className="text-gray-600">support@umrahtravel.sa</p>
                                </div>
                            </div>
                        </div>

                        {/* Google Map Mockup */}
                        <div className="mt-12 rounded-2xl overflow-hidden h-64 bg-gray-200 relative">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                [Google Map Embed Interface]
                            </div>
                            <iframe
                                title="Office Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118830.3749448102!2d39.126079!3d21.543333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d01fb1137e59%3A0xe059573715102570!2sJeddah%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1709470000000!5m2!1sen!2s"
                                className="w-full h-full border-0"
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100">
                        {status === 'success' ? (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-6">
                                    <CheckCircle size={40} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                                <p className="text-gray-600 mb-8">Thank you for your inquiry. Our team will contact you shortly.</p>
                                <Button onClick={() => setStatus('idle')}>Send Another Message</Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                        <input
                                            required
                                            type="tel"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                            placeholder="+966"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Interested Package</label>
                                    <select
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                                        value={formData.package}
                                        onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                                    >
                                        <option>Economy</option>
                                        <option>Premium</option>
                                        <option>VIP Royal</option>
                                        <option>Custom Package</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                                    <textarea
                                        rows="4"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Tell us more about your requirements..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>
                                <Button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full py-4 text-lg"
                                >
                                    {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
                                    <Send className="ml-2 rtl:rotate-180" size={18} />
                                </Button>
                                {status === 'error' && (
                                    <p className="text-red-500 text-sm mt-2 text-center">Something went wrong. Please try again.</p>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default Contact;
