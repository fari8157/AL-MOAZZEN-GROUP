import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Section, Button } from '../components/ui';
import { blogPosts } from '../data/blogData';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const BlogDetails = () => {
    const { slug } = useParams();
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return <Navigate to="/404" />;
    }

    return (
        <div className="pt-10">
            <Helmet>
                <title>{post.title} | AL-MOAZZEN GROUP Blog</title>
                <meta name="description" content={post.excerpt} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:image" content={post.image} />
                <meta property="og:type" content="article" />
            </Helmet>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link
                    to="/blog"
                    className="inline-flex items-center text-gray-500 hover:text-primary-500 mb-8 transition-colors group"
                >
                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:translate-x-1" />
                    Back to Blog
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-400 mb-4 font-medium">
                        <span className="flex items-center"><Calendar size={16} className="mr-2" /> {post.date}</span>
                        <span className="flex items-center"><User size={16} className="mr-2" /> {post.author}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">{post.title}</h1>

                    <div className="rounded-3xl overflow-hidden h-[400px] mb-12">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>

                    <div
                        className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
                        <div className="flex space-x-4 rtl:space-x-reverse">
                            <Button variant="ghost" className="p-3">
                                <Share2 size={20} />
                            </Button>
                        </div>
                        <Link to="/contact">
                            <Button>Inquire About Umrah</Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default BlogDetails;
