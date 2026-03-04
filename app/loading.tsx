export default function Loading() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-neutral-700 border-t-white rounded-full animate-spin" />
                <p className="text-xs text-neutral-600 tracking-widest uppercase">Loading</p>
            </div>
        </main>
    );
}
