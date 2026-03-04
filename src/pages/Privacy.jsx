import React from 'react';
import { Section } from '../components/ui';

const Privacy = () => {
    return (
        <div className="pt-20">
            <Section title="Privacy Policy">
                <div className="max-w-3xl mx-auto prose prose-gray">
                    <p>Last updated: March 2026</p>
                    <h2>Introduction</h2>
                    <p>We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website.</p>
                    <h2>Data We Collect</h2>
                    <p>We may collect, use, store and transfer different kinds of personal data about you, including Identity Data (name), Contact Data (email, phone), and Technical Data (IP address, browser type).</p>
                    {/* Add more legal text as needed */}
                </div>
            </Section>
        </div>
    );
};

export default Privacy;
