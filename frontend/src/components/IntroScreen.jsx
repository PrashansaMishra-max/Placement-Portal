import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IntroScreen = () => {
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const [phase, setPhase] = useState('idle'); // idle | zooming | done
    const [showPrompt, setShowPrompt] = useState(false);
    const animRef = useRef(null);
    const starsRef = useRef([]);
    const frameRef = useRef(0);

    // Generate stars
    useEffect(() => {
        starsRef.current = Array.from({ length: 200 }, () => ({
            x: Math.random(),
            y: Math.random(),
            r: Math.random() * 1.5 + 0.3,
            opacity: Math.random() * 0.7 + 0.3,
            twinkle: Math.random() * Math.PI * 2,
        }));
        setTimeout(() => setShowPrompt(true), 1500);
    }, []);

    // Canvas animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        let zoomProgress = 0;
        let isZooming = phase === 'zooming';

        const draw = () => {
            const W = canvas.width;
            const H = canvas.height;
            frameRef.current++;

            if (isZooming) {
                zoomProgress = Math.min(zoomProgress + 0.018, 1);
            }

            // Background — deep space
            const bgGrad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.8);
            bgGrad.addColorStop(0, `rgba(5, 8, 20, ${1 - zoomProgress * 0.3})`);
            bgGrad.addColorStop(1, `rgba(0, 0, 5, 1)`);
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, W, H);

            // Stars
            starsRef.current.forEach(star => {
                const twinkle = Math.sin(frameRef.current * 0.03 + star.twinkle) * 0.3 + 0.7;
                ctx.beginPath();
                const sx = star.x * W;
                const sy = star.y * H;
                // Zoom: stars fly outward
                const zx = isZooming ? (sx - W / 2) * (1 + zoomProgress * 8) + W / 2 : sx;
                const zy = isZooming ? (sy - H / 2) * (1 + zoomProgress * 8) + H / 2 : sy;
                ctx.arc(zx, zy, star.r * (1 + zoomProgress * 2), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${star.opacity * twinkle * (1 - zoomProgress * 0.8)})`;
                ctx.fill();
            });

            // Earth
            const earthSize = Math.min(W, H) * (0.22 + zoomProgress * 3.5);
            const earthX = W / 2;
            const earthY = H * (0.52 - zoomProgress * 0.1);

            // Glow
            const glowSize = earthSize * (1.4 + zoomProgress);
            const glowGrad = ctx.createRadialGradient(earthX, earthY, earthSize * 0.5, earthX, earthY, glowSize);
            glowGrad.addColorStop(0, `rgba(100, 180, 255, ${0.15 - zoomProgress * 0.1})`);
            glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.beginPath();
            ctx.arc(earthX, earthY, glowSize, 0, Math.PI * 2);
            ctx.fillStyle = glowGrad;
            ctx.fill();

            // Atmosphere ring
            const atmGrad = ctx.createRadialGradient(earthX, earthY, earthSize * 0.9, earthX, earthY, earthSize * 1.15);
            atmGrad.addColorStop(0, `rgba(120, 200, 255, ${0.3 - zoomProgress * 0.2})`);
            atmGrad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.beginPath();
            ctx.arc(earthX, earthY, earthSize * 1.15, 0, Math.PI * 2);
            ctx.fillStyle = atmGrad;
            ctx.fill();

            // Earth body
            const earthGrad = ctx.createRadialGradient(
                earthX - earthSize * 0.3, earthY - earthSize * 0.3, earthSize * 0.1,
                earthX, earthY, earthSize
            );
            earthGrad.addColorStop(0, '#4fc3f7');
            earthGrad.addColorStop(0.3, '#1565c0');
            earthGrad.addColorStop(0.6, '#1a237e');
            earthGrad.addColorStop(0.8, '#0d1b4e');
            earthGrad.addColorStop(1, '#050d2a');
            ctx.beginPath();
            ctx.arc(earthX, earthY, earthSize, 0, Math.PI * 2);
            ctx.fillStyle = earthGrad;
            ctx.fill();

            // Continent patches
            const t = frameRef.current * 0.001;
            const continents = [
                { ox: -0.15, oy: -0.2, w: 0.3, h: 0.25 },
                { ox: 0.1, oy: 0.1, w: 0.2, h: 0.3 },
                { ox: -0.3, oy: 0.1, w: 0.15, h: 0.2 },
                { ox: 0.25, oy: -0.3, w: 0.18, h: 0.15 },
            ];
            continents.forEach(c => {
                ctx.beginPath();
                ctx.ellipse(
                    earthX + c.ox * earthSize,
                    earthY + c.oy * earthSize,
                    c.w * earthSize,
                    c.h * earthSize,
                    t, 0, Math.PI * 2
                );
                ctx.fillStyle = `rgba(56, 142, 60, ${0.7 - zoomProgress * 0.5})`;
                ctx.fill();
            });

            // City lights (when zooming)
            if (zoomProgress > 0.3) {
                const lightOpacity = (zoomProgress - 0.3) * 1.4;
                const lights = [
                    { ox: -0.1, oy: -0.15 }, { ox: 0.15, oy: 0.05 },
                    { ox: -0.2, oy: 0.1 }, { ox: 0.05, oy: -0.25 },
                    { ox: 0.2, oy: 0.2 }, { ox: -0.05, oy: 0.3 },
                    { ox: 0.3, oy: -0.1 }, { ox: -0.25, oy: -0.05 },
                ];
                lights.forEach(l => {
                    const lx = earthX + l.ox * earthSize;
                    const ly = earthY + l.oy * earthSize;
                    const lg = ctx.createRadialGradient(lx, ly, 0, lx, ly, earthSize * 0.06);
                    lg.addColorStop(0, `rgba(255, 220, 100, ${lightOpacity})`);
                    lg.addColorStop(1, 'rgba(0,0,0,0)');
                    ctx.beginPath();
                    ctx.arc(lx, ly, earthSize * 0.06, 0, Math.PI * 2);
                    ctx.fillStyle = lg;
                    ctx.fill();
                });
            }

            // Cloud layer
            ctx.save();
            ctx.globalAlpha = 0.35 - zoomProgress * 0.3;
            ctx.beginPath();
            ctx.arc(earthX, earthY, earthSize, 0, Math.PI * 2);
            ctx.clip();
            const cloudPositions = [
                { ox: -0.4, oy: -0.5, w: 0.5, h: 0.15 },
                { ox: 0.2, oy: 0.3, w: 0.4, h: 0.1 },
                { ox: -0.2, oy: 0.4, w: 0.35, h: 0.12 },
            ];
            cloudPositions.forEach(c => {
                const cg = ctx.createRadialGradient(
                    earthX + c.ox * earthSize, earthY + c.oy * earthSize, 0,
                    earthX + c.ox * earthSize, earthY + c.oy * earthSize,
                    c.w * earthSize
                );
                cg.addColorStop(0, 'rgba(255,255,255,0.9)');
                cg.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = cg;
                ctx.fillRect(0, 0, W, H);
            });
            ctx.restore();

            // Flash white on full zoom
            if (zoomProgress > 0.92) {
                ctx.fillStyle = `rgba(255,255,255,${(zoomProgress - 0.92) * 12})`;
                ctx.fillRect(0, 0, W, H);
            }

            if (zoomProgress >= 1) {
                cancelAnimationFrame(animRef.current);
                navigate('/home');
                return;
            }

            animRef.current = requestAnimationFrame(draw);
        };

        animRef.current = requestAnimationFrame(draw);
        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('resize', resize);
        };
    }, [phase]);

    const handleEnter = () => {
        if (phase !== 'idle') return;
        setPhase('zooming');
        setShowPrompt(false);
    };

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Enter') handleEnter();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [phase]);

    return (
        <div
            className="fixed inset-0 z-50 cursor-pointer select-none"
            onClick={handleEnter}
        >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            {/* Top label */}
            <div className={`absolute top-8 left-1/2 -translate-x-1/2 text-center transition-all duration-1000 ${showPrompt && phase === 'idle' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                <p className="text-xs font-mono text-blue-300/60 uppercase tracking-[0.3em]">CareerGRID</p>
            </div>

            {/* Center text */}
            <div className={`absolute bottom-32 left-1/2 -translate-x-1/2 text-center transition-all duration-1000 ${showPrompt && phase === 'idle' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h1 className="text-white text-2xl font-black tracking-widest uppercase mb-3">
                    Your Career Awaits
                </h1>
                <p className="text-blue-200/50 text-xs font-mono tracking-[0.4em] uppercase">
                    Press Enter or Click to Begin
                </p>
                {/* Pulse ring */}
                <div className="mt-6 flex justify-center">
                    <div className="w-3 h-3 rounded-full bg-blue-400/60 animate-ping" />
                </div>
            </div>
        </div>
    );
};

export default IntroScreen;