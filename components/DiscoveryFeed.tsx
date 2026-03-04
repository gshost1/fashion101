'use client';

import Link from 'next/link';
import { useState } from 'react';

const categories = ['All', 'Outerwear', 'Tops', 'Bottoms', 'Footwear', 'Accessories'];

interface Product {
    id: number;
    title: string;
    image_url: string;
    price: number;
    buy_url: string;
    category: string | null;
    brands: { name: string } | null;
}

interface DiscoveryFeedProps {
    initialProducts: Product[];
}

export default function DiscoveryFeed({ initialProducts }: DiscoveryFeedProps) {
    const [activeCategory, setActiveCategory] = useState<string>('All');

    const filtered = initialProducts.filter(
        (p) => activeCategory === 'All' || p.category === activeCategory.toLowerCase()
    );

    return (
        <>
            {/* Category filter bar */}
            <div className="max-w-6xl mx-auto mb-8 overflow-x-auto scrollbar-hide">
                <div className="flex gap-2 min-w-max">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-200 whitespace-nowrap ${activeCategory === cat
                                    ? 'text-white bg-white/10'
                                    : 'text-neutral-500 hover:text-neutral-300'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Empty state */}
            {filtered.length === 0 ? (
                <div className="max-w-6xl mx-auto text-center py-24">
                    <p className="text-neutral-500 text-lg">No products found in this category.</p>
                </div>
            ) : (
                /* Product grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {filtered.map((product) => (
                        <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            className="bg-neutral-900 rounded-2xl overflow-hidden flex flex-col border border-neutral-800 hover:border-neutral-600 transition-all duration-300 group"
                        >
                            <div className="overflow-hidden">
                                <img
                                    src={product.image_url}
                                    alt={product.title}
                                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-5 flex flex-col">
                                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
                                    {product.brands?.name}
                                </span>
                                <h2 className="text-base font-semibold text-white mt-1 leading-snug">
                                    {product.title}
                                </h2>
                                <p className="text-sm text-neutral-400 mt-2">
                                    ${Number(product.price).toFixed(2)}
                                </p>
                                <p className="text-xs text-neutral-600 mt-3 tracking-widest uppercase">Tap to view →</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}
