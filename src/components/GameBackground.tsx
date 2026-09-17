import React from 'react';

export type BackgroundTheme = 'green' | 'yellow' | 'yellow-green';

interface GameBackgroundProps {
  children: React.ReactNode;
  theme?: BackgroundTheme;
}

export const GameBackground: React.FC<GameBackgroundProps> = ({
  children,
  theme = 'yellow-green',
}) => {
  // Color configuration depending on the selected green or yellow theme
  const getThemeGradients = () => {
    switch (theme) {
      case 'green':
        return {
          bg: 'bg-gradient-to-b from-[#4ade80] via-[#16a34a] to-[#14532d]',
          rays: 'rgba(255, 255, 255, 0.12)',
          aura: 'from-[#86efac]/40 to-[#15803d]/10',
          bubble1: 'bg-[#bbf7d0]/40 border-[#86efac]/50',
          bubble2: 'bg-[#fef08a]/35 border-[#fde047]/40',
        };
      case 'yellow':
        return {
          bg: 'bg-gradient-to-b from-[#fde047] via-[#eab308] to-[#ca8a04]',
          rays: 'rgba(255, 255, 255, 0.16)',
          aura: 'from-[#fef08a]/50 to-[#d97706]/15',
          bubble1: 'bg-[#fef9c3]/50 border-[#fef08a]/60',
          bubble2: 'bg-[#86efac]/35 border-[#4ade80]/40',
        };
      case 'yellow-green':
      default:
        return {
          bg: 'bg-gradient-to-b from-[#facc15] via-[#84cc16] to-[#15803d]',
          rays: 'rgba(255, 255, 255, 0.14)',
          aura: 'from-[#fef08a]/45 to-[#22c55e]/15',
          bubble1: 'bg-[#fef9c3]/45 border-[#fde047]/50',
          bubble2: 'bg-[#bbf7d0]/40 border-[#86efac]/50',
        };
    }
  };

  const currentTheme = getThemeGradients();

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden ${currentTheme.bg} flex justify-center transition-colors duration-500`}
    >
      {/* ============================================================ */}
      {/* ANIMATIONS BEHIND THE OBJECT                                   */}
      {/* ============================================================ */}

      {/* 1. Rotating Sunburst Rays centered behind the coloring canvas */}
      <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] pointer-events-none select-none z-0 opacity-80">
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full animate-spin-slow"
          style={{ transformOrigin: 'center center' }}
        >
          <g fill={currentTheme.rays}>
            {/* 16 Radial Ray Triangles */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 360) / 16;
              return (
                <polygon
                  key={i}
                  points="250,250 220,0 280,0"
                  transform={`rotate(${angle} 250 250)`}
                />
              );
            })}
          </g>
        </svg>
      </div>

      {/* 2. Counter-rotating second subtle ray layer for mesmerizing depth */}
      <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none select-none z-0 opacity-50">
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full animate-spin-reverse-slow"
          style={{ transformOrigin: 'center center' }}
        >
          <g fill={currentTheme.rays}>
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 360) / 12 + 15;
              return (
                <polygon
                  key={i}
                  points="250,250 235,10 265,10"
                  transform={`rotate(${angle} 250 250)`}
                />
              );
            })}
          </g>
        </svg>
      </div>

      {/* 3. Pulsing Magic Radial Aura directly behind the central artwork */}
      <div
        className={`absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-gradient-to-r ${currentTheme.aura} blur-3xl pointer-events-none z-0 animate-pulse-aura`}
      />

      {/* 4. Floating Animated Bubbles / Orbs bobbing behind */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Floating Bubble 1 (Left Top) */}
        <div
          className={`absolute top-[18%] left-[8%] w-14 h-14 rounded-full border-2 ${currentTheme.bubble1} shadow-lg backdrop-blur-[1px] animate-float-1`}
        >
          <div className="absolute top-2 left-2.5 w-3 h-1.5 rounded-full bg-white/70" />
        </div>

        {/* Floating Bubble 2 (Right Mid) */}
        <div
          className={`absolute top-[38%] right-[6%] w-18 h-18 rounded-full border-2 ${currentTheme.bubble2} shadow-lg backdrop-blur-[1px] animate-float-2`}
        >
          <div className="absolute top-3 left-3 w-4 h-2 rounded-full bg-white/70" />
        </div>

        {/* Floating Bubble 3 (Left Bottom) */}
        <div
          className={`absolute bottom-[24%] left-[10%] w-12 h-12 rounded-full border-2 ${currentTheme.bubble2} shadow-lg backdrop-blur-[1px] animate-float-3`}
        >
          <div className="absolute top-2 left-2 w-2.5 h-1.5 rounded-full bg-white/70" />
        </div>

        {/* Floating Bubble 4 (Right Top) */}
        <div
          className={`absolute top-[12%] right-[14%] w-10 h-10 rounded-full border-2 ${currentTheme.bubble1} shadow-md backdrop-blur-[1px] animate-float-1`}
        >
          <div className="absolute top-1.5 left-2 w-2 h-1 rounded-full bg-white/70" />
        </div>

        {/* Floating Bubble 5 (Center Left) */}
        <div
          className={`absolute top-[52%] left-[4%] w-8 h-8 rounded-full border-2 ${currentTheme.bubble1} shadow-md animate-float-2`}
        />

        {/* Floating Twinkling Stars Behind Canvas */}
        <div className="absolute top-[28%] left-[18%] w-6 h-6 animate-pulse-glow">
          <svg viewBox="0 0 24 24" className="w-full h-full fill-yellow-200/90 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
            <polygon points="12,1 15,9 23,12 15,15 12,23 9,15 1,12 9,9" />
          </svg>
        </div>

        <div className="absolute top-[32%] right-[16%] w-7 h-7 animate-pulse-glow" style={{ animationDelay: '1.2s' }}>
          <svg viewBox="0 0 24 24" className="w-full h-full fill-white/85 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
            <polygon points="12,1 15,9 23,12 15,15 12,23 9,15 1,12 9,9" />
          </svg>
        </div>

        <div className="absolute bottom-[35%] right-[10%] w-5 h-5 animate-pulse-glow" style={{ animationDelay: '2.4s' }}>
          <svg viewBox="0 0 24 24" className="w-full h-full fill-yellow-100/80 drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]">
            <polygon points="12,1 15,9 23,12 15,15 12,23 9,15 1,12 9,9" />
          </svg>
        </div>

        {/* Floating Cartoon Leaf 1 */}
        <div className="absolute top-[22%] right-[8%] w-8 h-8 opacity-75 animate-float-3">
          <svg viewBox="0 0 32 32" className="w-full h-full fill-emerald-200/70 drop-shadow">
            <path d="M 6 26 C 6 26, 10 14, 26 6 C 26 6, 24 22, 6 26 Z" />
            <path d="M 6 26 Q 16 16 26 6" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        {/* Floating Cartoon Leaf 2 */}
        <div className="absolute bottom-[30%] left-[6%] w-7 h-7 opacity-75 animate-float-1" style={{ animationDelay: '1.5s' }}>
          <svg viewBox="0 0 32 32" className="w-full h-full fill-lime-200/70 drop-shadow">
            <path d="M 26 26 C 26 26, 22 14, 6 6 C 6 6, 8 22, 26 26 Z" />
            <path d="M 26 26 Q 16 16 6 6" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      </div>

      {/* 5. Vignette shading at borders for visual focus */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.18)] z-0" />

      {/* Main Content Area: Spacious container ensuring the object can be comfortably big */}
      <div className="relative z-10 w-full max-w-lg lg:max-w-xl min-h-screen flex flex-col justify-between py-3 px-3 sm:px-4">
        {children}
      </div>
    </div>
  );
};
