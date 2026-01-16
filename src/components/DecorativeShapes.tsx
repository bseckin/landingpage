import { motion } from 'framer-motion';

type Variant = 'hero' | 'problem' | 'services';

interface LivingBackgroundProps {
    variant: Variant;
    className?: string;
}

/**
 * LivingBackground
 * The core of the "Digital Aurora" design system.
 * Creates a massive, drifting, fluid environment using drifting gradient orbs.
 * Replaces isolated decorative elements with a continuous atmosphere.
 */
export const LivingBackground = ({ variant, className = "" }: LivingBackgroundProps) => {

    // Configuration per variant
    const config = {
        hero: {
            // Energetic, Start-up, Teal/Green
            blobs: [
                { color: "bg-primary", size: "w-[800px] h-[800px]", opacity: 0.15, initial: { x: -200, y: -200 } },
                { color: "bg-blue-500", size: "w-[600px] h-[600px]", opacity: 0.10, initial: { x: 400, y: 100 } },
                { color: "bg-teal-300", size: "w-[400px] h-[400px]", opacity: 0.20, initial: { x: 0, y: 0 } },
            ]
        },
        problem: {
            // Deep, Friction, Red/Dark Orange/Void
            blobs: [
                { color: "bg-red-900", size: "w-[1000px] h-[1000px]", opacity: 0.25, initial: { x: 0, y: 0 } },
                { color: "bg-orange-900", size: "w-[700px] h-[700px]", opacity: 0.15, initial: { x: -300, y: 300 } },
                { color: "bg-black", size: "w-[500px] h-[500px]", opacity: 0.8, initial: { x: 200, y: -200 } }, // Void hole
            ]
        },
        services: {
            // Ambient Light Strategy: Bright light sources that glow on black
            blobs: [
                { color: "bg-blue-500", size: "w-[1200px] h-[1200px]", opacity: 0.25, initial: { x: 200, y: -200 } },
                { color: "bg-cyan-500", size: "w-[1000px] h-[1000px]", opacity: 0.20, initial: { x: -400, y: 100 } },
                { color: "bg-indigo-500", size: "w-[800px] h-[600px]", opacity: 0.25, initial: { x: 0, y: 400 } },
            ]
        }
    };

    const currentConfig = config[variant];

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
            {/* Note: Fallback removed to ensure Pure Black base. Light is additive. */}

            {currentConfig.blobs.map((blob, i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full blur-[80px] md:blur-[120px] mix-blend-screen ${blob.color} ${blob.size}`}
                    style={{ left: "50%", top: "50%", x: blob.initial.x, y: blob.initial.y }}
                    animate={{
                        x: [blob.initial.x, blob.initial.x + (i % 2 === 0 ? 50 : -50), blob.initial.x],
                        y: [blob.initial.y, blob.initial.y + (i % 2 === 0 ? -50 : 50), blob.initial.y],
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.4, 0.3]
                    }}
                    transition={{
                        duration: 20 + i * 8, // Very Slow, staggered timing (20s, 28s, 36s)
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}

            {/* Texture Overlay (Optional Scanlines/Noise) */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
        </div>
    );
};

/**
 * SectionConnector
 * A smooth gradient mask to dissolve hard edges between sections.
 */
export const SectionConnector = ({ position = "bottom", className = "" }: { position?: "top" | "bottom", className?: string }) => {
    const gradientClass = position === "bottom"
        ? "bg-gradient-to-t from-black via-black/80 to-transparent"
        : "bg-gradient-to-b from-black via-black/80 to-transparent";

    return (
        <div className={`absolute left-0 w-full h-48 md:h-96 pointer-events-none z-20 ${position === "bottom" ? "bottom-0" : "top-0"} ${gradientClass} ${className}`} />
    );
};
