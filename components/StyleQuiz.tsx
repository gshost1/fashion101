'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const questions = [
    {
        question: 'Your weekend plans are most likely:',
        options: [
            { label: '🏔️ Hiking, camping, or anything outdoors', value: 'gorpcore' },
            { label: '🎨 Gallery opening, record store, or a gig', value: 'streetwear' },
            { label: '☕ A long brunch or walking around the city looking sharp', value: 'classic' },
        ],
    },
    {
        question: 'Pick the palette that speaks to you:',
        options: [
            { label: '🌿 Olive, clay, moss, rust — earthy all the way', value: 'gorpcore' },
            { label: '🖤 Bold graphics, bleach, tie-dye, unexpected color', value: 'streetwear' },
            { label: '🤍 Navy, camel, cream, black — clean and timeless', value: 'classic' },
        ],
    },
    {
        question: 'The most important thing about what you wear:',
        options: [
            { label: '🌱 It\'s ethical, natural, and built to last', value: 'gorpcore' },
            { label: '💥 It\'s a conversation starter — people notice', value: 'streetwear' },
            { label: '✂️ It fits perfectly and looks effortlessly put-together', value: 'classic' },
        ],
    },
];

const styleLabels: Record<string, string> = {
    gorpcore: 'Gorpcore',
    streetwear: 'Streetwear',
    classic: 'Classic',
};

export default function StyleQuiz() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [scores, setScores] = useState<Record<string, number>>({ gorpcore: 0, streetwear: 0, classic: 0 });

    function handleAnswer(value: string) {
        const newScores = { ...scores, [value]: scores[value] + 1 };
        setScores(newScores);

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            // Determine winner
            const result = Object.entries(newScores).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
            // Save to cookie (1 year)
            document.cookie = `user_style=${result}; path=/; max-age=${60 * 60 * 24 * 365}`;
            router.push(`/?style=${result}`);
        }
    }

    const current = questions[step];
    const progress = (step / questions.length) * 100;

    return (
        <main className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6 py-16">
            {/* Header */}
            <div className="text-center mb-12">
                <p className="text-xs font-semibold tracking-[0.3em] text-neutral-500 uppercase mb-3">
                    Fashion101 Discovery
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                    Find Your Style
                </h1>
                <p className="text-neutral-400 mt-3 text-base max-w-sm mx-auto">
                    Three questions. A feed curated just for you.
                </p>
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-md mb-10">
                <div className="flex justify-between text-xs text-neutral-600 mb-2">
                    <span>Question {step + 1} of {questions.length}</span>
                    <span>{Math.round((step / questions.length) * 100)}%</span>
                </div>
                <div className="h-0.5 bg-neutral-800 w-full rounded-full overflow-hidden">
                    <div
                        className="h-full bg-white transition-all duration-500 ease-out rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Question card */}
            <div className="w-full max-w-md">
                <h2 className="text-xl font-semibold text-white mb-8 text-center leading-snug">
                    {current.question}
                </h2>
                <div className="flex flex-col gap-3">
                    {current.options.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => handleAnswer(opt.value)}
                            className="w-full text-left px-5 py-4 rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-white hover:text-white hover:bg-neutral-800 transition-all duration-200 text-sm leading-snug"
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Style hint labels */}
            <div className="mt-14 flex gap-6 text-xs text-neutral-700">
                {Object.values(styleLabels).map((label) => (
                    <span key={label} className="tracking-widest uppercase">{label}</span>
                ))}
            </div>
        </main>
    );
}
