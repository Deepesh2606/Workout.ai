import React from 'react';

interface HyperStateLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export const HyperStateLogo: React.FC<HyperStateLogoProps> = ({
  size = 38,
  className = '',
  showText = false,
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon Badge */}
      <div
        className="relative flex items-center justify-center shrink-0 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(255,51,88,0.35)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_28px_rgba(255,51,88,0.55)]"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 64 64"
          width={size}
          height={size}
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hsGradComp" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF3358" />
              <stop offset="50%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="#FFA800" />
            </linearGradient>
            <linearGradient id="hsCyanComp" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F5FF" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <filter id="hsGlowComp" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Obsidian Base */}
          <rect width="64" height="64" rx="16" fill="#090D16" />
          <rect
            x="1"
            y="1"
            width="62"
            height="62"
            rx="15"
            stroke="#1C2438"
            strokeWidth="1.5"
          />

          {/* Left Pillar */}
          <rect
            x="16"
            y="14"
            width="7"
            height="36"
            rx="3.5"
            fill="url(#hsGradComp)"
            filter="url(#hsGlowComp)"
          />

          {/* Right Pillar */}
          <rect
            x="41"
            y="14"
            width="7"
            height="36"
            rx="3.5"
            fill="url(#hsGradComp)"
            filter="url(#hsGlowComp)"
          />

          {/* Dynamic Hyper Cross-Bar with Bolt/Chevron Angle */}
          <path
            d="M21 34.5L34 26.5L43 32L30 40L21 34.5Z"
            fill="url(#hsGradComp)"
            filter="url(#hsGlowComp)"
          />

          {/* Core Electric Pulse */}
          <circle
            cx="32"
            cy="32"
            r="3"
            fill="url(#hsCyanComp)"
            filter="url(#hsGlowComp)"
          />
        </svg>
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-base font-black tracking-tight text-white group-hover:text-[#FF3358] transition-colors">
              HYPERSTATE
            </span>
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-1.5 py-0.5 rounded bg-emerald-950/70 text-emerald-400 border border-emerald-800/60 shadow-[0_0_8px_rgba(16,185,129,0.25)]">
              PRO
            </span>
          </div>
          <span className="text-[10px] text-slate-400 tracking-wide font-medium">
            Hypertrophy & Muscle Atlas
          </span>
        </div>
      )}
    </div>
  );
};
