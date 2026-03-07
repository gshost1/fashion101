'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SlidersHorizontal, X, Plus, Minus, Heart } from 'lucide-react';

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

    // UI-only top tabs 
    const [activeTab, setActiveTab] = useState('Womenswear');

    // Local wishlist state (visual only, Set of product IDs)
    const [wishlist, setWishlist] = useState<Set<number>>(new Set());

    function toggleWishlist(e: React.MouseEvent, productId: number) {
        e.preventDefault();
        e.stopPropagation();
        setWishlist((prev) => {
            const next = new Set(prev);
            if (next.has(productId)) next.delete(productId);
            else next.add(productId);
            return next;
        });
    }

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

    const pendingCount = initialProducts.filter((p) => {
        const matchCat = pendingCategories.length === 0 || pendingCategories.includes(p.category?.toLowerCase() ?? '');
        const matchStyle = !showStyleFilter || pendingStyles.length === 0 || pendingStyles.includes(p.style?.toLowerCase() ?? '');
        return matchCat && matchStyle;
    }).length;

    return (
        <>
            {/* THREAD Tabs Row (UI Only) */}
            {/* TODO: add gender field to products table to enable tab filtering */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-6 border-b-2 border-border-dark pb-4">
                <div className="flex gap-8 overflow-x-auto scrollbar-hide">
                    {['Womenswear', 'Menswear', 'Unisex', 'Accessories'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`heading-font text-4xl uppercase pb-2 whitespace-nowrap transition-opacity ${activeTab === tab ? 'border-b-4 border-primary opacity-100' : 'opacity-30 hover:opacity-100'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Filter/Sort header bar */}
            <div className="flex justify-between items-center py-4 mb-6 border-b-2 border-border-dark">
                <button
                    onClick={openDrawer}
                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
                >
                    <SlidersHorizontal size={18} />
                    Filter & Sort
                </button>
                <span className="text-sm font-bold opacity-60 uppercase tracking-widest">
                    {filtered.length} {filtered.length === 1 ? 'Piece' : 'Pieces'}
                </span>
            </div>

            {/* Product grid or empty state */}
            {filtered.length === 0 ? (
                <div className="text-center py-24">
                    <p className="text-slate-500 font-bold uppercase tracking-widest">No products match these filters.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {filtered.map((product) => {
                        const isLiked = wishlist.has(product.id);
                        return (
                            <Link key={product.id} href={`/product/${product.id}`} className="product-card group relative block">
                                <div className="relative border-2 border-border-dark aspect-[4/5] overflow-hidden bg-slate-200">
                                    <img
                                        src={product.image_url}
                                        alt={product.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <button
                                        onClick={(e) => toggleWishlist(e, product.id)}
                                        className={`absolute top-4 right-4 bg-white p-2 border-2 border-border-dark transition-all duration-300 hover:text-primary ${isLiked ? 'opacity-100 text-primary' : 'opacity-0 group-hover:opacity-100'
                                            }`}
                                    >
                                        <Heart size={20} className={isLiked ? "fill-current" : ""} />
                                    </button>
                                </div>
                                <div className="mt-4 flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 border border-border-dark overflow-hidden bg-slate-100 flex items-center justify-center">
                                                <span className="text-[10px] font-bold">{product.brands?.name.charAt(0)}</span>
                                            </div>
                                            <span className="text-xs font-black uppercase opacity-60">@{product.brands?.name.replace(/\s+/g, '_').toUpperCase()}</span>
                                        </div>
                                        <div className="flex items-center gap-1 opacity-60">
                                            <Heart size={14} className={isLiked ? "fill-current text-primary" : ""} />
                                            <span className="text-[10px] font-bold">{isLiked ? '1' : '0'}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-start gap-4">
                                        <h4 className="heading-font text-2xl leading-none">{product.title}</h4>
                                        <p className="heading-font text-2xl text-primary">${Number(product.price).toFixed(0)}</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}

            <div className="mt-20 flex justify-center">
                <button className="bg-white text-border-dark px-12 py-4 uppercase font-bold text-lg border-2 border-border-dark hover:bg-border-dark hover:text-white transition-all tracking-widest shadow-[4px_4px_0px_0px_rgba(13,13,13,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1">
                    Explore All Pieces
                </button>
            </div>

            {/* Drawer overlay */}
            {drawerOpen && (
                <div className="fixed inset-0 z-[60] flex justify-end">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
                    <div className="relative w-full max-w-md h-full bg-background-light border-l-2 border-border-dark flex flex-col animate-slide-in shadow-2xl">
                        <div className="flex justify-between items-center px-6 py-6 border-b-2 border-border-dark">
                            <div className="flex items-center gap-2 heading-font text-3xl">
                                <SlidersHorizontal size={24} />
                                FILTER / SORT
                            </div>
                            <button onClick={() => setDrawerOpen(false)} className="hover:text-primary transition-colors">
                                <X size={28} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <AccordionSection title="SORT BY" defaultOpen>
                                <div className="flex flex-col gap-2">
                                    {sortOptions.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => setPendingSort(opt)}
                                            className={`text-left px-4 py-3 border-2 text-sm uppercase font-bold tracking-widest transition-all ${pendingSort === opt ? 'border-border-dark bg-border-dark text-white' : 'border-transparent hover:border-black/10'
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </AccordionSection>
                            {showStyleFilter && (
                                <AccordionSection title="AESTHETIC">
                                    <div className="flex flex-col gap-2">
                                        {styles.map((s) => (
                                            <button
                                                key={s}
                                                onClick={() => togglePendingStyle(s)}
                                                className={`text-left px-4 py-3 border-2 text-sm uppercase font-bold tracking-widest transition-all flex justify-between items-center ${pendingStyles.includes(s.toLowerCase()) ? 'border-border-dark bg-border-dark text-white' : 'border-transparent hover:border-black/10'
                                                    }`}
                                            >
                                                {s}
                                                {pendingStyles.includes(s.toLowerCase()) && <span>✓</span>}
                                            </button>
                                        ))}
                                    </div>
                                </AccordionSection>
                            )}
                            <AccordionSection title="CATEGORY">
                                <div className="flex flex-col gap-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => togglePendingCategory(cat)}
                                            className={`text-left px-4 py-3 border-2 text-sm uppercase font-bold tracking-widest transition-all flex justify-between items-center ${pendingCategories.includes(cat.toLowerCase()) ? 'border-border-dark bg-border-dark text-white' : 'border-transparent hover:border-black/10'
                                                }`}
                                        >
                                            {cat}
                                            {pendingCategories.includes(cat.toLowerCase()) && <span>✓</span>}
                                        </button>
                                    ))}
                                </div>
                            </AccordionSection>
                        </div>
                        <div className="px-6 py-6 border-t-2 border-border-dark flex gap-4 bg-background-light">
                            <button onClick={clearAll} className="flex-1 py-4 border-2 border-border-dark text-sm font-bold uppercase tracking-widest hover:bg-black/5 transition-colors">
                                Clear All
                            </button>
                            <button onClick={applyFilters} className="flex-1 py-4 bg-primary text-white border-2 border-border-dark text-sm font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(13,13,13,1)] active:shadow-none active:translate-y-1 active:translate-x-1 transition-all">
                                Apply ({pendingCount})
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function AccordionSection({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="border-b-2 border-border-dark">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center px-6 py-6 heading-font text-2xl hover:text-primary transition-colors"
            >
                {title}
                {open ? <Minus size={20} /> : <Plus size={20} />}
            </button>
            {open && <div className="px-6 pb-6">{children}</div>}
        </div>
    );
}
