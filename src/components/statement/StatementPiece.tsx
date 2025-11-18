import React from "react";

const StatementPiece: React.FC<{ className?: string }> = ({ className }) => {
    // Lightweight decorative background / statement piece.
    // This intentionally avoids heavy external deps so it's easy to reuse.
    return (
        <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className || ""}`}
        >
            <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 600">
                <defs>
                    <linearGradient id="g1" x1="0" x2="1">
                        <stop offset="0%" stopColor="rgba(79,70,229,0.08)" />
                        <stop offset="100%" stopColor="rgba(139,92,246,0.04)" />
                    </linearGradient>
                </defs>
                <rect width="1200" height="600" fill="url(#g1)" />
                <g opacity="0.12">
                    <circle cx="200" cy="120" r="180" fill="#8B5CF6" />
                    <circle cx="980" cy="420" r="220" fill="#4F46E5" />
                </g>
            </svg>
        </div>
    );
};

export default StatementPiece;
