import { cookies } from 'next/headers';
import Link from 'next/link';
import StyleQuiz from '@/components/StyleQuiz';
import { supabase } from '@/utils/supabase';

export const revalidate = 0;

const styleLabels: Record<string, string> = {
  gorpcore: 'Gorpcore / Outdoors',
  streetwear: 'Streetwear / Graphic',
  classic: 'Classic / Minimalist',
};

interface PageProps {
  searchParams: Promise<{ style?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const cookieStore = await cookies();

  // Priority: URL param → cookie → show quiz
  const style = params.style || cookieStore.get('user_style')?.value || null;

  // No style determined — show the quiz
  if (!style) {
    return <StyleQuiz />;
  }

  // Fetch products filtered by style
  const { data: products, error } = await supabase
    .from('products')
    .select(`id, title, image_url, price, buy_url, brands ( name )`)
    .eq('style', style);

  if (error) {
    return (
      <div className="p-10 text-red-500 font-bold">
        Error fetching database: {error.message}
      </div>
    );
  }

  const label = styleLabels[style] ?? style;

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-14">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-neutral-500 uppercase mb-2">
            Your Style
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{label}</h1>
        </div>
        <Link
          href="/retake"
          className="text-xs text-neutral-500 hover:text-white transition border border-neutral-800 hover:border-neutral-500 px-4 py-2 rounded-lg"
        >
          Retake Quiz
        </Link>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products?.map((product: any) => (
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
              <p className="text-xs text-neutral-600 mt-3 tracking-widest uppercase">Tap to view →</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
