import { supabase } from '@/utils/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 0;

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params;

    const { data: product, error } = await supabase
        .from('products')
        .select(`id, title, image_url, price, buy_url, social_url, style, brands ( name )`)
        .eq('id', id)
        .single();

    if (error || !product) return notFound();

    const brandName = (product.brands as any)?.name ?? '';

    return (
        <main className="min-h-screen bg-background-light flex flex-col items-center px-6 py-14">
            {/* Back link */}
            <div className="w-full max-w-4xl mb-8">
                <Link
                    href={product.style ? `/?style=${product.style}` : '/'}
                    className="text-xs text-slate-500 hover:text-slate-900 transition tracking-widest uppercase"
                >
                    ← Back to Feed
                </Link>
            </div>

            {/* Product layout */}
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image */}
                <div className="border-2 border-border-dark bg-slate-200">
                    <img
                        src={product.image_url}
                        alt={product.title}
                        className="w-full h-[500px] object-cover"
                    />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center gap-6">
                    <div>
                        <p className="text-xs font-bold tracking-[0.3em] text-slate-500 uppercase mb-2">
                            {brandName}
                        </p>
                        <h1 className="heading-font text-5xl text-border-dark leading-none">
                            {product.title}
                        </h1>
                    </div>

                    <div className="heading-font text-4xl text-primary">
                        ${product.price}
                    </div>

                    {/* Buy button */}
                    <a
                        href={product.buy_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-primary text-white py-4 border-2 border-border-dark text-lg font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(13,13,13,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                    >
                        Shop Now →
                    </a>

                    {/* Social link */}
                    {product.social_url && (
                        <a
                            href={product.social_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-primary transition uppercase tracking-widest mt-4"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                            See {brandName} on Instagram
                        </a>
                    )}

                    {/* Style tag */}
                    {product.style && (
                        <span className="self-start text-xs font-black tracking-widest uppercase text-slate-600 border-2 border-slate-300 px-3 py-1">
                            {product.style}
                        </span>
                    )}
                </div>
            </div>
        </main>
    );
}
