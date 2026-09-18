import React from 'react';
import { Pause, Volume2, VolumeX, Sparkles, RotateCcw, Palette } from 'lucide-react';
import { sound } from '../utils/audio';
import { BackgroundTheme } from './GameBackground';

interface TopBarProps {
  progressPercent: number;
  score: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onPause: () => void;
  onHint: () => void;
  onReset: () => void;
  hintsRemaining: number;
  backgroundTheme: BackgroundTheme;
  onCycleTheme: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  progressPercent,
  score,
  soundEnabled,
  onToggleSound,
  onPause,
  onHint,
  onReset,
  hintsRemaining,
  backgroundTheme,
  onCycleTheme,
}) => {
  const getThemeLabel = () => {
    switch (backgroundTheme) {
      case 'green':
        return { text: 'Green', icon: '🍃' };
      case 'yellow':
        return { text: 'Yellow', icon: '☀️' };
      case 'yellow-green':
      default:
        return { text: 'Lime-Sun', icon: '🍋' };
    }
  };

  const currentThemeInfo = getThemeLabel();

  return (
    <header className="w-full flex flex-col items-center gap-2.5">
      {/* Top action row */}
      <div className="w-full flex items-center justify-between gap-2">
        {/* Pause Button */}
        <button
          id="pause-button"
          onClick={() => {
            sound.playClick();
            onPause();
          }}
          className="relative w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-b from-white to-purple-100 border-[3.5px] border-[#8e63d8] shadow-[0_3px_6px_rgba(0,0,0,0.35),inset_0_2px_0_rgba(255,255,255,0.9)] active:scale-95 transition-transform cursor-pointer"
          title="Pause Game"
        >
          <Pause className="w-6 h-6 text-[#7845cc] fill-[#7845cc]" strokeWidth={2.5} />
        </button>

        {/* Progress Bar with Hourglass */}
        <div className="flex-1 max-w-[210px] flex items-center">
          {/* Hourglass Icon Container */}
          <div className="relative -mr-3 z-10 w-9 h-11 flex items-center justify-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            <svg viewBox="0 0 36 44" className="w-full h-full">
              <rect x="2" y="2" width="32" height="6" rx="3" fill="#8e63d8" stroke="#5d33a6" strokeWidth="1.5" />
              <rect x="2" y="36" width="32" height="6" rx="3" fill="#8e63d8" stroke="#5d33a6" strokeWidth="1.5" />
              <path
                d="M 6 8 C 6 20, 15 22, 18 22 C 21 22, 30 20, 30 8 Z"
                fill="rgba(255,255,255,0.85)"
                stroke="#5d33a6"
                strokeWidth="1.5"
              />
              <path
                d="M 6 36 C 6 24, 15 22, 18 22 C 21 22, 30 24, 30 36 Z"
                fill="rgba(255,255,255,0.85)"
                stroke="#5d33a6"
                strokeWidth="1.5"
              />
              <path d="M 9 12 C 11 18, 17 21, 18 22 C 19 21, 25 18, 27 12 Z" fill="#FFC107" />
              <path d="M 10 35 C 12 30, 24 30, 26 35 Z" fill="#FFB300" />
              <line x1="18" y1="22" x2="18" y2="32" stroke="#FFC107" strokeWidth="1.5" strokeDasharray="2,2" />
            </svg>
          </div>

          {/* Progress Bar Frame */}
          <div className="w-full h-9 bg-white/95 rounded-full border-[3px] border-[#8e63d8] p-[3px] shadow-[0_3px_8px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(0,0,0,0.15)] flex items-center overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#2ee69c] to-[#00c853] transition-all duration-400 ease-out shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.2)] flex items-center justify-end pr-1.5"
              style={{ width: `${Math.max(6, Math.min(100, progressPercent))}%` }}
            >
              <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Score Badge with Graduation Cap */}
        <div
          id="score-badge"
          className="h-11 px-3 min-w-[76px] rounded-full bg-gradient-to-b from-white to-purple-50 border-[3px] border-[#8e63d8] flex items-center justify-center gap-1.5 shadow-[0_3px_6px_rgba(0,0,0,0.35),inset_0_2px_0_rgba(255,255,255,0.9)]"
        >
          <span className="text-xl -mt-0.5 filter drop-shadow">🎓</span>
          <span className="text-[#592fa4] font-bold text-lg font-['Fredoka',sans-serif] tracking-wide">
            {score}
          </span>
        </div>
      </div>

      {/* Auxiliary quick controls (Sound, Reset, Background Color Toggle, Hint) */}
      <div className="w-full flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          {/* Sound Mute/Unmute */}
          <button
            id="toggle-sound-button"
            onClick={() => {
              onToggleSound();
              sound.playClick();
            }}
            className="w-8 h-8 rounded-full bg-black/25 hover:bg-black/35 text-white flex items-center justify-center transition-colors active:scale-95 cursor-pointer backdrop-blur-xs shadow-sm"
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-300" />}
          </button>

          {/* Reset Current Level */}
          <button
            id="reset-level-button"
            onClick={() => {
              sound.playClick();
              onReset();
            }}
            className="w-8 h-8 rounded-full bg-black/25 hover:bg-black/35 text-white flex items-center justify-center transition-colors active:scale-95 cursor-pointer backdrop-blur-xs shadow-sm"
            title="Restart Level"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Green / Yellow Theme Toggle Button */}
          <button
            id="toggle-bg-theme-button"
            onClick={() => {
              sound.playPop();
              onCycleTheme();
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/25 hover:bg-black/35 text-white text-xs font-semibold shadow-sm transition-all active:scale-95 cursor-pointer backdrop-blur-xs border border-white/20"
            title="Switch Background Color (Green / Yellow / Lime)"
          >
            <span className="text-sm leading-none">{currentThemeInfo.icon}</span>
            <span className="text-[11px] hidden sm:inline">{currentThemeInfo.text}</span>
          </button>
        </div>

        {/* Hint button */}
        <button
          id="hint-button"
          onClick={() => {
            sound.playPop();
            onHint();
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/90 hover:bg-amber-500 text-white font-semibold text-xs shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-all active:scale-95 cursor-pointer border border-amber-300/50"
          title="Highlight a region to color"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-200 fill-yellow-200 animate-spin-slow" />
          <span>Hint</span>
          {hintsRemaining > 0 && (
            <span className="ml-0.5 px-1.5 py-0.2 bg-white text-amber-700 rounded-full text-[10px] font-bold">
              {hintsRemaining}
            </span>
          )}
        </button>
      </div>

      {/* Main Instructional Text */}
      <h1 
        className="text-center text-white text-base sm:text-lg font-bold font-['Fredoka',sans-serif] tracking-wide leading-tight px-2"
        style={{
          textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.4)',
        }}
      >
        Choose your colors & paint your masterpiece!
      </h1>
    </header>
  );
};
