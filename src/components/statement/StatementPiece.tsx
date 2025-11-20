import React from "react";

const StatementPiece: React.FC<{ className?: string }> = ({ className }) => {
    // Enhanced decorative background with layered gradients and geometric elements
    return (
        <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className || ""}`}
        >
            <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 600">
                <defs>
                    <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgba(79,70,229,0.06)" />
                        <stop offset="50%" stopColor="rgba(139,92,246,0.03)" />
                        <stop offset="100%" stopColor="rgba(79,70,229,0.08)" />
                    </linearGradient>
                    <radialGradient id="g2" cx="30%" cy="30%">
                        <stop offset="0%" stopColor="rgba(139,92,246,0.04)" />
                        <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                </defs>
                <rect width="1200" height="600" fill="url(#g1)" />
                <rect width="1200" height="600" fill="url(#g2)" />
                <g opacity="0.08">
                    <circle cx="150" cy="100" r="120" fill="hsl(var(--primary))" />
                    <circle cx="1050" cy="450" r="150" fill="hsl(var(--accent))" />
                    <circle cx="800" cy="150" r="80" fill="hsl(var(--secondary))" />
                </g>
                <g opacity="0.05">
                    <path d="M0,300 Q300,200 600,300 T1200,300 L1200,600 L0,600 Z" fill="hsl(var(--primary))" />
                </g>
            </svg>
        </div>
    );
};

export default StatementPiece;