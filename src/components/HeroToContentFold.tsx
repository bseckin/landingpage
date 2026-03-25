/**
 * Bottom of hero → page body: replaces a flat hairline with depth, grain, and an asymmetric fold.
 * Purely decorative (aria-hidden at usage site).
 */
export default function HeroToContentFold() {
    return (
        <div
            className="relative z-[2] -mb-px h-[4.5rem] sm:h-[5.25rem] md:h-[6rem] w-full shrink-0 self-stretch pointer-events-none select-none"
            aria-hidden
        >
            {/* SVG top is transparent — without this, canvas waves read as a hard cut into the fold */}
            <div className="absolute inset-x-0 top-0 z-0 h-[72%] bg-gradient-to-b from-[#f8fafc] via-[#f8fafc]/78 to-transparent" />

            {/* Film grain — breaks the flat digital edge */}
            <div
                className="absolute inset-0 z-[2] opacity-[0.22] mix-blend-overlay [mask-image:linear-gradient(to_bottom,black_35%,transparent_100%)]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Soft lift shadow along the fold */}
            <svg
                className="absolute inset-x-0 bottom-0 z-[1] h-full w-full text-[#f8fafc] drop-shadow-[0_-12px_32px_rgba(15,23,42,0.07)]"
                viewBox="0 0 1440 96"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="heroFoldTint" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgb(248 250 252)" stopOpacity="1" />
                        <stop offset="42%" stopColor="rgb(241 245 249)" stopOpacity="1" />
                        <stop offset="100%" stopColor="rgb(248 250 252)" stopOpacity="1" />
                    </linearGradient>
                </defs>
                <path
                    fill="url(#heroFoldTint)"
                    d="M0 96V52c180 28 360-36 540-18s360 42 540 12 270-38 360-24v74H0z"
                />
            </svg>

            {/* Scan-line accents — asymmetric, not centered */}
            <div
                className="absolute bottom-[42%] left-[8%] z-[3] h-px w-[min(42%,22rem)] origin-left -rotate-[1.8deg] bg-gradient-to-r from-transparent via-secondary/45 to-transparent motion-safe:animate-[foldShimmer_8s_ease-in-out_infinite]"
            />
            <div
                className="absolute bottom-[28%] right-[6%] z-[3] h-px w-[min(36%,18rem)] origin-right rotate-[2.2deg] bg-gradient-to-l from-transparent via-primary/35 to-transparent motion-safe:animate-[foldShimmer_11s_ease-in-out_infinite_1.2s]"
            />

            {/* Diagonal mesh bleed — ties hero glow to page mesh */}
            <div className="absolute inset-0 z-[2] bg-[linear-gradient(115deg,transparent_40%,rgba(99,102,241,0.06)_48%,transparent_56%)] opacity-80 mix-blend-multiply" />
        </div>
    );
}
