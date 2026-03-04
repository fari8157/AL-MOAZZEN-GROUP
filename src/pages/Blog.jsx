import React from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from '../components/ui';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogData';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { SEO } from '../components/utils/SEO';

const Blog = () => {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language === 'ar' ? 'ar' : 'en';

    return (
        <div className="pt-10">
            <SEO
                title={t('blog.meta.title')}
                description={t('blog.meta.desc')}
            />

            <Section title={t('blog.title')} subtitle={t('blog.subtitle')}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {blogPosts.map((post, i) => {
                        const content = post[currentLang];
                        return (
                            <motion.article
                                key={post.id}
                                title={content.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
                            >
                                <Link to={`/blog/${post.slug}`} className="block overflow-hidden h-64">
                                    <img
                                        src={post.image}
                                        alt={content.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </Link>
                                <div className="p-8">
                                    <div className="flex items-center space-x-4 rtl:space-x-reverse text-xs text-gray-400 mb-4 uppercase tracking-widest font-semibold">
                                        <span className="flex items-center"><Calendar size={14} className="mr-1.5 rtl:mr-0 rtl:ml-1.5" /> {content.date}</span>
                                        <span className="flex items-center"><User size={14} className="mr-1.5 rtl:mr-0 rtl:ml-1.5" /> {content.author}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-500 transition-colors">
                                        <Link to={`/blog/${post.slug}`}>{content.title}</Link>
                                    </h3>
                                    <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">
                                        {content.excerpt}
                                    </p>
                                    <Link
                                        to={`/blog/${post.slug}`}
                                        className="inline-flex items-center text-primary-500 font-bold hover:translate-x-2 rtl:hover:-translate-x-2 transition-transform"
                                    >
                                        {t('blog.readArticle')}
                                        <ArrowRight size={18} className="ml-2 rtl:ml-0 rtl:mr-2 rtl:rotate-180" />
                                    </Link>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </Section>
        </div>
    );
};

export default Blog;
