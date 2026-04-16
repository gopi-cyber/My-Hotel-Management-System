'use client';
import { useEffect, useRef } from 'react';

export const CustomCursor = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const pointsRef = useRef<{ x: number, y: number, life: number }[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const onMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            // Add a point on move
            pointsRef.current.push({ 
                x: e.clientX, 
                y: e.clientY, 
                life: 1.0 
            });
        };

        const render = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw points
            pointsRef.current = pointsRef.current.filter(p => p.life > 0.05);
            
            pointsRef.current.forEach(p => {
                p.life *= 0.95; // Decay
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.life * 4, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(245, 158, 11, ${p.life * 0.5})`; // Amber glow
                ctx.fill();
            });

            // Draw cursor ring
            ctx.beginPath();
            ctx.arc(mouseRef.current.x, mouseRef.current.y, 8, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.8)';
            ctx.lineWidth = 1;
            ctx.stroke();

            requestAnimationFrame(render);
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouseMove);
        resize();
        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[1000] mix-blend-screen"
            style={{ filter: 'blur(1px)' }}
        />
    );
};
