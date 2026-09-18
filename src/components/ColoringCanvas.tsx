import React, { useState, useEffect, useRef } from 'react';
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
}) => {
  const activePalette = palette || level.palette;
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const isPointerDownRef = useRef(false);

  // Global pointer up listener to cleanly stop drag-coloring
  useEffect(() => {
    const handleGlobalPointerUp = () => {
      isPointerDownRef.current = false;
    };
    window.addEventListener('pointerup', handleGlobalPointerUp);
    window.addEventListener('pointercancel', handleGlobalPointerUp);
    return () => {
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      window.removeEventListener('pointercancel', handleGlobalPointerUp);
    };
  }, []);

  const handlePaintRegion = (
    regionId: string,
    regionNumber: number,
    labelX: number,
    labelY: number
  ) => {
    const currentColorOfRegion = coloredRegions.get(regionId);

    // If region is already this exact color, avoid redundant re-triggers
    if (currentColorOfRegion === selectedColorId) {
      return;
    }

    // Color the region with the active selected color
    onRegionColored(regionId, selectedColorId);
    sound.playSplash();

    // Trigger celebratory sparkles
    const chosenColor = activePalette.find(c => c.id === selectedColorId)?.hex || '#FFD700';
    const isMatch = selectedColorId === regionNumber;

    const newSparkles: Sparkle[] = Array.from({ length: isMatch ? 8 : 4 }).map((_, i) => ({
      id: Date.now() + i,
      x: labelX + (Math.random() - 0.5) * 45,
      y: labelY + (Math.random() - 0.5) * 45,
      color: chosenColor,
    }));

    setSparkles(prev => [...prev, ...newSparkles]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => !newSparkles.find(ns => ns.id === s.id)));
    }, 700);
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
      {/* Paper Card Frame with Crisp Border, Ambient Glow, and Noticeably Bigger Size */}
      <div 
        id="coloring-paper-card"
        className="relative w-full max-w-[430px] sm:max-w-[475px] aspect-[400/420] bg-[#fdfcf9] rounded-2xl overflow-hidden shadow-[0_16px_36px_rgba(0,0,0,0.35),0_4px_12px_rgba(0,0,0,0.2)] border-[3.5px] border-[#221f1d] select-none transition-all duration-300 ring-4 ring-white/30"
      >
        <svg
          viewBox={`0 0 ${level.width} ${level.height}`}
          className="w-full h-full block cursor-crosshair"
          style={{ touchAction: 'none' }}
          onPointerDown={() => {
            isPointerDownRef.current = true;
          }}
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
                {/* Clickable and swipe-paintable vector path */}
                <path
                  id={`region-${region.id}`}
                  d={region.path}
                  fill={fillColor}
                  stroke="#1c1c1e"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onPointerDown={(e) => {
                    isPointerDownRef.current = true;
                    handlePaintRegion(region.id, region.number, region.labelX, region.labelY);
                  }}
                  onPointerEnter={(e) => {
                    if (isPointerDownRef.current) {
                      handlePaintRegion(region.id, region.number, region.labelX, region.labelY);
                    }
                  }}
                  className={`cursor-pointer transition-colors duration-200 ease-out
                    ${!isColored ? 'hover:brightness-95 active:brightness-90' : 'hover:brightness-105'}
                  `}
                  style={{
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
