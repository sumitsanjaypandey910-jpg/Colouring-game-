import React, { useState, useEffect } from 'react';
import { ColorItem } from '../types';
import { sound } from '../utils/audio';
import { Check, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

interface ColorTrayProps {
  palette: ColorItem[];
  selectedColorId: number;
  onSelectColor: (colorId: number) => void;
  completedNumbers: Set<number>;
  onAddCustomColor?: (hex: string, name: string) => void;
}

export const ColorTray: React.FC<ColorTrayProps> = ({
  palette,
  selectedColorId,
  onSelectColor,
  completedNumbers,
  onAddCustomColor,
}) => {
  const PAGE_SIZE = 10;
  const totalPages = Math.max(1, Math.ceil(palette.length / PAGE_SIZE));

  // Determine current page based on selected color or user browsing
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isAddColorOpen, setIsAddColorOpen] = useState<boolean>(false);
  const [customHex, setCustomHex] = useState<string>('#ff007f');
  const [customName, setCustomName] = useState<string>('My Color');

  // Keep active color visible on tray
  useEffect(() => {
    const colorIndex = palette.findIndex(c => c.id === selectedColorId);
    if (colorIndex !== -1) {
      const targetPage = Math.floor(colorIndex / PAGE_SIZE);
      if (targetPage !== currentPage && targetPage < totalPages) {
        setCurrentPage(targetPage);
      }
    }
  }, [selectedColorId, palette, totalPages]);

  // Colors on current page
  const pageStartIndex = currentPage * PAGE_SIZE;
  const pageColors = palette.slice(pageStartIndex, pageStartIndex + PAGE_SIZE);
  const row1 = pageColors.slice(0, 5);
  const row2 = pageColors.slice(5, 10);

  const handleNextPage = () => {
    sound.playClick();
    setCurrentPage(prev => (prev + 1) % totalPages);
  };

  const handlePrevPage = () => {
    sound.playClick();
    setCurrentPage(prev => (prev - 1 + totalPages) % totalPages);
  };

  const handleCreateColor = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddCustomColor) {
      onAddCustomColor(customHex, customName.trim() || 'Custom');
      sound.playSplash();
      setIsAddColorOpen(false);
    }
  };

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
          className={`relative w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center font-bold text-base sm:text-lg transition-all duration-200 cursor-pointer select-none
            ${isSelected 
              ? 'scale-110 z-20 ring-4 ring-white shadow-[0_6px_14px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.8)]' 
              : 'hover:scale-105 active:scale-95 shadow-[0_3px_6px_rgba(0,0,0,0.35),inset_0_2px_2px_rgba(255,255,255,0.4)]'}
            ${isDone ? 'opacity-85' : 'opacity-100'}
          `}
          style={{
            backgroundColor: color.hex,
            border: color.id === 1 ? '2.5px solid #b0bec5' : '2px solid rgba(0,0,0,0.15)',
          }}
          title={`${color.name} (#${color.id})`}
        >
          {/* Circular highlight sheen */}
          <div className="absolute top-1 left-1.5 sm:left-2 w-3.5 sm:w-4 h-2 rounded-full bg-white/40 pointer-events-none" />

          {/* Number / ID label */}
          <span
            className="relative font-['Fredoka',sans-serif] font-bold text-base sm:text-lg drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]"
            style={{ color: color.textColor }}
          >
            {color.id}
          </span>

          {/* Completed Checkmark Badge */}
          {isDone && (
            <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-md">
              <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white stroke-[3.5]" />
            </div>
          )}
        </button>
      </div>
    );
  };

  const getPageTitle = (index: number) => {
    switch (index) {
      case 0:
        return 'Classic (1-10)';
      case 1:
        return 'Vibrant (11-20)';
      case 2:
        return 'Pastels (21-30)';
      default:
        return `Palette ${index + 1}`;
    }
  };

  return (
    <div className="w-full flex flex-col items-center pt-1.5 pb-3">
      {/* Wooden / Tan Palette Tray Container */}
      <div 
        id="color-tray-card"
        className="w-full max-w-[390px] sm:max-w-[440px] rounded-[24px] bg-[#eedbc5] p-2.5 sm:p-3.5 shadow-[0_8px_20px_rgba(0,0,0,0.35),inset_0_2px_2px_rgba(255,255,255,0.9),inset_0_-3px_5px_rgba(150,110,75,0.5)] border-2 border-[#caa885] flex flex-col gap-2 relative"
      >
        {/* Palette Page Switcher & Category Tabs */}
        <div className="w-full flex items-center justify-between px-1">
          <button
            id="prev-colors-page"
            onClick={handlePrevPage}
            className="w-7 h-7 rounded-full bg-[#d6b998] hover:bg-[#c9a67e] text-[#4a2e18] flex items-center justify-center shadow-sm cursor-pointer transition-transform active:scale-90"
            title="Previous Color Palette"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Palette Category Pills */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                id={`tab-palette-page-${idx}`}
                onClick={() => {
                  sound.playClick();
                  setCurrentPage(idx);
                }}
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-['Fredoka',sans-serif] transition-all cursor-pointer ${
                  currentPage === idx
                    ? 'bg-[#5c3a1e] text-white shadow-sm scale-105'
                    : 'bg-[#dfc4a6] text-[#6d4624] hover:bg-[#d6b998]'
                }`}
              >
                {getPageTitle(idx)}
              </button>
            ))}

            {/* "+ Add Color" Button */}
            {onAddCustomColor && (
              <button
                id="open-add-color-modal"
                onClick={() => {
                  sound.playPop();
                  setIsAddColorOpen(true);
                }}
                className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-bold font-['Fredoka',sans-serif] bg-amber-600 hover:bg-amber-700 text-white shadow-sm cursor-pointer transition-transform active:scale-95"
                title="Add Your Own Custom Color"
              >
                <Plus className="w-3 h-3 stroke-[3]" />
                <span>Add</span>
              </button>
            )}
          </div>

          <button
            id="next-colors-page"
            onClick={handleNextPage}
            className="w-7 h-7 rounded-full bg-[#d6b998] hover:bg-[#c9a67e] text-[#4a2e18] flex items-center justify-center shadow-sm cursor-pointer transition-transform active:scale-90"
            title="Next Color Palette"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Row 1: 5 Colors */}
        <div className="flex items-center justify-between px-1">
          {row1.map(renderColorButton)}
        </div>

        {/* Inset Wooden Groove Divider */}
        <div className="w-full h-1.5 rounded-full bg-[#caa37d] shadow-[inset_0_2px_3px_rgba(90,50,20,0.5),0_1px_1px_rgba(255,255,255,0.7)]" />

        {/* Row 2: 5 Colors */}
        <div className="flex items-center justify-between px-1">
          {row2.map(renderColorButton)}
        </div>
      </div>

      {/* Add Custom Color Popover / Dialog */}
      {isAddColorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-xs bg-[#fdfaf5] rounded-2xl p-4 shadow-2xl border-3 border-[#221f1d] animate-fade-in relative flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-['Fredoka',sans-serif] font-bold text-lg text-stone-800">
                Add New Color
              </h3>
              <button
                onClick={() => setIsAddColorOpen(false)}
                className="w-7 h-7 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateColor} className="flex flex-col gap-3">
              {/* Color Preview & Picker */}
              <div className="flex items-center gap-3">
                <input
                  id="custom-color-input"
                  type="color"
                  value={customHex}
                  onChange={(e) => setCustomHex(e.target.value)}
                  className="w-14 h-14 rounded-xl cursor-pointer border-2 border-stone-400 p-0.5 bg-white shadow-inner"
                />
                <div className="flex-1">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                    Hex Code
                  </span>
                  <span className="font-mono font-bold text-base text-stone-800 uppercase">
                    {customHex}
                  </span>
                </div>
              </div>

              {/* Quick preset color swatches to choose from */}
              <div>
                <span className="text-xs font-semibold text-stone-500 block mb-1">
                  Or pick a fun shade:
                </span>
                <div className="grid grid-cols-6 gap-1.5">
                  {['#FF1493', '#00FF7F', '#FF4500', '#1E90FF', '#9400D3', '#FFD700', '#00FFFF', '#FF69B4', '#32CD32', '#BA55D3', '#FF8C00', '#4169E1'].map(hex => (
                    <button
                      key={hex}
                      type="button"
                      onClick={() => setCustomHex(hex)}
                      className="w-7 h-7 rounded-full border border-black/20 shadow-xs hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddColorOpen(false)}
                  className="flex-1 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md cursor-pointer transition-transform active:scale-95"
                >
                  Add to Palette
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
