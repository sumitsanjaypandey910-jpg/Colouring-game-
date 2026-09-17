import React from 'react';
import { Play, RotateCcw, Grid, Volume2, VolumeX, X } from 'lucide-react';
import { sound } from '../utils/audio';

interface PauseModalProps {
  isOpen: boolean;
  onResume: () => void;
  onRestart: () => void;
  onOpenLevelSelect: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  currentLevelTitle: string;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  isOpen,
  onResume,
  onRestart,
  onOpenLevelSelect,
  soundEnabled,
  onToggleSound,
  currentLevelTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        id="pause-dialog"
        className="w-full max-w-xs rounded-3xl bg-[#eedbc5] p-6 shadow-[0_16px_32px_rgba(0,0,0,0.6),inset_0_2px_2px_rgba(255,255,255,0.9)] border-4 border-[#caa885] flex flex-col items-center gap-5 text-center relative"
      >
        {/* Close button */}
        <button
          onClick={() => {
            sound.playClick();
            onResume();
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#caa885] hover:bg-[#b58f68] text-amber-950 flex items-center justify-center cursor-pointer transition-colors"
          title="Close"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center">
          <h2 className="font-['Fredoka',sans-serif] font-bold text-2xl text-[#592fa4] drop-shadow-xs">
            Game Paused
          </h2>
          <p className="text-sm font-medium text-amber-900/80 mt-0.5">
            {currentLevelTitle}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-3">
          {/* Resume Button */}
          <button
            id="pause-resume-button"
            onClick={() => {
              sound.playClick();
              onResume();
            }}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-b from-[#00c853] to-[#009624] text-white font-['Fredoka',sans-serif] font-bold text-lg shadow-[0_4px_10px_rgba(0,150,36,0.4),inset_0_2px_1px_rgba(255,255,255,0.6)] flex items-center justify-center gap-2 hover:brightness-105 active:scale-98 transition-all cursor-pointer"
          >
            <Play className="w-5 h-5 fill-white stroke-none" />
            <span>Resume</span>
          </button>

          {/* Restart Level */}
          <button
            id="pause-restart-button"
            onClick={() => {
              sound.playClick();
              onRestart();
            }}
            className="w-full py-2.5 px-4 rounded-2xl bg-[#ffd54f] hover:bg-[#ffca28] text-amber-950 font-['Fredoka',sans-serif] font-bold text-base shadow-[0_3px_6px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.6)] flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer border border-amber-300"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restart Picture</span>
          </button>

          {/* Choose Picture */}
          <button
            id="pause-levels-button"
            onClick={() => {
              sound.playClick();
              onOpenLevelSelect();
            }}
            className="w-full py-2.5 px-4 rounded-2xl bg-white hover:bg-amber-50 text-[#592fa4] font-['Fredoka',sans-serif] font-bold text-base shadow-[0_3px_6px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.9)] flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer border-2 border-[#8e63d8]/40"
          >
            <Grid className="w-4 h-4 text-[#8e63d8]" />
            <span>Change Picture</span>
          </button>

          {/* Sound Toggle */}
          <button
            id="pause-sound-button"
            onClick={() => {
              sound.playClick();
              onToggleSound();
            }}
            className="w-full py-2 px-4 rounded-xl bg-amber-200/60 hover:bg-amber-200 text-amber-950 font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-700" />
                <span>Sound: On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-red-600" />
                <span>Sound: Muted</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
