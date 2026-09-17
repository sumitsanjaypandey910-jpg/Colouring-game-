import React from 'react';
import { ColoringLevel } from '../types';
import { sound } from '../utils/audio';
import { X, CheckCircle2, Play } from 'lucide-react';

interface LevelSelectModalProps {
  isOpen: boolean;
  levels: ColoringLevel[];
  currentLevelId: string;
  onSelectLevel: (levelId: string) => void;
  onClose: () => void;
  completedLevelIds: Set<string>;
}

export const LevelSelectModal: React.FC<LevelSelectModalProps> = ({
  isOpen,
  levels,
  currentLevelId,
  onSelectLevel,
  onClose,
  completedLevelIds,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in">
      <div 
        id="level-select-dialog"
        className="w-full max-w-sm max-h-[85vh] overflow-y-auto rounded-3xl bg-[#eedbc5] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.7),inset_0_2px_2px_rgba(255,255,255,0.9)] border-4 border-[#caa885] flex flex-col gap-4 text-center relative"
      >
        {/* Close button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#caa885] hover:bg-[#b58f68] text-amber-950 flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Title */}
        <div className="flex flex-col items-center">
          <h2 className="font-['Fredoka',sans-serif] font-bold text-2xl text-[#592fa4] drop-shadow-xs">
            Choose a Picture
          </h2>
          <p className="text-xs font-medium text-amber-900/80 mt-0.5">
            Select a coloring page to paint by numbers
          </p>
        </div>

        {/* Levels List */}
        <div className="w-full flex flex-col gap-3">
          {levels.map((lvl, index) => {
            const isCurrent = lvl.id === currentLevelId;
            const isCompleted = completedLevelIds.has(lvl.id);

            return (
              <div
                key={lvl.id}
                id={`level-card-${lvl.id}`}
                onClick={() => {
                  sound.playClick();
                  onSelectLevel(lvl.id);
                  onClose();
                }}
                className={`p-3 rounded-2xl flex items-center gap-3 cursor-pointer transition-all duration-200 border-2
                  ${isCurrent 
                    ? 'bg-amber-100 border-[#8e63d8] shadow-[0_4px_10px_rgba(142,99,216,0.3)] ring-2 ring-[#8e63d8]/40' 
                    : 'bg-[#fbf7f0] hover:bg-white border-[#d1b28f] shadow-sm active:scale-98'}
                `}
              >
                {/* Thumbnail Preview representation */}
                <div className="w-14 h-14 rounded-xl bg-white border border-amber-900/20 flex items-center justify-center shadow-inner overflow-hidden shrink-0 relative">
                  <svg viewBox={`0 0 ${lvl.width} ${lvl.height}`} className="w-full h-full p-1 opacity-80">
                    {lvl.regions.map(r => {
                      const color = lvl.palette.find(c => c.id === r.number)?.hex || '#ccc';
                      return (
                        <path
                          key={r.id}
                          d={r.path}
                          fill={color}
                          stroke="#333"
                          strokeWidth="2"
                        />
                      );
                    })}
                  </svg>
                  {isCompleted && (
                    <div className="absolute top-1 right-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-white" />
                    </div>
                  )}
                </div>

                {/* Level Details */}
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-amber-700 bg-amber-200/70 px-1.5 py-0.5 rounded-md">
                      #{index + 1}
                    </span>
                    <h3 className="font-['Fredoka',sans-serif] font-bold text-base text-stone-900 leading-tight">
                      {lvl.title}
                    </h3>
                  </div>
                  <p className="text-xs text-stone-600 font-medium line-clamp-1 mt-0.5">
                    {lvl.subtitle}
                  </p>
                  <span className="text-[11px] text-stone-500">
                    {lvl.regions.length} sections to color
                  </span>
                </div>

                {/* Status or Play icon */}
                <div className="shrink-0 pr-1">
                  {isCurrent ? (
                    <span className="text-xs font-bold text-[#8e63d8] bg-purple-100 px-2 py-1 rounded-full">
                      Active
                    </span>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-amber-200/80 hover:bg-amber-300 flex items-center justify-center text-amber-900">
                      <Play className="w-4 h-4 fill-amber-900 stroke-none ml-0.5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
