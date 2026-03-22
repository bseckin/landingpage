import { motion } from 'framer-motion';

type Variant = 'hero' | 'problem' | 'services';

interface LivingBackgroundProps {
    variant: Variant;
    className?: string;
}

export const LivingBackground = ({ variant, className = "" }: LivingBackgroundProps) => {

    const config = {
        hero: {
            blobs: [
                { color: "bg-teal-300", size: "w-[800px] h-[800px]", opacity: 0.12, initial: { x: -200, y: -200 } },
                { color: "bg-indigo-400", size: "w-[600px] h-[600px]", opacity: 0.08, initial: { x: 400, y: 100 } },
                { color: "bg-amber-200", size: "w-[400px] h-[400px]", opacity: 0.1, initial: { x: 0, y: 0 } },
            ]
        },
        problem: {
            blobs: [
                { color: "bg-rose-200", size: "w-[600px] h-[600px]", opacity: 0.12, initial: { x: 0, y: 0 } },
                { color: "bg-slate-200", size: "w-[500px] h-[500px]", opacity: 0.15, initial: { x: -200, y: 200 } },
            ]
        },
        services: {
            blobs: [
                { color: "bg-indigo-300", size: "w-[900px] h-[900px]", opacity: 0.1, initial: { x: 200, y: -200 } },
                { color: "bg-teal-200", size: "w-[700px] h-[700px]", opacity: 0.1, initial: { x: -300, y: 100 } },
                { color: "bg-violet-200", size: "w-[600px] h-[500px]", opacity: 0.08, initial: { x: 0, y: 300 } },
            ]
        }
    };

    const currentConfig = config[variant];

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
            {currentConfig.blobs.map((blob, i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full blur-[80px] md:blur-[120px] mix-blend-multiply opacity-90 ${blob.color} ${blob.size}`}
                    style={{ left: "50%", top: "50%", x: blob.initial.x, y: blob.initial.y }}
                    animate={{
                        x: [blob.initial.x, blob.initial.x + (i % 2 === 0 ? 40 : -40), blob.initial.x],
                        y: [blob.initial.y, blob.initial.y + (i % 2 === 0 ? -40 : 40), blob.initial.y],
                        scale: [1, 1.06, 1],
                    }}
                    transition={{
                        duration: 22 + i * 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}

            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
        </div>
    );
};

export const SectionConnector = ({ position = "bottom", className = "" }: { position?: "top" | "bottom", className?: string }) => {
    const gradientClass = position === "bottom"
        ? "bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/90 to-transparent"
        : "bg-gradient-to-b from-[#f8fafc] via-[#f8fafc]/90 to-transparent";

    return (
        <div className={`absolute left-0 w-full h-48 md:h-96 pointer-events-none z-20 ${position === "bottom" ? "bottom-0" : "top-0"} ${gradientClass} ${className}`} />
    );
};
