'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const SplitImage = ({ 
    src, 
    alt, 
    className = "", 
    slices = 9 
}: { 
    src: string; 
    alt: string; 
    className?: string; 
    slices?: number;
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={`relative w-full h-full overflow-hidden ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="absolute inset-0 bg-slate-950" />
            {Array.from({ length: slices }).map((_, i) => {
                const step = 100 / slices;
                const clipLeft = i * step;
                const clipRight = 100 - (i + 1) * step;
                const clipPath = `inset(0% ${clipRight}% 0% ${clipLeft}%)`;

                const yOffset = i % 2 === 0 ? 50 : -50;
                const rotate = i % 2 === 0 ? 2 : -2;
                
                // Delay based on distance from center for a ripple effect
                const centerIndex = (slices - 1) / 2;
                const distance = Math.abs(i - centerIndex);

                return (
                    <motion.div
                        key={i}
                        className="absolute inset-0 origin-center"
                        style={{ clipPath }}
                        initial={false}
                        animate={{
                            y: isHovered ? yOffset : 0,
                            x: isHovered ? (i - centerIndex) * 8 : 0,
                            scale: isHovered ? 1.05 : 1,
                            rotate: isHovered ? rotate : 0,
                            opacity: isHovered ? 0.7 : 1,
                        }}
                        transition={{
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1],
                            delay: distance * 0.05
                        }}
                    >
                        <img 
                            src={src} 
                            alt={alt} 
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                );
            })}
        </div>
    );
};
