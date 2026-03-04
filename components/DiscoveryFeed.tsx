'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SlidersHorizontal, X, Plus, Minus } from 'lucide-react';

const categories = ['Outerwear', 'Tops', 'Bottoms', 'Footwear', 'Accessories'];
const styles = ['Gorpcore', 'Streetwear', 'Classic'];
const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'A-Z'];

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
    // Active filters
    const [activeCategories, setActiveCategories] = useState<string[]>([]);
    const [activeStyles, setActiveStyles] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<string>('Newest');

    // Drawer state
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Pending filters (applied only on "Apply")
    const [pendingCategories, setPendingCategories] = useState<string[]>([]);
    const [pendingStyles, setPendingStyles] = useState<string[]>([]);
    const [pendingSort, setPendingSort] = useState<string>('Newest');

    // Filter products
    const filtered = initialProducts
        .filter((p) => {
            const matchesCategory = activeCategories.length === 0 || activeCategories.includes(p.category?.toLowerCase() ?? '');
            const matchesStyle = !showStyleFilter || activeStyles.length === 0 || activeStyles.includes(p.style?.toLowerCase() ?? '');
            return matchesCategory && matchesStyle;
        })
        .sort((a, b) => {
            if (sortBy === 'Price: Low to High') return a.price - b.price;
            if (sortBy === 'Price: High to Low') return b.price - a.price;
            if (sortBy === 'A-Z') return a.title.localeCompare(b.title);
            return 0; // Newest = default order
        });

    function openDrawer() {
        setPendingCategories([...activeCategories]);
        setPendingStyles([...activeStyles]);
        setPendingSort(sortBy);
        setDrawerOpen(true);
    }

    function applyFilters() {
        setActiveCategories(pendingCategories);
        setActiveStyles(pendingStyles);
        setSortBy(pendingSort);
        setDrawerOpen(false);
    }

    function clearAll() {
        setPendingCategories([]);
        setPendingStyles([]);
        setPendingSort('Newest');
    }

    function togglePendingCategory(cat: string) {
        const val = cat.toLowerCase();
        setPendingCategories((prev) =>
            prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val]
        );
    }

    function togglePendingStyle(style: string) {
        const val = style.toLowerCase();
        setPendingStyles((prev) =>
            prev.includes(val) ? prev.filter((s) => s !== val) : [...prev, val]
        );
    }

    // Count how many products match pending filters
    const pendingCount = initialProducts.filter((p) => {
        const matchCat = pendingCategories.length === 0 || pendingCategories.includes(p.category?.toLowerCase() ?? '');
        const matchStyle = !showStyleFilter || pendingStyles.length === 0 || pendingStyles.includes(p.style?.toLowerCase() ?? '');
        return matchCat && matchStyle;
    }).length;

    return (
        <>
            {/* Filter/Sort header bar */}
            <div className="max-w-6xl mx-auto flex justify-between items-center py-4 mb-6 border-b border-neutral-800">
                <button
                    onClick={openDrawer}
                    className="flex items-center gap-2 text-sm font-medium text-white hover:text-neutral-300 transition-colors"
                >
                    <SlidersHorizontal size={16} />
                    Filter / Sort
                </button>
                <span className="text-sm text-neutral-500">
                    {filtered.length} {filtered.length === 1 ? 'Item' : 'Items'}
                </span>
            </div>

            {/* Product grid or empty state */}
            {filtered.length === 0 ? (
                <div className="max-w-6xl mx-auto text-center py-24">
                    <p className="text-neutral-500 text-lg">No products match these filters.</p>
                </div>
            ) : (
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

            {/* Drawer overlay */}
            {drawerOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setDrawerOpen(false)}
                    />

                    {/* Drawer panel */}
                    <div className="relative w-full max-w-md h-full bg-[#0a0a0a] border-l border-neutral-800 flex flex-col animate-slide-in">
                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-5 border-b border-neutral-800">
                            <div className="flex items-center gap-2 text-sm font-medium text-white">
                                <SlidersHorizontal size={16} />
                                Filter / Sort
                            </div>
                            <button
                                onClick={() => setDrawerOpen(false)}
                                className="text-neutral-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Scrollable sections */}
                        <div className="flex-1 overflow-y-auto">
                            {/* Sort By */}
                            <AccordionSection title="Sort By" defaultOpen>
                                <div className="flex flex-col gap-1">
                                    {sortOptions.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => setPendingSort(opt)}
                                            className={`text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${pendingSort === opt
                                                    ? 'text-white bg-white/10'
                                                    : 'text-neutral-400 hover:text-white'
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </AccordionSection>

                            {/* Style — only when browsing all */}
                            {showStyleFilter && (
                                <AccordionSection title="Style">
                                    <div className="flex flex-col gap-1">
                                        {styles.map((s) => (
                                            <button
                                                key={s}
                                                onClick={() => togglePendingStyle(s)}
                                                className={`text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex justify-between items-center ${pendingStyles.includes(s.toLowerCase())
                                                        ? 'text-white bg-white/10'
                                                        : 'text-neutral-400 hover:text-white'
                                                    }`}
                                            >
                                                {s}
                                                {pendingStyles.includes(s.toLowerCase()) && (
                                                    <span className="text-xs">✓</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </AccordionSection>
                            )}

                            {/* Category */}
                            <AccordionSection title="Category">
                                <div className="flex flex-col gap-1">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => togglePendingCategory(cat)}
                                            className={`text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex justify-between items-center ${pendingCategories.includes(cat.toLowerCase())
                                                    ? 'text-white bg-white/10'
                                                    : 'text-neutral-400 hover:text-white'
                                                }`}
                                        >
                                            {cat}
                                            {pendingCategories.includes(cat.toLowerCase()) && (
                                                <span className="text-xs">✓</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </AccordionSection>
                        </div>

                        {/* Footer buttons */}
                        <div className="px-6 py-5 border-t border-neutral-800 flex gap-3">
                            <button
                                onClick={clearAll}
                                className="flex-1 py-3 rounded-lg border border-neutral-700 text-sm font-semibold text-white hover:bg-neutral-900 transition-colors"
                            >
                                Clear All
                            </button>
                            <button
                                onClick={applyFilters}
                                className="flex-1 py-3 rounded-lg bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors"
                            >
                                Apply ({pendingCount})
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

/* Accordion section component */
function AccordionSection({
    title,
    defaultOpen = false,
    children,
}: {
    title: string;
    defaultOpen?: boolean;
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-neutral-800">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center px-6 py-5 text-sm font-semibold text-white hover:text-neutral-300 transition-colors"
            >
                {title}
                {open ? <Minus size={16} className="text-neutral-500" /> : <Plus size={16} className="text-neutral-500" />}
            </button>
            {open && (
                <div className="px-6 pb-5">
                    {children}
                </div>
            )}
        </div>
    );
}
