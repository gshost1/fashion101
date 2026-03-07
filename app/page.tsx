import { cookies } from 'next/headers';
import Link from 'next/link';
import StyleQuiz from '@/components/StyleQuiz';
import DiscoveryFeed from '@/components/DiscoveryFeed';
import { supabase } from '@/utils/supabase';

export const revalidate = 0;

const validStyles = ['gorpcore', 'streetwear', 'classic', 'all'];

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
  const isAll = style === 'all';

  // Fetch products — all or filtered by style
  let query = supabase
    .from('products')
    .select(`id, title, image_url, price, buy_url, category, style, brands ( name )`);

  if (!isAll) {
    query = query.eq('style', style);
  }

  const { data: products, error } = await query;

  if (error) {
    return (
      <div className="p-10 text-red-500 font-bold">
        Error fetching database: {error.message}
      </div>
    );
  }

  // Get up to 4 images for the hero section (fallback to placeholder if fewer)
  const heroImages = [
    products?.[0]?.image_url,
    products?.[1]?.image_url,
    products?.[2]?.image_url,
    products?.[3]?.image_url,
  ];

  return (
    <main className="bg-[#F5F0E8]">
      {/* Section 1: Hero Section */}
      <section className="px-6 lg:px-12 pb-16 pt-24 lg:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Editorial Content */}
          <div className="flex flex-col gap-8">
            <p className="text-[#D4401A] uppercase tracking-widest font-bold text-sm">For Independent Fashion Creators</p>
            <h1 className="heading-font text-[96px] lg:text-[160px] leading-[0.85] text-[#0D0D0D]">
              WEAR WHAT&apos;S <br /> <span className="text-[#D4401A]">NEXT.</span>
            </h1>
            <p className="text-lg lg:text-xl max-w-lg font-medium leading-relaxed text-[#0D0D0D]">
              The editorial marketplace for independent creators and high-concept streetwear. Small batches, handmade soul, raw aesthetics.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#D4401A] text-white px-10 py-4 uppercase font-bold text-lg border-2 border-[#0D0D0D] shadow-[6px_6px_0px_0px_rgba(13,13,13,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                Shop the Feed
              </button>
              <button className="bg-white text-[#0D0D0D] px-10 py-4 uppercase font-bold text-lg border-2 border-[#0D0D0D] shadow-[6px_6px_0px_0px_rgba(13,13,13,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                Start Selling
              </button>
            </div>
            {/* Stat Counters */}
            <div className="flex gap-12 pt-8 border-t-2 border-[#0D0D0D]/10 text-[#0D0D0D]">
              <div>
                <p className="heading-font text-4xl text-[#D4401A]">2K+</p>
                <p className="uppercase text-xs font-black tracking-widest opacity-60">Creators</p>
              </div>
              <div>
                <p className="heading-font text-4xl text-[#D4401A]">15K+</p>
                <p className="uppercase text-xs font-black tracking-widest opacity-60">Live Pieces</p>
              </div>
              <div>
                <p className="heading-font text-4xl text-[#D4401A]">50K+</p>
                <p className="uppercase text-xs font-black tracking-widest opacity-60">Community</p>
              </div>
            </div>
          </div>

          {/* Right: Lookbook Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((index) => {
              const imgUrl = heroImages[index];
              const offsets = ['', 'translate-y-8', '-translate-y-4', 'translate-y-4'];
              const labels = ['Look 01 / $240', 'Handmade / $185', 'Capsule / $310', 'Archive / $150'];

              return (
                <div key={index} className={`relative border-2 border-[#0D0D0D] aspect-[3/4] overflow-hidden group ${offsets[index]}`}>
                  {imgUrl ? (
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={imgUrl}
                      alt="Hero Lookbook Image"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#C8C0B4]"></div>
                  )}
                  <div className="absolute bottom-2 left-2 bg-white text-[#0D0D0D] border border-[#0D0D0D] px-2 py-1 text-[10px] font-black uppercase">
                    {labels[index]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2: Scrolling Marquee */}
      <section className="bg-[#D4401A] py-6 border-y-2 border-[#0D0D0D] overflow-hidden">
        <div className="marquee">
          <div className="marquee-content flex gap-8 items-center">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="heading-font text-4xl text-white uppercase px-4 whitespace-nowrap">
                Independent Designers · Small Batch · Handmade Pieces · Not Fast Fashion · Wear What&apos;s Next ·
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Style Quiz Banner */}
      <section className="bg-[#0D0D0D] text-white px-6 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="bg-[#D4401A] p-4 border-2 border-white">
            <span className="material-symbols-outlined text-4xl leading-none">style</span>
          </div>
          <div>
            <h3 className="heading-font text-4xl uppercase">Take the Style Quiz</h3>
            <p className="text-sm opacity-80 uppercase tracking-widest font-bold">Discover your signature aesthetic in 2 minutes.</p>
          </div>
        </div>
        <Link
          href="/retake"
          className="bg-white text-[#0D0D0D] px-10 py-4 uppercase font-bold text-lg border-2 border-[#D4401A] hover:bg-[#D4401A] hover:text-white transition-all text-center"
        >
          Start Quiz
        </Link>
      </section>

      {/* Section 4: Product Feed */}
      <section className="px-6 lg:px-12 py-20">
        {(!products || products.length === 0) ? (
          <div className="max-w-6xl mx-auto text-center py-24 text-[#0D0D0D]">
            <p className="font-bold uppercase tracking-widest">No products found for this style.</p>
          </div>
        ) : (
          <DiscoveryFeed initialProducts={products as any} showStyleFilter={isAll} />
        )}
      </section>
    </main>
  );
}
