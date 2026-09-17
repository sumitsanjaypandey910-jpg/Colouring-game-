import React from 'react';
import { ColorItem } from '../types';
import { sound } from '../utils/audio';
import { Check } from 'lucide-react';

interface ColorTrayProps {
  palette: ColorItem[];
  selectedColorId: number;
  onSelectColor: (colorId: number) => void;
  completedNumbers: Set<number>;
  showHandGuide: boolean;
}

export const ColorTray: React.FC<ColorTrayProps> = ({
  palette,
  selectedColorId,
  onSelectColor,
  completedNumbers,
  showHandGuide,
}) => {
  const row1 = palette.slice(0, 5);
  const row2 = palette.slice(5, 10);

  const renderColorButton = (color: ColorItem) => {
    const isSelected = color.id === selectedColorId;
    const isDone = completedNumbers.has(color.id);

    return (
      <div key={color.id} className="relative flex items-center justify-center">
        <button
          id={`color-swatch-${color.id}`}
          onClick={() => {
            sound.playPop();
            onSelectColor(color.id);
          }}
          className={`relative w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-200 cursor-pointer select-none
            ${isSelected 
              ? 'scale-110 z-20 ring-4 ring-white shadow-[0_6px_14px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.8)]' 
              : 'hover:scale-105 active:scale-95 shadow-[0_3px_6px_rgba(0,0,0,0.35),inset_0_2px_2px_rgba(255,255,255,0.4)]'}
            ${isDone ? 'opacity-85' : 'opacity-100'}
          `}
          style={{
            backgroundColor: color.hex,
            border: color.id === 1 ? '2.5px solid #b0bec5' : '2px solid rgba(0,0,0,0.15)',
          }}
          title={`${color.name} (${color.id})`}
        >
          {/* Circular highlight sheen */}
          <div className="absolute top-1 left-2 w-4 h-2 rounded-full bg-white/40 pointer-events-none" />

          {/* Number label */}
          <span
            className="relative font-['Fredoka',sans-serif] font-bold text-lg sm:text-xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]"
            style={{ color: color.textColor }}
          >
            {color.id}
          </span>

          {/* Completed Checkmark Badge */}
          {isDone && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-md">
              <Check className="w-3 h-3 text-white stroke-[3.5]" />
            </div>
          )}
        </button>

        {/* Hand cursor indicator pointing to active color button if guide active */}
        {showHandGuide && isSelected && (
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-bounce">
            <svg
              viewBox="0 0 48 48"
              className="w-10 h-10 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]"
            >
              {/* White glove cartoon hand with black stroke */}
              <path
                d="M 24 6 C 21 6 20 8 20 12 L 20 22 C 19 22 17 22 16 23 C 14 24 14 27 15 29 L 20 38 C 22 41 26 43 30 43 L 34 43 C 39 43 42 39 42 34 L 42 26 C 42 23 40 22 37 22 C 36 22 35 22 34 23 C 33 21 31 21 29 21 C 28 21 27 21 26 22 L 26 12 C 26 8 27 6 24 6 Z"
                fill="#FFFFFF"
                stroke="#1E1E24"
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {/* Palm creases */}
              <path d="M 28 26 L 28 35" stroke="#E0E0E0" strokeWidth="1.5" />
              <path d="M 33 27 L 33 34" stroke="#E0E0E0" strokeWidth="1.5" />
            </svg>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center pt-2 pb-4">
      {/* Wooden / Tan Palette Tray Container */}
      <div 
        id="color-tray-card"
        className="w-full max-w-[390px] sm:max-w-[430px] rounded-[24px] bg-[#eedbc5] p-3 sm:p-4 shadow-[0_8px_20px_rgba(0,0,0,0.35),inset_0_2px_2px_rgba(255,255,255,0.9),inset_0_-3px_5px_rgba(150,110,75,0.5)] border-2 border-[#caa885] flex flex-col gap-2 sm:gap-2.5 relative"
      >
        {/* Row 1: Colors 1 - 5 */}
        <div className="flex items-center justify-between px-1">
          {row1.map(renderColorButton)}
        </div>

        {/* Inset Wooden Groove Divider */}
        <div className="w-full h-2 rounded-full bg-[#caa37d] shadow-[inset_0_2px_3px_rgba(90,50,20,0.5),0_1px_1px_rgba(255,255,255,0.7)]" />

        {/* Row 2: Colors 6 - 10 */}
        <div className="flex items-center justify-between px-1">
          {row2.map(renderColorButton)}
        </div>
      </div>
    </div>
  );
};
