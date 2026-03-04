'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

const categories = ['All', 'Outerwear', 'Tops', 'Bottoms', 'Footwear', 'Accessories'];
const styles = ['All', 'Gorpcore', 'Streetwear', 'Classic'];

interface Product {
    id: number;
    title: string;
    image_url: string;
    price: number;
    buy_url: string;
    category: string | null;
    style: string | null;
    brands: { name: string } | null;
}

interface DiscoveryFeedProps {
    initialProducts: Product[];
    showStyleFilter?: boolean;
}

export default function DiscoveryFeed({ initialProducts, showStyleFilter = false }: DiscoveryFeedProps) {
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [activeStyle, setActiveStyle] = useState<string>('All');

    const filtered = initialProducts.filter((p) => {
        const matchesCategory = activeCategory === 'All' || p.category === activeCategory.toLowerCase();
        const matchesStyle = !showStyleFilter || activeStyle === 'All' || p.style === activeStyle.toLowerCase();
        return matchesCategory && matchesStyle;
    });

    return (
        <>
            {/* Style filter — only shown when browsing all */}
            {showStyleFilter && (
                <FilterRow
                    label="Style"
                    options={styles}
                    active={activeStyle}
                    onChange={setActiveStyle}
                />
            )}

            {/* Category filter — always shown */}
            <FilterRow
                label="Category"
                options={categories}
                active={activeCategory}
                onChange={setActiveCategory}
            />

            {/* Filter/Sort header bar */}
            <div className="max-w-6xl mx-auto flex justify-between items-center py-4 mb-6 border-b border-neutral-800">
                <button
                    onClick={() => { }}
                    className="flex items-center gap-2 text-sm font-medium text-white hover:text-neutral-300 transition-colors"
                >
                    <SlidersHorizontal size={16} />
                    Filter / Sort
                </button>
                <span className="text-sm text-neutral-500">
                    {filtered.length} {filtered.length === 1 ? 'Item' : 'Items'}
                </span>
            </div>

            {/* Empty state */}
            {filtered.length === 0 ? (
                <div className="max-w-6xl mx-auto text-center py-24">
                    <p className="text-neutral-500 text-lg">No products match these filters.</p>
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

/* Reusable filter row component — easy to add more filters later */
function FilterRow({
    label,
    options,
    active,
    onChange,
}: {
    label: string;
    options: string[];
    active: string;
    onChange: (value: string) => void;
}) {
    return (
        <div className="max-w-6xl mx-auto mb-6">
            <p className="text-[10px] text-neutral-600 uppercase tracking-widest mb-2">{label}</p>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {options.map((opt) => (
                    <button
                        key={opt}
                        onClick={() => onChange(opt)}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-200 whitespace-nowrap ${active === opt
                            ? 'text-white bg-white/10'
                            : 'text-neutral-500 hover:text-neutral-300'
                            }`}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}
