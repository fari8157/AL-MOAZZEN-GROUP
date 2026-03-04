import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

export const Button = ({
    children,
    variant = 'primary',
    className,
    ...props
}) => {
    const variants = {
        primary: 'bg-primary-500 text-white hover:bg-primary-600 shadow-primary-200',
        outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50',
        secondary: 'bg-spiritual-charcoal text-white hover:bg-gray-800',
        ghost: 'text-gray-600 hover:bg-gray-100',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                'inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export const Section = ({
    children,
    className,
    title,
    subtitle,
    dark = false
}) => {
    return (
        <section className={cn(
            'py-20 px-4 sm:px-6 lg:px-8',
            dark ? 'bg-spiritual-charcoal text-white' : 'bg-transparent',
            className
        )}>
            <div className="max-w-7xl mx-auto">
                {(title || subtitle) && (
                    <div className="text-center mb-16">
                        {title && (
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-4xl font-bold mb-4"
                            >
                                {title}
                            </motion.h2>
                        )}
                        {subtitle && (
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className={cn(
                                    "text-lg max-w-2xl mx-auto",
                                    dark ? "text-gray-400" : "text-gray-600"
                                )}
                            >
                                {subtitle}
                            </motion.p>
                        )}
                    </div>
                )}
                {children}
            </div>
        </section>
    );
};
