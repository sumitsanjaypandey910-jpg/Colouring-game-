/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { GameBackground, BackgroundTheme } from './components/GameBackground';
import { TopBar } from './components/TopBar';
import { ColoringCanvas } from './components/ColoringCanvas';
import { ColorTray } from './components/ColorTray';
import { PauseModal } from './components/PauseModal';
import { VictoryModal } from './components/VictoryModal';
import { LevelSelectModal } from './components/LevelSelectModal';
import { LEVELS } from './data/levels';
import { sound } from './utils/audio';

export default function App() {
  const [levelIndex, setLevelIndex] = useState<number>(0);
  const currentLevel = LEVELS[levelIndex] || LEVELS[0];

  // Green or Yellow background theme (defaults to vibrant lime-sun yellow-green)
  const [backgroundTheme, setBackgroundTheme] = useState<BackgroundTheme>('yellow-green');

  // Map of regionId -> colorId that has been colored
  const [coloredRegions, setColoredRegions] = useState<Map<string, number>>(() => new Map());

  // Currently selected color (Defaults to 6 as in screenshot)
  const [selectedColorId, setSelectedColorId] = useState<number>(6);

  // Hand guide pointing to color button (shown on start just like in screenshot)
  const [showHandGuide, setShowHandGuide] = useState<boolean>(true);

  // Game UI state
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isVictory, setIsVictory] = useState<boolean>(false);
  const [isLevelSelectOpen, setIsLevelSelectOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Score & Time
  const [score, setScore] = useState<number>(0);
  const [hintsRemaining, setHintsRemaining] = useState<number>(3);
  const [highlightedNumber, setHighlightedNumber] = useState<number | null>(null);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [completedLevelIds, setCompletedLevelIds] = useState<Set<string>>(() => new Set());

  // Cycle background theme between Green and Yellow options
  const handleCycleTheme = useCallback(() => {
    setBackgroundTheme(prev => {
      if (prev === 'yellow-green') return 'green';
      if (prev === 'green') return 'yellow';
      return 'yellow-green';
    });
  }, []);

  // Sound sync
  const handleToggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const next = !prev;
      sound.enabled = next;
      return next;
    });
  }, []);

  // Timer interval when active
  useEffect(() => {
    if (isPaused || isVictory) return;
    const interval = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, isVictory]);

  // Set of color numbers that have all their corresponding regions colored
  const completedNumbers = useMemo(() => {
    const counts = new Map<number, { total: number; colored: number }>();

    currentLevel.regions.forEach(reg => {
      const current = counts.get(reg.number) || { total: 0, colored: 0 };
      current.total += 1;
      if (coloredRegions.has(reg.id)) {
        current.colored += 1;
      }
      counts.set(reg.number, current);
    });

    const done = new Set<number>();
    counts.forEach((val, num) => {
      if (val.total > 0 && val.colored === val.total) {
        done.add(num);
      }
    });
    return done;
  }, [currentLevel, coloredRegions]);

  // Progress percentage
  const totalRegions = currentLevel.regions.length;
  const coloredCount = coloredRegions.size;
  const progressPercent = totalRegions > 0 ? (coloredCount / totalRegions) * 100 : 0;

  // Handle region colored
  const handleRegionColored = (regionId: string, colorId: number) => {
    if (showHandGuide) {
      setShowHandGuide(false);
    }
    if (highlightedNumber) {
      setHighlightedNumber(null);
    }

    setColoredRegions(prev => {
      const next = new Map(prev);
      const isNew = !next.has(regionId);
      next.set(regionId, colorId);

      if (isNew) {
        setScore(s => s + 20);
      }

      // Check if this finishes the picture
      if (next.size === currentLevel.regions.length) {
        setTimeout(() => {
          setScore(s => s + 100);
          setCompletedLevelIds(completed => new Set(completed).add(currentLevel.id));
          setIsVictory(true);
        }, 500);
      }

      return next;
    });
  };

  // Select color
  const handleSelectColor = (colorId: number) => {
    setSelectedColorId(colorId);
    if (showHandGuide) {
      setShowHandGuide(false);
    }
    if (highlightedNumber && highlightedNumber !== colorId) {
      setHighlightedNumber(null);
    }
  };

  // Hint trigger
  const handleHint = () => {
    if (hintsRemaining <= 0) return;

    // Find an uncolored region matching the active color, or any uncolored region
    const uncoloredForActive = currentLevel.regions.find(
      r => !coloredRegions.has(r.id) && r.number === selectedColorId
    );

    const targetRegion = uncoloredForActive || currentLevel.regions.find(r => !coloredRegions.has(r.id));

    if (targetRegion) {
      setSelectedColorId(targetRegion.number);
      setHighlightedNumber(targetRegion.number);
      setHintsRemaining(h => Math.max(0, h - 1));

      // Auto-clear hint highlight after 4 seconds
      setTimeout(() => {
        setHighlightedNumber(null);
      }, 4000);
    }
  };

  // Restart current level
  const handleRestartLevel = () => {
    setColoredRegions(new Map());
    setTimeSpent(0);
    setIsPaused(false);
    setIsVictory(false);
  };

  // Switch level
  const handleSelectLevel = (levelId: string) => {
    const idx = LEVELS.findIndex(l => l.id === levelId);
    if (idx !== -1) {
      setLevelIndex(idx);
      setColoredRegions(new Map());
      setTimeSpent(0);
      setIsPaused(false);
      setIsVictory(false);
      // Select first uncolored color or default to first region's number
      const firstNum = LEVELS[idx].regions[0]?.number || 1;
      setSelectedColorId(firstNum);
    }
  };

  // Next level handler
  const handleNextLevel = () => {
    const nextIdx = (levelIndex + 1) % LEVELS.length;
    handleSelectLevel(LEVELS[nextIdx].id);
  };

  return (
    <GameBackground theme={backgroundTheme}>
      {/* Top Bar matching screenshot */}
      <TopBar
        progressPercent={progressPercent}
        score={score}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onPause={() => setIsPaused(true)}
        onHint={handleHint}
        onReset={handleRestartLevel}
        hintsRemaining={hintsRemaining}
        backgroundTheme={backgroundTheme}
        onCycleTheme={handleCycleTheme}
      />

      {/* Main Coloring Canvas matching screenshot */}
      <ColoringCanvas
        level={currentLevel}
        coloredRegions={coloredRegions}
        selectedColorId={selectedColorId}
        onRegionColored={handleRegionColored}
        onSelectColor={handleSelectColor}
        highlightedNumber={highlightedNumber}
      />

      {/* Bottom Color Palette Tray matching screenshot */}
      <ColorTray
        palette={currentLevel.palette}
        selectedColorId={selectedColorId}
        onSelectColor={handleSelectColor}
        completedNumbers={completedNumbers}
        showHandGuide={showHandGuide}
      />

      {/* Pause Dialog Modal */}
      <PauseModal
        isOpen={isPaused}
        onResume={() => setIsPaused(false)}
        onRestart={handleRestartLevel}
        onOpenLevelSelect={() => {
          setIsPaused(false);
          setIsLevelSelectOpen(true);
        }}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        currentLevelTitle={currentLevel.title}
      />

      {/* Victory Celebration Modal */}
      <VictoryModal
        isOpen={isVictory}
        level={currentLevel}
        timeSpentSeconds={timeSpent}
        scoreGained={100 + currentLevel.regions.length * 20}
        totalScore={score}
        onNextLevel={handleNextLevel}
        onReplay={handleRestartLevel}
        onOpenLevelSelect={() => {
          setIsVictory(false);
          setIsLevelSelectOpen(true);
        }}
        coloredRegions={coloredRegions}
      />

      {/* Level Selection Modal */}
      <LevelSelectModal
        isOpen={isLevelSelectOpen}
        levels={LEVELS}
        currentLevelId={currentLevel.id}
        onSelectLevel={handleSelectLevel}
        onClose={() => setIsLevelSelectOpen(false)}
        completedLevelIds={completedLevelIds}
      />
    </GameBackground>
  );
}
