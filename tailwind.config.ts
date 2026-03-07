import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#d5401a",
                "background-light": "#F5F0E8",
                "background-dark": "#0D0D0D",
                "border-dark": "#0D0D0D",
            },
            fontFamily: {
                "display": ["var(--font-bebas-neue)"],
                "body": ["var(--font-dm-sans)"],
            },
            borderRadius: {
                "DEFAULT": "0px",
                "lg": "0px",
                "xl": "0px",
                "full": "9999px",
            },
        },
    },
    plugins: [],
};
export default config;
