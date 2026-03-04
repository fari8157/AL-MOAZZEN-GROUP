import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from '../ui/WhatsAppButton';

const Layout = ({ children }) => {
    const location = useLocation();
    const isBlogPage = location.pathname.startsWith('/blog');

    return (
        <div className="flex flex-col min-h-screen bg-spiritual-beige selection:bg-primary-200 selection:text-primary-900">
            {!isBlogPage && <Navbar />}
            <main className={`flex-grow ${!isBlogPage ? 'pt-20' : ''}`}>
                {children}
            </main>
            <WhatsAppButton />
            <Footer />
        </div>
    );
};

export default Layout;
