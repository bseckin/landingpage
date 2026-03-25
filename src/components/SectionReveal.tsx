import { motion, useReducedMotion } from 'framer-motion';
import { forwardRef, useEffect, useState } from 'react';

/**
 * Apple-style scroll reveal: opacity + subtle translateY.
 * Tuned for mobile (viewport amount/margin, smaller motion) + respects prefers-reduced-motion.
 */
function useNarrowViewport() {
    const [narrow, setNarrow] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const update = () => setNarrow(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    return narrow;
}

const easeApple = [0.25, 0.1, 0.25, 1] as const;

type SectionRevealProps = {
    children: React.ReactNode;
    className?: string;
    /** Extra delay (e.g. for chained blocks) */
    delay?: number;
};

export function SectionReveal({ children, className, delay = 0 }: SectionRevealProps) {
    const reduceMotion = useReducedMotion();
    const narrow = useNarrowViewport();
    const y = reduceMotion ? 0 : narrow ? 14 : 24;

    return (
        <motion.div
            className={className}
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{
                once: true,
                // Slightly earlier trigger on small screens so content isn’t stuck off-screen
                amount: narrow ? 0.14 : 0.1,
                margin: narrow ? '0px 0px -6% 0px' : '0px 0px -10% 0px',
            }}
            transition={{
                duration: reduceMotion ? 0 : 0.88,
                delay: reduceMotion ? 0 : delay,
                ease: easeApple,
            }}
        >
            {children}
        </motion.div>
    );
}

type StaggerRevealProps = {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
};

/** Parent for StaggerItem children — staggered fade-up like product grids. Ref forwarded for scroll containers. */
export const StaggerReveal = forwardRef<HTMLDivElement, StaggerRevealProps>(
    function StaggerReveal({ children, className, style }, ref) {
        const reduceMotion = useReducedMotion();
        const narrow = useNarrowViewport();

        return (
            <motion.div
                ref={ref}
                className={className}
                style={style}
                initial="hidden"
                whileInView="visible"
                viewport={{
                    once: true,
                    amount: narrow ? 0.12 : 0.08,
                    margin: narrow ? '0px 0px -5% 0px' : '0px 0px -8% 0px',
                }}
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: reduceMotion ? 0 : narrow ? 0.07 : 0.1,
                            delayChildren: reduceMotion ? 0 : 0.05,
                        },
                    },
                }}
            >
                {children}
            </motion.div>
        );
    }
);

type StaggerItemProps = {
    children: React.ReactNode;
    className?: string;
};

export function StaggerItem({ children, className }: StaggerItemProps) {
    const reduceMotion = useReducedMotion();
    const narrow = useNarrowViewport();
    const y = reduceMotion ? 0 : narrow ? 12 : 20;

    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: reduceMotion ? 1 : 0, y },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: reduceMotion ? 0 : 0.78,
                        ease: easeApple,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}
