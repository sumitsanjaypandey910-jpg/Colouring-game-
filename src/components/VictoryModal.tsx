import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ColoringLevel } from '../types';
import { sound } from '../utils/audio';
import { ArrowRight, RotateCcw, Download, Sparkles } from 'lucide-react';

interface VictoryModalProps {
  isOpen: boolean;
  level: ColoringLevel;
  timeSpentSeconds: number;
  scoreGained: number;
  totalScore: number;
  onNextLevel: () => void;
  onReplay: () => void;
  onOpenLevelSelect: () => void;
  coloredRegions: Map<string, number>;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  level,
  timeSpentSeconds,
  scoreGained,
  totalScore,
  onNextLevel,
  onReplay,
  onOpenLevelSelect,
  coloredRegions,
}) => {
  useEffect(() => {
    if (isOpen) {
      sound.playFanfare();

      // Confetti burst from both sides
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 9999,
      };

      function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const handleDownloadArtwork = () => {
    sound.playClick();
    const svgElement = document.querySelector('#coloring-paper-card svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    canvas.width = level.width * 2;
    canvas.height = level.height * 2;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const link = document.createElement('a');
      link.download = `${level.id}-painted.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in">
      <div 
        id="victory-dialog"
        className="w-full max-w-sm rounded-3xl bg-[#eedbc5] p-5 sm:p-6 shadow-[0_20px_40px_rgba(0,0,0,0.7),inset_0_2px_2px_rgba(255,255,255,0.9)] border-4 border-[#caa885] flex flex-col items-center gap-4 text-center relative"
      >
        {/* Celebration Title */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm tracking-wide uppercase">
            <Sparkles className="w-4 h-4 fill-amber-500" />
            <span>Masterpiece Finished!</span>
            <Sparkles className="w-4 h-4 fill-amber-500" />
          </div>
          <h2 className="font-['Fredoka',sans-serif] font-bold text-3xl text-[#592fa4] drop-shadow-xs mt-0.5">
            Splendid!
          </h2>
          <p className="text-sm font-semibold text-amber-900 mt-0.5">
            {level.title}
          </p>
        </div>

        {/* 3 Gold Stars Badge */}
        <div className="flex items-center justify-center gap-2 my-1">
          <span className="text-4xl animate-bounce drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]">⭐</span>
          <span className="text-5xl animate-bounce delay-100 drop-shadow-[0_6px_8px_rgba(0,0,0,0.3)]">⭐</span>
          <span className="text-4xl animate-bounce delay-200 drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]">⭐</span>
        </div>

        {/* Stats Row */}
        <div className="w-full grid grid-cols-2 gap-2 bg-[#e0c4a4] p-3 rounded-2xl border border-[#c29c73]">
          <div className="flex flex-col items-center">
            <span className="text-xs text-amber-950 font-medium">Time Taken</span>
            <span className="font-['Fredoka',sans-serif] font-bold text-lg text-amber-950">
              {formatTime(timeSpentSeconds)}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-amber-950 font-medium">Score Earned</span>
            <span className="font-['Fredoka',sans-serif] font-bold text-lg text-[#592fa4]">
              +{scoreGained} 🎓
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-2.5 mt-1">
          {/* Next Level Button */}
          <button
            id="victory-next-level-button"
            onClick={() => {
              sound.playClick();
              onNextLevel();
            }}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-b from-[#00c853] to-[#009624] text-white font-['Fredoka',sans-serif] font-bold text-lg shadow-[0_4px_10px_rgba(0,150,36,0.4),inset_0_2px_1px_rgba(255,255,255,0.6)] flex items-center justify-center gap-2 hover:brightness-105 active:scale-98 transition-all cursor-pointer"
          >
            <span>Next Picture</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Download Saved Artwork */}
          <button
            id="download-artwork-button"
            onClick={handleDownloadArtwork}
            className="w-full py-2.5 px-4 rounded-2xl bg-white hover:bg-amber-50 text-[#592fa4] font-['Fredoka',sans-serif] font-bold text-sm shadow-[0_3px_6px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.9)] flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer border-2 border-[#8e63d8]/40"
          >
            <Download className="w-4 h-4 text-[#8e63d8]" />
            <span>Save My Painting</span>
          </button>

          <div className="grid grid-cols-2 gap-2 mt-0.5">
            <button
              id="victory-replay-button"
              onClick={() => {
                sound.playClick();
                onReplay();
              }}
              className="py-2 px-3 rounded-xl bg-amber-200/80 hover:bg-amber-200 text-amber-950 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Color Again</span>
            </button>

            <button
              id="victory-all-pictures-button"
              onClick={() => {
                sound.playClick();
                onOpenLevelSelect();
              }}
              className="py-2 px-3 rounded-xl bg-amber-200/80 hover:bg-amber-200 text-amber-950 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>All Pictures</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
