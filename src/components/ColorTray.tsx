import React from 'react';
import { ColorItem } from '../types';
import { sound } from '../utils/audio';
import { Check } from 'lucide-react';

interface ColorTrayProps {
  palette: ColorItem[];
  selectedColorId: number;
  onSelectColor: (colorId: number) => void;
  completedNumbers: Set<number>;
}

export const ColorTray: React.FC<ColorTrayProps> = ({
  palette,
  selectedColorId,
  onSelectColor,
  completedNumbers,
}) => {
  // 10 standard colors: 1 to 5 on top row, 6 to 10 on bottom row
  const row1 = palette.slice(0, 5);
  const row2 = palette.slice(5, 10);

  const handleSwatchClick = (colorId: number, isDone: boolean) => {
    // Restrict players from adding or selecting the same color twice once completed
    if (isDone) {
      sound.playBoop();
      return;
    }
    sound.playPop();
    onSelectColor(colorId);
  };

  const renderColorButton = (color: ColorItem) => {
    const isSelected = color.id === selectedColorId;
    const isDone = completedNumbers.has(color.id);

    return (
      <div key={color.id} className="relative flex items-center justify-center">
        <button
          id={`color-swatch-${color.id}`}
          type="button"
          disabled={isDone}
          onClick={() => handleSwatchClick(color.id, isDone)}
          className={`relative w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center font-bold text-base sm:text-lg transition-all duration-200 select-none
            ${isDone 
              ? 'opacity-40 cursor-not-allowed scale-95 filter saturate-50' 
              : isSelected 
                ? 'scale-110 z-20 ring-4 ring-white shadow-[0_6px_14px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.8)] cursor-pointer' 
                : 'hover:scale-105 active:scale-95 shadow-[0_3px_6px_rgba(0,0,0,0.35),inset_0_2px_2px_rgba(255,255,255,0.4)] cursor-pointer'
            }
          `}
          style={{
            backgroundColor: color.hex,
            border: color.id === 1 ? '2.5px solid #b0bec5' : '2px solid rgba(0,0,0,0.18)',
            touchAction: 'manipulation',
          }}
          title={isDone ? `${color.name} (#${color.id}) - Completed!` : `${color.name} (#${color.id})`}
        >
          {/* Circular highlight sheen */}
          <div className="absolute top-1 left-1.5 sm:left-2 w-3.5 sm:w-4 h-2 rounded-full bg-white/40 pointer-events-none" />

          {/* Number label */}
          <span
            className="relative font-['Fredoka',sans-serif] font-bold text-base sm:text-lg drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]"
            style={{ color: color.textColor }}
          >
            {color.id}
          </span>

          {/* Completed Checkmark Badge: locks this color so it cannot be added again */}
          {isDone && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-md">
              <Check className="w-3 h-3 text-white stroke-[3.5]" />
            </div>
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center pt-1 pb-3">
      {/* Wooden / Tan Palette Tray Container */}
      <div 
        id="color-tray-card"
        className="w-full max-w-[390px] sm:max-w-[430px] rounded-[24px] bg-[#eedbc5] p-2.5 sm:p-3.5 shadow-[0_8px_20px_rgba(0,0,0,0.35),inset_0_2px_2px_rgba(255,255,255,0.9),inset_0_-3px_5px_rgba(150,110,75,0.5)] border-2 border-[#caa885] flex flex-col gap-2 relative"
      >
        {/* Row 1: 5 Colors (1 to 5) */}
        <div className="flex items-center justify-between px-1">
          {row1.map(renderColorButton)}
        </div>

        {/* Inset Wooden Groove Divider */}
        <div className="w-full h-1.5 rounded-full bg-[#caa37d] shadow-[inset_0_2px_3px_rgba(90,50,20,0.5),0_1px_1px_rgba(255,255,255,0.7)]" />

        {/* Row 2: 5 Colors (6 to 10) */}
        <div className="flex items-center justify-between px-1">
          {row2.map(renderColorButton)}
        </div>
      </div>
    </div>
  );
};
