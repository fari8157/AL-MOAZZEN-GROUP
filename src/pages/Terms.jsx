import React from 'react';
import { Section } from '../components/ui';

const Terms = () => {
    return (
        <div className="pt-20">
            <div className="prose prose-md max-w-none text-gray-600">
                <p className="mb-4">By using the services of AL-MOAZZEN GROUP, you agree to the following terms and conditions...</p>
                <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Booking & Cancellation</h2>
                <p>Details regarding booking and cancellation of Umrah packages with AL-MOAZZEN GROUP.</p>
                <h2>1. Agreement to Terms</h2>
                <p>By accessing our website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations.</p>
                <h2>2. Use of Services</h2>
                <p>Our services are provided for the purpose of facilitating Umrah travel. Users are responsible for providing accurate information for visa processing and bookings.</p>
                {/* Add more legal text as needed */}
            </div>
        </div>
    );
};

export default Terms;
