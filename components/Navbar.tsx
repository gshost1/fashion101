import Link from 'next/link';

export default function Navbar() {
    return (
        <header className="fixed top-0 z-50 w-full bg-[#F5F0E8] border-b-2 border-[#0D0D0D] px-6 lg:px-12 py-4 flex items-center justify-between">
            <div className="flex items-center gap-12">
                <Link className="heading-font text-[#0D0D0D] no-underline text-4xl tracking-tighter" href="/">THREAD</Link>
                <nav className="flex items-center gap-8 uppercase font-bold text-sm tracking-widest text-[#0D0D0D]">
                    <Link className="hover:text-[#D4401A] transition-colors" href="/">Discover</Link>
                    <Link className="hover:text-[#D4401A] transition-colors" href="#">Creators</Link>
                    <Link className="hover:text-[#D4401A] transition-colors" href="#">New Drops</Link>
                    <Link className="hover:text-[#D4401A] transition-colors" href="#">Community</Link>
                </nav>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center border-2 border-[#0D0D0D] bg-white px-3 py-1 text-[#0D0D0D]">
                    <span className="material-symbols-outlined text-xl">search</span>
                    <input className="border-none focus:outline-none focus:ring-0 text-sm font-bold uppercase w-32 md:w-48 bg-transparent" placeholder="SEARCH PIECES..." type="text" />
                </div>
                <div className="flex items-center gap-4">
                    <button className="uppercase text-[#0D0D0D] text-sm font-bold tracking-widest hover:underline">Sign In</button>
                    <button className="bg-[#D4401A] text-white px-6 py-2 uppercase font-bold tracking-widest border-2 border-[#0D0D0D] shadow-[4px_4px_0px_0px_rgba(13,13,13,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
                        Join Free
                    </button>
                </div>
            </div>
        </header>
    );
}
