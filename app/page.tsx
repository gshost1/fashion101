import { supabase } from '@/utils/supabase';

export const revalidate = 0;

export default async function Home() {
  const { data: products, error } = await supabase
    .from('products')
    .select(
      `
        id,
        title,
        image_url,
        price,
        buy_url,
        brands (
          name
        )
      `
    );

  if (error) {
    return (
      <div className="p-10 text-red-500 font-bold">
        Error fetching database: {error.message}
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-black">
        Discovery Feed
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products?.map((product: any) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <img
              src={product.image_url}
              alt={product.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow text-black">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {product.brands?.name}
              </span>
              <h2 className="text-lg font-bold mt-1">{product.title}</h2>
              <p className="text-gray-700 mt-2">${product.price}</p>
              <div className="mt-auto pt-4">
                <a
                  href={product.buy_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-black text-white py-2 rounded font-medium hover:bg-gray-800 transition"
                >
                  Buy Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}