import { cookies } from 'next/headers';
import Link from 'next/link';
import StyleQuiz from '@/components/StyleQuiz';
import DiscoveryFeed from '@/components/DiscoveryFeed';
import { supabase } from '@/utils/supabase';

export const revalidate = 0;

const validStyles = ['gorpcore', 'streetwear', 'classic'];

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

  const rawStyle = params.style || cookieStore.get('user_style')?.value || null;

  if (!rawStyle) {
    return <StyleQuiz />;
  }

  if (!validStyles.includes(rawStyle)) {
    return <StyleQuiz />;
  }

  const style = rawStyle;

  const { data: products, error } = await supabase
    .from('products')
    .select(`id, title, image_url, price, buy_url, category, brands ( name )`)
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

      {(!products || products.length === 0) ? (
        <div className="max-w-6xl mx-auto text-center py-24">
          <p className="text-neutral-500 text-lg">No products found for this style yet.</p>
        </div>
      ) : (
        <DiscoveryFeed initialProducts={products as any} />
      )}
    </main>
  );
}
