import Link from 'next/link';
import { Globe, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-background-dark text-white pt-20 pb-10 px-6 lg:px-12 border-t-4 border-primary">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                <div className="flex flex-col gap-6">
                    <h2 className="heading-font text-5xl tracking-tighter">THREAD</h2>
                    <p className="text-sm opacity-60 max-w-xs uppercase font-bold tracking-widest leading-loose">
                        Defining the new era of independent fashion. Real designers. Real craft. Zero compromise.
                    </p>
                </div>
                <div className="flex flex-col gap-6">
                    <h4 className="heading-font text-2xl uppercase text-primary">Explore</h4>
                    <ul className="flex flex-col gap-3 text-sm font-bold uppercase tracking-widest opacity-80">
                        <li><Link className="hover:text-primary transition-colors" href="/">Trending Now</Link></li>
                        <li><Link className="hover:text-primary transition-colors" href="/retake">Style Quiz</Link></li>
                        <li><Link className="hover:text-primary transition-colors" href="/">Archived Pieces</Link></li>
                        <li><Link className="hover:text-primary transition-colors" href="#">Gift Cards</Link></li>
                    </ul>
                </div>
                <div className="flex flex-col gap-6">
                    <h4 className="heading-font text-2xl uppercase text-primary">Creators</h4>
                    <ul className="flex flex-col gap-3 text-sm font-bold uppercase tracking-widest opacity-80">
                        <li><Link className="hover:text-primary transition-colors" href="#">Apply to Sell</Link></li>
                        <li><Link className="hover:text-primary transition-colors" href="#">Creator Studio</Link></li>
                        <li><Link className="hover:text-primary transition-colors" href="#">Shipping Hub</Link></li>
                        <li><Link className="hover:text-primary transition-colors" href="#">Guidelines</Link></li>
                    </ul>
                </div>
                <div className="flex flex-col gap-6">
                    <h4 className="heading-font text-2xl uppercase text-primary">About</h4>
                    <ul className="flex flex-col gap-3 text-sm font-bold uppercase tracking-widest opacity-80">
                        <li><Link className="hover:text-primary transition-colors" href="#">Our Ethos</Link></li>
                        <li><Link className="hover:text-primary transition-colors" href="#">Sustainability</Link></li>
                        <li><Link className="hover:text-primary transition-colors" href="#">Contact</Link></li>
                        <li><Link className="hover:text-primary transition-colors" href="#">Careers</Link></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-[10px] font-bold uppercase opacity-40 tracking-[0.2em]">© 2024 THREAD MARKETPLACE. ALL RIGHTS RESERVED.</p>
                <div className="flex gap-8">
                    <Link className="opacity-60 hover:opacity-100 transition-opacity" href="#">
                        <Globe size={24} />
                    </Link>
                    <Link className="opacity-60 hover:opacity-100 transition-opacity" href="#">
                        <Instagram size={24} />
                    </Link>
                    <Link className="opacity-60 hover:opacity-100 transition-opacity" href="#">
                        <Twitter size={24} />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
