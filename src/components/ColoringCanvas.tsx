import React, { useState } from 'react';
import { ColoringLevel, ColorItem } from '../types';
import { sound } from '../utils/audio';

interface ColoringCanvasProps {
  level: ColoringLevel;
  coloredRegions: Map<string, number>; // regionId -> colorId
  selectedColorId: number;
  onRegionColored: (regionId: string, colorId: number) => void;
  onSelectColor: (colorId: number) => void;
  highlightedNumber?: number | null;
  wrongRegionId?: string | null;
  palette?: ColorItem[];
  completedNumbers?: Set<number>;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  color: string;
}

export const ColoringCanvas: React.FC<ColoringCanvasProps> = ({
  level,
  coloredRegions,
  selectedColorId,
  onRegionColored,
  onSelectColor,
  highlightedNumber,
  wrongRegionId,
  palette,
  completedNumbers,
}) => {
  const activePalette = palette || level.palette;
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  // Paint a region on a single tap or click
  const handlePaintRegion = (
    regionId: string,
    regionNumber: number,
    labelX: number,
    labelY: number
  ) => {
    // 1. Restrict players from adding same color twice:
    // Once a region has been colored, it cannot be colored again!
    if (coloredRegions.has(regionId)) {
      return;
    }

    // 2. Restrict players from adding a color if that color is already completed
    if (completedNumbers?.has(regionNumber)) {
      sound.playBoop();
      return;
    }

    // 3. Player can not only add colours in number sequence:
    // Any available color or region can be colored in any order!
    // If the active color is different, synchronize selected color to this region's number
    if (selectedColorId !== regionNumber) {
      onSelectColor(regionNumber);
    }

    // 4. Color the region immediately with a single tap
    onRegionColored(regionId, regionNumber);
    sound.playSplash();

    // 5. Celebration burst
    const chosenColor = activePalette.find(c => c.id === regionNumber)?.hex || '#FFD700';
    const newSparkles: Sparkle[] = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: labelX + (Math.random() - 0.5) * 45,
      y: labelY + (Math.random() - 0.5) * 45,
      color: chosenColor,
    }));

    setSparkles(prev => [...prev, ...newSparkles]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => !newSparkles.find(ns => ns.id === s.id)));
    }, 650);
  };

  const getRegionFill = (regionId: string) => {
    const colorId = coloredRegions.get(regionId);
    if (colorId !== undefined) {
      const color = activePalette.find(c => c.id === colorId);
      return color ? color.hex : '#FFFFFF';
    }
    return '#fdfcf9'; // clean uncolored paper
  };

  return (
    <div className="w-full flex items-center justify-center my-auto py-1 sm:py-2">
      {/* Paper Card Frame with Crisp Border, Ambient Glow */}
      <div 
        id="coloring-paper-card"
        className="relative w-full max-w-[430px] sm:max-w-[475px] aspect-[400/420] bg-[#fdfcf9] rounded-2xl overflow-hidden shadow-[0_16px_36px_rgba(0,0,0,0.35),0_4px_12px_rgba(0,0,0,0.2)] border-[3.5px] border-[#221f1d] select-none transition-all duration-300 ring-4 ring-white/30"
      >
        <svg
          viewBox={`0 0 ${level.width} ${level.height}`}
          className="w-full h-full block"
          style={{ touchAction: 'manipulation' }}
        >
          {/* Subtle paper texture overlay */}
          <rect width={level.width} height={level.height} fill="#fdfbf7" />

          {/* Render Vector Regions */}
          {level.regions.map((region) => {
            const isColored = coloredRegions.has(region.id);
            const isMatchingActive = selectedColorId === region.number;
            const isTargetHint = highlightedNumber === region.number;
            const isShaking = wrongRegionId === region.id;
            const fillColor = getRegionFill(region.id);

            return (
              <g key={region.id} className={isShaking ? 'animate-wiggle' : ''}>
                {/* Single-tap clickable vector path (no double tap required) */}
                <path
                  id={`region-${region.id}`}
                  d={region.path}
                  fill={fillColor}
                  stroke="#1c1c1e"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePaintRegion(region.id, region.number, region.labelX, region.labelY);
                  }}
                  className={`transition-colors duration-200 ease-out select-none
                    ${!isColored 
                      ? 'cursor-pointer hover:brightness-95 active:scale-[0.99] active:brightness-90' 
                      : 'cursor-default'
                    }
                  `}
                  style={{
                    touchAction: 'manipulation',
                    filter: isTargetHint && !isColored 
                      ? 'drop-shadow(0 0 8px rgba(255, 193, 7, 0.95))' 
                      : isMatchingActive && !isColored 
                        ? 'drop-shadow(0 0 4px rgba(30, 136, 229, 0.45))' 
                        : undefined
                  }}
                />

                {/* Region Number Label (visible only when not colored) */}
                {!isColored && (
                  <text
                    x={region.labelX}
                    y={region.labelY}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#18181b"
                    className="font-['Fredoka',sans-serif] font-bold pointer-events-none select-none transition-transform"
                    style={{
                      fontSize: (region.fontSize || 20) + 1,
                      filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.95))',
                    }}
                  >
                    {region.number}
                  </text>
                )}
              </g>
            );
          })}

          {/* Sparkle burst overlays on coloring */}
          {sparkles.map((sp) => (
            <g key={sp.id} className="pointer-events-none animate-ping">
              <circle cx={sp.x} cy={sp.y} r="7" fill={sp.color} />
              <polygon
                points={`${sp.x},${sp.y - 10} ${sp.x + 3.5},${sp.y - 2.5} ${sp.x + 10},${sp.y} ${sp.x + 3.5},${sp.y + 2.5} ${sp.x},${sp.y + 10} ${sp.x - 3.5},${sp.y + 2.5} ${sp.x - 10},${sp.y} ${sp.x - 3.5},${sp.y - 2.5}`}
                fill="#FFF"
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};
